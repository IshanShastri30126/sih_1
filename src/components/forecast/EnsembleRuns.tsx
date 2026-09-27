import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  ReferenceLine, 
  Cell 
} from 'recharts';
import { MOCK_ENSEMBLE_DATA } from '../../data/mockWeatherData';
import { CloudRain, CheckCircle2, TrendingUp, Layers, HelpCircle } from 'lucide-react';

export const EnsembleRuns: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<number | null>(null);

  const data = MOCK_ENSEMBLE_DATA.members.map(m => ({
    name: m.name.replace('Perturbation ', '').replace('Control (Unperturbed)', 'CTRL'),
    fullName: m.name,
    rainfall: m.value,
    isExtreme: m.isExtreme,
    divergence: m.divergenceScore,
  }));

  const thresholdValue = 135; // 99th percentile climatology

  return (
    <div className="space-y-6">
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">
              Operational NWP Analysis
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              Base: {MOCK_ENSEMBLE_DATA.baseTime}
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white mt-1">
            23-Run Ensemble Intelligence
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {MOCK_ENSEMBLE_DATA.modelName} • Probabilistic spread vs Climatological threshold
          </p>
        </div>

        {/* SIH Key Metric Highlight Badge */}
        <div className="flex items-center gap-3 bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-3 shadow-lg">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <CloudRain className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-bold font-mono text-white">
              {MOCK_ENSEMBLE_DATA.extremeCount} / {MOCK_ENSEMBLE_DATA.totalMembers} Runs
            </div>
            <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{MOCK_ENSEMBLE_DATA.agreementPercentage}% Ensemble Agreement</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ensemble Agreement Visual Progress Bar */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 backdrop-blur-md space-y-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-300 font-bold uppercase tracking-wider flex items-center gap-2">
            <span>23 RUN CONVERGENCE</span>
            <span className="text-[10px] text-rose-400 font-normal">Threshold: 135 mm/24h</span>
          </span>
          <span className="text-cyan-400 font-bold">
            {MOCK_ENSEMBLE_DATA.extremeCount} of 23 Runs Signal Extreme Rainfall
          </span>
        </div>

        {/* 23 Member Blocks visualization */}
        <div className="grid grid-cols-12 sm:grid-cols-23 gap-1.5 pt-1">
          {MOCK_ENSEMBLE_DATA.members.map((member) => (
            <div
              key={member.id}
              onClick={() => setSelectedMember(member.id)}
              className={`h-11 rounded-lg border flex flex-col items-center justify-center cursor-pointer transition-all ${
                member.isExtreme 
                  ? 'bg-rose-500/20 border-rose-500/50 hover:bg-rose-500/40 text-rose-300 shadow-[0_0_8px_rgba(244,63,94,0.2)]'
                  : 'bg-slate-800/80 border-slate-700/80 hover:bg-slate-700 text-slate-400'
              } ${selectedMember === member.id ? 'ring-2 ring-cyan-400 scale-105' : ''}`}
              title={`${member.name}: ${member.value} mm`}
            >
              <span className="text-[9px] font-mono font-bold">
                {member.id === 1 ? 'CTL' : `M${member.id - 1}`}
              </span>
              <span className="text-[8px] font-mono opacity-80">
                {Math.round(member.value)}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-rose-500" />
              <span>Extreme Deluge (&gt;135mm)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-slate-700" />
              <span>Sub-Extreme (&lt;135mm)</span>
            </span>
          </div>
          <span className="font-mono text-slate-400">Mean: {MOCK_ENSEMBLE_DATA.ensembleMean} mm</span>
        </div>
      </div>

      {/* Main Bar Chart: 23 Ensemble Members vs Threshold */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 backdrop-blur-md">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wide">
              Rainfall Distribution by Member (mm/24h)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Comparing member variations and divergence from control forecast
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
              Control: {MOCK_ENSEMBLE_DATA.controlForecast} mm
            </span>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                interval={0}
                angle={-45}
                textAnchor="end"
              />
              <YAxis 
                tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                unit="mm"
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#0b1120',
                  borderColor: '#334155',
                  borderRadius: '12px',
                  color: '#f8fafc',
                  fontSize: '12px',
                  fontFamily: 'JetBrains Mono',
                }}
                formatter={(value: any) => [`${value} mm/24h`, 'Rainfall']}
              />
              <ReferenceLine 
                y={thresholdValue} 
                stroke="#f59e0b" 
                strokeDasharray="4 4" 
                strokeWidth={2}
                label={{ 
                  value: '99th Percentile Climatology (135mm)', 
                  fill: '#f59e0b', 
                  fontSize: 10, 
                  position: 'insideTopLeft' 
                }} 
              />
              <Bar dataKey="rainfall" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.isExtreme ? '#ef4444' : '#64748b'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Percentiles & Climatology Breakdown */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 font-mono">
          <div className="text-[10px] text-slate-400 uppercase">10th Percentile</div>
          <div className="text-lg font-bold text-slate-200 mt-1">{MOCK_ENSEMBLE_DATA.percentiles.p10} mm</div>
          <div className="text-[10px] text-slate-500">Lower Bound</div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 font-mono">
          <div className="text-[10px] text-slate-400 uppercase">25th Percentile</div>
          <div className="text-lg font-bold text-slate-200 mt-1">{MOCK_ENSEMBLE_DATA.percentiles.p25} mm</div>
          <div className="text-[10px] text-slate-500">Q1 Quartile</div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 font-mono">
          <div className="text-[10px] text-slate-400 uppercase">Median (P50)</div>
          <div className="text-lg font-bold text-cyan-400 mt-1">{MOCK_ENSEMBLE_DATA.percentiles.p50} mm</div>
          <div className="text-[10px] text-cyan-500">Expected Midpoint</div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 font-mono">
          <div className="text-[10px] text-slate-400 uppercase">75th Percentile</div>
          <div className="text-lg font-bold text-amber-400 mt-1">{MOCK_ENSEMBLE_DATA.percentiles.p75} mm</div>
          <div className="text-[10px] text-slate-500">Q3 Quartile</div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 font-mono">
          <div className="text-[10px] text-slate-400 uppercase">90th Percentile</div>
          <div className="text-lg font-bold text-orange-400 mt-1">{MOCK_ENSEMBLE_DATA.percentiles.p90} mm</div>
          <div className="text-[10px] text-orange-500">High Risk Tail</div>
        </div>

        <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-3 font-mono">
          <div className="text-[10px] text-rose-400 uppercase font-bold">99th Peak Tail</div>
          <div className="text-lg font-bold text-rose-400 mt-1">{MOCK_ENSEMBLE_DATA.percentiles.p99} mm</div>
          <div className="text-[10px] text-rose-500">Worst Case Surge</div>
        </div>
      </div>

      {/* Explainable Value Proposition Callout */}
      <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/20 p-4 text-xs text-slate-300">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-white text-sm">Why Ensemble Intelligence Matters</h4>
            <p className="mt-1 leading-relaxed text-slate-400">
              Single deterministic forecasts often miss rapid convective intensification or flip unpredictably between runs. 
              By running <strong>23 perturbed initial conditions</strong> through the NCMRWF global framework, MausamDrishti AI 
              identifies genuine physical convergence: <strong>83% of runs</strong> confirm the extreme signal, giving disaster 
              authorities the statistical confidence needed to mobilize NDRF resources days ahead of disaster.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
