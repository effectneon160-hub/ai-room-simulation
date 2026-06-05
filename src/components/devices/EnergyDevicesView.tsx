import React from 'react';
import { useHomeStore } from '../../store/homeStore';
import { Zap, Thermometer, Lightbulb, Wind } from 'lucide-react';
export function EnergyDevicesView() {
  const { devices } = useHomeStore();
  // Calculate approximate usage per category for display
  let hvacUsage = 0;
  if (devices.climate.mode !== 'off') {
    const tempDiff = Math.abs(
      devices.climate.targetTemp - devices.climate.currentTemp
    );
    hvacUsage = tempDiff > 0 ? 3.5 : 0.2;
  }
  let lightingUsage = 0;
  devices.lights.forEach((l) => {
    if (l.on) lightingUsage += l.brightness / 100 * 0.06;
  });
  let airUsage = 0;
  if (devices.airQuality.purifier.on) {
    const speeds = {
      low: 0.05,
      med: 0.1,
      high: 0.2
    };
    airUsage = speeds[devices.airQuality.purifier.speed];
  }
  const baseUsage = 0.5;
  const consumers = [
  {
    name: 'HVAC System',
    icon: Thermometer,
    usage: hvacUsage,
    color: 'text-amber-400',
    bg: 'bg-amber-500/20'
  },
  {
    name: 'Lighting',
    icon: Lightbulb,
    usage: lightingUsage,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/20'
  },
  {
    name: 'Air Purifier',
    icon: Wind,
    usage: airUsage,
    color: 'text-blue-400',
    bg: 'bg-blue-500/20'
  },
  {
    name: 'Base Load (Always On)',
    icon: Zap,
    usage: baseUsage,
    color: 'text-slate-400',
    bg: 'bg-slate-700/50'
  }].
  sort((a, b) => b.usage - a.usage);
  const total = hvacUsage + lightingUsage + airUsage + baseUsage;
  return (
    <div className="space-y-4">
      {consumers.map((item, idx) => {
        const Icon = item.icon;
        const percentage = total > 0 ? item.usage / total * 100 : 0;
        return (
          <div
            key={idx}
            className="p-4 rounded-xl bg-slate-800/40 border border-white/5">
            
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${item.bg} ${item.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-sm font-bold text-slate-200">
                  {item.name}
                </span>
              </div>
              <div className="text-sm font-mono font-bold text-slate-300">
                {item.usage.toFixed(2)} kW
              </div>
            </div>

            <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${item.bg.replace('/20', '')}`}
                style={{
                  width: `${percentage}%`
                }} />
              
            </div>
          </div>);

      })}
    </div>);

}