/**
 * MemoryManager Service
 * Provides persistent, session-based chat history storage on the local Agent.
 * Stores history in agent/memory.json for cross-restart persistence.
 */
import fs from 'fs/promises';
import path from 'path';

export class MemoryManager {
  constructor(dbPath, limit = 20) {
    this.dbPath = dbPath;
    this.limit = limit; 
    this.sessions = new Map();
  }

  async load() {
    try {
      const data = await fs.readFile(this.dbPath, 'utf-8');
      const parsed = JSON.parse(data);
      for (const [id, history] of Object.entries(parsed)) {
        this.sessions.set(id, history);
      }
    } catch (e) {
      this.sessions = new Map();
    }
  }

  async save() {
    const data = JSON.stringify(Object.fromEntries(this.sessions));
    await fs.writeFile(this.dbPath, data);
  }

  getHistory(sessionId) {
    return this.sessions.get(sessionId) || [];
  }

  addMessage(sessionId, message) {
    let history = this.getHistory(sessionId);
    history.push(message);
    if (history.length > this.limit) history.shift();
    this.sessions.set(sessionId, history);
    this.save();
  }
}
