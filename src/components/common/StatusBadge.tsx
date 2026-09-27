import React from 'react';
import { getSeverityColor, cn } from '../../lib/utils';
import { SeverityLevel } from '../../types/weather';
import { AlertCircle, AlertTriangle, CheckCircle2, Flame, Info } from 'lucide-react';

interface StatusBadgeProps {
  severity: SeverityLevel;
  text?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  severity, 
  text, 
  size = 'md',
  className 
}) => {
  const styles = getSeverityColor(severity);
  const displayText = text || severity.toUpperCase();

  const getIcon = () => {
    switch (severity) {
      case 'extreme':
      case 'catastrophic':
        return <Flame className="w-3.5 h-3.5 mr-1 animate-pulse" />;
      case 'warning':
        return <AlertTriangle className="w-3.5 h-3.5 mr-1" />;
      case 'watch':
        return <AlertCircle className="w-3.5 h-3.5 mr-1" />;
      case 'normal':
        return <CheckCircle2 className="w-3.5 h-3.5 mr-1" />;
      default:
        return <Info className="w-3.5 h-3.5 mr-1" />;
    }
  };

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-semibold',
    lg: 'text-sm px-3.5 py-1.5 font-bold',
  }[size];

  return (
    <span 
      className={cn(
        'inline-flex items-center rounded-full border transition-all',
        styles.bg,
        styles.text,
        styles.border,
        styles.glow,
        sizeClasses,
        className
      )}
    >
      {getIcon()}
      <span>{displayText}</span>
    </span>
  );
};
