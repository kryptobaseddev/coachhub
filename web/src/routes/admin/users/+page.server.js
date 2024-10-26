// src/routes/admin/users/+page.server.js
import { fail } from '@sveltejs/kit';
import { demoData } from '$lib/demoData/demoData';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
    // Check if user has admin access
    if (!locals.user || locals.user.role !== 'admin') {
        throw new Error('Unauthorized');
    }

    return {
        users: demoData.users
    };
}

/** @type {import('./$types').Actions} */
export const actions = {
    createUser: async ({ request }) => {
        const formData = await request.formData();
        const email = formData.get('email');
        const name = formData.get('name');
        const role = formData.get('role');

        if (!email || !name || !role) {
            return fail(400, {
                error: 'Missing required fields',
                values: { email, name, role }
            });
        }

        // In demo mode, we'll just pretend to create a user
        return {
            success: true,
            message: 'User created successfully'
        };
    },

    updateUser: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get('id');
        const email = formData.get('email');
        const name = formData.get('name');
        const role = formData.get('role');

        if (!id || !email || !name || !role) {
            return fail(400, {
                error: 'Missing required fields',
                values: { id, email, name, role }
            });
        }

        // In demo mode, we'll just pretend to update the user
        return {
            success: true,
            message: 'User updated successfully'
        };
    },

    deleteUser: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get('id');

        if (!id) {
            return fail(400, { error: 'User ID is required' });
        }

        // In demo mode, we'll just pretend to delete the user
        return {
            success: true,
            message: 'User deleted successfully'
        };
    }
};