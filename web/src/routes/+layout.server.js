// src/routes/+layout.server.js
export const load = async ({ locals }) => {
    return {
        user: locals.user || null // Ensure we always return a value
    };
};