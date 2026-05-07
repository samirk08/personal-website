<!-- GSD:project-start source:PROJECT.md -->
## Project

**Samir Kadariya — Personal Portfolio Website**

A personal portfolio website for Samir Kadariya, MIT '26 (BS Artificial Intelligence and Decision Making + BS Mathematics, GPA 4.8). The site presents his programming projects, math research, bio, and resume in a single content-first static site, with light visual personality (background imagery, subtle animation) rather than a spartan academic page. Aimed at recruiters, research collaborators, and anyone (e.g. friends, professors) who Googles his name.

**Core Value:** **A visitor should be able to understand who Samir is and see the depth of his CS + math work within ~30 seconds of landing on the site.** Content readability and trust beat every other concern (animation polish, custom design, novel interactions). If the projects don't render clearly, nothing else matters.

### Constraints

- **Tech stack**: Plain HTML, CSS, JavaScript only — no framework, no bundler, no build step. Hand-written files committed directly. *Why:* explicit user choice for simplicity, learning fundamentals, and no dependency drift. This rules out React, Astro, Next.js, Tailwind config, etc.
- **Hosting**: Vercel (default subdomain for v1). *Why:* free, push-to-deploy from GitHub, custom domain easy to add later.
- **Timeline**: Ship by end of weekend (target: 2026-05-10 / 2026-05-11). *Why:* explicit user goal — content-shipping over polish.
- **Repository**: Project root has its own git repo (initialized today as part of `/gsd-new-project`). The `projects/` directory contains source LaTeX assets — these stay in the repo but are not deployed; only their compiled artifacts (PDFs, key images) get referenced from the site.
- **Content honesty**: Co-authored projects must be labeled with all collaborators' names. Solo projects can be presented as such. *Why:* recruiter and academic-collaborator audiences will check.
- **Mobile parity**: Site must read on phones — not just desktop. *Why:* recruiters open links on phones constantly.
<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->
## Technology Stack

## TL;DR — One-Paragraph Prescription
## Recommended Stack
### Core Technologies
| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| HTML5 | living standard | Document structure | Semantic tags (`<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, `<figure>`) give accessibility and SEO for free; no framework needed for a 1-2 page site. **HIGH confidence.** |
| CSS (modern, no preprocessor) | living standard | Styling, layout, theming, animation | Custom properties (`--var`), `@layer`, container queries (`@container`), `:has()`, logical properties, and `color-mix()` cover everything Sass used to. All have 93%+ global support in 2026 — no preprocessor required. **HIGH confidence.** |
| JavaScript (vanilla ES2024+) | ES2024+ | Behavior (scroll fades, mobile nav, theme toggle, modal/expansion of project cards) | Native modules (`<script type="module">`), `IntersectionObserver`, `ResizeObserver`, `View Transitions API`, top-level `await`, `URL` API — all available without any tooling. **HIGH confidence.** |
| Vercel | platform-as-a-service | Hosting, edge CDN, automatic GitHub deploys, preview URLs | Free Hobby tier, push-to-deploy from GitHub, instant rollback, preview deploys per PR, default subdomain `*.vercel.app`. Detects "static" projects with no `package.json` and serves files as-is. **HIGH confidence.** |
| Git + GitHub | n/a | Source of truth + Vercel deploy trigger | Vercel for GitHub installs as an app; every push to `main` deploys to production, every push to a feature branch creates a preview URL. **HIGH confidence.** |
### Supporting Libraries (CDN, all optional)
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| **KaTeX** | **0.16.45** (April 2026 stable) | Render LaTeX math (e.g. `$\beta/c$` Katz-Bonacich expression in 14.18 abstract, branching-process notation in 18.619 abstract, taxicab number formulas in 18.821) | Use **only on project-detail pages that contain math** — don't load it on the landing page. CDN below. **HIGH confidence (verified against katex.org/docs/browser).** |
| **Inter** or **Geist** (self-hosted WOFF2) | latest static cuts (Inter 4.x; Geist 1.4) | Body + UI font | Pick one, self-host two weights (e.g. 400 + 600), preload the body weight. See "Web Fonts" section. **HIGH confidence.** |
| **Iconoir** or inline SVG | n/a | Icons (GitHub, LinkedIn, email, external-link, arrow) | Inline SVGs in HTML are simpler than an icon font — 4-6 icons total for this site. No library needed. **HIGH confidence.** |
| Animate-on-scroll library (e.g. `sal.js`, `Scrolleo`) | — | Scroll-triggered fades | **DO NOT pull in.** A 30-line `IntersectionObserver` snippet gives you everything `sal.js` does, with zero dependency. See "Animation" section. **HIGH confidence.** |
### Development Tools
| Tool | Purpose | Notes |
|------|---------|-------|
| VS Code (or Zed/Cursor) + Live Server extension | Local preview | Live Server (Ritwick Dey) auto-reloads on save — only thing you need beyond an editor. |
| `npx serve .` (no install) | Alternative local preview | If you don't want a VS Code extension: `npx serve` from project root serves on `localhost:3000`. |
| `vercel` CLI (optional) | Local Vercel emulation, manual deploys | `npm i -g vercel` then `vercel dev` to test `vercel.json` headers/rewrites locally. Not needed if you trust GitHub auto-deploy. |
| Lighthouse (built into Chrome DevTools) | Perf / a11y audit | Run after deploy; target ≥90 on Performance and Accessibility. |
| `squoosh.app` or `cwebp`/`avifenc` CLI | Image conversion | Manually convert hero/project images to AVIF + WebP + small JPEG fallback once and check them in. No build pipeline. |
## Installation
# 1. Initialize repo (already done)
# git already initialized
# 2. Create the structure (see "Project Structure" below)
# 3. (Optional) install Vercel CLI globally for local emulation
# 4. Push to GitHub, then "Add New Project" in Vercel dashboard → connect repo → Deploy
# macOS — install both
# convert hero photo
## Project Structure
## Image Handling
### The Pattern (use everywhere)
### Format strategy
| Format | Use | Why |
|--------|-----|-----|
| **AVIF** | primary | ~94% global support in 2026; ~30-50% smaller than WebP at equivalent quality |
| **WebP** | fallback | covers the remaining sliver of older Safari/Firefox |
| **JPEG** | last fallback (only for photos; use **PNG** for screenshots/figures) | universal |
### What NOT to use
- **Vercel Image Optimization (`next/image`-style)** — only works inside Next.js / framework routes; for plain HTML you'd be hitting `/_vercel/image?url=...` manually, which is awkward and burns optimization quota. Just check in pre-converted AVIF/WebP. **HIGH confidence.**
- **CSS `background-image` for content images** — invisible to screen readers and to Open Graph crawlers. Use `background-image` only for purely decorative hero overlays, and add an `aria-hidden` decoration layer if needed.
## CSS Architecture (No Preprocessor)
### Use these features
| Feature | Browser support 2026 | Use for |
|---------|---------------------|---------|
| **Custom properties** (`--color-fg: …`) | 100% | Theming, spacing scale, font sizes — replaces Sass variables entirely |
| **`@layer`** (cascade layers) | 94.71% | Order rules: `reset`, `tokens`, `base`, `components`, `utilities` — eliminates specificity wars without `!important` |
| **`@container`** (size queries) | 93.3% | Component-level responsive (e.g. project cards adapt to their grid cell, not the viewport) |
| **`:has()`** | universal | Style parent based on child (e.g. card with image looks different than card without) |
| **`color-mix(in oklch, …)`** | universal | Generate hover/active variants from a single token |
| **Logical properties** (`margin-inline`, `padding-block`) | universal | Future-proof for any RTL needs; cleaner than `margin-left/right` |
| **`prefers-reduced-motion`** | universal | Respect users who turn off animation |
| **`prefers-color-scheme`** | universal | Auto dark/light if you decide to add it (deferred per PROJECT.md, but cheap to wire later) |
| **`clamp()`** | universal | Fluid typography: `font-size: clamp(1rem, 0.5rem + 1.5vw, 1.5rem)` |
### Recommended layer structure
### What NOT to use
- **Sass / SCSS** — every Sass feature you'd want (variables, nesting, color functions) is now native CSS. Adding Sass means adding a build step, which violates the project constraint. **HIGH confidence.**
- **Tailwind CSS** — requires a build step and contradicts the "plain CSS" constraint. If you want utility classes, write 5-10 of your own in the `utilities` layer (`.stack`, `.cluster`, `.visually-hidden`). **HIGH confidence.**
- **CSS-in-JS** — irrelevant; no JS framework here.
- **Reset/normalize libraries** (e.g. `normalize.css` 8.x) — overkill in 2026; the 6 lines in the `reset` layer above cover what matters. **MEDIUM confidence.**
## Animation (No Framework)
### 1. Scroll-triggered fade-in — `IntersectionObserver`
### 2. Cross-page transitions — View Transitions API (cross-document)
### 3. Smooth scroll for anchor nav
### 4. Card hover effects
### What NOT to use
- **GSAP** — overkill (and licensed) for fades. Save for genuinely complex timelines you don't have. **HIGH confidence.**
- **Framer Motion** — React-only.
- **AOS (Animate On Scroll)** — last meaningful release was years ago, uses `MutationObserver` workarounds and has known reduced-motion issues. The 15-line snippet above is strictly better. **MEDIUM confidence.**
- **`requestAnimationFrame` scroll listeners** — replaced entirely by IntersectionObserver. The old "throttled scroll handler" pattern is obsolete. **HIGH confidence.**
## Web Fonts
### Recommendation: self-host WOFF2
### Why self-host (not Google Fonts CDN)
- **Performance:** removes a DNS lookup + TLS handshake to `fonts.googleapis.com` AND a separate one to `fonts.gstatic.com`. Median LCP improvement ~180ms vs Google Fonts.
- **Privacy / GDPR:** Google Fonts CDN logs IP addresses; self-hosting avoids this entirely. Not legally critical for a personal portfolio in the US, but cleaner.
- **Cache control:** you set the headers (e.g. `Cache-Control: public, max-age=31536000, immutable`). Google's are fine but theirs.
- **Vercel edge serves the WOFF2** from the same origin, so HTTP/2 multiplexes it efficiently with the HTML/CSS.
### What NOT to use
- **WOFF 1.0 / TTF in `@font-face`** — WOFF2 has 96%+ support and ~30% smaller. No fallback needed in 2026. **HIGH confidence.**
- **Google Fonts `<link rel="stylesheet">` CDN approach** — slower than self-host and adds third-party dependency. **HIGH confidence.**
- **Variable fonts** (Inter Variable) — only use if you need 4+ weights. For 2 weights, static cuts are smaller. **MEDIUM confidence.**
- **Multiple font families** — pick one. A second family for code (`JetBrains Mono`) is fine **only** if you display code snippets; otherwise use system mono.
## LaTeX / Math Rendering
### Recommendation: KaTeX 0.16.45 via jsDelivr CDN
### KaTeX vs MathJax — pick KaTeX
| Criterion | KaTeX 0.16.45 | MathJax 3.2 |
|-----------|---------------|-------------|
| Render speed | ~10× faster (synchronous) | Slower (async DOM mutation) |
| Bundle size (CSS+JS) | ~280 KB | ~450 KB+ |
| LaTeX coverage | Most common macros, the equations on this site fit comfortably | Larger (full AMS-LaTeX, Physics package) |
| FOUC | None — replaces synchronously | Visible reflow on slow connections |
| Maintenance | Active (April 2026 release) | Active |
### Loading strategy
- **Don't load KaTeX on `index.html`** — only on the project-detail pages that actually render math (likely `lobbying-networks.html`, `decimal-expansions.html`, `taxicab-numbers.html`, `branching-cancer.html`).
- The `defer` + `onload="renderMathInElement(document.body)"` pattern means math renders right after first paint, no flash of raw `\beta` syntax beyond a few hundred ms.
### Alternative: pre-render at write-time
### What NOT to use
- **MathJax 2.x** — old, slow, deprecated. **HIGH confidence.**
- **MathJax 3 default config** — fine but heavier than KaTeX with no benefit on this site's math complexity. **HIGH confidence.**
- **Image-of-equation** (rendered to PNG) — inaccessible, doesn't scale, looks bad on retina. **HIGH confidence.**
## Vercel Configuration
### Initial deploy: no config needed
- no `package.json` → "Other" framework, no build
- `index.html` at root → serves it as the default route
### Recommended `vercel.json` (when you want polish)
### What this does
| Setting | Effect |
|---------|--------|
| `cleanUrls: true` | `/work/nlp-tariff.html` becomes `/work/nlp-tariff` automatically; visits to `.html` redirect with 308. Cleaner share links. |
| `trailingSlash: false` | `/about/` redirects to `/about` (canonical, no duplicate URL for SEO/sharing). |
| Security headers on `/(.*)`| `X-Content-Type-Options: nosniff` blocks MIME sniffing; `X-Frame-Options: DENY` prevents clickjacking; `Referrer-Policy` limits leaked URLs; `Permissions-Policy` denies APIs you don't use. |
| 1-year `immutable` cache for `/assets/*` and static binary types | Browser caches forever; if you change a font/image, give it a new filename to bust cache (or rely on Vercel's deployment URL versioning). |
### Optional rewrites (not needed for v1)
### What NOT to do
- **Don't set `X-XSS-Protection: 1; mode=block`** — deprecated and sometimes harmful in modern browsers. Modern CSP supersedes it. **HIGH confidence.**
- **Don't set a strict CSP without testing** — easy to break inline `onload="renderMathInElement(...)"` for KaTeX or inline event handlers. If you want CSP, add `script-src 'self' cdn.jsdelivr.net` and verify nothing breaks. **MEDIUM confidence — you can ship without CSP.**
- **Don't set `Cache-Control: public, max-age=31536000` on `*.html`** — break cache invalidation on the next deploy. HTML should be `must-revalidate` or short max-age. Vercel's default is correct. **HIGH confidence.**
- **Don't add a `buildCommand`** — there's nothing to build. Leaving the field empty (or omitting it) makes Vercel skip build entirely.
## Alternatives Considered
| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Plain HTML/CSS/JS | **Astro** | If you wanted MD/MDX-driven content for many project pages. For 9 projects with already-LaTeX'd abstracts, hand-written HTML is faster to ship and avoids a build step (which the user explicitly ruled out). |
| Plain HTML/CSS/JS | **11ty (Eleventy)** | If you wanted templating to DRY out repeated card layouts. Same tradeoff — adds a build step. Use if porting later. |
| Plain HTML/CSS/JS | **Next.js / Vite + React** | Never for this project. Conflicts with explicit constraint. |
| Vercel | **GitHub Pages** | Simpler in some ways (no third-party dashboard), but no preview URLs per branch and no edge-CDN headers config. Vercel wins for polish. |
| Vercel | **Cloudflare Pages** | Equivalent. Vercel was already chosen; sticking with it. |
| Self-hosted WOFF2 | **Google Fonts CDN** | Use only if you genuinely need 6+ weights (variable font payload becomes worth it). For a 2-weight portfolio, self-host. |
| KaTeX | **MathJax 3** | Use if a math abstract requires niche AMS macros KaTeX doesn't support. Test KaTeX first; switch only on demonstrated gap. |
| KaTeX | **Pre-rendered HTML at write-time** | If you have <10 total equations and care about every kilobyte. Run `npx katex` and paste output. |
| Native IntersectionObserver | **`sal.js`** (~3 KB) | Never for this project. The native equivalent is shorter. |
| Native IntersectionObserver | **GSAP** | Only if a future iteration adds genuinely complex timeline animations (parallax, chained tweens). Not needed for fade-in-on-scroll. |
| Inline SVG icons | **Lucide / Iconoir / Heroicons** (CDN) | If you need 20+ icons. For ~6 icons (GitHub, LinkedIn, mail, external-link, arrow, menu), inline SVG is cleaner. |
## What NOT to Use
| Avoid | Why | Use Instead |
|-------|-----|-------------|
| **Bootstrap / any CSS framework** | Bloated; conflicts with custom design language; opinionated layout primitives that fight your hero image. | Native CSS Grid + Flexbox + custom properties. |
| **jQuery** | All its features are native in 2026. Adds 30 KB minified for nothing. | `document.querySelector`, `IntersectionObserver`, `fetch`, `addEventListener`. |
| **Sass / Less / Stylus** | Every needed feature (variables, nesting, color functions) is now native CSS. Adds a build step. | Modern CSS with `@layer`, custom properties, `color-mix()`. |
| **AOS (Animate-On-Scroll)** | Stale, large, fights `prefers-reduced-motion`. | 15 lines of `IntersectionObserver` + CSS transitions (snippet above). |
| **Tailwind CSS** | Requires build step — violates project constraint. The "no preprocessor" tax of typing class names in HTML is also high for a hand-written site. | A small `utilities` `@layer` with 5-10 classes you actually use. |
| **AlpineJS / HTMX / Petite-Vue** | Not needed for static content. The site has no interactive state beyond a mobile-nav toggle and optional theme toggle — both easier in 6 lines of vanilla JS. | Vanilla JS event listeners. |
| **Three.js / particles.js for hero background** | 100+ KB, GPU-heavy on phones, distracts from content. The reference (Sunwoo Kang) uses a **static image**. | Static photo / SVG / CSS gradient as background. |
| **`<link rel="stylesheet" href="https://fonts.googleapis.com/...">`** | Slower than self-host; third-party privacy concerns. | Self-hosted WOFF2 (above). |
| **MathJax 2.x** | EOL in 2024. | KaTeX 0.16.45 (above). |
| **CDNs without SRI** (Subresource Integrity hash) | Supply-chain risk. | jsDelivr URLs above all include `integrity="sha384-…"`. |
| **HTTP image URLs** (`http://`) | Mixed-content blocked by browsers. | All assets `https://` or root-relative `/assets/...`. |
| **`<img>` without `width`/`height` attributes** | Causes Cumulative Layout Shift, hurts Core Web Vitals score. | Always set explicit intrinsic dimensions. |
| **Inline `<style>` blocks for theming** | Harder to maintain; defeats cache. | Keep all CSS in `style.css` (one file is fine for this site). |
| **Service worker / PWA manifest for v1** | Cache invalidation footguns; not needed for a portfolio. | Add later if there's a real reason. |
## Stack Patterns by Variant
- Skip the View Transitions API (no cross-doc nav to transition between).
- All content in one HTML file with anchor links (`#projects`, `#experience`).
- Card-click can either (a) open project PDF in new tab, (b) expand inline (vanilla JS toggling a class), or (c) link to per-project page (then add View Transitions).
- **Faster to ship, matches `coleruehle.com` and `tahaumar.site` references.**
- Add `@view-transition { navigation: auto; }` for smooth cross-page transitions.
- Add `vercel.json` with `cleanUrls: true` so URLs are `/work/nlp-tariff` not `.html`.
- Each detail page can host KaTeX without the index page paying the cost.
- **More polished, slightly more work — recommend doing v1 single-page, expanding later.**
- Vercel dashboard → Project → Domains → add `samirkadariya.com` (or whatever).
- DNS: either CNAME `www` to `cname.vercel-dns.com`, or use Vercel as nameserver. Auto-issued cert.
- No code change required — same deploy works under any domain.
## Version Compatibility
| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| KaTeX 0.16.45 CSS | KaTeX 0.16.45 JS + auto-render | Always pin all three to the same version — mismatched JS/CSS produces visual glitches. |
| Native View Transitions API | Chrome ≥126, Edge ≥126, Safari ≥18, Firefox ≥144 | ~90% global coverage 2026. Older browsers see normal page navigation — no polyfill needed. |
| `@layer` | Chrome ≥99, Firefox ≥97, Safari ≥15.4 | 94.71% global. Older Safari (≤15.3) gets fallback specificity, which is fine for progressive enhancement. |
| Container queries | Chrome ≥106, Firefox ≥110, Safari ≥16 | 93.3% global. Use `@supports (container-type: inline-size) { … }` only if you want to gate styles to supporters. |
| WOFF2 | Universal modern | No fallback needed in 2026. |
| AVIF | Chrome ≥85, Firefox ≥93, Safari ≥16.4, Edge ≥121 | 94.33% global. `<picture>` with WebP/JPEG fallback covers everyone. |
## Critical Implementation Notes for Roadmap / UI-SPEC Phase
## Sources
- KaTeX official docs (browser install): https://katex.org/docs/browser — KaTeX v0.16.45 CDN URLs + SRI hashes verified directly. **HIGH confidence.**
- KaTeX GitHub releases: https://github.com/KaTeX/KaTeX/releases — confirms v0.16.45 stable, April 2026. **HIGH confidence.**
- Vercel `vercel.json` reference (last updated 2026-03-11): https://vercel.com/docs/project-configuration/vercel-json — `cleanUrls`, `trailingSlash`, `headers`, `rewrites` syntax. **HIGH confidence.**
- Vercel project configuration overview: https://vercel.com/docs/projects/project-configuration — confirms static-site auto-detection. **HIGH confidence.**
- caniuse: AVIF (https://caniuse.com/avif) — 94.33% global support 2026. **HIGH confidence.**
- caniuse: CSS Cascade Layers (https://caniuse.com/css-cascade-layers) — 94.71%. **HIGH confidence.**
- caniuse: Container Queries (https://caniuse.com/css-container-queries) — 93.3%. **HIGH confidence.**
- caniuse: View Transitions API (https://caniuse.com/view-transitions) — 89.88%. **HIGH confidence.**
- MDN: View Transitions API (https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API) — confirms `@view-transition { navigation: auto; }` for cross-document. **HIGH confidence.**
- web.dev: preload critical assets — font-display, preload, WOFF2 guidance. **HIGH confidence.**
- Tune the Web / Core Web Vitals analysis on self-hosting Google Fonts (~180ms LCP improvement). **MEDIUM confidence — multiple sources agree but exact figure varies.**
- IntersectionObserver: native browser API, MDN-documented, universal support. **HIGH confidence.**
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, `.github/skills/`, or `.codex/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
