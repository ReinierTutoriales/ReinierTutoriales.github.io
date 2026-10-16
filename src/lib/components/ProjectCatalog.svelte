<script lang="ts">
  import { onMount } from 'svelte';
  import { projects, categories, type Category } from '#lib/catalog.js';
  import ProjectCard from './ProjectCard.svelte';

  let selected = $state<Category>('all');
  let ready = $state(false);
  const visibleCount = $derived(projects.filter(p => selected === 'all' || p.category === selected).length);
  const selectedLabel = $derived(categories.find(c => c.value === selected)?.label ?? 'Todos');
  onMount(() => { ready = true; });
</script>

<div class="filters" role="group" aria-label="Filtrar proyectos por plataforma" hidden={!ready}>
  {#each categories as category (category.value)}
    <button type="button" aria-pressed={selected === category.value} onclick={() => { selected = category.value; }}>{category.label}</button>
  {/each}
</div>
<p class="sr-only" role="status" aria-live="polite">{ready ? `${visibleCount} proyectos: ${selectedLabel}.` : ''}</p>
<div class="project-grid">
  {#each projects as project, index (project.repo)}
    <ProjectCard {project} {index} hidden={selected !== 'all' && selected !== project.category} />
  {/each}
</div>
