# 🆘 Troubleshooting

This page addresses common issues you might encounter while setting up or using LocalDom.

## 📡 Connection Issues

### "No agent online" (503 Service Unavailable)
This error occurs when the Relay doesn't have any active tunnels.
- **Check the Agent**: Ensure the Agent terminal is running and says "Connected to Relay."
- **Check RELAY_URL**: If your relay is on a remote VPS, ensure the agent's `.env` points to the correct WebSocket URL (e.g., `ws://yourdomain.com:9091`).
- **Firewall**: Ensure the Relay's `WS_PORT` (default 9091) is open on the server firewall.

### "Handshake failed"
- **Secret Mismatch**: Ensure both the Relay and the Agent are using the *exact same* `ENCRYPTION_SECRET` in their `.env` files.
- **Protocol Version**: Ensure you are running the same version of LocalDom on both ends.

## 🧠 Memory & Context Issues

### "Context too long" or Error from LLM
- **Check Session**: If a session has grown too large, the Agent tries to truncate it. If the local LLM still errors, try clearing the session.
- **Manual Clear**: Open `agent/memory.json` and delete the entry for the problematic session ID.

### Memory not persisting
- **Write Permissions**: Ensure the Agent has permission to write to the `agent/` directory.
- **Check agent/memory.json**: Verify that the file exists and is valid JSON.

## 🔑 Authentication & Keys

### "Unauthorized" (401)
- **Header Check**: Ensure you are using `X-LocalDom-Key` or `Authorization: Bearer <key>`.
- **Key Expiry/Revocation**: Check the Dashboard to ensure the key hasn't been revoked.

### Management API returns 403
- **Localhost Only**: By default, `/api/status`, `/api/keys`, and `/api/scan` are restricted to local requests (`127.0.0.1`). If you are accessing the dashboard from another machine, this is expected behavior.
- **Solution**: Use an SSH tunnel to map port 9090 to your local machine:
  `ssh -L 9090:localhost:9090 your-vps-ip`

## 🐢 Performance Issues

### High Latency
- **E2EE Overhead**: Encryption adds a small overhead (usually <10ms).
- **Network Path**: If your Relay is far away from your Agent, network latency will be the primary bottleneck.
- **Local LLM Speed**: Check if your local LLM is running slowly due to resource contention (CPU/GPU usage).

---

## ⏭️ Read More
- [**Getting Started**](Getting-Started) — Basic setup guide.
- [**Architecture**](Architecture) — Technical overview.
