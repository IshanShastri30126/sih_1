import React, { useState } from 'react';
import { useWeatherStore } from '../../stores/weatherStore';
import { Alert } from '../../types/weather';
import { 
  BellRing, 
  Send, 
  Globe, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  Smartphone, 
  Radio, 
  Layers, 
  Share2, 
  Play, 
  Square,
  Sparkles,
  ExternalLink,
  Filter
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import confetti from 'canvas-confetti';

export const AlertCenterView: React.FC = () => {
  const { 
    alerts, 
    setSelectedAlertForReview, 
    dispatchAlert, 
    soundEnabled 
  } = useWeatherStore();

  const [activeTab, setActiveTab] = useState<'queue' | 'composer' | 'history'>('queue');
  const [selectedAlertId, setSelectedAlertId] = useState<string>(alerts[0]?.id || '');
  const [targetLanguage, setTargetLanguage] = useState<string>('gu'); // Gujarati default
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Pending Review' | 'Approved' | 'Dispatched' | 'Rejected'>('All');

  // Channels state
  const [selectedChannels, setSelectedChannels] = useState<Alert['channels']>([
    'SMS', 
    'Voice Call', 
    'Web', 
    'API', 
    'Dashboard'
  ]);

  const currentAlert = alerts.find(a => a.id === selectedAlertId) || alerts[0];
  const translation = currentAlert?.translations[targetLanguage] || currentAlert?.translations['en'];
  const sourceEnglish = currentAlert?.translations['en'];

  const toggleChannel = (channel: Alert['channels'][number]) => {
    if (selectedChannels.includes(channel)) {
      setSelectedChannels(selectedChannels.filter(c => c !== channel));
    } else {
      setSelectedChannels([...selectedChannels, channel]);
    }
  };

  const handleSimulateVoice = () => {
    setIsPlayingVoice(true);
    // Auto stop after 5s simulation
    setTimeout(() => {
      setIsPlayingVoice(false);
    }, 5000);
  };

  const handleDispatch = () => {
    dispatchAlert(currentAlert.id, selectedChannels);
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#06b6d4', '#10b981', '#f59e0b', '#ef4444']
      });
    } catch (e) {}
  };

  const filteredAlerts = alerts.filter(a => {
    if (activeFilter === 'All') return true;
    return a.status === activeFilter;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-rose-400">
              National Warning Distribution System
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              Protocol: CAP-India v1.2 / NDMA
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white mt-1">
            Operational Alert Center & Multilingual Warning Composer
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Human-in-the-loop validation, automated Bhashini vernacular translation, and multi-channel broadcast
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-900/90 border border-slate-800 p-1.5 rounded-2xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('queue')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'queue' ? 'bg-cyan-500 text-slate-950 shadow-md font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Review Queue ({alerts.filter(a => a.status === 'Pending Review').length})
          </button>
          <button
            onClick={() => setActiveTab('composer')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'composer' ? 'bg-cyan-500 text-slate-950 shadow-md font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Alert Composer & Voice
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'history' ? 'bg-cyan-500 text-slate-950 shadow-md font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Alert History ({alerts.length})
          </button>
        </div>
      </div>

      {/* VIEW 1: REVIEW QUEUE */}
      {activeTab === 'queue' && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wide">
                Pending Forecaster Verification ({alerts.filter(a => a.status === 'Pending Review').length} Action Required)
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                Mandatory Senior Meteorologist Sign-off
              </span>
            </div>

            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-xl border transition-all ${
                    alert.status === 'Pending Review' 
                      ? 'bg-rose-950/20 border-rose-500/40 hover:border-rose-400' 
                      : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2.5">
                        <StatusBadge severity={alert.severity} size="sm" />
                        <span className="font-bold text-white text-sm">{alert.title}</span>
                        <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                          {alert.id}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
                        <span>Location: <strong className="text-slate-200">{alert.location}</strong></span>
                        <span>Lead: <strong className="text-purple-400">{alert.leadTime}</strong></span>
                        <span>Ensemble: <strong className="text-emerald-400">{alert.ensembleRatio}</strong></span>
                        <span>Physics: <strong className="text-emerald-400">{alert.physicsStatus}</strong></span>
                        <span>Probability: <strong className="text-rose-400">{alert.probability}%</strong></span>
                      </div>

                      <p className="text-xs text-slate-300 font-sans max-w-3xl pt-1">
                        {alert.translations.en?.headline}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-end lg:self-center shrink-0">
                      <button
                        onClick={() => {
                          setSelectedAlertId(alert.id);
                          setActiveTab('composer');
                        }}
                        className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
                      >
                        Preview Languages
                      </button>

                      {alert.status === 'Pending Review' && (
                        <button
                          onClick={() => setSelectedAlertForReview(alert)}
                          className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-950/50 transition-colors flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Review & Approve</span>
                        </button>
                      )}

                      {alert.status === 'Approved' && (
                        <button
                          onClick={() => {
                            setSelectedAlertId(alert.id);
                            setActiveTab('composer');
                          }}
                          className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-colors flex items-center gap-1.5"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Dispatch Warning</span>
                        </button>
                      )}

                      {alert.status === 'Dispatched' && (
                        <span className="px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-semibold flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Dispatched</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: ALERT COMPOSER & MULTILINGUAL BHASHINI EXPERIENCE */}
      {activeTab === 'composer' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Channels & Metadata (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md space-y-4">
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wide flex items-center justify-between">
                <span>Distribution Channels</span>
                <span className="text-[10px] text-cyan-400">{selectedChannels.length} Active</span>
              </h3>

              <div className="space-y-2">
                {[
                  { id: 'SMS', label: 'Cell Broadcast / SMS (NDMA Gateway)', icon: Smartphone },
                  { id: 'Voice Call', label: 'Automated Vernacular Voice Siren (IVR)', icon: Radio },
                  { id: 'Web', label: 'Mausam Public Portal & Dashboards', icon: Globe },
                  { id: 'API', label: 'CAP-India v1.2 Machine API', icon: Share2 },
                  { id: 'Dashboard', label: 'District Emergency Command Display', icon: Layers },
                ].map((channel) => {
                  const Icon = channel.icon;
                  const isChecked = selectedChannels.includes(channel.id as any);
                  return (
                    <label
                      key={channel.id}
                      onClick={() => toggleChannel(channel.id as any)}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                        isChecked 
                          ? 'bg-cyan-950/30 border-cyan-500/40 text-cyan-200' 
                          : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isChecked ? 'text-cyan-400' : 'text-slate-500'}`} />
                        <span className="text-xs font-medium">{channel.label}</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="rounded border-slate-700 text-cyan-500 focus:ring-0 cursor-pointer"
                      />
                    </label>
                  );
                })}
              </div>

              {/* Language Selector */}
              <div className="pt-2 border-t border-slate-800 space-y-2">
                <label className="text-xs font-semibold text-slate-300 block">
                  Select Local Vernacular Language:
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { code: 'gu', name: 'Gujarati (ગુજરાતી)' },
                    { code: 'hi', name: 'Hindi (हिंदी)' },
                    { code: 'mr', name: 'Marathi (मराठी)' },
                    { code: 'ta', name: 'Tamil (தமிழ்)' },
                    { code: 'te', name: 'Telugu (తెలుగు)' },
                    { code: 'bn', name: 'Bengali (বাংলা)' },
                    { code: 'en', name: 'English (Master)' },
                  ].map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setTargetLanguage(lang.code)}
                      className={`p-2 rounded-xl border text-xs font-medium text-left transition-all ${
                        targetLanguage === lang.code
                          ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-semibold'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dispatch Action Button */}
              <div className="pt-3 border-t border-slate-800 space-y-2">
                <button
                  onClick={handleDispatch}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>DISPATCH WARNING BROADCAST</span>
                </button>

                <p className="text-[10px] text-slate-500 font-mono text-center">
                  Integrated with Bhashini NLP Translation Pipeline
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Multilingual Side-by-Side & Voice Synthesizer Preview (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Side by side Translation View */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wide">
                    Side-by-Side Multilingual Verification
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                  Bhashini API Connected
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Source English */}
                <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800/80 pb-1.5">
                    <span>SOURCE (ENGLISH)</span>
                    <span className="text-slate-500">Official IMD Text</span>
                  </div>
                  <h4 className="text-xs font-bold text-white">
                    {sourceEnglish?.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {sourceEnglish?.body}
                  </p>
                  <div className="pt-2 text-[11px] font-mono text-emerald-400">
                    Action: {sourceEnglish?.recommendedAction}
                  </div>
                </div>

                {/* Translated Local Vernacular */}
                <div className="rounded-xl border border-cyan-500/40 bg-slate-950/70 p-4 space-y-2 relative">
                  <div className="flex items-center justify-between text-xs font-mono text-cyan-400 border-b border-cyan-500/20 pb-1.5">
                    <span>TRANSLATED ({translation?.language.toUpperCase()})</span>
                    <span className="text-[10px] text-cyan-300">{translation?.nativeTitle}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white">
                    {translation?.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {translation?.body}
                  </p>
                  <div className="pt-2 text-[11px] font-mono text-emerald-400">
                    Action: {translation?.recommendedAction}
                  </div>
                </div>
              </div>
            </div>

            {/* Voice Preview & Audio Wave Visualizer Simulation */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wide">
                    IVR Voice Call & Public Siren Audio Synthesis
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  Duration: ~{translation?.voiceAudioEstimatedDurationSec || 28}s
                </span>
              </div>

              {/* Audio Wave Visualizer Bar */}
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={handleSimulateVoice}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
                    isPlayingVoice
                      ? 'bg-rose-500 text-white animate-pulse'
                      : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20'
                  }`}
                >
                  {isPlayingVoice ? <Square className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-slate-950" />}
                  <span>{isPlayingVoice ? 'Playing Siren Simulation...' : 'Play Vernacular Voice Preview'}</span>
                </button>

                {/* Animated Audio Waveform Bars */}
                <div className="flex items-center gap-1 h-8">
                  {[24, 40, 16, 32, 48, 20, 36, 52, 28, 44, 18, 38, 46, 22, 34, 50, 18, 26, 42, 30].map((h, i) => (
                    <div
                      key={i}
                      className={`w-1 rounded-full transition-all duration-150 ${
                        isPlayingVoice 
                          ? 'bg-cyan-400 animate-pulse' 
                          : 'bg-slate-700'
                      }`}
                      style={{ height: isPlayingVoice ? `${Math.max(8, Math.round(h * Math.random()))}px` : '8px' }}
                    />
                  ))}
                </div>

                <div className="text-[11px] font-mono text-slate-400">
                  {isPlayingVoice ? 'Streaming 24kHz Audio' : 'Ready to test'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: ALERT HISTORY TABLE */}
      {activeTab === 'history' && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wide">
              Official Alert Log & Dissemination Records
            </h3>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              {(['All', 'Pending Review', 'Approved', 'Dispatched', 'Rejected'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    activeFilter === filter 
                      ? 'bg-slate-800 text-cyan-300 font-semibold shadow' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-[10px] font-mono uppercase text-slate-400">
                  <th className="py-3 px-3">Event / Title</th>
                  <th className="py-3 px-3">Location</th>
                  <th className="py-3 px-3">Severity</th>
                  <th className="py-3 px-3">Lead Time</th>
                  <th className="py-3 px-3">Ensemble Ratio</th>
                  <th className="py-3 px-3">Authorized By</th>
                  <th className="py-3 px-3">Channels</th>
                  <th className="py-3 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {filteredAlerts.map((alert) => (
                  <tr key={alert.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-sans font-semibold text-slate-200">{alert.title}</div>
                      <div className="text-[10px] text-slate-500">{alert.id}</div>
                    </td>
                    <td className="py-3 px-3 text-slate-300 font-sans">{alert.location}</td>
                    <td className="py-3 px-3">
                      <StatusBadge severity={alert.severity} size="sm" />
                    </td>
                    <td className="py-3 px-3 text-purple-400">{alert.leadTime}</td>
                    <td className="py-3 px-3 text-cyan-400">{alert.ensembleRatio}</td>
                    <td className="py-3 px-3 text-slate-400 font-sans truncate max-w-[140px]">
                      {alert.approvedBy || 'Pending Duty Sign-off'}
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex gap-1 flex-wrap">
                        {alert.channels.slice(0, 2).map(c => (
                          <span key={c} className="text-[9px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">
                            {c}
                          </span>
                        ))}
                        {alert.channels.length > 2 && (
                          <span className="text-[9px] bg-slate-800 px-1 py-0.5 rounded text-slate-400">
                            +{alert.channels.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                        alert.status === 'Dispatched' 
                          ? 'bg-emerald-950 text-emerald-400 border-emerald-500/40' 
                          : alert.status === 'Approved'
                          ? 'bg-cyan-950 text-cyan-400 border-cyan-500/40'
                          : alert.status === 'Pending Review'
                          ? 'bg-amber-950 text-amber-400 border-amber-500/40 animate-pulse'
                          : 'bg-rose-950 text-rose-400 border-rose-500/40'
                      }`}>
                        {alert.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
