<script>
  import { Button } from "sveltekit-ui"
  let { manager } = $props()
</script>
<section class="hero page-width page-section">
  <p class="eyebrow">{manager.studio.name}</p>
  <h1>{manager.studio.headline}</h1>
  <p class="introduction">{manager.studio.introduction}</p>
  <div class="actions"><Button manager={manager.book_button} /><Button manager={manager.account_button} /></div>
</section>
<style>
  .hero { min-height: 50rem; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; }
  .eyebrow { font-size: 1.4rem; font-weight: 600; color: var(--g8-t); }
  h1 { font-size: clamp(3.6rem,6vw,6.8rem); line-height: 1.1; max-width: 80rem; margin: 1.2rem 0 2.4rem; }
  .introduction { max-width: 58rem; font-size: 1.8rem; line-height: 1.6; margin: 0 0 3.2rem; color: var(--g8-t); }
  .actions { display: flex; flex-wrap: wrap; gap: 1.2rem; }
</style>
