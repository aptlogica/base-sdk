// Copyright 2026-2030 Aptlogica Technologies Pvt Ltd
// Licensed under the Apache License, Version 2.0
// Websites: https://www.aptlogica.com | https://www.serenibase.com
// Support: support@aptlogica.com | support@serenibase.com


import { HttpClient } from '../client/http-client';
import * as types from '../types/table';
import { createFormData } from '../utils/form-data';

export class RowService {
    constructor(private readonly http: HttpClient) { }

    /**
     * Get all records in table
     * GET /table/:id/records
     */
    getAllRecords(id: string, options?: { page?: number; page_size?: number }) {
        const page = options?.page ?? 1;
        const page_size = options?.page_size ?? 30;
        return this.http.get(`/table/${id}/records?page=${page}&page_size=${page_size}`);
    }

    /**
     * Create new record/row
     * POST /row/create
     */
    create(params: types.CreateRow) {
        return this.http.post(`/row/create`, params);
    }

    /**
     * Delete row(s)
     * POST /row/remove
     */
    delete(params: types.DeleteRow) {
        return this.http.post(`/row/remove`, params);
    }

    /**
     * Bulk delete multiple rows
     * POST /row/bulk-remove
     */
    bulkDelete(params: types.BulkDeleteRow) {
        return this.http.post(`/row/bulk-remove`, params);
    }

    /**
     * Bulk insert multiple rows
     * POST /row/bulk-insert
     */
    bulkInsert(params: types.BulkInsertRow) {
        return this.http.post(`/row/bulk-insert`, params);
    }

    /**
     * Insert row data
     * POST /row/data/insert
     */
    insertData(params: types.InsertRowData) {
        return this.http.post(`/row/data/insert`, params);
    }

    /**
     * Insert relationship/link data between rows
     * POST /row/data/relation
     */
    insertRelation(params: types.InsertRelationData) {
        return this.http.post(`/row/data/relation`, params);
    }

    /**
     * Add attachment to row
     * POST /row/attachment/add
     */
    addAttachment(
        params: types.AddAttachments,
        extra?: (progressEvent: ProgressEvent) => void
    ) {
        const formData = createFormData();
        formData.append('model_id', params.model_id.toString());
        formData.append('column_id', params.column_id.toString());
        formData.append('row_id', params.row_id.toString());
        if (Array.isArray(params.files)) {
            params.files.forEach((file) => {
                formData.append('files', file);
            });
        }

        const uploadLimits = this.http.getUploadLimits(true); // bulk upload
        const config: any = {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            ...uploadLimits
        };
        if (typeof extra === 'function') {
            config.onUploadProgress = extra;
        }
        return this.http.post(`/row/attachment/add`, formData, config);
    }

     /**
     * Update attachment for row
     * POST /row/attachment/update
     */
    updateAttachment(params: types.UpdateAttachments) {
        return this.http.post(`/row/attachment/update`, params);
    }

    /**
     * Remove attachment from row
     * POST /row/attachment/remove
     */
    removeAttachment(params: types.RemoveAttachments) {
        return this.http.post(`/row/attachment/remove`, params);
    }
}
