# serenibase-sdk - TypeScript SDK for SereniBase UI

> Enterprise-grade TypeScript SDK and open source backend SDK for SereniBase platform integration. A comprehensive developer toolkit and API integration SDK providing type-safe API communication, authentication management, and complete service layer for workspace, database, and data operations.

[![Version](https://img.shields.io/badge/Version-1.0.0-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Quality Gate Status](https://sonar.aptlogica.com/api/project_badges/quality_gate?project=aptlogica_base-sdk_831f5ed1-22c6-4f6b-830a-bf0629564fb1&token=sqb_5d01b701b8091514f115d0f522a40ee687fd6809)](https://sonar.aptlogica.com/dashboard?id=aptlogica_base-sdk_831f5ed1-22c6-4f6b-830a-bf0629564fb1)

## Overview

**serenibase-sdk** is the official TypeScript SDK and developer SDK providing a comprehensive, enterprise-grade interface for SereniBase Backend API integration. This professionally maintained API SDK and backend integration SDK offers type-safe API communication via TypeScript API client, robust authentication management, and complete backend operation capabilities as an open source sdk, a typescript backend toolkit, a nodejs sdk, a developer api toolkit, and a typescript developer toolkit. A complete Node.js SDK and developer tools SDK for backend services.

## Key Features

- **Type-Safe API Client**: Full TypeScript support with comprehensive type definitions
- **Authentication Management**: Secure session handling with automatic token refresh
- **Database Operations**: Complete CRUD operations for workspaces, bases, tables, and records
- **Error Handling**: Comprehensive error management with detailed error types
- **Event System**: Real-time event handling for collaborative features
- **Optimized for Production**: Built specifically for SereniBase UI integration

## Architecture

- **Modern TypeScript codebase**
- **Axios-based HTTP client**
- **Event-driven extensibility**

## Installation

```sh
npm install serenibase-sdk
```

## Configuration

See `.env.example` for environment variables and configuration options.

## Quick Start

```typescript
import { SereniBaseClient } from 'serenibase-sdk';

// Initialize client
const client = new SereniBaseClient({
  apiUrl: 'https://api.serenibase.com',
  apiKey: 'your-api-key'
});

// Authenticate user
const authResult = await client.auth.login({
  email: 'user@example.com',
  password: 'secure-password'
});

// Create a new workspace
const workspace = await client.workspaces.create({
  name: 'My Project',
  description: 'Project workspace'
});

// Create a base within the workspace
const base = await client.bases.create(workspace.id, {
  name: 'Customer Database',
  description: 'Customer management system'
});

// Add a table to the base
const table = await client.tables.create(base.id, {
  name: 'customers',
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'created_at', type: 'datetime', defaultValue: 'now()' }
  ]
});

console.log('Setup complete:', { workspace, base, table });
```

## Development

### Local Setup
```bash
# Clone the repository
git clone https://github.com/aptlogica/base-sdk.git
cd base-sdk

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Configure API endpoints and keys

# Run in development mode
npm run dev

# Build for production
npm run build
```

### Environment Configuration
```bash
VITE_API_URL=http://localhost:8080
VITE_WS_URL=ws://localhost:8080/ws
VITE_API_VERSION=v1
```

### Testing
```bash
# Run unit tests
npm test

# Run tests with coverage
npm run test:coverage

# Run integration tests
npm run test:integration
```

## Security

See [SECURITY.md](SECURITY.md) for reporting vulnerabilities.

## License

MIT License. Copyright (c) 2026 Aptlogica Technologies.
