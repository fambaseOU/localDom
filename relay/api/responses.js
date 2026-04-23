import { MSG_TYPES } from '../../common/protocol.js';

export function handleBridgeMessage(msg, pendingRequests) {
  const { requestId } = msg.payload;
  const reply = pendingRequests.get(requestId);
  if (!reply) return;

  switch (msg.type) {
    case MSG_TYPES.RES_CHUNK:
      reply.raw.write(msg.payload.chunk);
      break;
    case MSG_TYPES.RES_END:
      reply.raw.end();
      pendingRequests.delete(requestId);
      break;
    case MSG_TYPES.RES_ERROR:
      reply.status(msg.payload.status).send({ error: msg.payload.error });
      pendingRequests.delete(requestId);
      break;
  }
}
