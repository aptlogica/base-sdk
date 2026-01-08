
import SereniBaseClient from '@src/index';
import { HttpClient } from '@src/client/http-client';
import { AuthService } from '@src/services/auth-service';
import { WorkspaceService } from '@src/services/workspace-service';
import { BaseService } from '@src/services/base-service';
import { TableService } from '@src/services/table-service';
import { UserService } from '@src/services/user-service';
import { AssetService } from '@src/services/asset-service';
import { OrganizationService } from '@src/services/organization-service';
import { ColumnService } from '@src/services/column-service';
import { RowService } from '@src/services/row-service';
import { ViewService } from '@src/services/view-service';
import type { ClientConfig } from '@src/types';

jest.mock('@src/client/http-client');
jest.mock('@src/services/auth-service');
jest.mock('@src/services/workspace-service');
jest.mock('@src/services/base-service');
jest.mock('@src/services/table-service');
jest.mock('@src/services/user-service');
jest.mock('@src/services/asset-service');
jest.mock('@src/services/organization-service');
jest.mock('@src/services/column-service');
jest.mock('@src/services/row-service');
jest.mock('@src/services/view-service');

describe('SereniBaseClient', () => {
  let config: ClientConfig;
  beforeEach(() => {
    jest.clearAllMocks();
    config = { baseURL: 'url' } as ClientConfig;
  });

  it('should initialize all services with HttpClient', () => {
    const client = new SereniBaseClient(config);
    expect(HttpClient).toHaveBeenCalledWith(config);
    expect(AuthService).toHaveBeenCalledWith(expect.any(HttpClient));
    expect(WorkspaceService).toHaveBeenCalledWith(expect.any(HttpClient));
    expect(BaseService).toHaveBeenCalledWith(expect.any(HttpClient));
    expect(TableService).toHaveBeenCalledWith(expect.any(HttpClient));
    expect(UserService).toHaveBeenCalledWith(expect.any(HttpClient));
    expect(AssetService).toHaveBeenCalledWith(expect.any(HttpClient));
    expect(OrganizationService).toHaveBeenCalledWith(expect.any(HttpClient));
    expect(ColumnService).toHaveBeenCalledWith(expect.any(HttpClient));
    expect(RowService).toHaveBeenCalledWith(expect.any(HttpClient));
    expect(ViewService).toHaveBeenCalledWith(expect.any(HttpClient));
  });

  it('should call setAuth on HttpClient', () => {
    const client = new SereniBaseClient(config);
    client.setAuth('token');
    expect(HttpClient.prototype.setAuthToken).toHaveBeenCalledWith('token');
  });

  it('should call setHeaders on HttpClient', () => {
    const client = new SereniBaseClient(config);
    client.setHeaders({ foo: 'bar' });
    expect(HttpClient.prototype.setHeaders).toHaveBeenCalledWith({ foo: 'bar' });
  });

  it('should call clearAuth on HttpClient', () => {
    const client = new SereniBaseClient(config);
    client.clearAuth();
    expect(HttpClient.prototype.clearAuth).toHaveBeenCalled();
  });

  it('should call updateConfig on HttpClient', () => {
    const client = new SereniBaseClient(config);
    client.updateConfig({ timeout: 100 });
    expect(HttpClient.prototype.updateConfig).toHaveBeenCalledWith({ timeout: 100 });
  });

  it('should call on/off on HttpClient', () => {
    const client = new SereniBaseClient(config);
    const fn = jest.fn();
    client.on('event', fn);
    expect(HttpClient.prototype.on).toHaveBeenCalledWith('event', fn);
    client.off('event', fn);
    expect(HttpClient.prototype.off).toHaveBeenCalledWith('event', fn);
  });
});
