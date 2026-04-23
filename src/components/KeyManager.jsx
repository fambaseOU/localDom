import { useState } from 'react'
import { Key, Plus, Copy, Check, Eye, EyeOff } from 'lucide-react'

export default function KeyManager({ keys, onUpdate }) {
  const [copiedKey, setCopiedKey] = useState(null);
  const [revealedKeys, setRevealedKeys] = useState({});

  const toggleReveal = (key) => {
    setRevealedKeys(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const createKey = async () => {
    const name = prompt('Enter a name for this key:');
    if (!name) return;
    await fetch('/api/keys', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    onUpdate();
  };

  const copyToClipboard = (key) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3><Key size={18} /> API Keys</h3>
        <button className="icon-btn" onClick={createKey}><Plus size={18} /></button>
      </div>
      <div className="key-list">
        {keys.map(k => (
          <div key={k.key} className="key-item-v2">
            <div className="key-main">
              <strong>{k.owner}</strong>
              <div className="key-display">
                <code>{revealedKeys[k.key] ? k.key : `${k.key.slice(0, 10)}...`}</code>
              </div>
            </div>
            <div className="key-actions">
              <button className="icon-btn-ghost" onClick={() => toggleReveal(k.key)}>
                {revealedKeys[k.key] ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
              <button className="icon-btn-ghost" onClick={() => copyToClipboard(k.key)}>
                {copiedKey === k.key ? <Check size={16} color="#30d158" /> : <Copy size={16} />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
