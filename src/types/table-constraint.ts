// Copyright 2026-2030 Aptlogica Technologies Pvt Ltd
// Licensed under the Apache License, Version 2.0
// Websites: https://www.aptlogica.com | https://www.serenibase.com
// Support: support@aptlogica.com | support@serenibase.com

/** The backend accepts 'unique' and 'check'; 'primary' is managed through the table's primary-key endpoints */
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
  /** Check constraints: one of the check categories, only a label */
  category?: string;
  /** Check constraints: the SQL condition inside CHECK (...) */
  condition?: string;
  /** Check constraints: schema-qualified Postgres table, for a SQL preview */
  table_name?: string;
  /** Check constraints: the constraint as Postgres has it (pg_get_constraintdef) */
  definition?: string;
}

export interface CreateTableConstraint {
  /** Check constraints: lets the client show the final Postgres name before saving */
  id?: string;
  model_id: string;
  type: TableConstraintType;
  title: string;
  /** Unique keys: min 1 */
  column_ids?: string[];
  /** Check constraints: one of the check categories, only a label */
  category?: string;
  /** Check constraints: the SQL condition inside CHECK (...), required */
  condition?: string;
}

/** Table and type cannot change */
export interface UpdateTableConstraint {
  title: string;
  /** Unique keys: min 1 */
  column_ids?: string[];
  /** Check constraints: one of the check categories, only a label */
  category?: string;
  /** Check constraints: the SQL condition inside CHECK (...), required */
  condition?: string;
}

export interface CheckTableConstraint {
  model_id: string;
  /** 'unique' (default) or 'check' */
  type?: Extract<TableConstraintType, 'unique' | 'check'>;
  /** Unique keys: min 1 */
  column_ids?: string[];
  /** Check constraints: one of the check categories, only a label */
  category?: string;
  /** Check constraints: the SQL condition inside CHECK (...) */
  condition?: string;
}

export interface ConstraintCheckResult {
  valid: boolean;
  /** e.g. Duplicate data in column "EMAIL"... */
  message?: string;
  /** Check constraints: how many records break the condition */
  violations?: number;
}
