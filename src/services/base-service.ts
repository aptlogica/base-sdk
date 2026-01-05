import { HttpClient } from '../client/http-client';
import * as types from '../types/base';
import { createFormData } from '../utils/form-data';

export class BaseService {
    constructor(private http: HttpClient) { }

    /**
     * Create new base (database)
     * POST /base/create
     */
    async create(params: types.CreateBase) {
        const formData = createFormData();
        formData.append('title', params.title);

        if (params.description) {
            formData.append('description', params.description);
        }

        if (params.workspace_id) {
            formData.append('workspace_id', params.workspace_id);
        }

        if (params.image) {
            formData.append('image', params.image);
        }

        const uploadLimits = this.http.getUploadLimits(false);
        return this.http.post(`/base/create`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            ...uploadLimits
        });
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
        const formData = createFormData();

        if (params.title !== undefined) {
            formData.append('title', params.title);
        }

        if (params.description !== undefined) {
            formData.append('description', params.description);
        }

        if (params.icon !== undefined) {
            formData.append('icon', params.icon);
        }

        if (params.status !== undefined) {
            formData.append('status', params.status);
        }

        if (params.visibility !== undefined) {
            formData.append('visibility', params.visibility);
        }

        if (params.image) {
            formData.append('image', params.image);
        }

        const uploadLimits = this.http.getUploadLimits(false);
        return this.http.put(`/base/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            ...uploadLimits
        });
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
    removeAccessMember(accessId: string) {
        return this.http.delete(`/base/access/${accessId}`);
    }

    /**
     * Upload or update base image
     * POST /base/:id/image
     */
    uploadImage(id: string, imageFile: File) {
        const formData = createFormData();
        formData.append('image', imageFile);
        // const uploadLimits = this.http.getUploadLimits(false);
        return this.http.post(`/base/${id}/image`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            // ...uploadLimits
        });
    }

    /**
     * Delete base image
     * DELETE /base/:id/image
     */
    deleteImage(id: string) {
        return this.http.delete(`/base/${id}/image`);
    }

    /**
       * Remove user from base
       * POST /base/:id/remove
       */
    removeUserFromBase(
        baseId: string,
        params: types.RemoveUserFromBase
    ) {
        return this.http.post(`/base/${baseId}/remove`, params);
    }
}