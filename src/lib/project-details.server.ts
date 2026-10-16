import { projectSlugs } from './project-paths.js';
export const projectDetails = {
  VelocityCopy: {
    slug: projectSlugs["VelocityCopy"], seoTitle: 'VelocityCopy: copia de archivos en Windows', title: 'VelocityCopy: copia y movimiento de archivos para Windows 11',
    description: 'Conoce VelocityCopy para Windows 11: cola de transferencias, pausa, reanudación, gestión de conflictos y recuperación del trabajo pendiente.',
    use: 'Para copiar o mover archivos y carpetas desde una interfaz de escritorio, siguiendo la cola y el progreso de cada transferencia.',
    features: ['Consultar archivos transferidos, velocidad y progreso.', 'Pausar, reanudar, saltar archivos o cancelar una transferencia.', 'Organizar tareas y resolver conflictos cuando ya existe un archivo en el destino.'],
    scope: 'Está pensado para Windows 11. La integración de pegado del Explorador se limita a carpetas compatibles del sistema de archivos; las ubicaciones virtuales pueden tener otro comportamiento.'
  },
  'disk-duplicator': {
    slug: projectSlugs["disk-duplicator"], seoTitle: 'RepartoCopier: copia a varios destinos', title: 'RepartoCopier: copia de archivos a varios destinos en Windows',
    description: 'RepartoCopier copia un origen a varios destinos en Windows. Consulta su enfoque FAN-OUT, recuperación y verificación opcional de contenido.',
    use: 'Para distribuir los mismos archivos y carpetas a varios destinos sin preparar una tarea manual por cada uno.',
    features: ['Copiar un origen hacia múltiples destinos simultáneamente.', 'Preservar la estructura de carpetas y recuperar trabajo pendiente.', 'Activar la verificación final de contenido cuando la tarea lo requiera.'],
    scope: 'El repositorio se llama disk-duplicator, pero el producto actual es RepartoCopier y trabaja con archivos y carpetas. La verificación final es opcional: terminar una copia y verificar su contenido son estados distintos.'
  },
  nfdnsvpn: {
    slug: projectSlugs["nfdnsvpn"], seoTitle: 'NF DNS VPN: filtrado y DNS cifrado para TV', title: 'NF DNS VPN: filtrado local y DNS cifrado para Android TV',
    description: 'NF DNS VPN filtra dominios de anuncios y rastreadores mediante una VPN local en Android TV y Google TV, con DNS cifrado y opciones por aplicación.',
    use: 'Para gestionar el filtrado de dominios y conexiones desde el propio televisor, usando una VPN local.',
    features: ['Filtrar dominios de anuncios y rastreadores en el dispositivo.', 'Utilizar DNS cifrado con los proveedores configurados.', 'Gestionar listas, dominios permitidos y opciones de aplicaciones.'],
    scope: 'Es una VPN local de filtrado. Los modos ligero y completo tienen distinto alcance. El README mantiene pendiente la medición de rendimiento en TV; los resultados de PC no describen el rendimiento de un televisor concreto.'
  },
  'VireoLumaTV-browser': {
    slug: projectSlugs["VireoLumaTV-browser"], seoTitle: 'VireoLumaTV: navegador para Android TV', title: 'VireoLumaTV: navegador WebView con mando para Android TV',
    description: 'Explora VireoLumaTV, navegador para Android TV basado en WebView y TV Bro, con navegación por mando, pestañas, marcadores y gestor de descargas.',
    use: 'Para navegar desde Android TV con el mando y mantener pestañas, marcadores e historial.',
    features: ['Navegar con el mando del televisor.', 'Organizar pestañas y marcadores y consultar el historial.', 'Usar búsqueda por voz y el gestor de descargas de la aplicación.'],
    scope: 'Es un proyecto derivado de TV Bro y conserva la atribución al original. Utiliza WebView, por lo que la compatibilidad con páginas y vídeo también depende del motor web y del dispositivo.'
  },
  W11DownloaderPro: {
    slug: projectSlugs["W11DownloaderPro"], seoTitle: 'W11DownloaderPro: descargas HTTP y HTTPS', title: 'W11DownloaderPro: motor de descargas HTTP y HTTPS para Windows',
    description: 'W11DownloaderPro es un motor de descargas en Rust para Windows con rangos HTTP, reanudación y comprobación SHA-256. Consulta su uso y sus límites.',
    use: 'Para descargar archivos HTTP o HTTPS desde una herramienta de línea de comandos y controlar la salida y la comprobación del archivo.',
    features: ['Repartir una descarga en fragmentos cuando el servidor admite rangos.', 'Reanudar desde el estado guardado en las condiciones compatibles.', 'Comprobar SHA-256 cuando se proporciona el hash esperado.'],
    scope: 'Está en desarrollo. Si el servidor no admite rangos, utiliza un solo flujo sin reanudación. La verificación SHA-256 requiere indicar el hash esperado; no se debe interpretar cualquier descarga terminada como una verificación de procedencia.'
  },
  ColorFix: {
    slug: projectSlugs["ColorFix"], seoTitle: 'ColorFix: modo oscuro experimental para Win32', title: 'ColorFix: proyecto experimental de modo oscuro para Win32',
    description: 'ColorFix explora el modo oscuro en aplicaciones clásicas de Windows 11 mediante colores del sistema y GDI. Consulta el alcance del prototipo.',
    use: 'Para investigar cómo aplicar una política de colores a aplicaciones clásicas de Windows dentro del alcance documentado por el proyecto.',
    features: ['Explorar colores semánticos del sistema en aplicaciones Win32.', 'Compartir la política de color entre el núcleo y las pruebas.', 'Validar el comportamiento inicial mediante Windhawk.'],
    scope: 'Es experimental. La fase inicial se centra en colores del sistema y GDI clásico; no representa compatibilidad universal con todas las aplicaciones ni todos los motores gráficos de Windows.'
  }
};

