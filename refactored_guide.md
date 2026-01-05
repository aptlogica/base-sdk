# Refactor Guidance

This document collects the architectural concerns uncovered during the review and outlines refactor steps so the SDK is both resilient and Node-friendly.

## Critical Fixes
- Replace browser-only helpers in the HTTP client and services with Node-safe alternatives.
  - Encode Basic auth credentials with `Buffer.from(...).toString('base64')` instead of `btoa` so the client works in any Node runtime.
  - Treat `File`, `FormData`, and `ProgressEvent` as platform-dependent; either inject polyfills for Node or provide wrappers that throw descriptive errors when the user runs in a pure backend context.
- Ensure every service that builds multipart or query requests explicitly guards against missing IDs (e.g., include `workspace_id` when transforming `InviteMultipleUsers` into `BulkAddMembersRequest`).

## Anti-Pattern Cleanup
- Audit the DTOs (especially `StandardResponse`, `UpdateTable.meta`, `AddColumn.meta`) and replace `any` with precise generics or `unknown` with runtime validation to preserve TypeScript guarantees.
- Avoid mutating the shared `ClientConfig` by using helper methods that return new config objects and call `this.client.defaults.headers` instead of recreating the Axios instance on every header/auth update.
- Use Axios `params` instead of manual string concatenation so query escaping is consistent and you avoid injection-like bugs.

## Security & Robustness Improvements
- Surface structured logging or hooks in the HTTP error formatter so consumers can plug into failures instead of relying on `console.warn`.
- Provide rate-limiting/backoff helpers beyond retries (e.g., aborting when a queue grows) so retries don't amplify load during outages.

## Suggested Steps
1. Introduce a `platform` abstraction for uploads (e.g., `FormDataBuilder`) that behaves differently in browser vs Node and is unit-tested for both environments.
2. Expand the type definitions by removing `any`/`meta: any` and expressing optional metadata with explicit interfaces plus helper validators.
3. Refactor `HttpClient.setAuthToken`, `setHeaders`, and `updateConfig` to mutate `this.client.defaults` (or use Axios interceptors) instead of rebuilding the Axios instance; add tests verifying header propagation.
4. Verify `WorkspaceService.inviteUser` composes valid payloads by writing targeted unit tests that assert `workspace_id` and base memberships are present.

Documented by: GitHub Copilot (GPT-5.1-Codex-Mini Preview)
