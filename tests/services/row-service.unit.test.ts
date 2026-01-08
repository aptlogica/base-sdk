import { RowService } from '../../src/services/row-service';
import { createFormData } from '../../src/utils/form-data';
import type { HttpClient } from '../../src/client/http-client';

jest.mock('../../src/utils/form-data');

class MockHttpClient {
  get = jest.fn();
  post = jest.fn();
  getUploadLimits = jest.fn();
  patch = jest.fn();
  put = jest.fn();
  delete = jest.fn();
  updateConfig = jest.fn();
  setAuthToken = jest.fn();
  setHeaders = jest.fn();
  clearAuth = jest.fn();
}

const mockHttpClient = new MockHttpClient();

describe('RowService', () => {
  let service: RowService;

  beforeEach(() => {
    jest.clearAllMocks();
    (createFormData as jest.Mock).mockReturnValue({ append: jest.fn() });
    mockHttpClient.getUploadLimits.mockReturnValue({ maxContentLength: 100, maxBodyLength: 100 });
    service = new RowService(mockHttpClient as unknown as HttpClient);
  });

  describe('getAllRecords', () => {
    it('should call http.get with default pagination', () => {
      service.getAllRecords('tid');
      expect(mockHttpClient.get).toHaveBeenCalledWith('/table/tid/records?page=1&page_size=30');
    });
    it('should call http.get with custom pagination', () => {
      service.getAllRecords('tid', { page: 2, page_size: 50 });
      expect(mockHttpClient.get).toHaveBeenCalledWith('/table/tid/records?page=2&page_size=50');
    });
  });

  it('should call http.post on create', () => {
    const params = { foo: 1 };
    service.create(params as any);
    expect(mockHttpClient.post).toHaveBeenCalledWith('/row/create', params);
  });

  it('should call http.post on delete', () => {
    const params = { foo: 2 };
    service.delete(params as any);
    expect(mockHttpClient.post).toHaveBeenCalledWith('/row/remove', params);
  });

  it('should call http.post on bulkDelete', () => {
    const params = { foo: 3 };
    service.bulkDelete(params as any);
    expect(mockHttpClient.post).toHaveBeenCalledWith('/row/bulk-remove', params);
  });

  it('should call http.post on insertData', () => {
    const params = { foo: 4 };
    service.insertData(params as any);
    expect(mockHttpClient.post).toHaveBeenCalledWith('/row/data/insert', params);
  });

  it('should call http.post on insertRelation', () => {
    const params = { foo: 5 };
    service.insertRelation(params as any);
    expect(mockHttpClient.post).toHaveBeenCalledWith('/row/data/relation', params);
  });

  describe('addAttachment', () => {
    it('should append all fields and files, call http.post', () => {
      const params = { model_id: 1, column_id: 2, row_id: 3, files: ['f1', 'f2'] };
      const formData = { append: jest.fn() };
      (createFormData as jest.Mock).mockReturnValue(formData);
      service.addAttachment(params as any);
      expect(formData.append).toHaveBeenCalledWith('model_id', '1');
      expect(formData.append).toHaveBeenCalledWith('column_id', '2');
      expect(formData.append).toHaveBeenCalledWith('row_id', '3');
      expect(formData.append).toHaveBeenCalledWith('files', 'f1');
      expect(formData.append).toHaveBeenCalledWith('files', 'f2');
      expect(mockHttpClient.post).toHaveBeenCalledWith(
        '/row/attachment/add',
        formData,
        expect.objectContaining({ headers: expect.any(Object) })
      );
    });
    it('should add onUploadProgress if extra provided', () => {
      const params = { model_id: 1, column_id: 2, row_id: 3, files: [] };
      const formData = { append: jest.fn() };
      (createFormData as jest.Mock).mockReturnValue(formData);
      const extra = jest.fn();
      service.addAttachment(params as any, extra);
      expect(mockHttpClient.post).toHaveBeenCalledWith(
        '/row/attachment/add',
        formData,
        expect.objectContaining({ onUploadProgress: extra })
      );
    });
  });

  it('should call http.post on removeAttachment', () => {
    const params = { foo: 6 };
    service.removeAttachment(params as any);
    expect(mockHttpClient.post).toHaveBeenCalledWith('/row/attachment/remove', params);
  });
});
