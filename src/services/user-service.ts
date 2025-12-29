import { HttpClient } from "../client/http-client";
import * as types from "../types/user";

export class UserService {
  constructor(private http: HttpClient) {}

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
  updateProfile(id: string, params: types.UpdateUserProfileParams) {
    return this.http.patch(`/user/profile/${id}`, params);
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
    const formData = new FormData();
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
   * GET /user/roles-and-access
   */
  getUserRolesAndAccess(id: string) {
    return this.http.get(`/user/roles-and-access/${id}`);
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
    const formData = new FormData();
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
   */
  removeFromWorkspace(
    workspaceId: string,
    params: types.RemoveUserFromWorkspace
  ) {
    return this.http.post(`/workspace/${workspaceId}/remove`, params);
  }


  
}

