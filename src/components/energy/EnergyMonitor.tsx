import React from 'react';
import { GlassPanel } from '../layout/GlassPanel';
import { useHomeStore } from '../../store/homeStore';
import { computeEnergyUsage } from '../../store/rules';
import { initialEnergyData } from '../../store/initialState';
import { Zap } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer } from
'recharts';
export function EnergyMonitor() {
  const { devices } = useHomeStore();
  const currentUsage = computeEnergyUsage(devices);
  // Create a dynamic dataset: append current usage to the end of the historical data
  const chartData = [
  ...initialEnergyData.slice(1),
  {
    time: 'Now',
    usage: currentUsage
  }];

  const isHigh = currentUsage > 4.0;
  return (
    <GlassPanel
      glowColor={isHigh ? 'amber' : 'emerald'}
      className="flex flex-col h-full min-h-[300px]">
      
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-slate-800/20">
        <div className="flex items-center space-x-2">
          <Zap
            className={`w-5 h-5 ${isHigh ? 'text-amber-400' : 'text-emerald-400'}`} />
          
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200">
            Power Grid
          </h2>
        </div>
        <div
          className={`text-xl font-mono font-bold ${isHigh ? 'text-amber-400' : 'text-emerald-400'}`}>
          
          {currentUsage.toFixed(2)} kW
        </div>
      </div>

      <div className="flex-1 p-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{
              top: 10,
              right: 0,
              left: -20,
              bottom: 0
            }}>
            
            <defs>
              <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={isHigh ? '#f59e0b' : '#10b981'}
                  stopOpacity={0.3} />
                
                <stop
                  offset="95%"
                  stopColor={isHigh ? '#f59e0b' : '#10b981'}
                  stopOpacity={0} />
                
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              stroke="#475569"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              tick={{
                fontFamily: 'JetBrains Mono'
              }} />
            
            <YAxis
              stroke="#475569"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              tick={{
                fontFamily: 'JetBrains Mono'
              }} />
            
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                fontFamily: 'JetBrains Mono',
                fontSize: '12px'
              }}
              itemStyle={{
                color: isHigh ? '#f59e0b' : '#10b981'
              }} />
            
            <Area
              type="monotone"
              dataKey="usage"
              stroke={isHigh ? '#f59e0b' : '#10b981'}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorUsage)"
              isAnimationActive={false} // Disable animation to prevent jitter on re-renders
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassPanel>);

}