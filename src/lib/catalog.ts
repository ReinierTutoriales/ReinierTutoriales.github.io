import { projectDetails, type ProjectRepo } from './project-details.js';
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
export const repositoryUrl = (repo: string) => `https://github.com/ReinierTutoriales/${repo}`;

export const projectPath = (repo: string) => `/aplicaciones/${projectDetails[repo as ProjectRepo].slug}/`;
