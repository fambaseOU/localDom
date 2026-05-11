# 🧠 Memory System

LocalDom features an **Infinite Session Memory** system. Unlike cloud providers that charge for context storage or have strict ttl (time-to-live) limits, LocalDom stores your conversation history locally on your own hardware.

## 📍 How it Works

When you include the `X-LocalDom-Session` header in an API request, the LocalDom Agent takes over context management.

1.  **Context Injection**: Before forwarding the request to your local LLM (Ollama/LM Studio), the Agent looks up the session ID in `agent/memory.json`. It prepends the found history to your `messages` array.
2.  **Context Truncation**: If the history is too long for the model's context window, the Agent automatically performs a sliding-window truncation, keeping the most relevant recent messages.
3.  **Automatic Persistence**: Once the LLM finishes generating a response, the Agent automatically saves both your prompt and the AI's response back to the local database.

## 📁 Storage Location

All memory is stored in:
`agent/memory.json`

This is a standard JSON file. You can back it up, move it to another machine, or even manually edit it to "correct" the AI's memory.

### Schema Example
```json
{
  "chat-123": [
    { "role": "user", "content": "My name is Victor." },
    { "role": "assistant", "content": "Nice to meet you, Victor!" }
  ]
}
```

## 🚀 Performance Benefits

- **Zero Latency**: Context is injected locally at gigabit speeds before the request ever hits the network.
- **Privacy**: Your conversation history never leaves your machine. Even the LocalDom Relay never sees it.
- **Cost**: No "Context Caching" fees. It's just a few kilobytes of JSON on your disk.

## 🛠️ Managing Sessions

- **New Session**: Simply use a new, unique string in the `X-LocalDom-Session` header.
- **Clear Session**: Currently, you can clear a session by manually removing its entry from `agent/memory.json`. (UI support coming soon).
- **Session Sharing**: Since the memory is local to the Agent, all clients connecting to that specific Agent can share the same session history if they use the same ID.

---

## ⏭️ Read More
- [**API Reference**](API-Reference) — How to use the session header.
- [**Agent Setup**](Agent-Setup) — Configuring your local bridge.
