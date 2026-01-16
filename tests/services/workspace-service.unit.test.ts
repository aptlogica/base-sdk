import { WorkspaceService } from '../../src/services/workspace-service';
import type { HttpClient } from '../../src/client/http-client';

describe('WorkspaceService', () => {
  const mockHttpClient = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  };
  let service: WorkspaceService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new WorkspaceService(mockHttpClient as unknown as HttpClient);
  });

  it('should call http.post on create', () => {
    const params = { foo: 1 };
    service.create(params as any);
    expect(mockHttpClient.post).toHaveBeenCalledWith('/workspace/create', params);
  });

  it('should call http.get on getAll', () => {
    service.getAll();
    expect(mockHttpClient.get).toHaveBeenCalledWith('/workspace/');
  });

  it('should call http.get on getById', () => {
    service.getById('wid');
    expect(mockHttpClient.get).toHaveBeenCalledWith('/workspace/wid');
  });

  it('should call http.put on update', () => {
    const params = { foo: 2 };
    service.update('wid', params as any);
    expect(mockHttpClient.put).toHaveBeenCalledWith('/workspace/wid', params);
  });

  it('should call http.delete on delete', () => {
    service.delete('wid');
    expect(mockHttpClient.delete).toHaveBeenCalledWith('/workspace/wid');
  });

  it('should call http.get on getTablesByWorkspaceId', () => {
    service.getTablesByWorkspaceId('wid');
    expect(mockHttpClient.get).toHaveBeenCalledWith('/workspace/wid/tables');
  });

  it('should call http.get on getBasesByWorkspaceId', () => {
    service.getBasesByWorkspaceId('wid');
    expect(mockHttpClient.get).toHaveBeenCalledWith('/workspace/wid/bases');
  });

  it('should call http.get on getMembers', () => {
    service.getMembers('wid');
    expect(mockHttpClient.get).toHaveBeenCalledWith('/workspace/wid/members');
  });

  it('should call http.get on getMembersWithRoles', () => {
    service.getMembersWithRoles('wid');
    expect(mockHttpClient.get).toHaveBeenCalledWith('/workspace/wid/members-with-roles');
  });

  it('should call http.post on removeUserFromWorkspace', () => {
    const params = { foo: 3 };
    service.removeUserFromWorkspace('wid', params as any);
    expect(mockHttpClient.post).toHaveBeenCalledWith('/workspace/wid/remove', params);
  });

  it('should call http.post on bulkAddMembers', () => {
    const params = { foo: 4 };
    service.bulkAddMembers('wid', params as any);
    expect(mockHttpClient.post).toHaveBeenCalledWith('/workspace/wid/bulk-add-members', params);
  });

  it('should call http.delete on removeAccessMember', () => {
    service.removeAccessMember('aid');
    expect(mockHttpClient.delete).toHaveBeenCalledWith('/workspace/access/aid');
  });

  it('should call bulkAddMembers on inviteUser', () => {
    const spy = jest.spyOn(service, 'bulkAddMembers');
    service.inviteUser('wid', { user_ids: ['u1'], access_level: 'full_access', bases_ids: 'b1' } as any);
    expect(spy).toHaveBeenCalled();
  });
});
