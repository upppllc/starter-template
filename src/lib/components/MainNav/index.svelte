<script>
  import { Button, create_button_manager } from "@upppllc/sveltekit-ui"
  import { goto } from "$app/navigation"
  import { global_manager } from "$lib/client/index.svelte.js"

  const nav_options = [
    {
      id: "home",
      name: "Home",
      route: "/",
      support_icon: "house",
    },
  ]

  let nav_button_managers = $state(
    nav_options.map((h) =>
      create_button_manager({
        type: "soft",
        text_align: "left",
        icon_pos: "left",
        support_icon: h?.support_icon,
        text: h?.name,
        on_click: () => {
          global_manager.layout_manager?.set_is_full_nav_toggled_on(false)
          goto(h?.route)
        },
      })
    )
  )
</script>

{#each nav_button_managers as nav_button_manager}
  <Button manager={nav_button_manager} />
{/each}
