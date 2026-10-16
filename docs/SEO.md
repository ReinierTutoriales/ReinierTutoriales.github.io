# SEO y contenido — 16/10/2026

## Cambios

- Quince rutas públicas prerenderizadas: portada, cuatro secciones, cuatro sistemas y seis fichas de aplicaciones.
- Título y descripción específicos para cada URL, con una sola canónica absoluta. La identidad se centraliza en `src/lib/seo.ts`.
- Open Graph y Twitter coherentes con cada página, imagen y favicon locales. Los iconos usan rutas absolutas para funcionar desde las páginas interiores.
- JSON-LD WebSite, Person y WebPage; BreadcrumbList para páginas interiores, reflejado en las migas de pan visibles.
- Las tarjetas enlazan a fichas propias. Cada ficha explica la tarea, las funciones y el alcance, y conserva acceso al repositorio original.
- Se distinguen programas propios, proyectos derivados y experimentales. No se prometen instaladores o versiones que no se hayan comprobado.
- H1 y encabezados más descriptivos. Guías y Herramientas explican cómo elegir el recurso según la tarea.
- Sitemap generado desde el mismo catálogo de páginas usado por SEO. Incluye solo rutas indexables; la recuperación 404 conserva noindex. No se inventan fechas lastmod ni se cambian diariamente sin cambios de contenido.

## Validación

Svelte-check, build estático y 14 pruebas: diez de salida y cuatro en Vitest. Se comprueban las quince canónicas, títulos y descripciones únicos, JSON-LD válido y correspondencia con las rutas, migas de pan, ausencia de noindex en páginas públicas y conservación de temas y filtros. La serialización JSON-LD escapa `<` y conserva el texto al decodificar; los scripts ejecutables siguen sujetos a hashes CSP.

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
