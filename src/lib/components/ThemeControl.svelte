<script lang="ts">
  import { onMount } from 'svelte';
  let preference = $state('light');
  let ready = $state(false);

  const options = [
    { value: 'light', label: 'Claro', path: 'M10.8 8a2.8 2.8 0 1 0-5.6 0 2.8 2.8 0 0 0 5.6 0ZM8 1.2v1.6M8 13.2v1.6M1.2 8h1.6M13.2 8h1.6M3.2 3.2l1.1 1.1M11.7 11.7l1.1 1.1M3.2 12.8l1.1-1.1M11.7 4.3l1.1-1.1' },
    { value: 'dark', label: 'Oscuro', path: 'M13.6 9.9A5.9 5.9 0 0 1 6.1 2.4a5.9 5.9 0 1 0 7.5 7.5z' }
  ] as const;

  onMount(() => {
    const sync = () => { preference = document.documentElement.dataset.theme ?? 'light'; };
    sync();
    ready = true;
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  });

  function moveSelection(event: KeyboardEvent, index: number) {
    const step = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1
      : event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = (index + step + options.length) % options.length;
    setTheme(options[next].value);
    const button = event.currentTarget as HTMLButtonElement;
    const buttons = button.parentElement?.querySelectorAll<HTMLButtonElement>('[role="radio"]');
    buttons?.[next].focus();
  }

  function setTheme(value: string) {
    if (preference === value) return;
    preference = value;
    window.dispatchEvent(new CustomEvent('rt-theme-change', { detail: value }));
  }
</script>

<div class="theme-switch" role="radiogroup" aria-label="Tema de apariencia">
  {#each options as opt, index}
    <button
      type="button"
      role="radio"
      class="theme-option"
      aria-checked={preference === opt.value}
      aria-label={opt.label}
      title={`Tema ${opt.label.toLowerCase()}`}
      tabindex={preference === opt.value ? 0 : -1}
      onkeydown={(event) => moveSelection(event, index)}
      disabled={!ready}
      onclick={() => setTheme(opt.value)}
    >
      <svg class="theme-icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
        <path d={opt.path} />
      </svg>
      <span class="theme-text">{opt.label}</span>
    </button>
  {/each}
</div>
