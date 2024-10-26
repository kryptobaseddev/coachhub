// src/lib/stores/notifications.js
import { writable } from 'svelte/store';

export const notifications = writable([]);
export const notificationSettings = writable({
  email: true,
  push: true,
  categories: {
    system: true,
    maintenance: true,
    security: true
  }
});