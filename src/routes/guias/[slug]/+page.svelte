<script lang="ts">
  import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
  import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();
</script>
<section class="container library-hero project-hero">
  <Breadcrumbs /><p class="eyebrow">GUÍA / {data.guide.system === 'macos' ? 'macOS' : 'Windows'}</p>
  <h1>{data.guide.title}</h1><p class="library-lead">{data.content.intro}</p>
  <p class="review-note">Por Reinier Lazo · Publicado el <time datetime={data.guide.publishedAt}>{data.guide.publishedAt.split('-').reverse().join('/')}</time> · Contenido revisado el <time datetime={data.content.reviewedAt}>{data.content.reviewedAt.split('-').reverse().join('/')}</time>. Fuentes al final de la guía.</p>
</section>
<div class="container project-article">
  <nav class="article-index" aria-label="En esta guía"><strong>En esta guía</strong><ul><li><a href="#requisitos">Antes de empezar</a></li>{#each data.content.sections as section}<li><a href={`#${section.id}`}>{section.title}</a></li>{/each}<li><a href="#problemas">Resolver problemas</a></li><li><a href="#fuentes">Fuentes y documentación</a></li></ul></nav>
  <section id="requisitos" aria-labelledby="requirements-title"><h2 id="requirements-title">Antes de empezar</h2><ul>{#each data.content.requirements as requirement}<li>{requirement}</li>{/each}</ul></section>
  {#each data.content.sections as section (section.id)}
    <section id={section.id} aria-labelledby={`${section.id}-title`}><h2 id={`${section.id}-title`}>{section.title}</h2>{#each section.paragraphs as paragraph}<p>{paragraph}</p>{/each}{#if section.code}<pre><code>{section.code}</code></pre>{/if}</section>
  {/each}
  <section id="problemas" aria-labelledby="problems-title"><h2 id="problems-title">Resolver problemas</h2><dl class="problem-list">{#each data.content.problems as problem}<dt>{problem[0]}</dt><dd>{problem[1]}</dd>{/each}</dl></section>
  <section id="fuentes" aria-labelledby="sources-title"><h2 id="sources-title">Fuentes y documentación</h2><p>La revisión corresponde al contenido enlazado. Consulta también las publicaciones del proyecto para los cambios posteriores.</p><ul class="related-links">{#each data.content.sources as source}<li><a href={source.url}>{source.label} ↗</a></li>{/each}</ul></section>
  <section aria-labelledby="continue-title"><h2 id="continue-title">Continuar explorando</h2><ul class="related-links">{#each data.content.related as related}<li><a href={related.path}>{related.label} →</a></li>{/each}<li><a href="/guias/">Todas las guías →</a></li></ul></section>
</div>
