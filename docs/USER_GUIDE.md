# 📖 LocalDom User Guide

This guide covers advanced usage of the LocalDom Gateway.

## 🌐 Self-Hosting with a Domain
If you want to access your local LLMs from the public internet (e.g., from a mobile app or another server), you should deploy the **Relay** to a VPS with a static IP or Domain.

1.  **Point your Domain**: Create an `A` record pointing to your VPS IP.
2.  **SSL/TLS (HTTPS)**: We recommend using Nginx or Caddy as a reverse proxy to handle SSL.
3.  **Automatic Detection**: Once deployed, the dashboard will automatically detect your domain and show the correct `https://yourdomain.com/api` URL in the **Integrations** tab.

## 🌉 Connecting Multiple Agents
LocalDom supports multiple agents connecting to a single Relay. Each agent is assigned a unique `tunnelId`.

1.  Deploy the Relay to a VPS.
2.  On each local machine, set the `RELAY_URL` in `.env` to your VPS address.
3.  The Relay Dashboard will group engines by the agent that discovered them.

## 🧭 Engine Discovery
The Agent automatically scans common ports:
- **Ollama**: Port 11434
- **LM Studio**: Port 1234
- **GPT4All**: Port 4891

To add a custom engine, edit `agent/discovery/services.js` and add your port/endpoint.

## 🚦 Routing Logic
LocalDom uses smart path-based routing:

- `http://localhost:9090/api/ollama/v1/chat/completions` -> Routes to the first available Ollama instance.
- `http://localhost:9090/api/lmstudio/v1/models` -> Routes to LM Studio.

If you don't specify an engine (e.g., hitting `/api/v1/...`), LocalDom will default to the **first detected engine**.

## 🔑 Key Policies
- **Owner Key**: Printed on startup. Has full access to the Dashboard API.
- **App Keys**: Created via the dashboard. Use these for your external integrations.

---

## 🆘 Troubleshooting

### "No agent online"
Ensure your Agent terminal says "Connected to Relay." Check your `RELAY_URL` if the relay is on a different machine.

### "Unauthorized"
Ensure you are passing the `X-LocalDom-Key` header or `Authorization: Bearer <key>`.
