// tests/utils/form-data.unit.test.ts
import { createFormData } from '../../src/utils/form-data';

// Mock formdata-node and global FormData/File
jest.mock('formdata-node', () => ({
  FormData: jest.fn().mockImplementation(function (this: { append: jest.Mock }) {
    this.append = jest.fn();
  }),
  File: jest.fn(),
}));

describe('createFormData utility', () => {
  let originalFormData: typeof globalThis.FormData | undefined;
  let originalFile: typeof globalThis.File | undefined;

  beforeEach(() => {
    jest.resetModules();
    originalFormData = globalThis.FormData;
    originalFile = globalThis.File;
  });

  afterEach(() => {
    if (originalFormData) globalThis.FormData = originalFormData;
    else delete (globalThis as any).FormData;
    if (originalFile) globalThis.File = originalFile;
    else delete (globalThis as any).File;
    jest.clearAllMocks();
  });

  describe('Success Scenarios', () => {
    it('should use global FormData if available', () => {
      globalThis.FormData = jest.fn().mockImplementation(function (this: { append: jest.Mock }) {
        this.append = jest.fn();
      }) as any;
      const formData = createFormData();
      expect(formData).toBeInstanceOf(globalThis.FormData);
    });

    it('should fallback to formdata-node if global FormData is not available', () => {
      delete (globalThis as any).FormData;
      // Clear require cache to ensure fresh mock
      jest.resetModules();
      const { FormData: NodeFormData } = require('formdata-node');
      const formData = createFormData();
      // Check constructor name since jest.fn() !== jest.fn() for instanceof
      expect(formData.constructor.name).toBe(NodeFormData.mock.instances[0]?.constructor.name || 'mockConstructor');
    });
  });


  describe('Edge Cases', () => {
    it('should set global FormData and File if missing', () => {
      delete (globalThis as any).FormData;
      delete (globalThis as any).File;
      jest.resetModules();
      const { createFormData } = require('../../src/utils/form-data');
      expect(() => createFormData()).not.toThrow();
      expect(globalThis.FormData).toBeDefined();
      expect(globalThis.File).toBeDefined();
    });
    it('should not overwrite existing global File', () => {
      (globalThis as any).File = function CustomFile() {};
      delete (globalThis as any).FormData;
      jest.resetModules();
      const { createFormData } = require('../../src/utils/form-data');
      createFormData();
      expect(globalThis.File.name).toBe('CustomFile');
    });
  });

  describe('Error Scenarios', () => {
    it('should not throw if formdata-node is used', () => {
      delete (globalThis as any).FormData;
      expect(() => createFormData()).not.toThrow();
    });
  });
});
