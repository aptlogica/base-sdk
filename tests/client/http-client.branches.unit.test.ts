jest.mock('axios');
import axios from 'axios';
import { mockAxiosInstance } from '../../__mocks__/axios';
import { HttpClient, encodeToBase64 } from '../../src/client/http-client';
import type { ClientConfig } from '../../src/types';

describe('HttpClient branches', () => {
  let config: ClientConfig;
  beforeEach(() => {
    jest.clearAllMocks();
    (axios.create as jest.Mock).mockReturnValue(mockAxiosInstance);
    config = {
      baseURL: 'https://api.test',
      timeout: 1000,
      headers: {},
      auth: { type: 'bearer', token: 'abc' },
      retries: { enabled: true, maxRetries: 2, retryDelay: 1 },
    };
  });

  it('request interceptor error handler emits and rejects', async () => {
    const client = new HttpClient(config);
    const reqErrorHandler = (mockAxiosInstance.interceptors.request.use as jest.Mock).mock.calls[0][1];
    const spy = jest.spyOn(client as any, 'emit');
    const err = new Error('req');
    await expect(reqErrorHandler(err)).rejects.toBe(err);
    expect(spy).toHaveBeenCalledWith('request-error', err);
  });

  it('response interceptor error without retries throws formatted error', async () => {
    config.retries = { enabled: false } as any;
    const client = new HttpClient(config);
    const respErrHandler = (mockAxiosInstance.interceptors.response.use as jest.Mock).mock.calls[0][1];
    const spy = jest.spyOn(client as any, 'emit');
    const error = { response: { data: { error: { message: 'x', code: 'C' } }, status: 400 } };
    await expect(respErrHandler(error)).rejects.toBeInstanceOf(Error);
    expect(spy).toHaveBeenCalledWith('response-error', error);
  });

  it('shouldRetry returns true for retryable status', () => {
    const client = new HttpClient(config);
    expect((client as any).shouldRetry({ response: { status: 500 } })).toBe(true);
    expect((client as any).shouldRetry({ response: { status: 418 } })).toBe(false);
  });

  it('retryRequest retries and eventually calls client.request', async () => {
    const client = new HttpClient(config);
    const error = { response: { status: 500 }, config: {} };
    mockAxiosInstance.request.mockResolvedValue({ data: { ok: 1 } });
    const promise = (client as any).retryRequest(error);
    const res = await promise;
    expect(res).toEqual({ data: { ok: 1 } });
    expect(mockAxiosInstance.request).toHaveBeenCalled();
  });

  it('retryRequest throws after max retries', async () => {
    const client = new HttpClient(config);
    const error = { response: { status: 500 }, config: { __retryCount: 2 } };
    // formatError returns the original error object when no structured error is present
    await expect((client as any).retryRequest(error)).rejects.toBe(error);
  });

  it('getUploadConfig uses defaults when not provided', () => {
    const conf: ClientConfig = { baseURL: 'u' } as any;
    const client = new HttpClient(conf);
    expect(client.getUploadLimits(false)).toHaveProperty('maxContentLength');
  });
});