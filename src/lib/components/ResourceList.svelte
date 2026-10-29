<script lang="ts">
  import Arrow from './Arrow.svelte';
  import { resources, repositoryUrl } from '#lib/catalog.js';
  import { nativeGuidePath } from '#lib/guide-paths.js';
  let { excludeNative = false }: { excludeNative?: boolean } = $props();
  const selected = $derived(excludeNative ? resources.filter(resource => !nativeGuidePath(resource.repo)) : resources);
</script>
<ul class="resource-list">
  {#each selected as resource (resource.repo)}
    {@const guide = nativeGuidePath(resource.repo)}
    <li><a href={guide ?? repositoryUrl(resource.repo)}><span><span class="resource-type">{resource.type}</span><strong>{resource.name}</strong><span class="resource-summary">{resource.summary}</span></span><Arrow direction={guide ? 'right' : 'external'} /></a></li>
  {/each}
</ul>
