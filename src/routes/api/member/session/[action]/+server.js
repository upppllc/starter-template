import { studio_server } from "#lib/server/member-site.js"
export const POST = event => studio_server.session_action(event)
