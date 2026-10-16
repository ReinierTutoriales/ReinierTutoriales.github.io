<script lang="ts">
  import Seo from '#lib/components/Seo.svelte';
  import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
import ProjectCatalog from '#lib/components/ProjectCatalog.svelte';</script>
<Seo path="/aplicaciones/" />
<section class="container library-hero"><Breadcrumbs path="/aplicaciones/" /><p class="eyebrow">EXPLORAR / APLICACIONES</p><h1>Aplicaciones para<br>Windows y Android TV.</h1><p class="library-lead">Copia archivos, gestiona descargas o navega desde el televisor. Consulta el código y el estado de cada proyecto.</p></section>
<section class="work-section" aria-label="Catálogo de aplicaciones"><div class="container"><ProjectCatalog /><p class="section-note">Los proyectos experimentales y derivados están identificados. Los requisitos y las publicaciones se mantienen en sus repositorios.</p></div></section>
