export const guides = [
  {
    "slug": "mapear-usb-desde-windows",
    "label": "Mapeo USB desde Windows",
    "seoTitle": "Mapeo USB para macOS desde Windows",
    "publishedAt": "2026-10-16",
    "modifiedAt": "2026-10-16",
    "title": "Mapear puertos USB para macOS desde Windows con USBToolBox",
    "description": "Prepara un mapa USB con USBToolBox desde Windows: requisitos, descubrimiento de puertos, integración en OpenCore y comprobaciones en macOS.",
    "summary": "Identifica los puertos del equipo, genera UTBMap y comprueba su funcionamiento en macOS.",
    "sourceRepo": "Mapear-puertos-USB-para-macOS-con-USBToolBox-desde-Windows",
    "system": "macos"
  },
  {
    "slug": "descargas-reanudables-w11downloaderpro",
    "label": "Descargas reanudables",
    "seoTitle": "W11DownloaderPro: cómo reanudar descargas",
    "publishedAt": "2026-10-16",
    "modifiedAt": "2026-10-16",
    "title": "Descargar y reanudar archivos con W11DownloaderPro en Windows",
    "description": "Aprende el flujo de W11DownloaderPro: URL y salida, soporte de rangos HTTP, conservación del estado parcial y comprobación SHA-256 con un hash esperado.",
    "summary": "Entiende cómo iniciar una descarga, conservar el estado parcial y comprobar el archivo con un hash esperado.",
    "sourceRepo": "W11DownloaderPro",
    "system": "windows"
  }
];
export const guidePath = (slug: string) => `/guias/${slug}/`;
