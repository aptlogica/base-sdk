import { AssetService } from '../../src/services/asset-service';
import { createFormData } from '../../src/utils/form-data';
import type { HttpClient } from '../../src/client/http-client';

jest.mock('../../src/utils/form-data');

const mockHttpClient = {
  post: jest.fn(),
  patch: jest.fn(),
  delete: jest.fn(),
  getUploadLimits: jest.fn(),
};

describe('AssetService', () => {
  let service: AssetService;

  beforeEach(() => {
    jest.clearAllMocks();
    (createFormData as jest.Mock).mockReturnValue({
      append: jest.fn(),
    });
    mockHttpClient.getUploadLimits.mockReturnValue({ maxContentLength: 100, maxBodyLength: 100 });
    service = new AssetService(mockHttpClient as unknown as HttpClient);
  });

  describe('upload', () => {
    it('should append files, description, tags and call http.post', () => {
      const files = [{ name: 'f1' }, { name: 'f2' }];
      const formData = { append: jest.fn() };
      (createFormData as jest.Mock).mockReturnValue(formData);
      const tags = ['a', 'b'];
      service.upload(files as any, 'desc', tags);
      expect(formData.append).toHaveBeenCalledWith('files', files[0]);
      expect(formData.append).toHaveBeenCalledWith('files', files[1]);
      expect(formData.append).toHaveBeenCalledWith('description', 'desc');
      expect(formData.append).toHaveBeenCalledWith('tags', JSON.stringify(tags));
      expect(mockHttpClient.post).toHaveBeenCalledWith(
        '/asset/upload',
        formData,
        expect.objectContaining({ headers: expect.any(Object) })
      );
    });
    it('should handle no description/tags', () => {
      const files = [{ name: 'f1' }];
      const formData = { append: jest.fn() };
      (createFormData as jest.Mock).mockReturnValue(formData);
      service.upload(files as any);
      expect(formData.append).toHaveBeenCalledWith('files', files[0]);
      expect(formData.append).not.toHaveBeenCalledWith('description', expect.anything());
      expect(formData.append).not.toHaveBeenCalledWith('tags', expect.anything());
    });
    it('should add onUploadProgress if extra provided', () => {
      const files = [{ name: 'f1' }];
      const formData = { append: jest.fn() };
      (createFormData as jest.Mock).mockReturnValue(formData);
      const extra = jest.fn();
      service.upload(files as any, undefined, undefined, extra);
      expect(mockHttpClient.post).toHaveBeenCalledWith(
        '/asset/upload',
        formData,
        expect.objectContaining({ onUploadProgress: extra })
      );
    });
  });

  describe('uploadImage', () => {
    it('should append file and optimize, call http.post', () => {
      const file = { name: 'img' };
      const formData = { append: jest.fn() };
      (createFormData as jest.Mock).mockReturnValue(formData);
      service.uploadImage(file as any, true);
      expect(formData.append).toHaveBeenCalledWith('file', file);
      expect(formData.append).toHaveBeenCalledWith('optimize', 'true');
      expect(mockHttpClient.post).toHaveBeenCalledWith(
        '/asset/upload-image',
        formData,
        expect.objectContaining({ headers: expect.any(Object) })
      );
    });
    it('should not append optimize if undefined', () => {
      const file = { name: 'img' };
      const formData = { append: jest.fn() };
      (createFormData as jest.Mock).mockReturnValue(formData);
      service.uploadImage(file as any);
      expect(formData.append).toHaveBeenCalledWith('file', file);
      expect(formData.append).not.toHaveBeenCalledWith('optimize', expect.anything());
    });
    it('should add onUploadProgress if extra provided', () => {
      const file = { name: 'img' };
      const formData = { append: jest.fn() };
      (createFormData as jest.Mock).mockReturnValue(formData);
      const extra = jest.fn();
      service.uploadImage(file as any, false, extra);
      expect(mockHttpClient.post).toHaveBeenCalledWith(
        '/asset/upload-image',
        formData,
        expect.objectContaining({ onUploadProgress: extra })
      );
    });
  });

  describe('getBulk', () => {
    it('should call http.post with params', () => {
      const params = { ids: ['1', '2'] };
      service.getBulk(params as any);
      expect(mockHttpClient.post).toHaveBeenCalledWith('/asset/bulk', params);
    });
  });

  describe('updateById', () => {
    it('should call http.patch with id and params', () => {
      const params = { foo: 1 };
      service.updateById('id1', params as any);
      expect(mockHttpClient.patch).toHaveBeenCalledWith('/asset/id1', params);
    });
  });

  describe('deleteById', () => {
    it('should call http.delete with id', () => {
      service.deleteById('id2');
      expect(mockHttpClient.delete).toHaveBeenCalledWith('/asset/id2');
    });
  });

  describe('addImage', () => {
    const originalFormData = global.FormData;
    let appendMock: jest.Mock;

    beforeEach(() => {
      appendMock = jest.fn();
      (global as any).FormData = jest.fn(() => ({ append: appendMock }));
    });

    afterEach(() => {
      global.FormData = originalFormData;
    });

    it('should append each file and call http.post with unlimited size config', () => {
      const files = [{ name: 'a' }, { name: 'b' }];
      service.addImage({ files } as any);
      expect(appendMock).toHaveBeenCalledWith('files', files[0]);
      expect(appendMock).toHaveBeenCalledWith('files', files[1]);
      const [url, formData, config] = mockHttpClient.post.mock.calls[0];
      expect(url).toBe('/asset/upload-image');
      expect(formData.append).toBe(appendMock);
      expect(config).toEqual({
        headers: { 'content-type': 'multipart/form-data' },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      });
    });

    it('should not append when files is not an array', () => {
      service.addImage({} as any);
      expect(appendMock).not.toHaveBeenCalled();
      expect(mockHttpClient.post).toHaveBeenCalledWith(
        '/asset/upload-image',
        expect.anything(),
        expect.not.objectContaining({ onUploadProgress: expect.anything() })
      );
    });

    it('should add onUploadProgress if extra provided', () => {
      const extra = jest.fn();
      service.addImage({ files: [] } as any, extra);
      expect(mockHttpClient.post).toHaveBeenCalledWith(
        '/asset/upload-image',
        expect.anything(),
        expect.objectContaining({ onUploadProgress: extra })
      );
    });
  });
});
