# MunicipalFinance Golang SDK Reference

Complete API reference for the MunicipalFinance Golang SDK.


## MunicipalFinanceSDK

### Constructor

```go
func NewMunicipalFinanceSDK(options map[string]any) *MunicipalFinanceSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *MunicipalFinanceSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *MunicipalFinanceSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `AgedCreditor(data map[string]any) MunicipalFinanceEntity`

Create a new `AgedCreditor` entity instance. Pass `nil` for no initial data.

#### `AgedDebtor(data map[string]any) MunicipalFinanceEntity`

Create a new `AgedDebtor` entity instance. Pass `nil` for no initial data.

#### `Fact(data map[string]any) MunicipalFinanceEntity`

Create a new `Fact` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## AgedCreditorEntity

```go
agedCreditor := client.AgedCreditor(nil)
fmt.Println(agedCreditor.GetName()) // "aged_creditor"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount_sum` | `float64` | No |  |
| `amount_type_code` | `string` | No |  |
| `amount_type_label` | `string` | No |  |
| `demarcation_code` | `string` | No |  |
| `demarcation_label` | `string` | No |  |
| `financial_period_period` | `int` | No |  |
| `financial_year_end_year` | `int` | No |  |
| `item_code` | `string` | No |  |
| `item_composition` | `string` | No |  |
| `item_label` | `string` | No |  |
| `item_position_in_return_form` | `int` | No |  |
| `item_return_form_structure` | `string` | No |  |
| `period_length_length` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.AgedCreditor(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgedCreditorEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## AgedDebtorEntity

```go
agedDebtor := client.AgedDebtor(nil)
fmt.Println(agedDebtor.GetName()) // "aged_debtor"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount_sum` | `float64` | No |  |
| `amount_type_code` | `string` | No |  |
| `amount_type_label` | `string` | No |  |
| `customer_group_code` | `string` | No |  |
| `demarcation_code` | `string` | No |  |
| `demarcation_label` | `string` | No |  |
| `financial_period_period` | `int` | No |  |
| `financial_year_end_year` | `int` | No |  |
| `item_code` | `string` | No |  |
| `item_composition` | `string` | No |  |
| `item_label` | `string` | No |  |
| `item_position_in_return_form` | `int` | No |  |
| `item_return_form_structure` | `string` | No |  |
| `period_length_length` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.AgedDebtor(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgedDebtorEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## FactEntity

```go
fact := client.Fact(nil)
fmt.Println(fact.GetName()) // "fact"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cell` | `[]any` | No |  |
| `summary` | `map[string]any` | No |  |
| `total_cell_count` | `int` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Fact(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `FactEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewMunicipalFinanceSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

