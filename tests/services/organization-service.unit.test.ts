import { OrganizationService } from '../../src/services/organization-service';
import type { HttpClient } from '../../src/client/http-client';

describe('OrganizationService', () => {
  const mockHttpClient = {
    get: jest.fn(),
    put: jest.fn(),
  };
  let service: OrganizationService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new OrganizationService(mockHttpClient as unknown as HttpClient);
  });

  it('should call http.get on getAll', () => {
    service.getAll();
    expect(mockHttpClient.get).toHaveBeenCalledWith('/organization');
  });

  it('should call http.get on getById', () => {
    service.getById('oid');
    expect(mockHttpClient.get).toHaveBeenCalledWith('/organization/oid');
  });

  it('should call http.put on update', () => {
    const params = { name: 'org' };
    service.update('oid', params as any);
    expect(mockHttpClient.put).toHaveBeenCalledWith('/organization/oid', params);
  });
});
