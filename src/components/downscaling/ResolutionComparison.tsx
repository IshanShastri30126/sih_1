import React, { useState } from 'react';
import { MOCK_DOWNSCALED_FORECAST } from '../../data/mockWeatherData';
import { 
  Layers, 
  Sparkles, 
  Cpu, 
  TrendingUp, 
  ShieldCheck, 
  Sliders, 
  Info,
  Maximize2
} from 'lucide-react';

export const ResolutionComparison: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState<number>(50); // 0 to 100 percentage
  const [hoveredCell, setHoveredCell] = useState<{ x: number; y: number; mm: number; res: string } | null>(null);

  const forecast = MOCK_DOWNSCALED_FORECAST;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">
              Super-Resolution & Diffusion Modeling
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
              {forecast.diffusionModelName}
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white mt-1">
            12 km → 5 km Selective Hotspot Downscaling
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {forecast.locationName} • Interactive Grid Comparison & Peak-Preservation Engine
          </p>
        </div>

        {/* Efficiency Metric Highlight Badge */}
        <div className="flex items-center gap-3 bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-3 shadow-lg">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-bold font-mono text-emerald-400">
              {forecast.computationSavedPercent}% Compute Saved
            </div>
            <div className="text-[11px] text-slate-400">
              Selective Regional Masking vs Full Grid
            </div>
          </div>
        </div>
      </div>

      {/* KPI Comparison Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-3.5 backdrop-blur-md">
          <div className="text-[11px] text-slate-400 uppercase font-mono">Original Coarse Peak</div>
          <div className="text-2xl font-bold font-mono text-slate-300 mt-1">{forecast.coarsePeakMm} mm</div>
          <div className="text-[10px] text-slate-500 font-mono">12 km Standard Grid</div>
        </div>

        <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-3.5 backdrop-blur-md">
          <div className="text-[11px] text-rose-400 uppercase font-mono font-bold">Downscaled Peak Preserved</div>
          <div className="text-2xl font-bold font-mono text-rose-400 mt-1">{forecast.downscaledPeakMm} mm</div>
          <div className="text-[10px] text-rose-400 font-mono font-semibold">5 km Latent Diffusion</div>
        </div>

        <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-3.5 backdrop-blur-md">
          <div className="text-[11px] text-cyan-400 uppercase font-mono">Peak Recovery Gain</div>
          <div className="text-2xl font-bold font-mono text-cyan-400 mt-1">{forecast.peakPreservationGain}</div>
          <div className="text-[10px] text-cyan-500 font-mono">Captures Convective Cores</div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-3.5 backdrop-blur-md">
          <div className="text-[11px] text-slate-400 uppercase font-mono">Grid Cell Multiplier</div>
          <div className="text-2xl font-bold font-mono text-purple-400 mt-1">5.76× Density</div>
          <div className="text-[10px] text-purple-500 font-mono">12km² → 5km² sub-cells</div>
        </div>
      </div>

      {/* Interactive Draggable Split-Screen Comparison Viewport */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 sm:p-6 shadow-2xl relative overflow-hidden">
        {/* Comparison Header Labels */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-slate-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
              LEFT: Coarse 12 km Grid (Smoothed)
            </span>
          </div>

          <div className="text-xs font-mono text-cyan-400 flex items-center gap-1.5 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
            <Sliders className="w-3.5 h-3.5" />
            <span>Drag slider to compare: {Math.round(sliderPosition)}%</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
              RIGHT: MausamDrishti 5 km (Peak-Preserved)
            </span>
            <span className="h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]" />
          </div>
        </div>

        {/* Visual Canvas Container with Split Mask */}
        <div className="relative w-full h-[400px] sm:h-[460px] rounded-xl overflow-hidden border border-slate-800 bg-[#080d1a] select-none">
          {/* Base Layer: Downscaled 16x16 5 km High-Res Grid (Visible on the right side) */}
          <div className="absolute inset-0 p-4 flex items-center justify-center">
            <div className="grid grid-cols-16 gap-1 w-full max-w-[420px] aspect-square">
              {forecast.downscaledGrid.map((cell, idx) => {
                // Color mapping: light blue -> yellow -> orange -> extreme red
                const isHigh = cell.rainfallMm > 230;
                const isMid = cell.rainfallMm > 150;
                const isLow = cell.rainfallMm > 80;

                const bgStyle = isHigh 
                  ? 'bg-rose-600 shadow-[0_0_8px_rgba(225,29,72,0.8)]' 
                  : isMid 
                  ? 'bg-amber-500' 
                  : isLow 
                  ? 'bg-cyan-600' 
                  : 'bg-slate-800/80';

                return (
                  <div
                    key={`down-${idx}`}
                    onMouseEnter={() => setHoveredCell({ x: cell.x, y: cell.y, mm: cell.rainfallMm, res: '5 km' })}
                    onMouseLeave={() => setHoveredCell(null)}
                    className={`rounded-[2px] transition-all hover:scale-125 hover:z-20 cursor-crosshair ${bgStyle} ${
                      cell.isPeak ? 'ring-1 ring-white animate-pulse' : ''
                    }`}
                    title={`5km Cell (${cell.x},${cell.y}): ${cell.rainfallMm} mm`}
                  />
                );
              })}
            </div>
          </div>

          {/* Top Layer: Coarse 8x8 12 km Grid Clipped by Slider */}
          <div 
            className="absolute inset-0 p-4 flex items-center justify-center overflow-hidden border-r-2 border-cyan-400 bg-[#080d1a]"
            style={{ width: `${sliderPosition}%` }}
          >
            <div className="grid grid-cols-8 gap-2 w-full max-w-[420px] aspect-square">
              {forecast.coarseGrid.map((cell, idx) => {
                const isHigh = cell.rainfallMm > 180;
                const isMid = cell.rainfallMm > 120;
                const isLow = cell.rainfallMm > 70;

                const bgStyle = isHigh 
                  ? 'bg-orange-600' 
                  : isMid 
                  ? 'bg-amber-600' 
                  : isLow 
                  ? 'bg-cyan-700' 
                  : 'bg-slate-800';

                return (
                  <div
                    key={`coarse-${idx}`}
                    onMouseEnter={() => setHoveredCell({ x: cell.x, y: cell.y, mm: cell.rainfallMm, res: '12 km' })}
                    onMouseLeave={() => setHoveredCell(null)}
                    className={`rounded-md transition-all hover:scale-110 hover:z-20 cursor-crosshair ${bgStyle} flex items-center justify-center border border-slate-700/50`}
                    title={`12km Cell (${cell.x},${cell.y}): ${cell.rainfallMm} mm`}
                  >
                    <span className="text-[9px] font-mono text-white/90 font-bold hidden sm:inline">
                      {cell.rainfallMm}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Subtle overlay badge inside 12km side */}
            <div className="absolute top-3 left-3 bg-slate-900/90 border border-slate-700 px-2 py-1 rounded text-[10px] font-mono text-slate-300">
              12 km Coarse Grid (Averaged)
            </div>
          </div>

          {/* Right side floating badge */}
          <div className="absolute top-3 right-3 bg-slate-900/90 border border-cyan-500/40 px-2 py-1 rounded text-[10px] font-mono text-cyan-300">
            5 km AI Diffusion (Preserved Peak)
          </div>

          {/* Slider Divider Handle */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-cyan-400 shadow-[0_0_12px_#06b6d4] pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center shadow-xl border-2 border-white">
              <Sliders className="w-4 h-4 rotate-90" />
            </div>
          </div>

          {/* Interactive Range Input on top of entire canvas */}
          <input
            type="range"
            min="5"
            max="95"
            value={sliderPosition}
            onChange={(e) => setSliderPosition(parseFloat(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
          />
        </div>

        {/* Hovered Cell Telemetry Bar */}
        <div className="mt-3 flex items-center justify-between text-xs font-mono text-slate-400 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-cyan-400" />
            <span>Hover any cell to inspect rainfall density:</span>
          </div>
          {hoveredCell ? (
            <span className="text-white font-bold">
              Resolution: <span className="text-cyan-400">{hoveredCell.res}</span> • Coordinates: ({hoveredCell.x}, {hoveredCell.y}) • Rainfall: <span className="text-rose-400">{hoveredCell.mm} mm/24h</span>
            </span>
          ) : (
            <span className="text-slate-500 italic">No cell focused</span>
          )}
        </div>
      </div>

      {/* Scientific Explanation Callout required by prompt */}
      <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/30 via-slate-900 to-slate-900 p-5 text-xs text-slate-300 space-y-3">
        <div className="flex items-center gap-2 font-bold text-white text-sm">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Why Peak-Preserving Selective Downscaling is a Paradigm Shift</span>
        </div>
        <p className="leading-relaxed text-slate-300">
          Conventional numerical weather prediction grids (~12 km) mathematically smooth out localized cloudbursts and convective precipitation cells over large grid volumes. In Valsad, the 12 km model indicated <strong>195 mm</strong>, hiding the acute localized flash-flood danger.
        </p>
        <p className="leading-relaxed text-slate-300">
          MausamDrishti AI dynamically crops high-risk bounding boxes (&gt;0.70 EFI) and applies <strong>Conditional Latent Diffusion</strong> with physical mass-continuity constraints. This resolves sharp orographic rainfall ridges up to <strong>294 mm (+50.8% peak recovery)</strong> while <strong>saving 88.4% computation</strong> compared to running the entire subcontinent at 5 km resolution.
        </p>
        <div className="pt-2 border-t border-slate-800 flex items-center gap-2 text-[11px] font-mono text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Note: Downscaling outputs are conditioned on IMDAA reanalysis physics. Evaluated against AWS telemetry with &lt;8.4 km spatial RMS error.</span>
        </div>
      </div>
    </div>
  );
};
