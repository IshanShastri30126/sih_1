import React from 'react';
import { 
  Activity, 
  Map, 
  CloudRain, 
  AlertTriangle, 
  Compass, 
  Layers, 
  ShieldAlert, 
  BellRing, 
  GitBranch, 
  History, 
  Cpu, 
  Database, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  Zap,
  LogOut
} from 'lucide-react';
import { useWeatherStore, AppPage } from '../../stores/weatherStore';
import { cn } from '../../lib/utils';

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

interface NavItem {
  id: AppPage;
  label: string;
  icon: any;
  badge?: string;
  badgeType?: 'danger' | 'warning' | 'info' | 'emerald';
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggleCollapse }) => {
  const { currentPage, setCurrentPage, alerts, theme, user, logout } = useWeatherStore();
  const isDark = theme === 'dark';

  const pendingAlertCount = alerts.filter(a => a.status === 'Pending Review').length;

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Overview', icon: Activity },
    { id: 'intelligence', label: 'Live Intelligence', icon: Map, badge: 'LIVE', badgeType: 'info' },
    { id: 'forecasts', label: 'Forecast Runs', icon: CloudRain, badge: '23', badgeType: 'emerald' },
    { id: 'anomalies', label: 'Anomaly Detection', icon: AlertTriangle, badge: '7 High', badgeType: 'danger' },
    { id: 'tracking', label: 'Storm Tracks', icon: Compass },
    { id: 'downscaling', label: 'Hotspot Downscaling', icon: Layers, badge: '5km', badgeType: 'info' },
    { id: 'impact', label: 'Impact Analysis', icon: ShieldAlert },
    { id: 'alerts', label: 'Alert Center', icon: BellRing, badge: pendingAlertCount > 0 ? `${pendingAlertCount} Rev` : undefined, badgeType: 'danger' },
    { id: 'pipeline', label: 'Data Pipeline', icon: GitBranch },
    { id: 'historical', label: 'Historical Events', icon: History },
    { id: 'monitoring', label: 'Model Monitoring', icon: Cpu },
    { id: 'data-sources', label: 'Data Sources', icon: Database },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside 
      className={cn(
        'relative flex flex-col backdrop-blur-xl transition-all duration-300 z-40 select-none h-screen',
        isDark 
          ? 'border-r border-slate-800/80 bg-slate-950/95' 
          : 'border-r border-slate-200 bg-white shadow-sm',
        isCollapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Brand Header */}
      <div className={cn(
        'flex h-16 items-center justify-between px-4',
        isDark ? 'border-b border-slate-800/80' : 'border-b border-slate-100'
      )}>
        {!isCollapsed && (
          <div className="flex items-center gap-2.5 overflow-hidden">
            <img
              src="/images/govt_emblem.jpg"
              alt="Emblem"
              className="h-9 w-9 rounded-full object-cover border-2 border-blue-200 shadow-sm shrink-0"
            />
            <div className="flex flex-col">
              <span className={cn(
                'text-sm font-bold tracking-tight font-mono flex items-center gap-1',
                isDark ? 'text-white' : 'text-slate-900'
              )}>
                MausamDrishti <span className={cn(
                  'text-xs px-1 py-0.2 rounded border',
                  isDark 
                    ? 'text-cyan-400 bg-cyan-950/60 border-cyan-500/30' 
                    : 'text-blue-600 bg-blue-50 border-blue-200'
                )}>AI</span>
              </span>
              <span className={cn(
                'text-[10px] uppercase tracking-wider font-medium',
                isDark ? 'text-slate-400' : 'text-slate-500'
              )}>
                Extreme Weather Intelligence
              </span>
            </div>
          </div>
        )}

        {isCollapsed && (
          <img
            src="/images/govt_emblem.jpg"
            alt="Emblem"
            className="mx-auto h-9 w-9 rounded-full object-cover border-2 border-blue-200 shadow-sm"
          />
        )}

        {/* Toggle Collapse Button */}
        <button
          onClick={onToggleCollapse}
          className={cn(
            'hidden lg:flex h-6 w-6 items-center justify-center rounded-md border transition-colors',
            isDark 
              ? 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800' 
              : 'border-slate-200 bg-slate-50 text-slate-400 hover:text-slate-700 hover:bg-slate-100'
          )}
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          const badgeClasses = isDark
            ? {
                danger: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
                warning: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
                info: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
                emerald: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
              }[item.badgeType || 'info']
            : {
                danger: 'bg-rose-50 text-rose-600 border-rose-200',
                warning: 'bg-amber-50 text-amber-600 border-amber-200',
                info: 'bg-blue-50 text-blue-600 border-blue-200',
                emerald: 'bg-emerald-50 text-emerald-600 border-emerald-200',
              }[item.badgeType || 'info'];

          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={cn(
                'group relative flex w-full items-center rounded-xl px-3 py-2.5 text-xs font-medium transition-all duration-150',
                isActive
                  ? isDark
                    ? 'bg-gradient-to-r from-cyan-500/15 to-blue-500/10 text-cyan-300 border border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.15)] font-semibold'
                    : 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200 shadow-sm font-semibold'
                  : isDark
                    ? 'text-slate-400 hover:bg-slate-900/80 hover:text-slate-200 border border-transparent'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
              )}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon 
                className={cn(
                  'h-4 w-4 shrink-0 transition-colors',
                  isActive 
                    ? isDark ? 'text-cyan-400' : 'text-blue-600' 
                    : isDark ? 'text-slate-400 group-hover:text-slate-200' : 'text-slate-400 group-hover:text-slate-700',
                  !isCollapsed ? 'mr-3' : 'mx-auto'
                )} 
              />

              {!isCollapsed && (
                <>
                  <span className="flex-1 text-left truncate">{item.label}</span>
                  {item.badge && (
                    <span className={cn('text-[10px] font-mono px-1.5 py-0.5 rounded-full border', badgeClasses)}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}

              {/* Active indicator bar */}
              {isActive && (
                <div className={cn(
                  'absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r',
                  isDark ? 'bg-cyan-400 shadow-[0_0_8px_#06b6d4]' : 'bg-blue-600 shadow-sm'
                )} />
              )}
            </button>
          );
        })}
      </nav>

      {/* User Profile & Logout */}
      {!isCollapsed && user && (
        <div className={cn(
          'border-t p-3 space-y-2',
          isDark ? 'border-slate-800/80 bg-slate-950/80' : 'border-slate-100 bg-slate-50/80'
        )}>
          <div className="flex items-center gap-2.5">
            <div className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0',
              isDark ? 'bg-cyan-500/20 text-cyan-400' : 'bg-blue-100 text-blue-700'
            )}>
              {user.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
            </div>
            <div className="flex-1 min-w-0">
              <div className={cn('text-xs font-semibold truncate', isDark ? 'text-slate-200' : 'text-slate-800')}>
                {user.name}
              </div>
              <div className={cn('text-[10px] truncate', isDark ? 'text-slate-500' : 'text-slate-400')}>
                {user.role} • {user.organization.split(',')[0]}
              </div>
            </div>
            <button
              onClick={logout}
              className={cn(
                'p-1.5 rounded-lg transition-colors shrink-0',
                isDark ? 'text-slate-500 hover:text-rose-400 hover:bg-rose-500/10' : 'text-slate-400 hover:text-rose-600 hover:bg-rose-50'
              )}
              title="Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Operational Footer Details */}
      {!isCollapsed && (
        <div className={cn(
          'border-t p-3 space-y-2 text-[11px] font-mono',
          isDark ? 'border-slate-800/80 bg-slate-950/80' : 'border-slate-100 bg-white'
        )}>
          <div className={cn('flex items-center justify-between', isDark ? 'text-slate-400' : 'text-slate-500')}>
            <span className={cn('flex items-center gap-1.5', isDark ? 'text-slate-300' : 'text-slate-600')}>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>IMD Cluster:</span>
            </span>
            <span className="text-emerald-500 font-semibold">Active</span>
          </div>

          <div className={cn('flex items-center justify-between', isDark ? 'text-slate-400' : 'text-slate-500')}>
            <span>GPU Latent Diffuser:</span>
            <span className={isDark ? 'text-cyan-400' : 'text-blue-600'}>74% • A100-80G</span>
          </div>

          <div className={cn('flex items-center justify-between', isDark ? 'text-slate-400' : 'text-slate-500')}>
            <span>Run Sync:</span>
            <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>12:00 UTC (18m ago)</span>
          </div>

          <div className={cn(
            'pt-2 border-t flex items-center justify-between text-[10px]',
            isDark ? 'border-slate-800/60 text-slate-500' : 'border-slate-100 text-slate-400'
          )}>
            <span>MausamDrishti v2.4</span>
            <span className={isDark ? 'text-cyan-500/80' : 'text-blue-500'}>SIH 2026 Ready</span>
          </div>
        </div>
      )}

      {isCollapsed && (
        <div className={cn(
          'border-t p-2 flex flex-col items-center gap-2',
          isDark ? 'border-slate-800' : 'border-slate-200'
        )}>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" title="System Operational" />
          <span title="GPU A100 74%"><Cpu className={cn('w-4 h-4', isDark ? 'text-cyan-400' : 'text-blue-600')} /></span>
          {user && (
            <button onClick={logout} title="Logout" className="text-slate-400 hover:text-rose-500 transition-colors">
              <LogOut className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}
    </aside>
  );
};
