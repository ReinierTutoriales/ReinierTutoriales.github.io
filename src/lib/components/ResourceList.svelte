<script lang="ts">
  import { resources, repositoryUrl } from '#lib/catalog.js';
  import { nativeGuidePath } from '#lib/guide-paths.js';
  let { excludeNative = false }: { excludeNative?: boolean } = $props();
  const selected = $derived(excludeNative ? resources.filter(resource => !nativeGuidePath(resource.repo)) : resources);
</script>
<ul class="resource-list">
  {#each selected as resource (resource.repo)}
    {@const guide = nativeGuidePath(resource.repo)}
    <li><a href={guide ?? repositoryUrl(resource.repo)}><span><span class="resource-type">{resource.type}</span><strong>{resource.name}</strong><span class="resource-summary">{resource.summary}</span></span><i class="arrow-icon" data-dir={guide ? undefined : 'external'} aria-hidden="true"></i></a></li>
  {/each}
</ul>
