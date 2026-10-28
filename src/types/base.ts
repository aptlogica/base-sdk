// Copyright 2026-2030 Aptlogica Technologies Pvt Ltd
// Licensed under the Apache License, Version 2.0
// Websites: https://www.aptlogica.com | https://www.serenibase.com
// Support: support@aptlogica.com | support@serenibase.com


import { MembershipRequest } from "./user";

export interface CreateBase {
  title: string;
  description: string;
  workspace_id: string;
  image?: File | Blob;
  /** Base-level settings. Sent as a JSON string form field. */
  meta?: Record<string, unknown>;
}

export interface UpdateBase {
  title?: string;
  description?: string;
  icon?: string;
  status?: string;
  visibility?: string;
  image?: File | Blob;
  removeImage?: boolean;
  /** Replaces the stored meta (not merged). Sent as a JSON string form field. */
  meta?: Record<string, unknown>;
}

export interface BulkAddMembersRequest {
  user_id: string;
  memberships: MembershipRequest[];
}

export interface BulkAddBaseMembersRequest {
  members: BulkAddMembersRequest[];
}

export interface RemoveUserFromBase {
  user_id: string;
}