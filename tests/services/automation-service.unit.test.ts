import { AutomationService } from '../../src/services/automation-service';
import type { HttpClient } from '../../src/client/http-client';

const mockHttpClient = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
};

describe('AutomationService', () => {
  let service: AutomationService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new AutomationService(mockHttpClient as unknown as HttpClient);
  });

  it('list should GET /automation with model_id', () => {
    service.list('m1');
    expect(mockHttpClient.get).toHaveBeenCalledWith('/automation', { params: { model_id: 'm1' } });
  });

  it('create should POST /automation/create', () => {
    const params = { model_id: 'm1', title: 't', type: 'trigger' as const, context: 'sql', event: 'BEFORE INSERT' };
    service.create(params);
    expect(mockHttpClient.post).toHaveBeenCalledWith('/automation/create', params);
  });

  it('update should PUT /automation/:id', () => {
    const params = { title: 't', context: 'sql' };
    service.update('a1', params);
    expect(mockHttpClient.put).toHaveBeenCalledWith('/automation/a1', params);
  });

  it('run should POST /automation/:id/run', () => {
    service.run('a1');
    expect(mockHttpClient.post).toHaveBeenCalledWith('/automation/a1/run');
  });

  it('validate should POST /automation/validate', () => {
    const params = { model_id: 'm1', type: 'function' as const, context: 'sql' };
    service.validate(params);
    expect(mockHttpClient.post).toHaveBeenCalledWith('/automation/validate', params);
  });

  it('delete should DELETE /automation/:id', () => {
    service.delete('a1');
    expect(mockHttpClient.delete).toHaveBeenCalledWith('/automation/a1');
  });
});
