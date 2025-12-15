import { HttpClient } from '../client/http-client';
import * as types from '../types/table';

export class TableService {
    constructor(private http: HttpClient) {}
    // Table-related API methods for SDK

    // Create a new table
    create(params: types.CreateTable) {
        return this.http.post(`/table/create`, params);
    }

    // Update a table by ID
    update(id: string, params: types.UpdateTable) {
        return this.http.patch(`/table/${id}`, params);
    }

    // Get a table by ID
    getById(id: string, options?: { pageNumber?: number; pageLimit?: number }) {
        if (options && (options.pageNumber !== undefined || options.pageLimit !== undefined)) {
            const pageNumber = options.pageNumber ?? 1;
            const pageLimit = options.pageLimit ?? 30;
            return this.http.get(`/table/${id}?page=${pageNumber}&page_size=${pageLimit}`);
        }
        return this.http.get(`/table/${id}`);
    }

    // Get all tables
    getAll() {
        return this.http.get(`/table/`);
    }

    // Get columns by table ID
    getColumnsByTableId(id: string) {
        return this.http.get(`/table/${id}/columns`);
    }

    // Get views by table/model ID
    getViewsByModelId(id: string) {
        return this.http.get(`/table/${id}/views`);
    }

    // Get all records by table ID
    getAllRecords(id: string, options?: { pageNumber?: number; pageLimit?: number }) {
        const pageNumber = options?.pageNumber ?? 1;
        const pageLimit = options?.pageLimit ?? 30;
        return this.http.get(`/table/${id}/records?page=${pageNumber}&page_size=${pageLimit}`);
    }

    // Delete a table by ID
    delete(id: string) {
        return this.http.delete(`/table/${id}`);
    }

    // Column-related API methods

    // Add a new column
    addColumn(params: types.AddColumn) {
        return this.http.post(`/column/create`, params);
    }

    // Get a column by ID
    getColumnById(id: string) {
        return this.http.get(`/column/${id}`);
    }

    // Get all columns
    getAllColumns() {
        return this.http.get(`/column/`);
    }

    // Update a column by ID
    updateColumn(id: string, params: types.UpdateColumn) {
        return this.http.patch(`/column/${id}`, params);
    }

    // Delete a column by ID
    deleteColumn(id: string) {
        return this.http.delete(`/column/${id}`);
    }

    // Column reorder
    // Reorder columns in a table by specifying source and target column IDs
    reorderColumn(params: types.ReorderColumn) {
        return this.http.post(`/column/reorder`, params);
    }

    // Row-related API methods

    // Create a new row
    createRow(params: types.CreateRow) {
        return this.http.post(`/row/create`, params);
    }

    // Insert row data
    insertRowData(params: types.InsertRowData) {
        // implement validations per column datatype
        // implement logic for attachment type 
        return this.http.post(`/row/data/insert`, params);
    }

    // Insert relation data for a row (e.g., for many-to-many or linked records)
    insertRelationData(params: types.InsertRelationData) {
        return this.http.post(`/row/data/relation`, params);
    }

    // Add attachment(s) to a row
    addAttachment(
        params: types.AddAttachments,
        extra?: (progressEvent: ProgressEvent) => void
    ) {
        const formData = new FormData();
        formData.append('model_id', params.model_id);
        formData.append('column_id', params.column_id);
        formData.append('row_id', params.row_id.toString());
        if (Array.isArray(params.files)) {
            params.files.forEach((file) => {
                formData.append('files', file);
            });
        }
        const config: any = {
            headers: {
                'content-type': 'multipart/form-data'
            },
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
        };
        if (typeof extra === 'function') {
            config.onUploadProgress = extra;
        }
        return this.http.post(`/row/attachment/add`, formData, config);
    }

    // Remove attachment(s) from a row
    removeAttachments(params: types.RemoveAttachments) {
        return this.http.post(`/row/attachment/remove`, params);
    }

    // // Get user profile by ID
    // getUserProfileByID(id: string) {
    //     return this.http.get(`/user/profile/${id}`);
    // }

    // Delete a row
    deleteRow(params: types.DeleteRow) {
        return this.http.post(`/row/remove`, params);
    }

    // View-related API methods

    // Create a new view
    createView(params: types.CreateView) {
        return this.http.post(`/view/create`, params);
    }

    // Get a view by ID
    getViewById(id: string) {
        return this.http.get(`/view/${id}`);
    }

    // Get all views
    getAllViews() {
        return this.http.get(`/view/`);
    }

    // Update a view by ID
    updateView(id: string, params: types.UpdateView) {
        return this.http.patch(`/view/${id}`, params);
    }

    // Delete a view by ID
    deleteView(id: string) {
        return this.http.delete(`/view/${id}`);
    }

    // Asset-related API methods
    
    // Get bulk assets
    getBulkAssets(params: types.GetBulkAssets) {
        return this.http.post(`/asset/bulk`, params);
    }

    // Update asset by ID
    updateAssetById(id: string, params: types.UpdateAsset) {
        return this.http.patch(`/asset/${id}`, params);
    }

    // Delete asset by ID
    deleteAssetById(id: string) {
        return this.http.delete(`/asset/${id}`);
    }

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
                'content-type': 'multipart/form-data'
            },
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
        };
        if (typeof extra === 'function') {
            config.onUploadProgress = extra;
        }
        return this.http.post(`/table/import`, formData, config);
    }

    importAiTable(params: types.ImportAiTable) {
        return this.http.post(`/table/import/ai`, params);
    }
}
