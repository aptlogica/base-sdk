# serenibase-sdk - TypeScript SDK for SereniBase UI

> Official TypeScript SDK for SereniBase Backend integration. **Exclusively designed for SereniBase UI (base-ui)** - provides type-safe API communication, authentication management, and comprehensive service layer for workspace, base, table, and data operations.

[![Version](https://img.shields.io/badge/Version-1.0.0-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Quality Gate Status](https://sonar.aptlogica.com/api/project_badges/quality_gate?project=aptlogica_base-sdk_831f5ed1-22c6-4f6b-830a-bf0629564fb1&token=sqb_5d01b701b8091514f115d0f522a40ee687fd6809)](https://sonar.aptlogica.com/dashboard?id=aptlogica_base-sdk_831f5ed1-22c6-4f6b-830a-bf0629564fb1)

## Overview

**serenibase-sdk** is the official TypeScript SDK for communicating with the SereniBase Backend API. It provides a comprehensive, type-safe interface for all backend operations including authentication, workspace management, database operations, and data manipulation.

## Features

- **Type-safe API client for SereniBase**
- **Authentication and session management**
- **Workspace, base, table, and data operations**
- **Error handling and event system**
- **Designed for use with SereniBase UI**

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

## Usage

```ts
import { SereniBaseClient } from 'serenibase-sdk';
const client = new SereniBaseClient({ apiUrl: 'https://api.serenibase.com' });
// ...
```

## Development

- **Clone the repo and run `npm install`**
- **Use `npm run dev` for local development**

## Testing

- **Run `npm test` to execute unit tests**

## Security

See [SECURITY.md](SECURITY.md) for reporting vulnerabilities.

## License

MIT License. Copyright (c) 2026 Aptlogica Technologies.
