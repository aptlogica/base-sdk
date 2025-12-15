import { HttpClient } from "../client/http-client";
import * as types from "../types/user";

export class UserService {
  constructor(private http: HttpClient) {}

  // Get current user profile
  getProfile(id: string) {
    return this.http.get(`/user/profile/${id}`);
  }

  // Update current user profile
  updateProfile(id: string, params: types.UpdateUserProfileParams) {
    return this.http.patch(`/user/profile/${id}`, params);
  }

  // Change password
  changePassword(id: string, params: types.ChangePasswordParams) {
    return this.http.post(`/user/change-password/${id}`, params);
  }

  // Add or update user avatar
  addOrUpdateAvatar(id: string, avatarFile: File) {
    const formData = new FormData();
    formData.append("avatar", avatarFile);
    return this.http.post(`/user/profile/${id}/avatar`, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
  }

  // Remove user avatar
  removeAvatar(id: string) {
    return this.http.delete(`/user/profile/${id}/avatar`);
  }

  // Get workspaces for a user
  getWorkspaces() {
    return this.http.get(`/user/workspaces`);
  }

  // Assign user to workspace
  assignToWorkspace(params: types.AssignToWorkspaceParams) {
    return this.http.post(`/user/assign`, params);
  }

  removeFromWorkspace(
    workspaceId: string,
    params: types.RemoveUserFromWorkspace
  ) {
    return this.http.post(`/workspace/${workspaceId}/remove`, params);
  }

  // Get user's workspace and base access details
  getUserAccessDetails(userId: string, workspaceId?: string) {
    const params = new URLSearchParams({ user_id: userId });
    if (workspaceId) {
      params.append("workspace_id", workspaceId);
    }
    return this.http.get<types.UserAccessDetailsResponse>(
      `/user/access-details?user_id=${userId}`
    );
  }
}
