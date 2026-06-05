import React, { useEffect, useState } from 'react';
import { TopStatusBar } from './components/layout/TopStatusBar';
import { Sidebar, Category } from './components/layout/Sidebar';
import { OverviewCards } from './components/overview/OverviewCards';
import { HomeAIPanel } from './components/ai/HomeAIPanel';
import { DeviceControlPanel } from './components/devices/DeviceControlPanel';
import { EnergyMonitor } from './components/energy/EnergyMonitor';
import { DiagnosticsPanel } from './components/diagnostics/DiagnosticsPanel';
import { ActivityFeed } from './components/activity/ActivityFeed';
import { useHomeStore } from './store/homeStore';
export function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('lights');
  const { isReplaying, simTick } = useHomeStore();
  // Live simulation: drift temps, air sensors, and emit ambient events
  useEffect(() => {
    const interval = setInterval(() => simTick(), 2000);
    return () => clearInterval(interval);
  }, [simTick]);
  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-hidden">
      {/* Replay Overlay */}
      {isReplaying &&
      <div className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
          <div className="px-6 py-3 rounded-full bg-brand/20 border border-brand/30 text-brand font-bold tracking-widest uppercase animate-pulse shadow-[0_0_30px_rgba(34,211,238,0.3)]">
            Replaying Scenario...
          </div>
        </div>
      }

      {/* Top Bar */}
      <TopStatusBar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Sidebar */}
        <Sidebar activeCategory={activeCategory} onSelect={setActiveCategory} />

        {/* Dashboard Grid */}
        <div className="flex-1 p-4 lg:p-6 overflow-y-auto no-scrollbar">
          <div className="max-w-7xl mx-auto space-y-4 lg:space-y-6">
            {/* Top Row: Overview Cards (span 3 cols) + AI Panel (span 1 col) */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 lg:gap-6">
              <div className="xl:col-span-3">
                <OverviewCards />
              </div>
              <div className="xl:col-span-1 h-[300px] xl:h-auto">
                <HomeAIPanel />
              </div>
            </div>

            {/* Middle Row: Device Control (span 2) + Energy (span 2) */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 lg:gap-6">
              <div className="xl:col-span-2">
                <DeviceControlPanel category={activeCategory} />
              </div>
              <div className="xl:col-span-2 h-[400px]">
                <EnergyMonitor />
              </div>
            </div>

            {/* Bottom Row: Diagnostics (span 2) + Activity Feed (span 2) */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 lg:gap-6">
              <div className="xl:col-span-2 h-[300px]">
                <DiagnosticsPanel />
              </div>
              <div className="xl:col-span-2 h-[300px]">
                <ActivityFeed />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

}