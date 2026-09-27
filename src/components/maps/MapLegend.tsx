import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';

export const MapLegend: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="absolute bottom-6 left-4 z-20 w-72 rounded-2xl border border-slate-700/80 bg-slate-950/90 shadow-2xl backdrop-blur-xl overflow-hidden transition-all text-xs">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between p-3 bg-slate-900/90 border-b border-slate-800 cursor-pointer hover:bg-slate-800/60"
      >
        <span className="font-mono text-[11px] uppercase tracking-wider text-slate-300 font-bold flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-cyan-400" />
          <span>Meteorological Legend</span>
        </span>
        <button className="text-slate-400 hover:text-white">
          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {isOpen && (
        <div className="p-3 space-y-3 font-mono text-[10px]">
          {/* Rainfall Intensity Scale */}
          <div>
            <div className="flex justify-between text-slate-400 mb-1">
              <span>Rainfall (mm/24h)</span>
              <span className="text-cyan-400">0 → 300+</span>
            </div>
            <div className="h-2 rounded-full w-full bg-gradient-to-r from-cyan-900 via-sky-500 via-emerald-400 via-amber-400 via-orange-500 to-rose-600 shadow-inner" />
            <div className="flex justify-between text-[9px] text-slate-500 mt-1">
              <span>Light (15)</span>
              <span>Moderate (65)</span>
              <span>Heavy (115)</span>
              <span>Extreme (250+)</span>
            </div>
          </div>

          {/* EFI Scale */}
          <div>
            <div className="flex justify-between text-slate-400 mb-1">
              <span>Extreme Forecast Index (EFI)</span>
              <span className="text-amber-400">0.0 → 1.0</span>
            </div>
            <div className="h-2 rounded-full w-full bg-gradient-to-r from-slate-700 via-blue-600 via-amber-500 to-red-600" />
            <div className="flex justify-between text-[9px] text-slate-500 mt-1">
              <span>Normal (&lt;0.5)</span>
              <span>Unusual (0.6-0.8)</span>
              <span>Climatological Extreme (&gt;0.8)</span>
            </div>
          </div>

          {/* Severity Badges & Features */}
          <div className="pt-2 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[10px]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_6px_#f43f5e]" />
              <span className="text-slate-300">Extreme Alert</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_6px_#f97316]" />
              <span className="text-slate-300">Severe Warning</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded border border-cyan-400 border-dashed" />
              <span className="text-slate-300">5 km Downscaled Zone</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-0.5 bg-blue-400" />
              <span className="text-slate-300">GNN Storm Trajectory</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
