<script lang="ts">

  import ProjectCatalog from '#lib/components/ProjectCatalog.svelte';
  import { siteSections } from '#lib/sections.js';
  import ResourceList from '#lib/components/ResourceList.svelte';
</script>


    <section class="hero container" id="inicio" aria-labelledby="hero-title">
      <div class="eyebrow"><span class="status-dot" aria-hidden="true"></span> REINIER LAZO / REINIERTUTORIALES</div>
      <h1 id="hero-title">Optimizado.<br><span>Listo para usar.</span></h1>
      <div class="hero-bottom"><p>Herramientas nativas y guías verificables para Windows, macOS y Android TV. Sin fricción, sin cloud innecesario. Directo al resultado.</p><a class="button primary" href="#proyectos">Explorar proyectos <span aria-hidden="true">↓</span></a></div>
      <div class="hero-foot"><span>DESARROLLO & DOCUMENTACIÓN</span><span>Windows <i>/</i> Android TV <i>/</i> macOS</span></div>
    </section>
    <section class="work-section" id="proyectos" aria-labelledby="projects-title">
      <div class="container">
        <div class="section-heading"><div><p class="eyebrow">01 / PROYECTOS SELECCIONADOS</p><h2 id="projects-title">Aplicaciones para copiar, descargar y navegar.</h2></div><p>Qué hace cada herramienta, para qué sistema está pensada y dónde seguir su desarrollo.</p></div>
        <ProjectCatalog />
        <p class="section-note">Las funciones y la disponibilidad dependen de cada proyecto. Consulta su README y sus publicaciones antes de instalar.</p>
        <a class="text-link" href="/aplicaciones/#comparar">Comparar aplicaciones por tarea <span aria-hidden="true">↗</span></a>
      </div>
    </section>
    <section class="guide-teaser container" aria-labelledby="guides-title">
      <div class="section-heading"><div><p class="eyebrow">02 / EXPLORA LA WEB</p><h2 id="guides-title">Cada recurso, en su lugar.</h2></div><p>Sistemas, aplicaciones y conocimiento técnico, organizados para ir directo a lo que necesitas.</p></div>
      <div class="guide-group-grid">
        {#each siteSections as section (section.path)}
          <a class="guide-group" href={section.path}><span class="eyebrow">{section.label}</span><h3>{section.title}</h3><p>{section.summary}</p><span class="text-link">Explorar sección <span aria-hidden="true">↗</span></span></a>
        {/each}
      </div>
    </section>
    <section class="resources-section container" id="recursos" aria-labelledby="resources-title">
      <div class="resource-intro"><p class="eyebrow">03 / BIBLIOTECA TÉCNICA</p><h2 id="resources-title">Conocer el sistema.<br>Documentar el camino.</h2><p>Las guías y configuraciones de macOS siguen aquí: OpenCore, conectividad y compatibilidad de hardware.</p><p class="small-note">Cada configuración tiene requisitos propios. Los forks se identifican y conservan su proyecto de origen.</p></div>
      <ResourceList />
    </section>
    <section class="approach-section" id="enfoque" aria-labelledby="approach-title">
      <div class="container"><p class="eyebrow">04 / ENFOQUE</p><div class="approach-heading"><h2 id="approach-title">Claridad en la interfaz.<br>Control en el sistema.</h2><p>Herramientas que resuelven tareas concretas, con su funcionamiento y sus límites documentados.</p></div>
        <div class="principles" id="areas"><article><span class="principle-number">01</span><h3>Utilidad concreta</h3><p>Copiar archivos, gestionar descargas o navegar desde el televisor. Cada proyecto parte de una tarea reconocible.</p></article><article><span class="principle-number">02</span><h3>Atención a los recursos</h3><p>Interfaces nativas, WebView y motores de sistema elegidos según el dispositivo y el trabajo que deben realizar.</p></article><article><span class="principle-number">03</span><h3>Trabajo verificable</h3><p>Repositorios públicos para consultar el código, los cambios, las instrucciones y las limitaciones conocidas.</p></article></div>
      </div>
    </section>
    <section class="community-section container" id="contacto" aria-labelledby="community-title"><div><p class="eyebrow">05 / COMUNIDAD</p><h2 id="community-title">El trabajo continúa<br>en comunidad.</h2><p>Consulta el código, sigue los tutoriales o participa en la conversación.</p></div><div class="community-links"><a href="https://github.com/ReinierTutoriales"><span>GitHub<small>Código, cambios e incidencias</small></span><span aria-hidden="true">↗</span></a><a href="https://youtube.com/c/ReinierTutoriales"><span>YouTube<small>Tutoriales y demostraciones</small></span><span aria-hidden="true">↗</span></a><a href="https://t.me/ReinierTutoriales"><span>Telegram<small>Conversación y novedades</small></span><span aria-hidden="true">↗</span></a></div></section>
