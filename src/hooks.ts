import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ resolve, event }) => {
  const response = await resolve(event);

  // Apply CORS header for API routes
  if (event.url.pathname.startsWith('/api')) {
    // Required for CORS to work
    if (event.request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
          'Access-Control-Allow-Origin': '*',
        }
      });
    }

    response.headers.append('Access-Control-Allow-Origin', `*`);
  }

  return response;
}
