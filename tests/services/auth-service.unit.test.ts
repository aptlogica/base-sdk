import { AuthService } from '../../src/services/auth-service';
import type { HttpClient } from '../../src/client/http-client';

const mockHttpClient = {
  post: jest.fn(),
  get: jest.fn(),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new AuthService(mockHttpClient as unknown as HttpClient);
  });

  it('should call http.post on login', () => {
    const params = { email: 'a', password: 'b' };
    service.login(params as any);
    expect(mockHttpClient.post).toHaveBeenCalledWith('/auth/login', params);
  });

  it('should call http.post on verifyOtp', () => {
    const params = { email: 'a', otp: '123' };
    service.verifyOtp(params as any);
    expect(mockHttpClient.post).toHaveBeenCalledWith('/auth/otp/verify', params);
  });

  it('should call http.post on resendOtp', () => {
    const params = { email: 'a' };
    service.resendOtp(params as any);
    expect(mockHttpClient.post).toHaveBeenCalledWith('/auth/otp/resend', params);
  });

  it('should call http.post on forgotPassword', () => {
    const params = { email: 'a' };
    service.forgotPassword(params as any);
    expect(mockHttpClient.post).toHaveBeenCalledWith('/auth/forgot-password', params);
  });

  it('should call http.post on resetPassword', () => {
    const params = { token: 't', password: 'p' };
    service.resetPassword(params as any);
    expect(mockHttpClient.post).toHaveBeenCalledWith('/auth/reset-password', params);
  });

  it('should call http.post on validateToken', () => {
    const params = { token: 't' };
    service.validateToken(params as any);
    expect(mockHttpClient.post).toHaveBeenCalledWith('/auth/validate-token', params);
  });

  it('should call http.post on verifyToken', () => {
    const params = { token: 't' };
    service.verifyToken(params as any);
    expect(mockHttpClient.post).toHaveBeenCalledWith('/auth/verify-token', params);
  });

  it('should call http.post on logout', () => {
    const params = { token: 't' };
    service.logout(params as any);
    expect(mockHttpClient.post).toHaveBeenCalledWith('/auth/logout', params);
  });

  it('should call http.get on loginByIdentityProvider', () => {
    service.loginByIdentityProvider('google');
    expect(mockHttpClient.get).toHaveBeenCalledWith('/auth/login/google');
  });

  it('should call http.post on callback', () => {
    service.callback('?foo=bar');
    expect(mockHttpClient.post).toHaveBeenCalledWith('/auth/callback?foo=bar');
  });

  it('should call http.post on refreshToken', () => {
    const params = { refreshToken: 'r' };
    service.refreshToken(params as any);
    expect(mockHttpClient.post).toHaveBeenCalledWith('/auth/refresh', params);
  });

  it('should call http.post on register', () => {
    const params = { email: 'a', password: 'b' };
    service.register(params as any);
    expect(mockHttpClient.post).toHaveBeenCalledWith('/auth/register', params);
  });
});
