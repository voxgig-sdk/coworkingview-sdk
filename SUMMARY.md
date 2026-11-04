# CoworkingView API

Read API for the CoworkingView catalogue plus the lead write path. Within a major version this contract is APPEND-ONLY: fields are added, never removed or retyped, because clients include mobile builds that cannot be recalled. Exception recorded 21 Oct 2026: `meta.citation.license` and `meta.citation.licenseUrl` were removed. Exception recorded 21 Oct 2026: property cards, property detail, map rows and ranked[] do not carry a third-party score, a third-party review count, or an external-ratings object. Google Maps Platform terms forbid caching those Places figures and serving them here. A legacy rating order is deprecated: it is still accepted and ordered as the default, and it is omitted from this document. A breaking change means /v2, with /v1 kept alive for at least two app releases. No API key: every endpoint is public, which the root `security: []` states explicitly. Catalogue content (descriptions, images, logos, names and prices) belongs to the respective operators and rights holders. No licence to reuse it is granted. You may link to listing pages. Systematic extraction or re-use of the catalogue database is not permitted. Catalogue responses carry that statement on `meta.catalogueNotice`, separate from `meta.citation` (source, canonical page and a one-line credit). Market rates do not carry it. The two POST /v1/leads/* operations are NOT reads: each one creates a real enquiry that is sent to the CoworkingView team and forwarded to space operators. Adjusted on 2026-10-23 after live checks: locale is required (en|de|es); examples use real slugs; removed POST /v1/leads/contact; removed POST /v1/leads/inquiry; removed /v1/rankings (410 Gone).

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 9 entities and 11 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Config

Results: Success.

SDK operations: `load`.

### Facet

Results: Success.

SDK operations: `load`.

### Geo

Results: Success.

SDK operations: `load`.

### Health

Results: Success.

SDK operations: `load`.

### Market

Results: Success.

SDK operations: `load`.

### Operator

Results: Success.

SDK operations: `load`.

### Place

Results: Success.

SDK operations: `load`.

### Property

Results: Success.

SDK operations: `list`, `load`.

Key fields to recognise:

- `updatedAt`: When the underlying CMS record was last updated. Use as a price-freshness signal; absent for rows with no tracked update time.

### Search

Results: Success.

SDK operations: `list`.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Config | `load` | `GET /v1/config` | Not required |
| Facet | `load` | `GET /v1/facets` | Not required |
| Geo | `load` | `GET /v1/geo/bootstrap` | Not required |
| Health | `load` | `GET /v1/health` | Not required |
| Market | `load` | `GET /v1/market/rates` | Not required |
| Operator | `load` | `GET /v1/operators/{slug}` | Not required |
| Place | `load` | `GET /v1/places/{kind}/{slug}` | Not required |
| Property | `list` | `GET /v1/properties` | Not required |
| Property | `list` | `GET /v1/properties/map` | Not required |
| Property | `load` | `GET /v1/properties/{slug}` | Not required |
| Search | `list` | `GET /v1/search/suggest` | Not required |

## Connect to the API

- Production: `https://api.coworkingview.com`

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

A read request without required parameters or authentication is `GET /v1/config`. For example:

```sh
curl --fail-with-body --silent --show-error 'https://api.coworkingview.com/v1/config'
```

Inspect the response using the Config reference. This checks the public route; authenticated operations need their own credentials and request data.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `coworkingview_list`: List records for an entity. Supported entities: `property`, `search`.
- `coworkingview_load`: Load one record for an entity. Supported entities: `config`, `facet`, `geo`, `health`, `market`, `operator`, `place`, `property`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

