<script lang="ts">
  import Seo from '#lib/components/Seo.svelte';
  import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';

  import { systems, tools } from '#lib/sections.js';
  import { projects } from '#lib/catalog.js';
  import ProjectCard from '#lib/components/ProjectCard.svelte';
  import ResourceList from '#lib/components/ResourceList.svelte';
  import ToolList from '#lib/components/ToolList.svelte';
  let { data }: { data: { system: (typeof systems)[number] } } = $props();
  const selectedProjects = $derived(projects.filter(project => project.category === data.system.projectCategory));
</script>
<Seo path={`/sistemas/${data.system.slug}/`} />
<section class="container library-hero"><Breadcrumbs path={`/sistemas/${data.system.slug}/`} /><p class="eyebrow">SISTEMAS / {data.system.name}</p><h1>{data.system.name}</h1><p class="library-lead">{data.system.description}</p></section>
<div class="container library-body">
  {#if selectedProjects.length}<section class="library-group" aria-labelledby="system-apps"><p class="eyebrow">DESARROLLO PROPIO</p><h2 id="system-apps">Aplicaciones</h2><div class="project-grid">{#each selectedProjects as project, index (project.repo)}<ProjectCard {project} {index} />{/each}</div></section>{/if}
  {#if data.system.slug === 'macos'}<section class="library-group" aria-labelledby="system-guides"><div class="section-heading"><h2 id="system-guides">Guías y configuraciones</h2><a class="text-link" href="/guias/">Ver todas las guías →</a></div><ResourceList /></section>{/if}
  {#if tools.some(tool => tool.systems.includes(data.system.slug))}<section class="library-group" aria-labelledby="system-tools"><p class="eyebrow">PROYECTOS DE LA COMUNIDAD</p><h2 id="system-tools">Herramientas</h2><ToolList system={data.system.slug} /></section>{/if}
</div>
