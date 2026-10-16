<script lang="ts">
  import '../app.css';
  import Header from '#lib/components/Header.svelte';
  import Footer from '#lib/components/Footer.svelte';
  let { children } = $props();
</script>

<svelte:head>
  <meta name="referrer" content="strict-origin-when-cross-origin">
  <meta name="author" content="ReinierTutoriales">
  <link rel="icon" href="/favicon.png" type="image/png">
  <link rel="apple-touch-icon" href="/imagenes/apple-touch-icon.png">
</svelte:head>

<a class="skip-link" href="#main">Saltar al contenido</a>
<Header />
<main id="main">{@render children()}</main>
<Footer />
