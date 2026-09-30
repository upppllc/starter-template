import { redirect } from "@sveltejs/kit"
import { studio_server } from "$lib/server/member-site.js"
export const load = event => studio_server.load_account(event, { redirect })
