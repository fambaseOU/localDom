import { useState } from 'react'
import { Server, Key, Copy, Check, Globe } from 'lucide-react'

export default function Integrations({ currentKey }) {
  const [copiedField, setCopiedField] = useState(null);
  const protocol = window.location.protocol;
  const baseUrl = `${protocol}//${window.location.host}/api`;

  const copy = (val, field) => {
    navigator.clipboard.writeText(val);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const fields = [
    { id: 'url', label: 'External Gateway URL', value: baseUrl, icon: Globe },
    { id: 'key', label: 'Secret API Key', value: currentKey, icon: Key }
  ];

  return (
    <div className="integrations-view fade-in">
      <div className="setup-grid">
        <div className="credential-stack">
          <h3>Connection Credentials</h3>
          <p className="subtext">Use these to connect any OpenAI-compatible client to your local machine.</p>
          
          <div className="fields-container">
            {fields.map(f => (
              <div key={f.id} className="credential-card">
                <div className="cred-icon"><f.icon size={20} /></div>
                <div className="cred-details">
                  <label>{f.label}</label>
                  <code>{f.value}</code>
                </div>
                <button className="icon-btn-ghost" onClick={() => copy(f.value, f.id)}>
                  {copiedField === f.id ? <Check size={18} color="#30d158" /> : <Copy size={18} />}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="routing-guide card">
          <h3>Routing Endpoints</h3>
          <p className="subtext">Append these paths to your Gateway URL to reach specific local engines.</p>
          <div className="route-list">
            <div className="route-item">
              <strong>Ollama</strong>
              <code>/ollama/v1</code>
            </div>
            <div className="route-item">
              <strong>LM Studio</strong>
              <code>/lmstudio/v1</code>
            </div>
            <div className="route-item">
              <strong>vLLM</strong>
              <code>/vllm/v1</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
