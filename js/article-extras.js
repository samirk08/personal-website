// js/article-extras.js — small enhancements for /projects/<slug>/ detail pages:
//   1. Reading-time estimate injected into the article-header meta row.
//   2. Prev/next project pagination appended to .article-body, ordered by the
//      projects array in projects-data.js (the same order as the /projects grid).
// No-ops on every page that doesn't have an .article element.

import { projects } from './projects-data.js';

const WORDS_PER_MINUTE = 220;

function injectReadingTime() {
  const article = document.querySelector('.article');
  const meta = document.querySelector('.article-header__meta');
  if (!article || !meta) return;

  const words = (article.textContent.match(/\S+/g) || []).length;
  const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE));

  const sep = document.createElement('span');
  sep.className = 'm-item__meta-sep';
  sep.setAttribute('aria-hidden', 'true');
  sep.textContent = '·';

  const chip = document.createElement('span');
  chip.className = 'article-header__reading';
  chip.textContent = `${minutes} min read`;

  meta.append(sep, chip);
}

function injectPagenav() {
  const body = document.querySelector('.article-body');
  if (!body) return;

  // Normalize "/projects/slug/" and "/projects/slug" to the same key.
  const path = location.pathname.replace(/\/?$/, '/');
  const index = projects.findIndex((p) => p.detailPage === path);
  if (index === -1) return;

  const prev = projects[index - 1];
  const next = projects[index + 1];
  if (!prev && !next) return;

  const nav = document.createElement('nav');
  nav.className = 'article-pagenav';
  nav.setAttribute('aria-label', 'More projects');

  const makeLink = (project, dir) => {
    const a = document.createElement('a');
    a.className = `article-pagenav__link article-pagenav__link--${dir}`;
    a.href = project.detailPage;
    const label = document.createElement('span');
    label.className = 'article-pagenav__dir';
    label.textContent = dir === 'prev' ? '← Previous project' : 'Next project →';
    const title = document.createElement('span');
    title.className = 'article-pagenav__title';
    title.textContent = project.title;
    a.append(label, title);
    return a;
  };

  if (prev) nav.appendChild(makeLink(prev, 'prev'));
  if (next) nav.appendChild(makeLink(next, 'next'));
  body.appendChild(nav);
}

export function initArticleExtras() {
  injectReadingTime();
  injectPagenav();
}
