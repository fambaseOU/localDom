import axios from 'axios';
import { SERVICES, SCAN_TIMEOUT } from './services.js';

async function probe(candidate) {
  try {
    const url = `http://localhost:${candidate.port}${candidate.endpoint}`;
    const res = await axios.get(url, { timeout: SCAN_TIMEOUT });
    
    // Deep Discovery: Fetch specific models for Ollama
    let models = [];
    if (candidate.type === 'ollama') {
      const tagsRes = await axios.get(`http://localhost:${candidate.port}/api/tags`);
      models = tagsRes.data.models?.map(m => m.name) || [];
    }
    
    return res.status === 200 ? { ...candidate, status: 'online', models } : null;
  } catch {
    return null;
  }
}

/**
 * Scans for local LLMs and returns active services.
 */
export async function runScanner() {
  console.log('🔍 Scanning ports for LLM runners...');
  const results = await Promise.all(SERVICES.map(s => probe(s)));
  const active = results.filter(Boolean);
  
  active.forEach(s => console.log(`✅ Found ${s.name} on ${s.port}`));
  return active;
}

// CLI Execution
if (process.argv[1].endsWith('scanner.js')) {
  runScanner();
}
