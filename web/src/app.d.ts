// src/app.d.ts

declare global {
  namespace App {
    interface Locals {
      user: { role: string } | null;
      demoMode: boolean;
      demoData: DemoData | null;
      coachConfigurations: CoachConfigurations | null;
    }
  }
}

interface DemoData {
  devices: {
    interior: {
      lights: Array<{
        id: string;
        name: string;
        state: string;
        type: string;
        brightness: number;
      }>;
      fans: Array<{
        id: string;
        name: string;
        state: string;
        type: string;
        speed: number;
      }>;
      shades: Array<{
        id: string;
        name: string;
        state: string;
        type: string;
        position: number;
      }>;
    };
    exterior: {
      lights: Array<{
        id: string;
        name: string;
        state: string;
        type: string;
        brightness: number;
      }>;
      awnings: Array<{
        id: string;
        name: string;
        state: string;
        type: string;
        position: number;
      }>;
      waterHeater: {
        id: string;
        name: string;
        state: string;
        type: string;
        temperature: number;
        targetTemp: number;
      };
    };
    climate: {
      thermostats: Array<{
        id: string;
        name: string;
        type: string;
        mode: string;
        currentTemp: number;
        targetTemp: number;
        humidity: number;
      }>;
      ventFans: Array<{
        id: string;
        name: string;
        state: string;
        type: string;
        speed: number;
      }>;
      heatedFloors: Array<{
        id: string;
        name: string;
        state: string;
        currentTemp: number;
        targetTemp: number;
      }>;
    };
  };
  status: {
    tanks: {
      fresh: {
        level: number;
        capacity: number;
        unit: string;
      };
      grey: {
        level: number;
        capacity: number;
        unit: string;
      };
      black: {
        level: number;
        capacity: number;
        unit: string;
      };
    };
    power: {
      inverter: {
        state: string;
        batteryLevel: number;
        charging: boolean;
        outputWatts: number;
      };
      ac: {
        leg1: {
          voltage: number;
          current: number;
          power: number;
        };
        leg2: {
          voltage: number;
          current: number;
          power: number;
        };
      };
      generator: {
        state: string;
        runtime: number;
        fuelLevel: number;
        outputPower: number;
      };
    };
    vehicle: {
      ignition: string;
      parkBrake: string;
      engineHours: number;
      fuelLevel: number;
    };
  };
  users: Array<{
    id: string;
    username: string;
    email: string;
    password: string;
    name: string;
    role: string;
    lastLogin: string;
  }>;
  notifications: Array<{
    id: string;
    type: string;
    message: string;
    timestamp: string;
    read: boolean;
  }>;
  settings: {
    notifications: {
      email: boolean;
      push: boolean;
      categories: {
        system: boolean;
        maintenance: boolean;
        security: boolean;
      };
    };
    system: {
      timezone: string;
      temperatureUnit: string;
      darkMode: boolean;
      security: {
        requireStrongPasswords: boolean;
        passwordExpiration: boolean;
        passwordExpirationDays: number;
        enableIPWhitelist: boolean;
        ipWhitelist: string;
        enforceHTTPS: boolean;
        enableHSTS: boolean;
        sessionTimeout: number;
        enable2FA: boolean;
      };
      systemInfo: {
        version: string;
        build: string;
      };
      networkInfo: {
        ddnsProvider: string;
        ddnsHostname: string;
        ddnsUsername: string;
        ddnsPassword: string;
        ddnsUpdateInterval: number;
      };
    };
  };
}

interface CoachConfigurations {
  makes: Array<{
    name: string;
    models: Array<{
      name: string;
      years: Array<{
        year: string;
        floorplans: Array<string>;
      }>;
    }>;
  }>;
}

export {};
