// Copyright (c) 2026 Aptlogica Technologies Private Limited
// SPDX-License-Identifier: MIT
// Websites: https://www.aptlogica.com | https://www.serenibase.com
// Support: support@aptlogica.com | support@serenibase.com

import { HttpClient } from "../client/http-client";
import * as types from "../types/workspace";

export class WorkspaceService {
  constructor(private readonly http: HttpClient) { }

  /**
   * Create new workspace
   * POST /workspace/create
   */
  create(params: types.CreateWorkspace) {
    return this.http.post(`/workspace/create`, params);
  }

  /**
   * Get all workspaces
   * GET /workspace/
   */
  getAll() {
    return this.http.get(`/workspace/`);
  }

  /**
   * Get workspace by ID
   * GET /workspace/:id
   */
  getById(id: string) {
    return this.http.get(`/workspace/${id}`);
  }

  /**
   * Update workspace
   * PUT /workspace/:id
   */
  update(id: string, params: types.UpdateWorkspace) {
    return this.http.put(`/workspace/${id}`, params);
  }

  /**
   * Delete workspace
   * DELETE /workspace/:id
   */
  delete(id: string) {
    return this.http.delete(`/workspace/${id}`);
  }

  /**
   * Get all tables in workspace
   * GET /workspace/:id/tables
   */
  getTablesByWorkspaceId(id: string) {
    return this.http.get(`/workspace/${id}/tables`);
  }

  /**
   * Get all bases in workspace
   * GET /workspace/:id/bases
   */
  getBasesByWorkspaceId(id: string) {
    return this.http.get(`/workspace/${id}/bases`);
  }

  /**
   * Get workspace members
   * GET /workspace/:id/members
   */
  getMembers(workspaceId: string) {
    return this.http.get(`/workspace/${workspaceId}/members`);
  }

  /**
   * Get members with detailed role information
   * GET /workspace/:id/members-with-roles
   */
  getMembersWithRoles(workspaceId: string) {
    return this.http.get(`/workspace/${workspaceId}/members-with-roles`);
  }

  /**
   * Remove user from workspace
   * POST /workspace/:id/remove
   */
  removeUserFromWorkspace(
    workspaceId: string,
    params: types.RemoveUserFromWorkspace
  ) {
    return this.http.post(`/workspace/${workspaceId}/remove`, params);
  }

  /**
   * Add multiple members to workspace
   * POST /workspace/:id/bulk-add-members
   */
  bulkAddMembers(
    workspaceId: string,
    params: types.BulkAddMembersRequest
  ) {
    return this.http.post(`/workspace/${workspaceId}/bulk-add-members`, params);
  }

  /**
   * Remove access member from workspace
   * DELETE /workspace/:id/access/:id
   */
  removeAccessMember(accessId: string) {
    return this.http.delete(`/workspace/access/${accessId}`);
  }

  /**
   * Invite multiple users to the workspace
   * Delegates to bulkAddMembers for better implementation
   */
  inviteUser(workspaceId: string, params: types.InviteMultipleUsers) {
    const accessRole = params.access_level === 'full_access' ? 'admin' : 'viewer';
    const baseMemberships = params.bases_ids
      ? [{ base_id: params.bases_ids, role: 'editor' }]
      : undefined;

    const bulkParams: types.BulkAddMembersRequest = {
      members: params.user_ids.map((user_id: string) => ({
        user_id,
        memberships: [
          {
            workspace_id: workspaceId,
            role: accessRole,
            bases: baseMemberships,
          },
        ],
      })),
    };
    return this.bulkAddMembers(workspaceId, bulkParams);
  }
}
