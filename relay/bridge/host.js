import { WebSocketServer } from 'ws';
import { MSG_TYPES, parseMessage } from '../../common/protocol.js';

export class RelayHost {
  constructor(port) {
    this.wss = new WebSocketServer({ port });
    this.tunnels = new Map(); // tunnelId -> { ws, engines }
  }

  listen(onMessage) {
    this.wss.on('connection', (ws) => {
      const tunnelId = Math.random().toString(36).slice(2);
      
      ws.on('message', (data) => {
        const msg = parseMessage(data);
        if (msg.type === MSG_TYPES.IDENTITY) {
          this.tunnels.set(tunnelId, { ws, engines: msg.payload.engines });
          console.log(`🔌 Agent ${tunnelId} connected.`);
        } else {
          onMessage(tunnelId, msg);
        }
      });

      ws.on('close', () => this.tunnels.delete(tunnelId));
    });
  }

  getActiveTunnel() {
    return Array.from(this.tunnels.values())[0];
  }
}
