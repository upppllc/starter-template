<script>
  let color1 = "oklch(var(--l3-t) var(--c5) var(--primary-h))"
</script>

<div class="container" style="--color1: {color1};">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xml:space="preserve"
    style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2"
    viewBox="0 0 512 512"
    width="3rem"
  >
    <path
      d="M400.3 328.6c0 22-5.6 41.7-17 59.2a112.8 112.8 0 0 1-49.6 41.2 186.2 186.2 0 0 1-77.6 14.8c-35.8 0-65.4-6.7-88.7-20.3-16.5-9.7-30-22.7-40.3-39a88.6 88.6 0 0 1-15.4-47.5c0-8.9 3-16.5 9.3-22.9 6.1-6.4 14-9.5 23.6-9.5a28 28 0 0 1 19.7 7.4c5.4 5 10 12.3 13.8 22 4.6 11.6 9.6 21.3 15 29 5.3 7.8 12.9 14.2 22.6 19.3 9.8 5 22.6 7.5 38.4 7.5 21.8 0 39.6-5 53.2-15.2a45.8 45.8 0 0 0 20.4-38c0-12.1-3.6-22-11-29.4a71.1 71.1 0 0 0-28.5-17.3 490 490 0 0 0-46.7-12.6c-26.1-6.1-48-13.2-65.5-21.4a106 106 0 0 1-42-33.5 86.8 86.8 0 0 1-15.4-52.6c0-20 5.4-37.8 16.4-53.3a103.1 103.1 0 0 1 47.3-35.8c20.6-8.4 45-12.5 72.8-12.5 22.3 0 41.6 2.7 57.9 8.3a122.3 122.3 0 0 1 40.5 22 92.1 92.1 0 0 1 23.5 28.9c5 10 7.5 19.9 7.5 29.5 0 8.7-3.1 16.6-9.3 23.6-6.2 7-14 10.6-23.2 10.6-8.4 0-14.8-2.1-19.2-6.3a85.1 85.1 0 0 1-14.2-20.7 93.8 93.8 0 0 0-23.8-32.1c-9.3-7.7-24.1-11.5-44.6-11.5-19 0-34.3 4.1-46 12.5-11.6 8.3-17.5 18.3-17.5 30 0 7.3 2 13.6 6 19a50 50 0 0 0 16.3 13.5c7 3.8 14 6.8 21.1 9 7.1 2.1 18.8 5.2 35.2 9.4 20.5 4.8 39 10 55.6 15.8a169 169 0 0 1 42.4 21.1 86.6 86.6 0 0 1 27.3 31.3c6.5 12.7 9.7 28.2 9.7 46.5Z"
      style="fill-rule:nonzero; fill: var(--primary-t);"
    ></path>
  </svg>
  <h1 class="logo_text">__APP_NAME__</h1>
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
    color: var(--g4-t);
  }
</style>
