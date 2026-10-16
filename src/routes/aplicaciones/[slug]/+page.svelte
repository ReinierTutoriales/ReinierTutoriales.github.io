<script lang="ts">
  import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
  import { repositoryUrl } from '#lib/project-links.js';
  import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();
</script>
<section class="container library-hero project-hero"><Breadcrumbs /><p class="eyebrow">{data.project.platform} / {data.project.kind}</p><h1>{data.detail.title}</h1><p class="library-lead">{data.project.summary}</p><p class="stack">{data.project.stack}</p><p class="review-note">{data.editorial.status} · Revisado el <time datetime={data.editorial.reviewedAt}>{data.editorial.reviewedAt.split('-').reverse().join('/')}</time></p><a class="button primary" href="#empezar">Cómo empezar ↓</a></section>
<div class="container project-article">
  <section aria-labelledby="project-purpose"><h2 id="project-purpose">Para qué sirve {data.project.name}</h2><p>{data.detail.use}</p></section>
  <section aria-labelledby="project-features"><h2 id="project-features">Funciones principales</h2><ul>{#each data.detail.features as feature}<li>{feature}</li>{/each}</ul></section>
  <section aria-labelledby="project-requirements"><h2 id="project-requirements">Requisitos</h2><ul>{#each data.editorial.requirements as requirement}<li>{requirement}</li>{/each}</ul></section>
  <section id="empezar" aria-labelledby="project-start"><h2 id="project-start">Cómo empezar</h2><ol>{#each data.editorial.start as step}<li>{step}</li>{/each}</ol>{#if data.project.repo === 'W11DownloaderPro'}<a class="text-link" href="/guias/descargas-reanudables-w11downloaderpro/">Guía de descargas y reanudación →</a>{/if}</section>
  <section aria-labelledby="project-scope"><h2 id="project-scope">Compatibilidad y alcance</h2><p>{data.detail.scope}</p><p>Consulta el README del proyecto para comprobar los requisitos de la versión que vayas a utilizar y sus instrucciones de instalación o compilación.</p></section>
  <section aria-labelledby="project-downloads"><h2 id="project-downloads">Descargas y documentación</h2>
    {#if data.editorial.release}<p>Publicación con paquete comprobada durante la revisión: {data.editorial.release.tag}{data.editorial.release.prerelease ? ' (versión preliminar)' : ''}. Consulta sus notas y archivos para elegir el paquete compatible. El repositorio puede tener publicaciones posteriores.</p><ul class="related-links"><li><a href={data.editorial.release.url}>Ver archivos de {data.editorial.release.tag} en GitHub ↗</a></li></ul>{:else}<p>No se ha verificado un paquete publicado en Releases durante esta revisión. Consulta el README para obtener las instrucciones de distribución o desarrollo.</p>{/if}
    <ul class="related-links"><li><a href={repositoryUrl(data.project.repo)}>Código y actividad del proyecto ↗</a></li>{#each data.editorial.sources as source}<li><a href={source.url}>{source.label} ↗</a></li>{/each}</ul>
  </section>
  <section aria-labelledby="project-next"><h2 id="project-next">Continuar explorando</h2><ul class="related-links"><li><a href="/aplicaciones/">Todas las aplicaciones →</a></li><li><a href={data.project.category === 'windows' ? '/sistemas/windows/' : '/sistemas/android-tv/'}>Recursos de {data.project.platform} →</a></li>{#each data.related as related}<li><a href={related.path}>Conocer {related.name} →</a></li>{/each}</ul></section>
</div>
