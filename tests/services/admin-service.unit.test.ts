import { AdminService } from '../../src/services/admin-service';
import type { HttpClient } from '../../src/client/http-client';

describe('AdminService', () => {
  const mockHttpClient = { get: jest.fn(), post: jest.fn() };
  let service: AdminService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new AdminService(mockHttpClient as unknown as HttpClient);
  });

  it('should call http.get on getTimerStatus', () => {
    service.getTimerStatus();
    expect(mockHttpClient.get).toHaveBeenCalledWith('/admin/timer/status');
  });

  it('should call http.post on resetData', () => {
    service.resetData();
    expect(mockHttpClient.post).toHaveBeenCalledWith('/admin/reset-data', {});
  });
});
