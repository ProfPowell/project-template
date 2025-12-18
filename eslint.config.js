/**
 * ESLint Flat Configuration
 *
 * Enforces vanilla JavaScript patterns for Web Components:
 * - Functional core, imperative shell
 * - JSDoc documentation
 * - Named exports only
 * - i18n support patterns
 */

import js from '@eslint/js';

export default [
  js.configs.recommended,
  // Global ignores
  {
    ignores: [
      'node_modules/**',
      '**/node_modules/**',
    ],
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        customElements: 'readonly',
        HTMLElement: 'readonly',
        CustomEvent: 'readonly',
        MutationObserver: 'readonly',
        MediaQueryList: 'readonly',
        localStorage: 'readonly',
        navigator: 'readonly',
        // Node.js globals for scripts/tests
        process: 'readonly',
        console: 'readonly',
      },
    },
    rules: {
      // Prefer const, no var
      'prefer-const': 'error',
      'no-var': 'error',

      // Naming conventions
      'camelcase': ['error', {
        properties: 'never',
        ignoreDestructuring: true,
        ignoreImports: false,
      }],

      // No console in production code (warning to encourage logDebug pattern)
      'no-console': 'warn',

      // No unused variables (allow underscore prefix for intentionally unused)
      'no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],

      // Consistent returns
      'consistent-return': 'error',

      // Prefer template literals
      'prefer-template': 'error',

      // No default exports - use named exports only
      'no-restricted-exports': ['error', {
        restrictDefaultExports: {
          direct: true,
          named: true,
          defaultFrom: true,
          namedFrom: false,
          namespaceFrom: true,
        },
      }],

      // Code quality
      'eqeqeq': ['error', 'always'],
      'no-implicit-coercion': 'error',
      'no-throw-literal': 'error',

      // Modern JavaScript
      'prefer-arrow-callback': 'error',
      'prefer-spread': 'error',
      'prefer-rest-params': 'error',
      'object-shorthand': ['error', 'always'],
      'prefer-destructuring': ['warn', {
        array: false,
        object: true,
      }],

      // Avoid problematic patterns
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-with': 'error',

      // Clarity
      'no-nested-ternary': 'error',
      'no-unneeded-ternary': 'error',

      // Complexity analysis (5.2)
      'complexity': ['warn', { max: 10 }],           // Cyclomatic complexity
      'max-depth': ['warn', { max: 4 }],             // Nesting depth
      'max-lines-per-function': ['warn', {
        max: 50,
        skipBlankLines: true,
        skipComments: true,
      }],
      'max-nested-callbacks': ['warn', { max: 3 }],  // Callback nesting

      // Best practices for Web Components
      'no-this-before-super': 'error',
      'constructor-super': 'error',
    },
  },
  // Test file overrides
  {
    files: ['test/**/*.js', 'scripts/**/*.js'],
    languageOptions: {
      globals: {
        Buffer: 'readonly',
      },
    },
    rules: {
      'no-console': 'off',
    },
  },
];
