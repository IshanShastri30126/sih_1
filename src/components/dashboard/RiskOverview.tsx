import React, { useState, useEffect } from 'react';
import { MetricCard } from '../common/MetricCard';
import { WeatherMap } from '../maps/WeatherMap';
import { MapLayerControl } from '../maps/MapLayerControl';
import { MapLegend } from '../maps/MapLegend';
import { AIWeatherBrief } from '../ai/AIWeatherBrief';
import { StatusBadge } from '../common/StatusBadge';
import { MOCK_ANOMALIES } from '../../data/mockWeatherData';
import { useWeatherStore } from '../../stores/weatherStore';
import { 
  Flame, 
  Database, 
  Compass, 
  Layers, 
  ShieldCheck, 
  ArrowRight,
  Activity,
  Radio,
  Wind,
  Droplets,
  Gauge,
  Thermometer
} from 'lucide-react';

interface StationFeed {
  id: string;
  name: string;
  temp: number;
  windSpeed: number;
  precipitation: number;
  condition: string;
  status: string;
}

export const RiskOverview: React.FC = () => {
  const { 
    setSelectedAnomalyId, 
    setCurrentPage, 
    selectedAnomalyId, 
    setEventDrawerOpen,
    theme,
    user
  } = useWeatherStore();

  const isDark = theme === 'dark';
  const extremeCount = MOCK_ANOMALIES.filter(a => a.severity === 'extreme').length;

  const [liveStations, setLiveStations] = useState<StationFeed[]>([]);

  useEffect(() => {
    fetch('/api/weather/stations')
      .then(r => r.json())
      .then(d => {
        if (d.stations) setLiveStations(d.stations);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      {/* ── Operational Command Console Header ── */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
        <div>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-mono font-semibold uppercase tracking-wider ${isDark ? 'text-cyan-400' : 'text-blue-600'}`}>
              Operational Command Console
            </span>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
              isDark 
                ? 'bg-cyan-950/80 text-cyan-300 border-cyan-500/30' 
                : 'bg-blue-50 text-blue-700 border-blue-200'
            }`}>
              NCMRWF • IMD Doppler Operational Feed
            </span>
            {user?.role && (
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                user.role === 'Admin' 
                  ? 'bg-purple-100 text-purple-700 border-purple-200' 
                  : user.role === 'Senior Forecaster'
                    ? 'bg-blue-100 text-blue-700 border-blue-200'
                    : 'bg-emerald-100 text-emerald-700 border-emerald-200'
              }`}>
                {user.role} Active
              </span>
            )}
          </div>
          <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Weather Intelligence & Early Warning
          </h1>
          <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Multi-model 23-ensemble consensus • Selective 5 km downscaling • Thermodynamic physics validation
          </p>
        </div>

        {/* Live Warning Level Banner */}
        <div className={`flex items-center gap-3 rounded-2xl p-3.5 shadow-lg border self-start sm:self-auto ${
          isDark 
            ? 'bg-rose-950/30 border-rose-500/40 shadow-rose-950/30' 
            : 'bg-rose-50 border-rose-300 shadow-rose-100'
        }`}>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/20 text-rose-500 border border-rose-500/40">
            <Flame className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-rose-600 font-bold">
              National Severe Weather Alert
            </div>
            <div className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              RED ALERT: South Gujarat & Saurashtra Coast
            </div>
          </div>
        </div>
      </div>

      {/* ── Top KPI Row ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <MetricCard
          label="Active Risks"
          value="07"
          subtext="Subcontinental anomalies"
          badge="3 RED"
          badgeType="danger"
          accentColor="red"
          onClick={() => setCurrentPage('anomalies')}
        />

        <MetricCard
          label="Extreme Hotspots"
          value={`0${extremeCount}`}
          subtext="Selective 5km zones"
          badge="High Priority"
          badgeType="warning"
          accentColor="amber"
          onClick={() => setCurrentPage('downscaling')}
        />

        <MetricCard
          label="Highest Risk"
          value="92%"
          subtext="Arabian Sea Cyclone Track"
          badge="Ensemble 21/23"
          badgeType="danger"
          accentColor="red"
          onClick={() => setCurrentPage('tracking')}
        />

        <MetricCard
          label="Downscaled Peak"
          value="294 mm"
          subtext="vs 142mm coarse model"
          badge="+107% Recovered"
          badgeType="info"
          accentColor="cyan"
          onClick={() => setCurrentPage('downscaling')}
        />

        <MetricCard
          label="Physics Validation"
          value="99.2%"
          subtext="Clausius-Clapeyron check"
          badge="PASSED"
          badgeType="success"
          accentColor="emerald"
          onClick={() => setCurrentPage('pipeline')}
        />
      </div>

      {/* ── Real-Time Weather Station Live Telemetry Ticker ── */}
      <div className={`rounded-xl border p-2.5 flex items-center gap-3 overflow-hidden ${
        isDark ? 'bg-slate-900/60 border-slate-800 text-slate-300' : 'bg-blue-50/50 border-blue-200 text-slate-700'
      }`}>
        <div className="flex items-center gap-1.5 shrink-0 px-2 py-0.5 rounded-lg bg-blue-600 text-white text-[10px] font-mono font-bold">
          <Radio className="w-3 h-3 animate-pulse" />
          <span>LIVE STATIONS</span>
        </div>
        <div className="flex items-center gap-4 overflow-x-auto text-xs whitespace-nowrap scrollbar-none py-0.5">
          {(liveStations.length > 0 ? liveStations : [
            { id: '1', name: 'Dwarka Radar', temp: 27.2, windSpeed: 68.4, precipitation: 84.6, condition: 'Heavy Rain' },
            { id: '2', name: 'New Delhi', temp: 31.4, windSpeed: 14.5, precipitation: 0.0, condition: 'Partly Cloudy' },
            { id: '3', name: 'Mumbai Colaba', temp: 29.8, windSpeed: 28.2, precipitation: 12.4, condition: 'Moderate Rain' },
            { id: '4', name: 'Bhubaneswar', temp: 28.4, windSpeed: 22.4, precipitation: 22.8, condition: 'Thunderstorm' },
            { id: '5', name: 'Kolkata', temp: 30.6, windSpeed: 18.0, precipitation: 4.2, condition: 'Showers' },
            { id: '6', name: 'Chennai', temp: 32.1, windSpeed: 16.2, precipitation: 0.0, condition: 'Humid' },
            { id: '7', name: 'Shimla Ridge', temp: 16.4, windSpeed: 24.5, precipitation: 14.2, condition: 'Orographic' },
          ]).map(stn => (
            <div key={stn.id} className="flex items-center gap-1.5 shrink-0">
              <span className="font-semibold text-slate-800 dark:text-slate-200">{stn.name}:</span>
              <span className="font-mono font-bold text-blue-600 dark:text-cyan-400">{stn.temp}°C</span>
              <span className="text-[11px] text-slate-500">({stn.windSpeed} km/h)</span>
              <span className="text-slate-300 dark:text-slate-700">|</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Interactive Leaflet Weather Map & Overlays ── */}
      <div className="relative">
        <WeatherMap />
        <MapLayerControl />
        <MapLegend />
      </div>

      {/* ── AI Weather Brief Card ── */}
      <AIWeatherBrief />

      {/* ── Four Core Pillars Quick Cards ── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className={`text-xs font-mono uppercase tracking-wider font-bold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Operational Framework Verification
          </h3>
          <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            Full physical pipeline operational
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* 1. 23 Forecast Runs */}
          <div 
            onClick={() => setCurrentPage('forecasts')}
            className={`group p-4 rounded-2xl border cursor-pointer transition-all space-y-2 backdrop-blur-md ${
              isDark 
                ? 'border-slate-800 bg-slate-900/70 hover:border-cyan-500/40 hover:bg-slate-850' 
                : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-md'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-blue-600 dark:text-cyan-400 uppercase font-bold">01 • ENSEMBLE</span>
              <Database className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
            </div>
            <h4 className={`text-sm font-bold group-hover:text-blue-600 transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>
              23 Forecast Runs
            </h4>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Evaluates 23 perturbed NCMRWF ensemble members to calculate genuine physical probability and avoid false alarms.
            </p>
          </div>

          {/* 2. GNN Storm Tracking */}
          <div 
            onClick={() => setCurrentPage('tracking')}
            className={`group p-4 rounded-2xl border cursor-pointer transition-all space-y-2 backdrop-blur-md ${
              isDark 
                ? 'border-slate-800 bg-slate-900/70 hover:border-cyan-500/40 hover:bg-slate-850' 
                : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-md'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-indigo-600 dark:text-blue-400 uppercase font-bold">02 • TRACKING</span>
              <Compass className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
            </div>
            <h4 className={`text-sm font-bold group-hover:text-indigo-600 transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>
              AI Storm Tracking
            </h4>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Spatio-Temporal Graph Neural Networks trace how the anomaly moves across Indian basins with a 7-day cone of uncertainty.
            </p>
          </div>

          {/* 3. 12km -> 5km Downscaling */}
          <div 
            onClick={() => setCurrentPage('downscaling')}
            className={`group p-4 rounded-2xl border cursor-pointer transition-all space-y-2 backdrop-blur-md ${
              isDark 
                ? 'border-slate-800 bg-slate-900/70 hover:border-cyan-500/40 hover:bg-slate-850' 
                : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-md'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-rose-600 dark:text-rose-400 uppercase font-bold">03 • DOWNSCALING</span>
              <Layers className="w-4 h-4 text-slate-400 group-hover:text-rose-600 transition-colors" />
            </div>
            <h4 className={`text-sm font-bold group-hover:text-rose-600 transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>
              12 km → 5 km AI
            </h4>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Selectively downscales high-risk regions with Conditional Latent Diffusion, preserving localized 294mm peak deluges with 88% compute savings.
            </p>
          </div>

          {/* 4. Physics Checks & Human Verification */}
          <div 
            onClick={() => setCurrentPage('alerts')}
            className={`group p-4 rounded-2xl border cursor-pointer transition-all space-y-2 backdrop-blur-md ${
              isDark 
                ? 'border-slate-800 bg-slate-900/70 hover:border-cyan-500/40 hover:bg-slate-850' 
                : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-md'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 uppercase font-bold">04 • VERIFICATION</span>
              <ShieldCheck className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
            </div>
            <h4 className={`text-sm font-bold group-hover:text-emerald-600 transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Forecaster Verification
            </h4>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Thermodynamic consistency validation ensures physical plausibility, while senior meteorologists hold final sign-off authority.
            </p>
          </div>
        </div>
      </div>

      {/* ── Active Anomalies Rapid Inspection List ── */}
      <div className={`rounded-2xl border p-5 backdrop-blur-md space-y-4 ${
        isDark ? 'border-slate-800 bg-slate-900/80' : 'border-slate-200 bg-white shadow-sm'
      }`}>
        <div className={`flex items-center justify-between border-b pb-3 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
          <div>
            <h3 className={`text-sm font-bold font-mono uppercase tracking-wide ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Active Regional Hazards Queue ({MOCK_ANOMALIES.length})
            </h3>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Click any anomaly to inspect localized 5km risk footprint and dispatch sirens
            </p>
          </div>

          <button
            onClick={() => setCurrentPage('anomalies')}
            className="text-xs font-semibold text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-1 transition-colors"
          >
            <span>View All Hazards</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {MOCK_ANOMALIES.slice(0, 6).map((anomaly) => {
            const isSelected = selectedAnomalyId === anomaly.id;

            return (
              <div
                key={anomaly.id}
                onClick={() => {
                  setSelectedAnomalyId(anomaly.id);
                  setEventDrawerOpen(true);
                }}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all text-xs space-y-2 ${
                  isSelected 
                    ? isDark 
                      ? 'bg-slate-950 border-cyan-400 ring-2 ring-cyan-500/20' 
                      : 'bg-blue-50 border-blue-500 ring-2 ring-blue-500/20'
                    : isDark 
                      ? 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900' 
                      : 'bg-slate-50 border-slate-200 hover:border-blue-200 hover:bg-blue-50/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <StatusBadge severity={anomaly.severity} size="sm" />
                  <span className="font-mono text-blue-600 dark:text-cyan-400 font-bold">
                    EFI: {anomaly.efi}
                  </span>
                </div>

                <div>
                  <div className={`font-bold truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>{anomaly.name}</div>
                  <div className={`text-[11px] truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{anomaly.district}, {anomaly.state}</div>
                </div>

                <div className={`flex items-center justify-between pt-1 border-t font-mono text-[11px] ${
                  isDark ? 'border-slate-800/80 text-slate-400' : 'border-slate-200 text-slate-500'
                }`}>
                  <span>Lead: +{anomaly.forecastLeadTimeDays}d</span>
                  <span>Agreement: {anomaly.ensembleAgreement.matchingRuns}/23</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
