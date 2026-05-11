# 🌉 Agent Setup & Discovery

The LocalDom Agent is the link between your local engines and the relay. While it works out-of-the-box for most users, it offers several advanced configuration options.

## 📡 Auto-Discovery
On startup, and whenever a scan is triggered, the Agent probes your local machine for common LLM runners.

**Supported Engines by Default:**
- **Ollama**: `http://localhost:11434`
- **LM Studio**: `http://localhost:1234`
- **GPT4All**: `http://localhost:4891`
- **LocalAI**: `http://localhost:8080`

## 🛠️ Adding Custom Engines
If you are running an LLM on a non-standard port or a different IP address within your network, you can manually add it to the discovery list.

1.  Open `agent/discovery/services.js` (or `agent/discovery/scanner.js` depending on your version).
2.  Add your service configuration:
    ```javascript
    {
      name: 'my-custom-runner',
      port: 9999,
      path: '/v1'
    }
    ```

## 🌍 Multi-Agent (Swarms)
LocalDom is designed to support multiple agents connecting to a single Relay. This allows you to pool LLM resources from several physical machines (e.g., a Mac Studio for Llama 3 and a Linux PC with 3090s for high-speed inference).

### Setup:
1.  Deploy the **Relay** to a central server (or your main workstation).
2.  On each machine where you want to run an **Agent**:
    - Set `RELAY_URL` in `.env` to the Relay's address (e.g., `ws://192.168.1.50:9091`).
    - Ensure all agents use the same `ENCRYPTION_SECRET`.
3.  The Dashboard will automatically group models by the Agent that discovered them.

## 🔐 Firewall & Security
- **No Inbound Ports**: The Agent establishes an *outbound* connection to the Relay. You do **not** need to open any ports on your local router or firewall.
- **Local-Only Proxy**: The Agent only communicates with the Relay via the secure tunnel. It never exposes your local LLM ports to the public internet directly.

## 🔄 Updating Discovery
You don't need to restart the agent to find new models. Just click the **Live Rescan** button in the Dashboard, and the Relay will broadcast a scan command to all connected agents.

---

## ⏭️ Read More
- [**Architecture**](Architecture) — How the Agent fits into the system.
- [**Memory System**](Memory-System) — Local persistence on the Agent machine.
