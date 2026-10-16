import type { ProjectRepo } from './project-details.js';
export type Editorial = { task: string; status: string; requirements: string[]; start: string[]; reviewedAt: string; sources: {label:string;url:string}[]; release: {url:string;tag:string;prerelease:boolean} | null };
export const projectEditorial: Record<ProjectRepo, Editorial> = {
  "VelocityCopy": {
    "task": "Copiar o mover archivos y gestionar la cola.",
    "status": "Con instaladores publicados",
    "requirements": [
      "Windows 11.",
      "Instalador x64 o ARM64 según el procesador."
    ],
    "start": [
      "Consulta la publicación y elige la arquitectura de tu equipo.",
      "Instala y abre VelocityCopy. Empieza con una copia pequeña para comprobar origen, destino y conflictos.",
      "Consulta el progreso y la cola; usa pausa o reanudación cuando lo necesites."
    ],
    "reviewedAt": "2026-10-16",
    "sources": [
      {
        "label": "README revisado",
        "url": "https://github.com/ReinierTutoriales/VelocityCopy/blob/38def1c3b682ba5117952aa7ce14d6a1025d9bb6/README.md"
      }
    ],
    "release": {
      "url": "https://github.com/ReinierTutoriales/VelocityCopy/releases/tag/v1.3.0",
      "tag": "v1.3.0",
      "prerelease": false
    }
  },
  "disk-duplicator": {
    "task": "Repartir los mismos archivos a varios destinos.",
    "status": "Con paquete publicado",
    "requirements": [
      "Windows 10 2004 (19041) o posterior, x64.",
      "Espacio suficiente en cada destino para los archivos seleccionados."
    ],
    "start": [
      "Obtén el ZIP de RepartoCopier y extrae su ejecutable autocontenido.",
      "Selecciona el origen y los destinos. Revisa las rutas antes de comenzar.",
      "Decide si necesitas «Verificar contenido al terminar». La comprobación relee los archivos escritos y añade tiempo a la tarea."
    ],
    "reviewedAt": "2026-10-16",
    "sources": [
      {
        "label": "README revisado",
        "url": "https://github.com/ReinierTutoriales/disk-duplicator/blob/a5da5a226a94ee8e0ba44a9bce134a33dd4ceb99/README.md"
      }
    ],
    "release": {
      "url": "https://github.com/ReinierTutoriales/disk-duplicator/releases/tag/v2.2.3",
      "tag": "v2.2.3",
      "prerelease": false
    }
  },
  "nfdnsvpn": {
    "task": "Filtrar dominios y gestionar conexiones en la TV.",
    "status": "En desarrollo; distribución por Actions",
    "requirements": [
      "Android TV o Google TV con permiso para una VPN local.",
      "Android 10 o posterior para las opciones de vigilancia por aplicación documentadas."
    ],
    "start": [
      "Sigue las instrucciones del README para obtener el APK desde una ejecución correcta de Actions. GitHub puede pedir iniciar sesión para descargar artefactos.",
      "Instala y abre NF DNS VPN. Pulsa el botón principal y concede el permiso de VPN de Android.",
      "Consulta el estado. Para ajustar proveedores, listas o aplicaciones, entra en Opciones; los cambios pendientes se aplican desde esa pantalla."
    ],
    "reviewedAt": "2026-10-16",
    "sources": [
      {
        "label": "README revisado",
        "url": "https://github.com/ReinierTutoriales/nfdnsvpn/blob/2702fbb23ea64d888fc6f49019e3df479b242be5/README.md"
      }
    ],
    "release": null
  },
  "VireoLumaTV-browser": {
    "task": "Navegar por páginas web con el mando del televisor.",
    "status": "Con APK publicado",
    "requirements": [
      "Android TV con mando y motor WebView disponible.",
      "Revisa la publicación para comprobar compatibilidad e instrucciones del APK."
    ],
    "start": [
      "Consulta el APK y las notas de la publicación antes de instalar.",
      "Abre el navegador y utiliza la barra de dirección o búsqueda con el mando.",
      "Prueba la página que necesitas. La compatibilidad de vídeo depende también de WebView, la web y el dispositivo."
    ],
    "reviewedAt": "2026-10-16",
    "sources": [
      {
        "label": "README revisado",
        "url": "https://github.com/ReinierTutoriales/VireoLumaTV-browser/blob/096b603505c19f0ec5c8852fa83fb331652e0c99/README.md"
      }
    ],
    "release": {
      "url": "https://github.com/ReinierTutoriales/VireoLumaTV-browser/releases/tag/v1.1.0",
      "tag": "v1.1.0",
      "prerelease": false
    }
  },
  "W11DownloaderPro": {
    "task": "Descargar archivos HTTP/HTTPS desde la consola.",
    "status": "Versión preliminar publicada",
    "requirements": [
      "Windows 11 para el uso documentado.",
      "Una URL HTTP/HTTPS; la reanudación necesita soporte del servidor.",
      "Hash SHA-256 esperado si quieres comprobar la integridad."
    ],
    "start": [
      "Consulta las instrucciones y la versión preliminar: sus funciones pueden diferir del código en desarrollo.",
      "Desde una terminal, indica la URL y el archivo de salida con la sintaxis del README.",
      "Para reanudar, conserva el estado parcial y repite el comando compatible. Consulta la guía de descargas para conocer sus límites."
    ],
    "reviewedAt": "2026-10-16",
    "sources": [
      {
        "label": "README revisado",
        "url": "https://github.com/ReinierTutoriales/W11DownloaderPro/blob/b12835bd277b634e5408c819aa6cc71859e02bb0/README.md"
      }
    ],
    "release": {
      "url": "https://github.com/ReinierTutoriales/W11DownloaderPro/releases/tag/v0.0.1",
      "tag": "v0.0.1",
      "prerelease": true
    }
  },
  "ColorFix": {
    "task": "Investigar el modo oscuro en aplicaciones Win32.",
    "status": "Prototipo experimental",
    "requirements": [
      "Windows 11; consulta las arquitecturas y etapas de validación del README.",
      "Windhawk para la validación inicial; no hay un instalador general verificado."
    ],
    "start": [
      "Lee el alcance del prototipo y la documentación de Windhawk del repositorio.",
      "Consulta las instrucciones de compilación y validación para tu arquitectura.",
      "Trátalo como un proyecto de investigación: no se presenta como una solución universal para todas las aplicaciones."
    ],
    "reviewedAt": "2026-10-16",
    "sources": [
      {
        "label": "README revisado",
        "url": "https://github.com/ReinierTutoriales/ColorFix/blob/b30a1e4a09fd66cbca088356ee4588f60fbaf84c/README.md"
      }
    ],
    "release": null
  }
};
