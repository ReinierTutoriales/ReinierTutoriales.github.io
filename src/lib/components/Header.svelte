<script lang="ts">
  import { page } from '$app/state';
  import { siteSections } from '#lib/navigation.js';
  import ThemeControl from './ThemeControl.svelte';

  let menu: HTMLDetailsElement;
  const current = (path: string) => page.url.pathname === path ? 'page'
    : path !== '/' && page.url.pathname.startsWith(path) ? 'location' : undefined;

  const closeMenu = () => { if (menu) menu.open = false; };
  $effect(() => { void page.url.pathname; closeMenu(); });

  function closeWithEscape(event: KeyboardEvent) {
    if (event.key !== 'Escape' || !menu?.open) return;
    event.preventDefault();
    closeMenu();
    menu.querySelector('summary')?.focus();
  }
</script>

<svelte:document onpointerdown={(event) => {
  if (menu?.open && event.target instanceof Node && !menu.contains(event.target)) closeMenu();
}} onkeydown={closeWithEscape} onfocusin={(event) => {
  if (menu?.open && event.target instanceof Node && !menu.contains(event.target)) closeMenu();
}} />

{#snippet sectionLinks()}
  {#each siteSections as section (section.path)}
    <a href={section.path} aria-current={current(section.path)} onclick={closeMenu}><span>{section.path === '/guias/' ? 'Guías' : section.title}<small aria-hidden="true">{section.label}</small></span><i class="arrow-icon" aria-hidden="true"></i></a>
  {/each}
{/snippet}

<header class="site-header">
  <div class="container header-inner">
    <a class="brand" href="/" aria-label="ReinierTutoriales, inicio">
      <img src="/imagenes/logo-192.webp" alt="" width="28" height="28">
      <span>Reinier<span class="brand-light">Tutoriales</span></span>
    </a>
    <nav class="desktop-nav" aria-label="Navegación principal" data-sveltekit-preload-data="hover">
      {@render sectionLinks()}
    </nav>
    <div class="header-actions">
      <ThemeControl />
      <details class="mobile-menu" bind:this={menu}>
        <summary aria-label="Menú de navegación">
          <svg class="menu-icon" viewBox="0 0 20 20" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 7h12"/><path d="M4 13h12"/></svg>
        </summary>
        <nav class="mobile-panel" aria-label="Navegación móvil" data-sveltekit-preload-data="hover">
          <a href="/" aria-current={current('/')} onclick={closeMenu}><span>Inicio</span><i class="arrow-icon" aria-hidden="true"></i></a>
          {@render sectionLinks()}
          <a class="menu-github" href="https://github.com/ReinierTutoriales" onclick={closeMenu}><span>GitHub</span><i class="arrow-icon" data-dir="external" aria-hidden="true"></i></a>
        </nav>
      </details>
    </div>
  </div>
</header>
