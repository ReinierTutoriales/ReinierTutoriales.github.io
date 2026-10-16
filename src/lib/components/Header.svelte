<script lang="ts">
  import { page } from '$app/state';
  import { siteSections } from '#lib/navigation.js';
  import ThemeControl from './ThemeControl.svelte';
</script>
<header class="site-header">
    <div class="container header-inner">
      <a class="brand" href="/#inicio" aria-label="ReinierTutoriales, inicio"><img src="/imagenes/logo-192.webp" alt="" width="38" height="38"><span>Reinier<span class="brand-light">Tutoriales</span></span></a>
      <nav aria-label="Navegación principal">{#each siteSections as section (section.path)}<a href={section.path} aria-current={page.url.pathname === section.path ? 'page' : page.url.pathname.startsWith(section.path) ? 'location' : undefined}>{section.path === '/guias/' ? 'Guías' : section.title}</a>{/each}</nav>
      <div class="header-actions"><ThemeControl /><a class="github-link" href="https://github.com/ReinierTutoriales">GitHub <span aria-hidden="true">↗</span></a></div>
    </div>
  </header>
