import { Terminal, X } from 'lucide-react'

export default function RequestInspector({ log, onClose }) {
  if (!log) return null;

  return (
    <div className="inspector-overlay">
      <div className="inspector-panel">
        <div className="inspector-header">
          <h3><Terminal size={18} /> Request Inspector</h3>
          <button className="icon-btn-dim" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="inspector-meta">
          <span>{log.method}</span>
          <code>{log.url}</code>
          <span className="engine-tag">{log.engine}</span>
        </div>
        <div className="inspector-body">
          <label>Payload Snapshot</label>
          <pre>{log.payload || 'No data captured'}</pre>
        </div>
      </div>
    </div>
  )
}
