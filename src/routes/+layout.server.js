import { studio } from "$lib/site/content.js"
import { studio_server } from "$lib/server/member-site.js"
import { public_member } from "$lib/server/studio.js"

export const load = ({ locals }) => ({ studio, studio_config: studio_server.public_config, member: public_member(locals) })
