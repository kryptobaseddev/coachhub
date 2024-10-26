// src/routes/admin/automations/+page.server.js
import { demoData } from '$lib/demoData/demoData';

export async function load() {
  return {
    automations: [
      {
        id: '1',
        name: 'Night Mode',
        description: 'Turn off all lights and lower shades',
        isEnabled: true,
        trigger: {
          type: 'schedule',
          time: '22:00',
          days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
        },
        actions: [
          { type: 'lights', target: 'all', action: 'off' },
          { type: 'shades', target: 'all', action: 'close' }
        ]
      },
      {
        id: '2',
        name: 'Morning Warmup',
        description: 'Turn on heated floors and adjust temperature',
        isEnabled: true,
        trigger: {
          type: 'schedule',
          time: '06:30',
          days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
        },
        actions: [
          { type: 'climate', target: 'main_thermostat', action: 'set', value: 72 },
          { type: 'floor_heat', target: 'bathroom', action: 'on' }
        ]
      }
    ],
    availableDevices: demoData.devices
  };
}