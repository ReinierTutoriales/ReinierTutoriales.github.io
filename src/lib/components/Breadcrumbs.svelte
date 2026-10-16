<script lang="ts">
  import { page } from '$app/state';
  const metadata = $derived(page.data.seo);
</script>
{#if metadata}
<nav class="breadcrumbs" aria-label="Ruta de navegación"><ol>{#each metadata.crumbs as crumb, index (crumb.path)}<li>{#if index < metadata.crumbs.length-1}<a href={crumb.path}>{crumb.name}</a>{:else}<span aria-current="page">{crumb.name}</span>{/if}</li>{/each}</ol></nav>
{/if}
