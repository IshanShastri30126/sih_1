import React, { useState } from 'react';
import { 
  Settings, 
  ShieldCheck, 
  Sliders, 
  Bell, 
  Globe, 
  Radio, 
  Volume2, 
  Save, 
  Check,
  Zap
} from 'lucide-react';
import { useWeatherStore } from '../../stores/weatherStore';

export const SettingsView: React.FC = () => {
  const { soundEnabled, toggleSound } = useWeatherStore();
  const [efiThreshold, setEfiThreshold] = useState(0.70);
  const [probThreshold, setProbThreshold] = useState(75);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">
              System Configuration
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white mt-1">
            Operational Parameters & Dissemination Gateways
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Configure anomaly trigger sensitivities, automated 5km crop policies, and emergency siren endpoints
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all"
        >
          {isSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{isSaved ? 'Settings Applied!' : 'Save Configuration'}</span>
        </button>
      </div>

      {/* Threshold Policies Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md space-y-4">
        <div className="flex items-center gap-2 font-mono text-sm font-bold text-white uppercase tracking-wide border-b border-slate-800 pb-2">
          <Sliders className="w-4 h-4 text-cyan-400" />
          <span>Extreme Weather Trigger Thresholds</span>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <div className="flex justify-between font-mono mb-1.5">
              <span className="text-slate-300">Extreme Forecast Index (EFI) Sensitivity Trigger</span>
              <span className="text-cyan-400 font-bold">{efiThreshold.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.50"
              max="0.95"
              step="0.05"
              value={efiThreshold}
              onChange={(e) => setEfiThreshold(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Ensemble runs crossing this value are automatically flagged into the Operational Anomaly Queue.
            </p>
          </div>

          <div>
            <div className="flex justify-between font-mono mb-1.5">
              <span className="text-slate-300">5 km Selective Diffusion Auto-Downscale Threshold</span>
              <span className="text-cyan-400 font-bold">{probThreshold}% Probability</span>
            </div>
            <input
              type="range"
              min="50"
              max="90"
              step="5"
              value={probThreshold}
              onChange={(e) => setProbThreshold(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Regions exceeding this probability trigger automatic bounding-box cropping and latent diffusion processing.
            </p>
          </div>
        </div>
      </div>

      {/* Audio & Alert Settings */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md space-y-4">
        <div className="flex items-center gap-2 font-mono text-sm font-bold text-white uppercase tracking-wide border-b border-slate-800 pb-2">
          <Volume2 className="w-4 h-4 text-cyan-400" />
          <span>Audio Siren & Notification Preferences</span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
          <div>
            <div className="font-semibold text-white">Duty Desk Audio Siren Alerts</div>
            <div className="text-[11px] text-slate-400">Play auditory alert tone when an Extreme category anomaly is flagged</div>
          </div>
          <button
            onClick={toggleSound}
            className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all ${
              soundEnabled ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
            }`}
          >
            {soundEnabled ? 'Enabled' : 'Muted'}
          </button>
        </div>
      </div>

      {/* API Integrations */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md space-y-4">
        <div className="flex items-center gap-2 font-mono text-sm font-bold text-white uppercase tracking-wide border-b border-slate-800 pb-2">
          <Globe className="w-4 h-4 text-cyan-400" />
          <span>Government Gateway Connections</span>
        </div>

        <div className="space-y-3 font-mono text-xs">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-slate-400 text-[10px] uppercase">CAP-India Endpoint</span>
              <div className="text-slate-200 font-sans">https://cap.ndma.gov.in/v1.2/alerts/feed</div>
            </div>
            <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
              Connected
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-slate-400 text-[10px] uppercase">Bhashini Multilingual NLP</span>
              <div className="text-slate-200 font-sans">bhashini.gov.in/ulca/v1/translation-tts</div>
            </div>
            <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
              Active (22 Languages)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
