import { create } from 'zustand';
import { StoreState, ActivityEvent, Severity } from './types';
import {
  initialDevices,
  initialAIMode,
  initialActivityFeed,
  initialSimTime } from
'./initialState';

let eventCounter = 100;

function createEvent(
title: string,
severity: Severity = 'info')
: ActivityEvent {
  eventCounter++;
  return {
    id: `evt_${eventCounter}`,
    timestamp: new Date().toISOString(),
    title,
    severity
  };
}

export const useHomeStore = create<StoreState>((set, get) => ({
  devices: JSON.parse(JSON.stringify(initialDevices)),
  aiMode: initialAIMode,
  activityFeed: [...initialActivityFeed],
  simTime: new Date(initialSimTime),
  isReplaying: false,
  _recordedActions: [],
  _tickCount: 0,

  _recordAction: (actionFn: () => void) => {
    if (!get().isReplaying) {
      set((state) => ({
        _recordedActions: [...state._recordedActions, actionFn]
      }));
    }
  },

  toggleLight: (id: string) => {
    const action = () =>
    set((state) => {
      const lights = state.devices.lights.map((l) => {
        if (l.id === id) {
          const newState = !l.on;
          state.activityFeed = [
          createEvent(`${l.name} turned ${newState ? 'ON' : 'OFF'}`),
          ...state.activityFeed].
          slice(0, 50);
          return { ...l, on: newState };
        }
        return l;
      });
      return { devices: { ...state.devices, lights } };
    });
    get()._recordAction(action);
    action();
  },

  setLightBrightness: (id: string, brightness: number) => {
    const action = () =>
    set((state) => {
      const lights = state.devices.lights.map((l) => {
        if (l.id === id) {
          state.activityFeed = [
          createEvent(`${l.name} brightness set to ${brightness}%`),
          ...state.activityFeed].
          slice(0, 50);
          return { ...l, brightness };
        }
        return l;
      });
      return { devices: { ...state.devices, lights } };
    });
    get()._recordAction(action);
    action();
  },

  setTargetTemp: (temp: number) => {
    const action = () =>
    set((state) => {
      state.activityFeed = [
      createEvent(`Target temperature set to ${temp}°`),
      ...state.activityFeed].
      slice(0, 50);
      return {
        devices: {
          ...state.devices,
          climate: { ...state.devices.climate, targetTemp: temp }
        }
      };
    });
    get()._recordAction(action);
    action();
  },

  setClimateMode: (mode) => {
    const action = () =>
    set((state) => {
      state.activityFeed = [
      createEvent(`HVAC mode set to ${mode.toUpperCase()}`),
      ...state.activityFeed].
      slice(0, 50);
      return {
        devices: {
          ...state.devices,
          climate: { ...state.devices.climate, mode }
        }
      };
    });
    get()._recordAction(action);
    action();
  },

  toggleDoorLock: (id: string) => {
    const action = () =>
    set((state) => {
      const doors = state.devices.security.doors.map((d) => {
        if (d.id === id) {
          const newLocked = !d.locked;
          state.activityFeed = [
          createEvent(
            `${d.name} ${newLocked ? 'Locked' : 'Unlocked'}`,
            newLocked ? 'info' : 'warning'
          ),
          ...state.activityFeed].
          slice(0, 50);
          return { ...d, locked: newLocked };
        }
        return d;
      });
      return {
        devices: {
          ...state.devices,
          security: { ...state.devices.security, doors }
        }
      };
    });
    get()._recordAction(action);
    action();
  },

  setAlarmMode: (mode) => {
    const action = () =>
    set((state) => {
      state.activityFeed = [
      createEvent(
        `Security alarm set to ${mode.toUpperCase()}`,
        mode === 'off' ? 'warning' : 'success'
      ),
      ...state.activityFeed].
      slice(0, 50);
      return {
        devices: {
          ...state.devices,
          security: { ...state.devices.security, alarm: { armed: mode } }
        }
      };
    });
    get()._recordAction(action);
    action();
  },

  toggleCamera: (id: string) => {
    const action = () =>
    set((state) => {
      const cameras = state.devices.cameras.map((c) => {
        if (c.id === id) {
          const newEnabled = !c.enabled;
          state.activityFeed = [
          createEvent(
            `Camera ${c.name} ${newEnabled ? 'Enabled' : 'Disabled'}`,
            newEnabled ? 'info' : 'warning'
          ),
          ...state.activityFeed].
          slice(0, 50);
          return { ...c, enabled: newEnabled };
        }
        return c;
      });
      return { devices: { ...state.devices, cameras } };
    });
    get()._recordAction(action);
    action();
  },

  togglePurifier: () => {
    const action = () =>
    set((state) => {
      const newOn = !state.devices.airQuality.purifier.on;
      state.activityFeed = [
      createEvent(`Air Purifier turned ${newOn ? 'ON' : 'OFF'}`),
      ...state.activityFeed].
      slice(0, 50);
      return {
        devices: {
          ...state.devices,
          airQuality: {
            ...state.devices.airQuality,
            purifier: { ...state.devices.airQuality.purifier, on: newOn }
          }
        }
      };
    });
    get()._recordAction(action);
    action();
  },

  setPurifierSpeed: (speed) => {
    const action = () =>
    set((state) => {
      state.activityFeed = [
      createEvent(`Air Purifier speed set to ${speed.toUpperCase()}`),
      ...state.activityFeed].
      slice(0, 50);
      return {
        devices: {
          ...state.devices,
          airQuality: {
            ...state.devices.airQuality,
            purifier: { ...state.devices.airQuality.purifier, speed }
          }
        }
      };
    });
    get()._recordAction(action);
    action();
  },

  setAIMode: (mode) => {
    const action = () =>
    set((state) => {
      state.activityFeed = [
      createEvent(`AI Mode changed to ${mode.toUpperCase()}`, 'success'),
      ...state.activityFeed].
      slice(0, 50);
      return { aiMode: mode };
    });
    get()._recordAction(action);
    action();
  },

  resetScenario: () => {
    set({
      devices: JSON.parse(JSON.stringify(initialDevices)),
      aiMode: initialAIMode,
      activityFeed: [...initialActivityFeed],
      _recordedActions: [],
      _tickCount: 0,
      isReplaying: false
    });
  },

  replayScenario: () => {
    const actions = [...get()._recordedActions];
    if (actions.length === 0) return;

    // First reset
    set({
      devices: JSON.parse(JSON.stringify(initialDevices)),
      aiMode: initialAIMode,
      activityFeed: [...initialActivityFeed],
      isReplaying: true
    });

    // Playback sequentially
    let delay = 0;
    actions.forEach((action, index) => {
      delay += 800; // 800ms between actions
      setTimeout(() => {
        action();
        if (index === actions.length - 1) {
          set({ isReplaying: false });
        }
      }, delay);
    });
  },

  simTick: () => {
    if (get().isReplaying) return;

    set((state) => {
      const tick = state._tickCount + 1;
      const devices = { ...state.devices };

      // 1. HVAC drift: currentTemp moves toward targetTemp
      const climate = {
        ...devices.climate,
        sensors: [...devices.climate.sensors]
      };
      if (climate.mode !== 'off') {
        const diff = climate.targetTemp - climate.currentTemp;
        if (Math.abs(diff) > 0.05) {
          climate.currentTemp = Number(
            (
            climate.currentTemp +
            Math.sign(diff) * Math.min(0.4, Math.abs(diff))).
            toFixed(1)
          );
        }
      } else {
        // Drift slowly toward ambient 74°
        const ambient = 74;
        const diff = ambient - climate.currentTemp;
        if (Math.abs(diff) > 0.05) {
          climate.currentTemp = Number(
            (climate.currentTemp + Math.sign(diff) * 0.1).toFixed(1)
          );
        }
      }

      // 2. Room sensors drift toward currentTemp with a small per-sensor offset
      climate.sensors = climate.sensors.map((s, i) => {
        const offset = i === 0 ? 0.3 : -0.4;
        const target = climate.currentTemp + offset;
        const diff = target - s.temp;
        const next =
        Math.abs(diff) > 0.05 ?
        Number((s.temp + Math.sign(diff) * 0.2).toFixed(1)) :
        s.temp;
        return { ...s, temp: next };
      });
      devices.climate = climate;

      // 3. Air quality dynamics
      const air = {
        ...devices.airQuality,
        sensors: { ...devices.airQuality.sensors }
      };
      const purifier = air.purifier;
      let pm25Target = 30;
      if (purifier.on) {
        pm25Target =
        purifier.speed === 'high' ? 8 : purifier.speed === 'med' ? 12 : 18;
      }
      const pmDiff = pm25Target - air.sensors.pm25;
      air.sensors.pm25 = Math.max(
        0,
        Math.min(
          100,
          Math.round(
            air.sensors.pm25 +
            Math.sign(pmDiff) * Math.min(1, Math.abs(pmDiff))
          )
        )
      );

      // 4. CO2 cycles deterministically (400-700)
      air.sensors.co2 = Math.round(550 + Math.sin(tick * 0.18) * 130);

      // 5. Humidity oscillates (38-52)
      air.sensors.humidity = Math.round(45 + Math.sin(tick * 0.11) * 6);

      devices.airQuality = air;

      // 6. Autonomous events every 12 ticks based on AI mode
      let activityFeed = state.activityFeed;
      if (tick % 12 === 0) {
        const messages: Record<string, {title: string;severity: Severity;}> =
        {
          away: {
            title: 'Motion detected at Front Porch',
            severity: 'warning'
          },
          performing: {
            title: 'HVAC cycle optimized by AI',
            severity: 'info'
          },
          night: { title: 'Perimeter check complete', severity: 'success' },
          thinking: {
            title: 'AI analyzing usage patterns',
            severity: 'info'
          },
          relax: { title: 'Ambient scene maintained', severity: 'info' }
        };
        const msg = messages[state.aiMode];
        if (msg) {
          activityFeed = [
          createEvent(msg.title, msg.severity),
          ...activityFeed].
          slice(0, 50);
        }
      }

      return {
        devices,
        activityFeed,
        _tickCount: tick
      };
    });
  }
}));