# 📦 Portfolio Manager - User Guide

A browser-based portfolio management tool with automatic import/export workflow.

## 🚀 Quick Start

### 1. Open Portfolio Manager
```bash
# Open the HTML file in your browser
start tools/portfolio-manager.html
# Or simply double-click: tools/portfolio-manager.html
```

### 2. Import Existing Data (First Time Only)
1. Click the **"+"** button (bottom-right)
2. Select "Import from projects.js"
3. Paste your existing `src/components/portfolio/projects.js` content
4. Review duplicates (if any) and choose merge strategy
5. Click "Import" - data is now stored in IndexedDB

### 3. Manage Your Portfolio
- **Add Projects**: Click the **"+"** button
- **Edit Projects**: Click edit icon on any card
- **Delete Projects**: Click trash icon (or bulk select)
- **Search/Filter**: Use search bar and filter buttons
- **Sort**: Use dropdown (Newest, A-Z, Featured First)

### 4. Export Your Work
1. Click the **green download button** (bottom-right)
2. Wait for ZIP generation (shows spinner)
3. ZIP file downloads automatically: `portfolio-export-YYYY-MM-DD.zip`

### 5. Import to React Project
```bash
# Run the auto-import script
npm run import:portfolio

# This will:
# ✅ Extract JSON files to src/data/portfolio/
# ✅ Optimize images to public/images/portfolio/
# ✅ Generate WebP + fallback formats
# ✅ Update all image paths automatically
```

---

## 📁 What Gets Exported

### ZIP File Structure
```
portfolio-export-2025-11-20.zip
├── src/
│   ├── components/portfolio/
│   │   └── projects.js          (Consolidated ES6 module)
│   └── data/portfolio/
│       ├── frontend-projects.json
│       ├── design-projects.json
│       ├── case-studies-projects.json
│       ├── github-projects.json
│       └── codepen-projects.json
├── public/images/portfolio/
│   ├── frontend/
│   ├── design/
│   ├── case-studies/
│   ├── github/
│   └── codepen/
└── README.txt                   (Installation instructions)
```

### Generated Files

1. **projects.js** - Ready to drop into React app
2. **JSON files** - Individual data files per category
3. **Images** - All extracted from base64, organized by category
4. **README.txt** - Step-by-step import instructions

---

## 🎨 Features

### 5 Portfolio Categories
1. **Frontend Projects** - Full-stack web applications
2. **UI/UX Design** - Design mockups and showcases
3. **Case Studies** - Detailed project breakdowns
4. **GitHub Projects** - Open source repositories
5. **CodePen Experiments** - Creative coding demos

### Dynamic Forms
- **Auto-adapting fields** per category
- **Image uploads** with preview
- **Tech stack selector** with icons
- **Validation** before save
- **Auto-save** while editing (debounced)

### Smart Search & Filtering
- Search by title/description
- Filter by featured status
- Filter by year
- Filter by category/tags
- Sort: Newest, Oldest, A-Z, Featured First

### Bulk Actions
- Select multiple items
- Bulk delete with confirmation
- Export single category

---

## 🛠️ Technical Details

### Storage
- **IndexedDB** for browser-based persistence
- **5 Object Stores** matching `projects.js` schema
- **Automatic indexing** on key fields (title, year, featured)

### Image Handling
- **Upload**: Converts to base64 for storage
- **Export**: Extracts to separate WebP files
- **Import**: Optimizes with Sharp (WebP + fallback)
- **Responsive**: Generates multiple sizes (1600px, 1200px, 800px)

### Import Script Features
- Automatic ZIP detection (most recent)
- Image optimization with Sharp
- WebP primary + JPEG/PNG fallback
- Path updates in JSON files
- Progress reporting
- Error handling

---

## 📊 Import Script Details

### What It Does
```bash
npm run import:portfolio
```

1. **Finds ZIP**: Locates `portfolio-export-*.zip` in project root
2. **Extracts JSON**: Copies to `src/data/portfolio/`
3. **Processes Images**: Optimizes and saves to `public/images/portfolio/`
4. **Generates Formats**:
   - Primary: `.webp` (85% quality)
   - Fallback: `.jpg` or `.png` (90% quality)
5. **Updates Paths**: Changes references in JSON files
6. **Reports**: Shows summary statistics

### Output Example
```
📊 IMPORT SUMMARY
============================================================
Source: portfolio-export-2025-11-20.zip
Duration: 12.45s

✅ JSON Files Copied: 5
✅ Images Extracted: 47
✅ Images Optimized: 47
✅ WebP Generated: 47
✅ Fallbacks Generated: 47
============================================================
```

---

## 🔧 Troubleshooting

### "No ZIP file found"
- Ensure you've exported from Portfolio Manager first
- ZIP must be in project root directory
- Filename must match: `portfolio-export-*.zip`

### "Import failed on images"
- Check Sharp is installed: `npm install sharp`
- Verify write permissions on `public/images/`
- Check available disk space

### "JSON files not updating"
- Verify `src/data/portfolio/` directory exists
- Check for file permission issues
- Review error messages in console

### "Images not displaying in React"
- Clear browser cache
- Check paths in JSON: should be `/images/portfolio/...`
- Verify images exist in `public/images/portfolio/`
- Rebuild project: `npm run build`

---

## 💡 Tips & Best Practices

### Before Exporting
- ✅ Review all projects for completeness
- ✅ Ensure all images are uploaded
- ✅ Mark featured projects appropriately
- ✅ Fill in required fields (title, description)

### After Importing
- ✅ Review imported JSON files
- ✅ Check optimized images
- ✅ Test dev server: `npm run dev`
- ✅ Verify all portfolio sections load
- ✅ Check image quality and performance

### Regular Workflow
1. **Edit** in Portfolio Manager
2. **Export** when ready
3. **Import** to React project
4. **Test** locally
5. **Build** for production
6. **Deploy**

### Backup Strategy
- Keep original `projects.js` as backup
- Export regularly during editing
- Version control your exports
- Test imports before deploying

---

## 🎯 Next Steps After Import

1. **Update Components** (if using new data structure)
   ```jsx
   // Old way
   import { projects } from '../components/portfolio/projects.js';
   
   // New way (if using split files)
   import frontendProjects from '../data/portfolio/frontend-projects.json';
   ```

2. **Verify Image Paths**
   ```jsx
   // Images should reference optimized WebP
   <img src="/images/portfolio/frontend/project-1.webp" alt="..." />
   ```

3. **Test Responsive Images** (optional)
   ```jsx
   <picture>
     <source srcset="/images/portfolio/frontend/project-1.webp" type="image/webp" />
     <img src="/images/portfolio/frontend/project-1.jpg" alt="..." />
   </picture>
   ```

4. **Build and Deploy**
   ```bash
   npm run build
   # Upload dist/ to your hosting
   ```

---

## 📚 Schema Reference

### Frontend Projects
```javascript
{
  title: String,
  img: String,           // Main image path
  desc: String,          // Short description
  secimg: String,        // Secondary image
  addimg: Array,         // Additional images
  videos: Array,         // Video URLs
  description: String,   // Full description
  role: String,
  year: Number,
  featured: Boolean,
  githubUrl: String,
  liveUrl: String,
  metrics: Object,
  keyLearnings: Array,
  tech: Array           // Tech stack
}
```

### Design Showcase
```javascript
{
  title: String,
  category: String,      // UI, UX, Branding, etc.
  image: String,
  description: String,
  tags: Array
}
```

### Case Studies
```javascript
{
  id: String,
  title: String,
  subtitle: String,
  category: String,
  tags: Array,
  thumbnail: String,
  featured: Boolean,
  overview: String,
  challenge: String,
  solution: String,
  results: String,
  technologies: Array,
  role: String,
  duration: String,
  images: Array,
  metrics: Object,
  keyTakeaways: Array
}
```

### GitHub Projects
```javascript
{
  name: String,
  description: String,
  url: String,
  liveUrl: String,
  thumbnail: String,
  topics: Array,
  language: String,
  icon: String          // Font Awesome icon class
}
```

### CodePen Projects
```javascript
{
  title: String,
  description: String,
  url: String,
  embedUrl: String,
  tags: Array,
  featured: Boolean
}
```

---

## 🔐 Data Privacy

- **Local Only**: All data stored in your browser's IndexedDB
- **No Cloud**: No external servers or databases
- **Portable**: Export anytime, import anywhere
- **Secure**: Images converted to base64 or extracted locally

---

## 📞 Support

For issues or questions:
1. Check this README
2. Review console for error messages
3. Verify file permissions and paths
4. Check Node.js version (v18+ recommended)
5. Ensure all dependencies installed: `npm install`

---

*Last Updated: November 20, 2025*
