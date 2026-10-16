import { systems, siteSections } from './sections.js';
import { projectDetails } from './project-details.js';
export const SITE_ORIGIN = 'https://reiniertutoriales.github.io';
export const SITE_NAME = 'ReinierTutoriales';
export type Crumb = { name: string; path: string };
export type SeoPage = { path: string; title: string; description: string; label: string; parent?: Crumb };
export const publicPages: SeoPage[] = [
  { path:'/', label:'Inicio', title:'Aplicaciones Windows, Android TV y guías macOS | ReinierTutoriales', description:'Aplicaciones para copiar archivos, descargar y navegar en Windows y Android TV. Guías de macOS, OpenCore y herramientas de sistema de ReinierTutoriales.' },
  { path:'/sistemas/', label:'Sistemas', title:'Recursos para Windows, macOS, Linux y Android TV | ReinierTutoriales', description:'Encuentra aplicaciones, herramientas y documentación por sistema: Windows, macOS, Linux y Android TV. Consulta requisitos y proyectos originales.' },
  { path:'/aplicaciones/', label:'Aplicaciones', title:'Aplicaciones para Windows y Android TV | ReinierTutoriales', description:'Explora VelocityCopy, RepartoCopier, NF DNS VPN, VireoLumaTV, W11DownloaderPro y ColorFix: funciones, plataformas, estado y código de cada proyecto.' },
  { path:'/herramientas/', label:'Herramientas', title:'Herramientas para OpenCore, plist y USB | ReinierTutoriales', description:'Conoce ProperTree, OCAuxiliaryTools y WinDiskWriter: para qué sirven, qué sistemas admiten y dónde consultar sus requisitos en los proyectos oficiales.' },
  { path:'/guias/', label:'Guías', title:'Guías de macOS, OpenCore, Wi-Fi y USB | ReinierTutoriales', description:'Consulta documentación de OpenCore, Intel AX210, Broadcom, mapeo USB y configuraciones EFI para hardware Intel y AMD en ReinierTutoriales.' },
  ...systems.map(system => ({path:`/sistemas/${system.slug}/`,label:system.name,title:`${system.name}: aplicaciones, herramientas y guías | ReinierTutoriales`,description:system.description,parent:{name:'Sistemas',path:'/sistemas/'}})),
  ...Object.values(projectDetails).map(project => ({path:`/aplicaciones/${project.slug}/`,label:project.title.split(':')[0],title:`${project.title} | ReinierTutoriales`,description:project.description,parent:{name:'Aplicaciones',path:'/aplicaciones/'}}))
];
export function pageMetadata(path: string) {
  const page = publicPages.find(page => page.path === path);
  if (!page) throw new Error(`SEO sin configurar: ${path}`);
  const crumbs: Crumb[] = [{name:'Inicio',path:'/'}];
  if (page.parent) crumbs.push(page.parent);
  if (path !== '/') crumbs.push({name:page.label,path});
  return {...page, canonical:SITE_ORIGIN+path, crumbs};
}
export function structuredData(path: string) {
  const page = pageMetadata(path);
  const graph: Record<string,unknown>[] = [
    {'@type':'WebSite','@id':SITE_ORIGIN+'/#website',url:SITE_ORIGIN+'/',name:SITE_NAME,inLanguage:'es',publisher:{'@id':SITE_ORIGIN+'/#author'}},
    {'@type':'Person','@id':SITE_ORIGIN+'/#author',name:'Reinier Lazo',alternateName:SITE_NAME,url:SITE_ORIGIN+'/',sameAs:['https://github.com/ReinierTutoriales','https://youtube.com/c/ReinierTutoriales']},
    {'@type':'WebPage','@id':page.canonical+'#webpage',url:page.canonical,name:page.title,description:page.description,inLanguage:'es',isPartOf:{'@id':SITE_ORIGIN+'/#website'}}
  ];
  if(path!=='/') graph.push({'@type':'BreadcrumbList','@id':page.canonical+'#breadcrumb',itemListElement:page.crumbs.map((crumb,index)=>({'@type':'ListItem',position:index+1,name:crumb.name,item:SITE_ORIGIN+crumb.path}))});
  return {'@context':'https://schema.org','@graph':graph};
}
export const safeJsonLd = (value: unknown) => JSON.stringify(value).replace(/</g,'\\u003c');
