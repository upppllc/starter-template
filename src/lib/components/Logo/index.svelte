<script>
  let color1 = "oklch(var(--l2-t) var(--c3) var(--primary-h))"
</script>

<div class="container" style="--color1: {color1};">
  <h1 class="logo_text">
    <span class="letter u">U</span>
    <span class="letter p1">P</span>
    <span class="letter p2">P</span>
    <span class="letter p3">P</span>
  </h1>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    padding-top: 0.2rem;
    /* transform: scale(200%); */
  }

  .logo_text {
    font-family: Arial;
    color: var(--color1);
    font-weight: 700;
    display: flex;
    align-items: flex-start;
  }

  .letter {
    display: inline-block;
    font-weight: inherit;
    color: inherit;
  }
  @keyframes slide-in-p1 {
    from {
      transform: translateY(0.3rem);
    }
    to {
      transform: translateY(0);
    }
  }
  @keyframes slide-in-p2 {
    from {
      transform: translateY(0.7rem);
    }
    to {
      transform: translateY(0);
    }
  }
  @keyframes slide-in-p3 {
    from {
      transform: translateY(0.9rem);
    }
    to {
      transform: translateY(0);
    }
  }
  .letter.u {
    font-size: 3rem;
    line-height: 2.2rem;
  }
  .letter.p1 {
    font-size: 2.6rem;
    line-height: 1.9rem;
    /* transform: translateY(0.3rem); */
    animation: slide-in-p1 1s forwards ease-out;
  }
  .letter.p2 {
    font-size: 2.1rem;
    line-height: 1.6rem;
    /* transform: translateY(0.7rem); */
    animation: slide-in-p2 1s forwards ease-out;
  }
  .letter.p3 {
    font-size: 1.7rem;
    line-height: 1.4rem;
    /* transform: translateY(0.9rem); */
    animation: slide-in-p3 1s forwards ease-out;
  }
</style>
