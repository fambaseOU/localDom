import { nanoid } from 'nanoid';
import { MSG_TYPES, createMessage } from '../../common/protocol.js';
import { addLog } from '../auth/keys.js';

export function setupRouter(fastify, host, pendingRequests) {
  fastify.all('/api/*', (request, reply) => {
    const tunnel = host.getActiveTunnel();
    if (!tunnel) return reply.status(503).send({ error: 'No agent online' });

    const requestId = nanoid();
    pendingRequests.set(requestId, reply);

    // Identify which engine to use from the path (e.g. /api/ollama/...)
    const parts = request.url.split('/');
    const engineName = parts[2] || ''; 
    const engine = tunnel.engines.find(e => e.name.toLowerCase() === engineName.toLowerCase()) || tunnel.engines[0];

    // Strip /api/engine-name from the URL
    const cleanUrl = request.url.replace(`/api/${engineName}`, '') || '/';

    // 🔒 Security: Sanitize sensitive headers
    const sanitizedHeaders = { ...request.headers };
    delete sanitizedHeaders.host;
    delete sanitizedHeaders.origin;
    delete sanitizedHeaders.referer;
    delete sanitizedHeaders.cookie;

    // Send the request down the tunnel
    host.getActiveTunnel().ws.send(createMessage(MSG_TYPES.REQ, {
      requestId, method: request.method, url: cleanUrl,
      body: request.body, headers: sanitizedHeaders, engineName: engine.name
    }));

    // Log the activity with payload snapshot
    addLog({ 
      method: request.method, 
      url: request.url, 
      engine: engine.name,
      payload: request.body ? JSON.stringify(request.body).slice(0, 2000) : null
    });

    return reply;
  });
}
