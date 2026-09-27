import React, { useState } from 'react';
import { MOCK_ANOMALIES } from '../../data/mockWeatherData';
import { useWeatherStore } from '../../stores/weatherStore';
import { StatusBadge } from '../common/StatusBadge';
import { 
  AlertTriangle, 
  Flame, 
  TrendingUp, 
  Clock, 
  MapPin, 
  Users, 
  CheckCircle2, 
  Layers, 
  ExternalLink,
  Filter,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from 'lucide-react';

export const AnomalyDetectionView: React.FC = () => {
  const { 
    setSelectedAnomalyId, 
    setCurrentPage, 
    selectedAnomalyId,
    setEventDrawerOpen 
  } = useWeatherStore();

  const [selectedHazard, setSelectedHazard] = useState<string>('All');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const hazards = ['All', 'Heavy Rainfall', 'Tropical Cyclone', 'Cloudburst', 'Urban Flash Flood'];
  const severities = ['All', 'extreme', 'warning', 'watch'];

  const filtered = MOCK_ANOMALIES.filter(item => {
    if (selectedHazard !== 'All' && item.hazard !== selectedHazard) return false;
    if (selectedSeverity !== 'All' && item.severity !== selectedSeverity) return false;
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase()) && !item.district.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-rose-400">
              Climatological Departure Engine
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              Reference: 40-Year IMDAA Reanalysis
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white mt-1">
            Extreme Weather Anomalies & Hotspots
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Machine-detected tail departures across 23 ensemble members exceeding 99th percentile thresholds
          </p>
        </div>

        {/* Counter badge */}
        <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-4 py-2 rounded-2xl text-xs font-mono">
          <Flame className="w-4 h-4 text-rose-500 animate-pulse" />
          <span className="text-white font-bold">{filtered.length} Extreme Anomalies Tracked</span>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Box */}
          <div className="relative w-48 sm:w-60">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by district or hazard..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Hazard Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-mono">Hazard:</span>
            <select
              value={selectedHazard}
              onChange={(e) => setSelectedHazard(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-slate-200 focus:outline-none"
            >
              {hazards.map(h => <option key={h} value={h}>{h}</option>)}
            </select>
          </div>

          {/* Severity Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-mono">Severity:</span>
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-slate-200 focus:outline-none"
            >
              {severities.map(s => <option key={s} value={s}>{s.toUpperCase()}</option>)}
            </select>
          </div>
        </div>

        <span className="text-slate-500 font-mono text-[11px]">
          Sorted by: EFI Index (Descending)
        </span>
      </div>

      {/* Anomaly Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((anomaly) => {
          const isSelected = selectedAnomalyId === anomaly.id;

          const trendIcon = anomaly.trend === 'intensifying' 
            ? <ArrowUpRight className="w-3.5 h-3.5 text-rose-400" />
            : anomaly.trend === 'weakening'
            ? <ArrowDownRight className="w-3.5 h-3.5 text-teal-400" />
            : <Minus className="w-3.5 h-3.5 text-slate-400" />;

          return (
            <div
              key={anomaly.id}
              onClick={() => setSelectedAnomalyId(anomaly.id)}
              className={`rounded-2xl border p-5 backdrop-blur-md transition-all duration-200 flex flex-col justify-between cursor-pointer group ${
                isSelected 
                  ? 'bg-slate-900 border-cyan-400 ring-2 ring-cyan-500/20 shadow-xl shadow-cyan-950/30' 
                  : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
              }`}
            >
              <div className="space-y-3">
                {/* Top Badge & EFI Row */}
                <div className="flex items-center justify-between">
                  <StatusBadge severity={anomaly.severity} size="sm" />
                  <div className="flex items-center gap-1 font-mono text-xs">
                    <span className="text-slate-400">Trend:</span>
                    <span className="text-slate-200 capitalize flex items-center gap-0.5">
                      {trendIcon}
                      {anomaly.trend}
                    </span>
                  </div>
                </div>

                {/* Title & Location */}
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                    {anomaly.hazard}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span className="font-semibold text-slate-300">{anomaly.district}, {anomaly.state}</span>
                  </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 gap-2 font-mono text-xs pt-1">
                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase">Extreme Index (EFI)</span>
                    <div className="text-base font-bold text-amber-400 mt-0.5">{anomaly.efi}</div>
                    <span className="text-[9px] text-slate-500">SOT: +{anomaly.sot}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase">AI Probability</span>
                    <div className="text-base font-bold text-cyan-400 mt-0.5">{anomaly.probability}%</div>
                    <span className="text-[9px] text-emerald-400 font-sans">High Confidence</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase">Forecast Window</span>
                    <div className="text-xs font-bold text-purple-400 mt-0.5">+{anomaly.forecastLeadTimeDays} Days</div>
                    <span className="text-[9px] text-slate-500 font-sans truncate block">{anomaly.forecastLeadWindow.slice(0, 14)}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase">Ensemble Agreement</span>
                    <div className="text-xs font-bold text-white mt-0.5">
                      {anomaly.ensembleAgreement.matchingRuns} / {anomaly.ensembleAgreement.totalRuns}
                    </div>
                    <span className="text-[9px] text-cyan-400 font-sans">{anomaly.ensembleAgreement.percentage}% agreed</span>
                  </div>
                </div>

                {/* Peak Intensity Callout */}
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Peak Forecast:</span>
                  <span className="text-rose-400 font-bold">{anomaly.peakIntensity.metric}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2 mt-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedAnomalyId(anomaly.id);
                    setCurrentPage('downscaling');
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
                >
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Inspect 5 km</span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedAnomalyId(anomaly.id);
                    setEventDrawerOpen(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-semibold border border-cyan-500/40 transition-colors"
                >
                  <span>Quick HUD</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
