import { projectSlugs, type ProjectRepo } from './project-paths.js';
export const repositoryUrl = (repo: string) => `https://github.com/ReinierTutoriales/${repo}`;

export function projectPath(repo: string) {
  const slug = projectSlugs[repo as ProjectRepo];
  if (!slug) throw new Error(`Proyecto sin ruta: ${repo}`);
  return `/aplicaciones/${slug}/`;
}
