export type GuideContent = { intro:string; requirements:string[]; reviewedAt:string; sections:{id:string;title:string;paragraphs:string[];code?:string}[]; problems:string[][]; related:{label:string;path:string}[]; sources:{label:string;url:string}[] };
export const guideContent: Record<string, GuideContent> = {
  "mapear-usb-desde-windows": {
    "intro": "Este procedimiento prepara un mapa específico para tu equipo desde Windows y después lo incorpora a OpenCore. El mapa determina qué puertos utiliza macOS; una EFI o un mapa de otro ordenador no sustituye la identificación de tu hardware.",
    "requirements": [
      "Windows 10 u 11 de 64 bits y controladores USB funcionando.",
      "Acceso físico a los puertos, un dispositivo USB 2 y otro USB 3; si hay USB-C, prueba ambas orientaciones.",
      "USBToolBox descargado de su proyecto oficial y una copia recuperable de tu EFI antes de modificarla."
    ],
    "sections": [
      {
        "id": "descubrir",
        "title": "1. Identificar los puertos en Windows",
        "paragraphs": [
          "Abre Windows.exe de USBToolBox. En C (configuración), revisa los nombres de tipos, los comentarios y la vinculación de puertos compañeros; después vuelve al menú y entra en D (descubrimiento).",
          "Recorre los conectores del equipo con los dispositivos de prueba. Comprueba USB 2 y USB 3, los conectores delanteros y traseros y las dos posiciones de USB-C. Incluye los dispositivos internos que utilices, como Bluetooth. Anota la correspondencia entre número y ubicación física."
        ]
      },
      {
        "id": "seleccionar",
        "title": "2. Seleccionar y generar el mapa",
        "paragraphs": [
          "En S, selecciona los puertos que necesitas y respeta el máximo de 15 puertos por controlador. Las personalidades USB 2 y USB 3 de un mismo conector pueden ocupar entradas distintas. Revisa la selección; no basta con contar conectores físicos.",
          "Comprueba los tipos: 0 corresponde a USB 2 Type-A, 3 a USB 3 Type-A y 255 a conexiones internas. USB-C tiene tipos diferentes según su comportamiento al girar el conector: consulta TYPES.md antes de asignarlos.",
          "Añade comentarios que identifiquen cada puerto y pulsa K para generar UTBMap.kext. Conserva el mapa y tus notas junto a la documentación del equipo."
        ]
      },
      {
        "id": "integrar",
        "title": "3. Incorporarlo a OpenCore",
        "paragraphs": [
          "Trabaja sobre una copia de la EFI que puedas probar y conserva una vía de arranque recuperable. Añade USBToolBox.kext y el UTBMap.kext generado en EFI/OC/Kexts. Actualiza Kernel → Add en config.plist, cargando USBToolBox antes del mapa.",
          "Para este flujo de mapeo previo desde Windows, UTBDefault.kext no se mantiene junto al mapa terminado. Revisa los inyectores o mapas anteriores para evitar que compitan y sigue la documentación de tu configuración al retirarlos.",
          "Revisa XhciPortLimit y los ajustes ACPI relacionados con USB según la guía completa. USBToolBox puede sustituir la función de SSDT-RHUB; no acumules cambios USB sin comprobar qué hace cada uno."
        ]
      },
      {
        "id": "comprobar",
        "title": "4. Comprobar en macOS",
        "paragraphs": [
          "Después de arrancar con la EFI de prueba, comprueba los dispositivos en Información del Sistema → USB. Prueba cada puerto seleccionado, los dispositivos internos y el reposo y despertar. Un arranque correcto por sí solo no valida el mapa.",
          "Si falla un puerto, compara su ubicación física con tus notas de descubrimiento y con el mapa generado. Si la nueva EFI impide arrancar o usar el teclado, vuelve a la copia recuperable antes de continuar."
        ]
      }
    ],
    "problems": [
      [
        "El mapa no parece aplicarse",
        "Comprueba las entradas habilitadas de Kernel → Add, sus rutas y el orden de carga. Revisa mapas o inyectores anteriores."
      ],
      [
        "Falta Bluetooth",
        "Comprueba que su puerto interno fue identificado e incluido; revisa el tipo de conexión. No asumas que todo fallo de Bluetooth es un problema de mapeo."
      ],
      [
        "USB-C funciona solo en una posición",
        "Repite el descubrimiento en ambas orientaciones y contrasta el tipo con TYPES.md."
      ]
    ],
    "related": [
      {
        "label": "Herramientas para editar la configuración",
        "path": "/herramientas/"
      },
      {
        "label": "Recursos de macOS",
        "path": "/sistemas/macos/"
      }
    ],
    "sources": [
      {
        "label": "Guía completa y capturas de ReinierTutoriales",
        "url": "https://github.com/ReinierTutoriales/Mapear-puertos-USB-para-macOS-con-USBToolBox-desde-Windows/blob/d41d09356ab4b4f5132dd4206f7adadcde092caa/README.md"
      },
      {
        "label": "USBToolBox: herramienta oficial",
        "url": "https://github.com/USBToolBox/tool"
      },
      {
        "label": "USBToolBox: kext y flujo de integración",
        "url": "https://github.com/USBToolBox/kext"
      },
      {
        "label": "Tipos de conector oficiales",
        "url": "https://github.com/USBToolBox/tool/blob/master/TYPES.md"
      }
    ],
    "reviewedAt": "2026-10-16"
  },
  "descargas-reanudables-w11downloaderpro": {
    "intro": "W11DownloaderPro es una herramienta de consola para descargar archivos HTTP o HTTPS. Esta guía explica el flujo documentado del motor; consulta las notas del paquete que utilices, porque una versión preliminar puede diferir del código en desarrollo.",
    "requirements": [
      "Windows 11 y acceso al ejecutable según las instrucciones del proyecto.",
      "Una URL de archivo HTTP o HTTPS y una ruta de salida con espacio suficiente.",
      "Para verificar integridad: el SHA-256 esperado publicado por la fuente del archivo."
    ],
    "sections": [
      {
        "id": "iniciar",
        "title": "1. Indicar la URL y la salida",
        "paragraphs": [
          "Abre una terminal en la ubicación del ejecutable. El README documenta esta sintaxis; URL, RUTA_DE_SALIDA y HASH_SHA256 son valores que debes sustituir, no direcciones o hashes listos para usar."
        ],
        "code": "w11dl <URL> [-o salida] [-c conexiones] [--max-chunk bytes] [--sha256 hex]"
      },
      {
        "id": "reanudar",
        "title": "2. Conservar el estado para reanudar",
        "paragraphs": [
          "El motor usa fragmentos cuando el servidor admite rangos HTTP. Si el servidor no atiende esos rangos, el flujo documentado utiliza una sola conexión y no permite reanudar. Más conexiones no garantizan más velocidad: también intervienen el servidor, la red y el almacenamiento.",
          "Si se interrumpe una descarga compatible, conserva sus archivos parciales y el estado <salida>.part.state. Repite el comando con la misma salida siguiendo el README; no modifiques el estado manualmente ni combines datos parciales de archivos diferentes."
        ]
      },
      {
        "id": "verificar",
        "title": "3. Comprobar el SHA-256 cuando tengas el esperado",
        "paragraphs": [
          "Utiliza --sha256 con el valor esperado de 64 caracteres hexadecimales proporcionado por la fuente. El hash calculado del propio archivo descargado, sin un valor esperado independiente, no demuestra que sea el archivo correcto.",
          "Según el flujo documentado, el archivo final aparece al completarse la descarga y, si se indicó --sha256, después de verificarlo. Sin esa opción, una descarga completada no equivale a una comprobación contra un hash esperado."
        ]
      },
      {
        "id": "revisar",
        "title": "4. Revisar el resultado o el error",
        "paragraphs": [
          "Comprueba el resultado del comando y la ruta final antes de utilizar el archivo. Si hay un error de integridad, revisa la URL y el hash de referencia antes de iniciar otra descarga. No presentes un archivo parcial como terminado.",
          "Para comunicar un fallo, indica la versión utilizada, el comando sin credenciales ni tokens, el mensaje de error y si el servidor admite rangos. Evita publicar enlaces privados de descarga."
        ]
      }
    ],
    "problems": [
      [
        "No reanuda",
        "Comprueba que el servidor admite rangos, que conservas el estado y que repites una operación compatible con la misma salida."
      ],
      [
        "Falla SHA-256",
        "Contrasta el hash esperado con la fuente y confirma que corresponde exactamente al archivo y versión solicitados."
      ],
      [
        "No aparece el archivo final",
        "Comprueba si la operación sigue en curso o terminó con un error; consulta el estado parcial sin renombrarlo como archivo final."
      ]
    ],
    "related": [
      {
        "label": "Funciones y alcance de W11DownloaderPro",
        "path": "/aplicaciones/w11downloaderpro/"
      },
      {
        "label": "Aplicaciones para Windows",
        "path": "/sistemas/windows/"
      }
    ],
    "sources": [
      {
        "label": "Uso y límites documentados del motor",
        "url": "https://github.com/ReinierTutoriales/W11DownloaderPro/blob/b12835bd277b634e5408c819aa6cc71859e02bb0/README.md"
      }
    ],
    "reviewedAt": "2026-10-16"
  }
};
