# MunicipalFinance PHP SDK Reference

Complete API reference for the MunicipalFinance PHP SDK.


## MunicipalFinanceSDK

### Constructor

```php
require_once __DIR__ . '/municipal-finance_sdk.php';

$client = new MunicipalFinanceSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `MunicipalFinanceSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = MunicipalFinanceSDK::test();
```


### Instance Methods

#### `AgedCreditor($data = null)`

Create a new `AgedCreditorEntity` instance. Pass `null` for no initial data.

#### `AgedDebtor($data = null)`

Create a new `AgedDebtorEntity` instance. Pass `null` for no initial data.

#### `Fact($data = null)`

Create a new `FactEntity` instance. Pass `null` for no initial data.

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. Returns `[$result, $err]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array [$result, $err]`

#### `prepare(array $fetchargs = []): array`

Prepare a fetch definition without sending the request. Returns `[$fetchdef, $err]`.


---

## AgedCreditorEntity

```php
$aged_creditor = $client->AgedCreditor();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount_sum` | ``$NUMBER`` | No |  |
| `amount_type_code` | ``$STRING`` | No |  |
| `amount_type_label` | ``$STRING`` | No |  |
| `demarcation_code` | ``$STRING`` | No |  |
| `demarcation_label` | ``$STRING`` | No |  |
| `financial_period_period` | ``$INTEGER`` | No |  |
| `financial_year_end_year` | ``$INTEGER`` | No |  |
| `item_code` | ``$STRING`` | No |  |
| `item_composition` | ``$STRING`` | No |  |
| `item_label` | ``$STRING`` | No |  |
| `item_position_in_return_form` | ``$INTEGER`` | No |  |
| `item_return_form_structure` | ``$STRING`` | No |  |
| `period_length_length` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->AgedCreditor()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): AgedCreditorEntity`

Create a new `AgedCreditorEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## AgedDebtorEntity

```php
$aged_debtor = $client->AgedDebtor();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount_sum` | ``$NUMBER`` | No |  |
| `amount_type_code` | ``$STRING`` | No |  |
| `amount_type_label` | ``$STRING`` | No |  |
| `customer_group_code` | ``$STRING`` | No |  |
| `demarcation_code` | ``$STRING`` | No |  |
| `demarcation_label` | ``$STRING`` | No |  |
| `financial_period_period` | ``$INTEGER`` | No |  |
| `financial_year_end_year` | ``$INTEGER`` | No |  |
| `item_code` | ``$STRING`` | No |  |
| `item_composition` | ``$STRING`` | No |  |
| `item_label` | ``$STRING`` | No |  |
| `item_position_in_return_form` | ``$INTEGER`` | No |  |
| `item_return_form_structure` | ``$STRING`` | No |  |
| `period_length_length` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->AgedDebtor()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): AgedDebtorEntity`

Create a new `AgedDebtorEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## FactEntity

```php
$fact = $client->Fact();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cell` | ``$ARRAY`` | No |  |
| `summary` | ``$OBJECT`` | No |  |
| `total_cell_count` | ``$INTEGER`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Fact()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): FactEntity`

Create a new `FactEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new MunicipalFinanceSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

