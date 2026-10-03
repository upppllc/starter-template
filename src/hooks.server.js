import { studio_server } from "#lib/server/member-site.js"
import { transform_theme, secure_site_response } from "#lib/server/site-response.js"

export async function handle({ event, resolve }) {
  await studio_server.restore(event)
  const response = await resolve(event, { transformPageChunk: ({ html }) => transform_theme(html, event.cookies.get("theme")) })
  return secure_site_response(response, event)
}
