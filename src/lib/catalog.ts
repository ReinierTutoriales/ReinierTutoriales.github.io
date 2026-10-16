import catalog from './data/projects.json';

export type Project = (typeof catalog.projects)[number];
export type Category = 'all' | 'windows' | 'android';
export const projects = catalog.projects;
export const resources = catalog.resources;
export const categories: { value: Category; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'windows', label: 'Windows' },
  { value: 'android', label: 'Android TV' }
];
export { repositoryUrl, projectPath } from './project-links.js';
