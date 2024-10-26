// src/hooks.server.js
import { redirect } from '@sveltejs/kit';

const unprotectedPaths = ['/login', '/reset-password'];

/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
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

  // Protected routes logic
  const protectedRoutes = ['/dashboard', '/interior', '/exterior', '/climate', '/status', '/notifications'];
  const adminRoutes = ['/admin', '/system', '/coach', '/automations', '/users'];
  const path = event.url.pathname;

  // Check if trying to access protected route without authentication
  if (protectedRoutes.some(route => path.startsWith(route)) && !event.locals.user) {
    throw redirect(303, '/login');
  }

  // Check if trying to access admin route without admin privileges
  if (adminRoutes.some(route => path.startsWith(route)) && 
      (!event.locals.user || event.locals.user.role !== 'admin')) {
    throw redirect(303, '/dashboard');
  }

  // Allow access to unprotected paths without authentication
  if (!event.locals.user && !unprotectedPaths.includes(path)) {
    throw redirect(303, '/login');
  }

  const response = await resolve(event);
  return response;
};