import { create_button_manager } from "sveltekit-ui"
export function create_main_nav_manager(config) {
  return { buttons: [
    create_button_manager({ text: "Home", type: "soft", text_align: "left", support_icon: "house", href: "/", on_click: config.close }),
    create_button_manager({ text: "Features", type: "soft", text_align: "left", href: "/#features", on_click: config.close }),
    create_button_manager({ text: "Privacy", type: "soft", text_align: "left", href: "/privacy", on_click: config.close }),
  ] }
}
