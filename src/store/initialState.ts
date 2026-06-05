import { Devices, ActivityEvent, AIMode, EnergyDataPoint } from './types';

export const initialDevices: Devices = {
  lights: [
  {
    id: 'l1',
    name: 'Main Lights',
    room: 'Living Room',
    on: true,
    brightness: 80
  },
  {
    id: 'l2',
    name: 'Accent Lights',
    room: 'Living Room',
    on: false,
    brightness: 50
  },
  { id: 'l3', name: 'Overhead', room: 'Kitchen', on: true, brightness: 100 },
  {
    id: 'l4',
    name: 'Nightstand',
    room: 'Bedroom',
    on: false,
    brightness: 20
  },
  { id: 'l5', name: 'Desk Lamp', room: 'Office', on: true, brightness: 60 },
  { id: 'l6', name: 'Ceiling', room: 'Hallway', on: false, brightness: 100 }],

  climate: {
    targetTemp: 72,
    currentTemp: 73,
    mode: 'cool',
    sensors: [
    { id: 'cs1', room: 'Living Room', temp: 73 },
    { id: 'cs2', room: 'Bedroom', temp: 71 }]

  },
  security: {
    doors: [
    { id: 'd1', name: 'Front Door', locked: true },
    { id: 'd2', name: 'Back Door', locked: false },
    { id: 'd3', name: 'Garage', locked: true }],

    alarm: {
      armed: 'off'
    }
  },
  cameras: [
  {
    id: 'c1',
    name: 'Front Porch',
    location: 'Exterior',
    enabled: true,
    status: 'online'
  },
  {
    id: 'c2',
    name: 'Backyard',
    location: 'Exterior',
    enabled: true,
    status: 'online'
  },
  {
    id: 'c3',
    name: 'Living Room',
    location: 'Interior',
    enabled: false,
    status: 'offline'
  },
  {
    id: 'c4',
    name: 'Garage',
    location: 'Interior',
    enabled: true,
    status: 'online'
  }],

  airQuality: {
    purifier: {
      on: true,
      speed: 'med'
    },
    sensors: {
      pm25: 12,
      co2: 450,
      humidity: 45
    }
  }
};

export const initialAIMode: AIMode = 'thinking';

// Deterministic starting time
export const initialSimTime = new Date('2026-06-04T08:00:00Z');

export const initialActivityFeed: ActivityEvent[] = [
{
  id: 'evt_1',
  timestamp: new Date('2026-06-04T07:30:00Z').toISOString(),
  title: 'System initialized',
  severity: 'info'
},
{
  id: 'evt_2',
  timestamp: new Date('2026-06-04T07:35:00Z').toISOString(),
  title: 'Cameras came online',
  severity: 'success'
},
{
  id: 'evt_3',
  timestamp: new Date('2026-06-04T07:45:00Z').toISOString(),
  title: 'Morning routine activated',
  severity: 'info'
},
{
  id: 'evt_4',
  timestamp: new Date('2026-06-04T07:50:00Z').toISOString(),
  title: 'Back door unlocked',
  severity: 'warning'
}];


// Deterministic energy chart data (24 points)
export const initialEnergyData: EnergyDataPoint[] = Array.from({
  length: 24
}).map((_, i) => {
  const hour = i;
  // Create a realistic looking curve deterministically
  let base = 1.2;
  if (hour > 6 && hour < 9) base += 2.5; // Morning spike
  if (hour >= 9 && hour < 17) base += 1.0; // Day usage
  if (hour >= 17 && hour < 22) base += 3.0; // Evening spike

  // Add some deterministic noise
  const noise = Math.sin(hour * 1.5) * 0.4;

  return {
    time: `${hour.toString().padStart(2, '0')}:00`,
    usage: Number((base + noise).toFixed(1))
  };
});