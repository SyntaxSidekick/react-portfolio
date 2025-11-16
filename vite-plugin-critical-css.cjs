/**
 * Vite Plugin: Critical CSS Inline
 * Inlines critical CSS and makes the main CSS non-blocking
 */

function criticalCssPlugin() {
  return {
    name: 'vite-plugin-critical-css',
    enforce: 'post',
    
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        // Replace the stylesheet link with preload + onload pattern
        html = html.replace(
          /<link rel="stylesheet"([^>]*)href="\/assets\/index-[^"]+\.css"([^>]*)>/g,
          (match, before, after) => {
            const href = match.match(/href="([^"]*)"/)?.[1];
            if (!href) return match;
            
            return `<link rel="preload" as="style"${before}href="${href}"${after} onload="this.onload=null;this.rel='stylesheet'" />\n  <noscript><link rel="stylesheet"${before}href="${href}"${after}></noscript>`;
          }
        );
        
        return html;
      }
    }
  };
}

module.exports = criticalCssPlugin;
