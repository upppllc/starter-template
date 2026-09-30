<script>
  import { Button } from "sveltekit-ui"
  let { manager } = $props()
</script>
<div class="page-width page-section"><h1>{manager.status === 404 ? "Page not found" : "Something went wrong"}</h1><p>Please return home or try again.</p><div class="actions"><Button manager={manager.home_button} /><Button manager={manager.retry_button} /></div></div>
<style>h1 { font-size: 3.2rem; } p { font-size: 1.6rem; line-height: 1.6; } .actions { display: flex; flex-wrap: wrap; gap: 1rem; margin-block: 2rem; }</style>
