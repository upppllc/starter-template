<script>
  import "@upppllc/sveltekit-ui/style.css"
  import { Layout, Checkbox, Button } from "@upppllc/sveltekit-ui"
  import { global_manager } from "$lib/client/index.svelte.js"
  import { goto } from "$app/navigation"
  import Logo from "$lib/components/Logo/index.svelte"
  import MainNav from "$lib/components/MainNav/index.svelte"

  let { data, children } = $props()

</script>

<Layout manager={global_manager?.layout_manager}>
  {#snippet nav_bar_logo()}
    <Logo />
  {/snippet}
  {#snippet app_nav_bar_logo()}
    <Logo />
  {/snippet}
  {#snippet extra_links()}
    <div style="display: flex; align-iems: center;">
      <!-- <TextInput placeholder="Search" /> -->
      <div style="display: flex; gap: 1rem;">
        <!-- <Button manager={global_manager?.chat_assistant_manager?.popover_button_manager} /> -->
        <!-- <AuthTrigger manager={global_manager?.auth_manager} /> -->
      </div>
      <!-- {#if !global_manager?.auth_manager?.account?.id} -->
        <Checkbox manager={global_manager?.layout_manager?.dark_theme_manager} />
      <!-- {/if} -->
    </div>
  {/snippet}
  {#snippet sub_bar()}
    <!-- tbd -->
  {/snippet}
  {#snippet full_nav()}
    <div style="margin: 1rem;">
      <MainNav />
    </div>
  {/snippet}
  {#snippet content()}
    {#if children}
      {@render children()}
    {/if}
  {/snippet}
  {#snippet additional()}
    <!-- <AuthPopover manager={global_manager?.auth_manager} /> -->
    <!-- <ChatAssistant manager={global_manager?.chat_assistant_manager} /> -->
  {/snippet}
</Layout>

<style>
  @font-face {
    font-family: "Proxima Vara";
    src: local(""), url("/fonts/ProximaVara.woff2") format("woff2 supports variations"),
      url("/fonts/ProximaVara.woff2") format("woff2-variations"),
      url("/fonts/ProximaVara.woff") format("woff-variations");
    font-weight: 100 900;
    font-stretch: 50% 100%;
    font-display: swap;
  }
  @font-face {
    font-family: "Roboto Serif";
    src: url("/fonts/RobotoSerif-VariableFont.woff2") format("woff2 supports variations"),
      url("/fonts/RobotoSerif-VariableFont.woff2") format("woff2-variations");
    font-weight: 100 1000;
    font-display: swap;
  }
  @font-face {
    font-family: "Quicksand";
    src: url("/fonts/Quicksand-VariableFont.woff2") format("woff2 supports variations"),
      url("/fonts/Quicksand-VariableFont.woff2") format("woff2-variations");
    font-weight: 100 1000;
    font-display: swap;
  }
  :global(body) {
    background-color: var(--bg);
  }
  :root {
    --primary-c: var(--c5);
    --primary-h: var(--h18);
  }
</style>