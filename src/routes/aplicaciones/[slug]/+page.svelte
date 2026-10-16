<script lang="ts">
  import Seo from '#lib/components/Seo.svelte';
  import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
  import { repositoryUrl, type Project } from '#lib/catalog.js';
  import type { projectDetails } from '#lib/project-details.js';
  type Detail = (typeof projectDetails)[keyof typeof projectDetails];
  let { data }: { data: {project:Project;detail:Detail;related:{name:string;path:string}[]} } = $props();
  const path = $derived(`/aplicaciones/${data.detail.slug}/`);
</script>
<Seo {path} />
<section class="container library-hero project-hero"><Breadcrumbs {path} /><p class="eyebrow">{data.project.platform} / {data.project.kind}</p><h1>{data.detail.title}</h1><p class="library-lead">{data.project.summary}</p><p class="stack">{data.project.stack}</p><a class="button primary" href={repositoryUrl(data.project.repo)}>Código e instrucciones en GitHub ↗</a></section>
<div class="container project-article">
  <section aria-labelledby="project-purpose"><h2 id="project-purpose">Para qué sirve {data.project.name}</h2><p>{data.detail.use}</p></section>
  <section aria-labelledby="project-features"><h2 id="project-features">Funciones principales</h2><ul>{#each data.detail.features as feature}<li>{feature}</li>{/each}</ul></section>
  <section aria-labelledby="project-scope"><h2 id="project-scope">Compatibilidad y alcance</h2><p>{data.detail.scope}</p><p>Consulta el README del proyecto para comprobar los requisitos de la versión que vayas a utilizar y sus instrucciones de instalación o compilación.</p></section>
  <section aria-labelledby="project-next"><h2 id="project-next">Continuar explorando</h2><ul class="related-links"><li><a href="/aplicaciones/">Todas las aplicaciones →</a></li><li><a href={data.project.category === 'windows' ? '/sistemas/windows/' : '/sistemas/android-tv/'}>Recursos de {data.project.platform} →</a></li>{#each data.related as related}<li><a href={related.path}>Conocer {related.name} →</a></li>{/each}</ul></section>
</div>
