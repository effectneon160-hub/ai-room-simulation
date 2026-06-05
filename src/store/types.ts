export type AIMode = 'relax' | 'thinking' | 'performing' | 'away' | 'night';
export type Severity = 'info' | 'warning' | 'critical' | 'success';

export interface Light {
  id: string;
  name: string;
  room: string;
  on: boolean;
  brightness: number; // 0-100
}

export interface Climate {
  targetTemp: number;
  currentTemp: number;
  mode: 'cool' | 'heat' | 'auto' | 'off';
  sensors: {
    id: string;
    room: string;
    temp: number;
  }[];
}

export interface Door {
  id: string;
  name: string;
  locked: boolean;
}

export interface Security {
  doors: Door[];
  alarm: {
    armed: 'home' | 'away' | 'off';
  };
}

export interface Camera {
  id: string;
  name: string;
  location: string;
  enabled: boolean;
  status: 'online' | 'offline';
}

export interface AirQuality {
  purifier: {
    on: boolean;
    speed: 'low' | 'med' | 'high';
  };
  sensors: {
    pm25: number;
    co2: number;
    humidity: number;
  };
}

export interface Devices {
  lights: Light[];
  climate: Climate;
  security: Security;
  cameras: Camera[];
  airQuality: AirQuality;
}

export interface ActivityEvent {
  id: string;
  timestamp: string; // ISO string or formatted time
  title: string;
  severity: Severity;
  icon?: string;
}

export interface DiagnosticIssue {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  recommendedFix?: string;
}

export type AIActionKey =
'lockAllDoors' |
'dimLights20' |
'armAway' |
'setTemp78' |
'dimLivingRoom40' |
'ecoMode' |
'purifierHigh';

export interface AIRecommendation {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  suggestedAction?: string;
  actionKey?: AIActionKey;
}

export interface EnergyDataPoint {
  time: string;
  usage: number;
}

export interface StoreState {
  // State
  devices: Devices;
  aiMode: AIMode;
  activityFeed: ActivityEvent[];
  simTime: Date;
  isReplaying: boolean;

  // Computed (derived from state, but stored for simplicity in Zustand if needed, or computed on fly)
  // We'll compute these on the fly in components or via selectors, but let's keep them in state for easy access if needed.
  // Actually, better to compute them in selectors or rules.ts.

  // Actions
  toggleLight: (id: string) => void;
  setLightBrightness: (id: string, brightness: number) => void;
  setTargetTemp: (temp: number) => void;
  setClimateMode: (mode: Climate['mode']) => void;
  toggleDoorLock: (id: string) => void;
  setAlarmMode: (mode: Security['alarm']['armed']) => void;
  toggleCamera: (id: string) => void;
  togglePurifier: () => void;
  setPurifierSpeed: (speed: AirQuality['purifier']['speed']) => void;
  setAIMode: (mode: AIMode) => void;

  // Scenario
  resetScenario: () => void;
  replayScenario: () => void;

  // Live simulation
  simTick: () => void;
  _tickCount: number;

  // Internal
  _recordAction: (action: any) => void;
  _recordedActions: any[];
}