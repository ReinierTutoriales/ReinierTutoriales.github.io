<script lang="ts">
  import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
  import ProjectCatalog from '#lib/components/ProjectCatalog.svelte';
  import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();
</script>
<section class="container library-hero"><Breadcrumbs /><p class="eyebrow">Aplicaciones</p><h1>Aplicaciones para<br>Windows y Android TV.</h1><p class="library-lead">Copia archivos, gestiona descargas o navega desde el televisor. Consulta el código y el estado de cada proyecto.</p></section>
<section class="container library-body" id="comparar" aria-labelledby="compare-title">
  <h2 id="compare-title">Elige según lo que necesitas hacer</h2>
  <p class="group-note">Para organizar copias y movimientos, consulta VelocityCopy. Para distribuir un mismo origen a varios destinos, consulta RepartoCopier. La tabla compara su propósito, no sus velocidades.</p>
  <p class="small-note" id="comparison-hint">En pantallas estrechas puedes desplazar la tabla horizontalmente.</p>
  <!-- svelte-ignore a11y_no_noninteractive_tabindex (Permite desplazar la tabla con el teclado dentro de esta región etiquetada.) -->
  <div class="table-scroll" role="region" aria-label="Comparación de aplicaciones" aria-describedby="comparison-hint" tabindex="0">
    <table><caption>Aplicaciones por tarea, plataforma y estado de distribución revisado</caption><thead><tr><th scope="col">Aplicación</th><th scope="col">Para qué elegirla</th><th scope="col">Sistema</th><th scope="col">Estado</th></tr></thead><tbody>{#each data.comparison as item (item.path)}<tr><th scope="row"><a href={item.path}>{item.name}</a></th><td>{item.task}</td><td>{item.platform}</td><td>{item.status}</td></tr>{/each}</tbody></table>
  </div>
  <p class="group-note">Cada ficha indica requisitos, primeros pasos y fecha de revisión. Un paquete publicado no implica que todas las funciones del código en desarrollo estén incluidas.</p>
</section>
<section class="work-section" aria-label="Catálogo de aplicaciones"><div class="container"><ProjectCatalog /><p class="section-note">Los proyectos experimentales y derivados están identificados. Consulta las fuentes de cada ficha para conocer sus requisitos y publicaciones.</p></div></section>
