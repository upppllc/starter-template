import { create_button_manager } from "sveltekit-ui"
export function create_main_nav_manager(config) {
  return { buttons: [
    create_button_manager({ text: "Home", type: "soft", text_align: "left", icon_pos: "left", support_icon: "house", href: "/", on_click: config.close }),
    create_button_manager({ text: "Schedule", type: "soft", text_align: "left", support_icon: "arrow_tailed", icon_deg: -45, href: () => config.data().studio_config.schedule_href, is_disabled: () => !config.data().studio_config.configured, on_click: config.close }),
    create_button_manager({ text: "My account", type: "soft", text_align: "left", href: "/account", is_disabled: () => !config.data().studio_config.configured, on_click: config.close }),
  ] }
}
