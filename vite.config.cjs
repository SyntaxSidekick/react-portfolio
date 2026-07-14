const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react');
const { viteStaticCopy } = require('vite-plugin-static-copy');
const svgr = require('vite-plugin-svgr').default;
const criticalCssPlugin = require('./vite-plugin-critical-css.cjs');
const optimizeImagePaths = require('./vite-plugin-optimize-images.cjs');

// https://vite.dev/config/
module.exports = defineConfig({
  build: {
    outDir: process.env.BUILD_OUT_DIR ?? 'dist',
    copyPublicDir: false, // Disable auto-copy of public folder during build - we manually control it

    cssCodeSplit: true, // Split CSS per route for better caching
    chunkSizeWarningLimit: 600, // Slightly higher limit for vendor chunks
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks - split large libraries separately
          if (id.includes('node_modules')) {
            // React ecosystem
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'vendor-react';
            }
            // Material-UI
            if (id.includes('@mui') || id.includes('@emotion')) {
              return 'vendor-mui';
            }
            // Framer Motion (animations)
            if (id.includes('framer-motion')) {
              return 'vendor-framer';
            }
            // Font Awesome icons
            if (id.includes('fortawesome')) {
              return 'vendor-icons';
            }
            // Other vendor libraries
            return 'vendor-libs';
          }
          
          // Split application code by route/feature
          if (id.includes('/src/components/')) {
            // Blog-related components
            if (id.includes('/blog/')) {
              return 'feature-blog';
            }
            // Portfolio components
            if (id.includes('/portfolio/')) {
              return 'feature-portfolio';
            }
            // Home components
            if (id.includes('/home/')) {
              return 'feature-home';
            }
            // Bio components
            if (id.includes('/bio/')) {
              return 'feature-bio';
            }
            // Contact components
            if (id.includes('/contact/')) {
              return 'feature-contact';
            }
          }
        }
      }
    }
  },
  plugins: [
    react(),
    svgr(),
    optimizeImagePaths(),
    criticalCssPlugin(),
    viteStaticCopy({
      targets: [
        // Copy SEO files
        {
          src: 'public/robots.txt',
          dest: '.'
        },
        {
          src: 'public/sitemap.xml',
          dest: '.'
        },
        // Copy optimized portfolio images only (exclude raw portfolio folder)
        {
          src: 'public/images/portfolio-optimized/**/*',
          dest: 'images/portfolio-optimized'
        },
        // Copy other image assets (excluding portfolio folder)
        {
          src: 'public/images/.gitkeep',
          dest: 'images'
        },
        // Copy previews folder if it exists
        {
          src: 'public/assets/**/*',
          dest: 'assets'
        }
      ]
    })
  ],
});
