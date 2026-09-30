import { create_button_manager } from "sveltekit-ui"
export function create_home_page_manager(config) {
  return { get studio() { return config.data().studio },
    book_button: create_button_manager({ text: "View schedule", is_compressed: true, support_icon: "arrow_tailed", icon_deg: -45, href: () => config.data().studio_config.schedule_href, is_disabled: () => !config.data().studio_config.configured }),
    account_button: create_button_manager({ text: "Get started", type: "outlined", is_compressed: true, support_icon: "arrow_tailed", href: "/sign-in?mode=signup", is_disabled: () => !config.data().studio_config.configured }),
  }
}
