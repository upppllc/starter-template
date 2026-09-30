<script>
  import { Button } from "sveltekit-ui"
  let { manager } = $props()
</script>
<nav aria-label="Main navigation">{#each manager.buttons as button}<Button manager={button} />{/each}</nav>
<style>nav { display: grid; gap: 1rem; padding: 1.6rem; }</style>
