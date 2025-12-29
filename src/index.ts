import { HttpClient } from './client/http-client';
import { AuthService } from './services/auth-service';
import { WorkspaceService } from './services/workspace-service';
import { BaseService } from './services/base-service';
import { TableService } from './services/table-service';
import { ClientConfig } from './types';
import { UserService } from './services/user-service';
import { AssetService } from './services/asset-service';

export class SereniBaseClient {
  private http: HttpClient;
  
  public readonly auth: AuthService;
  public readonly workspace: WorkspaceService;
  public readonly baseService: BaseService;
  public readonly tableService: TableService;
  public readonly userService: UserService;
  public readonly assetService: AssetService;

  constructor(config: ClientConfig) {
    this.http = new HttpClient(config);

    // Initialize services
    this.auth = new AuthService(this.http);
    this.workspace = new WorkspaceService(this.http);
    this.baseService = new BaseService(this.http);
    this.tableService = new TableService(this.http);
    this.userService = new UserService(this.http);
    this.assetService = new AssetService(this.http);
  }

  /**
   * Set authentication token
   */
  setAuth(token: string): void {
    this.http.setAuthToken(token);
  }

  /**
   * Set custom headers for all HTTP requests
   */
  setHeaders(headers: Record<string, string>): void {
    this.http.setHeaders(headers);
  }

  /**
   * Clear authentication
   */
  clearAuth(): void {
    this.http.clearAuth();
  }

  /**
   * Update client configuration
   */
  updateConfig(config: Partial<ClientConfig>): void {
    this.http.updateConfig(config);
  }

  /**
   * Listen to HTTP events
   */
  on(event: string, listener: (...args: any[]) => void): void {
    this.http.on(event, listener);
  }

  /**
   * Remove HTTP event listener
   */
  off(event: string, listener: (...args: any[]) => void): void {
    this.http.off(event, listener);
  }
}


// Export everything
export * from './types';
export * from './client/http-client';
export * from './services/auth-service';

export default SereniBaseClient;
