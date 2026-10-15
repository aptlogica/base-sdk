// Copyright 2026-2030 Aptlogica Technologies Pvt Ltd
// Licensed under the Apache License, Version 2.0
// Websites: https://www.aptlogica.com | https://www.serenibase.com
// Support: support@aptlogica.com | support@serenibase.com


import { HttpClient } from '../client/http-client';
import * as types from '../types/automation';

export class AutomationService {
    constructor(private readonly http: HttpClient) { }

    /**
     * List automations of a table
     * GET /automation?model_id=
     */
    list(modelId: string) {
        return this.http.get<types.Automation[]>(`/automation`, { params: { model_id: modelId } });
    }

    /**
     * Save a new automation definition (use run() to apply it)
     * POST /automation/create
     */
    create(params: types.CreateAutomation) {
        return this.http.post<types.Automation>(`/automation/create`, params);
    }

    /**
     * Update an automation definition
     * PUT /automation/:id
     */
    update(id: string, params: types.UpdateAutomation) {
        return this.http.put<types.Automation>(`/automation/${id}`, params);
    }

    /**
     * Apply the automation in Postgres
     * POST /automation/:id/run
     */
    run(id: string) {
        return this.http.post<types.Automation>(`/automation/${id}/run`);
    }

    /**
     * Dry-run the query in a rolled-back transaction
     * POST /automation/validate
     */
    validate(params: types.ValidateAutomation) {
        return this.http.post<types.AutomationValidationResult>(`/automation/validate`, params);
    }

    /**
     * Delete an automation (also drops the trigger)
     * DELETE /automation/:id
     */
    delete(id: string) {
        return this.http.delete(`/automation/${id}`);
    }
}
