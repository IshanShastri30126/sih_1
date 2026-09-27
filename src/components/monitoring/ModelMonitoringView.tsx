import React from 'react';
import { MOCK_MODEL_METRICS } from '../../data/mockWeatherData';
import { 
  Cpu, 
  Activity, 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  Gauge, 
  Clock, 
  Layers, 
  TrendingDown,
  Server
} from 'lucide-react';

export const ModelMonitoringView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">
              MLOps & Edge Telemetry Desk
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
              Cluster: 8x NVIDIA A100-80GB SXM4
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white mt-1">
            Deep Learning Model Operational Health
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Monitoring inference latencies, concept drift, GPU compute loads, and physics constraint enforcement
          </p>
        </div>

        {/* Global Cluster Status */}
        <div className="flex items-center gap-2 bg-slate-900 border border-emerald-500/30 px-3.5 py-2 rounded-2xl text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-white font-bold">All 4 Production Models Healthy</span>
        </div>
      </div>

      {/* Cluster Overview KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/70">
          <span className="text-[10px] text-slate-400 uppercase">Avg Cluster Latency</span>
          <div className="text-2xl font-bold text-cyan-400 mt-1">245 ms</div>
          <span className="text-[10px] text-emerald-400">P99 SLA: &lt;1200ms</span>
        </div>

        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/70">
          <span className="text-[10px] text-slate-400 uppercase">GPU VRAM Utilization</span>
          <div className="text-2xl font-bold text-white mt-1">71.8%</div>
          <span className="text-[10px] text-slate-500">460 GB / 640 GB</span>
        </div>

        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/70">
          <span className="text-[10px] text-slate-400 uppercase">Physics Reject Rate</span>
          <div className="text-2xl font-bold text-emerald-400 mt-1">0.62%</div>
          <span className="text-[10px] text-slate-500">Auto-corrected by median filter</span>
        </div>

        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/70">
          <span className="text-[10px] text-slate-400 uppercase">Monthly Inferences</span>
          <div className="text-2xl font-bold text-purple-400 mt-1">860,000</div>
          <span className="text-[10px] text-slate-500">Grid cells processed</span>
        </div>
      </div>

      {/* Model Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MOCK_MODEL_METRICS.map((model) => (
          <div
            key={model.id}
            className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md space-y-4 hover:border-slate-700 transition-colors"
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white">{model.name}</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                    {model.status}
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-0.5">{model.role}</div>
              </div>
              <span className="text-xs font-mono text-cyan-400 font-semibold bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                {model.version}
              </span>
            </div>

            {/* Architecture Details */}
            <div className="text-xs font-mono text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase block mb-0.5">Architecture</span>
              {model.architecture}
            </div>

            {/* Telemetry Metrics Grid */}
            <div className="grid grid-cols-3 gap-2 font-mono text-xs">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase">Inference Time</span>
                <div className="text-base font-bold text-white mt-0.5">{model.inferenceLatencyMs} ms</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase">GPU Load</span>
                <div className="text-base font-bold text-cyan-400 mt-0.5">{model.gpuUtilizationPct}%</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase">Drift Index</span>
                <div className="text-base font-bold text-emerald-400 mt-0.5">{model.driftIndex}</div>
              </div>
            </div>

            {/* Bottom meta */}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Data Freshness: {model.dataFreshnessSec}s ago</span>
              <span>Physics Fail: {model.physicsFailureRatePct}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
