// src/routes/dashboard/+page.server.js
import { demoData } from '$lib/demoData/demoData';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  // In a real implementation, you would fetch this data from your API
  // For demo mode, we'll use our demo data
  // TODO: Replace with actual data from the API
  return {
    deviceStatus: {
        interior: demoData.devices.interior,
        exterior: demoData.devices.exterior,
        climate: demoData.devices.climate
    },
    systemStatus: {
        tanks: demoData.status.tanks,
        power: demoData.status.power
    },
    notifications: demoData.notifications
};
}