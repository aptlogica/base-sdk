import { HttpClient } from '../client/http-client';
import * as types from '../types/base';

export class BaseService    {
    constructor(private http: HttpClient) {}

    // Create a new base
    create(params: types.CreateBase) {
        return this.http.post(`/base/create`, params);
    }

    // Get a base by ID
    getById(id: string) {
        return this.http.get(`/base/${id}`);
    }

    // Get tables by base ID
    getTablesByBaseId(id: string) {
        return this.http.get(`/base/${id}/tables`);
    }

    // Get all bases
    getAll() {
        return this.http.get(`/base/`);
    }

    // Update a base by ID
    update(id: string, params: types.UpdateBase) {
        return this.http.put(`/base/${id}`, params);
    }

    // Delete a base by ID
    delete(id: string) {
        return this.http.delete(`/base/${id}`);
    }

    // Get base members
    getMembers(id:string){
        return this.http.get(`/base/${id}/members`);
    }

}