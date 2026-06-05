import React from 'react';
import { useHomeStore } from '../../store/homeStore';
import { Thermometer, Wind, Flame, Snowflake, Power } from 'lucide-react';
export function ClimateView() {
  const { devices, setTargetTemp, setClimateMode } = useHomeStore();
  const { climate } = devices;
  const modes = [
  {
    id: 'cool',
    icon: Snowflake,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/20',
    border: 'border-cyan-500/30'
  },
  {
    id: 'heat',
    icon: Flame,
    color: 'text-rose-400',
    bg: 'bg-rose-500/20',
    border: 'border-rose-500/30'
  },
  {
    id: 'auto',
    icon: Wind,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/20',
    border: 'border-emerald-500/30'
  },
  {
    id: 'off',
    icon: Power,
    color: 'text-slate-400',
    bg: 'bg-slate-700/50',
    border: 'border-slate-600'
  }] as
  const;
  return (
    <div className="space-y-6">
      {/* Main Thermostat */}
      <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-slate-800/40 border border-white/5 relative overflow-hidden">
        {/* Glow effect based on mode */}
        {climate.mode === 'cool' &&
        <div className="absolute inset-0 bg-cyan-500/5 blur-3xl" />
        }
        {climate.mode === 'heat' &&
        <div className="absolute inset-0 bg-rose-500/5 blur-3xl" />
        }

        <div className="relative z-10 flex flex-col items-center">
          <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">
            Target Temp
          </div>
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setTargetTemp(climate.targetTemp - 1)}
              className="w-10 h-10 rounded-full bg-slate-700/50 hover:bg-slate-600 flex items-center justify-center text-slate-300 text-xl font-bold transition-colors">
              
              -
            </button>
            <div className="text-6xl font-mono font-bold text-white tracking-tighter">
              {climate.targetTemp}°
            </div>
            <button
              onClick={() => setTargetTemp(climate.targetTemp + 1)}
              className="w-10 h-10 rounded-full bg-slate-700/50 hover:bg-slate-600 flex items-center justify-center text-slate-300 text-xl font-bold transition-colors">
              
              +
            </button>
          </div>
          <div className="mt-4 text-sm text-slate-400">
            Current:{' '}
            <span className="font-mono text-slate-200">
              {climate.currentTemp}°
            </span>
          </div>
        </div>
      </div>

      {/* Mode Selector */}
      <div>
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
          System Mode
        </div>
        <div className="grid grid-cols-4 gap-2">
          {modes.map((mode) => {
            const Icon = mode.icon;
            const isActive = climate.mode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => setClimateMode(mode.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${isActive ? `${mode.bg} ${mode.border} ${mode.color}` : 'bg-slate-800/30 border-transparent text-slate-500 hover:bg-slate-800/60'}`}>
                
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-bold uppercase">{mode.id}</span>
              </button>);

          })}
        </div>
      </div>

      {/* Room Sensors */}
      <div>
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
          Room Sensors
        </div>
        <div className="grid grid-cols-2 gap-3">
          {climate.sensors.map((sensor) =>
          <div
            key={sensor.id}
            className="p-3 rounded-xl bg-slate-800/40 border border-white/5 flex justify-between items-center">
            
              <span className="text-sm text-slate-300">{sensor.room}</span>
              <span className="text-sm font-mono font-bold text-slate-200">
                {sensor.temp}°
              </span>
            </div>
          )}
        </div>
      </div>
    </div>);

}