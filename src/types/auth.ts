// Copyright 2026-2030 Aptlogica Technologies Pvt Ltd
// Licensed under the Apache License, Version 2.0
// Websites: https://www.aptlogica.com | https://www.serenibase.com
// Support: support@aptlogica.com | support@serenibase.com

export interface LoginParams {
  email: string;
  password: string;
}

export interface RegisterParams {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface VerifyOtpParams {
  token: string;
  otp: string;
}

export interface ValidateTokenParams {
  token: string;
}

export interface VerifyTokenParams {
  token: string;
}

export interface RefreshTokenParams {
  refresh_token: string;
}

export interface ResendOtpParams {
  token: string;
}

export interface ResetPasswordParams {
  token: string;
  new_password: string;
}

export interface ForgotPasswordParams {
  email: string;
}

export interface LogoutParams {
  token: string;
}
