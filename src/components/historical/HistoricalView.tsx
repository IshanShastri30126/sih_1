import React, { useState } from 'react';
import { MOCK_HISTORICAL_EVENTS } from '../../data/mockWeatherData';
import { 
  History, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  TrendingUp, 
  Target, 
  Award,
  Layers,
  ArrowRight
} from 'lucide-react';

export const HistoricalView: React.FC = () => {
  const [selectedEventId, setSelectedEventId] = useState<string>(MOCK_HISTORICAL_EVENTS[0].id);

  const selectedEvent = MOCK_HISTORICAL_EVENTS.find(e => e.id === selectedEventId) || MOCK_HISTORICAL_EVENTS[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-purple-400">
              Backtesting & Reanalysis Verification
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              Ground Truth: IMD Rain Gauge & AWS Archive
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white mt-1">
            Historical Extreme Event Benchmark Analysis
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Rigorous evaluation of MausamDrishti AI on seminal Indian meteorological disasters
          </p>
        </div>

        {/* Validation Metric Badge */}
        <div className="flex items-center gap-2 bg-slate-900 border border-purple-500/30 px-3.5 py-2 rounded-2xl text-xs font-mono">
          <Award className="w-4 h-4 text-purple-400" />
          <span className="text-white font-bold">92.9% Avg Peak Recovery</span>
        </div>
      </div>

      {/* Historical Event Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {MOCK_HISTORICAL_EVENTS.map((event) => {
          const isSelected = selectedEventId === event.id;
          return (
            <button
              key={event.id}
              onClick={() => setSelectedEventId(event.id)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                isSelected 
                  ? 'bg-slate-900 border-purple-500 ring-2 ring-purple-500/30 shadow-xl shadow-purple-950/40' 
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between font-mono text-[10px]">
                <span className="text-purple-400 font-bold">{event.year}</span>
                <span className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">{event.type}</span>
              </div>
              <h3 className="font-bold text-white text-sm mt-1.5 leading-snug">
                {event.name}
              </h3>
              <p className="text-[11px] text-slate-400 mt-1 truncate">
                {event.region}
              </p>
            </button>
          );
        })}
      </div>

      {/* Selected Event Comprehensive Forecast vs Observed Benchmark */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-md space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white">{selectedEvent.name}</h3>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-500/30">
                Lead Time: {selectedEvent.forecastVsObserved.forecastLeadTimeDays} Days
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Region: {selectedEvent.region}
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-slate-400">Ensemble Agreement:</span>
            <span className="text-emerald-400 font-bold">{selectedEvent.forecastVsObserved.ensembleAgreementPct}%</span>
          </div>
        </div>

        {/* Forecast vs Observed Metrics Comparison Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase">Rainfall Accuracy</span>
            <div className="text-xl font-bold text-white mt-1">
              {selectedEvent.forecastVsObserved.forecastRainfallMm} mm <span className="text-slate-400 text-xs">fcst</span>
            </div>
            <div className="text-[11px] text-slate-500">Observed: {selectedEvent.forecastVsObserved.observedRainfallMm} mm</div>
            <div className="text-[10px] text-emerald-400 mt-1 font-sans">
              Error: {selectedEvent.forecastVsObserved.rainfallErrorPercent}%
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/30">
            <span className="text-[10px] text-purple-400 uppercase font-bold">Peak Preservation</span>
            <div className="text-xl font-bold text-purple-300 mt-1">
              {selectedEvent.forecastVsObserved.peakPreservationRate}%
            </div>
            <div className="text-[10px] text-slate-400 font-sans">Retained in 5km downscaling</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase">Spatial Center Error</span>
            <div className="text-xl font-bold text-cyan-400 mt-1">
              {selectedEvent.forecastVsObserved.spatialErrorKm} km
            </div>
            <div className="text-[10px] text-slate-500 font-sans">GNN track vs Actual landfall</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase">Warning Lead Gain</span>
            <div className="text-xl font-bold text-amber-400 mt-1">
              +{selectedEvent.forecastVsObserved.forecastLeadTimeDays} Days
            </div>
            <div className="text-[10px] text-slate-500 font-sans">Ahead of emergency landfall</div>
          </div>
        </div>

        {/* Narrative & Lessons Learned */}
        <div className="space-y-3 pt-2">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 space-y-1.5">
            <span className="font-bold text-white font-mono uppercase text-[11px] text-cyan-400">
              Event Climatological Background:
            </span>
            <p className="leading-relaxed text-slate-300">{selectedEvent.description}</p>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/20 to-slate-950 border border-purple-500/30 text-xs text-slate-300 space-y-1.5">
            <span className="font-bold text-purple-300 font-mono uppercase text-[11px]">
              Lessons Applied to MausamDrishti Architecture:
            </span>
            <p className="leading-relaxed text-slate-300">{selectedEvent.lessonsLearned}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
