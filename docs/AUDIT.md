# Auditoría de contenido y arquitectura — 16/10/2026

## Alcance y evidencia

Se consultaron los repositorios **públicos**, sus metadatos GitHub y los README de las seis aplicaciones destacadas. No se auditó internamente el código de todas las aplicaciones; esta revisión determina cómo representarlas en la web. `pushed_at` indica actividad del repositorio, incluso en ramas: no demuestra calidad, mantenimiento de todas las funciones ni publicación estable.

La web respondió HTTP 200. El último despliegue existente de Pages (`38189126611`, commit `10908af`) terminó correctamente. No se encontró evidencia de un fallo del alojamiento. La carencia principal era una portada centrada exclusivamente en Hackintosh que omitía el trabajo reciente para Windows y Android TV.

## Selección editorial

- Prioridad: VelocityCopy, RepartoCopier (`disk-duplicator`), NF DNS VPN, VireoLumaTV y W11DownloaderPro por actividad reciente y propósito reconocible.
- ColorFix permanece visible como experimental, no como producto terminado.
- OpenCore, conectividad y USB se conservan en la biblioteca técnica. Los forks se identifican como tales.
- Las EFI antiguas siguen accesibles desde el listado completo de GitHub. No se eliminan ni se califican como abandonadas por su fecha.
- `disk-duplicator` tiene una descripción GitHub antigua sobre copia de discos a nivel de bloque. Su README actual describe RepartoCopier, copia de archivos mediante FAN-OUT. La web utiliza el README para evitar publicar la descripción obsoleta.
- VireoLumaTV se presenta como derivado de TV Bro. No se atribuye la autoría original del navegador al propietario del fork.
- NF DNS VPN mantiene explícita la validación de rendimiento pendiente en TV. No se extrapolan benchmarks de PC a hardware Android TV.
- No se publican números de versión fijos, promesas de estabilidad ni botones a paquetes supuestamente disponibles. Los visitantes llegan al repositorio con la información vigente.

## Inventario público consultado

| Repositorio | Último push (UTC) | Tipo en GitHub | Ubicación en la web |
| --- | --- | --- | --- |
| [disk-duplicator](https://github.com/ReinierTutoriales/disk-duplicator) | 2026-10-16 | Repositorio no marcado como fork | Proyectos |
| [VelocityCopy](https://github.com/ReinierTutoriales/VelocityCopy) | 2026-10-16 | Repositorio no marcado como fork | Proyectos |
| [nfdnsvpn](https://github.com/ReinierTutoriales/nfdnsvpn) | 2026-10-15 | Repositorio no marcado como fork | Proyectos |
| [VireoLumaTV-browser](https://github.com/ReinierTutoriales/VireoLumaTV-browser) | 2026-10-15 | Fork | Proyectos |
| [W11DownloaderPro](https://github.com/ReinierTutoriales/W11DownloaderPro) | 2026-10-13 | Repositorio no marcado como fork | Proyectos |
| [ReinierTutoriales.github.io](https://github.com/ReinierTutoriales/ReinierTutoriales.github.io) | 2026-10-12 | Repositorio no marcado como fork | Listado completo de GitHub |
| [ReinierTutoriales](https://github.com/ReinierTutoriales/ReinierTutoriales) | 2026-10-08 | Repositorio no marcado como fork | Listado completo de GitHub |
| [ColorFix](https://github.com/ReinierTutoriales/ColorFix) | 2026-09-24 | Repositorio no marcado como fork | Proyectos |
| [Shell](https://github.com/ReinierTutoriales/Shell) | 2026-09-17 | Fork | Listado completo de GitHub |
| [Copiamuestra](https://github.com/ReinierTutoriales/Copiamuestra) | 2026-09-15 | Fork | Listado completo de GitHub |
| [OpenCore-Legacy-Patcher](https://github.com/ReinierTutoriales/OpenCore-Legacy-Patcher) | 2026-08-29 | Fork | Biblioteca técnica |
| [itlwm-AirportItlwm-LQM](https://github.com/ReinierTutoriales/itlwm-AirportItlwm-LQM) | 2026-08-24 | Fork | Biblioteca técnica |
| [Broadcom-WiFi-Bluetooth-macOS-Sequoia](https://github.com/ReinierTutoriales/Broadcom-WiFi-Bluetooth-macOS-Sequoia) | 2026-08-23 | Repositorio no marcado como fork | Biblioteca técnica |
| [Mapear-puertos-USB-para-macOS-con-USBToolBox-desde-Windows](https://github.com/ReinierTutoriales/Mapear-puertos-USB-para-macOS-con-USBToolBox-desde-Windows) | 2026-08-23 | Repositorio no marcado como fork | Biblioteca técnica |
| [Intel-AX210-macOS-Sonoma-Sequoia-Tahoe](https://github.com/ReinierTutoriales/Intel-AX210-macOS-Sonoma-Sequoia-Tahoe) | 2026-08-23 | Repositorio no marcado como fork | Biblioteca técnica |
| [OpenCore-NO-ACPI](https://github.com/ReinierTutoriales/OpenCore-NO-ACPI) | 2026-04-14 | Repositorio no marcado como fork | Listado completo de GitHub |
| [Hackintosh-Gigabyte-X570-AORUS-ELITE](https://github.com/ReinierTutoriales/Hackintosh-Gigabyte-X570-AORUS-ELITE) | 2026-01-22 | Repositorio no marcado como fork | Listado completo de GitHub |
| [Ryzentosh-GenMachine-Rem5000-Ryzen-7-5800U](https://github.com/ReinierTutoriales/Ryzentosh-GenMachine-Rem5000-Ryzen-7-5800U) | 2026-01-22 | Repositorio no marcado como fork | Biblioteca técnica |
| [ASUS-Z77-P8Z77V-LX](https://github.com/ReinierTutoriales/ASUS-Z77-P8Z77V-LX) | 2024-09-08 | Repositorio no marcado como fork | Listado completo de GitHub |
| [Hackintosh-Dell-OptiPlex-5050](https://github.com/ReinierTutoriales/Hackintosh-Dell-OptiPlex-5050) | 2024-03-24 | Repositorio no marcado como fork | Listado completo de GitHub |
| [EFI-Ryzentosh](https://github.com/ReinierTutoriales/EFI-Ryzentosh) | 2024-01-19 | Repositorio no marcado como fork | Listado completo de GitHub |
| [EFI-Ryzentosh-APU-AMD](https://github.com/ReinierTutoriales/EFI-Ryzentosh-APU-AMD) | 2023-12-29 | Repositorio no marcado como fork | Listado completo de GitHub |
| [EFI-ASUS-ROG-Strix-B760-F-Gaming](https://github.com/ReinierTutoriales/EFI-ASUS-ROG-Strix-B760-F-Gaming) | 2023-11-18 | Repositorio no marcado como fork | Listado completo de GitHub |

## Cambios de arquitectura

El sitio conserva HTML estático servido por GitHub Pages desde la raíz. Añadir React, Next.js o un servidor no resuelve una necesidad de este portfolio y añadiría dependencias y JavaScript al visitante. Se usa Node.js 24 exclusivamente para generación reproducible y comprobaciones, sin dependencias npm.

Contenido y plantilla se separan de la salida. CI detecta si un cambio de catálogo no se ha regenerado. Las acciones oficiales están fijadas por SHA, con versiones verificadas en sus etiquetas el 16/10/2026 y actualizaciones mediante Dependabot. El workflow valida, no reemplaza el despliegue existente de Pages.

Se eliminan fuentes externas, observadores de revelado, bucles de animación, seguimiento de puntero, fondos desenfocados y menú modal. La navegación queda disponible sin JS. Los filtros son mejora progresiva: sin JS se ven todos los proyectos. Con teclado se activan como botones nativos, anuncian el resultado y conservan el foco. Los enlaces externos usan la misma pestaña para no abrir contextos sin avisar.

Se conservan el logo y todos los destinos sociales originales. Se añaden descripción y Open Graph acordes al nuevo enfoque, URL canónica, robots.txt, sitemap y una página 404 recuperable. CSP restringe recursos y conexiones al contexto estático; no se presentan sus directivas meta como equivalentes a todas las cabeceras de servidor.

## Verificación y límites

- `npm run check`: generación exacta, sintaxis JS, enlaces internos y recursos locales, catálogo, escape de HTML, filtros y presupuesto de código.
- Imagen real de VelocityCopy convertida a WebP; dimensiones intrínsecas comprobadas (461 × 176). No se inventa una captura ni se interpretan sus cifras como rendimiento medido.
- CSS con rejillas adaptables, tamaños relativos, foco visible y desplazamiento suave solo si no se solicita reducir movimiento.
- Sin medición de Core Web Vitals, Lighthouse ni comprobación visual en navegador en este entorno. Los tests de filtro usan un DOM simulado; no equivalen a una prueba de accesibilidad con lector de pantalla.
- La selección es una revisión editorial fechada; no afirma mostrar el estado de GitHub en tiempo real.

## Referencias oficiales

- [GitHub Pages: fuente de publicación](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [GitHub Pages: workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [CSP en MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP)
- [Reducción de movimiento en W3C](https://www.w3.org/WAI/WCAG21/Techniques/client-side-script/SCR40)
- [Repositorio oficial de checkout](https://github.com/actions/checkout)
- [Repositorio oficial de setup-node](https://github.com/actions/setup-node)
