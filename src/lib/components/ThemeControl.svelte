<script lang="ts">
  import { onMount } from 'svelte';
  let preference = $state('system');
  let ready = $state(false);
  onMount(() => {
    const sync = () => { preference = document.documentElement.dataset.themePreference ?? 'system'; };
    sync();
    ready = true;
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  });
  function changeTheme() {
    window.dispatchEvent(new CustomEvent('rt-theme-change', { detail: preference }));
  }
</script>

<div class="theme-control">
  <label class="theme-label" for="site-theme">Tema</label>
  <select id="site-theme" aria-label="Tema de apariencia" bind:value={preference} onchange={changeTheme} disabled={!ready}>
    <option value="system">Sistema</option>
    <option value="light">Claro</option>
    <option value="dark">Oscuro</option>
  </select>
</div>
