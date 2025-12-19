/**
 * Lighthouse CI Configuration
 *
 * Purpose: Automated performance audits on every change
 * Metrics:
 *   - Performance: > 90
 *   - Accessibility: 100
 *   - Best Practices: > 90
 *   - SEO: 100
 */

export default {
  ci: {
    collect: {
      // Static directory to serve
      staticDistDir: './examples',
      // URLs to audit (relative to staticDistDir)
      url: [
        'http://localhost/sample.html',
        'http://localhost/constitution.html',
        'http://localhost/homepage/original.html',
        'http://localhost/about/index.html',
        'http://localhost/faq/index.html'
      ],
      // Number of runs per URL for more reliable results
      numberOfRuns: 3
    },
    assert: {
      preset: 'lighthouse:no-pwa',
      assertions: {
        // Performance budget (> 90)
        'categories:performance': ['error', { minScore: 0.9 }],

        // Accessibility must be perfect (100)
        'categories:accessibility': ['error', { minScore: 1.0 }],

        // Best Practices budget (> 90)
        'categories:best-practices': ['error', { minScore: 0.9 }],

        // SEO must be perfect (100)
        'categories:seo': ['error', { minScore: 1.0 }],

        // Specific performance budgets
        'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['warn', { maxNumericValue: 300 }],

        // Accessibility assertions
        'color-contrast': 'error',
        'document-title': 'error',
        'html-has-lang': 'error',
        'meta-description': 'error',
        'valid-lang': 'error',

        // Best practices
        'errors-in-console': 'warn',
        'no-vulnerable-libraries': 'error',

        // SEO
        'meta-viewport': 'error',
        'robots-txt': 'off',
        'canonical': 'warn'
      }
    },
    upload: {
      // Placeholder for future CI/CD integration
      // Can be configured to upload to Lighthouse CI server
      target: 'temporary-public-storage'
    }
  }
};
