import { HttpClient } from "../client/http-client";
import * as types from "../types/organization";

export class OrganizationService {
  constructor(private http: HttpClient) {}

  /**
   * Get all organizations (user is member of)
   * GET /organization
   */
  getAll() {
    return this.http.get<types.OrganizationListResponse[]>(`/organization`);
  }

  /**
   * Get organization by ID
   * GET /organization/:id
   */
  getById(id: string) {
    return this.http.get<types.OrganizationResponse>(`/organization/${id}`);
  }

  /**
   * Update organization
   * PUT /organization/:id
   */
  update(id: string, params: types.OrganizationUpdateRequest) {
    return this.http.put<types.OrganizationResponse>(
      `/organization/${id}`,
      params
    );
  }
}
