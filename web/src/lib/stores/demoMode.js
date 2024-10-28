// src/lib/stores/demoMode.js
import { writable } from 'svelte/store';
import { demoData } from '$lib/demoData/demoData.js';
import { coachConfigurations } from '$lib/demoData/coachConfigs.js';

// Set demo mode based on the environment variable
export const isDemoMode = writable(import.meta.env.VITE_DEMO_MODE === 'true');

// Initialize stores with demo data if in demo mode
export const demoDataStore = writable(import.meta.env.VITE_DEMO_MODE === 'true' ? demoData : null);
export const coachConfigStore = writable(import.meta.env.VITE_DEMO_MODE === 'true' ? coachConfigurations : null);
