<script lang="ts">
  import '../app.css';
  import Header from '#lib/components/Header.svelte';
  import Footer from '#lib/components/Footer.svelte';
  let { children } = $props();
</script>

<a class="skip-link" href="#main">Saltar al contenido</a>
<Header />
<main id="main">{@render children()}</main>
<Footer />
