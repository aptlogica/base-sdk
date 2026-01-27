import { UserService } from '../../src/services/user-service';
import { createFormData } from '../../src/utils/form-data';
import type { HttpClient } from '../../src/client/http-client';

jest.mock('../../src/utils/form-data');

const mockHttpClient = {
  get: jest.fn(),
  post: jest.fn(),
  patch: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  getUploadLimits: jest.fn(),
};

const mockWorkspaceService = {
  removeUserFromWorkspace: jest.fn(),
};

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    jest.clearAllMocks();
    (createFormData as jest.Mock).mockReturnValue({ append: jest.fn() });
    mockHttpClient.getUploadLimits.mockReturnValue({ maxContentLength: 100, maxBodyLength: 100 });
    service = new UserService(mockHttpClient as unknown as HttpClient);
  });

  it('should call http.get on getProfile', () => {
    service.getProfile('uid');
    expect(mockHttpClient.get).toHaveBeenCalledWith('/user/profile/uid');
  });

  it('should call http.patch on updateProfile', () => {
    const params = { foo: 1 };
    service.updateProfile('uid', params as any);
    expect(mockHttpClient.patch).toHaveBeenCalledWith(
      '/user/profile/uid',
      expect.objectContaining({ append: expect.any(Function) }),
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
  });

  it('should call http.post on changePassword', () => {
    const params = { foo: 2 };
    service.changePassword('uid', params as any);
    expect(mockHttpClient.post).toHaveBeenCalledWith('/user/change-password/uid', params);
  });

  it('should call http.post on addOrUpdateAvatar', () => {
    const formData = { append: jest.fn() };
    (createFormData as jest.Mock).mockReturnValue(formData);
    service.addOrUpdateAvatar('uid', 'file' as any);
    expect(formData.append).toHaveBeenCalledWith('file', 'file');
    expect(mockHttpClient.post).toHaveBeenCalledWith(
      '/user/profile/uid/avatar',
      formData,
      expect.objectContaining({ headers: expect.any(Object) })
    );
  });

  it('should call http.delete on removeAvatar', () => {
    service.removeAvatar('uid');
    expect(mockHttpClient.delete).toHaveBeenCalledWith('/user/profile/uid/avatar');
  });

  it('should call http.get on getWorkspaces', () => {
    service.getWorkspaces();
    expect(mockHttpClient.get).toHaveBeenCalledWith('/user/workspaces');
  });

  it('should call http.get on getUserAccessDetails', () => {
    service.getUserAccessDetails();
    expect(mockHttpClient.get).toHaveBeenCalledWith('/user/access-details');
  });

  it('should call http.get on getUserRolesAndAccess (no scope)', () => {
    service.getUserRolesAndAccess('uid');
    expect(mockHttpClient.get).toHaveBeenCalledWith('/user/roles-and-access/uid', { params: undefined });
  });

  it('should call http.get on getUserRolesAndAccess (with scope)', () => {
    service.getUserRolesAndAccess('uid', 'scope');
    expect(mockHttpClient.get).toHaveBeenCalledWith('/user/roles-and-access/uid', { params: { scope_id: 'scope' } });
  });

  it('should call http.post on assignToWorkspace', () => {
    const params = { foo: 3 };
    service.assignToWorkspace(params as any);
    expect(mockHttpClient.post).toHaveBeenCalledWith('/user/assign', params);
  });

  it('should call http.put on updateUserAccess', () => {
    const params = { foo: 4 };
    service.updateUserAccess(params as any);
    expect(mockHttpClient.put).toHaveBeenCalledWith('/user/access/update', params);
  });

  it('should call http.post on addUser', async () => {
    const userData = { email: 'e', firstname: 'f', lastname: 'l', profile_pic: 'p', is_coowner: true, membership: { m: 1 } };
    const formData = { append: jest.fn() };
    (createFormData as jest.Mock).mockReturnValue(formData);
    await service.addUser(userData as any);
    expect(formData.append).toHaveBeenCalledWith('email', 'e');
    expect(formData.append).toHaveBeenCalledWith('firstname', 'f');
    expect(formData.append).toHaveBeenCalledWith('lastname', 'l');
    expect(formData.append).toHaveBeenCalledWith('profile_pic', 'p');
    expect(formData.append).toHaveBeenCalledWith('is_coowner', 'true');
    expect(formData.append).toHaveBeenCalledWith('membership', JSON.stringify({ m: 1 }));
    expect(mockHttpClient.post).toHaveBeenCalledWith(
      '/user/create',
      formData,
      expect.objectContaining({ headers: expect.any(Object) })
    );
  });

  it('should call http.post on editUser', async () => {
    const userData = { user_id: 'u', firstname: 'f', lastname: 'l', profile_pic: 'p', is_coowner: false, membership: { m: 2 } };
    global.FormData = jest.fn(() => ({ append: jest.fn() })) as any;
    const formData = new (global.FormData as any)();
    formData.append = jest.fn();
    jest.spyOn(global, 'FormData').mockImplementation(() => formData);
    await service.editUser(userData as any);
    expect(formData.append).toHaveBeenCalledWith('user_id', 'u');
    expect(formData.append).toHaveBeenCalledWith('firstname', 'f');
    expect(formData.append).toHaveBeenCalledWith('lastname', 'l');
    expect(formData.append).toHaveBeenCalledWith('profile_pic', 'p');
    expect(formData.append).toHaveBeenCalledWith('is_coowner', 'false');
    expect(formData.append).toHaveBeenCalledWith('membership', JSON.stringify({ m: 2 }));
    expect(mockHttpClient.post).toHaveBeenCalledWith(
      '/user/edit',
      formData,
      expect.objectContaining({ headers: expect.any(Object) })
    );
  });

  it('should call http.post on removeUser', () => {
    const params = { foo: 5 };
    service.removeUser(params as any);
    expect(mockHttpClient.post).toHaveBeenCalledWith('/user/remove', params);
  });

  it('should call http.post on activateUser', () => {
    const params = { foo: 6 };
    service.activateUser(params as any);
    expect(mockHttpClient.post).toHaveBeenCalledWith('/user/activate', params);
  });

  it('should call http.post on deactivateUser', () => {
    const params = { foo: 7 };
    service.deactivateUser(params as any);
    expect(mockHttpClient.post).toHaveBeenCalledWith('/user/deactivate', params);
  });

  it('should call http.get on listUsers', () => {
    service.listUsers();
    expect(mockHttpClient.get).toHaveBeenCalledWith('/user/list');
  });

  it('should call http.get on listUsersForAssign', () => {
    service.listUsersForAssign();
    expect(mockHttpClient.get).toHaveBeenCalledWith('/user/list-for-assign');
  });

  describe('removeFromWorkspace', () => {
    it('should delegate to workspaceService if set', () => {
      service.setWorkspaceService(mockWorkspaceService as any);
      const params = { foo: 8 };
      service.removeFromWorkspace('wid', params as any);
      expect(mockWorkspaceService.removeUserFromWorkspace).toHaveBeenCalledWith('wid', params);
    });
    it('should call http.post if workspaceService not set', () => {
      const params = { foo: 9 };
      service.removeFromWorkspace('wid', params as any);
      expect(mockHttpClient.post).toHaveBeenCalledWith('/workspace/wid/remove', params);
    });
  });
});
