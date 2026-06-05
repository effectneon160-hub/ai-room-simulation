import React from 'react';
import { useHomeStore } from '../../store/homeStore';
import { Wind, Droplets, Activity } from 'lucide-react';
export function AirQualityView() {
  const { devices, togglePurifier, setPurifierSpeed } = useHomeStore();
  const { airQuality } = devices;
  const speeds = ['low', 'med', 'high'] as const;
  const getAQIColor = (pm25: number) => {
    if (pm25 < 12) return 'text-emerald-400';
    if (pm25 < 35) return 'text-amber-400';
    return 'text-rose-400';
  };
  return (
    <div className="space-y-6">
      {/* Sensors */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-4 rounded-xl bg-slate-800/40 border border-white/5 flex flex-col items-center justify-center">
          <Wind
            className={`w-5 h-5 mb-2 ${getAQIColor(airQuality.sensors.pm25)}`} />
          
          <div className="text-2xl font-mono font-bold text-slate-200">
            {airQuality.sensors.pm25}
          </div>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
            PM2.5
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-800/40 border border-white/5 flex flex-col items-center justify-center">
          <Activity className="w-5 h-5 mb-2 text-cyan-400" />
          <div className="text-2xl font-mono font-bold text-slate-200">
            {airQuality.sensors.co2}
          </div>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
            CO2 ppm
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-800/40 border border-white/5 flex flex-col items-center justify-center">
          <Droplets className="w-5 h-5 mb-2 text-blue-400" />
          <div className="text-2xl font-mono font-bold text-slate-200">
            {airQuality.sensors.humidity}%
          </div>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
            Humidity
          </div>
        </div>
      </div>

      {/* Purifier Control */}
      <div className="p-6 rounded-2xl bg-slate-800/40 border border-white/5 relative overflow-hidden">
        {airQuality.purifier.on &&
        <div className="absolute inset-0 bg-cyan-500/5 blur-3xl" />
        }

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div
                className={`p-3 rounded-xl ${airQuality.purifier.on ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-700/50 text-slate-500'}`}>
                
                <Wind
                  className={`w-6 h-6 ${airQuality.purifier.on && airQuality.purifier.speed === 'high' ? 'animate-pulse' : ''}`} />
                
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-200">
                  HEPA Purifier
                </h3>
                <p className="text-xs text-slate-400">Living Room</p>
              </div>
            </div>

            <button
              onClick={togglePurifier}
              className={`w-14 h-7 rounded-full relative transition-colors ${airQuality.purifier.on ? 'bg-cyan-500' : 'bg-slate-700'}`}>
              
              <div
                className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform ${airQuality.purifier.on ? 'left-8' : 'left-1'}`} />
              
            </button>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Fan Speed
            </div>
            <div className="flex space-x-2">
              {speeds.map((speed) =>
              <button
                key={speed}
                onClick={() => setPurifierSpeed(speed)}
                disabled={!airQuality.purifier.on}
                className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${!airQuality.purifier.on ? 'opacity-50 cursor-not-allowed bg-slate-800 text-slate-600' : airQuality.purifier.speed === speed ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'bg-slate-700/50 text-slate-400 hover:bg-slate-600 border border-transparent'}`}>
                
                  {speed}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>);

}