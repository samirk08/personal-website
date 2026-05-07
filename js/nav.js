// js/nav.js — persistent site-nav hamburger toggle (UI-SPEC §C).
// <=40 code lines: aria-expanded flip, Esc-close, outside-click-close.
// aria-current is set in static HTML per page; this module never touches it.

export function initNav(root = document) {
  const header = root.querySelector('header.site-nav');
  if (!header) return;
  const toggle = header.querySelector('.site-nav__toggle');
  const menu = header.querySelector('#site-nav-menu');
  if (!toggle || !menu) return;

  function close() {
    toggle.setAttribute('aria-expanded', 'false');
    header.classList.remove('is-open');
  }
  function open() {
    toggle.setAttribute('aria-expanded', 'true');
    header.classList.add('is-open');
  }

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    if (expanded) close(); else open();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      close();
    }
  });

  document.addEventListener('click', (event) => {
    if (toggle.getAttribute('aria-expanded') !== 'true') return;
    if (!header.contains(event.target)) close();
  });
}
