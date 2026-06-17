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

    /**
     * Trim whitespace in columns
     * POST /column/trim-whitespace
     */
    trimWhitespace(params: types.TrimWhitespace) {
        return this.http.post(`/column/trim-whitespace`, params);
    }

    /**
     * Case normalize columns
     * POST /column/case-normalize
     */
    caseNormalize(params: types.CaseNormalizationRequest) {
        return this.http.post(`/column/case-normalize`, params);
    }

    /**
     * Find and replace values in columns
     * POST /column/find-replace
     */
    findReplace(params: types.FindReplaceRequest) {
    return this.http.post(`/column/find-replace`, params);
    }

    /**
     * Remove special characters from columns
     * POST /column/remove-special-characters
     */
    removeSpecialCharacters(params: types.RemoveSpecialCharactersRequest) {
        return this.http.post(`/column/remove-special-characters`, params);
    }

    /**
     * Remove duplicates from columns
     * POST /column/remove-duplicates
     */
    removeDuplicates(params: types.RemoveDuplicatesRequest) {
        return this.http.post(`/column/remove-duplicates`, params);
    }

    /**
     * Remove formatting from columns
     * POST /column/remove-formatting
     */
    removeFormatting(params: types.RemoveFormattingRequest) {
        return this.http.post(`/column/remove-formatting`, params);
    }

    /**
     * Merge multiple columns into one
     * POST /column/merge-columns
     */
    mergeColumns(params: types.MergeColumnsRequest) {
        return this.http.post(`/column/merge-columns`, params);
    }

    /**
     * Split a column into multiple columns
     * POST /column/split
     */
    splitColumn(params: types.ColumnSplitRequest) {
        return this.http.post(`/column/split`, params);
    }

    /**
     * Extract substring from a column
     * POST /column/extract-substring
     */
    extractSubstring(params: types.ExtractSubstringRequest) {
        return this.http.post(`/column/extract-substring`, params);
    }
}
