import React from 'react';
import { useHomeStore } from '../../store/homeStore';
import { Lightbulb, Power } from 'lucide-react';
export function LightsView() {
  const { devices, toggleLight, setLightBrightness } = useHomeStore();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {devices.lights.map((light) =>
      <div
        key={light.id}
        className="p-4 rounded-xl bg-slate-800/40 border border-white/5 flex flex-col space-y-4">
        
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div
              className={`p-2 rounded-lg ${light.on ? 'bg-amber-400/20 text-amber-400' : 'bg-slate-700/50 text-slate-500'}`}>
              
                <Lightbulb className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-200">
                  {light.name}
                </h3>
                <p className="text-xs text-slate-400">{light.room}</p>
              </div>
            </div>

            <button
            onClick={() => toggleLight(light.id)}
            className={`w-12 h-6 rounded-full relative transition-colors ${light.on ? 'bg-amber-500' : 'bg-slate-700'}`}>
            
              <div
              className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${light.on ? 'left-7' : 'left-1'}`} />
            
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-xs font-mono text-slate-500 w-8">0%</span>
            <input
            type="range"
            min="0"
            max="100"
            value={light.brightness}
            onChange={(e) =>
            setLightBrightness(light.id, parseInt(e.target.value))
            }
            disabled={!light.on}
            className={`flex-1 h-2 rounded-full appearance-none bg-slate-700 outline-none ${!light.on && 'opacity-50 cursor-not-allowed'}`}
            style={{
              backgroundImage: light.on ?
              `linear-gradient(to right, #fbbf24 ${light.brightness}%, transparent ${light.brightness}%)` :
              'none'
            }} />
          
            <span className="text-xs font-mono text-slate-300 w-10 text-right">
              {light.brightness}%
            </span>
          </div>
        </div>
      )}
    </div>);

}