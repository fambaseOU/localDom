import { Activity, Shield, Code, Zap } from 'lucide-react'

export default function Header({ online, activeTab, setActiveTab }) {
  const tabs = [
    { id: 'monitor', label: 'Monitor', icon: Zap },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'integrations', label: 'Integrations', icon: Code },
  ];

  return (
    <div className="header-wrapper">
      <header className="main-header">
        <div className="logo-section">
          <Activity color="#5e5ce6" size={24} />
          <h1>LocalDom <span>v2.3</span></h1>
        </div>
        <div className={`status-badge ${online ? 'online' : 'offline'}`}>
          {online ? '● RELAY ACTIVE' : '○ DISCONNECTED'}
        </div>
      </header>

      <nav className="tab-nav">
        {tabs.map(tab => (
          <button 
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  )
}
