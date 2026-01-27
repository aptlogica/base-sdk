import { HttpClient } from '../client/http-client';
import * as types from '../types/asset';
import { createFormData } from '../utils/form-data';

export class AssetService {
  constructor(private readonly http: HttpClient) { }

  /**
   * Upload assets/files
   * POST /asset/upload
   */
  upload(
    files: File[],
    description?: string,
    tags?: string[],
    extra?: (progressEvent: ProgressEvent) => void
  ) {
    const formData = createFormData();
    files.forEach((file) => {
      formData.append('files', file);
    });
    if (description) {
      formData.append('description', description);
    }
    if (tags && tags.length > 0) {
      formData.append('tags', JSON.stringify(tags));
    }

    const uploadLimits = this.http.getUploadLimits(true); // bulk upload
    const config: any = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      ...uploadLimits
    };
    if (typeof extra === 'function') {
      config.onUploadProgress = extra;
    }
    return this.http.post(`/asset/upload`, formData, config);
  }

  /**
   * Upload single image (optimized)
   * POST /asset/upload-image
   */
  uploadImage(
    file: File,
    optimize?: boolean,
    extra?: (progressEvent: ProgressEvent) => void
  ) {
    const formData = createFormData();
    formData.append('file', file);
    if (optimize !== undefined) {
      formData.append('optimize', String(optimize));
    }

    const uploadLimits = this.http.getUploadLimits(false); // single file upload
    const config: any = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      ...uploadLimits
    };
    if (typeof extra === 'function') {
      config.onUploadProgress = extra;
    }
    return this.http.post(`/asset/upload-image`, formData, config);
  }

  /**
   * Get multiple assets by IDs
   * POST /asset/bulk
   */
  getBulk(params: types.GetBulkAssets) {
    return this.http.post(`/asset/bulk`, params);
  }

  /**
   * Update asset metadata
   * PATCH /asset/:id
   */
  updateById(id: string, params: types.UpdateAsset) {
    return this.http.patch(`/asset/${id}`, params);
  }

  /**
   * Delete asset
   * DELETE /asset/:id
   */
  deleteById(id: string) {
    return this.http.delete(`/asset/${id}`);
  }

   // Add image
  addImage(
    params: types.AddImage,
    extra?: (progressEvent: ProgressEvent) => void
  ) {
    const formData = new FormData();
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
    return this.http.post(`/asset/upload-image`, formData, config);
  }

}


