# 🛡️ LocalDom Security Protocol

LocalDom is designed with a **Privacy-First** philosophy. Our goal is to ensure that even if your Relay server is compromised, your actual LLM prompts and responses remain undecipherable.

## 1. End-To-End Encryption (E2EE)
We use a high-strength encryption layer based on the **AES-256-GCM** algorithm.

- **Symmetric Key**: Both the Agent and the Client App share a master `ENCRYPTION_SECRET`.
- **IV (Initialization Vector)**: Every single message generates a unique 12-byte IV to prevent pattern analysis.
- **Tag**: GCM mode provides an authentication tag to ensure the message hasn't been tampered with.

## 2. The Blind Relay Principle
The Relay server functions as a "dumb pipe." It receives JSON objects with an `encryptedData` field. 

- **Headers Only**: The relay reads only the headers needed for routing (Message Type, Request ID).
- **Zero Decryption**: The relay *never* possesses the `ENCRYPTION_SECRET`. It cannot see inside the payloads.
- **Volatile Logs**: Activity logs in the dashboard snapshot the payload but store them as encrypted blobs.

## 3. Threat Model

| Threat | LocalDom Protection |
| :--- | :--- |
| **Relay Compromised** | Attacker only sees encrypted strings. No data leak. |
| **Network Interception** | HTTPS + E2EE provides double-layer protection. |
| **Local Machine Breach** | Standard OS security applies. Keep your `.env` private. |

---

## 🔐 Key Safety
Your `ENCRYPTION_SECRET` is the most sensitive part of your setup.
- **DO NOT** commit your `.env` to GitHub.
- **ROTATE** your secret if you suspect it has been leaked.
- **RESTRICT** access to your Relay machine.
