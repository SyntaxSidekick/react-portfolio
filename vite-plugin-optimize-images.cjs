/**
 * Vite Plugin: Transform Portfolio Image Paths
 * 
 * Automatically transforms image paths during build from raw to optimized versions:
 * - /images/portfolio/* → /images/portfolio-optimized/*
 * - Adds -1600 size suffix for high-quality display
 * - Changes extension to .webp for optimal performance
 * 
 * Only runs during production build, not in dev mode.
 */

function optimizeImagePaths() {
  return {
    name: 'vite-plugin-optimize-images',
    
    apply: 'build', // Only run during build, not dev
    
    transform(code, id) {
      // Only process JavaScript/TypeScript files
      if (!id.match(/\.(jsx?|tsx?)$/)) {
        return null;
      }
      
      // Only transform portfolio image paths
      if (!code.includes('/images/portfolio/')) {
        return null;
      }
      
      // Transform pattern: /images/portfolio/{category}/{filename}.{ext}
      // To: /images/portfolio-optimized/{category}/{filename}-1600.webp
      const transformed = code.replace(
        /(['"])\/images\/portfolio\/([\w-]+)\/([\w-]+)\.(png|jpg|jpeg)(['"])/g,
        (match, quote1, category, filename, ext, quote2) => {
          return `${quote1}/images/portfolio-optimized/${category}/${filename}-1600.webp${quote2}`;
        }
      );
      
      if (transformed !== code) {
        return {
          code: transformed,
          map: null // Skip source map generation for this simple transformation
        };
      }
      
      return null;
    }
  };
}

module.exports = optimizeImagePaths;
