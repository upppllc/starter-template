import { create_button_manager } from "sveltekit-ui"
export function create_home_page_manager(config) {
  return { get site() { return config.data().site },
    features: [
      { title: "One UI system", text: "Buttons, inputs, layout and theme controls share the same components and managers." },
      { title: "Your own identity", text: "Replace the public copy, icon and color tokens without copying a different project's brand." },
      { title: "Choose your backend", text: "This starter has no account service, provider connection or credentials configured." },
    ],
    start_button: create_button_manager({ text: "Explore the starter", support_icon: "arrow_tailed", href: "#features" }),
    docs_button: create_button_manager({ text: "SvelteKit UI", type: "outlined", support_icon: "arrow_tailed", icon_deg: -45, href: "https://github.com/upppllc/sveltekit-ui" }),
  }
}
