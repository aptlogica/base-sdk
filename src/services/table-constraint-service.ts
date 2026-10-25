// Copyright 2026-2030 Aptlogica Technologies Pvt Ltd
// Licensed under the Apache License, Version 2.0
// Websites: https://www.aptlogica.com | https://www.serenibase.com
// Support: support@aptlogica.com | support@serenibase.com


import { HttpClient } from '../client/http-client';
import * as types from '../types/table-constraint';

export class TableConstraintService {
    constructor(private readonly http: HttpClient) { }

    /**
     * List constraints of a table
     * GET /table-constraint?model_id=&type=
     */
    list(modelId: string, type: types.TableConstraintType) {
        return this.http.get<types.TableConstraint[]>(`/table-constraint`, {
            params: { model_id: modelId, type },
        });
    }

    /**
     * Check whether existing data satisfies a constraint
     * POST /table-constraint/check
     */
    check(params: types.CheckTableConstraint) {
        return this.http.post<types.ConstraintCheckResult>(`/table-constraint/check`, params);
    }

    /**
     * Create a constraint
     * POST /table-constraint/create
     */
    create(params: types.CreateTableConstraint) {
        return this.http.post<types.TableConstraint>(`/table-constraint/create`, params);
    }

    /**
     * Update a constraint
     * PUT /table-constraint/:id
     */
    update(id: string, params: types.UpdateTableConstraint) {
        return this.http.put<types.TableConstraint>(`/table-constraint/${id}`, params);
    }

    /**
     * Delete a constraint
     * DELETE /table-constraint/:id
     */
    delete(id: string) {
        return this.http.delete(`/table-constraint/${id}`);
    }
}
