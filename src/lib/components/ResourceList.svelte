<script lang="ts">
  import { resources, repositoryUrl } from '#lib/catalog.js';
</script>
<ul class="resource-list">
  {#each resources as resource (resource.repo)}
    <li><a href={repositoryUrl(resource.repo)}><span><span class="resource-type">{resource.type}</span><strong>{resource.name}</strong><span class="resource-summary">{resource.summary}</span></span><span aria-hidden="true">↗</span></a></li>
  {/each}
</ul>
