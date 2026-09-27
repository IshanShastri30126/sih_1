import React from 'react';
import { 
  X, 
  Layers, 
  ShieldAlert, 
  CheckCircle2, 
  TrendingUp, 
  CloudRain, 
  MapPin, 
  Clock, 
  Users, 
  Waves, 
  ExternalLink,
  Zap
} from 'lucide-react';
import { useWeatherStore } from '../../stores/weatherStore';
import { StatusBadge } from './StatusBadge';
import { MOCK_IMPACT_ASSESSMENT } from '../../data/mockWeatherData';

export const EventDetailDrawer: React.FC = () => {
  const { 
    isEventDrawerOpen, 
    setEventDrawerOpen, 
    getSelectedAnomaly, 
    setCurrentPage,
    setSelectedAlertForReview,
    alerts
  } = useWeatherStore();

  if (!isEventDrawerOpen) return null;

  const anomaly = getSelectedAnomaly();

  const handleOpenAlert = () => {
    const alert = alerts.find(a => a.anomalyId === anomaly.id) || alerts[0];
    setSelectedAlertForReview(alert);
    setCurrentPage('alerts');
    setEventDrawerOpen(false);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-slate-950/95 border-l border-slate-800 shadow-2xl backdrop-blur-2xl flex flex-col animate-in slide-in-from-right duration-300">
      {/* Drawer Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/80">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/30">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-mono uppercase text-slate-400">Hotspot Intelligence</div>
            <div className="text-sm font-bold text-white truncate max-w-[280px]">
              {anomaly.district}, {anomaly.state}
            </div>
          </div>
        </div>
        <button
          onClick={() => setEventDrawerOpen(false)}
          className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Drawer Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {/* Severity & Status */}
        <div className="flex items-center justify-between">
          <StatusBadge severity={anomaly.severity} size="lg" />
          <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-xs bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Physics Verified</span>
          </div>
        </div>

        {/* Title & Description */}
        <div>
          <h3 className="text-base font-bold text-white leading-snug">
            {anomaly.name}
          </h3>
          <p className="mt-2 text-xs text-slate-300 leading-relaxed bg-slate-900/70 p-3 rounded-xl border border-slate-800/80">
            {anomaly.description}
          </p>
        </div>

        {/* Core Meteorological Metrics Grid */}
        <div className="grid grid-cols-2 gap-2.5 font-mono">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase">Extreme Index (EFI)</div>
            <div className="text-xl font-bold text-amber-400 mt-0.5">{anomaly.efi}</div>
            <div className="text-[10px] text-slate-500">Shift of Tails: +{anomaly.sot}</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase">AI Probability</div>
            <div className="text-xl font-bold text-cyan-400 mt-0.5">{anomaly.probability}%</div>
            <div className="text-[10px] text-slate-500">Confidence: High</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase">Ensemble Agreement</div>
            <div className="text-lg font-bold text-white mt-0.5">
              {anomaly.ensembleAgreement.matchingRuns} / {anomaly.ensembleAgreement.totalRuns}
            </div>
            <div className="text-[10px] text-emerald-400 font-sans">{anomaly.ensembleAgreement.percentage}% agreement</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase">Forecast Lead Time</div>
            <div className="text-lg font-bold text-purple-400 mt-0.5">
              +{anomaly.forecastLeadTimeDays} Days
            </div>
            <div className="text-[10px] text-slate-400 font-sans truncate">{anomaly.forecastLeadWindow.slice(0, 15)}</div>
          </div>
        </div>

        {/* Peak Intensity Bar */}
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Peak Intensity vs 99th Percentile</span>
            <span className="font-mono text-rose-400 font-bold">{anomaly.peakIntensity.ratioToThreshold}x Historical</span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden flex">
            <div className="bg-amber-400 h-full w-[45%]" title="99th percentile threshold" />
            <div className="bg-rose-500 h-full w-[55%]" title="Model peak forecast" />
          </div>
          <div className="flex justify-between text-[11px] font-mono text-slate-400">
            <span>Threshold: {anomaly.peakIntensity.historical99thPercentile}</span>
            <span className="text-white font-bold">{anomaly.peakIntensity.metric}</span>
          </div>
        </div>

        {/* Quick Impact Snapshot */}
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2.5">
          <div className="text-xs font-mono uppercase text-slate-400 flex items-center justify-between">
            <span>Exposure Snapshot</span>
            <span className="text-cyan-400">5km Zone</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Users className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{MOCK_IMPACT_ASSESSMENT.population.totalEstimated.toLocaleString()} People</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Waves className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>4 Rivers Above Warning</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <button
            onClick={() => {
              setCurrentPage('downscaling');
              setEventDrawerOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-semibold transition-all shadow-sm"
          >
            <Layers className="w-4 h-4" />
            <span>Compare 12 km → 5 km Downscaling</span>
          </button>

          <button
            onClick={() => {
              setCurrentPage('impact');
              setEventDrawerOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-semibold transition-all"
          >
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>Analyze Multi-Sector Impact</span>
          </button>

          <button
            onClick={handleOpenAlert}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-lg shadow-rose-900/40"
          >
            <span>Proceed to Forecaster Approval</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
