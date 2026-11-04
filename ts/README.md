# Coworkingview TypeScript SDK



The TypeScript SDK for the Coworkingview API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Config()` — each with a small set of operations (`list`, `load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/coworkingview-sdk/tags)), or from a
clone, which carries the compiled `dist/`:

```bash
git clone https://github.com/voxgig-sdk/coworkingview-sdk
npm install ./coworkingview-sdk/ts
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { CoworkingviewSDK } from '@voxgig-sdk/coworkingview-sdk'

const client = new CoworkingviewSDK()
```

### 3. Load a config

`load()` returns the entity and throws on failure; `.data()` reads its record:

```ts
try {
  const config = await client.Config().load()
  console.log(config.data())
} catch (err) {
  console.error('load failed:', err)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const facet = await client.Facet().load({ locale: "example" })
  console.log(facet.data())
} catch (err) {
  console.error('load failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
result envelope. Branch on `ok`; on failure `status` holds the HTTP status
(for error responses) and `err` holds the error:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (!result.ok) {
  console.error('request failed:', result.status, result.err)
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = CoworkingviewSDK.test()

const facet = await client.Facet().load({ locale: 'example_locale' })
// facet is the Facet entity; .data() reads its mock record
console.log(facet.data())
```

You can also use the instance method:

```ts
const client = new CoworkingviewSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Facet()

// First call runs the operation and stores its result
await entity.load({ locale: 'example_locale' })

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new CoworkingviewSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
COWORKINGVIEW_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```

Live entity tests continue independent operations after errors and attempt
supported cleanup. Their final result reports failures and missing prerequisites
after the remaining work completes. The model and test inputs determine which
API operations the generated scenarios cover.


## Reference

### CoworkingviewSDK

#### Constructor

```ts
new CoworkingviewSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Config(data?)` | `ConfigEntity` | Create a Config entity instance. |
| `Facet(data?)` | `FacetEntity` | Create a Facet entity instance. |
| `Geo(data?)` | `GeoEntity` | Create a Geo entity instance. |
| `Health(data?)` | `HealthEntity` | Create a Health entity instance. |
| `Market(data?)` | `MarketEntity` | Create a Market entity instance. |
| `Operator(data?)` | `OperatorEntity` | Create an Operator entity instance. |
| `Place(data?)` | `PlaceEntity` | Create a Place entity instance. |
| `Property(data?)` | `PropertyEntity` | Create a Property entity instance. |
| `Search(data?)` | `SearchEntity` | Create a Search entity instance. |
| `tester(testopts?, sdkopts?)` | `CoworkingviewSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `CoworkingviewSDK.test(testopts?, sdkopts?)` | `CoworkingviewSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria, and return it. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria, one per record. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): CoworkingviewSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity itself — there is no result
envelope, and an entity's `data()` reads its record:

- `load` resolves to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Config

| Field | Description |
| --- | --- |
| `flags` |  |
| `message` |  |
| `minSupportedBuild` |  |
| `recommendedBuild` |  |

Operations: load.

API path: `/v1/config`

#### Facet

| Field | Description |
| --- | --- |
| `capacityRange` |  |
| `facets` |  |
| `priceRange` |  |

Operations: load.

API path: `/v1/facets`

#### Geo

| Field | Description |
| --- | --- |

Operations: load.

API path: `/v1/geo/bootstrap`

#### Health

| Field | Description |
| --- | --- |
| `sha` |  |
| `status` |  |

Operations: load.

API path: `/v1/health`

#### Market

| Field | Description |
| --- | --- |

Operations: load.

API path: `/v1/market/rates`

#### Operator

| Field | Description |
| --- | --- |
| `asOf` |  |
| `cities` |  |
| `description` |  |
| `faqs` |  |
| `indexabilityBrand` |  |
| `logo` |  |
| `name` |  |
| `pricePosition` |  |
| `propertyCount` |  |
| `slug` |  |
| `tagline` |  |

Operations: load.

API path: `/v1/operators/{slug}`

#### Place

| Field | Description |
| --- | --- |
| `asOf` |  |
| `center` |  |
| `faqs` |  |
| `id` |  |
| `intro` |  |
| `kind` |  |
| `name` |  |
| `parent` |  |
| `priceRange` |  |
| `propertyCount` |  |
| `shortDescription` |  |
| `slug` |  |

Operations: load.

API path: `/v1/places/{kind}/{slug}`

#### Property

| Field | Description |
| --- | --- |
| `address` |  |
| `amenities` |  |
| `capacity` |  |
| `capacity_status` |  |
| `city` |  |
| `coordinates` |  |
| `countryCode` |  |
| `description` |  |
| `distanceMeters` |  |
| `excerpt` |  |
| `featured` |  |
| `fromBillingPeriod` |  |
| `fromPrice` |  |
| `images` |  |
| `indexabilityCompleteness` |  |
| `indexabilityState` |  |
| `marketPosition` |  |
| `operator` |  |
| `pricingOptions` |  |
| `slug` |  |
| `title` |  |
| `updatedAt` | When the underlying CMS record was last updated. |
| `webUrl` |  |
| `zone` |  |

Operations: list, load.

API path: `/v1/properties`

#### Search

| Field | Description |
| --- | --- |

Operations: list.

API path: `/v1/search/suggest`



## Entities


### Config

Create an instance: `const config = client.Config()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `flags` | `Record<string, any>` |  |
| `message` | `Record<string, any>` |  |
| `minSupportedBuild` | `number` |  |
| `recommendedBuild` | `number` |  |

#### Example: Load

```ts
const config = await client.Config().load()
```


### Facet

Create an instance: `const facet = client.Facet()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `capacityRange` | `Record<string, any>` |  |
| `facets` | `any[]` |  |
| `priceRange` | `Record<string, any>` |  |

#### Example: Load

```ts
const facet = await client.Facet().load({ locale: 'locale' })
```


### Geo

Create an instance: `const geo = client.Geo()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const geo = await client.Geo().load({ locale: 'locale' })
```


### Health

Create an instance: `const health = client.Health()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `sha` | `string` |  |
| `status` | `string` |  |

#### Example: Load

```ts
const health = await client.Health().load()
```


### Market

Create an instance: `const market = client.Market()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const market = await client.Market().load({ locale: 'locale' })
```


### Operator

Create an instance: `const operator = client.Operator()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `asOf` | `string` |  |
| `cities` | `any[]` |  |
| `description` | `string` |  |
| `faqs` | `any[]` |  |
| `indexabilityBrand` | `any` |  |
| `logo` | `Record<string, any>` |  |
| `name` | `string` |  |
| `pricePosition` | `Record<string, any>` |  |
| `propertyCount` | `number` |  |
| `slug` | `string` |  |
| `tagline` | `string` |  |

#### Example: Load

```ts
const operator = await client.Operator().load({ id: 'operator_id', locale: 'locale' })
```


### Place

Create an instance: `const place = client.Place()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `asOf` | `string` |  |
| `center` | `Record<string, any>` |  |
| `faqs` | `any[]` |  |
| `id` | `string` |  |
| `intro` | `string` |  |
| `kind` | `string` |  |
| `name` | `string` |  |
| `parent` | `Record<string, any>` |  |
| `priceRange` | `Record<string, any>` |  |
| `propertyCount` | `number` |  |
| `shortDescription` | `string` |  |
| `slug` | `string` |  |

#### Example: Load

```ts
const place = await client.Place().load({ kind: 'kind', slug: 'slug', locale: 'locale' })
```


### Property

Create an instance: `const property = client.Property()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `string` |  |
| `amenities` | `any[]` |  |
| `capacity` | `number` |  |
| `capacity_status` | `string` |  |
| `city` | `Record<string, any>` |  |
| `coordinates` | `Record<string, any>` |  |
| `countryCode` | `string` |  |
| `description` | `string` |  |
| `distanceMeters` | `number` |  |
| `excerpt` | `string` |  |
| `featured` | `boolean` |  |
| `fromBillingPeriod` | `string` |  |
| `fromPrice` | `Record<string, any>` |  |
| `images` | `any[]` |  |
| `indexabilityCompleteness` | `any` |  |
| `indexabilityState` | `any` |  |
| `marketPosition` | `Record<string, any>` |  |
| `operator` | `Record<string, any>` |  |
| `pricingOptions` | `any[]` |  |
| `slug` | `string` |  |
| `title` | `string` |  |
| `updatedAt` | `string` | When the underlying CMS record was last updated. |
| `webUrl` | `string` |  |
| `zone` | `Record<string, any>` |  |

#### Example: Load

```ts
const property = await client.Property().load({ id: 'property_id', locale: 'locale' })
```

#### Example: List

```ts
const propertys = await client.Property().list({ locale: "example" })
```


### Search

Create an instance: `const search = client.Search()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```ts
const searchs = await client.Search().list({ locale: "example", q: "example" })
```

## Features

This SDK ships 4 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`ratelimit`](#ratelimit) | Rate limiting |
| [`retry`](#retry) | Retry |
| [`test`](#test) | Test transport |
| [`timeout`](#timeout) | Timeout |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### ratelimit

Rate limiting.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Retry.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Timeout.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
coworkingview/
├── src/
│   ├── CoworkingviewSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { CoworkingviewSDK } from '@voxgig-sdk/coworkingview-sdk'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const facet = client.Facet()
await facet.load({ locale: "example" })

// facet.data() now returns the facet data from the last `load`
// facet.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
