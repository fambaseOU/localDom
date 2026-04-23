import { useState, useEffect } from 'react'
import Header from './components/Header'
import StatsGrid from './components/StatsGrid'
import EngineList from './components/EngineList'
import KeyManager from './components/KeyManager'
import ActivityLog from './components/ActivityLog'
import Integrations from './components/Integrations'
import RequestInspector from './components/RequestInspector'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('monitor');
  const [data, setData] = useState({ online: false, tunnels: 0, engines: [], keys: [], logs: [] });
  const [selectedLog, setSelectedLog] = useState(null);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/status');
      const json = await res.json();
      setData(json);
    } catch (err) { console.error('Offline'); }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app-container">
      <div className="glass-panel">
        <Header online={data.online} activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="dashboard-content animate-in">
          <StatsGrid stats={{ tunnels: data?.tunnels || 0, requests: data?.logs?.length || 0 }} />
          
          <div className="tab-contents">
            {activeTab === 'monitor' && (
              <div className="dashboard-grid fade-in">
                <EngineList engines={data?.engines || []} />
                <ActivityLog logs={data?.logs || []} onSelect={setSelectedLog} />
              </div>
            )}
            
            {activeTab === 'security' && (
              <div className="fade-in">
                <KeyManager keys={data?.keys || []} onUpdate={fetchData} />
              </div>
            )}

            {activeTab === 'integrations' && (
              <div className="fade-in">
                <Integrations currentKey={data?.keys[0]?.key || 'YOUR_API_KEY'} />
              </div>
            )}
          </div>
        </main>
      </div>
      <RequestInspector log={selectedLog} onClose={() => setSelectedLog(null)} />
    </div>
  )
}

export default App
