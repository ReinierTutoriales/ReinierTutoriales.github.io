<script lang="ts">
  import { pageMetadata } from '#lib/seo.js';
  let { path }: { path: string } = $props();
  const page = $derived(pageMetadata(path));
</script>
<nav class="breadcrumbs" aria-label="Ruta de navegación"><ol>{#each page.crumbs as crumb, index (crumb.path)}<li>{#if index < page.crumbs.length-1}<a href={crumb.path}>{crumb.name}</a>{:else}<span aria-current="page">{crumb.name}</span>{/if}</li>{/each}</ol></nav>
