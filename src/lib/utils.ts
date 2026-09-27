import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-IN').format(num);
}

export function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`;
}

export function getSeverityColor(severity: 'normal' | 'watch' | 'warning' | 'extreme' | 'catastrophic') {
  switch (severity) {
    case 'normal':
      return {
        bg: 'bg-emerald-500/10',
        text: 'text-emerald-400',
        border: 'border-emerald-500/30',
        badge: 'bg-emerald-500 text-slate-950',
        glow: 'shadow-[0_0_12px_rgba(16,185,129,0.3)]',
        colorHex: '#10b981',
      };
    case 'watch':
      return {
        bg: 'bg-amber-500/10',
        text: 'text-amber-400',
        border: 'border-amber-500/30',
        badge: 'bg-amber-500 text-slate-950',
        glow: 'shadow-[0_0_12px_rgba(245,158,11,0.3)]',
        colorHex: '#f59e0b',
      };
    case 'warning':
      return {
        bg: 'bg-orange-500/10',
        text: 'text-orange-400',
        border: 'border-orange-500/30',
        badge: 'bg-orange-500 text-white',
        glow: 'shadow-[0_0_12px_rgba(249,115,22,0.3)]',
        colorHex: '#f97316',
      };
    case 'extreme':
    case 'catastrophic':
      return {
        bg: 'bg-rose-500/10',
        text: 'text-rose-400',
        border: 'border-rose-500/40',
        badge: 'bg-rose-600 text-white animate-pulse',
        glow: 'shadow-[0_0_15px_rgba(225,29,72,0.4)]',
        colorHex: '#e11d48',
      };
    default:
      return {
        bg: 'bg-slate-500/10',
        text: 'text-slate-400',
        border: 'border-slate-500/30',
        badge: 'bg-slate-600 text-white',
        glow: '',
        colorHex: '#64748b',
      };
  }
}
