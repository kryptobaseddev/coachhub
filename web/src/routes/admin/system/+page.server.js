// src/routes/admin/system/+page.server.js
import { error } from '@sveltejs/kit';
import { isDemoMode, demoData } from '$lib/demoData/demoData.js';
import { coachConfigurations, demoCoach } from '$lib/demoData/coachConfigs.js';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ fetch }) => {
  try {
    let settings, networkInfo, systemInfo;

    if (isDemoMode) {
      // Use demo data
      settings = demoData.settings;
      networkInfo = demoData.settings.system.networkInfo;
      systemInfo = demoData.settings.system.systemInfo;
    } else {
      // Fetch real data
      const settingsResponse = await fetch('/api/admin/system/settings');
      settings = await settingsResponse.json();

      const networkInfoResponse = await fetch('/api/admin/system/network');
      networkInfo = await networkInfoResponse.json();

      const systemInfoResponse = await fetch('/api/admin/system/info');
      systemInfo = await systemInfoResponse.json();
    }

    // Ensure security settings exist with default values
    if (!settings.security) {
      settings.security = {
        requireStrongPasswords: false,
        passwordExpiration: false,
        passwordExpirationDays: 90,
        // Add other security settings with default values
      };
    }

    // If not in demo mode, get coach configs
    const demoCoachInfo = isDemoMode ? null : demoCoach;

    return {
      settings,
      networkInfo,
      systemInfo,
      demoCoachInfo,
      isDemoMode
    };
  } catch (err) {
    console.error('Error in load function:', err);
    throw error(500, {
      message: 'Failed to load system data'
    });
  }
};
