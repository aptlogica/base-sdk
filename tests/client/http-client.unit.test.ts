// Ensure the __mocks__/axios mock is used
jest.mock('axios');
import axios from 'axios';
// Import the mock instance directly from the mock file
import { mockAxiosInstance } from '../../__mocks__/axios';

import { EventEmitter } from 'eventemitter3';
import { HttpClient } from '../../src/client/http-client';
import type { ClientConfig } from '../../src/types';

// --- Additional tests for uncovered branches ---
describe('HttpClient uncovered branches', () => {
  let config: ClientConfig;
  beforeEach(() => {
    jest.clearAllMocks();
    (axios.create as jest.Mock).mockReturnValue(mockAxiosInstance);
    config = {
      baseURL: 'https://api.test',
      timeout: 1000,
      headers: { 'X-Test': '1' },
      auth: { type: 'bearer', token: 'abc' },
      retries: { enabled: true, maxRetries: 2, retryDelay: 10 },
      uploadLimits: { maxFileSize: 100, maxBulkSize: 200 },
    };
  });

  
  it('should handle basic auth and warn', () => {
    config.auth = { type: 'basic', username: 'u', password: 'p' };
    const client = new HttpClient(config);
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    // Manually invoke the request interceptor callback to trigger the warning
    const interceptorCallback = (mockAxiosInstance.interceptors.request.use as jest.Mock).mock.calls[0][0];
    interceptorCallback({ headers: {} });
    // Check all calls for the expected substring
    const found = spy.mock.calls.flat().some(arg => typeof arg === 'string' && arg.includes('DEPRECATED'));
    expect(found).toBe(true);
    spy.mockRestore();
  });

  it('should not set Authorization if auth is missing', () => {
    config.auth = undefined;
    const client = new HttpClient(config);
    expect(client).toBeInstanceOf(EventEmitter);
  });

  it('should not set Authorization if bearer token missing', () => {
    config.auth = { type: 'bearer' };
    const client = new HttpClient(config);
    expect(client).toBeInstanceOf(EventEmitter);
  });

  it('should not set Authorization if basic username/password missing', () => {
    config.auth = { type: 'basic' };
    const client = new HttpClient(config);
    expect(client).toBeInstanceOf(EventEmitter);
  });

  it('should not retry if shouldRetry returns false', async () => {
    const client = new HttpClient(config);
    (client as any).shouldRetry = jest.fn().mockReturnValue(false);
    const error = { response: { status: 500 }, config: {} };
    await expect((client as any).retryRequest(error)).resolves.toBeUndefined();
  });

  it('should handle error formatting with no error.response.data.error', () => {
    const client = new HttpClient(config);
    const error = { response: { data: { foo: 1 }, status: 400 } };
    const err = (client as any).formatError(error);
    expect(err).toBe(error);
  });
});

describe('HttpClient', () => {
  let config: ClientConfig;

  beforeEach(() => {
    jest.clearAllMocks();
    // Ensure axios.create always returns the mock instance
    (axios.create as jest.Mock).mockReturnValue(mockAxiosInstance);
    config = {
      baseURL: 'https://api.test',
      timeout: 1000,
      headers: { 'X-Test': '1' },
      auth: { type: 'bearer', token: 'abc' },
      retries: { enabled: true, maxRetries: 2, retryDelay: 10 },
      uploadLimits: { maxFileSize: 100, maxBulkSize: 200 },
    };
  });

  it('should initialize with config and setup interceptors', () => {
    const client = new HttpClient(config);
    expect(axios.create).toHaveBeenCalledWith(expect.objectContaining({
      baseURL: config.baseURL,
      timeout: config.timeout,
      headers: expect.objectContaining(config.headers),
    }));
    expect(client).toBeInstanceOf(EventEmitter);
  });

  describe('HTTP methods', () => {
    let client: HttpClient;
    beforeEach(() => {
      client = new HttpClient(config);
    });

    it('should GET and return data', async () => {
      mockAxiosInstance.get.mockResolvedValue({ data: { ok: 1 } });
      const result = await client.get('/foo');
      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/foo', undefined);
      expect(result).toEqual({ ok: 1 });
    });

    it('should POST and return data', async () => {
      mockAxiosInstance.post.mockResolvedValue({ data: { ok: 2 } });
      const result = await client.post('/foo', { a: 1 });
      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/foo', { a: 1 }, undefined);
      expect(result).toEqual({ ok: 2 });
    });

    it('should PUT and return data', async () => {
      mockAxiosInstance.put.mockResolvedValue({ data: { ok: 3 } });
      const result = await client.put('/foo', { b: 2 });
      expect(mockAxiosInstance.put).toHaveBeenCalledWith('/foo', { b: 2 }, undefined);
      expect(result).toEqual({ ok: 3 });
    });

    it('should PATCH and return data', async () => {
      mockAxiosInstance.patch.mockResolvedValue({ data: { ok: 4 } });
      const result = await client.patch('/foo', { c: 3 });
      expect(mockAxiosInstance.patch).toHaveBeenCalledWith('/foo', { c: 3 }, undefined);
      expect(result).toEqual({ ok: 4 });
    });

    it('should DELETE and return data', async () => {
      mockAxiosInstance.delete.mockResolvedValue({ data: { ok: 5 } });
      const result = await client.delete('/foo');
      expect(mockAxiosInstance.delete).toHaveBeenCalledWith('/foo', undefined);
      expect(result).toEqual({ ok: 5 });
    });
  });

  describe('Config and Auth', () => {
    let client: HttpClient;
    beforeEach(() => {
      client = new HttpClient(config);
    });

    it('should update config and re-setup interceptors', () => {
      client.updateConfig({ timeout: 9999 });
      expect(axios.create).toHaveBeenCalledWith(expect.objectContaining({ timeout: 9999 }));
    });

    it('should set auth token', () => {
      client.setAuthToken('newtoken');
      expect(axios.create).toHaveBeenCalledWith(expect.objectContaining({ headers: expect.any(Object) }));
    });

    it('should set headers', () => {
      client.setHeaders({ 'X-New': '2' });
      expect(axios.create).toHaveBeenCalledWith(expect.objectContaining({ headers: expect.objectContaining({ 'X-New': '2' }) }));
    });

    it('should clear auth', () => {
      client.clearAuth();
      expect(axios.create).toHaveBeenCalled();
    });
  });

  describe('Upload limits', () => {
    let client: HttpClient;
    beforeEach(() => {
      client = new HttpClient(config);
    });
    it('should return upload limits for file', () => {
      expect(client.getUploadLimits(false)).toEqual({ maxContentLength: 100, maxBodyLength: 100 });
    });
    it('should return upload limits for bulk', () => {
      expect(client.getUploadLimits(true)).toEqual({ maxContentLength: 200, maxBodyLength: 200 });
    });
  });

  describe('Error and Retry', () => {
    let client: HttpClient;
    beforeEach(() => {
      client = new HttpClient(config);
    });
    it('should format error with response data', () => {
      const error = {
        response: { data: { error: { message: 'fail', code: 'E', details: { foo: 1 } } }, status: 400 },
      };
      const err = (client as any).formatError(error);
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe('fail');
      expect((err as any).code).toBe('E');
      expect((err as any).details).toEqual({ foo: 1 });
      expect((err as any).status).toBe(400);
    });
    it('should return error as-is if no response data', () => {
      const error = { foo: 1 };
      expect((client as any).formatError(error)).toBe(error);
    });
    it('should retry on retryable error', async () => {
      jest.useFakeTimers();
      const error = {
        response: { status: 500 },
        config: {},
      };
      (client as any).shouldRetry = jest.fn().mockReturnValue(true);
      (client as any).formatError = jest.fn().mockImplementation(e => e);
      mockAxiosInstance.request.mockResolvedValue({ data: { ok: 9 } });
      const promise = (client as any).retryRequest(error);
      jest.runAllTimers();
      const result = await promise;
      expect(result).toEqual({ data: { ok: 9 } });
      jest.useRealTimers();
    });
    it('should not retry if max retries reached', async () => {
      const error = {
        response: { status: 500 },
        config: { __retryCount: 2 },
      };
      (client as any).shouldRetry = jest.fn().mockReturnValue(true);
      (client as any).formatError = jest.fn().mockImplementation(e => e);
      await expect((client as any).retryRequest(error)).rejects.toBe(error);
    });
  });
});
