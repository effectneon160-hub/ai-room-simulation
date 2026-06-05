import React from 'react';
import { GlassPanel } from '../layout/GlassPanel';
import { useHomeStore } from '../../store/homeStore';
import { computeEnergyUsage, computeDiagnostics } from '../../store/rules';
import { Activity, Zap, Shield, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
export function OverviewCards() {
  const { devices, aiMode } = useHomeStore();
  const activeDevicesCount =
  devices.lights.filter((l) => l.on).length + (
  devices.climate.mode !== 'off' ? 1 : 0) +
  devices.cameras.filter((c) => c.enabled).length + (
  devices.airQuality.purifier.on ? 1 : 0);
  const energyUsage = computeEnergyUsage(devices);
  const diagnostics = computeDiagnostics(devices);
  const healthScore = Math.max(0, 100 - diagnostics.length * 15);
  const cards = [
  {
    title: 'Active Devices',
    value: activeDevicesCount.toString(),
    icon: Activity,
    color: 'text-cyan-400',
    glow: 'cyan' as const
  },
  {
    title: 'Current Load',
    value: `${energyUsage} kW`,
    icon: Zap,
    color: energyUsage > 4 ? 'text-amber-400' : 'text-emerald-400',
    glow: energyUsage > 4 ? 'amber' as const : 'emerald' as const
  },
  {
    title: 'System Health',
    value: `${healthScore}%`,
    icon: Shield,
    color: healthScore < 80 ? 'text-rose-400' : 'text-emerald-400',
    glow: healthScore < 80 ? 'rose' as const : 'emerald' as const
  },
  {
    title: 'AI Mode',
    value: aiMode.charAt(0).toUpperCase() + aiMode.slice(1),
    icon: Cpu,
    color: 'text-violet-400',
    glow: 'violet' as const
  }];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.title}
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: idx * 0.1
            }}>
            
            <GlassPanel
              glowColor={card.glow}
              className="p-4 flex flex-col justify-between h-full">
              
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {card.title}
                </span>
                <Icon className={`w-4 h-4 ${card.color}`} />
              </div>
              <div className={`text-2xl font-mono font-bold ${card.color}`}>
                {card.value}
              </div>
            </GlassPanel>
          </motion.div>);

      })}
    </div>);

}