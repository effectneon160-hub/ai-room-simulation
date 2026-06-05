import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glowColor?: 'cyan' | 'violet' | 'emerald' | 'amber' | 'rose' | 'none';
  interactive?: boolean;
}
export function GlassPanel({
  children,
  className,
  glowColor = 'none',
  interactive = false,
  ...props
}: GlassPanelProps) {
  const glowClasses = {
    cyan: 'shadow-[inset_0_0_20px_rgba(34,211,238,0.05)] border-cyan-500/20',
    violet:
    'shadow-[inset_0_0_20px_rgba(139,92,246,0.05)] border-violet-500/20',
    emerald:
    'shadow-[inset_0_0_20px_rgba(16,185,129,0.05)] border-emerald-500/20',
    amber: 'shadow-[inset_0_0_20px_rgba(245,158,11,0.05)] border-amber-500/20',
    rose: 'shadow-[inset_0_0_20px_rgba(244,63,94,0.05)] border-rose-500/20',
    none: 'border-white/10'
  };
  return (
    <div
      className={cn(
        'relative bg-slate-900/40 backdrop-blur-xl border rounded-2xl overflow-hidden',
        glowClasses[glowColor],
        interactive &&
        'transition-all duration-300 hover:bg-slate-800/50 hover:border-white/20 cursor-pointer',
        className
      )}
      {...props}>
      
      {/* Subtle top highlight for 3D effect */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      {children}
    </div>);

}