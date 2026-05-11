# 🛡️ Security Protocols

Security is not an afterthought in LocalDom; it is the foundation. Our architecture is designed to allow you to use a public relay server without ever exposing your private data.

## 🔒 End-to-End Encryption (E2EE)

LocalDom implements true E2EE. This means that data is encrypted at the source (your client app or the local agent) and is only decrypted at the destination.

### Technical Specification
- **Algorithm**: AES-256-GCM (Galois/Counter Mode).
- **Key Derivation**: The `ENCRYPTION_SECRET` is used as a symmetric key.
- **Initialization Vector (IV)**: A unique 12-byte IV is generated for every message.
- **Authentication Tag**: GCM mode provides a 16-byte tag to ensure data integrity and authenticity.

### Why AES-256-GCM?
We chose GCM mode because it provides both **confidentiality** and **integrity**. It detects if an attacker (or even the relay server) tries to modify a single bit of the encrypted payload.

## 🙈 The Blind Relay Principle

The Relay server is "blind" because it never sees the plaintext data.

1.  **Request Phase**: The client encrypts the JSON payload (messages, model name, etc.). The Relay receives an "envelope" containing the encrypted blob.
2.  **Routing Phase**: The Relay uses unencrypted metadata in the header (like `engineName`) to find the correct tunnel.
3.  **Response Phase**: The Agent encrypts the LLM response tokens. The Relay streams these tokens back to the client as encrypted chunks.

> [!IMPORTANT]
> The Relay server **never** stores or possesses the `ENCRYPTION_SECRET`. Even if the Relay's database or memory is dumped, your prompts remain secure.

## 🛡️ Threat Modeling

| Threat | Risk Level | LocalDom Mitigation |
| :--- | :--- | :--- |
| **Relay Compromise** | High | Attacker only sees encrypted blobs and metadata. No prompt/response leak. |
| **Man-in-the-Middle** | Medium | Protected by standard HTTPS/TLS + our internal E2EE layer. |
| **Brute Force (API Keys)**| Low | Rate limiting at the Relay level prevents rapid guessing. |
| **Relay IP Spoofing** | Low | Tunnel handshake requires secret verification. |

## 🔑 Key Management Best Practices

1.  **Rotate Secrets**: Periodically update your `ENCRYPTION_SECRET` in the `.env` file.
2.  **Separate App Keys**: Never use your "Owner Key" for third-party integrations. Create specific App Keys in the Dashboard.
3.  **Localhost Restriction**: The management APIs (status, key generation) are restricted to `127.0.0.1` by default. Do not disable this unless you have an external firewall.

---

## ⏭️ Read More
- [**Architecture**](Architecture) — The system component overview.
- [**Memory System**](Memory-System) — How data is stored locally.
