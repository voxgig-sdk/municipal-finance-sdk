# MunicipalFinance PHP SDK



The PHP SDK for the MunicipalFinance API — an entity-oriented client using PHP conventions.

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

### 2. List agedcreditors

```php
try {
    $result = $client->agedcreditor()->list();
    if (is_array($result)) {
        foreach ($result as $item) {
            $d = $item->data_get();
            echo $d["id"] . " " . $d["name"] . "\n";
        }
    }
} catch (\Exception $err) {
    echo "Error: " . $err->getMessage();
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
    echo "Error: " . $result["err"]->getMessage();
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

$result = $client->agedcreditor()->load(["id" => "test01"]);
// $result contains mock response data
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
| `AgedCreditor` | `($data): AgedCreditorEntity` | Create a AgedCreditor entity instance. |
| `AgedDebtor` | `($data): AgedDebtorEntity` | Create a AgedDebtor entity instance. |
| `Fact` | `($data): FactEntity` | Create a Fact entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `($reqmatch, $ctrl): array` | List entities matching the criteria. |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `update` | `($reqdata, $ctrl): array` | Update an existing entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
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

Create an instance: `const aged_creditor = client.aged_creditor`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount_sum` | ``$NUMBER`` |  |
| `amount_type_code` | ``$STRING`` |  |
| `amount_type_label` | ``$STRING`` |  |
| `demarcation_code` | ``$STRING`` |  |
| `demarcation_label` | ``$STRING`` |  |
| `financial_period_period` | ``$INTEGER`` |  |
| `financial_year_end_year` | ``$INTEGER`` |  |
| `item_code` | ``$STRING`` |  |
| `item_composition` | ``$STRING`` |  |
| `item_label` | ``$STRING`` |  |
| `item_position_in_return_form` | ``$INTEGER`` |  |
| `item_return_form_structure` | ``$STRING`` |  |
| `period_length_length` | ``$STRING`` |  |

#### Example: List

```ts
const aged_creditors = await client.aged_creditor.list()
```


### AgedDebtor

Create an instance: `const aged_debtor = client.aged_debtor`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount_sum` | ``$NUMBER`` |  |
| `amount_type_code` | ``$STRING`` |  |
| `amount_type_label` | ``$STRING`` |  |
| `customer_group_code` | ``$STRING`` |  |
| `demarcation_code` | ``$STRING`` |  |
| `demarcation_label` | ``$STRING`` |  |
| `financial_period_period` | ``$INTEGER`` |  |
| `financial_year_end_year` | ``$INTEGER`` |  |
| `item_code` | ``$STRING`` |  |
| `item_composition` | ``$STRING`` |  |
| `item_label` | ``$STRING`` |  |
| `item_position_in_return_form` | ``$INTEGER`` |  |
| `item_return_form_structure` | ``$STRING`` |  |
| `period_length_length` | ``$STRING`` |  |

#### Example: List

```ts
const aged_debtors = await client.aged_debtor.list()
```


### Fact

Create an instance: `const fact = client.fact`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cell` | ``$ARRAY`` |  |
| `summary` | ``$OBJECT`` |  |
| `total_cell_count` | ``$INTEGER`` |  |

#### Example: List

```ts
const facts = await client.fact.list()
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

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

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller as the second element in the return array.

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

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```php
$agedcreditor = $client->agedcreditor();
$agedcreditor->load(["id" => "example_id"]);

// $agedcreditor->dataGet() now returns the loaded agedcreditor data
// $agedcreditor->matchGet() returns the last match criteria
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
