// src/routes/status/+page.server.js
import { demoData } from '$lib/demoData/demoData';

export async function load() {
  return {
    status: demoData.status
  };
}