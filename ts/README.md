# MunicipalFinance TypeScript SDK



The TypeScript SDK for the MunicipalFinance API — a type-safe, entity-oriented client with full async/await support.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
npm install municipal-finance
```
## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { MunicipalFinanceSDK } from 'municipal-finance'

const client = new MunicipalFinanceSDK({
  apikey: process.env.MUNICIPAL-FINANCE_APIKEY,
})
```

### 2. List agedcreditors

```ts
const result = await client.AgedCreditor().list()

if (result.ok) {
  for (const item of result.data) {
    console.log(item.id, item.name)
  }
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
const client = MunicipalFinanceSDK.test()

const result = await client.Planet().load({ id: 'test01' })
// result.ok === true
// result.data contains mock response data
```

You can also use the instance method:

```ts
const client = new MunicipalFinanceSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Planet()

// First call sets internal match
await entity.load({ id: 'example' })

// Subsequent calls reuse the stored match
const data = entity.data()
console.log(data.id) // 'example'
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

const client = new MunicipalFinanceSDK({
  apikey: '...',
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
MUNICIPAL-FINANCE_TEST_LIVE=TRUE
MUNICIPAL-FINANCE_APIKEY=<your-key>
```

Then run:

```bash
cd ts && npm test
```


## Reference

### MunicipalFinanceSDK

#### Constructor

```ts
new MunicipalFinanceSDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
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
| `AgedCreditor(data?)` | `AgedCreditorEntity` | Create a AgedCreditor entity instance. |
| `AgedDebtor(data?)` | `AgedDebtorEntity` | Create a AgedDebtor entity instance. |
| `Fact(data?)` | `FactEntity` | Create a Fact entity instance. |
| `tester(testopts?, sdkopts?)` | `MunicipalFinanceSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `MunicipalFinanceSDK.test(testopts?, sdkopts?)` | `MunicipalFinanceSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Result>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Result>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Result>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Result>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<Result>` | Remove an entity. |
| `data` | `data(data?): any` | Get or set entity data. |
| `match` | `match(match?): any` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): MunicipalFinanceSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Result shape

All entity operations return a Result object:

```ts
{
  ok: boolean      // true if the HTTP status is 2xx
  status: number   // HTTP status code
  headers: object  // response headers
  data: any        // parsed JSON response body
}
```

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

Operations: list.

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

Operations: list.

API path: `/cubes/aged_debtor/facts`

#### Fact

| Field | Description |
| --- | --- |
| `cell` |  |
| `summary` |  |
| `total_cell_count` |  |

Operations: list.

API path: `/cubes/audit_opinions/facts`



## Entities


### AgedCreditor

Create an instance: `const aged_creditor = client.AgedCreditor()`

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
const aged_creditors = await client.AgedCreditor().list()
```


### AgedDebtor

Create an instance: `const aged_debtor = client.AgedDebtor()`

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
const aged_debtors = await client.AgedDebtor().list()
```


### Fact

Create an instance: `const fact = client.Fact()`

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
const facts = await client.Fact().list()
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
error is returned to the caller.

An unexpected exception triggers the `PreUnexpected` hook before
propagating.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
municipal-finance/
├── src/
│   ├── MunicipalFinanceSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { MunicipalFinanceSDK } from 'municipal-finance'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const moon = client.Moon()
await moon.load({ planet_id: 'earth', id: 'luna' })

// moon.data() now returns the loaded moon data
// moon.match() returns { planet_id: 'earth', id: 'luna' }
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
