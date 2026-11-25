<script lang="ts">
  import { onMount } from 'svelte';

  let registered = false;

  onMount(() => {
    // El SW solo se registra en producción; en desarrollo no aplica para no
    // interferir con el recargado en caliente ni cachear el trabajo en curso.
    if (import.meta.env.PROD === false || registered || typeof navigator === 'undefined') return;
    if (!('serviceWorker' in navigator)) return;
    registered = true;
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // El registro falla en redes o contextos que lo impiden; la web sigue
      // funcionando sin SW sin interrumpir la experiencia.
    });
  });
</script>