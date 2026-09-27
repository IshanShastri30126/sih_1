import React, { useState } from 'react';
import { 
  Layers, 
  ChevronDown, 
  ChevronUp, 
  Eye, 
  Sliders, 
  CloudRain, 
  Thermometer, 
  Wind, 
  Gauge, 
  Flame, 
  TrendingUp, 
  Compass, 
  Grid, 
  Users, 
  Wheat, 
  Waves, 
  Building2 
} from 'lucide-react';
import { useWeatherStore, MapLayersState } from '../../stores/weatherStore';
import { cn } from '../../lib/utils';

export const MapLayerControl: React.FC = () => {
  const { mapLayers, toggleMapLayer, setLayerOpacity } = useWeatherStore();
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeCategory, setActiveCategory] = useState<'weather' | 'ai' | 'impact'>('ai');

  const weatherLayers: { key: keyof Omit<MapLayersState, 'opacities'>; label: string; icon: any; color: string }[] = [
    { key: 'rainfall', label: 'Rainfall Accumulation (mm)', icon: CloudRain, color: 'text-cyan-400' },
    { key: 'temperature', label: 'Surface Temperature (°C)', icon: Thermometer, color: 'text-orange-400' },
    { key: 'wind', label: 'Wind Vector & Gusts (km/h)', icon: Wind, color: 'text-teal-400' },
    { key: 'pressure', label: 'Mean Sea-Level Pressure', icon: Gauge, color: 'text-indigo-400' },
  ];

  const aiLayers: { key: keyof Omit<MapLayersState, 'opacities'>; label: string; icon: any; color: string }[] = [
    { key: 'anomaly', label: 'Anomaly Heatmap Clusters', icon: Flame, color: 'text-rose-400' },
    { key: 'efi', label: 'Extreme Forecast Index (EFI)', icon: TrendingUp, color: 'text-amber-400' },
    { key: 'ensembleProb', label: 'Ensemble Probability (>80%)', icon: TrendingUp, color: 'text-purple-400' },
    { key: 'stormTrack', label: 'GNN Storm Trajectory & Cone', icon: Compass, color: 'text-blue-400' },
    { key: 'downscaled5km', label: '5 km Downscaled Risk Grid', icon: Grid, color: 'text-emerald-400' },
  ];

  const impactLayers: { key: keyof Omit<MapLayersState, 'opacities'>; label: string; icon: any; color: string }[] = [
    { key: 'population', label: 'Vulnerable Population Exposure', icon: Users, color: 'text-amber-400' },
    { key: 'crops', label: 'Agricultural Crop Exposure', icon: Wheat, color: 'text-emerald-400' },
    { key: 'rivers', label: 'River Basins & Danger Gauges', icon: Waves, color: 'text-cyan-400' },
    { key: 'infrastructure', label: 'Critical Highways & Grids', icon: Building2, color: 'text-red-400' },
  ];

  const currentLayers = activeCategory === 'weather' 
    ? weatherLayers 
    : activeCategory === 'ai' 
      ? aiLayers 
      : impactLayers;

  return (
    <div className="absolute top-4 right-4 z-20 w-80 rounded-2xl border border-slate-700/80 bg-slate-950/90 shadow-2xl backdrop-blur-xl overflow-hidden transition-all duration-200">
      {/* Header */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between p-3.5 bg-slate-900/90 border-b border-slate-800 cursor-pointer hover:bg-slate-800/60 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white tracking-wide uppercase font-mono">Geospatial Layers</div>
            <div className="text-[10px] text-slate-400">Multi-Model & AI Overlays</div>
          </div>
        </div>
        <button className="text-slate-400 hover:text-white">
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {isExpanded && (
        <div className="p-3 space-y-3">
          {/* Category Tabs */}
          <div className="grid grid-cols-3 gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-[11px] font-medium">
            <button
              onClick={() => setActiveCategory('weather')}
              className={cn(
                'py-1.5 rounded-lg transition-all',
                activeCategory === 'weather' 
                  ? 'bg-slate-800 text-white font-semibold shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              )}
            >
              Weather
            </button>
            <button
              onClick={() => setActiveCategory('ai')}
              className={cn(
                'py-1.5 rounded-lg transition-all',
                activeCategory === 'ai' 
                  ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              )}
            >
              AI Intelligence
            </button>
            <button
              onClick={() => setActiveCategory('impact')}
              className={cn(
                'py-1.5 rounded-lg transition-all',
                activeCategory === 'impact' 
                  ? 'bg-slate-800 text-white font-semibold shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              )}
            >
              Impact
            </button>
          </div>

          {/* Layer Items */}
          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {currentLayers.map((layer) => {
              const Icon = layer.icon;
              const isEnabled = !!mapLayers[layer.key];
              const opacity = mapLayers.opacities[layer.key] ?? 0.8;

              return (
                <div 
                  key={layer.key} 
                  className={cn(
                    'p-2 rounded-xl border transition-all',
                    isEnabled 
                      ? 'bg-slate-900/80 border-slate-700/80' 
                      : 'bg-slate-950/50 border-slate-850 opacity-60'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className={cn('w-4 h-4', layer.color)} />
                      <span className="text-xs font-medium text-slate-200 leading-tight">
                        {layer.label}
                      </span>
                    </div>
                    <button
                      onClick={() => toggleMapLayer(layer.key)}
                      className={cn(
                        'relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none',
                        isEnabled ? 'bg-cyan-500' : 'bg-slate-800'
                      )}
                    >
                      <span
                        className={cn(
                          'pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out',
                          isEnabled ? 'translate-x-4' : 'translate-x-0'
                        )}
                      />
                    </button>
                  </div>

                  {/* Opacity slider if enabled */}
                  {isEnabled && (
                    <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center gap-2">
                      <Sliders className="w-3 h-3 text-slate-500 shrink-0" />
                      <span className="text-[10px] text-slate-400 font-mono w-10">
                        {Math.round(opacity * 100)}%
                      </span>
                      <input
                        type="range"
                        min="0.1"
                        max="1.0"
                        step="0.05"
                        value={opacity}
                        onChange={(e) => setLayerOpacity(layer.key, parseFloat(e.target.value))}
                        className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick preset indicator */}
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 font-mono">
            <span>Projection: EPSG:4326</span>
            <span className="text-cyan-400">Resolution: 5 km / 12 km</span>
          </div>
        </div>
      )}
    </div>
  );
};
