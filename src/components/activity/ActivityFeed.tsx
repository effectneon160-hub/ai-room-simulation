import React from 'react';
import { GlassPanel } from '../layout/GlassPanel';
import { useHomeStore } from '../../store/homeStore';
import {
  Activity,
  Info,
  AlertTriangle,
  AlertCircle,
  CheckCircle2 } from
'lucide-react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
export function ActivityFeed() {
  const { activityFeed } = useHomeStore();
  const getIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertCircle className="w-4 h-4 text-rose-400" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      default:
        return <Info className="w-4 h-4 text-cyan-400" />;
    }
  };
  return (
    <GlassPanel className="flex flex-col h-full max-h-[400px]">
      <div className="p-4 border-b border-white/10 flex items-center space-x-2 bg-slate-800/20">
        <Activity className="w-5 h-5 text-slate-400" />
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200">
          System Log
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar relative">
        {/* Fading gradient at top for smooth scroll effect */}
        <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-slate-900/40 to-transparent z-10 pointer-events-none" />

        <AnimatePresence initial={false}>
          {activityFeed.map((event) =>
          <motion.div
            key={event.id}
            initial={{
              opacity: 0,
              y: -10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            className="flex items-start space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
            
              <div className="mt-0.5 shrink-0">{getIcon(event.severity)}</div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm text-slate-200 truncate">
                  {event.title}
                </span>
                <span className="text-xs font-mono text-slate-500">
                  {format(new Date(event.timestamp), 'HH:mm:ss')}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </GlassPanel>);

}