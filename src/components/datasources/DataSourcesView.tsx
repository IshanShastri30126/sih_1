import React from 'react';
import { MOCK_DATA_SOURCES } from '../../data/mockWeatherData';
import { 
  Database, 
  CheckCircle2, 
  Clock, 
  Globe2, 
  Layers, 
  ExternalLink,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

export const DataSourcesView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-teal-400">
              National Ingestion Grid
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              Protocol: GRIB2 / NetCDF-4 / OGC WMS
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white mt-1">
            Authoritative Meteorological Data Feeds
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Operational numerical weather prediction ensembles, reanalysis baselines, and ground telemetry feeds
          </p>
        </div>

        {/* Sync Status Button */}
        <div className="flex items-center gap-2 bg-slate-900 border border-teal-500/30 px-3.5 py-2 rounded-2xl text-xs font-mono">
          <RefreshCw className="w-4 h-4 text-teal-400" />
          <span className="text-white font-bold">5 / 5 Ingestion Feeds Synchronized</span>
        </div>
      </div>

      {/* Sources Grid */}
      <div className="grid grid-cols-1 gap-4">
        {MOCK_DATA_SOURCES.map((source) => (
          <div
            key={source.id}
            className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md space-y-4 hover:border-slate-700 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/30">
                    <Database className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white font-mono">{source.name}</h3>
                    <div className="text-xs text-slate-400">{source.fullName}</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-center">
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-300">
                  {source.type}
                </span>
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{source.status}</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase">Operating Institution</span>
                <div className="text-slate-200 font-semibold mt-0.5 truncate">{source.institution}</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase">Grid Resolution</span>
                <div className="text-slate-200 font-semibold mt-0.5">{source.resolution}</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase">Geographical Coverage</span>
                <div className="text-slate-200 font-semibold mt-0.5">{source.coverage}</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase">Latest Ingestion</span>
                <div className="text-cyan-400 font-semibold mt-0.5 truncate">{source.lastUpdate}</div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Update Frequency: {source.updateFrequency}</span>
              <span className="text-slate-300">Stream Latency: {source.dataLatency}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
