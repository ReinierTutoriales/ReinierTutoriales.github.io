<script lang="ts">
  import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
import { systems } from '#lib/sections.js';</script>
<section class="container library-hero"><Breadcrumbs /><p class="eyebrow">EXPLORAR / SISTEMAS</p><h1>Elige tu sistema.<br>Encuentra tu recurso.</h1><p class="library-lead">Aplicaciones, herramientas y documentación organizadas por plataforma.</p></section>
<section class="container library-body" aria-label="Sistemas disponibles"><div class="category-grid">{#each systems as system (system.slug)}<a class="category-card" href={`/sistemas/${system.slug}/`}><h2>{system.name}</h2><p>{system.summary}</p><span>Explorar recursos <span aria-hidden="true">→</span></span></a>{/each}</div></section>
