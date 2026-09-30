<script>
  import SignInPage from "$lib/components/SignInPage/index.svelte"
  import { create_sign_in_page_manager } from "$lib/components/SignInPage/index.svelte.js"
  let { data } = $props()
  const manager = create_sign_in_page_manager({ data: () => data })
</script>
<svelte:head><title>Sign in · {data.studio.name}</title><meta name="robots" content="noindex, nofollow" /></svelte:head>
<SignInPage {manager} />
