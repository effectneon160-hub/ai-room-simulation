import React from 'react';
import { Lightbulb, Thermometer, Shield, Camera, Wind, Zap } from 'lucide-react';
import { cn } from './GlassPanel';
import { useHomeStore } from '../../store/homeStore';
export type Category =
'lights' |
'climate' |
'security' |
'cameras' |
'air' |
'energy';
interface SidebarProps {
  activeCategory: Category;
  onSelect: (cat: Category) => void;
}
export function Sidebar({ activeCategory, onSelect }: SidebarProps) {
  const { devices } = useHomeStore();
  // Compute active counts for indicators
  const activeLights = devices.lights.filter((l) => l.on).length;
  const hvacActive = devices.climate.mode !== 'off';
  const doorsUnlocked = devices.security.doors.filter((d) => !d.locked).length;
  const camerasActive = devices.cameras.filter((c) => c.enabled).length;
  const purifierActive = devices.airQuality.purifier.on;
  const navItems = [
  {
    id: 'lights',
    label: 'Lighting',
    icon: Lightbulb,
    count: activeLights,
    alert: false
  },
  {
    id: 'climate',
    label: 'Climate',
    icon: Thermometer,
    count: hvacActive ? 1 : 0,
    alert: false
  },
  {
    id: 'security',
    label: 'Security',
    icon: Shield,
    count: doorsUnlocked,
    alert: doorsUnlocked > 0
  },
  {
    id: 'cameras',
    label: 'Cameras',
    icon: Camera,
    count: camerasActive,
    alert: false
  },
  {
    id: 'air',
    label: 'Air Quality',
    icon: Wind,
    count: purifierActive ? 1 : 0,
    alert: devices.airQuality.sensors.pm25 > 35
  },
  {
    id: 'energy',
    label: 'Energy',
    icon: Zap,
    count: 0,
    alert: false
  }] as
  const;
  return (
    <div className="w-full lg:w-64 flex lg:flex-col gap-2 p-4 overflow-x-auto lg:overflow-x-visible no-scrollbar shrink-0">
      <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 hidden lg:block px-4">
        Systems
      </div>

      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeCategory === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelect(item.id as Category)}
            className={cn(
              'flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 shrink-0 lg:shrink',
              isActive ?
              'bg-brand/10 text-brand border border-brand/20 shadow-[inset_0_0_20px_rgba(34,211,238,0.05)]' :
              'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border border-transparent'
            )}>
            
            <Icon
              className={cn(
                'w-5 h-5',
                isActive ? 'text-brand' : 'text-slate-500'
              )} />
            
            <span className="font-medium text-sm">{item.label}</span>

            <div className="ml-auto flex items-center space-x-2">
              {item.alert &&
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              }
              {item.count > 0 && !item.alert &&
              <span
                className={cn(
                  'text-xs font-mono px-1.5 py-0.5 rounded-md',
                  isActive ?
                  'bg-brand/20 text-brand' :
                  'bg-slate-800 text-slate-400'
                )}>
                
                  {item.count}
                </span>
              }
            </div>
          </button>);

      })}
    </div>);

}