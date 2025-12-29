import { HttpClient } from '../client/http-client';
import * as types from '../types/base';

export class BaseService {
    constructor(private http: HttpClient) {}

    /**
     * Create new base (database)
     * POST /base/create
     */
    create(params: types.CreateBase) {
        return this.http.post(`/base/create`, params);
    }

    /**
     * Get base by ID
     * GET /base/:id
     */
    getById(id: string) {
        return this.http.get(`/base/${id}`);
    }

    /**
     * Update base
     * PUT /base/:id
     */
    update(id: string, params: types.UpdateBase) {
        return this.http.put(`/base/${id}`, params);
    }

    /**
     * Delete base
     * DELETE /base/:id
     */
    delete(id: string) {
        return this.http.delete(`/base/${id}`);
    }

    /**
     * Get all tables in base
     * GET /base/:id/tables
     */
    getTablesByBaseId(id: string) {
        return this.http.get(`/base/${id}/tables`);
    }

    /**
     * Get all bases
     * GET /base/
     */
    getAll() {
        return this.http.get(`/base/`);
    }

    /**
     * Get base members
     * GET /base/:id/members
     */
    getMembers(id: string) {
        return this.http.get(`/base/${id}/members`);
    }

    /**
     * Get members with role details
     * GET /base/:id/members-with-roles
     */
    getMembersWithRoles(id: string) {
        return this.http.get(`/base/${id}/members-with-roles`);
    }

    /**
     * Add multiple members to base
     * POST /base/:id/bulk-add-members
     */
    bulkAddMembers(id: string, params: types.BulkAddBaseMembersRequest) {
        return this.http.post(`/base/${id}/bulk-add-members`, params);
    }

    /**
     * Remove access member from base
     * DELETE /base/:id/access/:id
     */
    removeAccessMember(baseId: string, accessId: string) {
        return this.http.delete(`/base/${baseId}/access/${accessId}`);
    }
}