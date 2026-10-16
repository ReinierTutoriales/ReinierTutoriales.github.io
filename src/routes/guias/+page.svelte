<script lang="ts">
  import Seo from '#lib/components/Seo.svelte';
  import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
import ResourceList from '#lib/components/ResourceList.svelte';</script>
<Seo path="/guias/" />
<section class="container library-hero"><Breadcrumbs path="/guias/" /><p class="eyebrow">EXPLORAR / GUÍAS</p><h1>Guías de macOS,<br>OpenCore y hardware.</h1><p class="library-lead">Documentación técnica y configuraciones de hardware para consultar requisitos, seguir procedimientos y resolver problemas concretos.</p></section>
<section class="container library-body guide-directory" aria-label="Guías y recursos"><ResourceList /><p class="group-note">Las configuraciones EFI dependen del hardware. Revisa siempre la documentación de cada proyecto antes de utilizar sus archivos.</p><a class="text-link" href="/herramientas/">Explorar herramientas de configuración →</a></section>

<section class="container project-article" aria-labelledby="guide-choose"><h2 id="guide-choose">Qué documentación consultar primero</h2><p>Para un problema de conexión, empieza por la guía del adaptador Intel AX210 o Broadcom. Para preparar los puertos del equipo, utiliza el recurso de mapeo USB. Las configuraciones EFI específicas, como la del Ryzen 7 5800U, deben contrastarse con el hardware exacto del equipo.</p><ul class="related-links"><li><a href="/sistemas/macos/">Ver recursos de macOS →</a></li><li><a href="/herramientas/">Consultar herramientas de OpenCore y archivos plist →</a></li></ul></section>
