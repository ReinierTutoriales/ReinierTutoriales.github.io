import { projects, projectPath } from '#lib/catalog.js';
import { projectEditorial } from '#lib/project-editorial.server.js';
import type { ProjectRepo } from '#lib/project-details.js';
export function load() {
  return { comparison: projects.map(project => {
    const editorial = projectEditorial[project.repo as ProjectRepo];
    return { name:project.name, path:projectPath(project.repo), platform:project.platform, task:editorial.task, status:editorial.status };
  }) };
}
