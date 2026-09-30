import { getContext, setContext } from "svelte"
import { create_layout_manager, create_button_manager } from "sveltekit-ui"
import { create_main_nav_manager } from "$lib/components/MainNav/index.svelte.js"

const context_key = Symbol("studio_manager")
export function create_global_manager(config) {
  const data = () => config.data()
  const layout_manager = create_layout_manager({ favicons: { favicon: "/favicon.svg", favicon_inactive: "/favicon-inactive.svg" } })
  return {
    layout_manager,
    nav_manager: create_main_nav_manager({ data, close: () => layout_manager.set_is_full_nav_toggled_on(false) }),
    account_button: create_button_manager({ type: "outlined", is_compressed: true, text: () => data().member ? "My account" : "Sign in", href: () => data().member ? "/account" : "/sign-in", is_disabled: () => !data().studio_config.configured }),
    privacy_button: create_button_manager({ type: "soft", is_compressed: true, text: "Privacy", href: "/privacy" }),
  }
}
export const set_global_manager = manager => setContext(context_key, manager)
export function get_global_manager() {
  const manager = getContext(context_key)
  if (!manager) throw new Error("Initialize the studio manager in the root layout.")
  return manager
}
