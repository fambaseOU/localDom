# 📊 Dashboard Guide

The LocalDom Dashboard is a real-time management interface for your API gateway. By default, it is served at `http://localhost:9090`.

## 🏠 Overview Tab
The landing page provides a high-level view of your system's health.
- **Connection Status**: Shows if the Relay is active and how many Agents are currently connected.
- **Active Engines**: A quick count of detected LLM runners.
- **Live Logs**: A real-time stream of incoming requests (headers only) and routing decisions.

## 📡 Engines Tab
This is where you manage your local LLM connections.
- **Engine List**: Shows all detected services (Ollama, LM Studio, etc.) along with their local IP and models.
- **Live Rescan**: Click this button to trigger a system-wide port scan across all connected agents. Use this if you just started a new LLM runner.
- **Model Filter**: Search through your local models across multiple machines.

## 🔑 Keys Tab
Manage authentication for your external applications.
- **Owner Key**: Your master key. It is printed in the terminal on the first run.
- **App Keys**: Create restricted keys for specific apps (e.g., "Mobile App", "Slack Bot").
- **Revocation**: Instantly disable a key if you suspect it has been compromised.

## 🔗 Integrations Tab
The "Developer Playground."
- **Base URL**: Copy your public or local API base URL.
- **Code Snippets**: Get ready-to-use examples for cURL, Python, and JavaScript.
- **Header Helpers**: Explanations for `X-LocalDom-Key` and `X-LocalDom-Session`.

## 🔍 Request Inspector
Click on any log entry in the Overview to open the Inspector.
- **Routing Details**: See exactly which Agent and Engine handled the request.
- **Latency Tracking**: Breakdown of time spent in the Tunnel vs. local LLM processing.
- **Encrypted Blobs**: Verification that the Relay is indeed only seeing encrypted data.

---

## ⏭️ Read More
- [**Getting Started**](Getting-Started) — First run instructions.
- [**API Reference**](API-Reference) — Integrating with the gateway.
