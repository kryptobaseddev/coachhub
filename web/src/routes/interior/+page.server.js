// src/routes/interior/+page.server.js
import { demoData } from '$lib/demoData/demoData';

export async function load() {
  // In real implementation, fetch from API
  // Using demo data for now
  return {
    devices: demoData.devices.interior
  };
}