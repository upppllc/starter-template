import { create_button_manager } from "sveltekit-ui"
export function create_error_page_manager(config) {
  let busy = $state(false)
  return { get status() { return config.data().status },
    home_button: create_button_manager({ text: "Home", is_compressed: true, support_icon: "arrow_tailed", icon_pos: "left", icon_deg: 180, href: "/" }),
    retry_button: create_button_manager({ text: "Try again", type: "outlined", is_compressed: true, support_icon: "refresh", is_loading: () => busy, on_click: () => { busy = true; window.location.reload() } }),
  }
}
