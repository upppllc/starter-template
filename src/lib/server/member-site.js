import { env } from "$env/dynamic/private"
import { create_studio_server } from "./studio.js"

export const studio_server = create_studio_server({
  organization_slug: env.CLASSHELM_ORGANIZATION_SLUG,
  api_origin: env.CLASSHELM_API_ORIGIN || "https://www.classhelm.com",
  storefront_shared_secret: env.CLASSHELM_STOREFRONT_SHARED_SECRET,
})
