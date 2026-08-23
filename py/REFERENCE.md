# MunicipalFinance Python SDK Reference

Complete API reference for the MunicipalFinance Python SDK.


## MunicipalFinanceSDK

### Constructor

```python
from municipalfinance_sdk import MunicipalFinanceSDK

client = MunicipalFinanceSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `MunicipalFinanceSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = MunicipalFinanceSDK.test()
```


### Instance Methods

#### `AgedCreditor(data=None)`

Create a new `AgedCreditorEntity` instance. Pass `None` for no initial data.

#### `AgedDebtor(data=None)`

Create a new `AgedDebtorEntity` instance. Pass `None` for no initial data.

#### `Fact(data=None)`

Create a new `FactEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## AgedCreditorEntity

```python
aged_creditor = client.AgedCreditor()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount_sum` | `float` | No | Sum of the amount |
| `amount_type_code` | `str` | No | Amount type code |
| `amount_type_label` | `str` | No | Amount type label |
| `demarcation_code` | `str` | No | Municipality demarcation code |
| `demarcation_label` | `str` | No | Municipality name |
| `financial_period_period` | `int` | No | Financial period number |
| `financial_year_end_year` | `int` | No | Financial year end |
| `item_code` | `str` | No | Item code |
| `item_composition` | `str` | No | Item composition formula |
| `item_label` | `str` | No | Item label |
| `item_position_in_return_form` | `int` | No | Position in return form |
| `item_return_form_structure` | `str` | No | Return form structure |
| `period_length_length` | `str` | No | Period length |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.AgedCreditor().list()
for aged_creditor in results:
    print(aged_creditor)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgedCreditorEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgedDebtorEntity

```python
aged_debtor = client.AgedDebtor()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount_sum` | `float` | No | Sum of the amount |
| `amount_type_code` | `str` | No | Amount type code |
| `amount_type_label` | `str` | No | Amount type label |
| `customer_group_code` | `str` | No | Customer group code |
| `demarcation_code` | `str` | No | Municipality demarcation code |
| `demarcation_label` | `str` | No | Municipality name |
| `financial_period_period` | `int` | No | Financial period number |
| `financial_year_end_year` | `int` | No | Financial year end |
| `item_code` | `str` | No | Item code |
| `item_composition` | `str` | No | Item composition formula |
| `item_label` | `str` | No | Item label |
| `item_position_in_return_form` | `int` | No | Position in return form |
| `item_return_form_structure` | `str` | No | Return form structure |
| `period_length_length` | `str` | No | Period length |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.AgedDebtor().list()
for aged_debtor in results:
    print(aged_debtor)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgedDebtorEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## FactEntity

```python
fact = client.Fact()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cells` | `list` | No |  |
| `summary` | `dict` | No |  |
| `total_cell_count` | `int` | No | Total number of cells in the result |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Fact().list()
for fact in results:
    print(fact)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FactEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = MunicipalFinanceSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

