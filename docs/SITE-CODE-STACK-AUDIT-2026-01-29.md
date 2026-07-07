# Code & Tech Stack Audit (2026-01-29)

## Summary
Current site is a Vite-based SPA (React 19, react-router) with legacy SCSS compiled via Gulp into `src/css/style.css` then imported in `src/main.jsx`. Vendor mix includes Bootstrap, Font Awesome, MUI/Emotion (limited usage), and Framer Motion. There is a custom critical CSS plugin and route-level code splitting. No SSR/SSG; SEO handled via `index.html` and runtime updates.

Top opportunities: remove overlapping UI stacks (Bootstrap, MUI, FA CSS), eliminate Gulp (let Vite or pure CSS tokens handle styles), migrate to token-first CSS, consolidate fonts, and prepare for Next.js + CMS (ISR/SSG) with content models.

## Inventory
- Runtime: React 19, react-router-dom 7 (SPA)
- Build: Vite 7, manualChunks for vendor/feature splits, cssCodeSplit: true
- Styles: SCSS via Gulp → `src/css/style.css`; `bootstrap-modal-only.css` imported; modular SCSS structure under `src/scss/*`
- UI libs: Bootstrap (pkg present, no direct JS usage), Font Awesome CSS via `<link>`, MUI/Emotion (Modal only), Framer Motion (animations)
- Tooling: ESLint (modern config), custom `vite-plugin-critical-css.cjs`, static copy for `robots.txt`/`sitemap.xml`
- Assets: Image tools present (`optimize-images.mjs`, `convert-images-to-webp.mjs`)

## Findings
1) Overlapping UI systems
   - Bootstrap present but no `react-bootstrap` usage; likely dead weight (styles duplicated in SCSS).
   - MUI/Emotion pulled in for `PortfolioModal.jsx` only; heavy for a single modal. We already have `components/common/Modal.jsx`.
   - Font Awesome loaded as full CSS via `<link>`; many FA class-based color rules baked into compiled CSS.

2) Legacy SCSS + Gulp in a Vite app
   - Gulp compiles SCSS to `src/css`; Vite then bundles. Redundant pipeline and extra complexity.
   - Modularization improved upstream, but SCSS remains monolithic from app import perspective.

3) Fonts and critical path
   - Multiple remote fonts (Google + Typekit) via preload + noscript; risk of layout shifts and network overhead.
   - Typekit override styles exist; consider trimming to 1 display + 1 text family, preload subsets only.

4) SPA-only routing and SEO
   - `react-router-dom` SPA with `<DynamicTitle>`; SEO metadata and OpenGraph mostly static in `index.html`.
   - For blog/portfolio discovery, SSR/SSG (Next.js) or a pre-render step is recommended.

5) Animations
   - Framer Motion used across sections; acceptable, but ensure tree-shaking and avoid animating large lists on load.

6) Images
   - Image optimization scripts exist but not wired into build by default; WebP/AVIF and responsive sets should be standardized.

## Recommendations (high impact)
- Remove MUI/Emotion: Replace `@mui/material` modal in `portfolio/PortfolioModal.jsx` with `components/common/Modal.jsx`. Drop `@mui/*` and `@emotion/*` deps.
- Remove Bootstrap dependency: If not importing Bootstrap JS/CSS, delete `bootstrap` package and audit `bootstrap-modal-only.css` usage; migrate any remaining classes to tokens.
- Replace Font Awesome CSS: Move to inline SVG icons or `react-icons`/SVGR for the small subset actually used; purge FA class color rules from SCSS.
- Kill Gulp: Let Vite handle styles or migrate to pure CSS tokens + @layer; remove `gulpfile.cjs` and related scripts.
- Consolidate fonts: Reduce to Playfair (display) + Inter (text) or system stack; preload critical stylesheets with size-adjust; remove Typekit if feasible.
- Prepare SSR/SSG migration: Plan Next.js app dir with ISR for blog/portfolio and API routes for contact/revalidation.

## Recommendations (supporting)
- Token-first CSS: Introduce canonical token scales (color/space/type/radius/shadow), alias layer, and utilities; begin replacing SCSS.
- Bundle health: Add `rollup-plugin-visualizer` or `vite-bundle-visualizer`; set budgets and monitor vendor splits.
- Accessibility: Enforce `focus-visible`, color contrast on tokens, and keyboard trap checks (modals/menus).
- SEO & Sitemaps: Automate sitemap generation in build; add structured data for posts/projects.
- CI hooks: Pre-commit lint, type-check (if TS is introduced), image optimization step.

## Quick Wins
- Swap `PortfolioModal.jsx` to `common/Modal.jsx`; remove `@mui/*` + `@emotion/*`.
- Remove `bootstrap` if unused; delete `bootstrap-modal-only.css` import and replace styles.
- Move FA icons used in UI to SVG components via SVGR; remove FA CSS `<link>` and FA-specific SCSS.
- Wire `images:optimize` into `build` or a separate `build:assets` step.

## Migration Direction (React server + CMS → SSG)
- Framework: Next.js (ISR, API routes, `next/image`), or Remix if streaming/edge-first is desired.
- CMS: Strapi (self-hosted) or Sanity (SaaS). Start with blog → expand to portfolio.
- Content model: Post, Tag, Author; Project, Category/Tech, Media; SiteSettings, Navigation.
- Pathing: Preserve legacy slugs; implement redirects; add JSON-LD.

## Exit Criteria (phase 1)
- No MUI/Emotion/Bootstrap/FA CSS in dependency tree.
- Gulp removed; styles via tokens and Vite-only.
- Fonts trimmed and non-blocking; CLS within budget.
- Bundle visualizer reports vendor chunks < target sizes.
- ADRs recorded for framework/CMS; Next.js skeleton ready with sample ISR page.
