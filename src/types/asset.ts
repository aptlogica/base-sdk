// Copyright 2026-2030 Aptlogica Technologies Pvt Ltd
// Licensed under the Apache License, Version 2.0
// Websites: https://www.aptlogica.com | https://www.serenibase.com
// Support: support@aptlogica.com | support@serenibase.com

export interface AssetUploadResponse {
  id: string;
  filename: string;
  original_filename: string;
  file_type: string;
  file_size: number;
  url: string;
  storage_path: string;
  created_at: string;
}

export interface GetBulkAssets {
  asset_ids: string[];
}

export interface UpdateAsset {
  filename?: string;
  description?: string;
  tags?: string[];
}

export interface UploadAsset {
  workspace_id: string;
  file_name: string;
  content_type: string;
  size: number;
}

export interface AddImage {
  files: File[];
}
