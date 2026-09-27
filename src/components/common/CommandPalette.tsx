import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Map, 
  CloudRain, 
  Activity, 
  Compass, 
  Layers, 
  ShieldAlert, 
  BellRing, 
  Cpu, 
  Database, 
  History, 
  Play, 
  X,
  ArrowRight
} from 'lucide-react';
import { useWeatherStore, AppPage } from '../../stores/weatherStore';
import { MOCK_ANOMALIES } from '../../data/mockWeatherData';

export const CommandPalette: React.FC = () => {
  const { 
    isCommandPaletteOpen, 
    setCommandPaletteOpen, 
    setCurrentPage, 
    setSelectedAnomalyId,
    setDemoMode,
    setDemoStep
  } = useWeatherStore();

  const [query, setQuery] = useState('');

  // Handle Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!isCommandPaletteOpen);
      }
      if (e.key === 'Escape' && isCommandPaletteOpen) {
        setCommandPaletteOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, setCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const navigationItems: { name: string; page: AppPage; icon: any; category: string }[] = [
    { name: 'Weather Intelligence Overview', page: 'dashboard', icon: Activity, category: 'Navigation' },
    { name: 'Live Geospatial Intelligence', page: 'intelligence', icon: Map, category: 'Navigation' },
    { name: '23-Run Ensemble Analysis', page: 'forecasts', icon: CloudRain, category: 'Navigation' },
    { name: 'Extreme Weather Anomalies', page: 'anomalies', icon: AlertTriangleIcon, category: 'Navigation' },
    { name: 'Storm Tracking & Trajectory', page: 'tracking', icon: Compass, category: 'Navigation' },
    { name: '12km → 5km Hotspot Downscaling', page: 'downscaling', icon: Layers, category: 'Navigation' },
    { name: 'Multi-Sector Impact Analysis', page: 'impact', icon: ShieldAlert, category: 'Navigation' },
    { name: 'Alert Approval Center & Composer', page: 'alerts', icon: BellRing, category: 'Navigation' },
    { name: 'Forecast Pipeline Trace', page: 'pipeline', icon: Activity, category: 'Navigation' },
    { name: 'Historical Event Validation', page: 'historical', icon: History, category: 'Navigation' },
    { name: 'AI Model Monitoring', page: 'monitoring', icon: Cpu, category: 'Navigation' },
    { name: 'Data Sources (NEPS-G, IMD)', page: 'data-sources', icon: Database, category: 'Navigation' },
  ];

  function AlertTriangleIcon(props: any) {
    return <ShieldAlert {...props} />;
  }

  const filteredNav = navigationItems.filter(item => 
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  const filteredAnomalies = MOCK_ANOMALIES.filter(a => 
    a.name.toLowerCase().includes(query.toLowerCase()) ||
    a.region.toLowerCase().includes(query.toLowerCase()) ||
    a.district.toLowerCase().includes(query.toLowerCase()) ||
    a.hazard.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelectPage = (page: AppPage) => {
    setCurrentPage(page);
    setCommandPaletteOpen(false);
  };

  const handleSelectAnomaly = (anomalyId: string) => {
    setSelectedAnomalyId(anomalyId);
    setCurrentPage('dashboard');
    setCommandPaletteOpen(false);
  };

  const handleStartDemo = () => {
    setDemoMode(true);
    setDemoStep(0);
    setCurrentPage('dashboard');
    setCommandPaletteOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-900 shadow-2xl ring-1 ring-cyan-500/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center border-b border-slate-800 px-4 py-3 bg-slate-900/90">
          <Search className="w-5 h-5 text-cyan-400 mr-3" />
          <input
            type="text"
            placeholder="Search forecasts, locations, hazards, models, or command... (e.g. Gujarat, Downscaling, Demo)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none font-sans"
          />
          <button 
            onClick={() => setCommandPaletteOpen(false)}
            className="rounded p-1 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4">
          {/* Quick SIH Demo Action */}
          <div className="bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-purple-950/20 border border-cyan-500/30 rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-300">
                <Play className="w-4 h-4 fill-cyan-400" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white">Start 3-Minute SIH Presentation Tour</div>
                <div className="text-[11px] text-slate-400">Automated end-to-end walk from Detection to Multilingual Alert</div>
              </div>
            </div>
            <button
              onClick={handleStartDemo}
              className="text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
            >
              <span>Launch Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Anomalies Match */}
          {filteredAnomalies.length > 0 && (
            <div>
              <div className="text-[11px] font-mono uppercase text-slate-400 px-2 mb-1.5 flex items-center justify-between">
                <span>Active Anomalies & Hotspots</span>
                <span className="text-[10px] text-slate-500">{filteredAnomalies.length} found</span>
              </div>
              <div className="space-y-1">
                {filteredAnomalies.map((anomaly) => (
                  <button
                    key={anomaly.id}
                    onClick={() => handleSelectAnomaly(anomaly.id)}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-800/80 transition-colors text-left group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                      <div>
                        <div className="text-xs font-medium text-slate-200 group-hover:text-cyan-300">
                          {anomaly.name}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {anomaly.district}, {anomaly.state} • Lead: +{anomaly.forecastLeadTimeDays}d • EFI: {anomaly.efi}
                        </div>
                      </div>
                    </div>
                    <span className="text-[11px] text-cyan-400/80 font-mono">
                      {anomaly.probability}% Risk →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Views */}
          <div>
            <div className="text-[11px] font-mono uppercase text-slate-400 px-2 mb-1.5">
              Command Views & Modules
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {filteredNav.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => handleSelectPage(item.page)}
                    className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-800/80 border border-transparent hover:border-slate-700/60 transition-all text-left group"
                  >
                    <div className="p-1.5 rounded-md bg-slate-800 text-slate-400 group-hover:text-cyan-400 group-hover:bg-cyan-500/10">
                      <ItemIcon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-medium text-slate-300 group-hover:text-white">
                      {item.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer shortcuts */}
        <div className="border-t border-slate-800 bg-slate-950/70 px-4 py-2 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span>MausamDrishti AI Operational Command v2.4</span>
        </div>
      </div>
    </div>
  );
};
