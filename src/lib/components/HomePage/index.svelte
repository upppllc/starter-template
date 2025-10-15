<script>
  import { Content, Button } from "sveltekit-ui"
  import Example from "$lib/components/Example/index.svelte"

  let { manager } = $props()
</script>

<div style="display: grid; justify-content: center;">
  <div style="margin: 1rem; max-width: 80rem;">
    <Content manager={manager?.content_manager} />
    <Example manager={manager?.example_manager}>
      {#snippet extra_stuff()}
        <Button manager={manager?.example_reset_button_manager} />
      {/snippet}
    </Example>
  </div>
</div>
