import assert from 'assert';
import { verifyKey, generateKey } from '../relay/auth/keys.js';
import { MemoryManager } from '../agent/memory/manager.js';
import { MSG_TYPES, createMessage, parseMessage } from '../common/protocol.js';
import fs from 'fs/promises';
import path from 'path';

async function runTests() {
  console.log('🧪 Starting LocalDom Core Test Suite...\n');

  try {
    // 1. Auth Tests
    console.log('--- [Auth System] ---');
    const testKey = generateKey('Test User');
    assert.ok(testKey.startsWith('ld_'), 'Generated key should have ld_ prefix');
    assert.ok(verifyKey(testKey), 'Generated key should be verifiable');
    assert.strictEqual(verifyKey('invalid-key'), null, 'Invalid key should be rejected');
    console.log('✅ Auth tests passed');

    // 2. Protocol Tests
    console.log('\n--- [Protocol Logic] ---');
    const payload = { foo: 'bar', secret: 123 };
    const rawMsg = createMessage(MSG_TYPES.REQ, payload);
    const parsed = parseMessage(rawMsg);
    assert.strictEqual(parsed.type, MSG_TYPES.REQ, 'Message type should be preserved');
    assert.deepStrictEqual(parsed.payload, payload, 'Payload should be identical');
    console.log('✅ Protocol tests passed');

    // 3. Memory Manager Tests
    console.log('\n--- [Memory Manager] ---');
    const testDb = path.join(process.cwd(), 'tests/test_memory.json');
    const memory = new MemoryManager(testDb);
    
    const sessId = 'test-session';
    const msg = { role: 'user', content: 'test message' };
    
    memory.addMessage(sessId, msg);
    const history = memory.getHistory(sessId);
    assert.strictEqual(history.length, 1, 'History should have 1 message');
    assert.deepStrictEqual(history[0], msg, 'Message content should match');
    
    await memory.save();
    // Small delay to ensure disk flush on some systems
    await new Promise(r => setTimeout(r, 100));
    const stats = await fs.stat(testDb);
    assert.ok(stats.size > 0, 'Memory file should be created and not empty');
    
    // Cleanup
    await fs.unlink(testDb);
    console.log('✅ Memory tests passed');

    console.log('\n🎉 ALL CORE TESTS PASSED SUCCESSFULLY!');
    process.exit(0);
  } catch (err) {
    console.error('\n❌ TEST FAILED:');
    console.error(err);
    process.exit(1);
  }
}

runTests();
