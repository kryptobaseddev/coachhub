// src/routes/notifications/+page.server.js
/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
  // Access demoData from locals
  const { demoData } = locals;

  return {
    notifications: demoData?.notifications,
    settings: demoData?.settings.notifications
  };
}