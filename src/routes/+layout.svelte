<script>
  import "sveltekit-ui/style.css"
  import { Layout, Checkbox, Button } from "sveltekit-ui"
  import Logo from "#lib/components/Logo/index.svelte"
  import MainNav from "#lib/components/MainNav/index.svelte"
  import { create_global_manager, set_global_manager } from "#lib/client/index.svelte.js"
  let { children, data } = $props()
  const manager = set_global_manager(create_global_manager())
</script>
<Layout manager={manager.layout_manager}>
  {#snippet nav_bar_logo()}<Logo name={data.site.name} />{/snippet}
  {#snippet nav_bar_extra()}<Checkbox manager={manager.layout_manager.dark_theme_manager} />{/snippet}
  {#snippet full_nav()}<MainNav manager={manager.nav_manager} />{/snippet}
  {#snippet content()}
    {@render children()}
    <footer class="page-width"><Logo name={data.site.name} /><Button manager={manager.privacy_button} /></footer>
  {/snippet}
</Layout>
<style>
  :global(:root) { --primary-c: var(--c8); --primary-h: var(--h12); }
  :global(body) { background: var(--bg); font-family: system-ui, sans-serif; }
  :global(.page-width) { width: min(100% - 3.2rem,112rem); margin-inline: auto; }
  :global(.page-section) { padding-block: clamp(3.2rem,6vw,7.2rem); }
  :global(h1), :global(h2), :global(p) { overflow-wrap: anywhere; }
  footer { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 2rem; padding-block: 3.2rem; border-top: 1px solid var(--shadow2-t); }
</style>
