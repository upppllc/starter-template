<script>
  import { Button, Checkbox } from "sveltekit-ui"

  let { manager, extra_stuff } = $props()
</script>

<div style="border: 1px solid var(--g3-t); padding: 1rem; border-radius: 1rem;">
  <h4>Example Component</h4>
  <div style="border: 1px solid var(--shadow2-t); border-radius: 1rem; padding: 1rem;">
    <div
      role="progressbar"
      aria-valuemin="0"
      aria-valuemax="10"
      aria-valuenow={manager?.count}
      aria-label="progress"
      style="
        position: relative;
        width: 100%;
        height: 3rem;
        border-radius: 1rem;
        background: var(--shadow2-t);
        overflow: hidden;
      "
    >
      <div
        style="
          height: 100%;
          width: {manager?.count * 10}%;
          background: {manager?.count == 10
          ? 'oklch(var(--l6-t) var(--c12) var(--h9));'
          : 'oklch(var(--l6-t) var(--c12) var(--primary-h));'}
          transition: width 200ms ease;
          border-radius: inherit;
        "
      ></div>
    </div>
    <div style="margin-top: 0.5rem; font-size: 0.875rem;">
      count: {manager?.count} / 10
    </div>
  </div>
  <div style="display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 1rem;">
    <Button manager={manager?.inc_count_button_manager} />
    {#if extra_stuff}
      {@render extra_stuff()}
    {/if}
  </div>
</div>
