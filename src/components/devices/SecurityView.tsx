import React from 'react';
import { useHomeStore } from '../../store/homeStore';
import { Shield, ShieldAlert, Lock, Unlock, Home, Plane } from 'lucide-react';
export function SecurityView() {
  const { devices, toggleDoorLock, setAlarmMode } = useHomeStore();
  const { security } = devices;
  const alarmModes = [
  {
    id: 'home',
    label: 'Arm Home',
    icon: Home,
    color: 'text-amber-400',
    bg: 'bg-amber-500/20',
    border: 'border-amber-500/30'
  },
  {
    id: 'away',
    label: 'Arm Away',
    icon: Plane,
    color: 'text-rose-400',
    bg: 'bg-rose-500/20',
    border: 'border-rose-500/30'
  },
  {
    id: 'off',
    label: 'Disarmed',
    icon: Unlock,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/20',
    border: 'border-emerald-500/30'
  }] as
  const;
  return (
    <div className="space-y-6">
      {/* Alarm System */}
      <div className="p-6 rounded-2xl bg-slate-800/40 border border-white/5 flex flex-col items-center">
        <div className="mb-6 relative">
          {security.alarm.armed !== 'off' &&
          <div
            className={`absolute inset-0 blur-2xl rounded-full ${security.alarm.armed === 'away' ? 'bg-rose-500/20' : 'bg-amber-500/20'}`} />

          }
          <div
            className={`relative p-4 rounded-full border-2 ${security.alarm.armed === 'away' ? 'border-rose-500 text-rose-400' : security.alarm.armed === 'home' ? 'border-amber-500 text-amber-400' : 'border-emerald-500 text-emerald-400'}`}>
            
            {security.alarm.armed !== 'off' ?
            <ShieldAlert className="w-10 h-10" /> :

            <Shield className="w-10 h-10" />
            }
          </div>
        </div>

        <div className="flex space-x-3 w-full">
          {alarmModes.map((mode) => {
            const Icon = mode.icon;
            const isActive = security.alarm.armed === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => setAlarmMode(mode.id)}
                className={`flex-1 flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${isActive ? `${mode.bg} ${mode.border} ${mode.color}` : 'bg-slate-800/50 border-transparent text-slate-500 hover:bg-slate-700/50'}`}>
                
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  {mode.label}
                </span>
              </button>);

          })}
        </div>
      </div>

      {/* Doors */}
      <div>
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
          Access Control
        </div>
        <div className="space-y-2">
          {security.doors.map((door) =>
          <div
            key={door.id}
            className="flex items-center justify-between p-4 rounded-xl bg-slate-800/40 border border-white/5">
            
              <div className="flex items-center space-x-3">
                <div
                className={`p-2 rounded-lg ${door.locked ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                
                  {door.locked ?
                <Lock className="w-5 h-5" /> :

                <Unlock className="w-5 h-5" />
                }
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-200">
                    {door.name}
                  </h3>
                  <p
                  className={`text-xs ${door.locked ? 'text-emerald-500' : 'text-rose-500'}`}>
                  
                    {door.locked ? 'Secured' : 'Unlocked'}
                  </p>
                </div>
              </div>

              <button
              onClick={() => toggleDoorLock(door.id)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${door.locked ? 'bg-slate-700/50 text-slate-300 hover:bg-slate-600' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30'}`}>
              
                {door.locked ? 'Unlock' : 'Lock'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>);

}