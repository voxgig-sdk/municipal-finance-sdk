# MunicipalFinance PHP SDK



The PHP SDK for the MunicipalFinance API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->AgedCreditor()` — with named operations (`list`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/municipal-finance-sdk/releases](https://github.com/voxgig-sdk/municipal-finance-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'municipalfinance_sdk.php';

$client = new MunicipalFinanceSDK();
```

### 2. List agedcreditor records

```php
try {
    // list() returns an array of AgedCreditor records — iterate directly.
    $agedcreditors = $client->AgedCreditor()->list();
    foreach ($agedcreditors as $item) {
        echo $item["amount_sum"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $agedcreditors = $client->AgedCreditor()->list();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required:

```php
$client = MunicipalFinanceSDK::test();

// Entity ops return the bare mock record (throws on error).
$agedcreditor = $client->AgedCreditor()->list();
print_r($agedcreditor);
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new MunicipalFinanceSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
MUNICIPAL_FINANCE_TEST_LIVE=TRUE
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### MunicipalFinanceSDK

```php
require_once 'municipalfinance_sdk.php';
$client = new MunicipalFinanceSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = MunicipalFinanceSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### MunicipalFinanceSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `AgedCreditor` | `($data): AgedCreditorEntity` | Create an AgedCreditor entity instance. |
| `AgedDebtor` | `($data): AgedDebtorEntity` | Create an AgedDebtor entity instance. |
| `Fact` | `($data): FactEntity` | Create a Fact entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the bare result data (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

### Entities

#### AgedCreditor

| Field | Description |
| --- | --- |
| `amount_sum` |  |
| `amount_type_code` |  |
| `amount_type_label` |  |
| `demarcation_code` |  |
| `demarcation_label` |  |
| `financial_period_period` |  |
| `financial_year_end_year` |  |
| `item_code` |  |
| `item_composition` |  |
| `item_label` |  |
| `item_position_in_return_form` |  |
| `item_return_form_structure` |  |
| `period_length_length` |  |

Operations: List.

API path: `/cubes/aged_creditor/facts`

#### AgedDebtor

| Field | Description |
| --- | --- |
| `amount_sum` |  |
| `amount_type_code` |  |
| `amount_type_label` |  |
| `customer_group_code` |  |
| `demarcation_code` |  |
| `demarcation_label` |  |
| `financial_period_period` |  |
| `financial_year_end_year` |  |
| `item_code` |  |
| `item_composition` |  |
| `item_label` |  |
| `item_position_in_return_form` |  |
| `item_return_form_structure` |  |
| `period_length_length` |  |

Operations: List.

API path: `/cubes/aged_debtor/facts`

#### Fact

| Field | Description |
| --- | --- |
| `cell` |  |
| `summary` |  |
| `total_cell_count` |  |

Operations: List.

API path: `/cubes/audit_opinions/facts`



## Entities


### AgedCreditor

Create an instance: `$aged_creditor = $client->AgedCreditor();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount_sum` | `float` |  |
| `amount_type_code` | `string` |  |
| `amount_type_label` | `string` |  |
| `demarcation_code` | `string` |  |
| `demarcation_label` | `string` |  |
| `financial_period_period` | `int` |  |
| `financial_year_end_year` | `int` |  |
| `item_code` | `string` |  |
| `item_composition` | `string` |  |
| `item_label` | `string` |  |
| `item_position_in_return_form` | `int` |  |
| `item_return_form_structure` | `string` |  |
| `period_length_length` | `string` |  |

#### Example: List

```php
// list() returns an array of AgedCreditor records (throws on error).
$aged_creditors = $client->AgedCreditor()->list();
```


### AgedDebtor

Create an instance: `$aged_debtor = $client->AgedDebtor();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount_sum` | `float` |  |
| `amount_type_code` | `string` |  |
| `amount_type_label` | `string` |  |
| `customer_group_code` | `string` |  |
| `demarcation_code` | `string` |  |
| `demarcation_label` | `string` |  |
| `financial_period_period` | `int` |  |
| `financial_year_end_year` | `int` |  |
| `item_code` | `string` |  |
| `item_composition` | `string` |  |
| `item_label` | `string` |  |
| `item_position_in_return_form` | `int` |  |
| `item_return_form_structure` | `string` |  |
| `period_length_length` | `string` |  |

#### Example: List

```php
// list() returns an array of AgedDebtor records (throws on error).
$aged_debtors = $client->AgedDebtor()->list();
```


### Fact

Create an instance: `$fact = $client->Fact();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cell` | `array` |  |
| `summary` | `array` |  |
| `total_cell_count` | `int` |  |

#### Example: List

```php
// list() returns an array of Fact records (throws on error).
$facts = $client->Fact()->list();
```


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

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── municipalfinance_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`municipalfinance_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$agedcreditor = $client->AgedCreditor();
$agedcreditor->list();

// $agedcreditor->data_get() now returns the agedcreditor data from the last list
// $agedcreditor->match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
