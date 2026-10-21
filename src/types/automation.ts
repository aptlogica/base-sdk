// Copyright 2026-2030 Aptlogica Technologies Pvt Ltd
// Licensed under the Apache License, Version 2.0
// Websites: https://www.aptlogica.com | https://www.serenibase.com
// Support: support@aptlogica.com | support@serenibase.com

export type AutomationType = 'trigger' | 'webhook' | 'function';

export interface Automation {
  id: string;
  model_id: string;
  title?: string;
  type: AutomationType;
  /** SQL / webhook body */
  context: string;
  /** Triggers only, e.g. "BEFORE INSERT, BEFORE UPDATE" */
  event?: string;
  created_by?: string;
  last_modified_by?: string;
  created_time?: string;
  last_modified_time?: string;
}

export interface CreateAutomation {
  model_id: string;
  title: string;
  type: AutomationType;
  context: string;
  event?: string;
}

/** Table and type cannot change */
export interface UpdateAutomation {
  title: string;
  context: string;
  event?: string;
}

export interface ValidateAutomation {
  model_id: string;
  /** Set when editing; checked as a replacement of what it installed */
  id?: string;
  type: 'trigger' | 'function';
  context: string;
  event?: string;
}

export interface AutomationValidationResult {
  valid: boolean;
  /** Postgres' reason when not valid */
  message?: string;
}
