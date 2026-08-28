# MunicipalFinance Golang SDK



The Golang SDK for the MunicipalFinance API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.AgedCreditor(nil)` — each with the same small set of operations (`List`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/municipal-finance-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/municipal-finance-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/municipal-finance-sdk/go=../municipal-finance-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    sdk "github.com/voxgig-sdk/municipal-finance-sdk/go"
)

func main() {
    client := sdk.New()

    // List agedCreditor records — the value is the array of records itself.
    agedCreditors, err := client.AgedCreditor(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range agedCreditors.([]any) {
        fmt.Println(item)
    }
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
ageddebtors, err := client.AgedDebtor(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = ageddebtors
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

agedDebtor, err := client.AgedDebtor(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(agedDebtor) // the returned mock data
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

client := sdk.NewMunicipalFinanceSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
MUNICIPAL_FINANCE_TEST_LIVE=TRUE
```

Then run:

```bash
cd go && go test ./test/...
```


## Reference

### NewMunicipalFinanceSDK

```go
func NewMunicipalFinanceSDK(options map[string]any) *MunicipalFinanceSDK
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
func TestSDK(testopts map[string]any, sdkopts map[string]any) *MunicipalFinanceSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### MunicipalFinanceSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `AgedCreditor` | `(data map[string]any) MunicipalFinanceEntity` | Create an AgedCreditor entity instance. |
| `AgedDebtor` | `(data map[string]any) MunicipalFinanceEntity` | Create an AgedDebtor entity instance. |
| `Fact` | `(data map[string]any) MunicipalFinanceEntity` | Create a Fact entity instance. |

### Entity interface (MunicipalFinanceEntity)

All entities implement the `MunicipalFinanceEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    agedCreditor, err := client.AgedCreditor(nil).List(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // agedCreditor is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### AgedCreditor

| Field | Description |
| --- | --- |
| `"amount_sum"` | Sum of the amount |
| `"amount_type_code"` | Amount type code |
| `"amount_type_label"` | Amount type label |
| `"demarcation_code"` | Municipality demarcation code |
| `"demarcation_label"` | Municipality name |
| `"financial_period_period"` | Financial period number |
| `"financial_year_end_year"` | Financial year end |
| `"item_code"` | Item code |
| `"item_composition"` | Item composition formula |
| `"item_label"` | Item label |
| `"item_position_in_return_form"` | Position in return form |
| `"item_return_form_structure"` | Return form structure |
| `"period_length_length"` | Period length |

Operations: List.

API path: `/cubes/aged_creditor/facts`

#### AgedDebtor

| Field | Description |
| --- | --- |
| `"amount_sum"` | Sum of the amount |
| `"amount_type_code"` | Amount type code |
| `"amount_type_label"` | Amount type label |
| `"customer_group_code"` | Customer group code |
| `"demarcation_code"` | Municipality demarcation code |
| `"demarcation_label"` | Municipality name |
| `"financial_period_period"` | Financial period number |
| `"financial_year_end_year"` | Financial year end |
| `"item_code"` | Item code |
| `"item_composition"` | Item composition formula |
| `"item_label"` | Item label |
| `"item_position_in_return_form"` | Position in return form |
| `"item_return_form_structure"` | Return form structure |
| `"period_length_length"` | Period length |

Operations: List.

API path: `/cubes/aged_debtor/facts`

#### Fact

| Field | Description |
| --- | --- |
| `"cells"` |  |
| `"summary"` |  |
| `"total_cell_count"` | Total number of cells in the result |

Operations: List.

API path: `/cubes/audit_opinions/facts`



## Entities


### AgedCreditor

Create an instance: `agedCreditor := client.AgedCreditor(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount_sum` | `float64` | Sum of the amount |
| `amount_type_code` | `string` | Amount type code |
| `amount_type_label` | `string` | Amount type label |
| `demarcation_code` | `string` | Municipality demarcation code |
| `demarcation_label` | `string` | Municipality name |
| `financial_period_period` | `int` | Financial period number |
| `financial_year_end_year` | `int` | Financial year end |
| `item_code` | `string` | Item code |
| `item_composition` | `string` | Item composition formula |
| `item_label` | `string` | Item label |
| `item_position_in_return_form` | `int` | Position in return form |
| `item_return_form_structure` | `string` | Return form structure |
| `period_length_length` | `string` | Period length |

#### Example: List

```go
agedCreditors, err := client.AgedCreditor(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(agedCreditors) // the array of records
```


### AgedDebtor

Create an instance: `agedDebtor := client.AgedDebtor(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount_sum` | `float64` | Sum of the amount |
| `amount_type_code` | `string` | Amount type code |
| `amount_type_label` | `string` | Amount type label |
| `customer_group_code` | `string` | Customer group code |
| `demarcation_code` | `string` | Municipality demarcation code |
| `demarcation_label` | `string` | Municipality name |
| `financial_period_period` | `int` | Financial period number |
| `financial_year_end_year` | `int` | Financial year end |
| `item_code` | `string` | Item code |
| `item_composition` | `string` | Item composition formula |
| `item_label` | `string` | Item label |
| `item_position_in_return_form` | `int` | Position in return form |
| `item_return_form_structure` | `string` | Return form structure |
| `period_length_length` | `string` | Period length |

#### Example: List

```go
agedDebtors, err := client.AgedDebtor(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(agedDebtors) // the array of records
```


### Fact

Create an instance: `fact := client.Fact(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cells` | `[]any` |  |
| `summary` | `map[string]any` |  |
| `total_cell_count` | `int` | Total number of cells in the result |

#### Example: List

```go
facts, err := client.Fact(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(facts) // the array of records
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | In-memory mock transport for testing without a live server |

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


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

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/municipal-finance-sdk/go/
├── municipal-finance.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/municipal-finance-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
ageddebtor := client.AgedDebtor(nil)
ageddebtor.List(nil, nil)

// ageddebtor.Data() now returns the ageddebtor data from the last list
// ageddebtor.Match() returns the last match criteria
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
