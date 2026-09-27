import React from 'react';
import { 
  Search, 
  Bell, 
  MapPin, 
  Calendar, 
  Database, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Menu,
  Sun,
  Moon
} from 'lucide-react';
import { useWeatherStore } from '../../stores/weatherStore';
import { cn } from '../../lib/utils';

interface TopBarProps {
  onToggleSidebar: () => void;
  isSidebarCollapsed: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({ onToggleSidebar }) => {
  const {
    selectedRegion,
    setSelectedRegion,
    forecastWindow,
    setForecastWindow,
    currentRunName,
    setCommandPaletteOpen,
    isDemoMode,
    setDemoMode,
    soundEnabled,
    toggleSound,
    alerts,
    setSelectedAlertForReview,
    theme,
    toggleTheme,
    user,
  } = useWeatherStore();

  const isDark = theme === 'dark';
  const pendingAlertCount = alerts.filter(a => a.status === 'Pending Review').length;

  const states = [
    'All India', 'Gujarat', 'Maharashtra', 'Odisha', 'Rajasthan',
    'Sikkim', 'Tamil Nadu', 'Kerala', 'West Bengal',
  ];

  const forecastWindows = [
    'Next 10 Days', 'Next 7 Days', 'Next 5 Days', 'Next 48 Hours', 'Next 24 Hours',
  ];

  return (
    <header className={cn(
      'sticky top-0 z-30 h-16 w-full backdrop-blur-xl px-4 lg:px-6 flex items-center justify-between gap-4',
      isDark 
        ? 'border-b border-slate-800/80 bg-slate-950/80' 
        : 'border-b border-slate-200 bg-white/90 shadow-sm'
    )}>
      {/* Left controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className={cn(
            'rounded-lg p-2 transition-colors lg:hidden',
            isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800/80' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
          )}
          title="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Region / State Selector */}
        <div className={cn(
          'flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs',
          isDark ? 'bg-slate-900/90 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-600'
        )}>
          <MapPin className={cn('w-3.5 h-3.5', isDark ? 'text-cyan-400' : 'text-blue-600')} />
          <span className={cn('hidden sm:inline', isDark ? 'text-slate-400' : 'text-slate-500')}>Region:</span>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className={cn(
              'bg-transparent font-medium focus:outline-none cursor-pointer',
              isDark ? 'text-slate-100' : 'text-slate-800'
            )}
          >
            {states.map(s => (
              <option key={s} value={s} className={isDark ? 'bg-slate-900 text-slate-100' : 'bg-white text-slate-800'}>{s}</option>
            ))}
          </select>
        </div>

        {/* Forecast Window */}
        <div className={cn(
          'hidden md:flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs',
          isDark ? 'bg-slate-900/90 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-600'
        )}>
          <Calendar className={cn('w-3.5 h-3.5', isDark ? 'text-brand-sky' : 'text-blue-600')} />
          <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Window:</span>
          <select
            value={forecastWindow}
            onChange={(e) => setForecastWindow(e.target.value)}
            className={cn(
              'bg-transparent font-medium focus:outline-none cursor-pointer',
              isDark ? 'text-slate-100' : 'text-slate-800'
            )}
          >
            {forecastWindows.map(w => (
              <option key={w} value={w} className={isDark ? 'bg-slate-900 text-slate-100' : 'bg-white text-slate-800'}>{w}</option>
            ))}
          </select>
        </div>

        {/* Current Run */}
        <div className={cn(
          'hidden xl:flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs',
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
        )}>
          <Database className="w-3.5 h-3.5 text-emerald-500" />
          <span className="font-mono text-emerald-600 font-medium">{currentRunName}</span>
        </div>
      </div>

      {/* Center Command Search Trigger */}
      <button
        onClick={() => setCommandPaletteOpen(true)}
        className={cn(
          'hidden sm:flex items-center justify-between w-72 lg:w-96 rounded-xl border px-3 py-1.5 text-xs transition-all shadow-inner',
          isDark 
            ? 'bg-slate-900/90 border-slate-800/90 text-slate-400 hover:border-cyan-500/40 hover:text-slate-200' 
            : 'bg-slate-50 border-slate-200 text-slate-400 hover:border-blue-300 hover:text-slate-600'
        )}
      >
        <span className="flex items-center gap-2">
          <Search className={cn('w-3.5 h-3.5', isDark ? 'text-cyan-400' : 'text-blue-500')} />
          <span>Search forecasts, locations, models...</span>
        </span>
        <kbd className={cn(
          'hidden lg:inline-flex items-center gap-0.5 rounded border px-1.5 py-0.5 text-[10px] font-mono',
          isDark ? 'border-slate-700 bg-slate-800 text-slate-400' : 'border-slate-200 bg-white text-slate-400'
        )}>
          ⌘ K
        </kbd>
      </button>

      {/* Right controls */}
      <div className="flex items-center gap-2.5">
        {/* SIH Demo Mode Toggle Button */}
        <button
          onClick={() => setDemoMode(!isDemoMode)}
          className={cn(
            'flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all border',
            isDemoMode 
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold border-blue-300 shadow-md animate-pulse'
              : isDark 
                ? 'bg-cyan-950/40 text-cyan-300 border-cyan-500/30 hover:bg-cyan-900/50'
                : 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100'
          )}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="tracking-wide hidden sm:inline">DEMO</span>
          {isDemoMode && <span className="w-1.5 h-1.5 rounded-full bg-white ml-0.5" />}
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={cn(
            'rounded-xl border p-2 transition-colors',
            isDark 
              ? 'border-slate-800 bg-slate-900/90 text-slate-400 hover:text-amber-300' 
              : 'border-slate-200 bg-white text-slate-400 hover:text-blue-600'
          )}
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Operational Status Dot */}
        <div className={cn(
          'hidden lg:flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs',
          isDark ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-600'
        )}>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="font-medium">Operational</span>
        </div>

        {/* Sound toggle */}
        <button
          onClick={toggleSound}
          className={cn(
            'rounded-xl border p-2 transition-colors',
            isDark 
              ? 'border-slate-800 bg-slate-900/90 text-slate-400 hover:text-white' 
              : 'border-slate-200 bg-white text-slate-400 hover:text-slate-700'
          )}
          title={soundEnabled ? 'Mute Audio Alerts' : 'Unmute Audio Alerts'}
        >
          {soundEnabled 
            ? <Volume2 className={cn('w-4 h-4', isDark ? 'text-cyan-400' : 'text-blue-500')} /> 
            : <VolumeX className="w-4 h-4 text-slate-400" />
          }
        </button>

        {/* Notifications & Pending Reviews */}
        <div className="relative">
          <button
            onClick={() => {
              const pending = alerts.find(a => a.status === 'Pending Review');
              if (pending) setSelectedAlertForReview(pending);
            }}
            className={cn(
              'relative rounded-xl border p-2 transition-colors',
              isDark 
                ? 'border-slate-800 bg-slate-900/90 text-slate-400 hover:text-white' 
                : 'border-slate-200 bg-white text-slate-400 hover:text-slate-700'
            )}
            title="Active Operational Notifications"
          >
            <Bell className="w-4 h-4" />
            {pendingAlertCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-md">
                {pendingAlertCount}
              </span>
            )}
          </button>
        </div>

        {/* User Profile & Role Clearance */}
        <div className={cn(
          'flex items-center gap-2.5 pl-2 border-l',
          isDark ? 'border-slate-800' : 'border-slate-200'
        )}>
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-md">
            {user ? user.name.split(' ').map(w => w[0]).join('').slice(0, 2) : 'MD'}
          </div>
          <div className="hidden xl:block text-left">
            <div className="flex items-center gap-1.5">
              <span className={cn('text-xs font-semibold', isDark ? 'text-slate-200' : 'text-slate-800')}>
                {user?.name || 'Duty Forecaster'}
              </span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-blue-100 text-blue-800 border border-blue-200">
                {user?.clearanceLevel ? user.clearanceLevel.replace('_', ' ') : 'VERIFIED'}
              </span>
            </div>
            <div className={cn('text-[10px] font-mono', isDark ? 'text-cyan-400' : 'text-blue-600')}>
              {user?.role || 'Admin'} • {user?.badgeId || 'GOV-HQ-881'}
            </div>
          </div>
          <button
            onClick={() => useWeatherStore.getState().logout()}
            className={cn(
              'ml-1 text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-colors',
              isDark 
                ? 'border-slate-700 bg-slate-900 text-slate-400 hover:text-rose-400 hover:border-rose-900' 
                : 'border-slate-200 bg-slate-50 text-slate-500 hover:text-rose-600 hover:border-rose-200'
            )}
            title="Log out and return to portal"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};
