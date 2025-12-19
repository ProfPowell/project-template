#!/usr/bin/env node

/**
 * Site Infrastructure Checker
 *
 * Validates essential site-level assets that every production site needs:
 * - Favicon files (ico, svg, apple-touch-icon, manifest icons)
 * - robots.txt (syntax, sitemap reference)
 * - sitemap.xml (existence, valid XML)
 * - manifest.webmanifest (PWA requirements)
 * - Error pages (404, 500, 403)
 * - llms.txt (AI crawler guidance - optional)
 * - .well-known/security.txt (vulnerability disclosure)
 * - opensearch.xml (browser search integration)
 * - humans.txt (site credits)
 *
 * @example
 * node scripts/site-check.js [directory]
 * node scripts/site-check.js examples/
 * npm run lint:site
 */

import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, resolve } from 'path';

/** Terminal colors */
const colors = {
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  dim: '\x1b[2m',
  bold: '\x1b[1m',
};

/** Site infrastructure requirements */
const REQUIREMENTS = {
  favicon: {
    'favicon.ico': { required: true, description: 'Legacy browser fallback (32x32)' },
    'icon.svg': { required: false, description: 'Modern scalable icon with dark mode support' },
    'apple-touch-icon.png': { required: true, description: 'iOS home screen (180x180)' },
  },
  files: {
    'robots.txt': { required: true, description: 'Search engine crawler directives' },
    'sitemap.xml': { required: false, description: 'Site structure for crawlers' },
    'manifest.webmanifest': { required: false, description: 'PWA manifest' },
    'manifest.json': { required: false, description: 'PWA manifest (alternate name)' },
    '404.html': { required: false, description: 'Custom error page' },
    'llms.txt': { required: false, description: 'AI/LLM crawler guidance' },
  },
};

/**
 * Check if a file exists in the site root
 * @param {string} siteRoot - Site root directory
 * @param {string} filename - File to check
 * @returns {boolean}
 */
function fileExists(siteRoot, filename) {
  return existsSync(join(siteRoot, filename));
}

/**
 * Validate favicon files
 * @param {string} siteRoot - Site root directory
 * @returns {object} Validation results
 */
function checkFavicons(siteRoot) {
  const results = {
    passed: [],
    warnings: [],
    errors: [],
    info: [],
  };

  for (const [file, config] of Object.entries(REQUIREMENTS.favicon)) {
    const exists = fileExists(siteRoot, file);

    if (exists) {
      results.passed.push(`${file} exists`);
    } else if (config.required) {
      results.errors.push(`Missing required: ${file} - ${config.description}`);
    } else {
      results.warnings.push(`Missing recommended: ${file} - ${config.description}`);
    }
  }

  return results;
}

/**
 * Validate robots.txt content
 * @param {string} siteRoot - Site root directory
 * @returns {object} Validation results
 */
function checkRobotsTxt(siteRoot) {
  const results = {
    passed: [],
    warnings: [],
    errors: [],
    info: [],
  };

  const robotsPath = join(siteRoot, 'robots.txt');

  if (!existsSync(robotsPath)) {
    results.errors.push('Missing robots.txt - search engines need crawler directives');
    return results;
  }

  results.passed.push('robots.txt exists');

  try {
    const content = readFileSync(robotsPath, 'utf8');
    const lines = content.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('#'));

    // Check for User-agent directive
    const hasUserAgent = lines.some(l => l.toLowerCase().startsWith('user-agent:'));
    if (hasUserAgent) {
      results.passed.push('Has User-agent directive');
    } else {
      results.warnings.push('No User-agent directive found');
    }

    // Check for Sitemap reference
    const hasSitemap = lines.some(l => l.toLowerCase().startsWith('sitemap:'));
    if (hasSitemap) {
      results.passed.push('References sitemap');
    } else {
      results.info.push('No Sitemap directive (optional but recommended)');
    }

    // Check for common issues
    const disallowAll = lines.some(l => l.toLowerCase() === 'disallow: /');
    const allowAll = lines.some(l => l.toLowerCase() === 'allow: /');

    if (disallowAll && !allowAll) {
      results.warnings.push('Disallow: / blocks all crawlers - is this intentional?');
    }

    // Check for AI/LLM bot directives
    const hasAIDirectives = lines.some(l => {
      const lower = l.toLowerCase();
      return lower.includes('gptbot') ||
             lower.includes('chatgpt') ||
             lower.includes('anthropic') ||
             lower.includes('claude') ||
             lower.includes('ccbot') ||
             lower.includes('google-extended');
    });

    if (hasAIDirectives) {
      results.info.push('Contains AI/LLM crawler directives');
    }

  } catch (err) {
    results.errors.push(`Error reading robots.txt: ${err.message}`);
  }

  return results;
}

/**
 * Validate sitemap.xml
 * @param {string} siteRoot - Site root directory
 * @returns {object} Validation results
 */
function checkSitemap(siteRoot) {
  const results = {
    passed: [],
    warnings: [],
    errors: [],
    info: [],
  };

  const sitemapPath = join(siteRoot, 'sitemap.xml');

  if (!existsSync(sitemapPath)) {
    results.info.push('No sitemap.xml (optional but recommended for SEO)');
    return results;
  }

  results.passed.push('sitemap.xml exists');

  try {
    const content = readFileSync(sitemapPath, 'utf8');

    // Basic XML validation
    if (!content.trim().startsWith('<?xml') && !content.trim().startsWith('<urlset') && !content.trim().startsWith('<sitemapindex')) {
      results.errors.push('sitemap.xml does not appear to be valid XML');
      return results;
    }

    // Check for urlset or sitemapindex
    if (content.includes('<urlset') || content.includes('<sitemapindex')) {
      results.passed.push('Valid sitemap structure');
    } else {
      results.warnings.push('Missing <urlset> or <sitemapindex> element');
    }

    // Count URLs
    const urlCount = (content.match(/<loc>/g) || []).length;
    results.info.push(`Contains ${urlCount} URL${urlCount !== 1 ? 's' : ''}`);

  } catch (err) {
    results.errors.push(`Error reading sitemap.xml: ${err.message}`);
  }

  return results;
}

/**
 * Validate web app manifest
 * @param {string} siteRoot - Site root directory
 * @returns {object} Validation results
 */
function checkManifest(siteRoot) {
  const results = {
    passed: [],
    warnings: [],
    errors: [],
    info: [],
  };

  // Check for either manifest name
  let manifestPath = join(siteRoot, 'manifest.webmanifest');
  let manifestName = 'manifest.webmanifest';

  if (!existsSync(manifestPath)) {
    manifestPath = join(siteRoot, 'manifest.json');
    manifestName = 'manifest.json';
  }

  if (!existsSync(manifestPath)) {
    results.info.push('No manifest file (optional, required for PWA)');
    return results;
  }

  results.passed.push(`${manifestName} exists`);

  try {
    const content = readFileSync(manifestPath, 'utf8');
    const manifest = JSON.parse(content);

    // Check required PWA fields
    if (manifest.name) {
      results.passed.push(`Has name: "${manifest.name}"`);
    } else if (manifest.short_name) {
      results.warnings.push('Has short_name but missing name');
    } else {
      results.errors.push('Missing name in manifest');
    }

    // Check icons
    if (manifest.icons && Array.isArray(manifest.icons) && manifest.icons.length > 0) {
      results.passed.push(`Has ${manifest.icons.length} icon(s) defined`);

      // Check for recommended sizes
      const sizes = manifest.icons.map(i => i.sizes).filter(Boolean);
      const has192 = sizes.some(s => s.includes('192'));
      const has512 = sizes.some(s => s.includes('512'));

      if (!has192) {
        results.warnings.push('Missing 192x192 icon (Android requirement)');
      }
      if (!has512) {
        results.warnings.push('Missing 512x512 icon (PWA splash screen)');
      }

      // Check for maskable icon
      const hasMaskable = manifest.icons.some(i =>
        i.purpose && i.purpose.includes('maskable')
      );
      if (!hasMaskable) {
        results.info.push('No maskable icon (recommended for Android)');
      }
    } else {
      results.errors.push('No icons defined in manifest');
    }

    // Check display mode
    if (manifest.display) {
      results.info.push(`Display mode: ${manifest.display}`);
    }

    // Check start_url
    if (manifest.start_url) {
      results.passed.push('Has start_url');
    } else {
      results.warnings.push('Missing start_url');
    }

  } catch (err) {
    if (err instanceof SyntaxError) {
      results.errors.push('Invalid JSON in manifest file');
    } else {
      results.errors.push(`Error reading manifest: ${err.message}`);
    }
  }

  return results;
}

/**
 * Check for custom error pages (404, 500, 403)
 * @param {string} siteRoot - Site root directory
 * @returns {object} Validation results
 */
function checkErrorPages(siteRoot) {
  const results = {
    passed: [],
    warnings: [],
    errors: [],
    info: [],
  };

  const errorPages = [
    { code: '404', description: 'Not Found', required: false },
    { code: '500', description: 'Internal Server Error', required: false },
    { code: '403', description: 'Forbidden', required: false },
  ];

  for (const page of errorPages) {
    const possibleNames = [
      `${page.code}.html`,
      `${page.code}/index.html`,
      `error/${page.code}.html`,
    ];

    let found = null;
    for (const name of possibleNames) {
      if (existsSync(join(siteRoot, name))) {
        found = name;
        break;
      }
    }

    if (found) {
      results.passed.push(`Custom ${page.code} page: ${found}`);

      // Check content
      try {
        const content = readFileSync(join(siteRoot, found), 'utf8');

        if (content.includes('<title>') && content.includes('</title>')) {
          results.info.push(`${page.code} page has title`);
        } else {
          results.warnings.push(`${page.code} page missing title`);
        }
      } catch {
        // Ignore read errors
      }
    } else {
      results.info.push(`No custom ${page.code} page (${page.description})`);
    }
  }

  return results;
}

/**
 * Check for llms.txt (AI crawler guidance)
 * @param {string} siteRoot - Site root directory
 * @returns {object} Validation results
 */
function checkLlmsTxt(siteRoot) {
  const results = {
    passed: [],
    warnings: [],
    errors: [],
    info: [],
  };

  const llmsPath = join(siteRoot, 'llms.txt');

  if (!existsSync(llmsPath)) {
    results.info.push('No llms.txt (optional - provides AI/LLM crawler guidance)');
    return results;
  }

  results.passed.push('llms.txt exists');

  try {
    const content = readFileSync(llmsPath, 'utf8');
    const lines = content.split('\n').filter(l => l.trim());

    results.info.push(`Contains ${lines.length} line(s) of guidance`);

    // Check for common sections
    if (content.toLowerCase().includes('purpose') || content.toLowerCase().includes('about')) {
      results.info.push('Includes site purpose/about section');
    }

    if (content.toLowerCase().includes('contact') || content.includes('@')) {
      results.info.push('Includes contact information');
    }

  } catch (err) {
    results.errors.push(`Error reading llms.txt: ${err.message}`);
  }

  return results;
}

/**
 * Check for .well-known/security.txt (RFC 9116)
 * @param {string} siteRoot - Site root directory
 * @returns {object} Validation results
 */
function checkSecurityTxt(siteRoot) {
  const results = {
    passed: [],
    warnings: [],
    errors: [],
    info: [],
  };

  // Check both locations (RFC 9116 prefers .well-known)
  const wellKnownPath = join(siteRoot, '.well-known', 'security.txt');
  const rootPath = join(siteRoot, 'security.txt');

  let securityPath = null;
  let location = null;

  if (existsSync(wellKnownPath)) {
    securityPath = wellKnownPath;
    location = '.well-known/security.txt';
  } else if (existsSync(rootPath)) {
    securityPath = rootPath;
    location = 'security.txt (root)';
    results.warnings.push('security.txt in root - RFC 9116 recommends .well-known/security.txt');
  }

  if (!securityPath) {
    results.info.push('No security.txt (recommended for vulnerability disclosure)');
    return results;
  }

  results.passed.push(`${location} exists`);

  try {
    const content = readFileSync(securityPath, 'utf8');
    const lines = content.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('#'));

    // Check for required Contact field
    const hasContact = lines.some(l => l.toLowerCase().startsWith('contact:'));
    if (hasContact) {
      results.passed.push('Has Contact field');
    } else {
      results.errors.push('Missing required Contact field in security.txt');
    }

    // Check for recommended Expires field
    const hasExpires = lines.some(l => l.toLowerCase().startsWith('expires:'));
    if (hasExpires) {
      results.passed.push('Has Expires field');
    } else {
      results.warnings.push('Missing Expires field (recommended)');
    }

    // Check for optional but useful fields
    const hasEncryption = lines.some(l => l.toLowerCase().startsWith('encryption:'));
    const hasPreferredLanguages = lines.some(l => l.toLowerCase().startsWith('preferred-languages:'));
    const hasCanonical = lines.some(l => l.toLowerCase().startsWith('canonical:'));
    const hasPolicy = lines.some(l => l.toLowerCase().startsWith('policy:'));

    if (hasEncryption) results.info.push('Has Encryption field (PGP key)');
    if (hasPreferredLanguages) results.info.push('Has Preferred-Languages field');
    if (hasCanonical) results.info.push('Has Canonical field');
    if (hasPolicy) results.info.push('Has Policy field');

  } catch (err) {
    results.errors.push(`Error reading security.txt: ${err.message}`);
  }

  return results;
}

/**
 * Check for opensearch.xml (browser search integration)
 * @param {string} siteRoot - Site root directory
 * @returns {object} Validation results
 */
function checkOpenSearch(siteRoot) {
  const results = {
    passed: [],
    warnings: [],
    errors: [],
    info: [],
  };

  const opensearchPath = join(siteRoot, 'opensearch.xml');

  if (!existsSync(opensearchPath)) {
    results.info.push('No opensearch.xml (optional - enables browser search integration)');
    return results;
  }

  results.passed.push('opensearch.xml exists');

  try {
    const content = readFileSync(opensearchPath, 'utf8');

    // Check for OpenSearchDescription root element
    if (content.includes('<OpenSearchDescription')) {
      results.passed.push('Valid OpenSearch structure');
    } else {
      results.errors.push('Missing <OpenSearchDescription> root element');
      return results;
    }

    // Check for required ShortName
    if (content.includes('<ShortName>')) {
      results.info.push('Has ShortName');
    } else {
      results.warnings.push('Missing ShortName element');
    }

    // Check for required Description
    if (content.includes('<Description>')) {
      results.info.push('Has Description');
    } else {
      results.warnings.push('Missing Description element');
    }

    // Check for Url template
    if (content.includes('<Url')) {
      results.passed.push('Has search URL template');
    } else {
      results.errors.push('Missing Url element (required for search)');
    }

  } catch (err) {
    results.errors.push(`Error reading opensearch.xml: ${err.message}`);
  }

  return results;
}

/**
 * Check for humans.txt (site credits)
 * @param {string} siteRoot - Site root directory
 * @returns {object} Validation results
 */
function checkHumansTxt(siteRoot) {
  const results = {
    passed: [],
    warnings: [],
    errors: [],
    info: [],
  };

  const humansPath = join(siteRoot, 'humans.txt');

  if (!existsSync(humansPath)) {
    results.info.push('No humans.txt (optional - credits the people behind the site)');
    return results;
  }

  results.passed.push('humans.txt exists');

  try {
    const content = readFileSync(humansPath, 'utf8');
    const lines = content.split('\n').filter(l => l.trim());

    results.info.push(`Contains ${lines.length} line(s)`);

    // Check for common sections
    if (content.toLowerCase().includes('team') || content.toLowerCase().includes('author')) {
      results.info.push('Includes team/author information');
    }

    if (content.toLowerCase().includes('site') || content.toLowerCase().includes('technology')) {
      results.info.push('Includes site/technology information');
    }

  } catch (err) {
    results.errors.push(`Error reading humans.txt: ${err.message}`);
  }

  return results;
}

/**
 * Find site roots (directories containing index.html or site files)
 * @param {string} baseDir - Base directory to search
 * @returns {string[]} Array of site root paths
 */
function findSiteRoots(baseDir) {
  const roots = [];

  // Check if baseDir itself is a site root
  const siteIndicators = ['index.html', 'robots.txt', 'favicon.ico'];
  if (siteIndicators.some(f => existsSync(join(baseDir, f)))) {
    roots.push(baseDir);
    return roots;
  }

  // Look for subdirectories that are site roots
  try {
    const entries = readdirSync(baseDir);
    for (const entry of entries) {
      const fullPath = join(baseDir, entry);
      if (statSync(fullPath).isDirectory() && !entry.startsWith('.') && entry !== 'node_modules') {
        if (siteIndicators.some(f => existsSync(join(fullPath, f)))) {
          roots.push(fullPath);
        }
      }
    }
  } catch {
    // Ignore errors
  }

  return roots;
}

/**
 * Print results for a single check group
 * @param {string} groupName - Name of the check group
 * @param {object} results - Results for this group
 * @returns {object} Counts of errors, warnings, passed
 */
function printGroupResults(groupName, results) {
  const hasContent = results.errors.length > 0 ||
                     results.warnings.length > 0 ||
                     results.passed.length > 0 ||
                     results.info.length > 0;

  if (!hasContent) {
    return { errors: 0, warnings: 0, passed: 0 };
  }

  // Determine group status
  const groupStatus = results.errors.length > 0
    ? `${colors.red}✗${colors.reset}`
    : results.warnings.length > 0
      ? `${colors.yellow}⚠${colors.reset}`
      : `${colors.green}✓${colors.reset}`;

  console.log(`\n  ${groupStatus} ${colors.bold}${groupName}${colors.reset}`);

  // Print errors first
  for (const error of results.errors) {
    console.log(`      ${colors.red}✗${colors.reset} ${error}`);
  }

  // Print warnings
  for (const warning of results.warnings) {
    console.log(`      ${colors.yellow}⚠${colors.reset} ${warning}`);
  }

  // Print passed
  for (const pass of results.passed) {
    console.log(`      ${colors.green}✓${colors.reset} ${pass}`);
  }

  // Print info
  for (const info of results.info) {
    console.log(`      ${colors.dim}ℹ ${info}${colors.reset}`);
  }

  return {
    errors: results.errors.length,
    warnings: results.warnings.length,
    passed: results.passed.length,
  };
}

/**
 * Print results for a single site with grouped output
 * @param {string} siteRoot - Site root path
 * @param {object[]} checkResults - Array of {name, results} objects
 */
function printSiteResults(siteRoot, checkResults) {
  // Calculate totals
  let totalErrors = 0;
  let totalWarnings = 0;
  let totalPassed = 0;

  for (const check of checkResults) {
    totalErrors += check.results.errors.length;
    totalWarnings += check.results.warnings.length;
    totalPassed += check.results.passed.length;
  }

  const status = totalErrors > 0
    ? `${colors.red}FAIL${colors.reset}`
    : totalWarnings > 0
      ? `${colors.yellow}WARN${colors.reset}`
      : `${colors.green}PASS${colors.reset}`;

  console.log(`\n${colors.bold}${siteRoot}${colors.reset} [${status}]`);
  console.log(`${colors.dim}${'─'.repeat(50)}${colors.reset}`);

  // Print each group
  for (const check of checkResults) {
    printGroupResults(check.name, check.results);
  }

  console.log(`\n  ${colors.dim}Summary: ${totalPassed} passed, ${totalWarnings} warnings, ${totalErrors} errors${colors.reset}`);

  return { errors: totalErrors, warnings: totalWarnings, passed: totalPassed };
}

/**
 * Show help
 */
function showHelp() {
  console.log(`
${colors.cyan}Site Infrastructure Checker${colors.reset}

Validates essential site-level assets for production websites.

${colors.bold}Usage:${colors.reset}
  node scripts/site-check.js [options] [directory]

${colors.bold}Options:${colors.reset}
  --help, -h     Show this help
  --strict       Treat warnings as errors

${colors.bold}Checks Performed:${colors.reset}

  ${colors.green}Favicons${colors.reset}
    • favicon.ico (required) - Legacy browser fallback
    • icon.svg (recommended) - Modern scalable icon
    • apple-touch-icon.png (required) - iOS home screen

  ${colors.green}Crawlers & Discovery${colors.reset}
    • robots.txt (required) - Search engine directives
    • sitemap.xml (recommended) - Site structure
    • opensearch.xml (optional) - Browser search integration
    • llms.txt (optional) - AI/LLM crawler guidance

  ${colors.green}PWA${colors.reset}
    • manifest.webmanifest - App manifest with icons

  ${colors.green}Error Pages${colors.reset}
    • 404.html - Not Found
    • 500.html - Internal Server Error
    • 403.html - Forbidden

  ${colors.green}.well-known${colors.reset}
    • security.txt - Vulnerability disclosure (RFC 9116)

  ${colors.green}Credits${colors.reset}
    • humans.txt - Site credits and team info

${colors.bold}Examples:${colors.reset}
  node scripts/site-check.js examples/
  node scripts/site-check.js --strict ./my-site
  npm run lint:site
`);
}

/**
 * Main entry point
 */
function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    showHelp();
    process.exit(0);
  }

  const strict = args.includes('--strict');
  const paths = args.filter(a => !a.startsWith('-'));
  const targetDir = paths[0] || 'examples';

  console.log(`${colors.cyan}=== Site Infrastructure Check ===${colors.reset}`);

  const resolvedDir = resolve(targetDir);

  if (!existsSync(resolvedDir)) {
    console.error(`${colors.red}Directory not found: ${targetDir}${colors.reset}`);
    process.exit(1);
  }

  const siteRoots = findSiteRoots(resolvedDir);

  if (siteRoots.length === 0) {
    console.log(`${colors.yellow}No site roots found in ${targetDir}${colors.reset}`);
    console.log(`${colors.dim}A site root contains index.html, robots.txt, or favicon.ico${colors.reset}`);
    process.exit(0);
  }

  let totalErrors = 0;
  let totalWarnings = 0;

  for (const siteRoot of siteRoots) {
    // Define checks with display names
    const checks = [
      { name: 'Favicons', fn: checkFavicons },
      { name: 'Crawlers & Robots', fn: checkRobotsTxt },
      { name: 'Sitemap', fn: checkSitemap },
      { name: 'PWA Manifest', fn: checkManifest },
      { name: 'Error Pages', fn: checkErrorPages },
      { name: 'AI/LLM Support', fn: checkLlmsTxt },
      { name: 'Security (.well-known)', fn: checkSecurityTxt },
      { name: 'OpenSearch', fn: checkOpenSearch },
      { name: 'Site Credits', fn: checkHumansTxt },
    ];

    // Run all checks and collect results with names
    const checkResults = checks.map(check => ({
      name: check.name,
      results: check.fn(siteRoot),
    }));

    const summary = printSiteResults(siteRoot, checkResults);
    totalErrors += summary.errors;
    totalWarnings += summary.warnings;
  }

  // Final summary
  console.log(`\n${colors.dim}${'─'.repeat(50)}${colors.reset}`);
  console.log(`${colors.bold}Total:${colors.reset} ${siteRoots.length} site(s) checked`);

  if (totalErrors > 0) {
    console.log(`${colors.red}${totalErrors} error(s) found${colors.reset}`);
    process.exit(1);
  }

  if (strict && totalWarnings > 0) {
    console.log(`${colors.yellow}${totalWarnings} warning(s) found (--strict mode)${colors.reset}`);
    process.exit(1);
  }

  if (totalWarnings > 0) {
    console.log(`${colors.yellow}${totalWarnings} warning(s)${colors.reset}`);
  } else {
    console.log(`${colors.green}All checks passed${colors.reset}`);
  }
}

main();
