import { defineEnvVars } from "@sveltejs/kit/env"

export const variables = defineEnvVars({
  CLASSHELM_ORGANIZATION_SLUG: {
    description: "Optional exact studio slug; absent or empty disables all upstream studio requests.",
    schema: (value) => value,
  },
  CLASSHELM_API_ORIGIN: {
    description: "Optional trusted server API origin; absent or empty uses https://www.classhelm.com.",
    schema: (value) => value,
  },
  CLASSHELM_STOREFRONT_SHARED_SECRET: {
    description: "Optional server-only studio member-site shared secret.",
    schema: (value) => value,
  },
})
