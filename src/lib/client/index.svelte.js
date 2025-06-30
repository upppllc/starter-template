import { create_layout_manager } from "sveltekit-ui"

export function create_global_manager(config) {
  let layout_manager = $state(null)

  function init(config) {
    layout_manager = create_layout_manager({
      is_nav_always_top: true,
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
  }
}

export let global_manager = create_global_manager()
