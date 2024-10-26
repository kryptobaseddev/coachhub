// src/routes/admin/+layout.server.js
import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
  if (!locals.user || locals.user.role !== 'admin') {
    throw redirect(303, '/dashboard');
  }
  return {
    user: locals.user
  };
}