/**
 * Known LLM Runner configurations
 */
export const SERVICES = [
  { name: 'Ollama', port: 11434, endpoint: '/api/tags', type: 'ollama' },
  { name: 'LM Studio', port: 1234, endpoint: '/v1/models', type: 'openai' },
  { name: 'vLLM', port: 8000, endpoint: '/v1/models', type: 'openai' },
  { name: 'LocalAI', port: 8080, endpoint: '/v1/models', type: 'openai' },
  { name: 'TabbyML', port: 5001, endpoint: '/health', type: 'tabby' }
];

export const SCAN_TIMEOUT = 2000;
