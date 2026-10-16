import { error } from '@sveltejs/kit';
import { projects, projectPath } from '#lib/catalog.js';
import { projectDetails } from '#lib/project-details.server.js';
import type { ProjectRepo } from '#lib/project-paths.js';
import { projectEditorial } from '#lib/project-editorial.server.js';
export const entries = () => Object.values(projectDetails).map(project => ({ slug: project.slug }));
export function load({ params }: { params: { slug: string } }) {
  const entry = Object.entries(projectDetails).find(([,detail]) => detail.slug === params.slug);
  if (!entry) error(404,'Aplicación no encontrada');
  const [repo,detail] = entry;
  const project = projects.find(project => project.repo === repo);
  if (!project) error(404,'Proyecto no encontrado');
  const related = projects.filter(p => p.category === project.category && p.repo !== repo).slice(0,2).map(p => ({name:p.name,path:projectPath(p.repo)}));
  return {project, detail:projectDetails[repo as ProjectRepo], editorial:projectEditorial[repo as ProjectRepo], related};
}
