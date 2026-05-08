// js/experience-accordion.js — expandable cards on /experience.
// Each card head is a <button> with aria-expanded + aria-controls. Clicking or
// pressing Enter/Space (native <button> behavior) toggles the body via
// [hidden]. Esc on a focused open head collapses it. Multiple cards may be
// open simultaneously — they are independent.

export function initExperienceAccordion() {
  const heads = document.querySelectorAll('.timeline__head');
  if (!heads.length) return;

  heads.forEach((head) => {
    head.addEventListener('click', () => toggle(head));
    head.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && head.getAttribute('aria-expanded') === 'true') {
        toggle(head);
        head.focus();
      }
    });
  });
}

function toggle(head) {
  const expanded = head.getAttribute('aria-expanded') === 'true';
  const bodyId = head.getAttribute('aria-controls');
  const body = bodyId ? document.getElementById(bodyId) : null;
  if (!body) return;

  head.setAttribute('aria-expanded', String(!expanded));
  if (expanded) {
    body.setAttribute('hidden', '');
  } else {
    body.removeAttribute('hidden');
  }
}
