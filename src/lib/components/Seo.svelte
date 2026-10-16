<script lang="ts">
  import type { SeoData } from '#lib/seo.server.js';
  import { SITE_ORIGIN, SITE_NAME } from '#lib/site.js';
  let { metadata }: { metadata: SeoData } = $props();
</script>
<svelte:head>
{#if metadata}
  <title>{metadata.title}</title>
  <meta name="description" content={metadata.description}>
  <link rel="canonical" href={metadata.canonical}>
  <meta property="og:type" content={metadata.kind}>
  <meta property="og:locale" content="es_ES">
  <meta property="og:site_name" content={SITE_NAME}>
  <meta property="og:title" content={metadata.title}>
  <meta property="og:description" content={metadata.description}>
  <meta property="og:url" content={metadata.canonical}>
  <meta property="og:image" content={`${SITE_ORIGIN}/imagenes/og-logo.png`}>
  <meta property="og:image:width" content="512">
  <meta property="og:image:height" content="512">
  <meta property="og:image:alt" content="Logo de ReinierTutoriales">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content={metadata.title}>
  <meta name="twitter:description" content={metadata.description}>
  <meta name="twitter:image" content={`${SITE_ORIGIN}/imagenes/og-logo.png`}>
  {@html `<script type="application/ld+json">${metadata.jsonLd}</script>`}
{/if}
</svelte:head>
