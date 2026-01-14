// __mocks__/axios.ts
const mockAxiosInstance = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  patch: jest.fn(),
  delete: jest.fn(),
  request: jest.fn(),
  interceptors: {
    request: { use: jest.fn() },
    response: { use: jest.fn() },
  },
};

const axios = {
  create: jest.fn(() => mockAxiosInstance),
  isAxiosError: jest.fn(),
};

export default axios;
export { mockAxiosInstance };
