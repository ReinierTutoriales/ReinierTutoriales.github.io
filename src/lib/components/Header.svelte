<script lang="ts">
  import ThemeControl from './ThemeControl.svelte';
</script>
<header class="site-header">
    <div class="container header-inner">
      <a class="brand" href="/#inicio" aria-label="ReinierTutoriales, inicio"><img src="/imagenes/logo-192.webp" alt="" width="38" height="38"><span>Reinier<span class="brand-light">Tutoriales</span></span></a>
      <nav aria-label="Navegación principal"><a href="/sistemas/">Sistemas</a><a href="/aplicaciones/">Aplicaciones</a><a href="/herramientas/">Herramientas</a><a href="/guias/">Guías</a></nav>
      <div class="header-actions"><ThemeControl /><a class="github-link" href="https://github.com/ReinierTutoriales">GitHub <span aria-hidden="true">↗</span></a></div>
    </div>
  </header>
