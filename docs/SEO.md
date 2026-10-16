# SEO y contenido — 16/10/2026

## Cambios

- Diecisiete rutas públicas prerenderizadas: portada, cuatro secciones, cuatro sistemas, seis fichas de aplicaciones y dos guías propias.
- Título y descripción específicos para cada URL, con una sola canónica absoluta. La identidad se centraliza en `src/lib/seo.server.ts`.
- Open Graph y Twitter coherentes con cada página, imagen y favicon locales. Los iconos usan rutas absolutas para funcionar desde las páginas interiores.
- JSON-LD WebSite, Person y WebPage; BreadcrumbList para páginas interiores, reflejado en las migas de pan visibles.
- Las tarjetas enlazan a fichas propias. Cada ficha explica la tarea, las funciones y el alcance, y conserva acceso al repositorio original.
- Se distinguen programas propios, proyectos derivados y experimentales. No se prometen instaladores o versiones que no se hayan comprobado.
- H1 y encabezados más descriptivos. Guías y Herramientas explican cómo elegir el recurso según la tarea.
- Sitemap generado desde el mismo catálogo de páginas usado por SEO. Incluye solo rutas indexables; la recuperación 404 conserva noindex. No se inventan fechas lastmod ni se cambian diariamente sin cambios de contenido.

## Validación

Svelte-check, build estático y 24 pruebas: catorce de salida y diez en Vitest. Se comprueban las diecisiete canónicas, títulos y descripciones únicos, JSON-LD válido y correspondencia con las rutas, migas de pan, ausencia de noindex en páginas públicas y conservación de temas y filtros. La serialización JSON-LD escapa `<` y conserva el texto al decodificar; los scripts ejecutables siguen sujetos a hashes CSP.

Estas comprobaciones no equivalen a una validación externa de Rich Results Test ni a la inspección de URLs de Search Console. No se ha medido Lighthouse, Core Web Vitals, posiciones ni tráfico orgánico. No se añaden ratings, reseñas, ofertas, FAQ o acciones de búsqueda que el sitio no ofrezca.

La publicación técnica permite el rastreo, pero Google decide cuándo rastrea, qué indexa y cómo presenta cada resultado. La canónica actual es `https://reiniertutoriales.github.io/`; el dominio reiniertutoriales.com conserva su función y contenido actual. No se cambia DNS ni se declara una migración de dominio que no se haya realizado.

## Seguimiento tras publicar

En Search Console del propietario, enviar `https://reiniertutoriales.github.io/sitemap.xml` y revisar indexación e inspección de las fichas. El acceso a esa propiedad no está disponible en el conector usado para este trabajo; no se afirma que el sitemap se haya enviado ni que las URLs estén indexadas.

## Documentación oficial consultada

- https://developers.google.com/search/docs/appearance/title-link
- https://developers.google.com/search/docs/appearance/snippet
- https://developers.google.com/search/docs/appearance/site-names
- https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
- https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap


## Ampliación de contenido y navegación — 16/10/2026

- Comparación por tarea, plataforma y estado, sin clasificaciones de velocidad inventadas.
- Fichas con requisitos, primeros pasos, fecha por proyecto y fuentes fijadas a commits consultados. Las publicaciones con archivos se identifican como una revisión puntual, con distinción de preliminares.
- Guías nativas: `/guias/mapear-usb-desde-windows/` y `/guias/descargas-reanudables-w11downloaderpro/`, con requisitos, índice, pasos, diagnóstico, fuentes y enlaces relacionados.
- Navegación principal reactiva con `page` de `$app/state`: `aria-current="page"` en la sección principal y `aria-current="location"` en sus páginas hijas. Las migas conservan la página actual.
- El texto completo de guías y revisiones se mantiene en módulos de servidor; la prerenderización sirve el contenido correspondiente sin una API externa en cada visita.

Documentación contrastada: `$app/state` y rendimiento de SvelteKit, README de cada proyecto, publicaciones con paquetes, USBToolBox/tool y USBToolBox/kext. La comparación y las guías no requieren JavaScript para leerse. Las pruebas de DOM no sustituyen una evaluación visual o una medición de rendimiento real.


## SEO generado por ruta y artículos

`+layout.server.ts` produce el SEO de la ruta actual desde `seo.server.ts`; `Seo.svelte` actualiza el head sin cargar el índice completo en el navegador. Los títulos son más concisos y las guías incluyen Article, autor y fechas visibles. Solo sus fechas editoriales registradas se usan como lastmod. En 404 se retira el SEO anterior y se conserva noindex.

El marcado no añade valoraciones ni promete resultados enriquecidos. Auditoría de dependencias y reducción de archivos medida en [PERFORMANCE.md](PERFORMANCE.md).
