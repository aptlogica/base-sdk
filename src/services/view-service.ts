import { HttpClient } from '../client/http-client';
import * as types from '../types/table';

export class ViewService {
    constructor(private http: HttpClient) { }

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
    create(params: types.CreateView) {
        return this.http.post(`/view/create`, params);
    }

    /**
     * Get view by ID
     * GET /view/:id
     */
    getById(id: string) {
        return this.http.get(`/view/${id}`);
    }

    /**
     * Get all views
     * GET /view/
     */
    getAll() {
        return this.http.get(`/view/`);
    }

    /**
     * Update view
     * PATCH /view/:id
     */
    update(id: string, params: types.UpdateView) {
        return this.http.patch(`/view/${id}`, params);
    }

    /**
     * Delete view
     * DELETE /view/:id
     */
    delete(id: string) {
        return this.http.delete(`/view/${id}`);
    }
}
