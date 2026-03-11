/*
* Copyright (c) 2026 Aptlogica Technologies Private Limited
*
* This file is part of software developed by Aptlogica Technologies Private Limited.
*
* Licensed under the MIT License. See the LICENSE file in the project root
* for full license information.
*
* Websites:
* https://www.aptlogica.com
* https://www.serenibase.com
*
* Support:
* support@aptlogica.com
* support@serenibase.com
*/

import { HttpClient } from './client/http-client';
import { AuthService } from './services/auth-service';
import { WorkspaceService } from './services/workspace-service';
import { BaseService } from './services/base-service';
import { TableService } from './services/table-service';
import { ClientConfig } from './types';
import { UserService } from './services/user-service';
import { AssetService } from './services/asset-service';
import { OrganizationService } from './services/organization-service';
import { ColumnService } from './services/column-service';
import { RowService } from './services/row-service';
import { ViewService } from './services/view-service';

export class SereniBaseClient {
  private readonly http: HttpClient;

  public readonly auth: AuthService;
  public readonly workspace: WorkspaceService;
  public readonly baseService: BaseService;
  public readonly tableService: TableService;
  public readonly userService: UserService;
  public readonly assetService: AssetService;
  public readonly organization: OrganizationService;

  // New specialized services (can be used directly for better organization)
  public readonly columnService: ColumnService;
  public readonly rowService: RowService;
  public readonly viewService: ViewService;

  constructor(config: ClientConfig) {
    this.http = new HttpClient(config);

    // Initialize services
    this.auth = new AuthService(this.http);
    this.workspace = new WorkspaceService(this.http);
    this.baseService = new BaseService(this.http);
    this.tableService = new TableService(this.http);
    this.userService = new UserService(this.http);
    this.assetService = new AssetService(this.http);
    this.organization = new OrganizationService(this.http);

    // Initialize specialized services
    this.columnService = new ColumnService(this.http);
    this.rowService = new RowService(this.http);
    this.viewService = new ViewService(this.http);

    // Set up service injection for delegation
    this.userService.setWorkspaceService(this.workspace);
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
