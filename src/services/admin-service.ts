// Copyright 2026-2030 Aptlogica Technologies Pvt Ltd
// Licensed under the Apache License, Version 2.0
// Websites: https://www.aptlogica.com | https://www.serenibase.com
// Support: support@aptlogica.com | support@serenibase.com

import { HttpClient } from '../client/http-client';

export class AdminService {
  constructor(private readonly http: HttpClient) {}

  /**
   * Get timer status
   * GET /admin/timer/status
   */
  getTimerStatus() {
    return this.http.get(`/admin/timer/status`);
  }

  /**
   * Reset data
   * POST /admin/reset-data
   */
  resetData() {
    return this.http.post(`/admin/reset-data`, {});
  }
}
