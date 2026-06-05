import React from 'react';
import { GlassPanel } from '../layout/GlassPanel';
import { useHomeStore } from '../../store/homeStore';
import { computeDiagnostics } from '../../store/rules';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  AlertCircle,
  Wrench } from
'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
export function DiagnosticsPanel() {
  const { devices } = useHomeStore();
  const diagnostics = computeDiagnostics(devices);
  const hasCritical = diagnostics.some((d) => d.severity === 'critical');
  const hasWarning = diagnostics.some((d) => d.severity === 'warning');
  const headerColor = hasCritical ?
  'text-rose-400' :
  hasWarning ?
  'text-amber-400' :
  'text-emerald-400';
  const HeaderIcon = hasCritical || hasWarning ? ShieldAlert : ShieldCheck;
  return (
    <GlassPanel
      glowColor={hasCritical ? 'rose' : hasWarning ? 'amber' : 'emerald'}
      className="flex flex-col h-full">
      
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-slate-800/20">
        <div className="flex items-center space-x-2">
          <HeaderIcon className={`w-5 h-5 ${headerColor}`} />
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200">
            Diagnostics
          </h2>
        </div>
        <div
          className={`text-xs font-mono font-bold px-2 py-1 rounded-md bg-slate-800 ${headerColor}`}>
          
          {diagnostics.length} ISSUES
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto no-scrollbar space-y-3">
        <AnimatePresence mode="popLayout">
          {diagnostics.length === 0 ?
          <motion.div
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            exit={{
              opacity: 0
            }}
            className="flex flex-col items-center justify-center h-full text-slate-500 space-y-2">
            
              <ShieldCheck className="w-8 h-8 text-emerald-500/50" />
              <span className="text-sm uppercase tracking-wider font-bold">
                All Systems Nominal
              </span>
            </motion.div> :

          diagnostics.map((issue) =>
          <motion.div
            key={issue.id}
            initial={{
              opacity: 0,
              scale: 0.95
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            exit={{
              opacity: 0,
              scale: 0.95
            }}
            className={`p-3 rounded-xl border ${issue.severity === 'critical' ? 'bg-rose-500/10 border-rose-500/20' : issue.severity === 'warning' ? 'bg-amber-500/10 border-amber-500/20' : 'bg-cyan-500/10 border-cyan-500/20'}`}>
            
                <div className="flex items-start space-x-3">
                  <div className="mt-0.5">
                    {issue.severity === 'critical' ?
                <AlertCircle className="w-4 h-4 text-rose-400" /> :
                issue.severity === 'warning' ?
                <AlertTriangle className="w-4 h-4 text-amber-400" /> :

                <ShieldAlert className="w-4 h-4 text-cyan-400" />
                }
                  </div>
                  <div className="flex-1">
                    <h3
                  className={`text-sm font-bold ${issue.severity === 'critical' ? 'text-rose-400' : issue.severity === 'warning' ? 'text-amber-400' : 'text-cyan-400'}`}>
                  
                      {issue.title}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1">
                      {issue.description}
                    </p>

                    {issue.recommendedFix &&
                <div className="mt-3 flex items-center space-x-2 text-xs text-slate-400 bg-slate-900/50 p-2 rounded-lg">
                        <Wrench className="w-3 h-3" />
                        <span>{issue.recommendedFix}</span>
                      </div>
                }
                  </div>
                </div>
              </motion.div>
          )
          }
        </AnimatePresence>
      </div>
    </GlassPanel>);

}