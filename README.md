# gopostgrest-sdk - TypeScript SDK for SereniBase UI

> Official TypeScript SDK for SereniBase Backend integration. **Exclusively designed for SereniBase UI (base-ui)** - provides type-safe API communication, authentication management, and comprehensive service layer for workspace, base, table, and data operations.

[![Version](https://img.shields.io/badge/Version-1.0.0-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Quality Gate Status](https://sonar.aptlogica.com/api/project_badges/quality_gate?project=aptlogica_base-sdk_831f5ed1-22c6-4f6b-830a-bf0629564fb1&token=sqb_5d01b701b8091514f115d0f522a40ee687fd6809)](https://sonar.aptlogica.com/dashboard?id=aptlogica_base-sdk_831f5ed1-22c6-4f6b-830a-bf0629564fb1)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [API Services](#api-services)
- [Usage Examples](#usage-examples)
- [Type Definitions](#type-definitions)
- [Error Handling](#error-handling)
- [Event System](#event-system)
- [Development](#development)
- [Testing](#testing)
- [Building](#building)
- [Integration with SereniBase UI](#integration-with-serenibase-ui)
- [Troubleshooting](#troubleshooting)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [FAQ](#faq)
- [License](#license)

## Overview

**gopostgrest-sdk** is the official TypeScript SDK for communicating with the SereniBase Backend API. It provides a comprehensive, type-safe interface for all backend operations including authentication, workspace management, database operations, and data manipulation.

### 🔒 Exclusive SereniBase UI Integration

**Important:** This SDK is **specifically designed for SereniBase UI (base-ui)** and is not intended as a standalone library for general use. It is tightly coupled to:

- SereniBase Backend API endpoints and response formats
- SereniBase data models (Workspace, Base, Table, Column, Row, View)
- SereniBase authentication flow (JWT-based)
- SereniBase-specific business logic and conventions

**Use Case:** If you're building or extending SereniBase Frontend (base-ui), this SDK is your gateway to the backend. For other projects, consider using the SereniBase REST API directly.

### Key Characteristics

- **Type-Safe**: Full TypeScript support with strict type checking and comprehensive type definitions for all API requests/responses

- **Service-Oriented**: Organized into 10+ specialized services (Auth, Workspace, Base, Table, Column, Row, View, User, Organization, Asset)

- **HTTP Client Abstraction**: Built on Axios with automatic request/response interceptors, error handling, and retry logic

- **Event-Driven**: EventEmitter-based architecture for request lifecycle hooks (request, response, error events)

- **Authentication Management**: Built-in JWT token handling with automatic header injection and token refresh support

- **Developer-Friendly**: Async/await API, Promise-based methods, detailed JSDoc comments, and comprehensive error messages

## Features

✅ **Comprehensive API Coverage**
- **Authentication**: Login, logout, token validation, password reset, OTP verification
- **Workspaces**: Create, read, update, delete workspaces; manage members and permissions
- **Bases**: Database creation, schema management, base settings
- **Tables**: Table CRUD, import/export, schema modifications
- **Columns**: Field type management, constraints, validations, relations
- **Rows**: Record CRUD with pagination, filtering, sorting
- **Views**: View configuration (Grid, Calendar, Kanban, Gallery, Gantt, Form)
- **Users**: User management, profiles, roles, permissions
- **Organizations**: Organization settings and member management
- **Assets**: File uploads, attachments, asset management

✅ **Type Safety & IntelliSense**
- Full TypeScript definitions for all methods and parameters
- Strict null checking and type guards
- Auto-completion in VS Code and other TypeScript-aware IDEs
- Compile-time error detection

✅ **HTTP Client Features**
- Automatic retry on network failures (configurable)
- Request/response interceptors
- Timeout configuration
- Custom headers support
- FormData handling for file uploads
- Progress tracking for uploads

✅ **Authentication Flow**
- JWT token management
- Automatic token injection in headers
- Token validation and refresh
- Auth state management
- Secure credential handling

✅ **Error Handling**
- Typed error responses
- HTTP status code handling
- Network error detection
- Request timeout handling
- Detailed error messages

✅ **Event System**
- Request lifecycle events (`request`, `response`, `error`)
- Custom event listeners
- Debugging and logging hooks
- Request tracking

✅ **Developer Experience**
- ESM and CommonJS module formats
- Tree-shaking support
- Source maps for debugging
- Comprehensive JSDoc documentation
- Jest tests with 80%+ coverage
- TypeDoc API documentation generation

## Installation

### For SereniBase UI Development

If you're working on the SereniBase UI (base-ui) project, the SDK is already included as a local dependency:

```bash
# Navigate to base-ui project
cd base-ui

# SDK is already included via package.json:
# "gopostgrest-sdk": "file:./gopostgrest-sdk-1.0.0.tgz"

# Install dependencies (includes SDK)
npm install
```

### Building SDK from Source

If you're modifying the SDK:

```bash
# Navigate to base-sdk project
cd base-sdk

# Install dependencies
npm install

# Build SDK
npm run build

# Pack SDK for local use
npm pack
# Creates: gopostgrest-sdk-1.0.0.tgz

# Copy to base-ui project
cp gopostgrest-sdk-1.0.0.tgz ../base-ui/
```

### Development Workflow

For active SDK development alongside base-ui:

```bash
# Terminal 1: Watch mode for SDK
cd base-sdk
npm run dev  # Auto-rebuilds on file changes

# Terminal 2: Link SDK to base-ui
cd base-sdk
npm link

cd ../base-ui
npm link gopostgrest-sdk

# Terminal 3: Run base-ui with linked SDK
cd base-ui
npm run dev
```

## Quick Start

### Basic Initialization

```typescript
import SereniBaseClient from 'gopostgrest-sdk';

// Initialize client with backend URL
const client = new SereniBaseClient({
  baseURL: 'http://localhost:8080/api/v1',
  timeout: 30000,
});

// Use services
const workspaces = await client.workspace.getAll();
console.log('Workspaces:', workspaces);
```

### With Authentication

```typescript
import SereniBaseClient from 'gopostgrest-sdk';

// Initialize client
const client = new SereniBaseClient({
  baseURL: 'https://api.serenibase.com/api/v1',
  timeout: 30000,
});

// Login
const loginResponse = await client.auth.login({
  email: 'user@example.com',
  password: 'securepassword',
});

// Set authentication token for subsequent requests
client.setAuth(loginResponse.token.access_token);

// Now all requests include authentication
const workspaces = await client.workspace.getAll();
const bases = await client.baseService.getAll();
```

### React Hook Example (SereniBase UI Pattern)

```typescript
// Custom hook in base-ui project
import { useQuery, useMutation } from '@tanstack/react-query';
import { useSereniBaseClient } from './useSereniBaseClient';

export function useWorkspaces() {
  const client = useSereniBaseClient();

  // Fetch all workspaces
  const workspacesQuery = useQuery({
    queryKey: ['workspaces'],
    queryFn: () => client.workspace.getAll(),
  });

  // Create workspace mutation
  const createWorkspace = useMutation({
    mutationFn: (data: { name: string; icon?: string }) =>
      client.workspace.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
    },
  });

  return {
    workspaces: workspacesQuery.data,
    isLoading: workspacesQuery.isLoading,
    createWorkspace,
  };
}
```

## Configuration

### Client Configuration

```typescript
interface ClientConfig {
  baseURL: string;           // Backend API base URL (required)
  timeout?: number;          // Request timeout in ms (default: 30000)
  headers?: Record<string, string>;  // Custom headers
  withCredentials?: boolean; // Send cookies with requests (default: false)
  maxRetries?: number;       // Max retry attempts (default: 3)
  retryDelay?: number;       // Delay between retries in ms (default: 1000)
}
```

### Configuration Examples

**Development (Local Backend):**
```typescript
const client = new SereniBaseClient({
  baseURL: 'http://localhost:8080/api/v1',
  timeout: 30000,
  headers: {
    'X-Client-Version': '1.0.0',
  },
});
```

**Production (Cloud Backend):**
```typescript
const client = new SereniBaseClient({
  baseURL: 'https://api.serenibase.com/api/v1',
  timeout: 60000,
  withCredentials: true,
  maxRetries: 5,
  retryDelay: 2000,
});
```

**With Custom Headers:**
```typescript
const client = new SereniBaseClient({
  baseURL: process.env.VITE_API_BASE_URL,
  timeout: 30000,
});

// Set headers dynamically
client.setHeaders({
  'X-Workspace-Id': currentWorkspaceId,
  'X-Base-Id': currentBaseId,
});
```

## API Services

### Available Services

| Service | Purpose | Key Methods |
|---------|---------|-------------|
| **auth** | Authentication & authorization | `login()`, `logout()`, `verifyToken()`, `resetPassword()` |
| **workspace** | Workspace management | `create()`, `getAll()`, `getById()`, `update()`, `delete()` |
| **baseService** | Database (base) management | `create()`, `getAll()`, `getById()`, `update()`, `delete()` |
| **tableService** | Table schema & operations | `create()`, `getById()`, `update()`, `delete()`, `import()` |
| **columnService** | Column/field management | `create()`, `update()`, `delete()`, `reorder()` |
| **rowService** | Record data operations | `create()`, `getById()`, `update()`, `delete()`, `bulkCreate()` |
| **viewService** | View configuration | `create()`, `update()`, `delete()`, `reorder()` |
| **userService** | User management | `getAll()`, `getById()`, `update()`, `inviteUser()` |
| **organization** | Organization settings | `create()`, `update()`, `getMembers()` |
| **assetService** | File & attachment uploads | `upload()`, `delete()`, `getById()` |

### Service Architecture

```typescript
class SereniBaseClient {
  // Core services
  public readonly auth: AuthService;
  public readonly workspace: WorkspaceService;
  public readonly baseService: BaseService;
  public readonly tableService: TableService;
  public readonly userService: UserService;
  public readonly organization: OrganizationService;
  public readonly assetService: AssetService;

  // Specialized services
  public readonly columnService: ColumnService;
  public readonly rowService: RowService;
  public readonly viewService: ViewService;

  // HTTP client methods
  setAuth(token: string): void;
  setHeaders(headers: Record<string, string>): void;
  clearAuth(): void;
  on(event: string, listener: Function): void;
  off(event: string, listener: Function): void;
}
```

## Usage Examples

### Authentication

```typescript
// Login
const loginResult = await client.auth.login({
  email: 'user@example.com',
  password: 'mypassword',
});

// Extract token
const { access_token, refresh_token } = loginResult.token;
client.setAuth(access_token);

// Verify token
const isValid = await client.auth.validateToken({
  token: access_token,
});

// Logout
await client.auth.logout({ token: access_token });
client.clearAuth();

// Forgot password
await client.auth.forgotPassword({
  email: 'user@example.com',
});

// Reset password
await client.auth.resetPassword({
  token: 'reset-token-uuid',
  new_password: 'newSecurePassword123',
});
```

### Workspace Management

```typescript
// Create workspace
const workspace = await client.workspace.create({
  name: 'Engineering Team',
  icon: '🚀',
  description: 'Internal tools and databases',
});

// Get all workspaces
const workspaces = await client.workspace.getAll();

// Get workspace by ID
const workspace = await client.workspace.getById('workspace-uuid');

// Update workspace
await client.workspace.update('workspace-uuid', {
  name: 'Engineering & DevOps',
  icon: '⚙️',
});

// Get workspace members
const members = await client.workspace.getMembers('workspace-uuid');

// Get workspace bases
const bases = await client.workspace.getBasesByWorkspaceId('workspace-uuid');

// Delete workspace
await client.workspace.delete('workspace-uuid');
```

### Base (Database) Management

```typescript
// Create base
const base = await client.baseService.create({
  name: 'Product Catalog',
  workspace_id: 'workspace-uuid',
  icon: '📦',
});

// Get all bases
const bases = await client.baseService.getAll();

// Get base by ID
const base = await client.baseService.getById('base-uuid');

// Update base
await client.baseService.update('base-uuid', {
  name: 'Product Catalog v2',
  description: 'Updated product database',
});

// Get base tables
const tables = await client.baseService.getTablesByBaseId('base-uuid');

// Delete base
await client.baseService.delete('base-uuid');
```

### Table Management

```typescript
// Create table
const table = await client.tableService.create({
  name: 'Products',
  base_id: 'base-uuid',
});

// Get table with data (paginated)
const tableData = await client.tableService.getById('table-uuid', {
  page: 1,
  page_size: 50,
});

// Update table
await client.tableService.update('table-uuid', {
  name: 'Products (Active)',
  description: 'Active product listings',
});

// Import table from CSV
const importResult = await client.tableService.import({
  base_id: 'base-uuid',
  file: csvFile,  // File object
  table_name: 'Imported Products',
}, (progressEvent) => {
  const percent = (progressEvent.loaded / progressEvent.total) * 100;
  console.log(`Upload progress: ${percent}%`);
});

// Delete table
await client.tableService.delete('table-uuid');
```

### Column (Field) Management

```typescript
// Create column
const column = await client.columnService.create({
  table_id: 'table-uuid',
  title: 'Product Name',
  uidt: 'text',  // Field type
  meta: {
    required: true,
  },
});

// Update column
await client.columnService.update('column-uuid', {
  title: 'Product Title',
  meta: {
    required: true,
    max_length: 255,
  },
});

// Delete column
await client.columnService.delete('column-uuid');

// Reorder columns
await client.columnService.reorder('table-uuid', {
  order: ['col-1-uuid', 'col-2-uuid', 'col-3-uuid'],
});
```

### Row (Record) Management

```typescript
// Create single row
const row = await client.rowService.create('table-uuid', {
  'Product Name': 'Laptop',
  'Price': 999.99,
  'In Stock': true,
});

// Bulk create rows
const rows = await client.rowService.bulkCreate('table-uuid', [
  { 'Product Name': 'Mouse', 'Price': 29.99 },
  { 'Product Name': 'Keyboard', 'Price': 79.99 },
  { 'Product Name': 'Monitor', 'Price': 299.99 },
]);

// Get row by ID
const row = await client.rowService.getById('table-uuid', 'row-uuid');

// Update row
await client.rowService.update('table-uuid', 'row-uuid', {
  'Price': 899.99,
  'In Stock': false,
});

// Delete row
await client.rowService.delete('table-uuid', 'row-uuid');

// Bulk delete rows
await client.rowService.bulkDelete('table-uuid', [
  'row-1-uuid',
  'row-2-uuid',
  'row-3-uuid',
]);
```

### View Management

```typescript
// Create view
const view = await client.viewService.create({
  table_id: 'table-uuid',
  title: 'Active Products',
  type: 'grid',  // grid, calendar, kanban, gallery, gantt, form
  meta: {
    filters: [
      { field: 'In Stock', operator: 'eq', value: true },
    ],
    sorts: [
      { field: 'Product Name', direction: 'asc' },
    ],
  },
});

// Update view
await client.viewService.update('view-uuid', {
  title: 'Available Products',
  meta: {
    // Updated filters and sorts
  },
});

// Delete view
await client.viewService.delete('view-uuid');

// Reorder views
await client.viewService.reorder('table-uuid', {
  order: ['view-1-uuid', 'view-2-uuid', 'view-3-uuid'],
});
```

### User Management

```typescript
// Get all users
const users = await client.userService.getAll();

// Get user by ID
const user = await client.userService.getById('user-uuid');

// Update user profile
await client.userService.update('user-uuid', {
  display_name: 'John Doe',
  avatar_url: 'https://example.com/avatar.jpg',
});

// Invite user to workspace
await client.userService.inviteUser('workspace-uuid', {
  email: 'newuser@example.com',
  role: 'editor',
});
```

### Asset (File) Management

```typescript
// Upload file
const uploadResult = await client.assetService.upload(
  fileObject,  // File object from <input type="file">
  {
    workspace_id: 'workspace-uuid',
    path: 'attachments/documents',
  },
  (progressEvent) => {
    const percent = (progressEvent.loaded / progressEvent.total) * 100;
    console.log(`Upload: ${percent}%`);
  }
);

console.log('File URL:', uploadResult.url);

// Get asset by ID
const asset = await client.assetService.getById('asset-uuid');

// Delete asset
await client.assetService.delete('asset-uuid');
```

## Type Definitions

### Core Types

```typescript
// Client configuration
interface ClientConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
  withCredentials?: boolean;
  maxRetries?: number;
  retryDelay?: number;
}

// Authentication types
interface LoginParams {
  email: string;
  password: string;
}

interface LoginResponse {
  user: User;
  token: {
    access_token: string;
    refresh_token: string;
  };
}

// Workspace types
interface CreateWorkspace {
  name: string;
  icon?: string;
  description?: string;
}

interface Workspace {
  id: string;
  name: string;
  icon?: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

// Table types
interface CreateTable {
  name: string;
  base_id: string;
  description?: string;
}

interface Table {
  id: string;
  name: string;
  base_id: string;
  columns: Column[];
  views: View[];
  rows?: Row[];
  created_at: string;
  updated_at: string;
}

// Column types
interface Column {
  id: string;
  title: string;
  uidt: string;  // Field type: text, number, date, etc.
  meta?: Record<string, any>;
  order: number;
}

// Row types
interface Row {
  id: string;
  [columnName: string]: any;
}

// View types
interface View {
  id: string;
  title: string;
  type: 'grid' | 'calendar' | 'kanban' | 'gallery' | 'gantt' | 'form';
  meta?: {
    filters?: Filter[];
    sorts?: Sort[];
    groups?: Group[];
  };
}
```

### Importing Types

```typescript
// Import all types
import type { 
  ClientConfig,
  LoginParams,
  LoginResponse,
  CreateWorkspace,
  Workspace,
  Table,
  Column,
  Row,
  View,
} from 'gopostgrest-sdk';

// Use types in your code
const workspace: Workspace = await client.workspace.getById('id');
const table: Table = await client.tableService.getById('id');
```

## Error Handling

### Error Types

```typescript
// HTTP errors
class HttpError extends Error {
  status: number;
  statusText: string;
  data: any;
}

// Network errors
class NetworkError extends Error {
  code: string;
}

// Timeout errors
class TimeoutError extends Error {
  timeout: number;
}
```

### Error Handling Patterns

```typescript
// Try-catch pattern
try {
  const workspaces = await client.workspace.getAll();
  console.log('Success:', workspaces);
} catch (error) {
  if (error.status === 401) {
    console.error('Unauthorized - please login');
  } else if (error.status === 404) {
    console.error('Resource not found');
  } else if (error.code === 'ECONNREFUSED') {
    console.error('Cannot connect to backend');
  } else {
    console.error('Unexpected error:', error.message);
  }
}

// Promise pattern
client.workspace.getAll()
  .then(workspaces => {
    console.log('Workspaces:', workspaces);
  })
  .catch(error => {
    console.error('Error fetching workspaces:', error);
  });

// With React Query (SereniBase UI pattern)
const { data, error, isLoading } = useQuery({
  queryKey: ['workspaces'],
  queryFn: () => client.workspace.getAll(),
  onError: (error) => {
    toast.error(`Failed to load workspaces: ${error.message}`);
  },
});
```

### Global Error Handler

```typescript
// Listen to all HTTP errors
client.on('error', (error) => {
  console.error('API Error:', error);
  
  // Log to monitoring service
  if (process.env.NODE_ENV === 'production') {
    logErrorToSentry(error);
  }
  
  // Show user-friendly message
  if (error.status === 401) {
    showToast('Session expired. Please login again.');
    redirectToLogin();
  }
});
```

## Event System

### Available Events

| Event | Trigger | Payload |
|-------|---------|---------|
| `request` | Before HTTP request sent | `{ method, url, data, headers }` |
| `response` | After successful response | `{ status, data, headers }` |
| `error` | After error response | `{ status, message, data }` |

### Event Listeners

```typescript
// Request event
client.on('request', ({ method, url, data }) => {
  console.log(`[${method}] ${url}`, data);
});

// Response event
client.on('response', ({ status, data }) => {
  console.log(`Response [${status}]`, data);
});

// Error event
client.on('error', ({ status, message }) => {
  console.error(`Error [${status}]: ${message}`);
});

// Remove listener
const errorHandler = (error) => console.error(error);
client.on('error', errorHandler);
client.off('error', errorHandler);  // Remove specific listener
```

### Request Tracking

```typescript
let requestCount = 0;

client.on('request', () => {
  requestCount++;
  console.log(`Total requests: ${requestCount}`);
});

client.on('response', ({ status }) => {
  if (status === 200) {
    console.log('Successful request');
  }
});
```

## Development

### Project Structure

```
base-sdk/
├── src/
│   ├── index.ts                 # Main entry point
│   ├── client/
│   │   └── http-client.ts       # HTTP client implementation
│   ├── services/
│   │   ├── auth-service.ts      # Authentication service
│   │   ├── workspace-service.ts # Workspace management
│   │   ├── base-service.ts      # Base management
│   │   ├── table-service.ts     # Table operations
│   │   ├── column-service.ts    # Column management
│   │   ├── row-service.ts       # Row operations
│   │   ├── view-service.ts      # View configuration
│   │   ├── user-service.ts      # User management
│   │   ├── organization-service.ts  # Organization settings
│   │   └── asset-service.ts     # File uploads
│   ├── types/                   # TypeScript type definitions
│   │   ├── auth.ts
│   │   ├── workspace.ts
│   │   ├── base.ts
│   │   ├── table.ts
│   │   ├── column.ts
│   │   ├── row.ts
│   │   ├── view.ts
│   │   ├── user.ts
│   │   └── index.ts
│   └── utils/
│       └── form-data.ts         # FormData helpers
├── tests/                       # Jest test files
│   ├── client/
│   ├── services/
│   └── utils/
├── dist/                        # Build output
│   ├── index.js                 # CommonJS bundle
│   ├── index.esm.js             # ES Module bundle
│   ├── index.d.ts               # Type declarations
│   └── index.d.ts.map           # Source maps
├── __mocks__/                   # Jest mocks
├── coverage/                    # Test coverage reports
├── package.json
├── tsconfig.json                # TypeScript config
├── rollup.config.js             # Build configuration
├── jest.config.js               # Test configuration
├── typedoc.json                 # Documentation config
└── README.md                    # This file
```

### Development Commands

```bash
# Install dependencies
npm install

# Development (watch mode)
npm run dev
# Auto-rebuilds on file changes

# Build for production
npm run build
# Outputs to dist/ directory

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Type checking
npm run type-check

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Generate API documentation
npm run docs
# Outputs to docs/ directory
```

### Development Workflow

```bash
# Make changes to source files in src/
# Watch mode automatically rebuilds

# Run tests
npm test

# Fix any linting issues
npm run lint:fix

# Build for production
npm run build

# Pack for use in base-ui
npm pack

# Copy to base-ui project
cp gopostgrest-sdk-1.0.0.tgz ../base-ui/
```

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- auth-service.test.ts
```

### Test Structure

```typescript
// Example test: tests/services/workspace-service.unit.test.ts
import { SereniBaseClient } from '../../src';
import { mockHttpClient } from '../__mocks__/http-client';

describe('WorkspaceService', () => {
  let client: SereniBaseClient;

  beforeEach(() => {
    client = new SereniBaseClient({
      baseURL: 'http://localhost:8080/api/v1',
    });
  });

  it('should fetch all workspaces', async () => {
    const mockWorkspaces = [
      { id: '1', name: 'Workspace 1' },
      { id: '2', name: 'Workspace 2' },
    ];

    mockHttpClient.get.mockResolvedValue(mockWorkspaces);

    const result = await client.workspace.getAll();
    expect(result).toEqual(mockWorkspaces);
    expect(mockHttpClient.get).toHaveBeenCalledWith('/workspace/');
  });

  it('should create workspace', async () => {
    const newWorkspace = { name: 'New Workspace', icon: '🚀' };
    const mockResponse = { id: '123', ...newWorkspace };

    mockHttpClient.post.mockResolvedValue(mockResponse);

    const result = await client.workspace.create(newWorkspace);
    expect(result).toEqual(mockResponse);
    expect(mockHttpClient.post).toHaveBeenCalledWith(
      '/workspace/create',
      newWorkspace
    );
  });
});
```

### Coverage Requirements

- **Statements**: 80%+
- **Branches**: 75%+
- **Functions**: 80%+
- **Lines**: 80%+

View coverage report:
```bash
npm test -- --coverage
open coverage/lcov-report/index.html
```

## Building

### Build Configuration

The SDK uses Rollup for bundling with the following outputs:

| Format | File | Use Case |
|--------|------|----------|
| **CommonJS** | `dist/index.js` | Node.js, older bundlers |
| **ES Module** | `dist/index.esm.js` | Modern bundlers, tree-shaking |
| **TypeScript** | `dist/index.d.ts` | Type definitions |

### Build Process

```bash
# Build all formats
npm run build

# Output structure:
# dist/
# ├── index.js          (CommonJS)
# ├── index.esm.js      (ES Module)
# ├── index.d.ts        (TypeScript types)
# └── index.d.ts.map    (Source maps)
```

### Build Optimization

- **Tree Shaking**: ESM format supports tree-shaking for smaller bundles
- **Minification**: Production builds are minified with Terser
- **Source Maps**: Development source maps for debugging
- **Type Declarations**: Auto-generated from TypeScript source

### Publishing

```bash
# Pack SDK for local use
npm pack
# Creates: gopostgrest-sdk-1.0.0.tgz

# Install in another project
npm install /path/to/gopostgrest-sdk-1.0.0.tgz

# Or publish to npm (if open-source)
npm publish
```

## Integration with SereniBase UI

### How base-ui Uses the SDK

SereniBase UI (base-ui) integrates the SDK through custom React hooks and React Query:

```typescript
// base-ui/src/hooks/useSereniBaseClient.ts
import { useMemo } from 'react';
import SereniBaseClient from 'gopostgrest-sdk';

export function useSereniBaseClient() {
  const client = useMemo(() => {
    return new SereniBaseClient({
      baseURL: import.meta.env.VITE_API_BASE_URL,
      timeout: 30000,
    });
  }, []);

  return client;
}
```

```typescript
// base-ui/src/hooks/useApi.ts
import { useQuery } from '@tanstack/react-query';
import { useSereniBaseClient } from './useSereniBaseClient';

export function useWorkspaces() {
  const client = useSereniBaseClient();

  return useQuery({
    queryKey: ['workspaces'],
    queryFn: () => client.workspace.getAll(),
  });
}

export function useTable(tableId: string) {
  const client = useSereniBaseClient();

  return useQuery({
    queryKey: ['table', tableId],
    queryFn: () => client.tableService.getById(tableId),
    enabled: !!tableId,
  });
}
```

### Authentication Flow in base-ui

```typescript
// base-ui/src/contexts/AuthContext.tsx
import { createContext, useState, useEffect } from 'react';
import { useSereniBaseClient } from '../hooks/useSereniBaseClient';

export function AuthProvider({ children }) {
  const client = useSereniBaseClient();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('auth_token'));

  useEffect(() => {
    if (token) {
      client.setAuth(token);
    }
  }, [token, client]);

  const login = async (email, password) => {
    const response = await client.auth.login({ email, password });
    setToken(response.token.access_token);
    setUser(response.user);
    localStorage.setItem('auth_token', response.token.access_token);
  };

  const logout = async () => {
    await client.auth.logout({ token });
    setToken(null);
    setUser(null);
    localStorage.removeItem('auth_token');
    client.clearAuth();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
```

### Data Fetching Pattern

```typescript
// base-ui/src/components/WorkspaceList.tsx
import { useWorkspaces } from '../hooks/useApi';

export function WorkspaceList() {
  const { data: workspaces, isLoading, error } = useWorkspaces();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      {workspaces.map((workspace) => (
        <WorkspaceCard key={workspace.id} workspace={workspace} />
      ))}
    </div>
  );
}
```

## Troubleshooting

### Common Issues

#### 1. Cannot Find Module 'gopostgrest-sdk'

**Error:**
```
Cannot find module 'gopostgrest-sdk' or its corresponding type declarations.
```

**Solution:**
```bash
# Ensure SDK is installed
cd base-ui
npm install

# If using npm link
cd base-sdk
npm link

cd base-ui
npm link gopostgrest-sdk

# Rebuild SDK if changes were made
cd base-sdk
npm run build
```

#### 2. TypeScript Type Errors

**Error:**
```
Property 'workspace' does not exist on type 'SereniBaseClient'
```

**Solution:**
```bash
# Rebuild SDK to regenerate type definitions
cd base-sdk
npm run build

# Type definitions are in dist/index.d.ts
# Ensure base-ui points to correct types in package.json:
# "types": "dist/index.d.ts"
```

#### 3. HTTP Client Timeout

**Error:**
```
Request timeout of 30000ms exceeded
```

**Solution:**
```typescript
// Increase timeout in client configuration
const client = new SereniBaseClient({
  baseURL: 'http://localhost:8080/api/v1',
  timeout: 60000,  // 60 seconds
});
```

#### 4. CORS Errors

**Error:**
```
Access to fetch at 'http://localhost:8080' blocked by CORS policy
```

**Solution:**
- Ensure SereniBase backend has CORS configured for your frontend origin
- Check ALLOWED_ORIGINS in backend .env file
- For development, add `http://localhost:5050` to allowed origins

#### 5. 401 Unauthorized After Login

**Error:**
```
401 Unauthorized on subsequent requests after successful login
```

**Solution:**
```typescript
// Ensure token is set after login
const loginResponse = await client.auth.login({ email, password });
client.setAuth(loginResponse.token.access_token);

// Verify token is being sent
client.on('request', ({ headers }) => {
  console.log('Authorization header:', headers.Authorization);
});
```

#### 6. Build Fails - TypeScript Errors

**Error:**
```
error TS2322: Type 'X' is not assignable to type 'Y'
```

**Solution:**
```bash
# Check TypeScript version compatibility
npm list typescript

# Ensure tsconfig.json is correct
npm run type-check

# Fix type errors in source files
npm run lint:fix
```

## API Documentation

### Full API Reference

Complete API documentation is available in [API_DOCUMENTATION.txt](API_DOCUMENTATION.txt) which includes:

- All endpoint URLs and HTTP methods
- Request/response TypeScript interfaces
- Required vs optional parameters
- Authentication requirements
- Example payloads

### TypeDoc Documentation

Generate comprehensive API documentation from TypeScript source:

```bash
# Generate documentation
npm run docs

# Output: docs/index.html
# Open in browser:
open docs/index.html
```

### Quick Reference

#### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/login` | Login with email/password |
| POST | `/auth/logout` | Logout and invalidate token |
| POST | `/auth/validate-token` | Validate token |
| POST | `/auth/forgot-password` | Request password reset |
| POST | `/auth/reset-password` | Reset password with token |
| POST | `/auth/otp/verify` | Verify OTP for email |
| POST | `/auth/otp/resend` | Resend OTP |

#### Workspace Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/workspace/create` | Create workspace |
| GET | `/workspace/` | Get all workspaces |
| GET | `/workspace/:id` | Get workspace by ID |
| PUT | `/workspace/:id` | Update workspace |
| DELETE | `/workspace/:id` | Delete workspace |
| GET | `/workspace/:id/bases` | Get workspace bases |
| GET | `/workspace/:id/members` | Get workspace members |

#### Table Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/table/create` | Create table |
| GET | `/table/:id` | Get table with data |
| PATCH | `/table/:id` | Update table |
| DELETE | `/table/:id` | Delete table |
| POST | `/table/import` | Import table from CSV |

## FAQ

**Q: Can I use this SDK in a non-SereniBase project?**
A: Technically yes, but it's **not recommended**. The SDK is tightly coupled to SereniBase Backend API structure and data models. For other projects, use the SereniBase REST API directly or build a custom adapter.

**Q: Why is the SDK packaged as .tgz instead of published to npm?**
A: The SDK is currently designed for internal use within the SereniBase ecosystem. If SereniBase becomes more widely adopted, it may be published to npm for easier distribution.

**Q: How do I update the SDK in base-ui after making changes?**
A: Rebuild the SDK (`npm run build`), pack it (`npm pack`), copy the .tgz file to base-ui, then reinstall dependencies in base-ui (`npm install`).

**Q: Does the SDK support WebSockets for real-time updates?**
A: No, the SDK only supports HTTP REST API. Real-time updates would need to be implemented separately using WebSocket connections to the backend.

**Q: Why TypeScript instead of JavaScript?**
A: TypeScript provides compile-time type checking, IntelliSense, and better developer experience. It prevents common errors and makes the SDK easier to use correctly.

**Q: Can I extend the SDK with custom services?**
A: Yes! You can extend the `SereniBaseClient` class or create wrapper functions around SDK methods to add custom business logic.

**Q: How do I handle authentication tokens across browser tabs?**
A: SereniBase UI uses localStorage for token persistence and localStorage events for cross-tab synchronization. The SDK provides `setAuth()` and `clearAuth()` methods for token management.

**Q: What happens if the backend API changes?**
A: The SDK will need to be updated to match backend changes. This is why the SDK is bundled with base-ui - they're released together to ensure compatibility.

**Q: How do I debug SDK HTTP requests?**
A: Use the event system:
```typescript
client.on('request', (req) => console.log('Request:', req));
client.on('response', (res) => console.log('Response:', res));
client.on('error', (err) => console.error('Error:', err));
```

## Contributing

### Contribution Guidelines

1. **Fork the repository** and create a feature branch
2. **Make changes** to SDK source files in `src/`
3. **Add tests** for new functionality in `tests/`
4. **Run tests** to ensure everything passes
5. **Build SDK** to verify no build errors
6. **Submit PR** with clear description

### Development Process

```bash
# Fork and clone
git clone https://github.com/yourusername/base-sdk.git
cd base-sdk

# Create feature branch
git checkout -b feature/new-service

# Make changes
# Add tests
# Run tests
npm test

# Build
npm run build

# Commit and push
git add .
git commit -m "Add new service for X"
git push origin feature/new-service
```

### Code Style

- Follow existing code patterns
- Use TypeScript strict mode
- Add JSDoc comments for public methods
- Write tests for new features
- Run `npm run lint:fix` before committing

## License

This project is licensed under the **MIT License**.

See [LICENSE](LICENSE) file for full license text.

---
