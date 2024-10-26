// src/lib/stores/devices.js
import { writable } from 'svelte/store';

// Demo data
const initialDevices = {
  interior: {
    lights: [
      { id: 1, name: 'Living Room', state: 'off' },
      { id: 2, name: 'Bedroom', state: 'off' },
      { id: 3, name: 'Kitchen', state: 'off' }
    ],
    fans: [
      { id: 1, name: 'Ceiling Fan', state: 'off', speed: 0 }
    ],
    shades: [
      { id: 1, name: 'Living Room', position: 0 }
    ]
  },
  exterior: {
    lights: [
      { id: 1, name: 'Porch', state: 'off' },
      { id: 2, name: 'Awning', state: 'off' }
    ],
    awnings: [
      { id: 1, name: 'Main Awning', position: 0 }
    ],
    waterHeater: { state: 'off', temperature: 120 }
  },
  climate: {
    ventFans: [
      { id: 1, name: 'Bathroom', state: 'off', speed: 0 },
      { id: 2, name: 'Kitchen', state: 'off', speed: 0 }
    ],
    heatedFloors: [
      { id: 1, name: 'Bathroom', state: 'off', temperature: 70 }
    ],
    thermostats: [
      { id: 1, name: 'Main', mode: 'off', temperature: 72, setpoint: 72 }
    ]
  },
  status: {
    tanks: {
      fresh: { level: 75, capacity: 100 },
      grey: { level: 25, capacity: 100 },
      black: { level: 15, capacity: 100 }
    },
    power: {
      inverter: { state: 'on', batteryLevel: 85 },
      ac: {
        leg1: { voltage: 120, current: 15 },
        leg2: { voltage: 120, current: 10 }
      },
      generator: { state: 'off', runtime: 0 }
    },
    vehicle: {
      ignition: 'off',
      parkBrake: 'on'
    }
  }
};

export const devices = writable(initialDevices);