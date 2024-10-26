// src/routes/login/+page.server.js
import { fail, redirect } from '@sveltejs/kit';
import { demoData } from '$lib/demoData/demoData';

export const actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get('email');
    const password = data.get('password');

    // Demo mode authentication
    const demoUser = demoData.users.find(u => u.email === email);
    if (demoUser && 
        ((email === 'admin@demo.com' && password === 'admin') ||
         (email === 'user@demo.com' && password === 'user'))) {
      const session = {
        id: demoUser.id,
        email: demoUser.email,
        name: demoUser.name,
        role: demoUser.role
      };
      
      cookies.set('session', JSON.stringify(session), {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 // 24 hours
      });

      throw redirect(303, '/dashboard');
    }

    return fail(400, { 
      error: 'Invalid credentials',
      email 
    });
  }
};