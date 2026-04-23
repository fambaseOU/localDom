# 📡 LocalDom API Reference

LocalDom provides an OpenAI-compatible gateway across secure tunnels.

## 🔑 Authentication
All requests to the `/api` namespace require authentication. 

- **Header**: `X-LocalDom-Key: <your_api_key>`
- **Alternative**: `Authorization: Bearer <your_api_key>`

---

## 🧠 Long-Context Memory (Sessions)
To enable persistent memory for a thread, include the session header:

- **Header**: `X-LocalDom-Session: <unique_session_id>`

When this header is present, the LocalDom Agent will:
1.  Look up previously stored messages for this ID.
2.  Prepend them to the current `messages` array.
3.  Store the new user message and the subsequent AI response automatically.

---

## 🛣️ Routing Paths

Requests are routed based on the first segment of the path following `/api/`.

### 1. General LLM Proxy
- `POST /api/:engine/v1/chat/completions`
- `GET /api/:engine/v1/models`

**Examples**:
- `/api/ollama/v1/chat/completions`
- `/api/lmstudio/v1/chat/completions`

### 2. Management API (Used by Dashboard)
- `GET /api/status` — Returns online status, connected agents, and engines.
- `POST /api/scan` — Triggers a rescan of all local engines on all agents.
- `POST /api/keys` — Generates a new API key.

---

## 🚦 Error Codes

- `401 Unauthorized`: Missing or invalid API key.
- `429 Too Many Requests`: Rate limit exceeded (Default: 60/min).
- `503 Service Unavailable`: No agent is currently connected to the bridge.
