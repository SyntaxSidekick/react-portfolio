const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react');
const { viteStaticCopy } = require('vite-plugin-static-copy');
const svgr = require('vite-plugin-svgr').default;
const criticalCssPlugin = require('./vite-plugin-critical-css.cjs');

// https://vite.dev/config/
module.exports = defineConfig({
  build: {
    outDir: process.env.BUILD_OUT_DIR ?? 'dist',
    cssCodeSplit: true, // Split CSS per route for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor code for better caching
          'vendor-react': ['react', 'react-dom', 'react-router-dom']
        }
      }
    }
  },
  plugins: [
    react(),
    svgr(),
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
        }
      ]
    })
  ],
});
