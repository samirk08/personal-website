// js/project-filter.js — All / CS / Math filter for /projects.
//
// Public surface: initProjectFilter(root = document) — idempotent, safe to call when
// the .project-filter element is absent (it just no-ops, so other pages don't break
// when main.js calls it unconditionally).
//
// Behavior:
//   • Reads the URL hash on init (#cs, #math, #all, or empty) and applies the
//     corresponding filter immediately so deep-linked share URLs work.
//   • Click on a pill button: updates aria-selected / aria-pressed, slides the
//     indicator under the active button, sets data-project-filter on <html>,
//     and pushes the new hash to the URL via history.replaceState (no scroll
//     jump, no extra history entry per click).
//   • Keyboard nav: ArrowLeft/ArrowRight cycle focus AND activation between
//     buttons (typical tablist pattern); Home/End jump to first/last.
//   • prefers-reduced-motion: the CSS transition is gated by the same media
//     query (.project-filter__indicator { transition: ... }), so users with
//     motion preferences off see an instant snap rather than the slide.
//
// Filter values: "all" | "cs" | "math". Anything else (typo'd hash, etc) is
// coerced to "all".

const VALID = new Set(['all', 'cs', 'math']);

function readFilterFromHash() {
  const raw = (window.location.hash || '').replace(/^#/, '').toLowerCase();
  return VALID.has(raw) ? raw : 'all';
}

function writeFilterToHash(filter) {
  // Don't touch the URL for the default state — keeps /projects clean.
  const desired = filter === 'all' ? '' : `#${filter}`;
  if (window.location.hash === desired) return;
  // Use replaceState so we don't pollute history with one entry per pill click.
  const newUrl = `${window.location.pathname}${window.location.search}${desired}`;
  history.replaceState(null, '', newUrl);
}

/**
 * Position the sliding indicator under the active button. Reads layout from the
 * DOM (offsetLeft / offsetWidth) so it stays correct under font-loading shifts
 * and viewport resize.
 */
function moveIndicator(filterEl, activeBtn) {
  const indicator = filterEl.querySelector('.project-filter__indicator');
  if (!indicator || !activeBtn) return;
  // offsetLeft is relative to the offsetParent; .project-filter is `position: relative`
  // so it acts as the offsetParent for both buttons and indicator.
  const x = activeBtn.offsetLeft;
  const w = activeBtn.offsetWidth;
  indicator.style.transform = `translateX(${x}px)`;
  indicator.style.inlineSize = `${w}px`;
}

function applyFilter(filterEl, buttons, filter) {
  // Coerce defensively — `filter` is set from user-controlled URL hash on init.
  const safe = VALID.has(filter) ? filter : 'all';

  document.documentElement.dataset.projectFilter = safe;

  let active = null;
  for (const btn of buttons) {
    const isActive = btn.dataset.filter === safe;
    btn.setAttribute('aria-selected', String(isActive));
    btn.setAttribute('aria-pressed',  String(isActive));
    btn.setAttribute('tabindex',      isActive ? '0' : '-1');
    if (isActive) active = btn;
  }
  moveIndicator(filterEl, active);
}

export function initProjectFilter(root = document) {
  const filterEl = root.querySelector('.project-filter');
  if (!filterEl) return;
  const buttons = Array.from(filterEl.querySelectorAll('.project-filter__btn'));
  if (buttons.length === 0) return;

  // Initial paint — must run AFTER the buttons are laid out so offsetLeft/offsetWidth
  // resolve. main.js calls this on DOMContentLoaded, by which point layout is ready.
  applyFilter(filterEl, buttons, readFilterFromHash());

  // Click → set filter, sync hash.
  for (const btn of buttons) {
    btn.addEventListener('click', () => {
      const next = btn.dataset.filter;
      applyFilter(filterEl, buttons, next);
      writeFilterToHash(next);
    });
  }

  // Keyboard navigation between filter buttons (tablist pattern).
  filterEl.addEventListener('keydown', (e) => {
    const idx = buttons.indexOf(document.activeElement);
    if (idx === -1) return;
    let nextIdx = -1;
    switch (e.key) {
      case 'ArrowLeft':
        nextIdx = (idx - 1 + buttons.length) % buttons.length; break;
      case 'ArrowRight':
        nextIdx = (idx + 1) % buttons.length; break;
      case 'Home':
        nextIdx = 0; break;
      case 'End':
        nextIdx = buttons.length - 1; break;
      default: return;
    }
    e.preventDefault();
    const target = buttons[nextIdx];
    target.focus();
    // Activation follows focus (typical tablist behavior — match WAI-ARIA APG).
    const next = target.dataset.filter;
    applyFilter(filterEl, buttons, next);
    writeFilterToHash(next);
  });

  // Reposition the indicator on resize so font-load / orientation-change reflows
  // don't leave it under the wrong button.
  const reposition = () => {
    const active = filterEl.querySelector('.project-filter__btn[aria-selected="true"]');
    moveIndicator(filterEl, active);
  };
  window.addEventListener('resize', reposition);

  // Sync state if the user manually edits the URL hash (e.g. paste #cs into address bar).
  window.addEventListener('hashchange', () => {
    applyFilter(filterEl, buttons, readFilterFromHash());
  });
}
