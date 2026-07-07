# Site Rebuild TODO (Comprehensive)

This is the prioritized, end-to-end plan to rebuild the site with a typed CMS-backed architecture, TypeScript, and a token-first CSS system. Tasks are grouped by phases, with immediate Next Steps at the top.

## Next Steps (Prioritized)

1. Drop MUI/Emotion: Replace `PortfolioModal` with common `Modal`, remove MUI/Emotion.
2. TypeScript setup: Add `tsconfig.json` (`strict`, `allowJs`), install TypeScript + ESLint TS.
3. CMS client: Create typed CMS API client and models (`Post`, `Tag`, `Project`, `Author`).
4. Blog routes migration: Swap WordPress fetches to CMS client in `BlogIndex`, `Blog` (single), `BlogArchive`, `BlogTagArchive`, `Sidebar`; add pagination, `AbortController`, sanitization.
5. Home: Use CMS client for blog preview; convert to TSX; sanitize and add proper image attrs.
6. Contact: Move CSRF/captcha/send to CMS API route; improve a11y and error copy; convert to TSX.
7. Icons & Bootstrap: Replace Font Awesome CSS with SVG icons; remove Bootstrap if unused.
8. CSS tokens: Adopt `@layer` token-first CSS; deprecate Gulp SCSS; begin component recipes and minimal utilities.
9. Fonts & perf: Trim fonts, preload subsets; add bundle visualizer + budgets; automate image optimization.
10. SEO & ADRs: Add sitemaps + JSON-LD; select CMS and framework via ADRs; define content schemas; plan SSR/SSG (ISR).

## One-Week Timeline (Schedule)

- Day 1 (Kickoff):
	- Remove MUI/Emotion by swapping `PortfolioModal` to common `Modal`.
	- Introduce TypeScript: add `tsconfig.json` with `strict` and `allowJs`; install TS + ESLint plugins.
	- Draft ADRs: shortlist CMS (Strapi/Sanity) and framework (Next.js/Remix/Astro); set decision criteria.
	- Deliverables: PR for modal refactor; PR adding TS config and lint setup.

- Day 2 (CMS Client + Blog Index):
	- Implement typed CMS client and core models (`Post`, `Tag`, `Project`, `Author`).
	- Migrate `BlogIndex` to CMS client with pagination and `AbortController`; convert to TSX; sanitize title/excerpt.
	- Deliverables: PR with CMS client and `BlogIndex` migration.

- Day 3 (Single Post + Archives):
	- Migrate `Blog` (single post by slug) to CMS client; sanitize content; fix external link `rel/target`.
	- Migrate `BlogArchive` (category) and `BlogTagArchive` (tag) to CMS client; add image attrs.
	- Update `Sidebar` to CMS client for recent posts/categories/tags; convert to TSX.
	- Deliverables: PR covering blog post + archives + sidebar.

- Day 4 (Home + Contact):
	- Home: Use CMS client for blog preview; convert Home and BlogSection to TSX; sanitize snippets.
	- Contact: Move CSRF/captcha/send to CMS API route; improve a11y and error copy; convert to TSX.
	- Deliverables: PR for Home + Contact migrations.

- Day 5 (UI Cleanup + CSS Tokens):
	- Replace Font Awesome CSS with SVG icons; audit/remove Bootstrap if unused.
	- Begin token-first CSS via `@layer` (tokens → base → components → utilities); remove Gulp SCSS pipeline.
	- Deliverables: PR removing FA/Bootstrap; PR introducing tokens and deprecating Gulp.

- Day 6 (Performance + SEO):
	- Trim fonts; preload subsets; ensure `font-display` strategies.
	- Add bundle visualizer and performance budgets; automate images (WebP/AVIF, responsive sizes).
	- Add sitemaps and JSON-LD (SSR-ready patterns).
	- Implement Yoast-style SEO features: focus keyphrase, snippet preview, content/readability analysis, per-page SEO controls.
	- Deliverables: PRs for performance tooling and SEO artifacts.

- Day 7 (Testing, A11y, Docs, Release):
	- Add unit tests for CMS client; integration checks for blog/portfolio/contact.
	- A11y pass: keyboard nav, ARIA roles, focus management, reduced motion coverage.
	- CI/CD wiring: build, lint, typecheck, tests, deploy; docs updated (README, tokens/components usage, ADR index).
	- Deliverables: Final PRs, merge, tag release; rollback plan documented.

### Milestones & Checkpoints
- M1 (Day 1): Modal refactor + TS bootstrapped.
- M2 (Day 3): All blog routes on CMS, TSX complete.
- M3 (Day 5): UI libraries cleaned; tokens established; Gulp removed.
- M4 (Day 7): Performance/SEO complete; tests + CI/CD; documentation.

### Dependencies & Risks
- CMS selection may affect client shape—keep client layered with adapters.
- Token CSS rollout should avoid regressions—apply component-by-component.
- Schedule is aggressive—reserve buffer by merging daily, limiting scope creep.

---

## Phase 0 — Repo Hygiene

- [ ] Rebase WIP branch onto updated `main`.
- [ ] Open PR(s) for WIP and planning branches.
- [ ] Establish branch naming, PR templates, and codeowners.

## Phase 1 — Architecture & ADRs

- [ ] ADR: Select CMS (Strapi vs Sanity) and justify.
- [ ] ADR: Select framework for SSR/SSG (Next.js vs Remix/Astro) and justify.
- [ ] Outline architecture: React server + CMS; ISR strategy; routing and slug preservation; migration timeline.

## Phase 2 — CMS Data Models & API

- [ ] Define content schemas: `Post`, `Tag`, `Category`, `Project`, `Author`, `Asset`.
- [ ] Establish CMS endpoints: list, detail by slug, category/tag filters, search.
- [ ] Security: CSRF/captcha endpoints and mailer integration for contact.
- [ ] Migrate existing slugs/metadata for SEO continuity.

## CMS Non-Negotiables (WordPress Admin Parity)

- Admin UX (Dashboard Style):
	- Dashboard home with panels/widgets (quick draft, recent activity, stats).
	- Single-User Admin Mode: one superuser account; no multi-user roles required.
	- Users management minimal: profile, display name, author bio, avatar; no teams/invitations.
	- Block/WYSIWYG editor with rich text, embeds, media, lists, quotes; autosave, revisions, draft, schedule, publish, sticky, private/password.
	- Pages (hierarchical) and Posts management with list filters, bulk actions, status chips, search.
	- Taxonomies: Categories & Tags (plus custom taxonomies) with CRUD flows.
	- Custom fields/meta boxes (repeaters, select, rich text) and field validations.
	- Media Library: upload (drag-drop), multi-select, search/filter, metadata (alt text required), focal point/crop, responsive sizes.
	- Permalinks/Slugs: editable slugs, permalink patterns, uniqueness checks, auto 301 redirect creation on slug changes, canonical URL controls.
	- Publishing Workflow: previews (token-based), scheduled publishing, draft/pending review, editorial notes, change history.

- SEO Parity:
	- Per-page/post SEO: meta title, meta description, OpenGraph/Twitter cards, canonical URL, robots flags (index/noindex, follow/nofollow).
	- Sitemaps (XML) and robots.txt management; breadcrumb JSON-LD; schema.org article/page JSON-LD.
	- Redirects manager (301/302) with import/export; auto-redirects on slug changes.

### Yoast SEO Feature Parity (Target)
- Content Analysis:
	- Focus keyphrase with density check and suggestions.
	- Multiple keyphrases (optional) and synonyms support.
	- Readability metrics: sentence length, paragraph length, passive voice, transition words, Flesch reading ease.
	- SEO checks: meta title length, meta description length, slug length, image alt presence, internal/external links.
	- Traffic-light style scoring (overall + per check), with actionable tips.

- Snippet & Social Preview:
	- SERP snippet preview (desktop/mobile) showing title, URL, description.
	- OpenGraph/Twitter card previews including image selection.

- Per-Page Controls:
	- Canonical URL, robots meta (index/noindex, follow/nofollow).
	- Cornerstone content toggle; pillar content indication.
	- Breadcrumbs settings; noindex for taxonomies (optional).

- Structured Data:
	- Select schema type per content (Article, BlogPosting, WebPage, Project) with key properties.

- Sitemaps & Redirects:
	- XML sitemaps generation with configurable inclusion/exclusion.
	- Auto 301 on slug changes; manual 301/302 manager.

- Admin UX:
	- Inline analysis panel in editor with expandable sections.
	- Status badges and guidance without blocking publishing.

- API & Integrations:
	- REST endpoints for list/detail by slug, category/tag filters, search, pagination; status filtering (draft/published/scheduled).
	- Webhooks (publish/update/delete) for frontend cache invalidation/ISR; RSS/Atom feeds.
	- Auth: JWT/session for single-user admin; optional roles only if commenting is enabled; CORS controls; rate limiting.
	- Import/Export: WordPress WXR/CSV/JSON import; full export for backup/migrations.

- Operations & Quality:
	- Audit trail & revisions with diff view; activity logs per user/content.
	- Accessibility in admin (keyboard nav, ARIA, focus management).
	- Localization/i18n-ready (optional multilingual content).
	- Performance: media optimization pipeline (WebP/AVIF, responsive sizes), background jobs.

- Acceptance Criteria:
	- Admin UX parity for single-user workflow; no multi-user roles needed; familiar WordPress-like editing and publishing.
	- SEO controls at least match WordPress + popular SEO plugins (Yoast/RankMath) feature set.
	- API enables headless frontend with ISR/preview flows; redirects and sitemaps generated.

## Phase 3 — TypeScript Migration

- [ ] Add `tsconfig.json` (`strict`, `noImplicitAny`, `skipLibCheck`, `allowJs`).
- [ ] Install tooling: `typescript`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`.
- [ ] Create types: `Post`, `Tag`, `Category`, `Project`, `Author`, `ImageAsset`.
- [ ] Convert shared utilities to `.ts` and components to `.tsx` incrementally.

## Phase 4 — CSS System Overhaul

- [ ] Introduce `@layer` tokens → theme → base → components → utilities.
- [ ] Tokenize colors, spacing, typography, radii, shadows, z-index.
- [ ] Replace SCSS mixins with CSS recipes and minimal utilities.
- [ ] Remove Gulp SCSS pipeline and unify build under Vite.
- [ ] Trim fonts; consolidate families; preload subsets.

## Phase 5 — Feature Migrations (Pages)

- [ ] Home: CMS-backed preview; TSX; image attrs; sanitize HTML.
- [ ] Hero: Respect `prefers-reduced-motion`; tokens; TSX.
- [ ] About: Replace FA icons with SVG; tokens; TSX.
- [ ] FeaturedWork: Stable keys; lazy modal assets; TSX.
- [ ] BlogSection (Home): Sanitize title/excerpt; image attrs; TSX.
- [ ] Portfolio page: Source projects from CMS; ARIA tabs; TSX.
- [ ] PortfolioModal: Sanitize fields; swap to common `Modal`; TSX.
- [ ] BlogIndex: CMS fetch; pagination; `AbortController`; TSX.
- [ ] Blog Post: Fetch by slug; sanitize content; fix links (`rel`, `target`); TSX.
- [ ] BlogArchive: Fetch by category; sanitize; image attrs; TSX.
- [ ] BlogTagArchive: Fetch by tag; sanitize; image attrs; TSX.
- [ ] Sidebar: Recent posts/categories/tags via CMS; sanitize; TSX.
- [ ] Bio: Move JSON-LD to SSR; IntersectionObserver → class toggles; TSX.
- [ ] Contact: CSRF/captcha/send via CMS route; a11y; TSX.

## Phase 6 — UI Library Cleanup

- [ ] Drop MUI/Emotion; use internal common `Modal`.
- [ ] Audit Bootstrap; remove if not used.
- [ ] Replace Font Awesome CSS with inline SVGs or icon components.

## Phase 7 — Performance & SEO

- [ ] Add bundle visualizer and performance budgets.
- [ ] Automate images: WebP/AVIF conversion and responsive sizes.
- [ ] Add sitemaps and JSON-LD via SSR/SSG.
- [ ] Lazy-load heavy sections; code-split where appropriate.

## Phase 8 — Testing & A11y

- [ ] Unit tests for CMS client and renderers.
- [ ] Integration tests for routes (blog, portfolio, contact).
- [ ] A11y checks: keyboard nav, ARIA roles, focus management, reduced motion.
- [ ] Visual regression baseline for key pages.

## Phase 9 — Deployment & Monitoring

- [ ] CI/CD pipeline: build, test, lint, typecheck, deploy.
- [ ] Monitoring: error tracking, performance metrics (Core Web Vitals).
- [ ] Rollback strategy and canary releases for major changes.

## Phase 10 — Documentation & Governance

- [ ] Update README with architecture and run instructions.
- [ ] Document design tokens, components, and usage guidelines.
- [ ] Add contribution guidelines, coding standards, and ADR index.

---

### Notes

- Prioritize content parity and SEO preservation during migration.
- Replace unsafe HTML rendering with a sanitizer where necessary.
- Respect user preferences (`prefers-reduced-motion`, dark mode tokens) across animations and themes.
