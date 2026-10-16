# SEO técnico, dependencias y peso del cliente — 16/10/2026

## Hallazgos y cambios

Los componentes de SEO importaban el índice de todas las rutas y, a través de él, el contenido completo de las fichas de aplicaciones. Además, una ficha importaba el catálogo completo para obtener una función que construye un enlace. La cabecera compartía módulo con los datos de todos los sistemas y herramientas.

- `seo.server.ts` y `project-details.server.ts` se ejecutan durante la prerenderización. El layout entrega únicamente los metadatos de la ruta actual; los tipos se importan con `import type` y no incorporan el módulo al cliente. El mismo layout actualiza el head al navegar.
- Rutas de proyectos y funciones de enlaces se separan en módulos pequeños. La cabecera importa solo la navegación.
- Los títulos de búsqueda son específicos y más concisos, conservando los H1 explicativos del contenido.
- Las dos guías incluyen Article y Open Graph de tipo article. Autor, publicación y revisión se muestran en el texto. El sitemap usa lastmod solo donde existe una fecha editorial registrada; no se sustituye por la hora de cada build.
- La compilación limpia su salida generada antes de reconstruirla, evitando conservar chunks obsoletos de compilaciones anteriores.

No se añaden dependencias, valoraciones, ofertas ni garantías de resultados enriquecidos.

## Medición de archivos

Comparación con la compilación de `8a45c4b` previa a este cambio. Se suman los archivos JS declarados mediante modulepreload en cada HTML, sin compresión. No se suman todas las rutas como si se descargaran en cada visita.

| Página | JS precargado antes | JS precargado después | Reducción |
| --- | ---: | ---: | ---: |
| Portada | 122.052 B | 112.845 B | 7,54 % |
| Ficha de VelocityCopy | 118.899 B | 105.235 B | 11,49 % |
| Guía de mapeo USB | 114.360 B | 103.916 B | 9,13 % |

El HTML aumenta al incluir los metadatos de la ruta para la hidratación y, en las guías, el marcado Article. Aun contando HTML más JS precargado, estas páginas pasan respectivamente de 140.834 a 133.099 B, de 132.330 a 120.836 B y de 133.222 a 126.339 B. El CSS y el arranque del tema no cambian.

Estos son tamaños de archivos. No son tiempos de carga, Lighthouse, LCP, INP, CLS ni una prueba con usuarios. La caché y compresión del servidor modifican los bytes transferidos en una visita real.

Para reproducir la medición de la versión actual:

```sh
npm ci
npm run check
npm run build
npm test
npm run size
```

El informe incluye las 17 rutas, HTML, JS precargado, CSS y el total generado de JS/CSS. Las pruebas limitan cada página a 112 KiB de JS precargado y conservan el presupuesto general de 200 KiB para el bundle completo.

## Dependencias

Consultados el registro npm y los metadatos de compatibilidad el 16/10/2026:

- SvelteKit 3.1.0, Svelte 5.57.2, Vite 8.3.4, adapter-static 4.0.0 y las herramientas de pruebas instaladas no tienen una versión posterior en el registro consultado.
- `npm audit --json` no reportó vulnerabilidades conocidas. Es una consulta puntual de avisos, no una garantía sobre fallos desconocidos.
- `npm outdated --json` muestra TypeScript 7.0.2 y los tipos de Node 26 como saltos disponibles. `svelte-check` 4.7.6 declara TypeScript `^5.0.0 || ^6.0.0` como peer dependency: se mantiene 6.0.3. Los tipos de Node permanecen en 24 para corresponder al Node 24 usado por CI.
- Los paquetes de desarrollo sirven para compilar o probar. Su número en node_modules no equivale al número de bibliotecas enviadas al visitante.
- Dependabot ya revisa npm y las acciones de GitHub. No se introducen actualizaciones mayores incompatibles para aumentar números de versión.

## Validación y límites

24 pruebas: 14 de salida estática/presupuestos y 10 de componentes/datos. Se conservan temas, filtros, canónicas y migas; se comprueba también el cambio del head entre rutas y su limpieza en 404. La compilación de producción exige que ningún módulo .server se importe como código de cliente.

La API pública de PageSpeed respondió 429 por cuota diaria agotada en los intentos de móvil y escritorio. No hay un informe Lighthouse ni una inspección visual en navegador. La comprobación HTTP posterior al despliegue contrasta las rutas, metadatos, archivos y datos estáticos de navegación.

## Fuentes primarias

- https://svelte.dev/docs/kit/server-only-modules
- https://svelte.dev/docs/kit/performance
- https://developers.google.com/search/docs/appearance/title-link
- https://developers.google.com/search/docs/appearance/structured-data/article
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Registro npm: `npm outdated --json`, `npm audit --json`, `npm view svelte-check@4.7.6 peerDependencies --json`.
