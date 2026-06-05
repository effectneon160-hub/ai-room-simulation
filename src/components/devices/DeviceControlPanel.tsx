import React from 'react';
import { GlassPanel } from '../layout/GlassPanel';
import { Category } from '../layout/Sidebar';
import { LightsView } from './LightsView';
import { ClimateView } from './ClimateView';
import { SecurityView } from './SecurityView';
import { CamerasView } from './CamerasView';
import { AirQualityView } from './AirQualityView';
import { EnergyDevicesView } from './EnergyDevicesView';
import { motion, AnimatePresence } from 'framer-motion';
interface Props {
  category: Category;
}
export function DeviceControlPanel({ category }: Props) {
  const getTitle = () => {
    switch (category) {
      case 'lights':
        return 'Lighting Control';
      case 'climate':
        return 'Climate Control';
      case 'security':
        return 'Security System';
      case 'cameras':
        return 'Camera Network';
      case 'air':
        return 'Air Quality';
      case 'energy':
        return 'Energy Consumers';
    }
  };
  return (
    <GlassPanel className="flex flex-col h-full min-h-[400px]">
      <div className="p-4 border-b border-white/10 bg-slate-800/20">
        <h2 className="text-lg font-bold uppercase tracking-widest text-slate-200">
          {getTitle()}
        </h2>
      </div>

      <div className="flex-1 p-4 overflow-y-auto no-scrollbar relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={category}
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
            transition={{
              duration: 0.2
            }}
            className="h-full">
            
            {category === 'lights' && <LightsView />}
            {category === 'climate' && <ClimateView />}
            {category === 'security' && <SecurityView />}
            {category === 'cameras' && <CamerasView />}
            {category === 'air' && <AirQualityView />}
            {category === 'energy' && <EnergyDevicesView />}
          </motion.div>
        </AnimatePresence>
      </div>
    </GlassPanel>);

}