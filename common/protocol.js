/**
 * Protocol Constants for Tunneled Communication.
 * Defines the message types used in the WebSocket bridge between Relay and Agent.
 */
export const MSG_TYPES = {
  /** Sent by Agent to identify itself and its available LLM engines. */
  IDENTITY: 'identity',
  /** Chunk of streaming response data from a local LLM. */
  RES_CHUNK: 'res_chunk',
  /** Signals the end of a response stream. */
  RES_END: 'res_end',
  /** Signals an error during engine processing. */
  RES_ERROR: 'res_error',
  /** Command from Relay to Agent to trigger a new port scan. */
  SCAN: 'scan',
  
  /** Inbound HTTP call to be proxied to a local engine. */
  REQ: 'request',
  /** Heartbeat message to maintain connection. */
  PING: 'ping'
};

/**
 * Creates a stringified JSON message for the protocol.
 * @param {string} type - One of MSG_TYPES.
 * @param {object} [payload={}] - The data to send.
 * @returns {string} The stringified JSON message.
 */
export function createMessage(type, payload = {}) {
  return JSON.stringify({ type, payload });
}

/**
 * Parses a protocol message string safely.
 * @param {string} data - The raw message data from the WebSocket.
 * @returns {object} The parsed message or an unknown type on failure.
 */
export function parseMessage(data) {
  try {
    return JSON.parse(data);
  } catch (e) {
    return { type: 'unknown', payload: {} };
  }
}
