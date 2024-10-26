// src/routes/notifications/+page.server.js
import { demoData } from '$lib/demoData/demoData';

export async function load() {
  return {
    notifications: demoData.notifications,
    settings: demoData.settings.notifications
  };
}