# 📡 API Reference

LocalDom provides an OpenAI-compatible interface. This means you can use existing OpenAI libraries (like `openai-python` or `openai-node`) by simply changing the `base_url` and `api_key`.

## 🔑 Authentication

All requests to the `/api` namespace require a valid API key.

- **Header**: `X-LocalDom-Key: <your_ld_key>`
- **Alternative**: `Authorization: Bearer <your_ld_key>`

> [!TIP]
> You can generate and manage API keys via the **Keys** tab in the Dashboard.

## 🧠 Session Management

LocalDom handles conversation context automatically if you provide a session ID.

- **Header**: `X-LocalDom-Session: <unique_id>`

When this header is used, the Agent will:
1.  Load the history for `<unique_id>` from the local machine.
2.  Prepend it to your `messages` array.
3.  Append the new response to the history after the request completes.

## 🛣️ Endpoints

### 1. Chat Completions
`POST /api/:engine/v1/chat/completions`

**Path Parameters:**
- `:engine`: The name of the engine (e.g., `ollama`, `lmstudio`, `gpt4all`). If omitted or set to `v1`, LocalDom defaults to the first available engine.

**Body (JSON):**
Matches the OpenAI Chat Completions schema.
```json
{
  "model": "llama3",
  "messages": [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "What is LocalDom?"}
  ],
  "stream": true
}
```

### 2. List Models
`GET /api/:engine/v1/models`

Returns a list of models currently available on the specified engine.

### 3. System Status (Management)
`GET /api/status`

*Note: This endpoint is restricted to localhost by default.*
Returns:
- `online`: Boolean
- `tunnels`: Number of active agents
- `engines`: Array of detected engines and their models
- `keys`: List of active API keys (metadata only)

## 🚦 Error Reference

| Code | Meaning | Solution |
| :--- | :--- | :--- |
| **401** | Unauthorized | Check your `X-LocalDom-Key`. |
| **403** | Forbidden | You are trying to access management APIs from a remote IP. |
| **429** | Too Many Requests | You have exceeded the 60 req/min rate limit. |
| **404** | Engine Not Found | The specified engine (e.g., `/api/custom/...`) is not online. |
| **503** | Service Unavailable | No Agent is currently connected to the Relay. |

## 💻 Example: OpenAI SDK (Node.js)

```javascript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: 'your_ld_key',
  baseURL: 'http://localhost:9090/api/ollama/v1',
  defaultHeaders: {
    'X-LocalDom-Session': 'my-cool-app-session-1'
  }
});

const response = await openai.chat.completions.create({
  model: 'llama3',
  messages: [{ role: 'user', content: 'Explain quantum physics.' }],
});
```

---

## ⏭️ Read More
- [**Memory System**](Memory-System) — How the local persistence works.
- [**Troubleshooting**](Troubleshooting) — Solving connection errors.
