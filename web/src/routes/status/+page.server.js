// src/routes/status/+page.server.js
/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
  // Access demoMode and demoData directly from locals
  const { demoMode, demoData } = locals;

  return {
    demoMode,
    status: demoData?.status || 'Status data not available'  // Provide fallback if demoData is null
  };
}
