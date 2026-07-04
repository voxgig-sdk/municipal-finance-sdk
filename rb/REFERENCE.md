# MunicipalFinance Ruby SDK Reference

Complete API reference for the MunicipalFinance Ruby SDK.


## MunicipalFinanceSDK

### Constructor

```ruby
require_relative 'municipal-finance_sdk'

client = MunicipalFinanceSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `MunicipalFinanceSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = MunicipalFinanceSDK.test
```


### Instance Methods

#### `AgedCreditor(data = nil)`

Create a new `AgedCreditor` entity instance. Pass `nil` for no initial data.

#### `AgedDebtor(data = nil)`

Create a new `AgedDebtor` entity instance. Pass `nil` for no initial data.

#### `Fact(data = nil)`

Create a new `Fact` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## AgedCreditorEntity

```ruby
aged_creditor = client.AgedCreditor
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

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.AgedCreditor.list(nil)
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgedCreditorEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AgedDebtorEntity

```ruby
aged_debtor = client.AgedDebtor
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

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.AgedDebtor.list(nil)
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgedDebtorEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## FactEntity

```ruby
fact = client.Fact
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cell` | ``$ARRAY`` | No |  |
| `summary` | ``$OBJECT`` | No |  |
| `total_cell_count` | ``$INTEGER`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.Fact.list(nil)
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `FactEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = MunicipalFinanceSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

