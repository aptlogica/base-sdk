import { HttpClient } from '../client/http-client';
import * as types from '../types/table';

export class AssetService {
  constructor(private http: HttpClient) { }

  // Get bulk assets
  getBulk(params: types.GetBulkAssets) {
    return this.http.post(`/asset/bulk`, params);
  }

  // Update asset by ID
  updateById(id: string, params: types.UpdateAsset) {
    return this.http.patch(`/asset/${id}`, params);
  }

  // Delete asset by ID
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


