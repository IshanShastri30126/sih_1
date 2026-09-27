import React from 'react';
import { MOCK_PHYSICS_VALIDATION } from '../../data/mockWeatherData';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Activity, 
  Thermometer, 
  Wind, 
  Droplets, 
  Compass, 
  Gauge, 
  TrendingUp,
  FileCheck2
} from 'lucide-react';

export const PhysicsCheckView: React.FC = () => {
  const validation = MOCK_PHYSICS_VALIDATION;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">
              Atmospheric Constraint Engine
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              Validated: {new Date(validation.validationTimestamp).toLocaleTimeString()} IST
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white mt-1">
            Physics & Thermodynamic Consistency
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Validating AI downscaled & tracking outputs against fundamental Navier-Stokes and Clausius-Clapeyron principles
          </p>
        </div>

        {/* Global Compliance Status Stamp */}
        <div className="flex items-center gap-3 bg-emerald-950/40 border border-emerald-500/40 rounded-2xl p-4 shadow-lg shadow-emerald-950/20">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
              Physics Verification
            </div>
            <div className="text-xl font-bold font-mono text-white flex items-center gap-2">
              <span>{validation.status}: PASSED</span>
              <span className="text-xs font-normal text-emerald-400 font-sans">({validation.confidenceScore}% Confidence)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Thermodynamic Balance Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono">
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 backdrop-blur-md">
          <div className="flex items-center gap-2 text-slate-400 text-xs uppercase">
            <Droplets className="w-4 h-4 text-cyan-400" />
            <span>Moisture Inflow</span>
          </div>
          <div className="text-lg font-bold text-white mt-1">
            {validation.thermodynamicBalance.moistureConvergenceKgM2S} kg/(m²·s)
          </div>
          <div className="text-[10px] text-emerald-400 mt-1">Column moisture balanced</div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 backdrop-blur-md">
          <div className="flex items-center gap-2 text-slate-400 text-xs uppercase">
            <Thermometer className="w-4 h-4 text-amber-400" />
            <span>Clausius-Clapeyron</span>
          </div>
          <div className="text-sm font-bold text-slate-200 mt-1 leading-tight">
            {validation.thermodynamicBalance.clausiusClapeyronBound}
          </div>
          <div className="text-[10px] text-slate-500 mt-1">Saturation bound respected</div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 backdrop-blur-md">
          <div className="flex items-center gap-2 text-slate-400 text-xs uppercase">
            <Wind className="w-4 h-4 text-teal-400" />
            <span>Vorticity Alignment</span>
          </div>
          <div className="text-lg font-bold text-emerald-400 mt-1">
            {validation.thermodynamicBalance.vorticityConsistency}
          </div>
          <div className="text-[10px] text-slate-500 mt-1">Geostrophic balance verified</div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 backdrop-blur-md">
          <div className="flex items-center gap-2 text-slate-400 text-xs uppercase">
            <Gauge className="w-4 h-4 text-indigo-400" />
            <span>Mass Conservation</span>
          </div>
          <div className="text-sm font-bold text-indigo-300 mt-1 leading-tight">
            {validation.thermodynamicBalance.massConservationResidual}
          </div>
          <div className="text-[10px] text-emerald-400 mt-1">Hydrostatic closure verified</div>
        </div>
      </div>

      {/* The 6 Rigorous Consistency Checks Table/Cards */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wide">
              The 6 Primary Atmospheric Consistency Audits
            </h3>
          </div>
          <span className="text-xs font-mono text-emerald-400">6 / 6 Checks Compliant</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {validation.checks.map((check, idx) => (
            <div 
              key={check.id}
              className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-3 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold font-mono">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{check.name}</h4>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase font-semibold">
                      Passed • {check.toleranceDelta}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-slate-500">CHK-0{idx + 1}</span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                {check.description}
              </p>

              <div className="pt-2 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div>
                  <span className="text-slate-500 uppercase text-[9px]">Measured Metric</span>
                  <div className="text-slate-200 font-semibold">{check.measuredValue}</div>
                </div>
                <div>
                  <span className="text-slate-500 uppercase text-[9px]">Physical Ceiling</span>
                  <div className="text-slate-400">{check.physicalLimit}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust & Scientific Integrity Note */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 text-xs text-slate-400 space-y-2">
        <h4 className="text-white font-semibold">Operational Guardrail Guarantee</h4>
        <p className="leading-relaxed">
          Pure neural downscaling models (such as unconstrained GANs) frequently hallucinate unrealistic localized precipitation extremes. MausamDrishti AI integrates a non-negotiable <strong>Differentiable Physics Verification Layer</strong>. If any downscaled patch violates moisture flux divergence or exceeds the thermodynamic Clausius-Clapeyron limit, the system automatically falls back to ensemble median interpolations and marks the alert for mandatory meteorologist review.
        </p>
      </div>
    </div>
  );
};
