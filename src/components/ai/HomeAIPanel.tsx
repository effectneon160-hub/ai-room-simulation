import React from 'react';
import { GlassPanel } from '../layout/GlassPanel';
import { useHomeStore } from '../../store/homeStore';
import { computeAIRecommendations, computeEnergyUsage } from '../../store/rules';
import { AIMode, AIActionKey } from '../../store/types';
import { Cpu, Sparkles, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
const MODES: {
  id: AIMode;
  label: string;
}[] = [
{
  id: 'relax',
  label: 'Relax'
},
{
  id: 'thinking',
  label: 'Auto'
},
{
  id: 'performing',
  label: 'Active'
},
{
  id: 'away',
  label: 'Away'
},
{
  id: 'night',
  label: 'Night'
}];

export function HomeAIPanel() {
  const store = useHomeStore();
  const { aiMode, setAIMode, devices } = store;
  const energyUsage = computeEnergyUsage(devices);
  const recommendations = computeAIRecommendations(aiMode, devices, energyUsage);
  const applyAction = (key: AIActionKey) => {
    switch (key) {
      case 'lockAllDoors':
        devices.security.doors.forEach((d) => {
          if (!d.locked) store.toggleDoorLock(d.id);
        });
        break;
      case 'dimLights20':
        devices.lights.forEach((l) => {
          if (l.on && l.brightness > 20) store.setLightBrightness(l.id, 20);
        });
        break;
      case 'armAway':
        store.setAlarmMode('away');
        break;
      case 'setTemp78':
        store.setTargetTemp(78);
        break;
      case 'dimLivingRoom40':
        devices.lights.forEach((l) => {
          if (l.room === 'Living Room' && l.on && l.brightness > 40) {
            store.setLightBrightness(l.id, 40);
          }
        });
        break;
      case 'ecoMode':
        // Eco: nudge temp toward an efficient setpoint
        store.setTargetTemp(76);
        break;
      case 'purifierHigh':
        if (!devices.airQuality.purifier.on) store.togglePurifier();
        store.setPurifierSpeed('high');
        break;
    }
  };
  return (
    <GlassPanel glowColor="violet" className="flex flex-col h-full">
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-violet-500/5">
        <div className="flex items-center space-x-2">
          <Cpu className="w-5 h-5 text-violet-400" />
          <h2 className="text-sm font-bold uppercase tracking-widest text-violet-100">
            Home AI
          </h2>
        </div>
        <div className="flex items-center space-x-1">
          <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
          <span className="text-xs font-mono text-violet-400">ONLINE</span>
        </div>
      </div>

      <div className="p-4 space-y-6 flex-1 overflow-y-auto no-scrollbar">
        {/* Mode Selector */}
        <div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            Operating Mode
          </div>
          <div className="flex flex-wrap gap-2">
            {MODES.map((mode) =>
            <button
              key={mode.id}
              onClick={() => setAIMode(mode.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${aiMode === mode.id ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30 shadow-[inset_0_0_10px_rgba(139,92,246,0.2)]' : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 border border-transparent'}`}>
              
                {mode.label}
              </button>
            )}
          </div>
        </div>

        {/* Recommendations */}
        <div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center">
            <Sparkles className="w-3 h-3 mr-1.5 text-violet-400" />
            Live Suggestions
          </div>

          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {recommendations.length === 0 ?
              <motion.div
                key="empty"
                initial={{
                  opacity: 0
                }}
                animate={{
                  opacity: 1
                }}
                exit={{
                  opacity: 0
                }}
                className="text-sm text-slate-500 italic p-4 text-center border border-dashed border-white/10 rounded-xl">
                
                  System optimized. No current suggestions.
                </motion.div> :

              recommendations.map((rec) =>
              <motion.div
                key={rec.id}
                initial={{
                  opacity: 0,
                  x: 20
                }}
                animate={{
                  opacity: 1,
                  x: 0
                }}
                exit={{
                  opacity: 0,
                  x: -20
                }}
                className="p-3 rounded-xl bg-slate-800/40 border border-white/5">
                
                    <div className="flex justify-between items-start mb-1">
                      <span
                    className={`text-xs font-bold uppercase tracking-wider ${rec.severity === 'critical' ? 'text-rose-400' : rec.severity === 'warning' ? 'text-amber-400' : rec.severity === 'success' ? 'text-emerald-400' : 'text-cyan-400'}`}>
                    
                        {rec.title}
                      </span>
                    </div>
                    <p className="text-sm text-slate-300 mb-3">
                      {rec.description}
                    </p>

                    {rec.suggestedAction && rec.actionKey &&
                <button
                  onClick={() => applyAction(rec.actionKey!)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-violet-500/10 hover:bg-violet-500/20 text-violet-300 text-xs font-bold uppercase tracking-wider transition-colors border border-violet-500/20">
                  
                        <span>{rec.suggestedAction}</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                }
                  </motion.div>
              )
              }
            </AnimatePresence>
          </div>
        </div>
      </div>
    </GlassPanel>);

}