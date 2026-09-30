<script>
  import MemberAccountAccess from "classhelm/MemberAccountAccess"
  let { manager } = $props()
</script>
<div class="sign-in page-width page-section">
  {#if manager.configured}<MemberAccountAccess manager={manager.access} />{:else}<h1>Studio account unavailable</h1><p>Please check back later.</p>{/if}
</div>
<style>.sign-in { max-width: 52rem; min-height: 50rem; } p { font-size: 1.6rem; line-height: 1.6; }</style>
