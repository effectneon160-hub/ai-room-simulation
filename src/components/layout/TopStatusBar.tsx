import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import {
  CloudRain,
  Wifi,
  ShieldAlert,
  ShieldCheck,
  RotateCcw,
  Play } from
'lucide-react';
import { useHomeStore } from '../../store/homeStore';
import { computeDiagnostics } from '../../store/rules';
export function TopStatusBar() {
  const [time, setTime] = useState(new Date());
  const { devices, resetScenario, replayScenario, isReplaying } = useHomeStore();
  // Real-time clock for UI
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  const diagnostics = computeDiagnostics(devices);
  const hasCritical = diagnostics.some((d) => d.severity === 'critical');
  const hasWarning = diagnostics.some((d) => d.severity === 'warning');
  let statusColor = 'text-emerald-400';
  let StatusIcon = ShieldCheck;
  let statusText = 'System Nominal';
  if (hasCritical) {
    statusColor = 'text-rose-400';
    StatusIcon = ShieldAlert;
    statusText = 'Critical Issues';
  } else if (hasWarning) {
    statusColor = 'text-amber-400';
    StatusIcon = ShieldAlert;
    statusText = 'Warnings Active';
  }
  return (
    <div className="w-full h-16 bg-slate-900/60 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6 z-50 relative">
      {/* Left: Time & Weather */}
      <div className="flex items-center space-x-6">
        <div className="flex flex-col">
          <span className="text-xl font-mono font-bold text-white tracking-tight">
            {format(time, 'HH:mm')}
          </span>
          <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
            {format(time, 'MMM dd, yyyy')}
          </span>
        </div>

        <div className="h-8 w-px bg-white/10" />

        <div className="flex items-center space-x-3 text-slate-300">
          <CloudRain className="w-5 h-5 text-cyan-400" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold">68°F / Rain</span>
            <span className="text-xs text-slate-400">Seattle, WA</span>
          </div>
        </div>
      </div>

      {/* Center: Title / Status */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center space-x-3">
        <StatusIcon className={`w-5 h-5 ${statusColor}`} />
        <span
          className={`text-sm font-bold tracking-widest uppercase ${statusColor}`}>
          
          {statusText}
        </span>
      </div>

      {/* Right: Connection & Controls */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2 text-slate-400">
          <Wifi className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-mono">192.168.1.100</span>
        </div>

        <div className="h-8 w-px bg-white/10" />

        <div className="flex items-center space-x-2">
          <button
            onClick={resetScenario}
            disabled={isReplaying}
            className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 transition-colors disabled:opacity-50"
            title="Reset Scenario">
            
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={replayScenario}
            disabled={isReplaying}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-brand/10 hover:bg-brand/20 text-brand transition-colors disabled:opacity-50 border border-brand/20">
            
            <Play className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">
              {isReplaying ? 'Replaying...' : 'Replay'}
            </span>
          </button>
        </div>
      </div>
    </div>);

}