<script>
  let color1 = "oklch(var(--l3-t) var(--c5) var(--primary-h))"
</script>

<div class="container" style="--color1: {color1};">
  <svg viewBox="0 0 100 100" width="3rem" height="3rem">
    <rect x="30" y="30" width="40" height="40" rx="10" fill="none" stroke="var(--color1)" stroke-width="4" />
    <circle cx="50" cy="50" r="40" fill="none" stroke="var(--color1)" stroke-width="4" />
  </svg>
  <h1 class="logo_text">Starter Template</h1>
</div>

<style>
  .container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    padding-top: 0.2rem;
  }
  .logo_text {
    margin-top: 0;
    font-family: "Quicksand", sans-serif;
    width: max-content;
    z-index: 1;
    font-size: clamp(1.8rem, 5vw, 2.2rem);
    font-weight: 700;
    line-height: 1.1;
  }
</style>
