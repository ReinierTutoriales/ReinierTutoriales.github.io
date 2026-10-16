<script lang="ts">
  import { pageMetadata, structuredData, safeJsonLd, SITE_ORIGIN, SITE_NAME } from '#lib/seo.js';
  let { path }: { path: string } = $props();
  const page = $derived(pageMetadata(path));
  const json = $derived(safeJsonLd(structuredData(path)));
</script>
<svelte:head>
  <title>{page.title}</title>
  <meta name="description" content={page.description}>
  <link rel="canonical" href={page.canonical}>
  <meta property="og:type" content="website">
  <meta property="og:locale" content="es_ES">
  <meta property="og:site_name" content={SITE_NAME}>
  <meta property="og:title" content={page.title}>
  <meta property="og:description" content={page.description}>
  <meta property="og:url" content={page.canonical}>
  <meta property="og:image" content={`${SITE_ORIGIN}/imagenes/og-logo.png`}>
  <meta property="og:image:width" content="512">
  <meta property="og:image:height" content="512">
  <meta property="og:image:alt" content="Logo de ReinierTutoriales">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content={page.title}>
  <meta name="twitter:description" content={page.description}>
  <meta name="twitter:image" content={`${SITE_ORIGIN}/imagenes/og-logo.png`}>
  {@html `<script type="application/ld+json">${json}</script>`}
</svelte:head>
