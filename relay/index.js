import Fastify from 'fastify';
/**
 * LocalDom Relay Entry Point
 * A fastify-based bridge that manages WebSocket tunnels, API keys, 
 * rate limiting, and static dashboard serving.
 */
import { RelayHost } from './bridge/host.js';
import { setupRouter } from './api/router.js';
import { handleBridgeMessage } from './api/responses.js';
import { verifyKey, getAllKeys, generateKey, getLogs } from './auth/keys.js';
import { MSG_TYPES, createMessage } from '../common/protocol.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fastifyStatic from '@fastify/static';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const WS_PORT = process.env.WS_PORT || 9091;
const HTTP_PORT = process.env.PORT || 9090;

const fastify = Fastify();
const host = new RelayHost(WS_PORT);
const pendingRequests = new Map();

// Dashboard UI (Vite Build) at Root
fastify.register(fastifyStatic, {
  root: path.join(__dirname, '../src/dist'),
  prefix: '/',
});

// In-memory Rate Limiter
const RATE_LIMITS = new Map();
const MAX_REQ = 60; // 60 requests per minute

// Auth & Security Middleware
fastify.addHook('preHandler', async (req, reply) => {
  // 1. Rate Limiting
  const ip = req.ip;
  const now = Date.now();
  const userData = RATE_LIMITS.get(ip) || { count: 0, reset: now + 60000 };
  
  if (now > userData.reset) {
    userData.count = 0;
    userData.reset = now + 60000;
  }
  
  userData.count++;
  RATE_LIMITS.set(ip, userData);
  
  if (userData.count > MAX_REQ) {
    return reply.status(429).send({ error: 'Too many requests' });
  }

  // 2. Auth Exception for UI (Strictly Localhost Only)
  const isManagement = req.url === '/api/status' || 
                       req.url === '/api/keys' ||
                       req.url === '/api/scan';
  
  if (isManagement) {
    const remoteIp = req.ip;
    const isLocal = remoteIp === '127.0.0.1' || remoteIp === '::1' || remoteIp === '::ffff:127.0.0.1';
    if (!isLocal) {
      return reply.status(403).send({ error: 'Management API is restricted to local access only' });
    }
    return; // Allowed for local UI
  }

  if (!req.url.startsWith('/api')) return; // Serve static UI
  
  const key = req.headers['x-localdom-key'] || 
              req.headers['authorization']?.replace('Bearer ', '');
              
  if (!verifyKey(key)) return reply.status(401).send({ error: 'Unauthorized' });
});

// Status API for Dashboard
fastify.get('/api/status', async () => {
  return {
    online: true,
    tunnels: host.tunnels.size,
    engines: Array.from(host.tunnels.values()).flatMap(t => t.engines),
    keys: getAllKeys(),
    logs: getLogs()
  };
});

// Key Generation API
fastify.post('/api/keys', async (req) => {
  const { name } = req.body || { name: 'New Key' };
  return { key: generateKey(name) };
});

host.listen((tunnelId, msg) => handleBridgeMessage(msg, pendingRequests));
setupRouter(fastify, host, pendingRequests);
// Trigger Rescan across all agents
fastify.post('/api/scan', async () => {
  for (const t of host.tunnels.values()) {
    t.ws.send(createMessage(MSG_TYPES.SCAN));
  }
  return { success: true };
});

fastify.listen({ port: parseInt(HTTP_PORT), host: '0.0.0.0' }, () => {
  console.log(`🚀 LocalDom Relay v2: http://localhost:${HTTP_PORT}`);
});
