# 🚀 Getting Started

This guide will walk you through setting up LocalDom on your local machine and connecting your first LLM.

## 📋 Prerequisites

- **Node.js**: v18.0.0 or higher.
- **npm**: v8.0.0 or higher.
- **Local LLM Engine**: One of the following running locally:
  - [Ollama](https://ollama.com/) (Default port: 11434)
  - [LM Studio](https://lmstudio.ai/) (Default port: 1234)
  - [GPT4All](https://gpt4all.io/) (Default port: 4891)

## 🛠️ Installation

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/your-repo/localdom.git
    cd localdom
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment**:
    Create a `.env` file in the root directory (you can copy `.env.example`).
    ```bash
    cp .env.example .env
    ```
    Ensure you set a strong `ENCRYPTION_SECRET`.

## 🏃 Running LocalDom

LocalDom consists of two main parts: the **Relay** and the **Agent**.

### 1. Start the Relay (The Gateway)
The relay hosts the dashboard and manages the secure tunnels.
```bash
npm start
```
By default, the dashboard will be available at `http://localhost:9090`.

### 2. Start the Agent (The Bridge)
The agent runs on your local machine, discovers your LLM engines, and connects to the relay.
```bash
npm run agent
```
Once started, the agent will scan your local ports and establish a secure tunnel to the relay.

## ✅ Verification

1.  Open the **Dashboard** at `http://localhost:9090`.
2.  Check the **Engines** tab to see if your local models (e.g., Llama 3, Mistral) are detected.
3.  Go to the **Integrations** tab to find your API key and sample cURL commands.

## 🧪 Testing the API

Run the following cURL command in your terminal to test the connection:

```bash
curl http://localhost:9090/api/ollama/v1/chat/completions \
  -H "X-LocalDom-Key: your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "llama3",
    "messages": [{"role": "user", "content": "Hello LocalDom!"}]
  }'
```

---

## ⏭️ Next Steps

- [**API Reference**](API-Reference) — Learn how to integrate with your apps.
- [**Architecture**](Architecture) — Understand how the "Blind Relay" works.
- [**Security Protocols**](Security-Protocols) — Learn about our encryption model.
