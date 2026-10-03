<script>
  import AccountPage from "#lib/components/AccountPage/index.svelte"
  import { create_account_page_manager } from "#lib/components/AccountPage/index.svelte.js"
  let { data } = $props()
  const manager = create_account_page_manager({ data: () => data })
</script>
<svelte:head><title>My account · {data.studio.name}</title><meta name="robots" content="noindex, nofollow" /></svelte:head>
<AccountPage {manager} />
