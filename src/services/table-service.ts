import { HttpClient } from '../client/http-client';
import * as types from '../types/table';
import * as assetTypes from '../types/asset';
import { ColumnService } from './column-service';
import { RowService } from './row-service';
import { ViewService } from './view-service';
import { AssetService } from './asset-service';
import { createFormData } from '../utils/form-data';

export class TableService {
    private columnService: ColumnService;
    private rowService: RowService;
    private viewService: ViewService;
    private assetService: AssetService;

    constructor(private http: HttpClient) {
        // Initialize specialized services
        this.columnService = new ColumnService(http);
        this.rowService = new RowService(http);
        this.viewService = new ViewService(http);
        this.assetService = new AssetService(http);
    }

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
        const formData = createFormData();
        if (params.base_id) {
            formData.append('base_id', params.base_id);
        }
        formData.append('workspace_id', params.workspace_id);
        formData.append('title', params.title);
        formData.append('description', params.description);
        formData.append('order_index', params.order_index.toString());
        if (params.file) {
            formData.append('file', params.file);
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
        return this.http.post(`/table/import`, formData, config);
    }

    // ============ COLUMN ENDPOINTS ============
    // Delegated to ColumnService for better code organization

    /**
     * Get all columns in table
     * GET /table/:id/columns
     */
    getColumnsByTableId(id: string) {
        return this.columnService.getColumnsByTableId(id);
    }

    /**
     * Create new column in table
     * POST /column/create
     */
    addColumn(params: types.AddColumn) {
        return this.columnService.create(params);
    }

    /**
     * Get column by ID
     * GET /column/:id
     */
    getColumnById(id: string) {
        return this.columnService.getById(id);
    }

    /**
     * Get all columns
     * GET /column/
     */
    getAllColumns() {
        return this.columnService.getAll();
    }

    /**
     * Update column
     * PATCH /column/:id
     */
    updateColumn(id: string, params: types.UpdateColumn) {
        return this.columnService.update(id, params);
    }

    /**
     * Delete column
     * DELETE /column/:id
     */
    deleteColumn(id: string) {
        return this.columnService.delete(id);
    }

    /**
     * Reorder columns in table
     * POST /column/reorder
     */
    reorderColumn(params: types.ReorderColumn) {
        return this.columnService.reorder(params);
    }

    // ============ ROW ENDPOINTS ============
    // Delegated to RowService for better code organization

    /**
     * Get all records in table
     * GET /table/:id/records
     */
    getAllRecords(id: string, options?: { page?: number; page_size?: number }) {
        return this.rowService.getAllRecords(id, options);
    }

    /**
     * Create new record/row
     * POST /row/create
     */
    createRow(params: types.CreateRow) {
        return this.rowService.create(params);
    }

    /**
     * Delete row(s)
     * POST /row/remove
     */
    deleteRow(params: types.DeleteRow) {
        return this.rowService.delete(params);
    }

    /**
     * Bulk delete multiple rows
     * POST /row/bulk-remove
     */
    bulkDeleteRow(params: types.BulkDeleteRow) {
        return this.rowService.bulkDelete(params);
    }

    /**
     * Insert row data
     * POST /row/data/insert
     */
    insertRowData(params: types.InsertRowData) {
        return this.rowService.insertData(params);
    }

    /**
     * Insert relationship/link data between rows
     * POST /row/data/relation
     */
    insertRelationData(params: types.InsertRelationData) {
        return this.rowService.insertRelation(params);
    }

    /**
     * Add attachment to row
     * POST /row/attachment/add
     */
    addAttachment(
        params: types.AddAttachments,
        extra?: (progressEvent: ProgressEvent) => void
    ) {
        return this.rowService.addAttachment(params, extra);
    }

    /**
     * Remove attachment from row
     * POST /row/attachment/remove
     */
    removeAttachments(params: types.RemoveAttachments) {
        return this.rowService.removeAttachment(params);
    }

    // ============ VIEW ENDPOINTS ============
    // Delegated to ViewService for better code organization

    /**
     * Get all views for table
     * GET /table/:id/views
     */
    getViewsByModelId(id: string) {
        return this.viewService.getViewsByModelId(id);
    }

    /**
     * Create view of table data
     * POST /view/create
     */
    createView(params: types.CreateView) {
        return this.viewService.create(params);
    }

    /**
     * Get view by ID
     * GET /view/:id
     */
    getViewById(id: string) {
        return this.viewService.getById(id);
    }

    /**
     * Get all views
     * GET /view/
     */
    getAllViews() {
        return this.viewService.getAll();
    }

    /**
     * Update view
     * PATCH /view/:id
     */
    updateView(id: string, params: types.UpdateView) {
        return this.viewService.update(id, params);
    }

    /**
     * Delete view
     * DELETE /view/:id
     */
    deleteView(id: string) {
        return this.viewService.delete(id);
    }

    // ============ ASSET ENDPOINTS ============
    // Delegated to AssetService for better code organization

    /**
     * Get multiple assets by IDs
     * POST /asset/bulk
     * @deprecated Use types.GetBulkAssets with 'ids' property, will be migrated to 'asset_ids'
     */
    getBulkAssets(params: types.GetBulkAssets | assetTypes.GetBulkAssets) {
        // Handle both old and new format
        const assetParams: assetTypes.GetBulkAssets = 'ids' in params
            ? { asset_ids: params.ids }
            : params;
        return this.assetService.getBulk(assetParams);
    }

    /**
     * Update asset metadata
     * PATCH /asset/:id
     */
    updateAssetById(id: string, params: assetTypes.UpdateAsset) {
        return this.assetService.updateById(id, params);
    }

    /**
     * Delete asset
     * DELETE /asset/:id
     */
    deleteAssetById(id: string) {
        return this.assetService.deleteById(id);
    }
}
