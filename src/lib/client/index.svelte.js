import { create_layout_manager } from "sveltekit-ui"
import { create_newsletter_subscribe_manager } from "$lib/components/Newsletter/index.svelte.js"
import { getContext, setContext } from "svelte"

const global_manager_context = Symbol("global_manager")

export function create_global_manager() {
  const layout_manager = create_layout_manager({
    favicons: {
      favicon: "/favicon.svg",
      favicon_inactive: "/favicon-inactive.svg",
    },
  })
  const newsletter_subscribe_manager = create_newsletter_subscribe_manager()

  return {
    get layout_manager() {
      return layout_manager
    },
    get newsletter_subscribe_manager() {
      return newsletter_subscribe_manager
    },
  }
}

// Set once in the root layout so each SSR request has its own state.
export function set_global_manager(manager) {
  return setContext(global_manager_context, manager)
}

// Call during component initialization, then use the result in event handlers.
export function get_global_manager() {
  const manager = getContext(global_manager_context)
  if (!manager) {
    throw new Error("The global manager must be initialized in the root layout")
  }
  return manager
}
