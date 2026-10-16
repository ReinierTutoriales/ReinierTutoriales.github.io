<script lang="ts">
  import { resources, repositoryUrl } from '#lib/catalog.js';
  import { guides, guidePath } from '#lib/guide-catalog.js';
  let { excludeNative = false }: { excludeNative?: boolean } = $props();
  const selected = $derived(excludeNative ? resources.filter(resource => !guides.some(guide => guide.sourceRepo === resource.repo)) : resources);
</script>
<ul class="resource-list">
  {#each selected as resource (resource.repo)}
    {@const guide = guides.find(guide => guide.sourceRepo === resource.repo)}
    <li><a href={guide ? guidePath(guide.slug) : repositoryUrl(resource.repo)}><span><span class="resource-type">{resource.type}</span><strong>{resource.name}</strong><span class="resource-summary">{resource.summary}</span></span><span aria-hidden="true">{guide ? '→' : '↗'}</span></a></li>
  {/each}
</ul>
