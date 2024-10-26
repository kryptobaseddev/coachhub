// src/routes/api/+server.js
import { json } from '@sveltejs/kit';
import { demoData } from '$lib/demoData/demoData';

// Helper to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function GET({ url, locals }) {
    // Authentication check
    if (!locals.user) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const path = url.searchParams.get('path');
    
    try {
        await delay(200); // Simulate network delay
        
        switch (path) {
            case 'users':
                // TODO: Replace with actual database query
                // Expected response: { users: User[] }
                // Authorization: Admin only
                if (locals.user.role !== 'admin') {
                    return json({ error: 'Forbidden' }, { status: 403 });
                }
                return json({ users: demoData.users });

            case 'devices':
                // TODO: Replace with actual device state query
                // Expected response: { devices: { interior: Device[], exterior: Device[], climate: Device[] } }
                return json({ devices: demoData.devices });

            case 'status':
                // TODO: Replace with actual system status query
                // Expected response: { tanks: Tank[], power: PowerStatus, vehicle: VehicleStatus }
                return json({ status: demoData.status });

            case 'notifications':
                // TODO: Replace with actual notifications query
                // Expected response: { notifications: Notification[] }
                return json({ notifications: demoData.notifications });

            default:
                return json({ error: 'Invalid endpoint' }, { status: 404 });
        }
    } catch (error) {
        console.error('API Error:', error);
        return json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST({ request, locals, url }) {
    if (!locals.user) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const path = url.searchParams.get('path');
    const data = await request.json();

    try {
        await delay(300); // Simulate network delay

        switch (path) {
            case 'users':
                // TODO: Replace with actual user creation
                // Required fields: { email: string, name: string, role: 'admin' | 'user' }
                // Authorization: Admin only
                if (locals.user.role !== 'admin') {
                    return json({ error: 'Forbidden' }, { status: 403 });
                }
                return json({ success: true, user: { ...data, id: crypto.randomUUID() }});

            case 'device/control':
                // TODO: Replace with actual device control
                // Required fields: { deviceId: string, action: string, value: any }
                return json({ success: true, deviceId: data.deviceId });

            default:
                return json({ error: 'Invalid endpoint' }, { status: 404 });
        }
    } catch (error) {
        console.error('API Error:', error);
        return json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function PUT({ request, locals, url }) {
    if (!locals.user) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const path = url.searchParams.get('path');
    const data = await request.json();

    try {
        await delay(300);

        switch (path) {
            case 'users':
                // TODO: Replace with actual user update
                // Required fields: { id: string, updates: Partial<User> }
                // Authorization: Admin only
                if (locals.user.role !== 'admin') {
                    return json({ error: 'Forbidden' }, { status: 403 });
                }
                return json({ success: true, user: data });

            case 'notifications/read':
                // TODO: Replace with actual notification update
                // Required fields: { notificationId: string }
                return json({ success: true });

            default:
                return json({ error: 'Invalid endpoint' }, { status: 404 });
        }
    } catch (error) {
        console.error('API Error:', error);
        return json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE({ locals, url }) {
    if (!locals.user) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const path = url.searchParams.get('path');
    const id = url.searchParams.get('id');

    try {
        await delay(200);

        switch (path) {
            case 'users':
                // TODO: Replace with actual user deletion
                // Required params: id
                // Authorization: Admin only
                if (locals.user.role !== 'admin') {
                    return json({ error: 'Forbidden' }, { status: 403 });
                }
                return json({ success: true });

            default:
                return json({ error: 'Invalid endpoint' }, { status: 404 });
        }
    } catch (error) {
        console.error('API Error:', error);
        return json({ error: 'Internal server error' }, { status: 500 });
    }
}