// js/render-projects.js — clones <template id="project-card">, fills slots from projects array,
// appends one card to #cs-projects-grid (section==='cs') or #math-projects-grid (section==='math').
// Per D-13: NEVER reads or renders p.coauthors. Per D-06: NEVER renders p.links.repo or p.links.paper
// on the card surface. Card body is purely: chip / title / oneLiner / meta-line / techChips.

import { projects } from './projects-data.js';

// UI-SPEC §Projects section — closed-set chip labels.
function chipLabel(p) {
  switch (p.type) {
    case 'research':      return 'Research';
    case 'class project': return `Class project · ${p.course}`;
    case 'hackathon':     return `Hackathon · ${p.affiliation}`;
    case 'survey':        return `Survey paper · ${p.course}`;
    default:              return '';
  }
}

// UI-SPEC §Projects section — D-13 name suppression: render scale (groupSize) without names.
function metaLine(p) {
  switch (p.role) {
    case 'solo':            return 'Solo project';
    case 'co-authored':     return `Co-authored · ${p.groupSize}-person team`;
    case 'group':           return `Group project · ${p.groupSize}-person team`;
    case 'hackathon-team':  return `Hackathon team · ${p.groupSize}-person team`;
    default:                return '';
  }
}

export function renderProjects(root = document) {
  const tpl = root.querySelector('#project-card');
  if (!tpl) return;
  const csGrid   = root.querySelector('#cs-projects-grid');
  const mathGrid = root.querySelector('#math-projects-grid');
  if (!csGrid || !mathGrid) return;

  for (const p of projects) {
    const node = tpl.content.firstElementChild.cloneNode(true);

    node.querySelector('.card__chip').textContent    = chipLabel(p);
    node.querySelector('.card__link').setAttribute('href', p.detailPage);
    // Provide an accessible name for the link since the heading is a sibling, not a child.
    node.querySelector('.card__link').setAttribute('aria-label', p.title);
    node.querySelector('.card__title').textContent   = p.title;
    node.querySelector('.card__teaser').textContent  = p.oneLiner;
    node.querySelector('.card__meta').textContent    = metaLine(p);

    const tagList = node.querySelector('.tag-list');
    for (const tag of p.techChips) {
      const li = document.createElement('li');
      li.className = 'tag';
      li.textContent = tag;
      tagList.appendChild(li);
    }

    (p.section === 'cs' ? csGrid : mathGrid).appendChild(node);
  }
}
