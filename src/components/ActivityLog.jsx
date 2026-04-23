import { List, Eye } from 'lucide-react'

export default function ActivityLog({ logs, onSelect }) {
  return (
    <div className="card" style={{ marginTop: '24px' }}>
      <h3><List size={18} /> Activity Log</h3>
      <div className="log-list">
        {logs.length === 0 && <div className="empty">No recent activity</div>}
        {logs.map((log, i) => (
          <div key={i} className="log-item interactive" onClick={() => onSelect(log)}>
            <div className="log-main">
              <span className="method">{log.method}</span>
              <span className="url">{log.url}</span>
            </div>
            <div className="log-meta">
              <span className="engine-tag">{log.engine}</span>
              <Eye size={14} style={{ marginLeft: '8px', opacity: 0.5 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
