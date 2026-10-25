import { TableConstraintService } from '../../src/services/table-constraint-service';
import type { HttpClient } from '../../src/client/http-client';

const mockHttpClient = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
};

describe('TableConstraintService', () => {
  let service: TableConstraintService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new TableConstraintService(mockHttpClient as unknown as HttpClient);
  });

  it('list should GET /table-constraint with model_id and type', () => {
    service.list('m1', 'unique');
    expect(mockHttpClient.get).toHaveBeenCalledWith('/table-constraint', {
      params: { model_id: 'm1', type: 'unique' },
    });
  });

  it('check should POST /table-constraint/check', () => {
    const params = { model_id: 'm1', column_ids: ['c1'] };
    service.check(params);
    expect(mockHttpClient.post).toHaveBeenCalledWith('/table-constraint/check', params);
  });

  it('create should POST /table-constraint/create', () => {
    const params = { model_id: 'm1', type: 'unique' as const, title: 'uq', column_ids: ['c1', 'c2'] };
    service.create(params);
    expect(mockHttpClient.post).toHaveBeenCalledWith('/table-constraint/create', params);
  });

  it('update should PUT /table-constraint/:id', () => {
    const params = { title: 'uq', column_ids: ['c1'] };
    service.update('tc1', params);
    expect(mockHttpClient.put).toHaveBeenCalledWith('/table-constraint/tc1', params);
  });

  it('delete should DELETE /table-constraint/:id', () => {
    service.delete('tc1');
    expect(mockHttpClient.delete).toHaveBeenCalledWith('/table-constraint/tc1');
  });
});
