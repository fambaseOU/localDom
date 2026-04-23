import { Box, RefreshCw } from 'lucide-react'
import { useState } from 'react'

export default function EngineList({ engines }) {
  const [scanning, setScanning] = useState(false);

  const triggerScan = async () => {
    setScanning(true);
    try {
      await fetch('/api/scan', { method: 'POST' });
      // The interval in App.jsx will pick up the results soon
    } catch (err) { console.error('Scan failed'); }
    setTimeout(() => setScanning(false), 2000);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3><Box size={18} /> Active Engines & Models</h3>
        <button 
          className={`icon-btn-ghost ${scanning ? 'spin' : ''}`} 
          onClick={triggerScan}
          title="Rescan System"
        >
          <RefreshCw size={18} />
        </button>
      </div>
      <div className="engine-grid">
        {engines.map(e => (
          <div key={e.port} className="engine-item-v2">
            <div className="engine-header">
              <strong>{e.name}</strong>
              <code>:{e.port}</code>
            </div>
            <div className="model-tags">
              {e.models?.map(m => (
                <span key={m} className="model-tag">{m}</span>
              ))}
              {(!e.models || e.models.length === 0) && <span className="no-models">Scanning...</span>}
            </div>
          </div>
        ))}
        {engines.length === 0 && <div className="empty">No engines detected. Click rescan.</div>}
      </div>
    </div>
  )
}
