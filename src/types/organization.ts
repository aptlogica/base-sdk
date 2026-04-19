// Copyright 2026-2030 Aptlogica Technologies Pvt Ltd
// Licensed under the Apache License, Version 2.0
// Websites: https://www.aptlogica.com | https://www.serenibase.com
// Support: support@aptlogica.com | support@serenibase.com

export interface OrganizationResponse {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logo_url?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface OrganizationListResponse extends OrganizationResponse {}

export interface OrganizationUpdateRequest {
  name?: string;
  slug?: string;
  description?: string;
  logo_url?: string;
  status?: string;
}
