<script lang="ts">
  import { tools } from '#lib/sections.js';
  let { system = '' }: { system?: string } = $props();
  const selected = $derived(system ? tools.filter(tool => tool.systems.includes(system)) : tools);
</script>
<div class="category-grid">
  {#each selected as tool (tool.url)}
    <a class="category-card" href={tool.url}><span class="eyebrow">{tool.purpose}</span><h3>{tool.name}</h3><p>{tool.summary}</p><span>Proyecto de {tool.author} <span aria-hidden="true">↗</span></span></a>
  {/each}
</div>
