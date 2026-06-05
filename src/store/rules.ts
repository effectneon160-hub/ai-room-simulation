import { Devices, AIMode, DiagnosticIssue, AIRecommendation } from './types';

// Compute current energy usage in kW based on active devices
export function computeEnergyUsage(devices: Devices): number {
  let usage = 0.5; // Base idle usage

  // Lights (assume 0.01 kW per 100% brightness)
  devices.lights.forEach((l) => {
    if (l.on) usage += l.brightness / 100 * 0.06;
  });

  // Climate (HVAC is heavy)
  if (devices.climate.mode !== 'off') {
    const tempDiff = Math.abs(
      devices.climate.targetTemp - devices.climate.currentTemp
    );
    if (tempDiff > 0) {
      usage += 3.5; // Active cooling/heating
    } else {
      usage += 0.2; // Fan only
    }
  }

  // Air Purifier
  if (devices.airQuality.purifier.on) {
    const speeds = { low: 0.05, med: 0.1, high: 0.2 };
    usage += speeds[devices.airQuality.purifier.speed];
  }

  // Cameras & Security (constant small draw)
  usage += devices.cameras.filter((c) => c.enabled).length * 0.015;

  return Number(usage.toFixed(2));
}

export function computeDiagnostics(devices: Devices): DiagnosticIssue[] {
  const issues: DiagnosticIssue[] = [];

  // Security checks
  const unlockedDoors = devices.security.doors.filter((d) => !d.locked);
  if (unlockedDoors.length > 0) {
    issues.push({
      id: 'diag_sec_1',
      title: 'Doors Unlocked',
      description: `${unlockedDoors.map((d) => d.name).join(', ')} ${unlockedDoors.length > 1 ? 'are' : 'is'} currently unlocked.`,
      severity: 'warning',
      recommendedFix: 'Lock all exterior doors.'
    });
  }

  // Camera checks
  const offlineCameras = devices.cameras.filter((c) => c.status === 'offline');
  if (offlineCameras.length > 0) {
    issues.push({
      id: 'diag_cam_1',
      title: 'Camera Offline',
      description: `${offlineCameras.map((c) => c.name).join(', ')} camera lost connection.`,
      severity: 'critical',
      recommendedFix: 'Check power and network connection.'
    });
  }

  // Air Quality checks
  if (devices.airQuality.sensors.pm25 > 35) {
    issues.push({
      id: 'diag_air_1',
      title: 'Poor Air Quality',
      description: `PM2.5 levels are elevated (${devices.airQuality.sensors.pm25} µg/m³).`,
      severity: 'warning',
      recommendedFix: 'Increase air purifier speed.'
    });
  }

  // Energy checks
  const usage = computeEnergyUsage(devices);
  if (usage > 4.0) {
    issues.push({
      id: 'diag_nrg_1',
      title: 'High Energy Consumption',
      description: `Current usage is ${usage} kW.`,
      severity: 'info',
      recommendedFix:
      'Consider adjusting climate control or turning off lights.'
    });
  }

  return issues;
}

export function computeAIRecommendations(
mode: AIMode,
devices: Devices,
currentUsage: number)
: AIRecommendation[] {
  const recs: AIRecommendation[] = [];

  if (mode === 'night') {
    const unlocked = devices.security.doors.filter((d) => !d.locked);
    if (unlocked.length > 0) {
      recs.push({
        id: 'rec_night_1',
        title: 'Secure Perimeter',
        description: 'Lock all doors for the night.',
        severity: 'warning',
        suggestedAction: 'Lock Doors',
        actionKey: 'lockAllDoors'
      });
    }

    const activeLights = devices.lights.filter((l) => l.on && l.brightness > 20);
    if (activeLights.length > 0) {
      recs.push({
        id: 'rec_night_2',
        title: 'Dim Lighting',
        description: 'Reduce lighting to promote sleep.',
        severity: 'info',
        suggestedAction: 'Dim to 20%',
        actionKey: 'dimLights20'
      });
    }
  }

  if (mode === 'away') {
    if (devices.security.alarm.armed === 'off') {
      recs.push({
        id: 'rec_away_1',
        title: 'Arm Security System',
        description: 'House is empty but alarm is off.',
        severity: 'critical',
        suggestedAction: 'Arm Away',
        actionKey: 'armAway'
      });
    }
    if (devices.climate.mode !== 'off' && devices.climate.targetTemp < 78) {
      recs.push({
        id: 'rec_away_2',
        title: 'Optimize Climate',
        description: 'Raise target temperature to save energy while away.',
        severity: 'info',
        suggestedAction: 'Set to 78°',
        actionKey: 'setTemp78'
      });
    }
  }

  if (mode === 'relax') {
    if (
    devices.lights.find(
      (l) => l.room === 'Living Room' && l.on && l.brightness > 50
    ))
    {
      recs.push({
        id: 'rec_relax_1',
        title: 'Mood Lighting',
        description: 'Dim living room lights for a relaxing atmosphere.',
        severity: 'info',
        suggestedAction: 'Set Scene: Relax',
        actionKey: 'dimLivingRoom40'
      });
    }
  }

  if (mode === 'thinking') {
    if (currentUsage > 3.0) {
      recs.push({
        id: 'rec_think_1',
        title: 'Energy Optimization',
        description:
        'Current energy usage is high. AI can optimize HVAC cycles.',
        severity: 'info',
        suggestedAction: 'Enable Eco Mode',
        actionKey: 'ecoMode'
      });
    }
    if (
    devices.airQuality.sensors.co2 > 400 &&
    devices.airQuality.purifier.speed !== 'high')
    {
      recs.push({
        id: 'rec_think_2',
        title: 'Improve Airflow',
        description: 'Slightly elevated CO2 detected. Increase purifier speed.',
        severity: 'info',
        suggestedAction: 'Purifier to High',
        actionKey: 'purifierHigh'
      });
    }
  }

  if (mode === 'performing') {
    recs.push({
      id: 'rec_perf_1',
      title: 'System Active',
      description:
      'AI is actively managing climate and security based on occupancy.',
      severity: 'success'
    });
  }

  return recs;
}