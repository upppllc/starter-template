import { CLASSHELM_ORGANIZATION_SLUG, CLASSHELM_API_ORIGIN, CLASSHELM_STOREFRONT_SHARED_SECRET } from "$app/env/private"
import { create_studio_server } from "./studio.js"

export const studio_server = create_studio_server({
  organization_slug: CLASSHELM_ORGANIZATION_SLUG,
  api_origin: CLASSHELM_API_ORIGIN || "https://www.classhelm.com",
  storefront_shared_secret: CLASSHELM_STOREFRONT_SHARED_SECRET,
})
