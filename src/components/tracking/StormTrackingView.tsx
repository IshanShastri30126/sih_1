import React from 'react';
import { MOCK_STORM_TRACK } from '../../data/mockWeatherData';
import { useWeatherStore } from '../../stores/weatherStore';
import { 
  Compass, 
  Wind, 
  Gauge, 
  CloudRain, 
  Users, 
  Calendar, 
  MapPin, 
  AlertTriangle,
  Radio,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { WeatherMap } from '../maps/WeatherMap';

export const StormTrackingView: React.FC = () => {
  const { selectedTrackPoint, setSelectedTrackPoint } = useWeatherStore();
  const track = MOCK_STORM_TRACK;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">
              GNN Spatio-Temporal Tracking Engine
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-950/80 text-blue-300 border border-blue-500/30">
              Basin: {track.basin}
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white mt-1">
            {track.name}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Steering flow advection & dynamic cone of uncertainty for Indian coastlines
          </p>
        </div>

        {/* Estimated Landfall Callout Card */}
        <div className="rounded-2xl border border-rose-500/30 bg-rose-950/20 p-3.5 shadow-lg flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/30">
            <AlertTriangle className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="text-xs font-bold text-rose-400 font-mono uppercase">
              Predicted Landfall Window
            </div>
            <div className="text-sm font-bold text-white">
              {track.landfallEstimate.location}
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              {track.landfallEstimate.window} • Confidence: {track.landfallEstimate.confidence}
            </div>
          </div>
        </div>
      </div>

      {/* Main Map with highlighted Trajectory */}
      <div className="rounded-2xl overflow-hidden border border-slate-800">
        <WeatherMap />
      </div>

      {/* Timeline Bar: D+0 to D+7 Day Markers */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              7-Day Storm Trajectory Timeline
            </span>
          </div>
          <span className="text-xs font-mono text-cyan-400">
            Click day marker to inspect state vector
          </span>
        </div>

        {/* Timeline Day Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {track.points.map((point) => {
            const isSelected = selectedTrackPoint.day === point.day;
            const isLandfall = point.day === 'D+5';

            return (
              <button
                key={point.day}
                onClick={() => setSelectedTrackPoint(point)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected 
                    ? 'bg-gradient-to-b from-cyan-950/80 to-slate-900 border-cyan-400 ring-2 ring-cyan-500/30 shadow-lg shadow-cyan-950/40' 
                    : isLandfall
                    ? 'bg-rose-950/30 border-rose-500/40 hover:bg-rose-900/40 text-slate-200'
                    : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/80 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between font-mono">
                  <span className={`text-xs font-bold ${isSelected ? 'text-cyan-400' : 'text-slate-200'}`}>
                    {point.day}
                  </span>
                  {isLandfall && (
                    <span className="text-[9px] bg-rose-500 text-white px-1.5 py-0.2 rounded font-bold">
                      HIT
                    </span>
                  )}
                </div>
                <div className="text-[11px] font-medium text-slate-300 mt-1 truncate">
                  {point.dateFormatted}
                </div>
                <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                  {point.intensityKmH} km/h • {point.centralPressureHpa} hPa
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Day State Vector Metrics */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 backdrop-blur-md">
        <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white font-mono">
              State Vector at {selectedTrackPoint.day} ({selectedTrackPoint.dateFormatted})
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-300 font-mono">
              {selectedTrackPoint.status}
            </span>
          </div>
          <div className="text-xs font-mono text-slate-400">
            Coordinates: [{selectedTrackPoint.coordinates[0]}°E, {selectedTrackPoint.coordinates[1]}°N]
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono">
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
            <div className="text-[10px] text-slate-400 uppercase flex items-center gap-1.5">
              <Wind className="w-3.5 h-3.5 text-teal-400" />
              <span>Sustained Wind</span>
            </div>
            <div className="text-xl font-bold text-white mt-1">
              {selectedTrackPoint.intensityKmH} km/h
            </div>
            <div className="text-[10px] text-teal-400 font-sans">Max Gusts: {selectedTrackPoint.intensityKmH + 25} km/h</div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
            <div className="text-[10px] text-slate-400 uppercase flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-indigo-400" />
              <span>Central Pressure</span>
            </div>
            <div className="text-xl font-bold text-indigo-300 mt-1">
              {selectedTrackPoint.centralPressureHpa} hPa
            </div>
            <div className="text-[10px] text-slate-500 font-sans">Pressure Drop: -{1012 - selectedTrackPoint.centralPressureHpa} hPa</div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
            <div className="text-[10px] text-slate-400 uppercase flex items-center gap-1.5">
              <CloudRain className="w-3.5 h-3.5 text-cyan-400" />
              <span>24h Rainfall Swath</span>
            </div>
            <div className="text-xl font-bold text-cyan-400 mt-1">
              {selectedTrackPoint.rainfall24hMm} mm
            </div>
            <div className="text-[10px] text-cyan-500 font-sans">Core convective cell</div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
            <div className="text-[10px] text-slate-400 uppercase flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-blue-400" />
              <span>Uncertainty Cone</span>
            </div>
            <div className="text-xl font-bold text-blue-300 mt-1">
              ±{selectedTrackPoint.uncertaintyRadiusKm} km
            </div>
            <div className="text-[10px] text-slate-500 font-sans">GNN radius spread</div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
            <div className="text-[10px] text-slate-400 uppercase flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>Affected Population</span>
            </div>
            <div className="text-xl font-bold text-amber-300 mt-1">
              {(selectedTrackPoint.affectedPopulation / 100000).toFixed(1)} Lakh
            </div>
            <div className="text-[10px] text-amber-500 font-sans">Within swath radius</div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
            <div className="text-[10px] text-slate-400 uppercase flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-purple-400" />
              <span>Track Confidence</span>
            </div>
            <div className="text-xl font-bold text-purple-300 mt-1">
              {selectedTrackPoint.probability}%
            </div>
            <div className="text-[10px] text-purple-400 font-sans">Ensemble consensus</div>
          </div>
        </div>
      </div>
    </div>
  );
};
