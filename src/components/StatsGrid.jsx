export default function StatsGrid({ stats }) {
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <label>Active Tunnels</label>
        <div className="value">{stats?.tunnels || 0}</div>
      </div>
      <div className="stat-card">
        <label>Request Volume</label>
        <div className="value">{stats?.requests || 0}</div>
      </div>
    </div>
  )
}
