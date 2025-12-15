import { HttpClient } from "../client/http-client";
import type * as types from "../types/tenant";

export class TenantService {
  constructor(private http: HttpClient) {}

  /**
   * Creates a new user under the tenant.
   * Equivalent to POST /tenant/user/create
   */
  async addUser(userData: types.AddUserRequest) {
    return this.http.post(`/tenant/user/create`, userData);
  }

  /**
   * Removes a user from the tenant.
   * Equivalent to POST /tenant/user/remove
   */
  async removeUser(userData: types.UserIDPayload) {
    return this.http.post(`/tenant/user/remove`, userData);
  }

  /**
   * activate a user from the tenant.
   * Equivalent to POST /tenant/user/activate
   */
  async activateUser(userData: types.UserIDPayload) {
    return this.http.post(`/tenant/user/activate`, userData);
  }

  /**
   * deactivate a user from the tenant.
   * Equivalent to POST /tenant/user/deactivate
   */
  async deactivateUser(userData: types.DeactivateUserPayload) {
    return this.http.post(`/tenant/user/deactivate`, userData);
  }
  /**
   * Retrieves the list of users for the tenant.
   * Equivalent to GET /tenant/users
   */
  async getUsers() {
    return this.http.get(`/tenant/users`);
  }

  /**
   * Retrieves the tenant information.
   * Equivalent to GET /tenant
   */
  async getTenant() {
    return this.http.get(`/tenant/info`);
  }

  /**
   * Updates tenant information.
   * Equivalent to PATCH /tenant/update
   */
  async updateTenant(updateData: types.UpdateTenant) {
    return this.http.patch(`/tenant/info`, updateData);
  }
}
