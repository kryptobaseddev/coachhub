// src/hooks.server.js
import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { isDemoMode } from '$lib/stores/demoMode.js';
import { demoData } from '$lib/demoData/demoData.js';
import { coachConfigurations } from '$lib/demoData/coachConfigs.js';

const unprotectedPaths = ['/login', '/reset-password'];
const protectedRoutes = ['/dashboard', '/interior', '/exterior', '/climate', '/status', '/notifications'];
const adminRoutes = ['/admin', '/system', '/coach', '/automations', '/users'];

/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
  // Initialize demoMode and attach demoData and coachConfigurations directly
  const demoMode = get(isDemoMode);
  const demoDataLoaded = demoMode ? demoData : null;
  const coachConfigLoaded = demoMode ? coachConfigurations : null;

  // Console log demoMode, demoData and coachConfig
  // console.log('demoMode:', demoMode);
  // console.log('demoData:', demoDataLoaded);
  // console.log('coachConfig:', coachConfigLoaded);

  // Attach demoMode and demoData to event.locals
  event.locals.demoMode = demoMode;
  event.locals.demoData = demoDataLoaded;
  event.locals.coachConfigurations = coachConfigLoaded;
  // Get session from cookie
  const sessionId = event.cookies.get('session');

  // Add user to event.locals if session exists
  if (sessionId) {
    try {
      const userData = JSON.parse(sessionId);
      event.locals.user = userData;
    } catch (e) {
      event.cookies.delete('session', { path: '/' });
      throw redirect(303, '/login');
    }
  } else {
    event.locals.user = null;
  }

  const path = event.url.pathname;

  // Protected routes logic
  if (protectedRoutes.some(route => path.startsWith(route)) && !event.locals.user) {
    throw redirect(303, '/login');
  }

  // Admin routes logic
  if (adminRoutes.some(route => path.startsWith(route)) && 
      (!event.locals.user || event.locals.user.role !== 'admin')) {
    throw redirect(303, '/dashboard');
  }

  // Allow access to unprotected paths without authentication
  if (!event.locals.user && !unprotectedPaths.includes(path)) {
    throw redirect(303, '/login');
  }

  // Process the request
  const response = await resolve(event);
  return response;
};
