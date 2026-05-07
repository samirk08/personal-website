// js/article-toc.js — scroll-spy for the article TOC ("bullets on a rail").
// Marks the topmost intersecting section's link with aria-current="location".
// No-ops on pages without a .article-toc (homepage + section pages); the TOC
// is hidden under 1024 px via CSS but the IDs in the DOM still resolve URL
// anchors like /projects/<slug>/#references.

export function initArticleToc() {
  const toc = document.querySelector('.article-toc');
  if (!toc) return;

  const links = [...toc.querySelectorAll('a[data-toc-target]')];
  if (!links.length) return;

  const sections = links
    .map(a => ({ id: a.dataset.tocTarget, link: a, el: document.getElementById(a.dataset.tocTarget) }))
    .filter(s => s.el);
  if (!sections.length) return;

  let activeId = null;
  const setActive = (id) => {
    if (id === activeId) return;
    if (activeId) {
      sections.find(s => s.id === activeId)?.link.removeAttribute('aria-current');
    }
    activeId = id;
    if (id) {
      sections.find(s => s.id === id)?.link.setAttribute('aria-current', 'location');
    }
  };

  if (!('IntersectionObserver' in window)) {
    // Older browsers: just light up the first section so the TOC isn't blank.
    setActive(sections[0].id);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    const intersecting = entries.filter(e => e.isIntersecting);
    if (intersecting.length === 0) return;
    intersecting.sort((a, b) =>
      a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top
    );
    setActive(intersecting[0].target.id);
  }, { rootMargin: '-15% 0px -70% 0px', threshold: 0 });

  sections.forEach(s => observer.observe(s.el));
  setActive(sections[0].id);
}
