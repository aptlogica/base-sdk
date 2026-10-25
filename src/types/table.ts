// Copyright 2026-2030 Aptlogica Technologies Pvt Ltd
// Licensed under the Apache License, Version 2.0
// Websites: https://www.aptlogica.com | https://www.serenibase.com
// Support: support@aptlogica.com | support@serenibase.com

// -------- Tables --------
export interface CreateTable {
  base_id: string;
  workspace_id: string;
  title: string;
  description?: string;
  order_index?: number;
}

export interface UpdateTable {
  title?: string;
  meta?: any;
  description?: string;
  updated_at?: string; // ISO date
}

// -------- Columns --------
export interface AddColumn {
  model_id: string;
  base_id: string;
  title: string;
  meta: Record<string, any>;
  description: string;
  uidt: string;
  order_index: number;
}

export interface UpdateColumn {
  title?: string;
  description?: string;
  meta?: Record<string, any>;
  uidt?: string;
  virtual?: boolean;
  system?: boolean;
  deleted?: boolean;
  order_index?: number;
  updated_at?: string;
}

export interface ReorderColumn {
  source_column_id: string;
  target_column_id: string;
}

// -------- Rows --------
export interface CreateRowOrBulkInsertRequest {
  model_id: string;
  rows?: Array<Record<string, any>>;
  created_by?: string;
  updated_by?: string;
}

/**
 * POST /row/data/insert works as an upsert:
 * - without row_id: creates a record from `values`
 * - with row_id: updates that record from `values` and/or one cell via column_id + value
 */
export interface InsertRowData {
  model_id: string;
  row_id?: number;
  column_id?: string;
  value?: any;
  /** Column ID -> value */
  values?: Record<string, any>;
}

export interface UpsertRow {
  model_id: string;
  /** Omit to create a new record */
  row_id?: number;
  /** Column ID -> value */
  values: Record<string, any>;
}

export interface UpsertRowResult {
  record: Record<string, any>;
  related_record?: Record<string, any>;
}

// ============ PRIMARY KEY ============

export interface PrimaryKeyColumn {
  id: string;
  title: string;
  column_name: string;
  uidt: string;
  system: boolean;
  in_key: boolean;
  eligible: boolean;
  /** Why the column can't be a key field */
  reason?: string;
}

export interface PrimaryKey {
  model_id: string;
  /** Key order */
  column_ids: string[];
  column_names: string[];
  /** True while link fields store this table's key values */
  locked: boolean;
  link_columns: string[];
  columns: PrimaryKeyColumn[];
}

export interface UpdatePrimaryKey {
  /** Key order */
  column_ids: string[];
}

/** error.details when error.code === 'PKY_1004' */
export interface PrimaryKeyViolation {
  message: string;
  columns: string[];
  column_titles: string[];
  null_count: number;
  empty_fields: { column: string; title: string; count: number }[];
  null_records: { id: number; title: string; missing?: string[] }[];
  duplicate_groups: number;
  duplicates: { values: Record<string, unknown>; count: number; record_ids: number[] }[];
}

export interface InsertRelationData {
  model_id: string;
  column_id: string;
  source_row_id: number;
  target_row_id: number;
  action: 'link' | 'unlink';
}

export interface AddAttachments {
  model_id: string;
  column_id: string;
  row_id: number;
  files: File[];
}

export interface UpdateAttachments {
  model_id: string;
  column_id: string;
  row_id: number;
  asset_id: string;
  content: UpdateAsset;
}

export interface RemoveAttachments {
  model_id: string;
  column_id: string;
  row_id: number;
  attachments: string[];
}

export interface DeleteRow {
  model_id: string;
  row_id: number;
}

export interface BulkDeleteRow {
  model_id: string;
  row_ids: number[];
}

export interface UpdateRow {
  model_id: string;
  row_id: number;
  values: Record<string, any>;
}

// -------- Views --------
export interface CreateView {
  model_id: string;
  title: string;
  description?: string;
  meta: Record<string, any>;
  type: string;
  order_index: number;
}

export interface UpdateView {
  view_id: string;
  title?: string;
  description?: string;
  type?: string;
  updated_at?: string;
}

// -------- Assets --------
export interface UploadAsset {
  workspace_id: string;
  file_name: string;
  content_type: string;
  size: number;
}

export interface GetBulkAssets {
  ids: string[];
}

export interface UpdateAsset {
  title?: string;
}

export interface AddImage {
  files: File[];
}

export interface ImportTable {
  base_id?: string;
  workspace_id: string;
  order_index: number;
  file: File;
config: {
    settings: {
      remove_duplicate_records: boolean;
      trim_spaces: boolean;
      remove_extra_spaces: boolean;
      [k: string]: any;
    };
    columns: Array<{
      column_name: string;
      title: string;
      uidt: string;
      meta?: Record<string, any>;
      [k: string]: any;
    }>;
    [k: string]: any;
  };
  primary_column: string;
}

export interface ResetColumn {
  model_id: string;
  column_id: string;
}


export interface Updates {
  id: any;
  value: any;
}
export interface BulkUpdateColumn {
  model_id: string;
  column_id: string;
  updates: Updates[];
}

// -------- Column Utilities --------
export interface TrimWhitespace {
  model_id: string;
  columns: string[];
  trim_mode: 'trim_both' | 'trim_leading' | 'trim_trailing' | 'collapse_spaces';
}

export interface CaseNormalizationRequest {
  model_id: string;
  columns: string[];
  case_format: 'lowercase' | 'uppercase' | 'title_case' | 'sentence_case';
}

export interface FindReplaceRequest {
  model_id: string;
  columns: string[];
  find_value: string;
  replace_value: string;
  match_type: 'match_case' | 'ignore_case' | 'match_entire_value';
}

export interface RemoveSpecialCharactersRequest {
  model_id: string;
  columns: string[];
  special_characters_type: 'symbols'| 'currency_symbols'| 'brackets'| 'punctuation'| 'custom';
  custom?: string[];
}

export interface RemoveDuplicatesRequest {
  model_id: string;
  columns: string[];
  duplicate:'remove_row'| 'remove_duplicates'| 'remove_duplicates_matchCase';
  keep_rule:| 'keep_first'| 'keep_last'| 'keep_latest_updated';
}

export interface RemoveFormattingRequest {
  model_id: string;
  columns: string[];
  formatting: 'currency' | 'percentage' | 'separator' | 'phone' | 'date' | 'custom';
  custom_pattern?: string[];
}

// -------- Merge Columns --------
export interface MergeColumnsRequest {
  model_id: string;
  columns: string[];
  new_column_title?: string;
  merge_format: 'space' | 'comma' | 'dash' | 'custom';
  custom_separator?: string;
  keep_original_column: boolean;
  add_at_end: boolean;
}

// -------- Extract Substring --------
export interface ExtractSubstringRequest {
  model_id: string;
  column_id: string;
  extraction_method: 'extraction_type' | 'between_characters';
  extraction_type?: "email" | "keywords" | "mentions" | "tags" | "url" | "domain" | "emoji" | "phone" | "prefix";
  start_after?: string;
  end_before?: string;
  keep_original_column: boolean;
  add_at_end: boolean;
}

// -------- Column Split --------
export type FixedLengthAction = 'before' | 'after';

export interface SeparatorConfig {
  type: 'separator';
  config: {
    separator: string;
  };
}

export interface FixedLengthConfig {
  type: 'fixedLength';
  config: {
    action: FixedLengthAction;
    value: number;
  };
}

export interface PatternConfig {
  type: 'pattern';
  config: {
    pattern: string;
  };
}

export type SplitByRequest = SeparatorConfig | FixedLengthConfig | PatternConfig;

export interface ColumnSplitRequest {
  modelId: string;
  columnId: string;
  splitBy: SplitByRequest;
  keepOriginal: boolean;
  where: 'next' | 'end';
  limit?: number;
}
