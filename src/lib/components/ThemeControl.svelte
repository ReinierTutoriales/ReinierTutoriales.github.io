<script lang="ts">
  import { onMount } from 'svelte';
  let preference = $state('system');
  let ready = $state(false);

  const options = [
    { value: 'system', label: 'Auto', icon: '◐' },
    { value: 'light', label: 'Claro', icon: '☀' },
    { value: 'dark', label: 'Oscuro', icon: '☽' }
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
      <span class="theme-icon" aria-hidden="true">{opt.icon}</span>
      <span class="theme-text">{opt.label}</span>
    </button>
  {/each}
</div>
