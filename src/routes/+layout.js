import { dev } from "$app/environment"
import { injectAnalytics } from "@vercel/analytics/sveltekit"
import { create_public_page_analytics } from "classhelm/public-page-analytics"

injectAnalytics({ mode: dev ? "development" : "production", beforeSend: create_public_page_analytics({ public_paths: ["/"] }) })
