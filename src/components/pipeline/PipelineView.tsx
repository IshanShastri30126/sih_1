import React, { useState } from 'react';
import { MOCK_PIPELINE_STAGES } from '../../data/mockWeatherData';
import { 
  GitBranch, 
  CheckCircle2, 
  Clock, 
  Cpu, 
  Database, 
  ArrowRight, 
  Layers, 
  ShieldCheck, 
  Send, 
  Sparkles,
  Play
} from 'lucide-react';

export const PipelineView: React.FC = () => {
  const [selectedStageId, setSelectedStageId] = useState<number>(5); // default downscaling stage
  const [isSimulatingStream, setIsSimulatingStream] = useState(false);

  const selectedStage = MOCK_PIPELINE_STAGES.find(s => s.id === selectedStageId) || MOCK_PIPELINE_STAGES[4];

  const handleSimulatePulse = () => {
    setIsSimulatingStream(true);
    setTimeout(() => setIsSimulatingStream(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">
              End-to-End Operational Architecture
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
              Latency: 3.19s Total Pipeline
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white mt-1">
            MausamDrishti AI Forecast & Warning Pipeline
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time trace from multi-ensemble GRIB2 ingestion to automated Bhashini voice dissemination
          </p>
        </div>

        {/* Pulse button */}
        <button
          onClick={handleSimulatePulse}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-semibold shadow-md transition-colors"
        >
          <Play className="w-3.5 h-3.5 fill-cyan-300" />
          <span>Simulate Live Data Pulse</span>
        </button>
      </div>

      {/* Interactive Horizontal Pipeline Flow Visualizer */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-md overflow-x-auto">
        <div className="flex items-center gap-2 min-w-[900px] pb-2">
          {MOCK_PIPELINE_STAGES.map((stage, idx) => {
            const isSelected = selectedStageId === stage.id;
            const isCompleted = stage.status === 'Completed';

            return (
              <React.Fragment key={stage.id}>
                {/* Stage Node Box */}
                <div
                  onClick={() => setSelectedStageId(stage.id)}
                  className={`flex-1 rounded-2xl border p-3 cursor-pointer transition-all duration-200 select-none relative group ${
                    isSelected 
                      ? 'bg-slate-950 border-cyan-400 ring-2 ring-cyan-500/30 shadow-xl shadow-cyan-950/50 scale-105 z-10' 
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  {/* Subtle active pulse banner */}
                  {isSimulatingStream && (
                    <div 
                      className="absolute inset-0 rounded-2xl bg-cyan-500/10 pointer-events-none animate-pulse"
                      style={{ animationDelay: `${idx * 250}ms` }}
                    />
                  )}

                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span className="font-bold text-cyan-400">0{stage.id}</span>
                    <span className={`px-1.5 py-0.2 rounded text-[9px] ${
                      isCompleted ? 'bg-emerald-950 text-emerald-400' : 'bg-amber-950 text-amber-400'
                    }`}>
                      {stage.status}
                    </span>
                  </div>

                  <div className="mt-2 font-bold text-white text-xs truncate">
                    {stage.code}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate mt-0.5">
                    {stage.name.split(' ')[0]}
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-500 flex items-center justify-between">
                    <span>{stage.latencyMs > 0 ? `${stage.latencyMs}ms` : 'Gate'}</span>
                    <CheckCircle2 className={`w-3 h-3 ${isCompleted ? 'text-emerald-400' : 'text-slate-600'}`} />
                  </div>
                </div>

                {/* Arrow Connector with flowing dot */}
                {idx < MOCK_PIPELINE_STAGES.length - 1 && (
                  <div className="relative flex items-center justify-center w-6 shrink-0">
                    <ArrowRight className="w-4 h-4 text-slate-600" />
                    {isSimulatingStream && (
                      <span 
                        className="absolute w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4] animate-ping"
                        style={{ animationDelay: `${idx * 250}ms` }}
                      />
                    )}
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Selected Stage Deep-Dive Specification Card */}
      <div className="rounded-2xl border border-cyan-500/30 bg-slate-900/90 p-6 backdrop-blur-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase text-cyan-400 font-bold">
                Stage 0{selectedStage.id} • {selectedStage.code}
              </div>
              <h3 className="text-base font-bold text-white">
                {selectedStage.name}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
              Model: <strong className="text-white">{selectedStage.model}</strong>
            </span>
            <span className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400">
              Latency: {selectedStage.latencyMs} ms
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          {selectedStage.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs pt-2">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase">Input Data Volume</span>
            <div className="text-sm font-bold text-white mt-1">{selectedStage.dataVolume}</div>
          </div>

          <div className="col-span-2 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase">Generated Output Artifact</span>
            <div className="text-sm font-bold text-cyan-400 mt-1">{selectedStage.outputArtifact}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
