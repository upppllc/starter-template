import { create_button_manager } from "sveltekit-ui"
import { global_manager } from "$lib/client/index.svelte.js"

export function create_example_manager(config) {
  let count = $state(0)
  let inc_count_button_manager = $state(null)

  function reset_count(input) {
    count = 0
  }

  function init(input) {
    count = input?.count ?? 0
    inc_count_button_manager = create_button_manager({
      text: "Inc Count",
      is_compressed: true,
      support_icon: "plus",
      is_disabled: () => count > 9,
      on_click: () => {
        if (count < 10) {
          count++
          if (count > 9) {
            global_manager.layout_manager.confetti_manager.show_confetti()
            if (typeof config?.on_passed_limit == "function") {
              config?.on_passed_limit(input)
            }
          }
        }
      },
    })
  }

  init(config)

  return {
    get count() {
      return count
    },
    get inc_count_button_manager() {
      return inc_count_button_manager
    },
    reset_count,
  }
}
