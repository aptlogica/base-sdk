// Copyright (c) 2026 Aptlogica Technologies Private Limited
// SPDX-License-Identifier: MIT
// Websites: https://www.aptlogica.com | https://www.serenibase.com
// Support: support@aptlogica.com | support@serenibase.com

import { HttpClient } from '../client/http-client';
import * as types from '../types/table';

export class ColumnService {
    constructor(private readonly http: HttpClient) { }

    /**
     * Get all columns in table
     * GET /table/:id/columns
     */
    getColumnsByTableId(id: string) {
        return this.http.get(`/table/${id}/columns`);
    }

    /**
     * Create new column in table
     * POST /column/create
     */
    create(params: types.AddColumn) {
        return this.http.post(`/column/create`, params);
    }

    /**
     * Get column by ID
     * GET /column/:id
     */
    getById(id: string) {
        return this.http.get(`/column/${id}`);
    }

    /**
     * Get all columns
     * GET /column/
     */
    getAll() {
        return this.http.get(`/column/`);
    }

    /**
     * Update column
     * PATCH /column/:id
     */
    update(id: string, params: types.UpdateColumn) {
        return this.http.patch(`/column/${id}`, params);
    }

    /**
     * Delete column
     * DELETE /column/:id
     */
    delete(id: string) {
        return this.http.delete(`/column/${id}`);
    }

    /**
     * Reorder columns in table
     * POST /column/reorder
     */
    reorder(params: types.ReorderColumn) {
        return this.http.post(`/column/reorder`, params);
    }
}
