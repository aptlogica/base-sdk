# API Documentation

Full API documentation is auto-generated using [TypeDoc](https://typedoc.org/). To generate and view docs locally:

```bash
npm run docs
open docs/index.html
```

Inline code is documented with JSDoc comments for clarity and IDE support.
# Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines, and use the provided issue and pull request templates. All contributors must follow our [Code of Conduct](CODE_OF_CONDUCT.md).
# serenibase-sdk - TypeScript SDK for SereniBase UI

> Enterprise-grade TypeScript SDK and open source backend SDK for SereniBase platform integration. A comprehensive developer toolkit and API integration SDK providing type-safe API communication, authentication management, and complete service layer for workspace, database, and data operations.

[![Version](https://img.shields.io/badge/Version-1.0.0-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Faptlogica%2Fbase-sdk.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Faptlogica%2Fbase-sdk?ref=badge_shield)

[![CI](https://github.com/aptlogica/base-sdk/actions/workflows/ci.yml/badge.svg)](https://github.com/aptlogica/base-sdk/actions/workflows/ci.yml)
[![Coverage](https://codecov.io/gh/aptlogica/base-sdk/branch/main/graph/badge.svg)](https://codecov.io/gh/aptlogica/base-sdk)

## Overview

**Base SDK** is an open-source SDK for backend integration that helps developers easily connect APIs, manage services, and build scalable applications faster. It’s designed to reduce complexity and improve development efficiency. Whether you're looking to build apps with SDK integrations, connect multiple APIs, or create scalable backend workflows, Sereni Base SDK provides a reliable foundation for modern development.

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
  baseURL: 'https://api.serenibase.com',
  auth: {
    type: 'bearer',
    token: 'your-api-token'
  }
});

// Authenticate user
const authResult = await client.auth.login({
  email: 'user@example.com',
  password: 'secure-password'
});

// Create a new workspace
const workspace = await client.workspace.create({
  name: 'My Project',
  description: 'Project workspace'
});

// Create a base within the workspace
const base = await client.baseService.create({
  title: 'Customer Database',
  description: 'Customer management system',
  workspace_id: workspace.id
});

// Add a table to the base
const table = await client.tableService.create(base.id, {
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
SERENIBASE_BASE_URL=http://localhost:8080
SERENIBASE_API_TOKEN=replace-me
SERENIBASE_TIMEOUT_MS=30000
```

### Testing
```bash
# Run unit tests
npm test

# Run tests with coverage
npm run test:coverage

# View coverage report
open coverage/lcov-report/index.html

# Run integration tests
npm run test:integration
```

## Security

See [SECURITY.md](SECURITY.md) for reporting vulnerabilities.

## License

MIT License. Copyright (c) 2026 Aptlogica Technologies.


[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Faptlogica%2Fbase-sdk.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Faptlogica%2Fbase-sdk?ref=badge_large)