import { HttpClient } from '../client/http-client';
import * as types from '../types/table';

export class TableService {
    constructor(private http: HttpClient) {}

    // ============ TABLE ENDPOINTS ============

    /**
     * Create new table
     * POST /table/create
     */
    create(params: types.CreateTable) {
        return this.http.post(`/table/create`, params);
    }

    /**
     * Get table by ID
     * GET /table/:id
     */
    getById(id: string, options?: { page?: number; page_size?: number }) {
        if (options && (options.page !== undefined || options.page_size !== undefined)) {
            const page = options.page ?? 1;
            const page_size = options.page_size ?? 30;
            return this.http.get(`/table/${id}?page=${page}&page_size=${page_size}`);
        }
        return this.http.get(`/table/${id}`);
    }

    /**
     * Get all tables
     * GET /table/
     */
    getAll() {
        return this.http.get(`/table/`);
    }

    /**
     * Update table
     * PATCH /table/:id
     */
    update(id: string, params: types.UpdateTable) {
        return this.http.patch(`/table/${id}`, params);
    }

    /**
     * Delete table
     * DELETE /table/:id
     */
    delete(id: string) {
        return this.http.delete(`/table/${id}`);
    }

    /**
     * Import table from CSV/file
     * POST /table/import
     */
    import(
        params: types.ImportTable,
        extra?: (progressEvent: ProgressEvent) => void
    ) {
        const formData = new FormData();
        formData.append('base_id', params.base_id);
        formData.append('workspace_id', params.workspace_id);
        formData.append('title', params.title);
        formData.append('description', params.description);
        formData.append('order_index', params.order_index.toString());
        if (params.file) {
            formData.append('file', params.file);
        }
        const config: any = {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
        };
        if (typeof extra === 'function') {
            config.onUploadProgress = extra;
        }
        return this.http.post(`/table/import`, formData, config);
    }

    /**
     * Import AI table
     * POST /table/import/ai
     */
    importAiTable(params: types.ImportAiTable) {
        return this.http.post(`/table/import/ai`, params);
    }

    /**
     * Apply AI table import
     * POST /table/import/ai/apply
     */
    applyImportAiTable(params: types.ApplyImportAiTable, schema: string) {
        return this.http.post(`/table/import/ai/apply`, params);
    }

    // ============ COLUMN ENDPOINTS ============

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
    addColumn(params: types.AddColumn) {
        return this.http.post(`/column/create`, params);
    }

    /**
     * Get column by ID
     * GET /column/:id
     */
    getColumnById(id: string) {
        return this.http.get(`/column/${id}`);
    }

    /**
     * Get all columns
     * GET /column/
     */
    getAllColumns() {
        return this.http.get(`/column/`);
    }

    /**
     * Update column
     * PATCH /column/:id
     */
    updateColumn(id: string, params: types.UpdateColumn) {
        return this.http.patch(`/column/${id}`, params);
    }

    /**
     * Delete column
     * DELETE /column/:id
     */
    deleteColumn(id: string) {
        return this.http.delete(`/column/${id}`);
    }

    /**
     * Reorder columns in table
     * POST /column/reorder
     */
    reorderColumn(params: types.ReorderColumn) {
        return this.http.post(`/column/reorder`, params);
    }

    // ============ ROW ENDPOINTS ============

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
    createRow(params: types.CreateRow) {
        return this.http.post(`/row/create`, params);
    }

    /**
     * Delete row(s)
     * POST /row/remove
     */
    deleteRow(params: types.DeleteRow) {
        return this.http.post(`/row/remove`, params);
    }

    /**
     * Insert row data
     * POST /row/data/insert
     */
    insertRowData(params: types.InsertRowData) {
        return this.http.post(`/row/data/insert`, params);
    }

    /**
     * Insert relationship/link data between rows
     * POST /row/data/relation
     */
    insertRelationData(params: types.InsertRelationData) {
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
        const formData = new FormData();
        formData.append('model_id', params.model_id.toString());
        formData.append('column_id', params.column_id.toString());
        formData.append('row_id', params.row_id.toString());
        if (Array.isArray(params.files)) {
            params.files.forEach((file) => {
                formData.append('files', file);
            });
        }
        const config: any = {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
        };
        if (typeof extra === 'function') {
            config.onUploadProgress = extra;
        }
        return this.http.post(`/row/attachment/add`, formData, config);
    }

    /**
     * Remove attachment from row
     * POST /row/attachment/remove
     */
    removeAttachments(params: types.RemoveAttachments) {
        return this.http.post(`/row/attachment/remove`, params);
    }

    // ============ VIEW ENDPOINTS ============

    /**
     * Get all views for table
     * GET /table/:id/views
     */
    getViewsByModelId(id: string) {
        return this.http.get(`/table/${id}/views`);
    }

    /**
     * Create view of table data
     * POST /view/create
     */
    createView(params: types.CreateView) {
        return this.http.post(`/view/create`, params);
    }

    /**
     * Get view by ID
     * GET /view/:id
     */
    getViewById(id: string) {
        return this.http.get(`/view/${id}`);
    }

    /**
     * Get all views
     * GET /view/
     */
    getAllViews() {
        return this.http.get(`/view/`);
    }

    /**
     * Update view
     * PATCH /view/:id
     */
    updateView(id: string, params: types.UpdateView) {
        return this.http.patch(`/view/${id}`, params);
    }

    /**
     * Delete view
     * DELETE /view/:id
     */
    deleteView(id: string) {
        return this.http.delete(`/view/${id}`);
    }

    // ============ ASSET ENDPOINTS ============

    /**
     * Get multiple assets by IDs
     * POST /asset/bulk
     */
    getBulkAssets(params: types.GetBulkAssets) {
        return this.http.post(`/asset/bulk`, params);
    }

    /**
     * Update asset metadata
     * PATCH /asset/:id
     */
    updateAssetById(id: string, params: types.UpdateAsset) {
        return this.http.patch(`/asset/${id}`, params);
    }

    /**
     * Delete asset
     * DELETE /asset/:id
     */
    deleteAssetById(id: string) {
        return this.http.delete(`/asset/${id}`);
    }
}
