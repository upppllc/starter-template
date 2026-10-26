<script>
  import { Button } from "sveltekit-ui"
  let { manager } = $props()
</script>
<section class="hero page-width page-section">
  <p class="eyebrow">{manager.site.name}</p>
  <h1>{manager.site.headline}</h1>
  <p class="introduction">{manager.site.introduction}</p>
  <div class="actions"><Button manager={manager.start_button} /><Button manager={manager.docs_button} /></div>
</section>
<section id="features" class="features page-width page-section" aria-label="Starter features">
  {#each manager.features as feature}<article><h2>{feature.title}</h2><p>{feature.text}</p></article>{/each}
</section>
<style>
  .hero { min-height: 50rem; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; }
  .eyebrow { font-size: 1.4rem; font-weight: 600; color: var(--g8-t); }
  h1 { font-size: clamp(3.6rem,6vw,6.8rem); line-height: 1.1; max-width: 80rem; margin: 1.2rem 0 2.4rem; }
  .introduction { max-width: 58rem; font-size: 1.8rem; line-height: 1.6; margin: 0 0 3.2rem; color: var(--g8-t); }
  .actions { display: flex; flex-wrap: wrap; gap: 1.2rem; }
  .features { display: grid; grid-template-columns: repeat(auto-fit,minmax(min(100%,24rem),1fr)); gap: 2.4rem; }
  article { padding: 2.4rem; border: 1px solid var(--shadow2-t); border-radius: 1.6rem; }
  h2 { font-size: 2.2rem; margin: 0 0 1.2rem; } article p { font-size: 1.6rem; line-height: 1.6; margin: 0; color: var(--g8-t); }
</style>
