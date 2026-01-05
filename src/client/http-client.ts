import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { EventEmitter } from 'eventemitter3';
import { ClientConfig, StandardResponse } from '../types';

function encodeToBase64(value: string): string {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(value, 'utf8').toString('base64');
  }
  if (typeof btoa !== 'undefined') {
    return btoa(value);
  }
  throw new Error('No base64 encoder available in this environment.');
}

// Default upload limits (in bytes)
const DEFAULT_MAX_FILE_SIZE = 104857600; // 100MB
const DEFAULT_MAX_BULK_SIZE = 524288000; // 500MB

export class HttpClient extends EventEmitter {
  private client: AxiosInstance;
  private config: ClientConfig;

  constructor(config: ClientConfig) {
    super();
    this.config = config;
    this.client = this.createAxiosInstance();
    this.setupInterceptors();
  }

  private getUploadConfig(isBulk: boolean = false): { maxContentLength: number; maxBodyLength: number } {
    const limits = this.config.uploadLimits || {};
    const maxSize = isBulk
      ? (limits.maxBulkSize || DEFAULT_MAX_BULK_SIZE)
      : (limits.maxFileSize || DEFAULT_MAX_FILE_SIZE);

    return {
      maxContentLength: maxSize,
      maxBodyLength: maxSize
    };
  }

  private createAxiosInstance(): AxiosInstance {
    return axios.create({
      baseURL: this.config.baseURL,
      timeout: this.config.timeout || 30000,
      headers: {
        'Content-Type': 'application/json',
        ...this.config.headers,
      },
    });
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add authentication
        if (this.config.auth) {
          if (this.config.auth.type === 'bearer' && this.config.auth.token) {
            config.headers.Authorization = `Bearer ${this.config.auth.token}`;
          } else if (this.config.auth.type === 'basic' && this.config.auth.username && this.config.auth.password) {
            console.warn('[DEPRECATED] Basic authentication is deprecated and will be removed in a future version. Please use bearer token authentication instead.');
            const credentials = encodeToBase64(`${this.config.auth.username}:${this.config.auth.password}`);
            config.headers.Authorization = `Basic ${credentials}`;
          }
        }

        this.emit('request', config);
        return config;
      },
      (error) => {
        this.emit('request-error', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        this.emit('response', response);
        return response;
      },
      async (error) => {
        this.emit('response-error', error);

        // Auto-retry logic
        if (this.config.retries?.enabled && this.shouldRetry(error)) {
          return this.retryRequest(error);
        }

        return Promise.reject(this.formatError(error));
      }
    );
  }

  private shouldRetry(error: any): boolean {
    const retryableStatuses = [408, 429, 500, 502, 503, 504];
    return error.response && retryableStatuses.includes(error.response.status);
  }

  private async retryRequest(error: any): Promise<any> {
    const maxRetries = this.config.retries?.maxRetries || 3;
    const retryDelay = this.config.retries?.retryDelay || 1000;

    const retryCount = error.config.__retryCount || 0;

    if (retryCount >= maxRetries) {
      return Promise.reject(this.formatError(error));
    }

    error.config.__retryCount = retryCount + 1;

    await new Promise(resolve => setTimeout(resolve, retryDelay * Math.pow(2, retryCount)));

    return this.client.request(error.config);
  }

  private formatError(error: any): Error {
    if (error.response?.data?.error) {
      const errorInfo = error.response.data.error;
      const customError = new Error(errorInfo.message || 'API Error');
      (customError as any).code = errorInfo.code;
      (customError as any).details = errorInfo.details;
      (customError as any).status = error.response.status;
      return customError;
    }

    return error;
  }

  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<StandardResponse<T>> {
    const response = await this.client.get(url, config);
    return response.data;
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<StandardResponse<T>> {
    const response = await this.client.post(url, data, config);
    return response.data;
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<StandardResponse<T>> {
    const response = await this.client.put(url, data, config);
    return response.data;
  }

  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<StandardResponse<T>> {
    const response = await this.client.patch(url, data, config);
    return response.data;
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<StandardResponse<T>> {
    const response = await this.client.delete(url, config);
    return response.data;
  }

  updateConfig(newConfig: Partial<ClientConfig>): void {
    this.config = { ...this.config, ...newConfig };
    this.client = this.createAxiosInstance();
    this.setupInterceptors();
  }

  setAuthToken(token: string): void {
    this.updateConfig({
      auth: { type: 'bearer', token }
    });
  }

  setHeaders(headers: Record<string, string>): void {
    this.updateConfig({
      headers: {
        ...(this.config.headers || {}),
        ...headers
      }
    });
  }

  clearAuth(): void {
    this.updateConfig({
      auth: undefined
    });
  }

  getUploadLimits(isBulk: boolean = false): { maxContentLength: number; maxBodyLength: number } {
    return this.getUploadConfig(isBulk);
  }
}
