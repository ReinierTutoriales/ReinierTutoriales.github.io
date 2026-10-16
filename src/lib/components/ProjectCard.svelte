<script lang="ts">
  import { projectPath } from '#lib/project-links.js';
  import type { Project } from '#lib/catalog.js';
  let { project, index, hidden = false }: { project: Project; index: number; hidden?: boolean } = $props();
</script>

<article class="project" class:featured={project.featured} data-category={project.category} {hidden}>
  <div class="project-body">
    <div class="project-meta"><span>{String(index + 1).padStart(2, '0')} / {project.platform}</span><span class="kind">{project.kind}</span></div>
    <h3>{project.name}</h3>
    <p class="project-summary">{project.summary}</p>
    <p class="project-detail">{project.detail}</p>
    <p class="stack">{project.stack}</p>
    <a class="project-link" href={projectPath(project.repo)}>Explorar {project.name} <span aria-hidden="true">↗</span></a>
  </div>
  {#if project.featured}
    <figure class="product-visual"><img src="/assets/velocitycopy.webp" alt="Interfaz de VelocityCopy: progreso de transferencia, velocidad y controles de copia" width="461" height="176" fetchpriority="high"><figcaption>Interfaz durante el desarrollo. Las cifras de la captura son ilustrativas.</figcaption></figure>
  {/if}
</article>
