# ReinierTutoriales · Portal con SvelteKit

Web pública: **https://reiniertutoriales.github.io/**

Aplicaciones para Windows y Android TV, herramientas de sistema y documentación de macOS. Se distinguen proyectos propios, derivados y experimentales.

## Stack

- SvelteKit 3.1 + Svelte 5, TypeScript 6 y Vite 8.
- `adapter-static` con prerenderizado completo. GitHub Pages sirve HTML y activos; no necesita servidor Node.
- Componentes con runes (`$state`, `$derived`, `$props`) y subpath imports `#lib`.
- Configuración actual en `vite.config.ts`, TypeScript extiende `$app/tsconfig`.
- Versiones exactas y `package-lock.json` para instalaciones reproducibles.

TypeScript 6 es la versión admitida por SvelteKit y svelte-check instalados. No se fuerza TypeScript 7 mientras sus peer dependencies no lo admitan.

## Desarrollo y comprobaciones

Requiere Node.js 24.

```sh
npm ci
npm run dev
```

Antes de integrar:

```sh
npm run check
npm run build
npm test
```

`check` ejecuta el verificador de Svelte y TypeScript. `build` genera `build/` y una página 404 estática. Los tests verifican contenido prerenderizado, catálogo, enlaces, activos, hashes CSP, compilación y presupuesto del bundle. Vitest, Testing Library y jsdom prueban los filtros con componentes Svelte reales. Estas pruebas de DOM no sustituyen la comprobación visual en navegadores ni lectores de pantalla.

## Estructura

- `src/routes/`: portada, layout y página de recuperación.
- `src/lib/components/`: cabecera, pie, catálogo y tarjeta de proyecto.
- `src/lib/data/projects.json`: catálogo editorial contrastado con los repositorios públicos.
- `src/app.css`: diseño adaptable con fuentes del sistema.
- `static/`: logo conservado, captura real de VelocityCopy, robots y sitemap.
- `scripts/`: comprobaciones de salida y preparación de 404.

## Publicación

El workflow **SvelteKit Pages** instala con `npm ci`, verifica tipos y compilación, ejecuta las pruebas y publica únicamente el directorio `build/`. Los PR no publican. La publicación de `main` usa el entorno `github-pages` y los permisos `pages: write` e `id-token: write`; el job de build solo lee código.

Antes del primer despliegue, en Settings → Pages → Build and deployment → Source, seleccionar GitHub Actions. Ese cambio administrativo no puede hacerse con los permisos del GITHUB_TOKEN. El workflow no guarda credenciales ni necesita un PAT. Las acciones oficiales están fijadas por SHA y Dependabot propone sus actualizaciones junto con las dependencias npm.

No se versionan `build/`, `.svelte-kit/` ni `node_modules/`. El repositorio es una web de usuario (`ReinierTutoriales.github.io`), por lo que la ruta base es vacía; no se añade el nombre del repositorio a la URL.

## Secciones y apariencia

- `/sistemas/`: Windows, macOS, Linux y Android TV, con páginas propias para cada plataforma.
- `/aplicaciones/`: catálogo de seis proyectos con filtros por plataforma y comparación por tarea.
- `/herramientas/`: ProperTree, OCAuxiliaryTools y WinDiskWriter, atribuidos a sus autores y enlazados a sus repositorios originales.
- `/guias/`: guías propias de mapeo USB y descargas reanudables, más documentación de OpenCore, conectividad y hardware.

Esta organización toma los ejes temáticos de reiniertutoriales.com, sin reproducir categorías, hilos, cuentas ni funciones del foro. El enlace a la web original se conserva. El sitemap se genera con las rutas nativas; no incluye la página de recuperación.

El selector permite Sistema, Claro y Oscuro. `static/theme.js` resuelve el tema antes de cargar el contenido, guarda la preferencia en localStorage y escucha los cambios del sistema y de otras pestañas. Si el almacenamiento está bloqueado, el tema sigue funcionando en memoria. Sin JavaScript, CSS sigue el esquema del sistema. Las paletas comparten tokens para superficies, texto, botones, foco y selección. Las pruebas verifican el contraste de los pares de color principales, sin sustituir una auditoría visual completa.

## Contenido y rendimiento

El HTML prerenderizado contiene todos los proyectos sin ejecutar JS. Los filtros se activan tras montar Svelte y mantienen botones nativos, estado de selección y anuncio de resultados. Sin JS se ve el catálogo completo.

No hay fuentes remotas, analítica, servidor de aplicación ni llamadas a GitHub desde el navegador. El framework genera activos con hash para caché y CSP con hashes para su arranque. No se habilitan funcionalidades experimentales ni una SPA vacía como fallback.

La captura procede de `VelocityCopy/docs/screenshots/transfer-compact.png`, rama `main`, consultada el 16/10/2026 y convertida a WebP. Sus cifras son ilustrativas; no son un benchmark. Se mantienen los enlaces comunitarios originales.

Análisis editorial de los 23 repositorios públicos: [docs/AUDIT.md](docs/AUDIT.md).


## SEO y páginas de aplicaciones

Cada aplicación tiene una ficha en `/aplicaciones/<slug>/` con funciones, uso, compatibilidad y alcance. `src/lib/project-details.ts` mantiene el contenido y `src/lib/seo.ts` centraliza títulos, descripciones, canónicas y las diecisiete rutas públicas del sitemap. Las páginas incluyen Open Graph, Twitter y datos estructurados coherentes con su contenido. Detalles y límites de validación en [docs/SEO.md](docs/SEO.md).


Si Pages conserva temporalmente la publicación por rama, el job de despliegue detecta ese modo y espera al flujo heredado del mismo commit antes de publicar SvelteKit. Así se evita que el artefacto de Jekyll sobrescriba la web compilada. El permiso adicional `actions: read` se usa únicamente para consultar ese estado. Cambiar Source a GitHub Actions sigue siendo la configuración recomendada para evitar el trabajo duplicado.


## Revisión editorial y guías

Las fichas separan requisitos, primeros pasos, alcance y distribución. `src/lib/project-editorial.server.ts` conserva por proyecto la fecha de revisión, un enlace al README fijado a su commit y la publicación con paquete comprobada (si existe), distinguiendo versiones preliminares. No se consulta GitHub desde el navegador ni se presenta una instantánea como un estado actualizado en tiempo real.

`src/lib/guide-catalog.ts` contiene el índice y metadatos de las guías; `src/lib/guides.server.ts` conserva sus procedimientos y fuentes. El contenido completo se entrega por la ruta correspondiente, sin incorporar todos los artículos a un módulo de JavaScript del cliente. Las nuevas guías aparecen en el sitemap y tienen migas de pan y enlaces por sección.

Para actualizar una ficha: revisar el README y los paquetes de Releases, guardar la referencia del commit consultado, comprobar si la publicación es preliminar y actualizar la fecha solo cuando se revise el contenido. No inferir una descarga disponible a partir de una etiqueta o de un artefacto de CI. Los enlaces de distribución apuntan a la publicación verificada, sin afirmar que sea la última para siempre.

Validación de esta ampliación: `npm run check`, `npm run build` y 19 pruebas (12 de salida estática y 7 de componentes/datos). Se comprueban las 17 páginas, los destinos y anclas internos, la navegación activa durante cambios de ruta, temas, filtros, SEO, fuentes editoriales y el presupuesto total de JS/CSS de 200 KiB. No se ha medido Lighthouse ni Core Web Vitals y no se ha realizado inspección visual en navegador.
