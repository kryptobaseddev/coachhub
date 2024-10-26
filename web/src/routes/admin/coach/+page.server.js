// src/routes/admin/coach/+page.server.js
import { coachConfigurations, demoCoach } from '$lib/demoData/coachConfigs';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return {
        coach: demoCoach,
        configurations: coachConfigurations
    };
}

/** @type {import('./$types').Actions} */
export const actions = {
    updateCoach: async ({ request }) => {
        const formData = await request.formData();
        // Handle coach updates in non-demo mode
        return { success: true };
    }
};