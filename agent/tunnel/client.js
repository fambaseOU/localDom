import WebSocket from 'ws';
import { MSG_TYPES, createMessage, parseMessage } from '../../common/protocol.js';
import { encrypt, decrypt } from '../../common/encryption.js';

export class TunnelClient {
  constructor(url, secret) {
    this.url = url;
    this.secret = secret;
    this.ws = null;
    this.onRequestHandler = null;
    this.onMessage = null; // New handler for protocol messages
  }

  identify(engines) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;
    // Pass the full engine object including models
    const payload = { engines: engines.map(e => ({ 
      name: e.name, 
      type: e.type, 
      port: e.port, 
      models: e.models 
    })) };
    this.ws.send(createMessage(MSG_TYPES.IDENTITY, payload));
  }

  connect(initialEngines) {
    this.ws = new WebSocket(this.url);
    
    this.ws.on('open', () => {
      console.log('✅ Connected to Relay.');
      this.identify(initialEngines);
    });

    this.ws.on('message', (data) => {
      const msg = parseMessage(data);
      if (this.onMessage) this.onMessage(msg);
      
      if (msg.type === MSG_TYPES.REQ && this.onRequestHandler) {
        try {
          const decrypted = JSON.parse(decrypt(msg.payload.data, this.secret));
          this.onRequestHandler(decrypted, msg.payload.requestId);
        } catch (e) {
          console.error('🔒 Blocked unauthorized or invalid request payload.');
        }
      }
    });

    this.ws.on('close', () => setTimeout(() => this.connect(initialEngines), 5000));
  }

  sendResponse(type, payload) {
    const data = encrypt(JSON.stringify(payload), this.secret);
    this.ws.send(createMessage(type, { data }));
  }
}
