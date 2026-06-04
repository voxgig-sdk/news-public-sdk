# NewsPublic SDK

Fetch latest news articles as JSON from a Django REST Framework backend

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About News Public API

News Public API is a small, free public endpoint that serves news articles as JSON. It is built on Python with Django REST Framework and hosted on Render, with a community catalogue page on [Free Public APIs](https://freepublicapis.com/news-public-api).

What you get from the API:

- A list of recent news items via `GET /api/noticias/`
- Bulk fetch with `?all=true` to retrieve all available articles
- Pagination-style limiting with `?limit=<n>` (for example, `?limit=50`)

Operational notes: the service has been observed to be intermittent on its free Render hosting and CORS is not enabled, so direct browser-side calls from another origin may be blocked. No authentication is documented.

## Try it

**TypeScript**
```bash
npm install news-public
```

**Python**
```bash
pip install news-public-sdk
```

**PHP**
```bash
composer require voxgig/news-public-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/news-public-sdk/go
```

**Ruby**
```bash
gem install news-public-sdk
```

**Lua**
```bash
luarocks install news-public-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { NewsPublicSDK } from 'news-public'

const client = new NewsPublicSDK({})

// List all noticias
const noticias = await client.Noticia().list()
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
cd go-mcp && go build -o news-public-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "news-public": {
      "command": "/abs/path/to/news-public-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **Noticia** | A news article resource exposed at `GET /api/noticias/`, supporting `?all=true` and `?limit=<n>` query parameters. | `/api/noticias/` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from newspublic_sdk import NewsPublicSDK

client = NewsPublicSDK({})

# List all noticias
noticias, err = client.Noticia(None).list(None, None)
```

### PHP

```php
<?php
require_once 'newspublic_sdk.php';

$client = new NewsPublicSDK([]);

// List all noticias
[$noticias, $err] = $client->Noticia(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/news-public-sdk/go"

client := sdk.NewNewsPublicSDK(map[string]any{})

// List all noticias
noticias, err := client.Noticia(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "NewsPublic_sdk"

client = NewsPublicSDK.new({})

# List all noticias
noticias, err = client.Noticia(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("news-public_sdk")

local client = sdk.new({})

-- List all noticias
local noticias, err = client:Noticia(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = NewsPublicSDK.test()
const result = await client.Noticia().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = NewsPublicSDK.test(None, None)
result, err = client.Noticia(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = NewsPublicSDK::test(null, null);
[$result, $err] = $client->Noticia(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Noticia(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = NewsPublicSDK.test(nil, nil)
result, err = client.Noticia(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Noticia(nil):load(
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

## Using the News Public API

- Upstream: [https://news-public-api.onrender.com](https://news-public-api.onrender.com)
- API docs: [https://freepublicapis.com/news-public-api](https://freepublicapis.com/news-public-api)

---

Generated from the News Public API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
