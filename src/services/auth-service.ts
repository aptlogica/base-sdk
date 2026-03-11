// Copyright (c) 2026 Aptlogica Technologies Private Limited
// SPDX-License-Identifier: MIT
// Websites: https://www.aptlogica.com | https://www.serenibase.com
// Support: support@aptlogica.com | support@serenibase.com

import { HttpClient } from '../client/http-client';
import * as types from '../types/auth';

export class AuthService {
  constructor(private readonly http: HttpClient) {}

  /**
   * Login with email and password
   * POST /auth/login
   */
  login(params: types.LoginParams) {
    return this.http.post(`/auth/login`, params);
  }

  /**
   * Verify email with OTP
   * POST /auth/otp/verify
   */
  verifyOtp(params: types.VerifyOtpParams) {
    return this.http.post(`/auth/otp/verify`, params);
  }

  /**
   * Resend OTP
   * POST /auth/otp/resend
   */
  resendOtp(params: types.ResendOtpParams) {
    return this.http.post(`/auth/otp/resend`, params);
  }

  /**
   * Request password reset
   * POST /auth/forgot-password
   */
  forgotPassword(params: types.ForgotPasswordParams) {
    return this.http.post(`/auth/forgot-password`, params);
  }

  /**
   * Reset password with token
   * POST /auth/reset-password
   */
  resetPassword(params: types.ResetPasswordParams) {
    return this.http.post(`/auth/reset-password`, params);
  }

  /**
   * Validate if token is valid
   * POST /auth/validate-token
   */
  validateToken(params: types.ValidateTokenParams) {
    return this.http.post(`/auth/validate-token`, params);
  }

  /**
   * Verify token validity
   * POST /auth/verify-token
   */
  verifyToken(params: types.VerifyTokenParams) {
    return this.http.post(`/auth/verify-token`, params);
  }

  /**
   * Logout and invalidate token
   * POST /auth/logout
   */
  logout(params: types.LogoutParams) {
    return this.http.post(`/auth/logout`, params);
  }

  /**
   * Login with identity provider
   * @deprecated Use OAuth/identity provider flows
   */
  loginByIdentityProvider(provider: string) {
    return this.http.get(`/auth/login/${provider}`);
  }

  /**
   * Callback for identity provider login
   * @deprecated Use OAuth/identity provider flows
   */
  callback(queryString: string) {
    return this.http.post(`/auth/callback${queryString}`);
  }

  /**
   * Refresh token
   * @deprecated Use standard refresh token flow
   */
  refreshToken(params: types.RefreshTokenParams) {
    return this.http.post(`/auth/refresh`, params);
  }

  /**
   * Register new user
   * @deprecated Use standard auth flow
   */
  register(params: types.RegisterParams) {
    return this.http.post(`/auth/register`, params);
  }
}
