<script>
  import MemberAccountHeader from "classhelm/MemberAccountHeader"
  import MemberProfileSummary from "classhelm/MemberProfileSummary"
  import MemberExperience from "classhelm/MemberExperience"
  import MemberClassFeedback from "classhelm/MemberClassFeedback"
  let { manager } = $props()
</script>
<div class="account page-width page-section">
  {#if manager.configured}
    <MemberAccountHeader manager={manager.header} />
    {#if manager.message}<p role="alert">{manager.message}</p>{/if}
    <MemberExperience manager={manager.experience} />
    <MemberProfileSummary manager={manager.profile} />
    <MemberClassFeedback manager={manager.feedback} />
  {:else}<h1>Studio account unavailable</h1><p>Please check back later.</p>{/if}
</div>
<style>.account { display: grid; gap: 2.4rem; max-width: 100rem; min-height: 50rem; } p { font-size: 1.6rem; line-height: 1.6; }</style>
