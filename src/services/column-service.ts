// Copyright 2026-2030 Aptlogica Technologies Pvt Ltd
// Licensed under the Apache License, Version 2.0
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

     /**
     * Reorder columns in table
     * POST /column/reset
     */
    reset(params: types.ResetColumn) {
        return this.http.post(`/column/reset`, params);
    }

    /**
     * Reorder columns in table
     * POST /column/bulk-update
     */
    bulkUpdate(params: types.BulkUpdateColumn) {
        return this.http.post(`/column/bulk-update`, params);
    }
}
