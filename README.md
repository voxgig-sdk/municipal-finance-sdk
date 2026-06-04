# MunicipalFinance SDK

Query South African municipal financial data published by the National Treasury

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Municipal Finance API

The [Municipal Money API](https://municipaldata.treasury.gov.za/) publishes financial information for every South African metro, district and local municipality in a machine-readable form. The platform is operated by the [South African National Treasury](https://municipaldata.treasury.gov.za/) in partnership with [OpenUp](https://openup.org.za/), and exposes data drawn from Section 71 submissions signed off by each municipality's Manager and Chief Financial Officer.

What you get from the API:

- Financial "cubes" covering aged creditor and aged debtor analyses, balance sheets, capital acquisition, cash flow, income and expenditure, conditional grants, audit opinions, repairs and maintenance, and unauthorised / irregular / wasteful expenditure.
- Both current and historical periods for each cube, with figures aligned to the municipal Standard Chart of Accounts (mSCOA) for the 2019/20 financial year onwards.
- A common cube-model surface (for example `GET /api/cubes` and `GET /api/cubes/{name}/model`) for discovering dimensions and measures before querying facts.

No authentication is required for read access. Bulk CSV and XLSX downloads of the same data are available alongside the API for analysts who need full extracts.

## Try it

**TypeScript**
```bash
npm install municipal-finance
```

**Python**
```bash
pip install municipal-finance-sdk
```

**PHP**
```bash
composer require voxgig/municipal-finance-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/municipal-finance-sdk/go
```

**Ruby**
```bash
gem install municipal-finance-sdk
```

**Lua**
```bash
luarocks install municipal-finance-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { MunicipalFinanceSDK } from 'municipal-finance'

const client = new MunicipalFinanceSDK({})

// List all agedcreditors
const agedcreditors = await client.AgedCreditor().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o municipal-finance-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "municipal-finance": {
      "command": "/abs/path/to/municipal-finance-mcp"
    }
  }
}
```

## Entities

The API exposes 3 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **AgedCreditor** | Aged-creditor analyses for South African municipalities, exposed as one of the Municipal Money financial cubes under `/api/cubes`. | `/cubes/aged_creditor/facts` |
| **AgedDebtor** | Aged-debtor analyses for South African municipalities, exposed as a financial cube under `/api/cubes`. | `/cubes/aged_debtor/facts` |
| **Fact** | Generic fact-query surface for a cube — the shared endpoint used to retrieve the actual numeric rows for any cube once you know its model from `/api/cubes/{name}/model`. | `/cubes/audit_opinions/facts` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from municipalfinance_sdk import MunicipalFinanceSDK

client = MunicipalFinanceSDK({})

# List all agedcreditors
agedcreditors, err = client.AgedCreditor(None).list(None, None)
```

### PHP

```php
<?php
require_once 'municipalfinance_sdk.php';

$client = new MunicipalFinanceSDK([]);

// List all agedcreditors
[$agedcreditors, $err] = $client->AgedCreditor(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/municipal-finance-sdk/go"

client := sdk.NewMunicipalFinanceSDK(map[string]any{})

// List all agedcreditors
agedcreditors, err := client.AgedCreditor(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "MunicipalFinance_sdk"

client = MunicipalFinanceSDK.new({})

# List all agedcreditors
agedcreditors, err = client.AgedCreditor(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("municipal-finance_sdk")

local client = sdk.new({})

-- List all agedcreditors
local agedcreditors, err = client:AgedCreditor(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = MunicipalFinanceSDK.test()
const result = await client.AgedCreditor().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = MunicipalFinanceSDK.test(None, None)
result, err = client.AgedCreditor(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = MunicipalFinanceSDK::test(null, null);
[$result, $err] = $client->AgedCreditor(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.AgedCreditor(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = MunicipalFinanceSDK.test(nil, nil)
result, err = client.AgedCreditor(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:AgedCreditor(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Municipal Finance API

- Upstream: [https://municipaldata.treasury.gov.za/](https://municipaldata.treasury.gov.za/)
- API docs: [https://municipaldata.treasury.gov.za/docs](https://municipaldata.treasury.gov.za/docs)

- Data is published by the [South African National Treasury](https://municipaldata.treasury.gov.za/) under the Municipal Money platform.
- Use is subject to the platform's Terms of Use; check the [documentation site](https://municipaldata.treasury.gov.za/docs) for the current terms.
- Attribute the National Treasury (and OpenUp, who built the platform) when republishing.
- The underlying figures originate from Section 71 submissions by municipalities; treat them as official but verify against published Treasury reports for critical use.

---

Generated from the Municipal Finance API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
