// src/lib/stores/demoMode.js
import { writable } from 'svelte/store';

export const isDemoMode = writable(true); // Set to true by default for development