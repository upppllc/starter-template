<script>
  import { TextInput, Button, InfoBox } from "sveltekit-ui"

  let { manager } = $props()
</script>

{#if !manager?.is_hide_subscribe_to_newsletter}
  <div class="container">
    <h3 style="color: var(--primary-t);">Join the Newsletter</h3>
    <p>Stay up to date on the latest news and updates</p>
    <InfoBox message={manager?.subscribe_error_message} mx={0.5} my={0.3} mt={1} />
    <TextInput manager={manager?.first_name_text_input_manager} />
    <TextInput manager={manager?.email_address_text_input_manager} />
    <div style="display: grid; place-content: end;">
      <Button manager={manager?.subscribe_button_manager} />
    </div>
  </div>
{/if}

<style>
  .container {
    display: grid;
    border-radius: 2rem;
    margin: 2rem 0;
    padding: 2rem;
    gap: 1rem;
    box-shadow:
      0 0.2rem 1rem var(--shadow2),
      inset 0 0 0 1px var(--shadow8-t);
    -webkit-box-shadow:
      0 0.2rem 1rem var(--shadow2),
      inset 0 0 0 1px var(--shadow8-t);
  }
</style>
