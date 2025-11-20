# 🎯 Portfolio Site Optimization TODO List

> **Status:** Your codebase is 80% excellent - the component architecture and modularity are professional-grade. The main issues are organizational (images, data splitting) and SCSS consistency (hardcoded values). Addressing these will make maintenance significantly easier.

---

## 🔥 #1 PRIORITY - BUILD MVP PORTFOLIO MANAGER (DUE: FRIDAY AFTERNOON)

### 🎯 Quick-Start MVP Approach (2-3 hours total)

**Goal:** Create a browser-based portfolio manager that syncs with your existing `projects.js` structure. No database, no server - just a single HTML file with IndexedDB.

### ✅ Step-by-Step Implementation Prompts

#### **PROMPT 1: Create the HTML Shell** (10 minutes)
```
Create tools/portfolio-manager.html:
- Material Design UI with Tailwind CSS CDN
- 5 tabs: Frontend Projects, UI/UX Design, Case Studies, GitHub, CodePen
- Tab navigation with active states
- Empty container divs for each tab content
- Include Material Icons
- Add floating action button (FAB) for "Add New Project"
```

#### **PROMPT 2: Set Up IndexedDB Schema** (15 minutes)
```
Add IndexedDB initialization to portfolio-manager.html:
- Create database: 'PortfolioDB' version 1
- Create 5 object stores matching current projects.js structure:
  1. frontendProjects - fields: title, img, desc, secimg, addimg, videos, description, role, year, featured, githubUrl, liveUrl, metrics, keyLearnings, tech[]
  2. designShowcase - fields: title, category, image, description, tags[]
  3. caseStudies - fields: id, title, subtitle, category, tags[], thumbnail, featured, overview, challenge, solution, results, technologies[], role, duration, images[], metrics, keyTakeaways[]
  4. githubProjects - fields: name, description, url, liveUrl, thumbnail, topics[], language, icon
  5. codepenProjects - fields: title, description, url, embedUrl, tags[], featured
- Add CRUD helper functions: add(), get(), getAll(), update(), delete() for each store
```

#### **PROMPT 3: Build Import Existing Data Feature** (20 minutes)
```
Add import functionality:
- File input to load existing projects.js
- Parse JavaScript code to extract the 5 arrays (projects, designShowcase, caseStudies, githubProjects, codepenProjects)
- Duplicate detection: check if item already exists by id/title
- Show merge dialog: "Keep existing" vs "Use imported" for duplicates
- Store all items in IndexedDB with metadata: {imported: true, lastModified: Date}
- Show success notification with count imported
```

#### **PROMPT 4: Create Dynamic Forms Per Category** (30 minutes)
```
Build form generator that adapts per tab:
- Frontend Projects form: All fields from step 2 schema
- Design Showcase form: Category dropdown, image upload, tags multi-input
- Case Studies form: Rich text areas for overview/challenge/solution, image array upload
- GitHub Projects form: Auto-fetch from GitHub API option, language selector
- CodePen Projects form: Embed URL preview, featured toggle
- All forms: Validation, required field indicators, auto-save to IndexedDB
- Image uploads: Convert to base64 and store in IndexedDB
- Tech stack: Multi-select with icon preview
```

#### **PROMPT 5: Build List Views with Search/Filter** (20 minutes)
```
Add list view for each category:
- Card-based grid layout (3 columns desktop, 1 mobile)
- Show thumbnail, title, quick stats per item
- Search bar filters by title/description
- Filter buttons: All, Featured, By Year, By Category
- Edit/Delete buttons per card
- Checkbox for bulk actions
- Sort options: Newest, Oldest, A-Z, Featured First
```

#### **PROMPT 6: Export Workflow** (25 minutes)
```
Create export functionality:
- "Export All" button generates:
  1. New projects.js file with ES6 syntax
  2. Individual JSON files per category
  3. All images extracted from base64
  4. ZIP file containing:
     - src/data/portfolio/frontend-projects.json
     - src/data/portfolio/design-showcase.json
     - src/data/portfolio/case-studies.json
     - src/data/portfolio/github-projects.json
     - src/data/portfolio/codepen-projects.json
     - public/images/portfolio/[all-images].webp
  5. README.txt with instructions
- Use JSZip library from CDN
- Download ZIP automatically
```

#### **PROMPT 7: Add Auto-Import Script** (20 minutes)
```
Create scripts/import-portfolio.js:
- Read the exported ZIP file
- Extract JSON files to src/data/portfolio/
- Extract images to public/images/portfolio/
- Optimize images with Sharp (WebP + fallback)
- Update paths in JSON files to match new locations
- Add npm script: "import:portfolio": "node scripts/import-portfolio.js"
- Show summary: X files copied, X images optimized
```

#### **PROMPT 8: Polish & Features** (20 minutes)
```
Add finishing touches:
- Undo/Redo functionality (keep last 10 actions in memory)
- Dark mode toggle with localStorage persistence
- Drag-drop reordering within lists
- Duplicate project feature
- Bulk delete with confirmation
- Export single category option
- Statistics dashboard: Total projects, by category, completion rate
- Keyboard shortcuts: Ctrl+S save, Ctrl+N new, Esc close dialogs
```

### 📋 Testing Checklist
- [ ] Load existing projects.js successfully
- [ ] Add new project in each category
- [ ] Edit existing project and verify changes
- [ ] Delete project with confirmation
- [ ] Search/filter works across all fields
- [ ] Export generates valid projects.js
- [ ] Export ZIP contains all images
- [ ] Import script places files correctly
- [ ] Dark mode persists across sessions
- [ ] Mobile responsive (test on 375px width)

### 🚀 Deployment Steps
1. Complete all 8 prompts above
2. Test full workflow: Import → Edit → Export
3. Run `npm run import:portfolio` with test export
4. Verify React app loads with new data
5. Build production: `npm run build`
6. Deploy to shared hosting Friday PM

### 📊 Time Breakdown
- Prompts 1-2: 25 min (Setup)
- Prompts 3-4: 50 min (Core functionality)
- Prompts 5-6: 45 min (UI & Export)
- Prompt 7: 20 min (Automation)
- Prompt 8: 20 min (Polish)
- Testing: 20 min
- **Total: 2h 40min**

### 💡 Quick Tips
- Use CDNs for all libraries (no npm install needed)
- Copy/paste existing projects.js structure for validation
- Test with small dataset first (3-5 items)
- Keep original projects.js as backup
- Use browser DevTools to debug IndexedDB

---

## 🔥 URGENT - Portfolio Management System (Due: Friday Afternoon)

### Goal
Create a local Next.js-based CMS for portfolio management with database, but build to **static assets** for shared hosting deployment.

**⚠️ NOTE: This full CMS approach is 10-14 hours. Use MVP above instead (2-3 hours).**

### Architecture Strategy
**Local Development:**
- Next.js with API routes for CMS functionality
- Database (SQLite/PostgreSQL) for portfolio items, images, metadata
- Admin panel for CRUD operations
- Image upload/optimization pipeline

**Production (Shared Hosting):**
- Static export (`next export` or similar)
- Pre-build script generates static JSON from database
- All images optimized and copied to `public/images/`
- No server-side rendering needed

### Phase 1: Planning & Architecture (2-3 hours) - **TONIGHT**
- [ ] **Choose database solution**
  - Option A: SQLite (file-based, easy local dev, no setup)
  - Option B: PostgreSQL (more robust, need Docker/local install)
  - **Recommendation:** SQLite for speed, can migrate later
  
- [ ] **Design database schema**
  - [ ] `projects` table (id, title, description, category, featured, tech_stack, etc.)
  - [ ] `images` table (id, project_id, path, type, alt_text, optimized_versions)
  - [ ] `categories` table (frontend, design, github, codepen, case-studies)
  - [ ] `tech_stack` table (technologies with icons/colors)
  
- [ ] **Plan admin interface**
  - [ ] Dashboard: Overview of all projects
  - [ ] Project CRUD: Add/Edit/Delete projects
  - [ ] Image management: Upload, crop, optimize, associate with projects
  - [ ] Bulk actions: Import existing projects.js data
  - [ ] Preview: Live preview before publishing

- [ ] **Define build pipeline**
  - [ ] Pre-build: Export database → JSON files
  - [ ] Image optimization: Process uploads → WebP + fallbacks
  - [ ] Static generation: Next.js export → Vite build
  - [ ] Deployment: Copy static files to shared hosting

### Phase 2: Core CMS Development (4-6 hours) - **THURSDAY**
- [ ] **Set up Next.js project structure**
  ```
  portfolio-cms/
  ├── app/
  │   ├── admin/              # Admin dashboard
  │   ├── api/                # API routes for CRUD
  │   └── layout.jsx
  ├── lib/
  │   ├── db.js               # Database connection
  │   └── schema.sql          # Database schema
  ├── scripts/
  │   ├── export-to-json.js   # DB → JSON export
  │   ├── import-projects.js  # Import existing data
  │   └── optimize-images.js  # Image processing
  └── public/
      └── uploads/            # Temporary upload storage
  ```

- [ ] **Database setup**
  - [ ] Install `better-sqlite3` or `pg`
  - [ ] Create schema with tables
  - [ ] Write seed script to import current `projects.js` data
  - [ ] Test CRUD operations

- [ ] **Admin panel basics**
  - [ ] Authentication (simple password or skip for local-only)
  - [ ] Projects list view with filters/search
  - [ ] Project form (add/edit)
  - [ ] Image uploader with drag-drop
  - [ ] Tech stack selector (multiselect)

- [ ] **API routes**
  - [ ] `GET /api/projects` - List all
  - [ ] `GET /api/projects/:id` - Single project
  - [ ] `POST /api/projects` - Create
  - [ ] `PUT /api/projects/:id` - Update
  - [ ] `DELETE /api/projects/:id` - Delete
  - [ ] `POST /api/images/upload` - Handle uploads
  - [ ] `POST /api/images/optimize` - Process images

### Phase 3: Integration & Export (2-3 hours) - **FRIDAY MORNING**
- [ ] **Export scripts**
  - [ ] `npm run export:data` - Database → JSON files
    - Output: `portfolio-data/frontend-projects.json`
    - Output: `portfolio-data/design-showcase.json`
    - Output: `portfolio-data/github-projects.json`
    - etc.
  
- [ ] **Image processing pipeline**
  - [ ] On upload: Generate WebP + fallback
  - [ ] Generate responsive sizes (1600, 1200, 800)
  - [ ] Move to `public/images/portfolio/`
  - [ ] Update database with optimized paths

- [ ] **Build pipeline**
  - [ ] Create `npm run build:cms` script
    1. Export database to JSON
    2. Optimize all images
    3. Copy JSON to React app `src/data/portfolio/`
    4. Copy images to React app `public/images/`
  
- [ ] **Update React app**
  - [ ] Replace `projects.js` with JSON imports
  - [ ] Update image paths to use optimized versions
  - [ ] Test all portfolio sections

### Phase 4: Testing & Deployment (1-2 hours) - **FRIDAY AFTERNOON**
- [ ] **Local testing**
  - [ ] Add/edit/delete projects via CMS
  - [ ] Upload images and verify optimization
  - [ ] Run export script and verify JSON output
  - [ ] Build React app with exported data
  - [ ] Test all portfolio sections load correctly

- [ ] **Production build**
  - [ ] Run full build pipeline
  - [ ] Verify static assets generated
  - [ ] Check bundle size
  - [ ] Test on local server (preview)

- [ ] **Deploy to shared hosting**
  - [ ] Upload build files via FTP/cPanel
  - [ ] Verify all images load
  - [ ] Test all portfolio sections live
  - [ ] Performance check (Lighthouse)

### Alternative: Rapid MVP (If Time-Constrained)
**Skip full CMS, use simpler approach:**

#### 🎯 Enhanced Rapid MVP Specification

**Single HTML file:** `tools/portfolio-manager.html`

**Core Features:**
- ✅ **5 Tabbed Categories:**
  1. Front-End Projects
  2. UI/UX & Design
  3. Case Studies
  4. GitHub Projects
  5. CodePen Experiments

- ✅ **Data Persistence:**
  - Browser IndexedDB for local storage
  - Import existing `projects.js` on first load
  - Never overwrites - merge conflicts handled via dialog

- ✅ **Dynamic Forms Per Category:**
  - **Frontend Projects:** title, img, desc, description, secimg, addimg, videos, role, year, featured, githubUrl, liveUrl, metrics, keyLearnings, tech[]
  - **Design Showcase:** title, category, image, description, tags[]
  - **Case Studies:** id, title, subtitle, category, tags[], thumbnail, featured, overview, challenge, solution, results, technologies[], role, duration, images[], metrics, keyTakeaways[]
  - **GitHub Projects:** name, description, url, liveUrl, thumbnail, topics[], language, icon
  - **CodePen Projects:** title, description, url, embedUrl, tags[], featured

- ✅ **Image Handling (Enhanced):**
  - Upload images → Convert to base64 → Store in IndexedDB
  - Export creates ZIP file containing:
    - `data/portfolio/frontend-projects.json`
    - `data/portfolio/design-showcase.json`
    - `data/portfolio/case-studies.json`
    - `data/portfolio/github-projects.json`
    - `data/portfolio/codepen-projects.json`
    - `public/images/portfolio/projects/[all-images].webp`
  - **No manual copying needed** - extract ZIP and run import script

- ✅ **Import/Export Workflow:**
  ```
  1. Open tools/portfolio-manager.html
  2. Click "Import Existing Data" → Paste projects.js content
  3. Add/Edit projects via tabbed forms
  4. Click "Export All" → Downloads portfolio-export.zip
  5. Extract ZIP to project root
  6. Run: npm run import:portfolio (auto-copies files)
  7. Build & deploy
  ```

- ✅ **Features:**
  - List view with search/filter per category
  - Add/Edit/Delete/Duplicate projects
  - Image preview before upload
  - Tech stack multi-select with icons
  - Featured toggle
  - Drag-drop image ordering
  - Validation before save
  - Undo/Redo support
  - Dark mode UI

- ✅ **Auto-Import Script:**
  ```javascript
  // scripts/import-portfolio.js
  // Reads portfolio-export.zip
  // Copies JSON to src/data/portfolio/
  // Optimizes images to WebP + fallback
  // Updates paths in JSON
  // No manual work required
  ```

**Build Time:** 2-3 hours
**Deliverables:**
- [ ] `tools/portfolio-manager.html` - Full featured editor
- [ ] `scripts/import-portfolio.js` - Auto-import script
- [ ] `package.json` - Add `"import:portfolio"` script
- [ ] `README-PORTFOLIO-MANAGER.md` - Usage guide

**Development Tasks:**
- [ ] Create HTML shell with Tailwind CSS CDN
- [ ] Implement IndexedDB schema (5 tables)
- [ ] Build tabbed navigation
- [ ] Create dynamic form generator per category
- [ ] Add import parser (JavaScript → JSON)
- [ ] Implement merge conflict resolver
- [ ] Add image upload with base64 conversion
- [ ] Create export functionality (ZIP generation)
- [ ] Build auto-import Node.js script
- [ ] Add search/filter/validation
- [ ] Test full workflow end-to-end

**Friday Timeline:**
- **Tonight (Wed):** Build MVP (2-3 hours)
- **Thursday:** Import existing data, test workflow (1 hour)
- **Friday AM:** Final content updates via editor
- **Friday PM:** Export, build, deploy

### Tech Stack Recommendations
- **Database:** SQLite (`better-sqlite3`) - Zero config
- **Admin UI:** Next.js App Router + React Hook Form + TailwindCSS
- **Image Processing:** `sharp` (already installed)
- **Forms:** `react-hook-form` + `zod` validation
- **File Upload:** `react-dropzone`
- **Export:** Custom Node.js scripts

### Timeline Summary
- **Tonight (Wed):** Planning, schema design, setup (2-3h)
- **Thursday:** Core CMS development (4-6h)
- **Friday AM:** Integration & export pipeline (2-3h)
- **Friday PM:** Testing & deployment (1-2h)
- **Total:** ~10-14 hours (aggressive but doable)

**Question:** Do you want the full CMS or the rapid MVP approach?

---

## 🚀 Do First (30 minutes) - **#1**

### Migrate from Gulp to Vite-only Build
**Why:** You're doing double work - Gulp compiles SCSS → CSS, then Vite bundles it. Vite has native SCSS support and can handle everything faster with HMR.

- [ ] Update `src/main.jsx` to import SCSS directly
  ```js
  // Change from:
  import "./css/style.css";
  
  // To:
  import "./scss/style.scss";
  ```
- [ ] Update `package.json` scripts
  ```json
  "dev": "vite",
  "build": "vite build",  // Remove "gulp styles &&"
  "build:staging": "cross-env BUILD_OUT_DIR=staging vite build"
  // Remove "styles": "gulp styles"
  ```
- [ ] Uninstall Gulp dependencies
  ```powershell
  npm uninstall gulp gulp-sass gulp-clean-css gulp-rename gulp-sourcemaps gulp-strip-css-comments
  ```
- [ ] Delete `gulpfile.cjs`
- [ ] Delete `src/css/` directory (generated output, no longer needed)
- [ ] Update `.gitignore` to ignore `src/css/` if present
- [ ] Test dev server: `npm run dev` (SCSS should compile automatically)
- [ ] Test production build: `npm run build`

**Benefits:**
- ⚡ Faster HMR for SCSS changes
- 📦 Smaller node_modules (6 fewer packages)
- 🔧 Single build tool (Vite handles everything)
- 🚀 Optimized production CSS automatically

---

### Image & File Cleanup
- [ ] Delete `public/images/portfolio-backup-20251017-003204` folder
- [ ] Remove commented code from `src/scss/components/contact/_contact.scss` (lines 8-160)
- [ ] Consolidate duplicate variables in `src/scss/abstracts/_variables.scss`
  - [ ] Remove `$text` (keep `$text-dark: #333`)
  - [ ] Remove `$trajan` (keep `$font-heading`)

### Quick SCSS Cleanup
- [ ] Delete unused SCSS files
  - [ ] `src/scss/base/_base-fixed.scss` (duplicate of `_base.scss`)
  - [ ] `src/scss/base/_imp-atf.scss` (underutilized)

---

## ⚡ Do Next (2 hours)

### Component Organization
- [ ] Move `Skeleton.jsx` to `src/components/common/Skeleton.jsx`
- [ ] Move `Loader.jsx` to `src/components/common/Loader.jsx`
- [ ] Update `src/components/common/index.js` exports
  ```js
  export { default as Skeleton, SkeletonBlock } from './Skeleton';
  export { default as Loader } from './Loader';
  ```
- [ ] Update all component imports to use `common/`
  - [ ] Update blog components
  - [ ] Update contact component
  - [ ] Update any other imports

### Data Splitting
- [ ] Create `src/data/portfolio/` directory structure
- [ ] Split `src/components/portfolio/projects.js` into:
  - [ ] `frontend-projects.js` (Main portfolio projects)
  - [ ] `design-showcase.js` (Design mockups)
  - [ ] `github-projects.js` (GitHub repos)
  - [ ] `codepen-projects.js` (CodePen experiments)
  - [ ] `case-studies.js` (Detailed case studies)
  - [ ] `gallery-tabs.js` (Gallery configuration)
  - [ ] `index.js` (Barrel export)
- [ ] Update imports in Portfolio.jsx and other components

### Portfolio Management Setup
- [ ] Review Front-end Projects structure
- [ ] Review UI/UX & Design showcase
- [ ] Review Case Studies organization
- [ ] Review GitHub projects integration
- [ ] Review CodePen integration

---

## 🔮 Do Eventually (4+ hours)

---

## 🎯 Image Organization & Asset Structure - **#2 PRIORITY**

### Reorganize `src/assets/images/` Subdirectories
**Current Issue:** All UI assets dumped in one folder, hard to navigate and maintain.

**New Structure:**
```
src/assets/images/
├── profile/
│   ├── riadkilani-profile.webp
│   ├── riadkilani-profile.png (fallback)
│   └── riadkilani-profile-sm.webp (optional smaller version)
├── branding/
│   ├── riad-kilani-logo.webp
│   ├── riad-kilani-logo.png (fallback)
│   ├── riad-kilani-logo-white.webp (if needed)
│   └── favicon/ (if storing locally)
├── steps/
│   ├── discovery-planning-step-1.png
│   ├── wireframing-design-step-2.png
│   ├── development-step-3.png
│   ├── testing-accessibility-step-4.png
│   ├── performance-optimization-step-5.png
│   └── deployment-maintenance-step-6.png
└── icons/ (optional - for SVG icons if not using Font Awesome)
    ├── illustrator-brands.svg
    ├── photoshop-brands.svg
    ├── xd-brands.svg
    ├── tailwind-brands.svg
    └── etc.
```

#### Tasks:
- [ ] **Create subdirectory structure**
  ```powershell
  mkdir src\assets\images\profile
  mkdir src\assets\images\branding
  mkdir src\assets\images\steps
  mkdir src\assets\images\icons
  ```

- [ ] **Move existing files**
  - [ ] Move `riadkilani-profile.*` → `profile/`
  - [ ] Move `riad-kilani-logo.*` → `branding/`
  - [ ] Move all step images → `steps/`
  - [ ] Move brand SVGs → `icons/`

- [ ] **Update import paths**
  - [ ] Update `HeroSection.jsx`
    ```js
    // Before:
    import profileImg from "../../../assets/images/riadkilani-profile.webp";
    
    // After:
    import profileImg from "../../../assets/images/profile/riadkilani-profile.webp";
    ```
  - [ ] Update `ProcessSection.jsx` (6 step images)
  - [ ] Update `SkillsSection.jsx` (icon imports)
  - [ ] Update `TechIcon.jsx` or `TechBadge.jsx`
  - [ ] Update SCSS files (logo backgrounds in header/footer)

- [ ] **Update SCSS image references**
  - [ ] `src/scss/base/_header.scss` - Logo path
  - [ ] `src/scss/base/_footer.scss` - Logo path
  - [ ] Any other SCSS using `url(../assets/images/...)`

- [ ] **Verify all images load**
  - [ ] Test hero profile image
  - [ ] Test header/footer logos
  - [ ] Test bio process section
  - [ ] Test skills section icons
  - [ ] Run dev server and check for 404s

---

### Portfolio Images (`public/images/portfolio/`)

#### 🎯 Understanding Current Structure
**Why use `public/images/` for portfolio vs `src/assets/images/`?**

- **`public/images/portfolio/`** ✅ Correct for portfolio
  - Served as-is, no Vite processing
  - Data-driven (600+ images in `projects.js`)
  - Direct URL access: `/images/portfolio/design/image.webp`
  - Can add/remove without rebuild
  - Perfect for CMS-style content

- **`src/assets/images/`** ✅ Correct for UI assets
  - Vite-processed, imported as modules
  - Small, static UI assets (logos, profile, icons)
  - Build-time hashed filenames
  - Examples: `riad-kilani-logo.webp`, `riadkilani-profile.webp`, step images

**Current Issues:**
- Multiple duplicate folders in `public/images/` (original, optimized, backup)
- Inconsistent path references in `projects.js`
- No unified WebP + fallback strategy
- Old backup directories taking space

#### 🎯 Image Reorganization Tasks

- [ ] **Audit current image structure**
  - [ ] Count total portfolio images across all folders
  - [ ] Identify duplicates between `portfolio/` and `portfolio-optimized/`
  - [ ] Document which paths are used in `projects.js` vs `gallery-tabs`
  - [ ] Check if any components use direct image imports

- [ ] **Clean up duplicate/backup folders**
  - [ ] Delete `public/images/portfolio-backup-20251017-003204/`
  - [ ] Decide: Keep originals or only optimized versions?
  - [ ] Merge `portfolio/` and `portfolio-optimized/` into single structure

- [ ] **Implement WebP + fallback structure**
  ```
  public/images/
  ├── portfolio/
  │   ├── design/
  │   │   ├── logo-design.webp (primary, optimized)
  │   │   ├── logo-design.jpg (fallback)
  │   │   ├── logo-design@1600.webp (responsive size)
  │   │   └── logo-design@1200.webp (responsive size)
  │   ├── mobile/
  │   ├── mockups/
  │   └── projects/
  
  src/assets/images/
  ├── riad-kilani-logo.webp (UI asset, Vite-processed)
  ├── riad-kilani-logo.png (fallback)
  ├── riadkilani-profile.webp
  ├── riadkilani-profile.png
  └── steps/ (Bio process images)
  ```

- [ ] **Update image optimization tooling**
  - [ ] Modify `tools/optimize-images.mjs`:
    - [ ] Generate WebP + JPEG/PNG fallback
    - [ ] Emit multiple sizes (1600px, 1200px, 800px)
    - [ ] Create srcset metadata JSON
    - [ ] Add `--clean` flag to remove originals after optimization
  - [ ] Add npm script: `"images:optimize": "node tools/optimize-images.mjs"`
  - [ ] Run optimization on all portfolio images

- [ ] **Update path references**
  - [ ] Update `projects.js` → `data/portfolio/frontend-projects.js`
  - [ ] Update `projects.js` → `data/portfolio/design-showcase.js`
  - [ ] Update `projects.js` → `data/portfolio/github-projects.js`
  - [ ] Update `projects.js` → `data/portfolio/codepen-projects.js`
  - [ ] Update `projects.js` → `data/portfolio/case-studies.js`
  - [ ] Update `gallery-tabs.js` with new optimized paths

- [ ] **Create image utilities (optional)**
  - [ ] Create `src/utils/imageHelpers.js`:
    ```js
    // Generate srcset for responsive images
    export const getPortfolioImageSrcSet = (basePath) => { ... }
    // Get WebP with fallback
    export const getImageWithFallback = (path) => { ... }
    ```
  - [ ] Create `image-manifest.json` for frequently used paths (optional)

- [ ] **Verify and test**
  - [ ] Check all portfolio images load correctly
  - [ ] Verify lightbox/modal images work
  - [ ] Test on slow connection (DevTools throttling)
  - [ ] Confirm fallbacks work when WebP unsupported

### Accessibility & Motion
- [ ] Add `prefers-reduced-motion` gating to animations
  - [ ] Create `useReducedMotion()` hook
  - [ ] Update BlogSection.jsx
  - [ ] Update HeroSection.jsx
  - [ ] Update FeaturedWorkSection.jsx
  - [ ] Update all other animated sections
- [ ] Add proper `aria-labels` to interactive cards
- [ ] Improve alt text for images (strip HTML from titles)
- [ ] Ensure visible focus states match hover states

### Component Enhancements
- [ ] Create `BlogCard` component
  - [ ] Extract from `BlogSection.jsx`
  - [ ] Add props: `post`, `index`, `variant`
  - [ ] Add accessibility improvements
  - [ ] Support reduced motion
  - [ ] Export from `common/index.js`
- [ ] Create `ResponsiveImage` helper component
  - [ ] Support `srcset` and `sizes`
  - [ ] Add placeholder support
  - [ ] Add fallback handling
  - [ ] Use in BlogSection
  - [ ] Use in Portfolio cards
- [ ] Add blog empty/error states
  - [ ] Accept `loading`/`error` props in BlogSection
  - [ ] Add Skeleton placeholders
  - [ ] Add empty state with CTA
  - [ ] Wire to Home.jsx fetch

### SCSS Improvements
- [ ] Create syntax highlighting color palette
  ```scss
  $syntax-bg: #1e1e1e;
  $syntax-text: #d4d4d4;
  $syntax-comment: #6a9955;
  $syntax-keyword: #569cd6;
  $syntax-string: #ce9178;
  ```
- [ ] Create alert/status color system
  ```scss
  $alert-success: #10b981;
  $alert-error: #ef4444;
  $alert-warning: #f59e0b;
  $alert-info: #3b82f6;
  ```
- [ ] Add code font variable
  ```scss
  $font-code: "Fira Code", "Consolas", "Monaco", monospace;
  ```
- [ ] Replace hardcoded colors in blog syntax highlighting
  - [ ] `src/scss/components/blog/_syntax-highlight.scss`
  - [ ] `src/scss/components/blog/_layout.scss`
- [ ] Replace hardcoded colors in modals
  - [ ] `src/scss/utils/_modal.scss`
- [ ] Replace hardcoded colors in contact forms
  - [ ] `src/scss/components/contact/_contact.scss`

### Tech Icon Consolidation
- [ ] Review `TechIcon.jsx` usage
- [ ] Ensure `TechBadge.jsx` covers all use cases
- [ ] Migrate any TechIcon usage to TechBadge
- [ ] Delete `src/components/TechIcon.jsx` if redundant

### Cleanup & Documentation
- [ ] Delete unused files/directories
  - [ ] Review and remove old backups
  - [ ] Review and remove unused utilities
- [ ] Add inline documentation for complex components
- [ ] Update component prop types/interfaces
- [ ] Review and update README.md if needed

---

## 📋 Future Enhancements

### Performance
- [ ] Add `sizes` and `srcSet` to all images
- [ ] Defer Font Awesome CSS if not critical
- [ ] Verify `preconnect` hints in `index.html`
- [ ] Consider using `<picture>` elements for art direction

### Code Quality
- [ ] Extract date formatting into utility function
- [ ] Add configurable `count` prop to BlogSection
- [ ] Sanitize WordPress titles or decode entities safely
- [ ] Add error boundaries for component failures

### Testing & QA
- [ ] Test keyboard navigation across all cards
- [ ] Test screen reader announcements
- [ ] Test reduced motion preferences
- [ ] Test empty/error states
- [ ] Verify responsive breakpoints

---

## 🎨 Active Development

- [ ] **Bio page UI modernization**
  - Update bio page with modern UI matching home page design
  - Apply Material Design 3 principles
  - Add glassmorphism effects
  - Implement smooth animations
  - Work iteratively as we go

---

## 📝 Notes

- **Priority:** Focus on "Do First" items for immediate wins
- **Testing:** Test each change thoroughly before moving to next
- **Git:** Commit changes in logical groups (e.g., all SCSS cleanup together)
- **Review:** Check for any broken imports or missing dependencies after refactoring

---

*Last Updated: November 20, 2025*
