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

## Arquitectura final: SvelteKit

La renovación editorial se integró primero como HTML estático. A petición del propietario, la implementación final utiliza SvelteKit 3.1, Svelte 5.57, Vite 8 y TypeScript 6. Se comprobaron versiones en el registro npm y la documentación oficial vigente el 16/10/2026. TypeScript 7 no es compatible con los peer dependencies de esta combinación; no se fuerza su instalación.

`adapter-static` prerenderiza la web. Se mantienen el diseño, el logo y el contenido revisado. El catálogo es un componente Svelte 5 reactivo con runes. Cabecera, pie y tarjetas son componentes reutilizables. La configuración usa `vite.config.ts`, imports `#lib` declarados en package.json y `$app/tsconfig`.

El contenido principal está en el HTML inicial. Sin JS se ve el catálogo completo; los filtros se muestran cuando Svelte está preparado. No se usa un shell SPA sin contenido ni un servidor Node en producción. No se incorporan fuentes externas, analítica, consultas a GitHub desde el navegador, bucles de animación, seguimiento de puntero ni menú modal.

El workflow instala desde el lockfile, verifica tipos, construye, prueba y publica el artefacto estático. La publicación mediante Actions requiere seleccionar esa fuente una vez en Settings → Pages. El cambio requiere permisos administrativos que no tiene GITHUB_TOKEN; no se intenta elevarlos desde el workflow. El código generado no se versiona. La política CSP se genera con hashes de los scripts de arranque, evitando bloquear la hidratación y evitando `unsafe-inline` o `unsafe-eval`.

## Verificación y límites

- Svelte-check y TypeScript: componentes y configuración.
- Build de producción: prerender, adapter-static y 404 recuperable.
- Pruebas de salida: catálogo completo en HTML, enlaces, activos locales, hashes CSP y presupuesto de bundle.
- Vitest + Testing Library + jsdom: filtros de los componentes Svelte reales, selección, anuncios y restauración del catálogo.
- Imagen real de VelocityCopy convertida a WebP; dimensiones intrínsecas comprobadas (461 × 176). Sus cifras no se usan como rendimiento medido.
- No se ejecutaron Lighthouse, Core Web Vitals ni revisión visual en navegador. Las pruebas de DOM no acreditan apariencia final ni equivalen a un lector de pantalla real.
- La selección es una revisión editorial fechada; no afirma mostrar el estado de GitHub en tiempo real.

## Organización editorial y temas

Se revisó la portada pública y los índices de reiniertutoriales.com el 16/10/2026. La estructura final adopta los ejes Sistemas, Aplicaciones, Herramientas y Guías, con páginas nativas. No importa el foro, sus hilos ni cuentas. Los sistemas se organizan en Windows, macOS, Linux y Android TV. Las utilidades de terceros se enlazan a los repositorios oficiales, conservando autoría y separándolas de los proyectos propios.

La apariencia incorpora selección persistente de Sistema, Claro y Oscuro. El arranque se ejecuta desde un script propio antes de pintar el contenido, sin permitir scripts inline arbitrarios en CSP. El tema sigue cambios de sistema y pestañas. La falta de acceso a localStorage no impide cambiar de tema. CSS ofrece el esquema del sistema cuando JS no está disponible. Se comprueban pares de color de texto con umbral 4.5:1, incluyendo superficies, botones y proyecto destacado; no se presenta como una certificación WCAG integral.

## Referencias oficiales

- [GitHub Pages: fuente de publicación](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [GitHub Pages: workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [CSP en MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP)
- [Reducción de movimiento en W3C](https://www.w3.org/WAI/WCAG21/Techniques/client-side-script/SCR40)
- [Repositorio oficial de checkout](https://github.com/actions/checkout)
- [Repositorio oficial de setup-node](https://github.com/actions/setup-node)

- [SvelteKit: generación estática y GitHub Pages](https://svelte.dev/docs/kit/adapter-static)
- [SvelteKit 3: migración](https://svelte.dev/docs/kit/migrating-to-sveltekit-3)
- [SvelteKit: configuración Vite y CSP](https://svelte.dev/docs/kit/@sveltejs-kit-vite)
- [SvelteKit: configuración TypeScript](https://svelte.dev/docs/kit/$app-tsconfig)

- [ReinierTutoriales: referencia editorial](https://reiniertutoriales.com/)
- [ProperTree: proyecto original](https://github.com/corpnewt/ProperTree)
- [OCAuxiliaryTools: proyecto original](https://github.com/ic005k/OCAuxiliaryTools)
- [WinDiskWriter: proyecto original](https://github.com/TechUnRestricted/WinDiskWriter)
