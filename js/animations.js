// js/animations.js — IntersectionObserver scroll-reveal + hero entrance trigger.
// Locked spec from UI-SPEC §Section Transitions:
//   threshold: 0.15, rootMargin: '0px 0px -10% 0px', fires once via unobserve.
// Reduced-motion users: the layout.css / motion.css rules already ship the elements in their
// final visible state, so we still safely add .is-visible (it's a no-op visually) and we still
// trigger the hero loaded class so any future motion-on-class works.

// Blocks that get the scroll-reveal treatment automatically. The .reveal class
// is added HERE (not in markup) so users without JavaScript always see content:
// CSS hides .reveal elements, so pre-baking the class into HTML would blank the
// page for them. Elements that already carry .reveal in markup keep working.
const AUTO_REVEAL_SELECTORS = [
  // homepage
  '.home-work__head',
  '.page-summary .m-section__heading',
  '.page-summary__card',
  // section pages
  '.featured-card',
  '.m-list > li',
  '.contact__list > li',
  '.about__layout > *',
  // article (blog) pages
  '.article .figure',
  '.key-takeaways',
  '.article-pagenav',
  '.references',
];

// Small per-sibling stagger so groups of items cascade in rather than popping
// all at once. Capped so long lists never feel slow.
const STAGGER_MS = 70;
const STAGGER_CAP = 5;

function autoReveal(root) {
  for (const selector of AUTO_REVEAL_SELECTORS) {
    root.querySelectorAll(selector).forEach((el) => el.classList.add('reveal'));
  }
  // Stagger any run of adjacent .reveal siblings (works for both auto-added
  // and markup-declared .reveal elements, e.g. the project card grids).
  const seenParents = new Set();
  root.querySelectorAll('.reveal').forEach((el) => {
    const parent = el.parentElement;
    if (!parent || seenParents.has(parent)) return;
    seenParents.add(parent);
    const group = Array.from(parent.children).filter((c) => c.classList.contains('reveal'));
    if (group.length < 2) return;
    group.forEach((item, i) => {
      item.style.setProperty('--reveal-delay', `${Math.min(i, STAGGER_CAP) * STAGGER_MS}ms`);
    });
  });
}

export function initAnimations(root = document) {
  autoReveal(root);

  // 1. Section / card scroll reveal
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

    root.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
  } else {
    // No IO support — show everything immediately so content is reachable.
    root.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
  }

  // 2. Hero entrance — fire once on next animation frame after DOMContentLoaded.
  // The hero is always above the fold; an IO observer would fire instantly anyway.
  const heroBits = root.querySelectorAll('.hero__name, .hero__identifier, .hero__focus');
  if (heroBits.length) {
    requestAnimationFrame(() => {
      heroBits.forEach((el) => el.classList.add('is-loaded'));
    });
  }
}
