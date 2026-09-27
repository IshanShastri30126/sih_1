import React from 'react';
import { cn } from '../../lib/utils';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: LucideIcon;
  badge?: string;
  badgeType?: 'danger' | 'warning' | 'info' | 'success' | 'neutral';
  trend?: {
    direction: 'up' | 'down' | 'steady';
    label: string;
  };
  accentColor?: 'cyan' | 'red' | 'amber' | 'emerald' | 'blue';
  className?: string;
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  subtext,
  icon: Icon,
  badge,
  badgeType = 'neutral',
  accentColor = 'cyan',
  className,
  onClick,
}) => {
  const accentBorder = {
    cyan: 'hover:border-cyan-500/50 group-hover:text-cyan-400',
    red: 'hover:border-rose-500/50 group-hover:text-rose-400',
    amber: 'hover:border-amber-500/50 group-hover:text-amber-400',
    emerald: 'hover:border-emerald-500/50 group-hover:text-emerald-400',
    blue: 'hover:border-blue-500/50 group-hover:text-blue-400',
  }[accentColor];

  const badgeStyles = {
    danger: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    info: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    neutral: 'bg-slate-800 text-slate-300 border-slate-700',
  }[badgeType];

  return (
    <div 
      onClick={onClick}
      className={cn(
        'group relative overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/70 p-4 backdrop-blur-md transition-all duration-200',
        onClick ? 'cursor-pointer hover:bg-slate-800/50 hover:shadow-lg' : '',
        accentBorder,
        className
      )}
    >
      <div className="flex items-start justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-slate-400 font-mono">
          {label}
        </span>
        {Icon && (
          <div className="rounded-lg bg-slate-800/80 p-2 text-slate-400 group-hover:text-cyan-400 transition-colors">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl lg:text-3xl font-bold font-mono tracking-tight text-white tabular-nums">
          {value}
        </span>
        {badge && (
          <span className={cn('text-[10px] font-semibold px-2 py-0.5 rounded-full border', badgeStyles)}>
            {badge}
          </span>
        )}
      </div>

      {subtext && (
        <p className="mt-1 text-xs text-slate-400 truncate">
          {subtext}
        </p>
      )}

      {/* Subtle bottom edge glow on hover */}
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/0 to-transparent group-hover:via-cyan-500/40 transition-all" />
    </div>
  );
};
