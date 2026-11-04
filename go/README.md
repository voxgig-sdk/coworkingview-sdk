# Coworkingview Golang SDK



The Golang SDK for the Coworkingview API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Config(nil)` — each with the same small set of operations (`List`, `Load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/coworkingview-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Tags](https://github.com/voxgig-sdk/coworkingview-sdk/tags) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/coworkingview-sdk/go=../coworkingview-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the entity, and for
`List` a `[]any` of entities, one per record (there is no `{ok, data}`
wrapper), so check `err` and read a record through the entity's
`Data()`.

```go
package main

import (
    "fmt"
    sdk "github.com/voxgig-sdk/coworkingview-sdk/go"
)

func main() {
    client := sdk.New()

    // Load a single config — the value is the entity; Data() reads its record.
    config, err := client.Config(nil).Load(nil, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(config.(sdk.Entity).Data())
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
facet, err := client.Facet(nil).Load(map[string]any{"locale": "example"}, nil)
if err != nil {
    // handle err
    return
}
_ = facet
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

facet, err := client.Facet(nil).Load(
    map[string]any{"locale": "example"}, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(facet.(sdk.Entity).Data()) // the entity's mock record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewCoworkingviewSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
COWORKINGVIEW_TEST_LIVE=TRUE
```

Then run:

```bash
cd go && go test ./test/...
```


## Reference

### NewCoworkingviewSDK

```go
func NewCoworkingviewSDK(options map[string]any) *CoworkingviewSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *CoworkingviewSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### CoworkingviewSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Config` | `(data map[string]any) CoworkingviewEntityBase` | Create a Config entity instance. |
| `Facet` | `(data map[string]any) CoworkingviewEntityBase` | Create a Facet entity instance. |
| `Geo` | `(data map[string]any) CoworkingviewEntityBase` | Create a Geo entity instance. |
| `Health` | `(data map[string]any) CoworkingviewEntityBase` | Create a Health entity instance. |
| `Market` | `(data map[string]any) CoworkingviewEntityBase` | Create a Market entity instance. |
| `Operator` | `(data map[string]any) CoworkingviewEntityBase` | Create an Operator entity instance. |
| `Place` | `(data map[string]any) CoworkingviewEntityBase` | Create a Place entity instance. |
| `Property` | `(data map[string]any) CoworkingviewEntityBase` | Create a Property entity instance. |
| `Search` | `(data map[string]any) CoworkingviewEntityBase` | Create a Search entity instance. |

### Entity interface (CoworkingviewEntityBase)

All entities implement the `CoworkingviewEntityBase` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria, and return it. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria, one per record. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the entity
itself — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` | the entity, whose `Data()` reads its record (`map[string]any`) |
| `List` | a `[]any` of entities, one per record |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    config, err := client.Config(nil).Load(nil, nil)
    if err != nil { /* handle */ }
    // config is the entity; config.(sdk.Entity).Data() reads its record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Config

| Field | Description |
| --- | --- |
| `"flags"` |  |
| `"message"` |  |
| `"minSupportedBuild"` |  |
| `"recommendedBuild"` |  |

Operations: Load.

API path: `/v1/config`

#### Facet

| Field | Description |
| --- | --- |
| `"capacityRange"` |  |
| `"facets"` |  |
| `"priceRange"` |  |

Operations: Load.

API path: `/v1/facets`

#### Geo

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/v1/geo/bootstrap`

#### Health

| Field | Description |
| --- | --- |
| `"sha"` |  |
| `"status"` |  |

Operations: Load.

API path: `/v1/health`

#### Market

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/v1/market/rates`

#### Operator

| Field | Description |
| --- | --- |
| `"asOf"` |  |
| `"cities"` |  |
| `"description"` |  |
| `"faqs"` |  |
| `"indexabilityBrand"` |  |
| `"logo"` |  |
| `"name"` |  |
| `"pricePosition"` |  |
| `"propertyCount"` |  |
| `"slug"` |  |
| `"tagline"` |  |

Operations: Load.

API path: `/v1/operators/{slug}`

#### Place

| Field | Description |
| --- | --- |
| `"asOf"` |  |
| `"center"` |  |
| `"faqs"` |  |
| `"id"` |  |
| `"intro"` |  |
| `"kind"` |  |
| `"name"` |  |
| `"parent"` |  |
| `"priceRange"` |  |
| `"propertyCount"` |  |
| `"shortDescription"` |  |
| `"slug"` |  |

Operations: Load.

API path: `/v1/places/{kind}/{slug}`

#### Property

| Field | Description |
| --- | --- |
| `"address"` |  |
| `"amenities"` |  |
| `"capacity"` |  |
| `"capacity_status"` |  |
| `"city"` |  |
| `"coordinates"` |  |
| `"countryCode"` |  |
| `"description"` |  |
| `"distanceMeters"` |  |
| `"excerpt"` |  |
| `"featured"` |  |
| `"fromBillingPeriod"` |  |
| `"fromPrice"` |  |
| `"images"` |  |
| `"indexabilityCompleteness"` |  |
| `"indexabilityState"` |  |
| `"marketPosition"` |  |
| `"operator"` |  |
| `"pricingOptions"` |  |
| `"slug"` |  |
| `"title"` |  |
| `"updatedAt"` | When the underlying CMS record was last updated. |
| `"webUrl"` |  |
| `"zone"` |  |

Operations: List, Load.

API path: `/v1/properties`

#### Search

| Field | Description |
| --- | --- |

Operations: List.

API path: `/v1/search/suggest`



## Entities


### Config

Create an instance: `config := client.Config(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `flags` | `map[string]any` |  |
| `message` | `map[string]any` |  |
| `minSupportedBuild` | `int` |  |
| `recommendedBuild` | `int` |  |

#### Example: Load

```go
config, err := client.Config(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(config.(sdk.Entity).Data()) // the loaded entity's record
```


### Facet

Create an instance: `facet := client.Facet(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `capacityRange` | `map[string]any` |  |
| `facets` | `[]any` |  |
| `priceRange` | `map[string]any` |  |

#### Example: Load

```go
facet, err := client.Facet(nil).Load(map[string]any{"locale": "locale"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(facet.(sdk.Entity).Data()) // the loaded entity's record
```


### Geo

Create an instance: `geo := client.Geo(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
geo, err := client.Geo(nil).Load(map[string]any{"locale": "locale"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(geo.(sdk.Entity).Data()) // the loaded entity's record
```


### Health

Create an instance: `health := client.Health(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `sha` | `string` |  |
| `status` | `string` |  |

#### Example: Load

```go
health, err := client.Health(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(health.(sdk.Entity).Data()) // the loaded entity's record
```


### Market

Create an instance: `market := client.Market(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
market, err := client.Market(nil).Load(map[string]any{"locale": "locale"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(market.(sdk.Entity).Data()) // the loaded entity's record
```


### Operator

Create an instance: `operator := client.Operator(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `asOf` | `string` |  |
| `cities` | `[]any` |  |
| `description` | `string` |  |
| `faqs` | `[]any` |  |
| `indexabilityBrand` | `any` |  |
| `logo` | `map[string]any` |  |
| `name` | `string` |  |
| `pricePosition` | `map[string]any` |  |
| `propertyCount` | `int` |  |
| `slug` | `string` |  |
| `tagline` | `string` |  |

#### Example: Load

```go
operator, err := client.Operator(nil).Load(map[string]any{"id": "operator_id", "locale": "locale"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(operator.(sdk.Entity).Data()) // the loaded entity's record
```


### Place

Create an instance: `place := client.Place(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `asOf` | `string` |  |
| `center` | `map[string]any` |  |
| `faqs` | `[]any` |  |
| `id` | `string` |  |
| `intro` | `string` |  |
| `kind` | `string` |  |
| `name` | `string` |  |
| `parent` | `map[string]any` |  |
| `priceRange` | `map[string]any` |  |
| `propertyCount` | `int` |  |
| `shortDescription` | `string` |  |
| `slug` | `string` |  |

#### Example: Load

```go
place, err := client.Place(nil).Load(map[string]any{"kind": "kind", "slug": "slug", "locale": "locale"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(place.(sdk.Entity).Data()) // the loaded entity's record
```


### Property

Create an instance: `property := client.Property(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `string` |  |
| `amenities` | `[]any` |  |
| `capacity` | `int` |  |
| `capacity_status` | `string` |  |
| `city` | `map[string]any` |  |
| `coordinates` | `map[string]any` |  |
| `countryCode` | `string` |  |
| `description` | `string` |  |
| `distanceMeters` | `float64` |  |
| `excerpt` | `string` |  |
| `featured` | `bool` |  |
| `fromBillingPeriod` | `string` |  |
| `fromPrice` | `map[string]any` |  |
| `images` | `[]any` |  |
| `indexabilityCompleteness` | `any` |  |
| `indexabilityState` | `any` |  |
| `marketPosition` | `map[string]any` |  |
| `operator` | `map[string]any` |  |
| `pricingOptions` | `[]any` |  |
| `slug` | `string` |  |
| `title` | `string` |  |
| `updatedAt` | `string` | When the underlying CMS record was last updated. |
| `webUrl` | `string` |  |
| `zone` | `map[string]any` |  |

#### Example: Load

```go
property, err := client.Property(nil).Load(map[string]any{"id": "property_id", "locale": "locale"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(property.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
propertys, err := client.Property(nil).List(map[string]any{"locale": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range propertys.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Search

Create an instance: `search := client.Search(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Example: List

```go
searchs, err := client.Search(nil).List(map[string]any{"locale": "example", "q": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range searchs.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

An operation returns the entity, and its `Data()` returns the record. Use
`core.ToMapAny()` to safely cast that record, or data nested in it, to
`map[string]any`: it returns `nil` for anything else, an entity included.

### Package structure

```
github.com/voxgig-sdk/coworkingview-sdk/go/
├── coworkingview.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/coworkingview-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
facet := client.Facet(nil)
facet.Load(map[string]any{"locale": "example"}, nil)

// facet.Data() now returns the facet data from the last load
// facet.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
