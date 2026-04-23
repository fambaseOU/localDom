# 🏗️ LocalDom Architecture Guide

LocalDom is a **distributed proxy system** designed for privacy-preserving LLM access.

## System Components

### 1. The Relay (Cloud/Public)
The Central hub. It maintains persistent WebSocket connections with Agents. When an HTTP request arrives, it "parks" the request and sends a command down the tunnel.
- **Modularity**: Every feature (Auth, Bridge, API) is a standalone ES Module.
- **State**: In-memory storage for active tunnels and pending HTTP replies.

### 2. The Agent (Local Machine)
The bridgehead. It lives behind your firewall and connects OUT to the Relay.
- **Discovery**: Probes local ports to find running LLM engines (Ollama, etc.).
- **Memory**: Manages a local JSON database for conversation context.
- **Proxy**: Translates WebSocket messages back into high-speed local HTTP calls.

### 3. The Protocol (Common)
A lightweight JSON-based message format.
- **Types**: `identity`, `request`, `res_chunk`, `scan`, etc.
- **Streaming**: Supports chunked responses for real-time AI typing.

## Data Flow (Chat Request)
1. **Client** hits Relay `/api/ollama/v1/...` with an API Key.
2. **Relay** validates the key and rate limits the IP.
3. **Relay** identifies the active Tunnel and sends an encrypted `request` message.
4. **Agent** receives the message and decrypts it with the local secret.
5. **Agent** checks for `X-LocalDom-Session` and injects conversation history.
6. **Agent** forwards the request to `localhost:11434`.
7. **Local LLM** streams response to Agent.
8. **Agent** streams encrypted `res_chunk` messages back to Relay.
9. **Relay** streams data to the original HTTP Client.

## Future Scaling
LocalDom is built to support **Multi-Agent Swarms**. One Relay can host dozens of Agents, allowing you to build a private "Engine Fleet" across multiple physical machines.
