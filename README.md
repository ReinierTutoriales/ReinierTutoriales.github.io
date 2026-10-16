# ReinierTutoriales · Portfolio con SvelteKit

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

Al desplegar, el workflow comprueba que Pages usa el modo GitHub Actions y lo establece si aún conserva la fuente por rama. No guarda credenciales ni necesita un PAT. Las acciones oficiales están fijadas por SHA y Dependabot propone sus actualizaciones junto con las dependencias npm.

No se versionan `build/`, `.svelte-kit/` ni `node_modules/`. El repositorio es una web de usuario (`ReinierTutoriales.github.io`), por lo que la ruta base es vacía; no se añade el nombre del repositorio a la URL.

## Contenido y rendimiento

El HTML prerenderizado contiene todos los proyectos sin ejecutar JS. Los filtros se activan tras montar Svelte y mantienen botones nativos, estado de selección y anuncio de resultados. Sin JS se ve el catálogo completo.

No hay fuentes remotas, analítica, servidor de aplicación ni llamadas a GitHub desde el navegador. El framework genera activos con hash para caché y CSP con hashes para su arranque. No se habilitan funcionalidades experimentales ni una SPA vacía como fallback.

La captura procede de `VelocityCopy/docs/screenshots/transfer-compact.png`, rama `main`, consultada el 16/10/2026 y convertida a WebP. Sus cifras son ilustrativas; no son un benchmark. Se mantienen los enlaces comunitarios originales.

Análisis editorial de los 23 repositorios públicos: [docs/AUDIT.md](docs/AUDIT.md).
