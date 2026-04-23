/**
 * Protocol Constants for Tunneled Communication
 */

export const MSG_TYPES = {
  // Agent -> Relay
  IDENTITY: 'identity',      // Hello from Agent, lists engines
  RES_CHUNK: 'res_chunk',    // Streaming response data
  RES_END: 'res_end',        // End of response
  RES_ERROR: 'res_error',    // Error in engine processing
  SCAN: 'scan',              // Trigger a new engine scan
  
  // Relay -> Agent
  REQ: 'request',            // Inbound HTTP call to proxy
  PING: 'ping'               // Keep-alive
};

export function createMessage(type, payload = {}) {
  return JSON.stringify({ type, payload });
}

export function parseMessage(data) {
  try {
    return JSON.parse(data);
  } catch (e) {
    return { type: 'unknown', payload: {} };
  }
}
