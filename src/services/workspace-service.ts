import { HttpClient } from "../client/http-client";
import * as types from "../types/workspace";

export class WorkspaceService {
  constructor(private http: HttpClient) {}

  // create workspace
  create(params: types.CreateWorkspace) {
    return this.http.post(`/workspace/create`, params);
  }

  // Get all workspaces
  getAll() {
    return this.http.get(`/workspace/`);
  }

  // Get a workspace by ID
  getById(id: string) {
    return this.http.get(`/workspace/${id}`);
  }

  // Get tables by workspace ID
  getTablesByWorkspaceId(id: string) {
    return this.http.get(`/workspace/${id}/tables`);
  }

  // Update a workspace by ID
  update(id: string, params: types.UpdateWorkspace) {
    return this.http.put(`/workspace/${id}`, params);
  }

  // Delete a workspace by ID
  delete(id: string) {
    return this.http.delete(`/workspace/${id}`);
  }

  // Get bases by workspace ID
  getBasesByWorkspaceId(id: string) {
    return this.http.get(`/workspace/${id}/bases`);
  }

  // Invite multiple users to the workspace
  inviteUser(workspaceId: string, params: types.InviteMultipleUsers) {
    return this.http.post<types.InviteMultipleUsersResponse>(
      `/workspace/${workspaceId}/invite`,
      params
    );
  }

  // Remove a user from the workspace
  removeUserFromWorkspace(
    workspaceId: string,
    params: types.RemoveUserFromWorkspace
  ) {
    return this.http.post(`/workspace/${workspaceId}/remove`, params);
  }

  // Get members of a workspace
  getMembers(workspaceId: string) {
    return this.http.get(`/workspace/${workspaceId}/members`);
  }
}
