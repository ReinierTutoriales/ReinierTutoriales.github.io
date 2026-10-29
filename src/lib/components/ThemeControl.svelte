<script lang="ts">
  import { onMount } from 'svelte';
  let preference = $state('system');
  let ready = $state(false);

  const options = [
    { value: 'system', label: 'Auto' },
    { value: 'light', label: 'Claro' },
    { value: 'dark', label: 'Oscuro' }
  ] as const;

  onMount(() => {
    const sync = () => { preference = document.documentElement.dataset.themePreference ?? 'system'; };
    sync();
    ready = true;
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  });

  function setTheme(value: string) {
    if (preference === value) return;
    preference = value;
    window.dispatchEvent(new CustomEvent('rt-theme-change', { detail: value }));
  }
</script>

<div class="theme-switch" role="radiogroup" aria-label="Tema de apariencia">
  {#each options as opt}
    <button
      type="button"
      role="radio"
      class="theme-option"
      aria-checked={preference === opt.value}
      aria-label={opt.label}
      disabled={!ready}
      onclick={() => setTheme(opt.value)}
    >
      <svg class="theme-icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
        {#if opt.value === 'system'}<circle cx="8" cy="8" r="6"/><path d="M8 2a6 6 0 0 1 0 12z" fill="currentColor" stroke="none"/>
        {:else if opt.value === 'light'}<circle cx="8" cy="8" r="2.8"/><path d="M8 1.2v1.6M8 13.2v1.6M1.2 8h1.6M13.2 8h1.6M3.2 3.2l1.1 1.1M11.7 11.7l1.1 1.1M3.2 12.8l1.1-1.1M11.7 4.3l1.1-1.1"/>
        {:else}<path d="M13.6 9.9A5.9 5.9 0 0 1 6.1 2.4a5.9 5.9 0 1 0 7.5 7.5z"/>{/if}
      </svg>
      <span class="theme-text">{opt.label}</span>
    </button>
  {/each}
</div>
