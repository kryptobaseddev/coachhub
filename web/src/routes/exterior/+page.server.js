// src/routes/exterior/+page.server.js
import { demoData } from '$lib/demoData/demoData';

export async function load() {
  return {
    devices: demoData.devices.exterior
  };
}