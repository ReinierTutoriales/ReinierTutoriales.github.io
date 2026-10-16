# ReinierTutoriales · Portfolio

Web pública: **https://reiniertutoriales.github.io/**

Aplicaciones para Windows y Android TV, herramientas de sistema y documentación de macOS. Los proyectos derivados y experimentales se identifican expresamente.

## Desarrollo

Requiere Node.js 24 o posterior. No necesita instalar dependencias.

```sh
npm run build  # Genera index.html
npm run check  # Sintaxis, generación, enlaces locales, catálogo y filtros
```

- `data/projects.json`: catálogo editorial; editar aquí los proyectos, no en la página generada.
- `src/index.html`: plantilla de contenido y estructura.
- `assets/site.css`: estilos adaptables y fuentes del sistema.
- `assets/site.js`: filtros progresivos y año del pie. La web completa funciona sin JS.
- `index.html`: salida generada y versionada; GitHub Pages publica desde la raíz de `main` como antes.

Antes de subir cambios, ejecutar ambos comandos. CI verifica que la página generada coincide con su fuente. No se cambia el modo de publicación existente de Pages ni se añade un segundo despliegue.

## Criterios

Sin frameworks, paquetes de terceros, fuentes remotas, analítica ni consultas a la API desde el navegador. Los datos se revisan editorialmente; no se presentan como un monitor en tiempo real. El catálogo no promete versiones ni disponibilidad de descarga: enlaza al repositorio que mantiene esa información.

La política CSP limita los recursos al propio origen y desactiva conexiones de scripts. En Pages se aplica mediante meta; cabeceras como `frame-ancestors` requieren control del servidor y no se simulan aquí.

La navegación siempre está disponible, sin panel modal. Se conservan los destinos `#inicio`, `#proyectos`, `#enfoque`, `#areas` y `#contacto`; se añade `#recursos`.

La captura de VelocityCopy procede de su repositorio (`docs/screenshots/transfer-compact.png`, rama `main`, consultada el 16/10/2026), convertida a WebP. Las cifras son ilustrativas; no constituyen un benchmark. Se conservan el logo y los enlaces comunitarios existentes.

Análisis de repositorios y decisiones: [docs/AUDIT.md](docs/AUDIT.md).
