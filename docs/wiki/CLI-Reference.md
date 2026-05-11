# 🐚 CLI & Configuration

This page documents the available command-line scripts and environment variables for configuring LocalDom.

## 📜 NPM Scripts

Run these from the root directory of the project.

| Command | Description |
| :--- | :--- |
| `npm start` | Launches the **Relay** server and the dashboard. |
| `npm run agent` | Launches the local **Agent** bridge. |
| `npm run dev` | Starts the Relay and Vite dev server (for UI development). |
| `npm run build` | Builds the production dashboard bundle. |
| `npm test` | Runs the full test suite. |

## ⚙️ Environment Variables (`.env`)

LocalDom uses a single `.env` file in the root for both the Relay and the Agent.

### Core Settings
- `ENCRYPTION_SECRET`: **(Required)** The 32-character master key for AES-256-GCM. Both Agent and Client must use this.
- `PORT`: The HTTP port for the Relay/Dashboard (Default: `9090`).
- `WS_PORT`: The WebSocket port for the secure Tunnel (Default: `9091`).

### Agent Settings
- `RELAY_URL`: The URL of the Relay server. (Default: `ws://localhost:9091`).
- `AGENT_NAME`: Optional name for this agent (e.g., "M1-Mac", "RTX-Server").

### Advanced Settings
- `LOG_LEVEL`: `info`, `debug`, or `error`.
- `MAX_HISTORY`: Max number of messages to store per session (Default: `50`).
- `RATE_LIMIT_MAX`: Requests per minute allowed per IP (Default: `60`).

## 🐳 Docker Support (Experimental)

You can run the LocalDom Relay in a container:

```bash
docker build -t localdom-relay .
docker run -p 9090:9090 -p 9091:9091 --env-file .env localdom-relay
```

> [!NOTE]
> It is recommended to run the **Agent** natively on your host machine to ensure it has easy access to your local network and LLM ports.

---

## ⏭️ Read More
- [**Getting Started**](Getting-Started) — Installation and first steps.
- [**Troubleshooting**](Troubleshooting) — Common configuration errors.
