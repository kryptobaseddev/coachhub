// src/lib/demoData.js
export const demoData = {
    devices: {
      interior: {
        lights: [
          { id: 'light1', name: 'Living Room Light', state: 'off', type: 'light', brightness: 0 },
          { id: 'light2', name: 'Bedroom Light', state: 'off', type: 'light', brightness: 0 },
          { id: 'light3', name: 'Kitchen Light', state: 'off', type: 'light', brightness: 0 },
          { id: 'light4', name: 'Bathroom Light', state: 'off', type: 'light', brightness: 0 }
        ],
        fans: [
          { id: 'fan1', name: 'Living Room Fan', state: 'off', type: 'fan', speed: 0 },
          { id: 'fan2', name: 'Bedroom Fan', state: 'off', type: 'fan', speed: 0 }
        ],
        shades: [
          { id: 'shade1', name: 'Living Room Shade', position: 0, type: 'shade' },
          { id: 'shade2', name: 'Bedroom Shade', position: 0, type: 'shade' }
        ]
      },
      exterior: {
        lights: [
          { id: 'ext_light1', name: 'Porch Light', state: 'off', type: 'light', brightness: 0 },
          { id: 'ext_light2', name: 'Awning Light', state: 'off', type: 'light', brightness: 0 }
        ],
        awnings: [
          { id: 'awning1', name: 'Main Awning', position: 0, type: 'awning' }
        ],
        waterHeater: {
          id: 'water_heater1',
          name: 'Water Heater',
          state: 'off',
          type: 'water_heater',
          temperature: 120,
          targetTemp: 120
        }
      },
      climate: {
        thermostats: [
          {
            id: 'therm1',
            name: 'Main Thermostat',
            type: 'thermostat',
            mode: 'off',
            currentTemp: 72,
            targetTemp: 72,
            humidity: 45
          }
        ],
        ventFans: [
          { id: 'vent1', name: 'Bathroom Vent', state: 'off', type: 'fan', speed: 0 },
          { id: 'vent2', name: 'Kitchen Vent', state: 'off', type: 'fan', speed: 0 }
        ],
        heatedFloors: [
          {
            id: 'floor1',
            name: 'Bathroom Floor',
            state: 'off',
            currentTemp: 70,
            targetTemp: 70
          }
        ]
      }
    },
    status: {
      tanks: {
        fresh: { level: 75, capacity: 100, unit: 'gallons' },
        grey: { level: 25, capacity: 100, unit: 'gallons' },
        black: { level: 15, capacity: 100, unit: 'gallons' }
      },
      power: {
        inverter: {
          state: 'on',
          batteryLevel: 85,
          charging: true,
          outputWatts: 1200
        },
        ac: {
          leg1: { voltage: 120, current: 15, power: 1800 },
          leg2: { voltage: 120, current: 10, power: 1200 }
        },
        generator: {
          state: 'off',
          runtime: 0,
          fuelLevel: 100,
          outputPower: 0
        }
      },
      vehicle: {
        ignition: 'off',
        parkBrake: 'on',
        engineHours: 150,
        fuelLevel: 85
      }
    },
    users: [
      {
        id: '1',
        email: 'admin@demo.com',
        name: 'Admin User',
        role: 'admin',
        lastLogin: '2024-01-01T12:00:00Z'
      },
      {
        id: '2',
        email: 'user@demo.com',
        name: 'Regular User',
        role: 'user',
        lastLogin: '2024-01-01T12:00:00Z'
      }
    ],
    notifications: [
      {
        id: '1',
        type: 'warning',
        message: 'Fresh water tank below 25%',
        timestamp: '2024-01-01T12:00:00Z',
        read: false
      },
      {
        id: '2',
        type: 'info',
        message: 'Generator maintenance due in 10 hours',
        timestamp: '2024-01-01T12:00:00Z',
        read: false
      }
    ],
    settings: {
      notifications: {
        email: true,
        push: true,
        categories: {
          system: true,
          maintenance: true,
          security: true
        }
      },
      system: {
        timezone: 'America/New_York',
        temperatureUnit: 'F',
        darkMode: false
      }
    }
  };