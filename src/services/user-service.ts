// Copyright (c) 2026 Aptlogica Technologies Private Limited
// SPDX-License-Identifier: MIT
// Websites: https://www.aptlogica.com | https://www.serenibase.com
// Support: support@aptlogica.com | support@serenibase.com

import { HttpClient } from "../client/http-client";
import * as types from "../types/user";
import { WorkspaceService } from "./workspace-service";
import { createFormData } from "../utils/form-data";

export class UserService {
  private workspaceService: WorkspaceService | null = null;

  constructor(private readonly http: HttpClient) { }

  // Method to inject WorkspaceService (called from main client)
  setWorkspaceService(workspaceService: WorkspaceService) {
    this.workspaceService = workspaceService;
  }

  /**
   * Get user profile by ID
   * GET /user/profile/:id
   */
  getProfile(id: string) {
    return this.http.get(`/user/profile/${id}`);
  }

  /**
   * Update user profile
   * PATCH /user/profile/:id
   */
  updateProfile(id: string, params: types.UpdateUserProfileParams, avatarFile?: File) {
    const formData = createFormData();

    if (params.first_name !== undefined) {
      formData.append('first_name', params.first_name);
    }

    if (params.last_name !== undefined) {
      formData.append('last_name', params.last_name);
    }

    if (params.display_name !== undefined) {
      formData.append('display_name', params.display_name);
    }

    if (params.dob !== undefined) {
      formData.append('dob', params.dob);
    }

    if (params.country !== undefined) {
      formData.append('country', params.country);
    }

    if (params.timezone !== undefined) {
      formData.append('timezone', params.timezone);
    }

    if (params.locale !== undefined) {
      formData.append('locale', params.locale);
    }

    if (avatarFile) {
      formData.append('avatar', avatarFile); // db: "avatar"
    }
    if(params.activity_data) {
      formData.append('activity_data', JSON.stringify(params.activity_data));
    }

    return this.http.patch(`/user/profile/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  /**
   * Change user password
   * POST /user/change-password/:id
   */
  changePassword(id: string, params: types.ChangePasswordParams) {
    return this.http.post(`/user/change-password/${id}`, params);
  }

  /**
   * Add or update user avatar
   * POST /user/profile/:id/avatar
   */
  addOrUpdateAvatar(id: string, avatarFile: File) {
    const formData = createFormData();
    formData.append("file", avatarFile);
    return this.http.post(`/user/profile/${id}/avatar`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  /**
   * Remove user avatar
   * DELETE /user/profile/:id/avatar
   */
  removeAvatar(id: string) {
    return this.http.delete(`/user/profile/${id}/avatar`);
  }

  /**
   * Get all workspaces for current user
   * GET /user/workspaces
   */
  getWorkspaces() {
    return this.http.get(`/user/workspaces`);
  }

  /**
   * Get detailed access information for user
   * GET /user/access-details
   */
  getUserAccessDetails() {
    return this.http.get<types.UserAccessDetailsResponse>(
      `/user/access-details`
    );
  }

  /**
   * Get user roles and access
   * GET /user/roles-and-access/:id
   * @param id - User ID
   * @param scopeId - Optional scope ID to filter by (e.g., workspace ID)
   */
  getUserRolesAndAccess(id: string, scopeId?: string) {
    const params = scopeId ? { scope_id: scopeId } : undefined;
    return this.http.get(`/user/roles-and-access/${id}`, { params });
  }

  /**
   * Assign user to workspace
   * POST /user/assign
   */
  assignToWorkspace(params: types.AssignToWorkspaceParams) {
    return this.http.post(`/user/assign`, params);
  }

  /**
   * Update user access permissions
   * PUT /user/access/update
   */
  updateUserAccess(params: types.UpdateUserAccessParams) {
    return this.http.put(`/user/access/update`, params);
  }

  /**
   * Add new user
   * POST /user/create
   */
  async addUser(userData: types.AddUserRequest) {
    const formData = createFormData();
    formData.append('email', userData.email);
    formData.append('firstname', userData.firstname);
    formData.append('lastname', userData.lastname);

    if (userData.profile_pic) {
      formData.append('profile_pic', userData.profile_pic);
    }

    if (userData.is_coowner !== undefined) {
      formData.append('is_coowner', String(userData.is_coowner));
    }

    if (userData.membership) {
      formData.append('membership', JSON.stringify(userData.membership));
    }

    return this.http.post(`/user/create`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  /**
   * Edit existing user
   * POST /user/edit
   */
  async editUser(userData: types.EditUserRequest) {
    const formData = new FormData();
    formData.append('user_id', userData.user_id);

    if (userData.firstname !== undefined) {
      formData.append('firstname', userData.firstname);
    }

    if (userData.lastname !== undefined) {
      formData.append('lastname', userData.lastname);
    }

    if (userData.profile_pic) {
      formData.append('profile_pic', userData.profile_pic);
    }

    if (userData.is_coowner !== undefined) {
      formData.append('is_coowner', String(userData.is_coowner));
    }

    if (userData.membership) {
      formData.append('membership', JSON.stringify(userData.membership));
    }

    const uploadLimits = this.http.getUploadLimits(false);
    return this.http.post(`/user/edit`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      ...uploadLimits
    });
  }


  /**
   * Remove/delete user (Tenant Admin)
   * POST /user/remove
   */
  removeUser(params: types.UserRemoveRequest) {
    return this.http.post(`/user/remove`, params);
  }

  /**
   * Activate user account (Tenant Admin)
   * POST /user/activate
   */
  activateUser(params: types.UserActivateRequest) {
    return this.http.post(`/user/activate`, params);
  }

  /**
   * Deactivate user account (Tenant Admin)
   * POST /user/deactivate
   */
  deactivateUser(params: types.UserDeactivateRequest) {
    return this.http.post(`/user/deactivate`, params);
  }

  /**
   * Get all users in tenant (Tenant Admin)
   * GET /user/list
   */
  listUsers() {
    return this.http.get(`/user/list`);
  }

  /**
   * Get active users available for assignment
   * GET /user/list-for-assign
   */
  listUsersForAssign() {
    return this.http.get(`/user/list-for-assign`);
  }

  /**
   * Remove user from workspace
   * POST /workspace/:id/remove
   * Delegates to WorkspaceService for better code organization
   */
  removeFromWorkspace(
    workspaceId: string,
    params: types.RemoveUserFromWorkspace
  ) {
    if (this.workspaceService) {
      return this.workspaceService.removeUserFromWorkspace(workspaceId, params);
    }
    // Fallback if WorkspaceService not injected yet
    return this.http.post(`/workspace/${workspaceId}/remove`, params);
  }
}
