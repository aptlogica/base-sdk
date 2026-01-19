import { ViewService } from '../../src/services/view-service';
import type { HttpClient } from '../../src/client/http-client';

describe('ViewService', () => {
  const mockHttpClient = {
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  };
  let service: ViewService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new ViewService(mockHttpClient as unknown as HttpClient);
  });

  it('should call http.get on getViewsByModelId', () => {
    service.getViewsByModelId('tid');
    expect(mockHttpClient.get).toHaveBeenCalledWith('/table/tid/views');
  });

  it('should call http.post on create', () => {
    const params = { foo: 1 };
    service.create(params as any);
    expect(mockHttpClient.post).toHaveBeenCalledWith('/view/create', params);
  });

  it('should call http.get on getById', () => {
    service.getById('vid');
    expect(mockHttpClient.get).toHaveBeenCalledWith('/view/vid');
  });

  it('should call http.get on getAll', () => {
    service.getAll();
    expect(mockHttpClient.get).toHaveBeenCalledWith('/view/');
  });

  it('should call http.patch on update', () => {
    const params = { foo: 2 };
    service.update('vid', params as any);
    expect(mockHttpClient.patch).toHaveBeenCalledWith('/view/vid', params);
  });

  it('should call http.delete on delete', () => {
    service.delete('vid');
    expect(mockHttpClient.delete).toHaveBeenCalledWith('/view/vid');
  });
});
