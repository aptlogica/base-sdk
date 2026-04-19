// Copyright 2026-2030 Aptlogica Technologies Pvt Ltd
// Licensed under the Apache License, Version 2.0
// Websites: https://www.aptlogica.com | https://www.serenibase.com
// Support: support@aptlogica.com | support@serenibase.com

export interface ClientConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
  auth?: {
    type: 'bearer' | 'basic';
    token?: string;
    username?: string;
    password?: string;
  };
  cache?: {
    enabled: boolean;
    ttl?: number;
  };
  retries?: {
    enabled: boolean;
    maxRetries?: number;
    retryDelay?: number;
  };
  uploadLimits?: {
    maxFileSize?: number; // bytes, default 100MB (104857600)
    maxBulkSize?: number; // bytes, default 500MB (524288000)
    allowedFileTypes?: string[]; // MIME types, e.g., ['image/jpeg', 'image/png']
  };
}

export interface StandardResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: ErrorInfo;
  meta?: any;
}

export interface ErrorInfo {
  code: string;
  message: string;
  details?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  offset?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    offset: number;
    total?: number;
  };
  meta?: {
    total_pages?: number;
    has_next: boolean;
    has_previous: boolean;
    next_page?: number;
    previous_page?: number;
  };
}
