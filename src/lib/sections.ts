export { siteSections } from './navigation.js';
export const systems = [
  { slug: 'windows', name: 'Windows', summary: 'Copia de archivos, descargas y personalización del escritorio.', description: 'Aplicaciones para trabajar con tus archivos y utilidades para preparar medios y configurar el equipo. Cada proyecto documenta las versiones de Windows que admite.', projectCategory: 'windows' },
  { slug: 'macos', name: 'macOS', summary: 'Instalación, OpenCore y compatibilidad de hardware.', description: 'Configuraciones y documentación para Mac y equipos Hackintosh. Encuentra recursos de conectividad, mapeo USB y herramientas para trabajar con OpenCore.', projectCategory: '' },
  { slug: 'linux', name: 'Linux', summary: 'Herramientas multiplataforma y documentación de sistema.', description: 'Utilidades que ofrecen soporte para Linux desde sus proyectos originales. Consulta sus requisitos e instrucciones para tu distribución.', projectCategory: '' },
  { slug: 'android-tv', name: 'Android TV', summary: 'Navegación con mando y filtrado local de conexiones.', description: 'Proyectos pensados para el televisor: un navegador basado en WebView y una VPN local para filtrar dominios y gestionar conexiones.', projectCategory: 'android' }
];
export const tools = [
  { name: 'ProperTree', summary: 'Editor gráfico de archivos plist, escrito en Python y disponible para varias plataformas.', systems: ['windows','macos','linux'], url: 'https://github.com/corpnewt/ProperTree', author: 'corpnewt', purpose: 'Configuración' },
  { name: 'OCAuxiliaryTools', summary: 'Herramientas gráficas multiplataforma para gestionar configuraciones de OpenCore.', systems: ['windows','macos','linux'], url: 'https://github.com/ic005k/OCAuxiliaryTools', author: 'ic005k', purpose: 'OpenCore' },
  { name: 'WinDiskWriter', summary: 'Utilidad para crear medios USB de instalación de Windows desde macOS.', systems: ['macos'], url: 'https://github.com/TechUnRestricted/WinDiskWriter', author: 'TechUnRestricted', purpose: 'Medios USB' }
];
