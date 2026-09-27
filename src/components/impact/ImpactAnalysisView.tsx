import React from 'react';
import { MOCK_IMPACT_ASSESSMENT } from '../../data/mockWeatherData';
import { 
  Users, 
  Wheat, 
  Waves, 
  Building2, 
  Clock, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { useWeatherStore } from '../../stores/weatherStore';

export const ImpactAnalysisView: React.FC = () => {
  const { setCurrentPage, getSelectedAnomaly } = useWeatherStore();
  const impact = MOCK_IMPACT_ASSESSMENT;
  const anomaly = getSelectedAnomaly();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-400">
              Multi-Sector Exposure Model
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              Zone: {impact.affectedZoneName}
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white mt-1">
            Vulnerability & Critical Infrastructure Impact
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Correlating 5 km downscaled risk footprint with National Census, Crop Calendar & CWC River Gauges
          </p>
        </div>

        {/* Action button to alert */}
        <button
          onClick={() => setCurrentPage('alerts')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-950/40 transition-colors"
        >
          <span>Open Alert Approval</span>
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>

      {/* Critical Time Window Banner */}
      <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-950/30 via-slate-900 to-slate-900 p-4 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-mono uppercase text-amber-400 font-bold">
              Critical Hydrological Risk Window
            </div>
            <div className="text-sm font-bold text-white">
              {impact.riskWindow.peak}
            </div>
            <div className="text-[11px] text-slate-400">
              Inundation begins: {impact.riskWindow.start} • Recession: {impact.riskWindow.end}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-amber-300 bg-amber-950/60 px-3 py-1.5 rounded-xl border border-amber-500/30">
          <span>Peak Surge: 18h Duration</span>
        </div>
      </div>

      {/* 4 Main Impact Sectors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 1. Population Impact */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white font-mono uppercase">Population Exposure</h3>
                <span className="text-[11px] text-slate-400">Census 2021 Geocoded Grid</span>
              </div>
            </div>
            <span className="text-lg font-bold font-mono text-amber-400">
              {(impact.population.totalEstimated / 100000).toFixed(2)} Lakh
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5 font-mono text-xs">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase">High-Risk Lowlands</span>
              <div className="text-base font-bold text-rose-400 mt-0.5">
                {impact.population.highRiskLowlands.toLocaleString()}
              </div>
              <div className="text-[10px] text-slate-500 font-sans">Immediate evacuation zone</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase">Elderly & Children</span>
              <div className="text-base font-bold text-amber-300 mt-0.5">
                {impact.population.elderlyAndChildren.toLocaleString()}
              </div>
              <div className="text-[10px] text-slate-500 font-sans">Priority medical triage</div>
            </div>

            <div className="col-span-2 p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 uppercase">Required Shelter Capacity</span>
                <div className="text-base font-bold text-cyan-400">
                  {impact.population.shelterCapacityRequired.toLocaleString()} Persons
                </div>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-cyan-950 border border-cyan-500/30 text-cyan-300">
                24 Centers Identified
              </span>
            </div>
          </div>
        </div>

        {/* 2. Agriculture Impact */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <Wheat className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white font-mono uppercase">Agricultural Exposure</h3>
                <span className="text-[11px] text-slate-400">Crop Susceptibility Index</span>
              </div>
            </div>
            <span className="text-lg font-bold font-mono text-emerald-400">
              {(impact.agriculture.totalHectaresExposed / 1000).toFixed(0)}k Hectares
            </span>
          </div>

          <div className="space-y-2">
            {impact.agriculture.standingCrops.map((crop) => (
              <div 
                key={crop.name}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs"
              >
                <div>
                  <span className="font-semibold text-slate-200">{crop.name}</span>
                  <span className="text-[11px] text-slate-400 block font-mono">Stage: {crop.stage}</span>
                </div>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                  crop.susceptibility === 'Critical' 
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' 
                    : crop.susceptibility === 'Moderate'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                }`}>
                  {crop.susceptibility} Risk
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. River Basins & Flood Gauges */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                <Waves className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white font-mono uppercase">Hydrological Basins</h3>
                <span className="text-[11px] text-slate-400">Central Water Commission (CWC) Feed</span>
              </div>
            </div>
            <span className="text-xs font-mono text-rose-400 font-bold bg-rose-950/60 border border-rose-500/30 px-2.5 py-1 rounded-full">
              4 Gauges Above Warning
            </span>
          </div>

          <div className="space-y-2">
            {impact.rivers.criticalRivers.map((riv) => (
              <div
                key={riv.name}
                className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs font-mono space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{riv.name}</span>
                  <span className="text-cyan-400 font-semibold">{riv.trend}</span>
                </div>
                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>Current: <strong className="text-amber-400">{riv.currentLevelM} m</strong></span>
                  <span>Danger Mark: <strong className="text-rose-400">{riv.dangerLevelM} m</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Infrastructure & Transport */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/30">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white font-mono uppercase">Critical Infrastructure</h3>
                <span className="text-[11px] text-slate-400">Lifelines & Transport Corridors</span>
              </div>
            </div>
            <span className="text-xs font-mono text-cyan-400">GIS Overlay</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5 font-mono text-xs">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase">Submerged Highway</span>
              <div className="text-lg font-bold text-rose-400 mt-0.5">
                {impact.infrastructure.highwaysFloodedKm} km
              </div>
              <div className="text-[10px] text-slate-500 font-sans">NH-48 corridor passes</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase">Substations at Risk</span>
              <div className="text-lg font-bold text-amber-400 mt-0.5">
                {impact.infrastructure.substationsAtRisk} Units
              </div>
              <div className="text-[10px] text-slate-500 font-sans">66kV & 220kV grids</div>
            </div>

            <div className="col-span-2 p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
              <span className="text-[10px] text-slate-400 uppercase block mb-1">Railway Vulnerability</span>
              <p className="text-slate-300 font-sans leading-relaxed">
                {impact.infrastructure.railLinesVulnerable}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decision Support AI Recommendations (Clearly labeled human review required) */}
      <div className="rounded-2xl border border-cyan-500/40 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/30 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wide">
              AI Decision-Support Recommendations
            </h3>
          </div>
          <span className="text-[11px] font-mono text-amber-400 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>AI-generated recommendation — requires human review</span>
          </span>
        </div>

        <div className="space-y-2">
          {impact.aiRecommendations.map((rec, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200"
            >
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400 font-mono text-[10px] font-bold mt-0.5">
                {idx + 1}
              </div>
              <p className="leading-relaxed">{rec}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
