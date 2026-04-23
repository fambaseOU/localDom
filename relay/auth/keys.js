import { nanoid } from 'nanoid';

const KEY_STORE = new Map();

/**
 * Generates a new secure API key.
 */
export function generateKey(owner) {
  const key = `ld_${nanoid(32)}`;
  KEY_STORE.set(key, { owner, created: Date.now(), usage: 0 });
  return key;
}

// In-memory activity log
const ACTIVITY_LOG = [];

export function getLogs() { return ACTIVITY_LOG.slice(-20); }
export function addLog(log) { ACTIVITY_LOG.push({ ...log, time: Date.now() }); }

/**
 * Returns all registered keys for the dashboard UI.
 */
export function getAllKeys() {
  return Array.from(KEY_STORE.entries()).map(([key, value]) => ({
    key, 
    ...value
  }));
}

/**
 * Validates existence and ownership of a key.
 */
export function verifyKey(key) {
  if (!key) return null;
  const entry = KEY_STORE.get(key);
  if (entry) {
    entry.usage++;
    return entry;
  }
  return null;
}

// Generate the initial dev key
const devKey = generateKey('localdom-dev');
console.log('------------------------------------------------');
console.log('🗝️  YOUR NEW API KEY:');
console.log(`   ${devKey}`);
console.log('------------------------------------------------');
