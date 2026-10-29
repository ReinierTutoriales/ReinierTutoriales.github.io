<script lang="ts">
  let { direction = 'right' }: { direction?: 'right' | 'external' | 'down' | 'up' } = $props();
  const paths = { right: 'm6 3 5 5-5 5', external: 'M4 12 12 4M4 4h8v8', down: 'm4 6 4 4 4-4', up: 'm4 10 4-4 4 4' };
</script>
<svg class="arrow-icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d={paths[direction]} /></svg>
