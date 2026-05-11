# 🪐 LocalDom Wiki

Welcome to the official documentation for **LocalDom**, the privacy-first API gateway for local LLMs.

LocalDom is designed to bridge the gap between your private, locally-running AI models and the applications that need them. By using a "Blind Relay" architecture, it provides secure, authenticated access to your local engines (Ollama, LM Studio, GPT4All, etc.) from anywhere in the world, without sacrificing your data privacy.

## 🚀 Key Features

- **End-to-End Encryption (E2EE)**: All traffic is encrypted locally before being tunneled, using AES-256-GCM.
- **Blind Relay Architecture**: The relay server routes traffic without ever seeing your prompts or responses.
- **Infinite Session Memory**: Conversation history is stored locally on your machine, providing persistence across sessions.
- **Auto-Discovery**: Automatically scans and connects to local LLM engines running on common ports.
- **OpenAI Compatible**: Drop-in replacement for any OpenAI-compatible client or library.
- **Multi-Agent Support**: Connect multiple machines to a single gateway to build a private "Engine Fleet."

## 📖 Navigation

- [**Getting Started**](Getting-Started) — Installation and first steps.
- [**Architecture**](Architecture) — How the system works under the hood.
- [**API Reference**](API-Reference) — Endpoints, headers, and examples.
- [**Security**](Security-Protocols) — Our commitment to your privacy.
- [**Memory System**](Memory-System) — Local persistence and context management.
- [**Dashboard Guide**](Dashboard-Guide) — Managing your gateway through the UI.
- [**Technical API Docs (TypeDoc)**](file:///Users/victor/localdom/docs/api/index.html) — Auto-generated documentation for developers.

---

## 📜 Philosophy

LocalDom is built on the principle that **your intelligence belongs to you**. In an age of cloud-based AI, we provide the tools to keep your data on your hardware while maintaining the flexibility of a cloud API.

MIT © 2026 LocalDom Team
