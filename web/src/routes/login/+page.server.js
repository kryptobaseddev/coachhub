// src/routes/login/+page.server.js
import { fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request, cookies, locals }) => {
    const data = await request.formData();
    const identifier = data.get('identifier');
    const password = data.get('password');

    if (!identifier || !password) {
      return fail(400, { error: 'Missing email/username or password' });
    }

    const { demoMode, demoData } = locals;

    if (demoMode) {
      if (demoData && demoData.users) {
        const user = demoData.users.find(u =>
          (u.email === identifier || u.username === identifier) && u.password === password
        );

        if (user) {
          // Set the session cookie for persistence
          cookies.set('session', JSON.stringify(user), {
            path: '/',
            httpOnly: true,
            secure: false,  // Set to true for HTTPS in production
            maxAge: 60 * 60 * 24  // 1 day
          });

          locals.user = user; // Update locals with the logged-in user
          throw redirect(303, '/dashboard');
        } else {
          return fail(401, { error: 'Invalid credentials' });
        }
      } else {
        console.error('Demo data is not loaded correctly.');
        return fail(500, { error: 'Demo data not available' });
      }
    } else {
      // Example API login
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ identifier, password })
        }).then(res => res.json());

        if (response.success) {
          cookies.set('session', JSON.stringify(response.user), {
            path: '/',
            httpOnly: true,
            secure: false,
            maxAge: 60 * 60 * 24
          });

          locals.user = response.user;
          throw redirect(303, '/dashboard');
        } else {
          return fail(401, { error: 'Invalid credentials' });
        }
      } catch (error) {
        console.error('Login error:', error);
        return fail(500, { error: 'An unexpected error occurred', details: error.message });
      }
    }
  }
};
