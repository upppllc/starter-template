<script>
  import { create_home_page_manager } from "$lib/components/HomePage/index.svelte.js"
  import HomePage from "$lib/components/HomePage/index.svelte"

  let home_page_manager = create_home_page_manager()
</script>

<svelte:head>
  <title>__APP_NAME__</title>
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
  <!-- <meta name="description" content="tbd" />
  <meta property="og:title" content="__APP_NAME__" />
  <meta property="og:description" content="tbd" />
  <meta property="og:image" content="https://www.example.com/thumbnail.webp" /> 
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content="https://www.example.com/thumbnail.webp" /> -->
</svelte:head>

<HomePage manager={home_page_manager} />
