import React, { useEffect } from 'react';
import { useWeatherStore, AppPage } from '../../stores/weatherStore';
import { 
  Sparkles, 
  Play, 
  Pause, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  ArrowRight,
  CheckCircle2,
  Layers,
  ShieldCheck,
  Send,
  CloudRain
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface DemoStepInfo {
  step: number;
  title: string;
  page: AppPage;
  description: string;
  badge: string;
  action?: () => void;
}

export const DemoTourController: React.FC = () => {
  const { 
    isDemoMode, 
    setDemoMode, 
    demoStep, 
    setDemoStep, 
    nextDemoStep, 
    prevDemoStep, 
    isDemoAutoPlaying, 
    toggleDemoAutoPlay,
    setCurrentPage,
    setSelectedAnomalyId,
    setApprovalModalOpen,
    alerts,
    setSelectedAlertForReview
  } = useWeatherStore();

  const demoSteps: DemoStepInfo[] = [
    {
      step: 0,
      title: '1. National Synoptic Overview',
      page: 'dashboard',
      badge: 'DETECT',
      description: 'MausamDrishti AI continuously scans 23 ensemble runs across India to detect unusual atmospheric anomalies.',
    },
    {
      step: 1,
      title: '2. Detect Extreme Anomaly (South Gujarat)',
      page: 'anomalies',
      badge: 'DETECT',
      description: 'Spatio-Temporal Autoencoder flags severe deluges in Valsad & Navsari exceeding the 40-year climatological 99th percentile (EFI 0.88).',
      action: () => setSelectedAnomalyId('anom-guj-01'),
    },
    {
      step: 2,
      title: '3. Inspect 23-Run Ensemble Intelligence',
      page: 'forecasts',
      badge: 'VERIFY',
      description: '20 of 23 NCMRWF ensemble members (87% agreement) confirm severe deluge. Never relying on single deterministic forecasts.',
    },
    {
      step: 3,
      title: '4. GNN Storm Tracking & Uncertainty Cone',
      page: 'tracking',
      badge: 'TRACK',
      description: 'Heterogeneous Graph Neural Network projects the 7-day trajectory of the Arabian Sea cyclone and its steering flow advection.',
    },
    {
      step: 4,
      title: '5. 12 km → 5 km Hotspot Downscaling',
      page: 'downscaling',
      badge: 'ZOOM',
      description: 'Conditional Latent Diffusion selectively downscales the dangerous area from 12km to 5km, preserving the 294 mm peak burst with 88% compute savings.',
    },
    {
      step: 5,
      title: '6. Physics & Thermodynamic Consistency',
      page: 'pipeline',
      badge: 'VERIFY',
      description: 'Checks moisture flux convergence, Clausius-Clapeyron limits, and spatial Laplacian continuity to guarantee zero AI hallucination.',
    },
    {
      step: 6,
      title: '7. Multi-Sector Impact Assessment',
      page: 'impact',
      badge: 'IMPACT',
      description: 'Evaluates vulnerable population (1.84M), standing crops (Paddy, Cotton), swollen river gauges (Auranga), and flooded NH-48 corridors.',
    },
    {
      step: 7,
      title: '8. Human Forecaster Verification',
      page: 'alerts',
      badge: 'APPROVE',
      description: 'A duty meteorologist reviews the AI evidence. Strict human authorization is required before any public warning is broadcast.',
      action: () => {
        setSelectedAlertForReview(alerts[0]);
        setApprovalModalOpen(true);
      }
    },
    {
      step: 8,
      title: '9. Multilingual Bhashini Translation',
      page: 'alerts',
      badge: 'ALERT',
      description: 'Approved warnings are converted into Gujarati, Hindi, Tamil, and Bengali side-by-side with playable audio siren previews.',
    },
    {
      step: 9,
      title: '10. Complete Operational Pipeline Trace',
      page: 'pipeline',
      badge: 'PIPELINE',
      description: 'From GRIB2 multi-model ingestion to multi-channel broadcast in under 3.2 seconds. Full explainability at every stage.',
    },
  ];

  const currentStepInfo = demoSteps[demoStep] || demoSteps[0];

  // Sync page and trigger step actions
  useEffect(() => {
    if (isDemoMode) {
      setCurrentPage(currentStepInfo.page);
      if (currentStepInfo.action) {
        currentStepInfo.action();
      }
    }
  }, [demoStep, isDemoMode]);

  // Autoplay timer: 12 seconds per step for 2-3 minute presentation
  useEffect(() => {
    if (!isDemoMode || !isDemoAutoPlaying) return;

    const interval = setInterval(() => {
      if (demoStep < demoSteps.length - 1) {
        setDemoStep(demoStep + 1);
      } else {
        // completed
        try {
          confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 } });
        } catch (e) {}
        toggleDemoAutoPlay();
      }
    }, 12000);

    return () => clearInterval(interval);
  }, [isDemoMode, isDemoAutoPlaying, demoStep, setDemoStep, toggleDemoAutoPlay, demoSteps.length]);

  if (!isDemoMode) return null;

  return (
    <div className="fixed bottom-4 inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 z-40 w-auto md:min-w-[680px] max-w-3xl rounded-2xl border-2 border-cyan-400 bg-slate-950/95 p-4 shadow-2xl backdrop-blur-2xl ring-4 ring-cyan-500/20 animate-in slide-in-from-bottom duration-300">
      {/* Top Banner Row */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-cyan-500 text-slate-950 font-bold">
            <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
          </div>
          <span className="text-xs font-mono font-bold tracking-wider text-cyan-300 uppercase">
            SIH Interactive Presentation Tour • Step {demoStep + 1} of {demoSteps.length}
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-bold">
            {currentStepInfo.badge}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Play/Pause Button */}
          <button
            onClick={toggleDemoAutoPlay}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-semibold transition-all ${
              isDemoAutoPlaying 
                ? 'bg-amber-500 text-slate-950 animate-pulse' 
                : 'bg-slate-850 hover:bg-slate-800 text-slate-300 border border-slate-700'
            }`}
          >
            {isDemoAutoPlaying ? <Pause className="w-3 h-3 fill-slate-950" /> : <Play className="w-3 h-3 fill-slate-300" />}
            <span>{isDemoAutoPlaying ? 'Autoplaying (12s)' : 'Auto-Play'}</span>
          </button>

          <button
            onClick={() => setDemoMode(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Exit Demo Tour"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Step Description */}
      <div className="py-2.5">
        <h4 className="text-sm font-bold text-white font-mono flex items-center gap-2">
          <span>{currentStepInfo.title}</span>
        </h4>
        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
          {currentStepInfo.description}
        </p>
      </div>

      {/* Step Progress Dots & Navigation */}
      <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-3">
        {/* Step Indicator Dots */}
        <div className="flex items-center gap-1.5">
          {demoSteps.map((step, idx) => (
            <button
              key={idx}
              onClick={() => setDemoStep(idx)}
              className={`h-2 rounded-full transition-all ${
                demoStep === idx 
                  ? 'w-6 bg-cyan-400 shadow-[0_0_8px_#06b6d4]' 
                  : idx < demoStep 
                  ? 'w-2 bg-emerald-500' 
                  : 'w-2 bg-slate-700 hover:bg-slate-500'
              }`}
              title={step.title}
            />
          ))}
        </div>

        {/* Prev / Next controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevDemoStep}
            disabled={demoStep === 0}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 text-xs font-semibold hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          <button
            onClick={nextDemoStep}
            className="flex items-center gap-1 px-4 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shadow-md shadow-cyan-500/25 transition-colors"
          >
            <span>{demoStep === demoSteps.length - 1 ? 'Finish Tour' : 'Next Step'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
