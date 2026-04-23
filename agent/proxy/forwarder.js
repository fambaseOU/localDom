import axios from 'axios';
import { MSG_TYPES } from '../../common/protocol.js';

export async function forwardToLocal(req, tunnel, engine, memory) {
  const { requestId, method, url, body, headers } = req;
  const sessionId = headers['x-localdom-session'];
  
  // 🛡️ Security: Scrub auth headers before hitting local LLM
  const scrubbedHeaders = { ...headers };
  delete scrubbedHeaders['x-localdom-key'];
  delete scrubbedHeaders['authorization'];
  
  let finalBody = body;

  // Memory Injection for Chat Completions
  if (sessionId && url.includes('/chat/completions') && body?.messages) {
    const history = memory.getHistory(sessionId);
    finalBody = { ...body, messages: [...history, ...body.messages] };
    // Add current user message to memory
    body.messages.forEach(m => memory.addMessage(sessionId, m));
  }

  const targetUrl = `http://localhost:${engine.port}${url}`;
  try {
    const res = await axios({
      method, url: targetUrl, data: finalBody, headers: scrubbedHeaders, responseType: 'stream'
    });

    let fullResponse = '';
    res.data.on('data', chunk => {
      const str = chunk.toString();
      fullResponse += str;
      tunnel.sendResponse(MSG_TYPES.RES_CHUNK, { requestId, chunk: str });
    });

    res.data.on('end', () => {
      // Store AI response in memory (if it's a valid session)
      if (sessionId && fullResponse.includes('"content"')) {
        try {
          const parsed = JSON.parse(fullResponse);
          const aiMsg = parsed.choices?.[0]?.message;
          if (aiMsg) memory.addMessage(sessionId, aiMsg);
        } catch (e) {} // Handle potential partial stream parsing errors
      }
      tunnel.sendResponse(MSG_TYPES.RES_END, { requestId });
    });
  } catch (err) {
    tunnel.sendResponse(MSG_TYPES.RES_ERROR, { 
      requestId, error: err.message, status: err.response?.status || 500 
    });
  }
}
