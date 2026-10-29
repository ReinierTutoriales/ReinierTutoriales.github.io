<script lang="ts">
  import '../app.css';
  import Header from '#lib/components/Header.svelte';
  import Seo from '#lib/components/Seo.svelte';
  import type { LayoutData } from './$types';
  import type { Snippet } from 'svelte';
  import Footer from '#lib/components/Footer.svelte';
  import { onNavigate } from '$app/navigation';
  let { children, data }: { children: Snippet; data: LayoutData } = $props();

  // Transición nativa entre páginas (View Transitions API); sin soporte o con
  // movimiento reducido la navegación es instantánea.
  onNavigate((navigation) => {
    if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });
</script>

<svelte:head>
  <meta name="referrer" content="strict-origin-when-cross-origin">
  <meta name="author" content="ReinierTutoriales">
  <link rel="icon" href="/favicon.png" type="image/png">
  <link rel="apple-touch-icon" href="/imagenes/apple-touch-icon.png">
</svelte:head>

<Seo metadata={data.seo} />
<a class="skip-link" href="#main">Saltar al contenido</a>
<Header />
<main id="main">{@render children()}</main>
<Footer />
