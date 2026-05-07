// js/main.js — orchestrator. Imports renderProjects + initAnimations, runs on DOMContentLoaded.
// Cards must be rendered BEFORE animations are initialized so the IntersectionObserver
// picks up the .reveal class on each card. Order matters.

import { renderProjects } from './render-projects.js';
import { initAnimations } from './animations.js';
import { initNav } from './nav.js';
import { initArticleToc } from './article-toc.js';

function start() {
  initNav();          // Hamburger toggle for persistent .site-nav
  renderProjects();   // Populate #cs-projects-grid + #math-projects-grid from projects-data.js
  initAnimations();   // Observe .reveal elements, trigger hero entrance
  initArticleToc();   // Scroll-spy for left-rail TOC on /projects/<slug>/ pages
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start, { once: true });
} else {
  start();
}
