// src/routes/login/+page.server.js
import { fail, redirect } from '@sveltejs/kit';
import { isDemoMode, demoData } from '$lib/demoData/demoData.js';

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request, fetch }) => {
    // console.log('Login action started');
    const data = await request.formData();
    const identifier = data.get('identifier');
    const password = data.get('password');

    // console.log('Received credentials:', { identifier, password: '****' });

    if (!identifier || !password) {
      // console.log('Missing credentials');
      return fail(400, { error: 'Missing email/username or password' });
    }

    // console.log('isDemoMode:', isDemoMode);
    if (isDemoMode) {
      // console.log('Demo data users:', demoData.users);
      // Demo mode login logic
      const user = demoData.users.find(u => 
        (u.email === identifier || u.username === identifier) && u.password === password
      );
      
      // console.log('Found user:', user);
      if (user) {
        // Successful login
        // console.log('Successful login, redirecting to dashboard');
        throw redirect(303, '/dashboard');
      } else {
        // console.log('Invalid credentials in demo mode');
        return fail(401, { error: 'Invalid credentials' });
      }
    } else {
      // Real login API call
      // console.log('Attempting real API call');
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ identifier, password })
        }).then(res => res.json());

        // console.log('API response:', response);
        if (response.success) {
          // Set session, cookies, etc.
          // console.log('Successful API login, redirecting to dashboard');
          throw redirect(303, '/dashboard');
        } else {
          // console.log('Invalid credentials from API');
          return fail(401, { error: 'Invalid credentials' });
        }
      } catch (error) {
        // console.error('Login error:', error);
        return fail(500, { error: 'An unexpected error occurred', details: error.message });
      }
    }
  }
};
