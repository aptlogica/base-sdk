// Copyright 2026-2030 Aptlogica Technologies Pvt Ltd
// Licensed under the Apache License, Version 2.0
// Websites: https://www.aptlogica.com | https://www.serenibase.com
// Support: support@aptlogica.com | support@serenibase.com

/** The backend accepts only 'unique' today */
export type TableConstraintType = 'unique' | 'primary' | 'check';

export interface ConstraintColumn {
  id: string;
  title: string;
}

export interface TableConstraint {
  id: string;
  title: string;
  /** Postgres name */
  constraint_name: string;
  /** Key order */
  columns: ConstraintColumn[];
  /** 'missing' = Postgres constraint no longer exists */
  status: 'ok' | 'missing';
}

export interface CreateTableConstraint {
  model_id: string;
  type: TableConstraintType;
  title: string;
  /** Min 1 */
  column_ids: string[];
}

/** Table and type cannot change */
export interface UpdateTableConstraint {
  title: string;
  /** Min 1 */
  column_ids: string[];
}

export interface CheckTableConstraint {
  model_id: string;
  /** Min 1 */
  column_ids: string[];
}

export interface ConstraintCheckResult {
  valid: boolean;
  /** e.g. Duplicate data in column "EMAIL"... */
  message?: string;
}
