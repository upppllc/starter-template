import { create_layout_manager } from "sveltekit-ui"
import { create_newsletter_subscribe_manager } from "$lib/components/Newsletter/index.svelte.js"

export function create_global_manager(config) {
  let layout_manager = $state(null)
  let newsletter_subscribe_manager = create_newsletter_subscribe_manager()

  function init(input) {
    layout_manager = create_layout_manager({
      favicons: {
        favicon: "/favicon.svg",
        favicon_inactive: "/favicon-inactive.svg",
      },
    })
  }

  init(config)

  return {
    get layout_manager() {
      return layout_manager
    },
    get newsletter_subscribe_manager() {
      return newsletter_subscribe_manager
    },
  }
}

export let global_manager = create_global_manager()
