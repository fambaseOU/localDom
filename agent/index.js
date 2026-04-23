/**
 * LocalDom Agent Entry Point
 * Handles LLM engine discovery, tunnel client initialization, 
 * and session-based memory orchestration.
 */
import 'dotenv/config';
import { runScanner } from './discovery/scanner.js';
import { TunnelClient } from './tunnel/client.js';
import { forwardToLocal } from './proxy/forwarder.js';
import { MemoryManager } from './memory/manager.js';
import { MSG_TYPES } from '../common/protocol.js';
import path from 'path';

const memory = new MemoryManager(path.join(process.cwd(), 'agent/memory.json'));
let currentEngines = [];
let tunnel;

async function performScan() {
  console.log('🔍 Scanning local engines...');
  currentEngines = await runScanner();
  if (tunnel) tunnel.identify(currentEngines);
  return currentEngines;
}

async function start() {
  await memory.load();
  await performScan();
  
  tunnel = new TunnelClient(process.env.RELAY_URL || 'ws://localhost:9091', process.env.ENCRYPTION_SECRET);
  
  tunnel.onMessage = async (msg) => {
    if (msg.type === MSG_TYPES.SCAN) {
      await performScan();
    }
  };

  tunnel.onRequestHandler = (req, requestId) => {
    const engine = currentEngines.find(e => e.name === req.engineName) || currentEngines[0];
    forwardToLocal({ ...req, requestId }, tunnel, engine, memory);
  };

  tunnel.connect(currentEngines);
}

start();
