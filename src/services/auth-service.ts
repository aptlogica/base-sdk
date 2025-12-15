import { HttpClient } from '../client/http-client';
import * as types from '../types/auth';

export class AuthService {
  constructor(private http: HttpClient) {}

  // Register new user
  register(params: types.RegisterParams) {
    return this.http.post(`/auth/register`, params);
  }

  // Login user
  login(params: types.LoginParams) {
    return this.http.post(`/auth/login`, params);
  }

  // Refresh token
  refreshToken(params: types.RefreshTokenParams) {
    return this.http.post(`/auth/refresh`, params);
  }

  // Verify OTP
  verifyOtp(params: types.VerifyOtpParams) {
    return this.http.post(`/auth/otp/verify`, params);
  }

  // Resend OTP
  resendOtp(params: types.ResendOtpParams) {
    return this.http.post(`/auth/otp/resend`, params);
  }

  // Add reset password
  resetPassword(params: types.ResetPasswordParams) {
    return this.http.post(`/auth/reset-password`, params);
  }

  // Add forgot password
  forgotPassword(params: types.ForgotPasswordParams) {
    return this.http.post(`/auth/forgot-password`, params);
  }

  // identity provider
  loginByIdentityProvider(provider: string) {
    return this.http.get(`/auth/login/${provider}`);
  }

  // Logout user
  logout(params: types.LogoutParams) {
    return this.http.post(`/auth/logout`, params);
  }
  
  // callback for login
  callback(queryString: string) {
    return this.http.post(`/auth/callback${queryString}`);
  }
}
