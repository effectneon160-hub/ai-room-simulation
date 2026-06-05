import React from 'react';
import { useHomeStore } from '../../store/homeStore';
import { Camera, WifiOff, Video } from 'lucide-react';
export function CamerasView() {
  const { devices, toggleCamera } = useHomeStore();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {devices.cameras.map((camera) =>
      <div
        key={camera.id}
        className="rounded-xl overflow-hidden bg-slate-800/40 border border-white/5 flex flex-col">
        
          {/* Mock Camera Feed */}
          <div className="aspect-video bg-slate-900 relative flex items-center justify-center border-b border-white/5">
            {!camera.enabled ?
          <div className="flex flex-col items-center text-slate-600">
                <Video className="w-8 h-8 mb-2 opacity-50" />
                <span className="text-xs font-bold uppercase tracking-widest">
                  Feed Disabled
                </span>
              </div> :
          camera.status === 'offline' ?
          <div className="flex flex-col items-center text-rose-500/50">
                <WifiOff className="w-8 h-8 mb-2" />
                <span className="text-xs font-bold uppercase tracking-widest">
                  Camera Offline
                </span>
              </div> :

          <div className="absolute inset-0 flex items-center justify-center">
                {/* Simulated static/feed effect */}
                <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] mix-blend-overlay" />
                <div className="absolute top-2 right-2 flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  <span className="text-[10px] font-mono text-white/70">
                    REC
                  </span>
                </div>
                <div className="absolute bottom-2 left-2 text-[10px] font-mono text-white/50">
                  {camera.name.toUpperCase()} -{' '}
                  {new Date().toLocaleTimeString()}
                </div>
              </div>
          }
          </div>

          {/* Controls */}
          <div className="p-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Camera
              className={`w-4 h-4 ${camera.status === 'offline' ? 'text-rose-400' : camera.enabled ? 'text-cyan-400' : 'text-slate-500'}`} />
            
              <div>
                <div className="text-sm font-bold text-slate-200">
                  {camera.name}
                </div>
                <div className="text-xs text-slate-500">{camera.location}</div>
              </div>
            </div>

            <button
            onClick={() => toggleCamera(camera.id)}
            className={`w-10 h-5 rounded-full relative transition-colors ${camera.enabled ? 'bg-cyan-500' : 'bg-slate-700'}`}>
            
              <div
              className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${camera.enabled ? 'left-5' : 'left-0.5'}`} />
            
            </button>
          </div>
        </div>
      )}
    </div>);

}