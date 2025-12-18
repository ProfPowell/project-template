#!/usr/bin/env node

/**
 * Metadata validation script
 * Checks HTML files against metadata profiles
 *
 * Usage:
 *   node scripts/metadata-check.js [files...]
 *   node scripts/metadata-check.js examples/homepage/index.html
 *   node scripts/metadata-check.js --profile=article examples/press-release/index.html
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Colors for terminal output
const colors = {
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  dim: '\x1b[2m'
};

/**
 * Load a metadata profile
 */
function loadProfile(profileName) {
  const profilePath = resolve(__dirname, '../.claude/skills/metadata/profiles', `${profileName}.json`);

  if (!existsSync(profilePath)) {
    console.error(`${colors.red}Profile not found: ${profileName}${colors.reset}`);
    process.exit(1);
  }

  const profile = JSON.parse(readFileSync(profilePath, 'utf-8'));

  // Handle inheritance
  if (profile.extends) {
    const parentProfile = loadProfile(profile.extends);
    return mergeProfiles(parentProfile, profile);
  }

  return profile;
}

/**
 * Merge child profile with parent
 */
function mergeProfiles(parent, child) {
  return {
    name: child.name,
    description: child.description,
    required: [...(parent.required || []), ...(child.required || [])],
    recommended: [...(parent.recommended || []), ...(child.recommended || [])],
    order: child.order || parent.order
  };
}

/**
 * Extract <head> content from HTML
 */
function extractHead(html) {
  const match = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  return match ? match[1] : '';
}

/**
 * Check if element exists in head
 */
function elementExists(head, rule) {
  const { element, attributes } = rule;

  if (element === 'title') {
    return /<title[^>]*>[\s\S]+?<\/title>/i.test(head);
  }

  if (element === 'meta') {
    if (attributes.charset) {
      return /<meta[^>]*charset\s*=\s*["']?utf-8["']?[^>]*\/?>/i.test(head);
    }
    if (attributes.name) {
      const regex = new RegExp(`<meta[^>]*name\\s*=\\s*["']?${escapeRegex(attributes.name)}["']?[^>]*/?>`, 'i');
      return regex.test(head);
    }
    if (attributes.property) {
      const regex = new RegExp(`<meta[^>]*property\\s*=\\s*["']?${escapeRegex(attributes.property)}["']?[^>]*/?>`, 'i');
      return regex.test(head);
    }
    if (attributes['http-equiv']) {
      const regex = new RegExp(`<meta[^>]*http-equiv\\s*=\\s*["']?${escapeRegex(attributes['http-equiv'])}["']?[^>]*/?>`, 'i');
      return regex.test(head);
    }
  }

  if (element === 'link') {
    if (attributes.rel) {
      const regex = new RegExp(`<link[^>]*rel\\s*=\\s*["']?${escapeRegex(attributes.rel)}["']?[^>]*/?>`, 'i');
      return regex.test(head);
    }
  }

  return false;
}

/**
 * Get title content
 */
function getTitleContent(head) {
  const match = head.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return match ? match[1].trim() : '';
}

/**
 * Get meta content by name or property
 */
function getMetaContent(head, attr, value) {
  const regex = new RegExp(`<meta[^>]*${attr}\\s*=\\s*["']?${escapeRegex(value)}["']?[^>]*content\\s*=\\s*["']([^"']+)["'][^>]*/?>`, 'i');
  const match = head.match(regex);
  if (match) return match[1];

  // Try reverse order (content before name/property)
  const regex2 = new RegExp(`<meta[^>]*content\\s*=\\s*["']([^"']+)["'][^>]*${attr}\\s*=\\s*["']?${escapeRegex(value)}["']?[^>]*/?>`, 'i');
  const match2 = head.match(regex2);
  return match2 ? match2[1] : null;
}

/**
 * Check if charset is first element
 */
function isCharsetFirst(head) {
  const firstMeta = head.match(/<meta[^>]*\/?>/i);
  if (!firstMeta) return false;
  return /charset\s*=\s*["']?utf-8["']?/i.test(firstMeta[0]);
}

/**
 * Escape special regex characters
 */
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Validate a single file against a profile
 */
function validateFile(filePath, profile) {
  const html = readFileSync(filePath, 'utf-8');
  const head = extractHead(html);

  const errors = [];
  const warnings = [];

  if (!head) {
    errors.push('No <head> element found');
    return { errors, warnings };
  }

  // Check required elements
  for (const rule of profile.required || []) {
    if (!elementExists(head, rule)) {
      errors.push(rule.message || `Missing required: ${JSON.stringify(rule)}`);
    } else {
      // Check constraints
      if (rule.constraints) {
        if (rule.element === 'title') {
          const title = getTitleContent(head);
          if (rule.constraints.minLength && title.length < rule.constraints.minLength) {
            errors.push(`Title too short: ${title.length} chars (min: ${rule.constraints.minLength})`);
          }
          if (rule.constraints.maxLength && title.length > rule.constraints.maxLength) {
            warnings.push(`Title may be too long: ${title.length} chars (max: ${rule.constraints.maxLength})`);
          }
        }
        if (rule.element === 'meta' && rule.attributes.name === 'description') {
          const desc = getMetaContent(head, 'name', 'description');
          if (desc) {
            if (rule.constraints.minLength && desc.length < rule.constraints.minLength) {
              errors.push(`Description too short: ${desc.length} chars (min: ${rule.constraints.minLength})`);
            }
            if (rule.constraints.maxLength && desc.length > rule.constraints.maxLength) {
              warnings.push(`Description may be too long: ${desc.length} chars (max: ${rule.constraints.maxLength})`);
            }
          }
        }
      }

      // Check position constraint
      if (rule.position === 'first' && rule.element === 'meta' && rule.attributes.charset) {
        if (!isCharsetFirst(head)) {
          errors.push('charset must be the first meta element in <head>');
        }
      }
    }
  }

  // Check recommended elements
  for (const rule of profile.recommended || []) {
    if (!elementExists(head, rule)) {
      warnings.push(rule.message || `Missing recommended: ${JSON.stringify(rule)}`);
    } else {
      // Check absolute URL constraint for og:image and og:url
      if (rule.constraints?.absoluteUrl) {
        const attrType = rule.attributes.property ? 'property' : 'name';
        const attrValue = rule.attributes.property || rule.attributes.name;
        const content = getMetaContent(head, attrType, attrValue);
        if (content && !content.startsWith('http://') && !content.startsWith('https://')) {
          warnings.push(`${attrValue} should use absolute URL (got: ${content})`);
        }
      }
    }
  }

  return { errors, warnings };
}

/**
 * Find HTML files recursively
 */
function findHtmlFiles(dir, files = []) {
  const entries = readdirSync(dir);

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      // Skip node_modules and hidden directories
      if (!entry.startsWith('.') && entry !== 'node_modules') {
        findHtmlFiles(fullPath, files);
      }
    } else if (entry.endsWith('.html')) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Main function
 */
function main() {
  const args = process.argv.slice(2);
  let profileName = 'default';
  let files = [];

  // Parse arguments
  for (const arg of args) {
    if (arg.startsWith('--profile=')) {
      profileName = arg.split('=')[1];
    } else if (arg === '--help' || arg === '-h') {
      console.log(`
${colors.cyan}Metadata Validator${colors.reset}

Usage:
  node scripts/metadata-check.js [options] [files...]

Options:
  --profile=NAME    Use specific profile (default, article, product)
  --help, -h        Show this help

Examples:
  node scripts/metadata-check.js examples/**/*.html
  node scripts/metadata-check.js --profile=article examples/press-release/index.html
  node scripts/metadata-check.js                    # Check all HTML in examples/
`);
      process.exit(0);
    } else {
      files.push(arg);
    }
  }

  // If no files specified, find all HTML files in examples
  if (files.length === 0) {
    const examplesDir = resolve(__dirname, '../examples');
    if (existsSync(examplesDir)) {
      files = findHtmlFiles(examplesDir);
    }
  }

  if (files.length === 0) {
    console.log(`${colors.yellow}No HTML files found${colors.reset}`);
    process.exit(0);
  }

  const profile = loadProfile(profileName);
  console.log(`${colors.cyan}Using profile: ${profile.name}${colors.reset}\n`);

  let totalErrors = 0;
  let totalWarnings = 0;

  for (const file of files) {
    if (!existsSync(file)) {
      console.log(`${colors.yellow}File not found: ${file}${colors.reset}`);
      continue;
    }

    const { errors, warnings } = validateFile(file, profile);
    totalErrors += errors.length;
    totalWarnings += warnings.length;

    if (errors.length === 0 && warnings.length === 0) {
      console.log(`${colors.green}✓${colors.reset} ${file}`);
    } else {
      console.log(`${colors.dim}─────────────────────────────────────────${colors.reset}`);
      console.log(`${file}`);

      for (const error of errors) {
        console.log(`  ${colors.red}✗ ERROR:${colors.reset} ${error}`);
      }

      for (const warning of warnings) {
        console.log(`  ${colors.yellow}⚠ WARN:${colors.reset} ${warning}`);
      }
    }
  }

  console.log(`\n${colors.dim}─────────────────────────────────────────${colors.reset}`);
  console.log(`Total: ${files.length} files, ${colors.red}${totalErrors} errors${colors.reset}, ${colors.yellow}${totalWarnings} warnings${colors.reset}`);

  // Exit with error code if there were errors
  if (totalErrors > 0) {
    process.exit(1);
  }
}

main();
