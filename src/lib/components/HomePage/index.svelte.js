import { create_content_manager, create_button_manager } from "sveltekit-ui"
import { create_example_manager } from "$lib/components/Example/index.svelte.js"

export function create_home_page_manager(config) {
  let content_manager = $state(null)
  let example_manager = $state(null)
  let example_reset_button_manager = $state(null)

  function init(input) {
    content_manager = create_content_manager({
      val: {
        type_id: "div",
        children: [
          {
            type_id: "div",
            children: [
              {
                type_id: "h1",
                children: [
                  {
                    type_id: "base_text",
                    children: [],
                    attributes: { content: "Time to Build! 🏗️", text_color: null },
                    selector_id: "zkwoqbjr",
                  },
                ],
                attributes: null,
                selector_id: "mswlvhaz",
              },
              {
                type_id: "h3",
                children: [
                  {
                    type_id: "base_text",
                    children: [],
                    attributes: { content: "Create Logo, Favicons, etc.", text_color: null },
                    selector_id: "zkwoqnhr",
                  },
                ],
                attributes: null,
                selector_id: "mswlvhaz",
              },
              {
                type_id: "p",
                children: [
                  {
                    type_id: "base_text",
                    children: [],
                    attributes: {
                      content: "Use ",
                      text_color: null,
                    },
                    selector_id: "skgffvek",
                  },
                  {
                    type_id: "link",
                    children: [
                      {
                        type_id: "base_text",
                        children: [],
                        attributes: { content: "Contibase - Tools", text_color: null },
                        selector_id: "eeimeuyf",
                      },
                    ],
                    attributes: {
                      href: "https://www.contibase.com/tools",
                    },
                    selector_id: "lqaaxjsi",
                  },
                  {
                    type_id: "base_text",
                    children: [],
                    attributes: {
                      content:
                        " to generate a logo and the relavant assets to add to your project. Also check out the guide at ",
                      text_color: null,
                    },
                    selector_id: "skgzavek",
                  },
                  {
                    type_id: "link",
                    children: [
                      {
                        type_id: "base_text",
                        children: [],
                        attributes: { content: "Contibase - Customize Website", text_color: null },
                        selector_id: "qeiwwwf",
                      },
                    ],
                    attributes: {
                      href: "https://www.contibase.com/blog/customize-website",
                    },
                    selector_id: "lqkixjsi",
                  },
                  {
                    type_id: "base_text",
                    children: [],
                    attributes: { content: ".", text_color: null },
                    selector_id: "skgzavek",
                  },
                ],
                attributes: null,
                selector_id: "hduicqof",
              },
              {
                type_id: "h3",
                children: [
                  {
                    type_id: "base_text",
                    children: [],
                    attributes: { content: "Project Structure & Stack", text_color: null },
                    selector_id: "gmlwthgq",
                  },
                ],
                attributes: null,
                selector_id: "tnotrdvm",
              },
              {
                type_id: "p",
                children: [
                  {
                    type_id: "base_text",
                    children: [],
                    attributes: { content: "Your site uses ", text_color: null },
                    selector_id: "dwcjyxmj",
                  },
                  {
                    type_id: "link",
                    children: [
                      {
                        type_id: "base_text",
                        children: [],
                        attributes: { content: "SvelteKit", text_color: null },
                        selector_id: "qeimeuyf",
                      },
                    ],
                    attributes: {
                      href: "https://svelte.dev/docs/kit/introduction",
                      display_text: null,
                      text_color: null,
                      is_show_preview: null,
                    },
                    selector_id: "wggnmjzf",
                  },
                  {
                    type_id: "base_text",
                    children: [],
                    attributes: { content: " along with the ", text_color: null },
                    selector_id: "ttfdtidi",
                  },
                  {
                    type_id: "link",
                    children: [
                      {
                        type_id: "base_text",
                        children: [],
                        attributes: { content: "Sveltekit-UI", text_color: null },
                        selector_id: "qnxwjmqt",
                      },
                    ],
                    attributes: {
                      href: "https://www.sveltekit-ui.com",
                      display_text: null,
                      text_color: null,
                      is_show_preview: null,
                    },
                    selector_id: "vrgwkfrt",
                  },
                  {
                    type_id: "base_text",
                    children: [],
                    attributes: { content: " component library.", text_color: null },
                    selector_id: "apsebxaj",
                  },
                ],
                attributes: null,
                selector_id: "xdvhazmg",
              },
              {
                type_id: "h3",
                children: [
                  {
                    type_id: "base_text",
                    children: [],
                    attributes: { content: "Now, Go build your own components!", text_color: null },
                    selector_id: "vwjecivg",
                  },
                ],
                attributes: null,
                selector_id: "xxwimexq",
              },
            ],
            attributes: {
              background_color: null,
              border_color: null,
              border_radius: null,
              padding: 1,
              align_content: "center",
              justify_content: "center",
            },
            selector_id: "jhvqdpou",
          },
        ],
        attributes: {
          background_color: null,
          border_color: null,
          border_radius: null,
          padding: null,
          align_content: "center",
          justify_content: "center",
        },
        selector_id: "ghyfohew",
      },
    })

    example_manager = create_example_manager({
      count: 2,
      on_passed_limit: () => {
        console.log("passed lim!")
      },
    })

    example_reset_button_manager = create_button_manager({
      type: "outlined",
      is_uniform: true,
      support_icon: "refresh",
      on_click: () => example_manager.reset_count(),
    })
  }

  init()

  return {
    get content_manager() {
      return content_manager
    },
    get example_manager() {
      return example_manager
    },
    get example_reset_button_manager() {
      return example_reset_button_manager
    },
  }
}
