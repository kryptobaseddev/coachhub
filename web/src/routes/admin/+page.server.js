// src/routes/admin/+page.server.js
import { demoData } from '$lib/demoData/demoData';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    // Load summary data for admin dashboard
    return {
        stats: {
            totalUsers: demoData.users.length,
            activeDevices: Object.values(demoData.devices.interior).flat().length + 
                          Object.values(demoData.devices.exterior).flat().length +
                          Object.values(demoData.devices.climate).flat().length,
            unreadNotifications: demoData.notifications.filter(n => !n.read).length,
            systemStatus: {
                batteryLevel: demoData.status.power.inverter.batteryLevel,
                freshWater: demoData.status.tanks.fresh.level,
                lastUpdate: new Date().toISOString()
            }
        }
    };
}