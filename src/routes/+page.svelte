<script>
  import { create_home_page_manager } from "#lib/components/HomePage/index.svelte.js"
  import HomePage from "#lib/components/HomePage/index.svelte"
  let { data } = $props()
  const home_page_manager = create_home_page_manager({ data: () => data })
</script>
<svelte:head>
  <title>{data.studio.name}</title>
  <meta name="description" content={data.studio.description} />
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>
<HomePage manager={home_page_manager} />
