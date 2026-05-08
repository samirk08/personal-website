// js/main.js — orchestrator. Imports renderProjects + initAnimations, runs on DOMContentLoaded.
// Cards must be rendered BEFORE animations are initialized so the IntersectionObserver
// picks up the .reveal class on each card. Order matters.

import { renderProjects } from './render-projects.js';
import { initAnimations } from './animations.js';
import { initNav } from './nav.js';
import { initArticleToc } from './article-toc.js';
import { initProjectFilter } from './project-filter.js';
import { initExperienceAccordion } from './experience-accordion.js';

function start() {
  initNav();                  // Hamburger toggle for persistent .site-nav
  renderProjects();           // Populate #cs-projects-grid + #math-projects-grid from projects-data.js
  initProjectFilter();        // /projects All|CS|Math pill filter + URL-hash routing (no-op elsewhere)
  initAnimations();           // Observe .reveal elements, trigger hero entrance
  initArticleToc();           // Scroll-spy for left-rail TOC on /projects/<slug>/ pages
  initExperienceAccordion();  // Expandable role cards on /experience
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start, { once: true });
} else {
  start();
}
