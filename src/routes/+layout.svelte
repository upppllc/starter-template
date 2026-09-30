<script>
  import "sveltekit-ui/style.css"
  import { Layout, Checkbox, Button } from "sveltekit-ui"
  import Logo from "$lib/components/Logo/index.svelte"
  import MainNav from "$lib/components/MainNav/index.svelte"
  import { create_global_manager, set_global_manager } from "$lib/client/index.svelte.js"
  let { children, data } = $props()
  const manager = set_global_manager(create_global_manager({ data: () => data }))
</script>
<Layout manager={manager.layout_manager}>
  {#snippet nav_bar_logo()}<Logo name={data.studio.name} />{/snippet}
  {#snippet nav_bar_extra()}<div class="nav-actions"><Button manager={manager.account_button} /><Checkbox manager={manager.layout_manager.dark_theme_manager} /></div>{/snippet}
  {#snippet full_nav()}<MainNav manager={manager.nav_manager} />{/snippet}
  {#snippet content()}
    {@render children()}
    <footer class="page-width"><Logo name={data.studio.name} /><Button manager={manager.privacy_button} /></footer>
  {/snippet}
</Layout>
<style>
  :global(:root) { --primary-c: var(--c8); --primary-h: var(--h12); }
  :global(body) { background: var(--bg); font-family: system-ui, sans-serif; }
  :global(.page-width) { width: min(100% - 3.2rem,112rem); margin-inline: auto; }
  :global(.page-section) { padding-block: clamp(3.2rem,6vw,7.2rem); }
  :global(h1), :global(h2), :global(p) { overflow-wrap: anywhere; }
  .nav-actions { display: flex; align-items: center; gap: 1rem; }
  footer { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 2rem; padding-block: 3.2rem; border-top: 1px solid var(--shadow2-t); }
</style>
