import { BaseService } from '../../src/services/base-service';
import { createFormData } from '../../src/utils/form-data';
import type { HttpClient } from '../../src/client/http-client';

jest.mock('../../src/utils/form-data');

const mockHttpClient = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  getUploadLimits: jest.fn(),
};

describe('BaseService', () => {
  let service: BaseService;

  beforeEach(() => {
    jest.clearAllMocks();
    (createFormData as jest.Mock).mockReturnValue({ append: jest.fn() });
    mockHttpClient.getUploadLimits.mockReturnValue({ maxContentLength: 100, maxBodyLength: 100 });
    service = new BaseService(mockHttpClient as unknown as HttpClient);
  });

  describe('create', () => {
    it('should append all fields and call http.post', async () => {
      const params = { title: 't', description: 'd', workspace_id: 'w', image: 'img' };
      const formData = { append: jest.fn() };
      (createFormData as jest.Mock).mockReturnValue(formData);
      await service.create(params as any);
      expect(formData.append).toHaveBeenCalledWith('title', 't');
      expect(formData.append).toHaveBeenCalledWith('description', 'd');
      expect(formData.append).toHaveBeenCalledWith('workspace_id', 'w');
      expect(formData.append).toHaveBeenCalledWith('image', 'img');
      expect(mockHttpClient.post).toHaveBeenCalledWith(
        '/base/create',
        formData,
        expect.objectContaining({ headers: expect.any(Object) })
      );
    });
    it('should append only title if others missing', async () => {
      const params = { title: 't' };
      const formData = { append: jest.fn() };
      (createFormData as jest.Mock).mockReturnValue(formData);
      await service.create(params as any);
      expect(formData.append).toHaveBeenCalledWith('title', 't');
      expect(formData.append).not.toHaveBeenCalledWith('description', expect.anything());
      expect(formData.append).not.toHaveBeenCalledWith('workspace_id', expect.anything());
      expect(formData.append).not.toHaveBeenCalledWith('image', expect.anything());
    });
  });

  describe('getById', () => {
    it('should call http.get', () => {
      service.getById('id');
      expect(mockHttpClient.get).toHaveBeenCalledWith('/base/id');
    });
  });

  describe('update', () => {
    it('should append all fields except image and call http.put, then uploadImage if image provided', async () => {
      const params = { title: 't', description: 'd', icon: 'i', status: 's', visibility: 'v', image: 'img' as any };
      const formData = { append: jest.fn() };
      const imageFormData = { append: jest.fn() };
      (createFormData as jest.Mock).mockReturnValueOnce(formData).mockReturnValueOnce(imageFormData);
      await service.update('id', params);
      expect(formData.append).toHaveBeenCalledWith('title', 't');
      expect(formData.append).toHaveBeenCalledWith('description', 'd');
      expect(formData.append).toHaveBeenCalledWith('icon', 'i');
      expect(formData.append).toHaveBeenCalledWith('status', 's');
      expect(formData.append).toHaveBeenCalledWith('visibility', 'v');
      expect(formData.append).toHaveBeenCalledTimes(5);
      expect(mockHttpClient.put).toHaveBeenCalledWith(
        '/base/id',
        formData,
        expect.objectContaining({ headers: expect.any(Object) })
      );
      expect(mockHttpClient.post).toHaveBeenCalledWith(
        '/base/id/image',
        imageFormData,
        expect.objectContaining({ headers: expect.any(Object) })
      );
    });
    it('should append only provided fields and call deleteImage if removeImage true', async () => {
      const params = { title: 't', removeImage: true };
      const formData = { append: jest.fn() };
      (createFormData as jest.Mock).mockReturnValue(formData);
      await service.update('id', params);
      expect(formData.append).toHaveBeenCalledWith('title', 't');
      expect(formData.append).toHaveBeenCalledTimes(1);
      expect(mockHttpClient.put).toHaveBeenCalledWith(
        '/base/id',
        formData,
        expect.objectContaining({ headers: expect.any(Object) })
      );
      expect(mockHttpClient.delete).toHaveBeenCalledWith('/base/id/image');
    });
  });

  describe('delete', () => {
    it('should call http.delete', () => {
      service.delete('id');
      expect(mockHttpClient.delete).toHaveBeenCalledWith('/base/id');
    });
  });

  describe('getTablesByBaseId', () => {
    it('should call http.get', () => {
      service.getTablesByBaseId('id');
      expect(mockHttpClient.get).toHaveBeenCalledWith('/base/id/tables');
    });
  });

  describe('getAll', () => {
    it('should call http.get', () => {
      service.getAll();
      expect(mockHttpClient.get).toHaveBeenCalledWith('/base/');
    });
  });

  describe('getMembers', () => {
    it('should call http.get', () => {
      service.getMembers('id');
      expect(mockHttpClient.get).toHaveBeenCalledWith('/base/id/members');
    });
  });

  describe('getMembersWithRoles', () => {
    it('should call http.get', () => {
      service.getMembersWithRoles('id');
      expect(mockHttpClient.get).toHaveBeenCalledWith('/base/id/members-with-roles');
    });
  });

  describe('bulkAddMembers', () => {
    it('should call http.post', () => {
      const params = { users: ['a'] };
      service.bulkAddMembers('id', params as any);
      expect(mockHttpClient.post).toHaveBeenCalledWith('/base/id/bulk-add-members', params);
    });
  });

  describe('removeAccessMember', () => {
    it('should call http.delete', () => {
      service.removeAccessMember('aid');
      expect(mockHttpClient.delete).toHaveBeenCalledWith('/base/access/aid');
    });
  });

  describe('uploadImage', () => {
    it('should append image and call http.post', () => {
      const formData = { append: jest.fn() };
      (createFormData as jest.Mock).mockReturnValue(formData);
      service.uploadImage('id', 'img' as any);
      expect(formData.append).toHaveBeenCalledWith('image', 'img');
      expect(mockHttpClient.post).toHaveBeenCalledWith(
        '/base/id/image',
        formData,
        expect.objectContaining({ headers: expect.any(Object) })
      );
    });
  });

  describe('deleteImage', () => {
    it('should call http.delete', () => {
      service.deleteImage('id');
      expect(mockHttpClient.delete).toHaveBeenCalledWith('/base/id/image');
    });
  });

  describe('removeUserFromBase', () => {
    it('should call http.post', () => {
      const params = { userId: 'u' };
      service.removeUserFromBase('bid', params as any);
      expect(mockHttpClient.post).toHaveBeenCalledWith('/base/bid/remove', params);
    });
  });
});
