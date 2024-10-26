// src/routes/admin/system/+page.server.js
import { demoData } from '$lib/demoData/demoData';

export async function load() {
  return {
    settings: demoData.settings.system
  };
}