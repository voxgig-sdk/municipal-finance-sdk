# MunicipalFinance Lua SDK Reference

Complete API reference for the MunicipalFinance Lua SDK.


## MunicipalFinanceSDK

### Constructor

```lua
local sdk = require("municipal-finance_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `AgedCreditor(data)`

Create a new `AgedCreditor` entity instance. Pass `nil` for no initial data.

#### `AgedDebtor(data)`

Create a new `AgedDebtor` entity instance. Pass `nil` for no initial data.

#### `Fact(data)`

Create a new `Fact` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## AgedCreditorEntity

```lua
local aged_creditor = client:AgedCreditor(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount_sum` | `number` | No |  |
| `amount_type_code` | `string` | No |  |
| `amount_type_label` | `string` | No |  |
| `demarcation_code` | `string` | No |  |
| `demarcation_label` | `string` | No |  |
| `financial_period_period` | `number` | No |  |
| `financial_year_end_year` | `number` | No |  |
| `item_code` | `string` | No |  |
| `item_composition` | `string` | No |  |
| `item_label` | `string` | No |  |
| `item_position_in_return_form` | `number` | No |  |
| `item_return_form_structure` | `string` | No |  |
| `period_length_length` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:AgedCreditor():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgedCreditorEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AgedDebtorEntity

```lua
local aged_debtor = client:AgedDebtor(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount_sum` | `number` | No |  |
| `amount_type_code` | `string` | No |  |
| `amount_type_label` | `string` | No |  |
| `customer_group_code` | `string` | No |  |
| `demarcation_code` | `string` | No |  |
| `demarcation_label` | `string` | No |  |
| `financial_period_period` | `number` | No |  |
| `financial_year_end_year` | `number` | No |  |
| `item_code` | `string` | No |  |
| `item_composition` | `string` | No |  |
| `item_label` | `string` | No |  |
| `item_position_in_return_form` | `number` | No |  |
| `item_return_form_structure` | `string` | No |  |
| `period_length_length` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:AgedDebtor():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgedDebtorEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## FactEntity

```lua
local fact = client:Fact(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cells` | `table` | No |  |
| `summary` | `table` | No |  |
| `total_cell_count` | `number` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Fact():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FactEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

