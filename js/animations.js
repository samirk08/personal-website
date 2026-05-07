// js/animations.js — IntersectionObserver scroll-reveal + hero entrance trigger.
// Locked spec from UI-SPEC §Section Transitions:
//   threshold: 0.15, rootMargin: '0px 0px -10% 0px', fires once via unobserve.
// Reduced-motion users: the layout.css / motion.css rules already ship the elements in their
// final visible state, so we still safely add .is-visible (it's a no-op visually) and we still
// trigger the hero loaded class so any future motion-on-class works.

export function initAnimations(root = document) {
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
