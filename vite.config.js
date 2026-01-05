import { defineConfig } from 'vite';
import { resolve } from 'path';
import { readdirSync, statSync } from 'fs';

/**
 * Recursively find all HTML files in a directory
 * @param {string} dir - Directory to search
 * @param {string} base - Base path for keys
 * @returns {Object} Input configuration for Rollup
 */
function findHtmlFiles(dir, base = '') {
  const inputs = {};

  try {
    const files = readdirSync(dir);

    for (const file of files) {
      const filePath = resolve(dir, file);
      const stat = statSync(filePath);

      if (stat.isDirectory()) {
        // Skip node_modules, dist, and hidden directories
        if (!file.startsWith('.') && file !== 'node_modules' && file !== 'dist') {
          Object.assign(inputs, findHtmlFiles(filePath, base ? `${base}/${file}` : file));
        }
      } else if (file.endsWith('.html')) {
        // Create a key from the path (e.g., 'about/index' or 'errors/404')
        const key = base
          ? `${base}/${file.replace('.html', '')}`
          : file.replace('.html', '');
        // Normalize key to be valid (replace slashes with underscores for nested)
        const normalizedKey = key.replace(/\//g, '_').replace(/^index$/, 'main');
        inputs[normalizedKey] = filePath;
      }
    }
  } catch {
    // Directory doesn't exist yet, return empty
  }

  return inputs;
}

export default defineConfig({
  // Project root (where HTML files are)
  root: 'src',

  // Public base path
  base: '/',

  // Build output
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      // Dynamically find all HTML files in src/
      input: findHtmlFiles(resolve(__dirname, 'src')),
    },
  },

  // Development server
  server: {
    port: 3000,
    open: true,
    cors: true,
  },

  // Preview server (for testing production build)
  preview: {
    port: 4173,
  },
});
