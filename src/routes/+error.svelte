<script>
  import { page } from "$app/state"
  import ErrorPage from "#lib/components/ErrorPage/index.svelte"
  import { create_error_page_manager } from "#lib/components/ErrorPage/index.svelte.js"
  const manager = create_error_page_manager({ data: () => page })
</script>
<svelte:head><title>__APP_NAME__ · Error</title><meta name="robots" content="noindex, nofollow" /></svelte:head>
<ErrorPage {manager} />
