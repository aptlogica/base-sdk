import { ColumnService } from '../../src/services/column-service';
import type { HttpClient } from '../../src/client/http-client';

class MockHttpClient {
  get = jest.fn();
  post = jest.fn();
  patch = jest.fn();
  delete = jest.fn();
  getUploadLimits = jest.fn();
  updateConfig = jest.fn();
  setAuthToken = jest.fn();
  setHeaders = jest.fn();
  clearAuth = jest.fn();
}

const mockHttpClient = new MockHttpClient();

describe('ColumnService', () => {
  let service: ColumnService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new ColumnService(mockHttpClient as unknown as HttpClient);
  });

  it('should call http.get on getColumnsByTableId', () => {
    service.getColumnsByTableId('tid');
    expect(mockHttpClient.get).toHaveBeenCalledWith('/table/tid/columns');
  });

  it('should call http.post on create', () => {
    const params = { name: 'col' };
    service.create(params as any);
    expect(mockHttpClient.post).toHaveBeenCalledWith('/column/create', params);
  });

  it('should call http.get on getById', () => {
    service.getById('cid');
    expect(mockHttpClient.get).toHaveBeenCalledWith('/column/cid');
  });

  it('should call http.get on getAll', () => {
    service.getAll();
    expect(mockHttpClient.get).toHaveBeenCalledWith('/column/');
  });

  it('should call http.patch on update', () => {
    const params = { name: 'new' };
    service.update('cid', params as any);
    expect(mockHttpClient.patch).toHaveBeenCalledWith('/column/cid', params);
  });

  it('should call http.delete on delete', () => {
    service.delete('cid');
    expect(mockHttpClient.delete).toHaveBeenCalledWith('/column/cid');
  });

  it('should call http.post on reorder', () => {
    const params = { order: [1, 2] };
    service.reorder(params as any);
    expect(mockHttpClient.post).toHaveBeenCalledWith('/column/reorder', params);
  });
});
