import { TableService } from '../../src/services/table-service';
import type { HttpClient } from '../../src/client/http-client';

class MockHttpClient {
  get = jest.fn();
  post = jest.fn();
  patch = jest.fn();
  put = jest.fn();
  delete = jest.fn();
  getUploadLimits = jest.fn();
  updateConfig = jest.fn();
  setAuthToken = jest.fn();
  setHeaders = jest.fn();
  clearAuth = jest.fn();
}

const mockHttpClient = new MockHttpClient();

describe('TableService', () => {
  let service: TableService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new TableService(mockHttpClient as unknown as HttpClient);
  });

  // Table endpoints
  it('should call http.post on create', () => {
    const params = { foo: 1 };
    service.create(params as any);
    expect(mockHttpClient.post).toHaveBeenCalledWith('/table/create', params);
  });
  it('should call http.get on getById (no options)', () => {
    service.getById('tid');
    expect(mockHttpClient.get).toHaveBeenCalledWith('/table/tid');
  });
  it('should call http.get on getById (with options)', () => {
    service.getById('tid', { page: 2, page_size: 50 });
    expect(mockHttpClient.get).toHaveBeenCalledWith('/table/tid?page=2&page_size=50');
  });
  it('should call http.get on getAll', () => {
    service.getAll();
    expect(mockHttpClient.get).toHaveBeenCalledWith('/table/');
  });
  it('should call http.patch on update', () => {
    const params = { foo: 2 };
    service.update('tid', params as any);
    expect(mockHttpClient.patch).toHaveBeenCalledWith('/table/tid', params);
  });
  it('should call http.delete on delete', () => {
    service.delete('tid');
    expect(mockHttpClient.delete).toHaveBeenCalledWith('/table/tid');
  });
  it('should call http.post on import', () => {
    const params = { base_id: 'b', workspace_id: 'w', title: 't', description: 'd', order_index: 1, file: 'f' };
    const formData = { append: jest.fn() };
    jest.spyOn(require('../../src/utils/form-data'), 'createFormData').mockReturnValue(formData);
    mockHttpClient.getUploadLimits.mockReturnValue({ maxContentLength: 100, maxBodyLength: 100 });
    service.import(params as any);
    expect(formData.append).toHaveBeenCalledWith('base_id', 'b');
    expect(formData.append).toHaveBeenCalledWith('workspace_id', 'w');
    expect(formData.append).toHaveBeenCalledWith('title', 't');
    expect(formData.append).toHaveBeenCalledWith('description', 'd');
    expect(formData.append).toHaveBeenCalledWith('order_index', '1');
    expect(formData.append).toHaveBeenCalledWith('file', 'f');
    expect(mockHttpClient.post).toHaveBeenCalledWith(
      '/table/import',
      formData,
      expect.objectContaining({ headers: expect.any(Object) })
    );
  });

  // Column endpoints (delegated)
  it('should delegate getColumnsByTableId', () => {
    const spy = jest.spyOn(service['columnService'], 'getColumnsByTableId');
    service.getColumnsByTableId('tid');
    expect(spy).toHaveBeenCalledWith('tid');
  });
  it('should delegate addColumn', () => {
    const spy = jest.spyOn(service['columnService'], 'create');
    service.addColumn({ foo: 1 } as any);
    expect(spy).toHaveBeenCalled();
  });
  it('should delegate getColumnById', () => {
    const spy = jest.spyOn(service['columnService'], 'getById');
    service.getColumnById('cid');
    expect(spy).toHaveBeenCalledWith('cid');
  });
  it('should delegate getAllColumns', () => {
    const spy = jest.spyOn(service['columnService'], 'getAll');
    service.getAllColumns();
    expect(spy).toHaveBeenCalled();
  });
  it('should delegate updateColumn', () => {
    const spy = jest.spyOn(service['columnService'], 'update');
    service.updateColumn('cid', { foo: 2 } as any);
    expect(spy).toHaveBeenCalledWith('cid', { foo: 2 });
  });
  it('should delegate deleteColumn', () => {
    const spy = jest.spyOn(service['columnService'], 'delete');
    service.deleteColumn('cid');
    expect(spy).toHaveBeenCalledWith('cid');
  });
  it('should delegate reorderColumn', () => {
    const spy = jest.spyOn(service['columnService'], 'reorder');
    service.reorderColumn({ order: [1, 2] } as any);
    expect(spy).toHaveBeenCalled();
  });

  // Row endpoints (delegated)
  it('should delegate getAllRecords', () => {
    const spy = jest.spyOn(service['rowService'], 'getAllRecords');
    service.getAllRecords('tid');
    expect(spy).toHaveBeenCalledWith('tid', undefined);
  });
  it('should delegate createRow', () => {
    const spy = jest.spyOn(service['rowService'], 'create');
    service.createRow({ foo: 1 } as any);
    expect(spy).toHaveBeenCalled();
  });
  it('should delegate deleteRow', () => {
    const spy = jest.spyOn(service['rowService'], 'delete');
    service.deleteRow({ foo: 2 } as any);
    expect(spy).toHaveBeenCalled();
  });
  it('should delegate bulkDeleteRow', () => {
    const spy = jest.spyOn(service['rowService'], 'bulkDelete');
    service.bulkDeleteRow({ foo: 3 } as any);
    expect(spy).toHaveBeenCalled();
  });
  it('should delegate insertRowData', () => {
    const spy = jest.spyOn(service['rowService'], 'insertData');
    service.insertRowData({ foo: 4 } as any);
    expect(spy).toHaveBeenCalled();
  });
  it('should delegate insertRelationData', () => {
    const spy = jest.spyOn(service['rowService'], 'insertRelation');
    service.insertRelationData({ foo: 5 } as any);
    expect(spy).toHaveBeenCalled();
  });
  it('should delegate addAttachment', () => {
    const spy = jest.spyOn(service['rowService'], 'addAttachment');
    // Provide required fields for addAttachment
    const params = { model_id: 1, column_id: 2, row_id: 3, files: [] };
    service.addAttachment(params as any);
    expect(spy).toHaveBeenCalledWith(params, undefined);
  });
  it('should delegate removeAttachments', () => {
    const spy = jest.spyOn(service['rowService'], 'removeAttachment');
    service.removeAttachments({ foo: 7 } as any);
    expect(spy).toHaveBeenCalled();
  });

  // View endpoints (delegated)
  it('should delegate getViewsByModelId', () => {
    const spy = jest.spyOn(service['viewService'], 'getViewsByModelId');
    service.getViewsByModelId('tid');
    expect(spy).toHaveBeenCalledWith('tid');
  });
  it('should delegate createView', () => {
    const spy = jest.spyOn(service['viewService'], 'create');
    service.createView({ foo: 1 } as any);
    expect(spy).toHaveBeenCalled();
  });
  it('should delegate getViewById', () => {
    const spy = jest.spyOn(service['viewService'], 'getById');
    service.getViewById('vid');
    expect(spy).toHaveBeenCalledWith('vid');
  });
  it('should delegate getAllViews', () => {
    const spy = jest.spyOn(service['viewService'], 'getAll');
    service.getAllViews();
    expect(spy).toHaveBeenCalled();
  });
  it('should delegate updateView', () => {
    const spy = jest.spyOn(service['viewService'], 'update');
    service.updateView('vid', { foo: 2 } as any);
    expect(spy).toHaveBeenCalledWith('vid', { foo: 2 });
  });
  it('should delegate deleteView', () => {
    const spy = jest.spyOn(service['viewService'], 'delete');
    service.deleteView('vid');
    expect(spy).toHaveBeenCalledWith('vid');
  });

  // Asset endpoints (delegated)
  it('should delegate getBulkAssets (ids)', () => {
    const spy = jest.spyOn(service['assetService'], 'getBulk');
    service.getBulkAssets({ ids: ['a', 'b'] } as any);
    expect(spy).toHaveBeenCalledWith({ asset_ids: ['a', 'b'] });
  });
  it('should delegate getBulkAssets (asset_ids)', () => {
    const spy = jest.spyOn(service['assetService'], 'getBulk');
    service.getBulkAssets({ asset_ids: ['a', 'b'] } as any);
    expect(spy).toHaveBeenCalledWith({ asset_ids: ['a', 'b'] });
  });
  it('should delegate updateAssetById', () => {
    const spy = jest.spyOn(service['assetService'], 'updateById');
    service.updateAssetById('aid', { foo: 1 } as any);
    expect(spy).toHaveBeenCalledWith('aid', { foo: 1 });
  });
  it('should delegate deleteAssetById', () => {
    const spy = jest.spyOn(service['assetService'], 'deleteById');
    service.deleteAssetById('aid');
    expect(spy).toHaveBeenCalledWith('aid');
  });
});
