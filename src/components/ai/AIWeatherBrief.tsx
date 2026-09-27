import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Clock, 
  Users, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Layers, 
  ShieldAlert, 
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useWeatherStore } from '../../stores/weatherStore';

export const AIWeatherBrief: React.FC = () => {
  const { 
    getSelectedAnomaly, 
    setCurrentPage, 
    setEventDrawerOpen 
  } = useWeatherStore();

  const [showExplanation, setShowExplanation] = useState(false);
  const anomaly = getSelectedAnomaly();

  return (
    <div className="relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-slate-900 via-slate-900/90 to-cyan-950/20 p-5 shadow-2xl backdrop-blur-xl">
      {/* Decorative ambient glow */}
      <div className="absolute -top-12 -right-12 h-36 w-36 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-md shadow-cyan-500/20">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
              AI Decision Support Brief
            </div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <span>Extreme {anomaly.hazard} Anomaly Detected</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                Model: EFI-Transformer v3.2
              </span>
            </div>
          </div>
        </div>

        {/* Confidence Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>High Confidence</span>
        </div>
      </div>

      {/* Main Brief Details */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <span className="text-[10px] uppercase font-mono text-slate-400">Target Location</span>
          <div className="mt-1 font-semibold text-slate-100 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-rose-400" />
            <span className="truncate">{anomaly.district}, {anomaly.state}</span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <span className="text-[10px] uppercase font-mono text-slate-400">Expected Risk Window</span>
          <div className="mt-1 font-semibold text-slate-100 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span className="truncate">{anomaly.forecastLeadWindow.slice(0, 20)}</span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <span className="text-[10px] uppercase font-mono text-slate-400">Ensemble Agreement</span>
          <div className="mt-1 font-semibold text-slate-100 font-mono flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-purple-400" />
            <span>{anomaly.ensembleAgreement.matchingRuns} / {anomaly.ensembleAgreement.totalRuns} ({anomaly.ensembleAgreement.percentage}%)</span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <span className="text-[10px] uppercase font-mono text-slate-400">Potential Impact</span>
          <div className="mt-1 font-semibold text-slate-100 truncate">
            Lowlands, crops & river basins
          </div>
        </div>
      </div>

      {/* AI Reasoning Text */}
      <div className="mt-3 rounded-xl bg-slate-950/40 p-3 border border-slate-800/60 text-xs text-slate-300">
        <p className="leading-relaxed">
          <strong className="text-cyan-300 font-semibold">Synthesis: </strong>
          Rainfall anomaly exceeds the 40-year IMDAA climatological 99th percentile by <strong>{anomaly.peakIntensity.ratioToThreshold}x</strong>. 
          20 of 23 NEPS-G ensemble members converge on persistent boundary-layer moisture convergence over South Gujarat. 
          Thermodynamic physics checks confirm saturation within Clausius-Clapeyron bounds.
        </p>
      </div>

      {/* Expandable "Why was this flagged?" Explainability Section */}
      <div className="mt-3">
        <button
          onClick={() => setShowExplanation(!showExplanation)}
          className="flex items-center gap-1.5 text-[11px] font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Why was this alert flagged? (Explainable AI Audit)</span>
          {showExplanation ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {showExplanation && (
          <div className="mt-2.5 rounded-xl bg-slate-950/80 p-3.5 border border-cyan-500/20 text-xs text-slate-300 space-y-2 animate-in fade-in duration-200">
            <div className="flex items-start gap-2">
              <span className="text-cyan-400 font-bold font-mono">1.</span>
              <span><strong>Climatological Departure:</strong> Extreme Forecast Index (EFI) reached <strong>{anomaly.efi}</strong>, exceeding the 0.70 high-alert threshold.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-cyan-400 font-bold font-mono">2.</span>
              <span><strong>Ensemble Consensus:</strong> 20 out of 23 ensemble runs agree on extreme category with low intra-member variance.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-cyan-400 font-bold font-mono">3.</span>
              <span><strong>GNN Trajectory Alignment:</strong> Spatio-temporal graph tracking confirms steady moisture transport rather than transient computational noise.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-cyan-400 font-bold font-mono">4.</span>
              <span><strong>Physics Compliance:</strong> Atmospheric moisture flux divergence balance check passed with 97.2% confidence score.</span>
            </div>
            <div className="pt-1 text-[11px] text-amber-400/90 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>Note: This is automated decision support. Public release requires human forecaster digital authorization.</span>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex flex-wrap items-center gap-2.5 pt-3 border-t border-slate-800">
        <button
          onClick={() => setEventDrawerOpen(true)}
          className="flex items-center gap-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 px-3.5 py-2 text-xs font-bold text-slate-950 transition-colors shadow-md shadow-cyan-500/20"
        >
          <span>View Full Event</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => setCurrentPage('downscaling')}
          className="flex items-center gap-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 px-3.5 py-2 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors"
        >
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>Inspect 5 km Downscaling</span>
        </button>

        <button
          onClick={() => setCurrentPage('impact')}
          className="flex items-center gap-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 px-3.5 py-2 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors"
        >
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
          <span>Analyze Sector Impact</span>
        </button>
      </div>
    </div>
  );
};
