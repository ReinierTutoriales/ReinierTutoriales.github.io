'use strict';

const controls = document.querySelector('#filters');
const projects = [...document.querySelectorAll('[data-category]')];
const status = document.querySelector('#filter-status');

if (controls && status && projects.length) {
  controls.addEventListener('click', event => {
    const button = event.target.closest('button[data-filter]');
    if (!button || !controls.contains(button)) return;
    const selected = button.dataset.filter;
    for (const control of controls.querySelectorAll('button')) {
      control.setAttribute('aria-pressed', String(control === button));
    }
    let count = 0;
    for (const project of projects) {
      project.hidden = selected !== 'all' && project.dataset.category !== selected;
      if (!project.hidden) count++;
    }
    status.textContent = `${count} proyectos: ${button.textContent}.`;
  });
  controls.hidden = false;
}
const year = document.querySelector('#year');
if (year) year.textContent = String(new Date().getFullYear());
