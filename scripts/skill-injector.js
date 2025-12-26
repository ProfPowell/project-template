#!/usr/bin/env node
/**
 * Skill Injector for PostToolUse Hooks
 *
 * Detects file type from Edit/Write operations and outputs relevant skill guidance.
 * Runs BEFORE validators so Claude has context for applying standards.
 *
 * Usage: Receives hook input via stdin (JSON with tool_input.file_path)
 * Output: Condensed skill guidance to stdout
 */

import { readFileSync } from 'fs';
import { createInterface } from 'readline';
import { extname, join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SKILLS_DIR = join(__dirname, '..', '.claude', 'skills');

// Map file extensions to skill names
const SKILL_MAP = {
  '.css': 'css-author',
  '.html': 'xhtml-author',
  '.xhtml': 'xhtml-author',
  '.htm': 'xhtml-author',
  '.js': 'javascript-author',
  '.mjs': 'javascript-author',
  '.md': 'markdown-author',
  // SSG file types
  '.astro': 'astro',
  '.njk': 'eleventy',
  '.liquid': 'eleventy',
};

// Special filename patterns that override extension-based matching
const FILENAME_PATTERNS = [
  { pattern: /\.11ty\.js$/, skill: 'eleventy' },
  { pattern: /\.11ty\.cjs$/, skill: 'eleventy' },
  { pattern: /eleventy\.config\.(js|mjs|cjs)$/, skill: 'eleventy' },
  { pattern: /astro\.config\.(js|mjs|ts)$/, skill: 'astro' },
];

/**
 * Extract key sections from skill content (first 2 major sections after frontmatter)
 */
function extractSkillSummary(content) {
  const lines = content.split('\n');
  let inFrontmatter = false;
  let passedFrontmatter = false;
  const summary = [];
  let sectionCount = 0;

  for (const line of lines) {
    // Handle frontmatter
    if (line === '---' && !passedFrontmatter) {
      inFrontmatter = !inFrontmatter;
      if (!inFrontmatter) passedFrontmatter = true;
      continue;
    }
    if (inFrontmatter) continue;

    // Count sections (## headings)
    if (line.startsWith('## ')) {
      sectionCount++;
      if (sectionCount > 2) break; // Stop after 2 sections
    }

    summary.push(line);
  }

  return summary.join('\n').trim();
}

/**
 * Load and format skill guidance
 */
function loadSkillGuidance(skillName) {
  const skillPath = join(SKILLS_DIR, skillName, 'SKILL.md');

  try {
    const content = readFileSync(skillPath, 'utf-8');
    const summary = extractSkillSummary(content);

    return `
=== ${skillName.toUpperCase()} SKILL ACTIVE ===
Apply these guidelines when writing this file:

${summary}

=== END ${skillName.toUpperCase()} GUIDANCE ===
`;
  } catch {
    // Skill file not found - silent fail
    return null;
  }
}

/**
 * Main entry point
 */
async function main() {
  // Read hook input from stdin
  let input = '';
  const rl = createInterface({
    input: process.stdin,
    terminal: false
  });

  for await (const line of rl) {
    input += line;
  }

  if (!input.trim()) return;

  try {
    const hookData = JSON.parse(input);
    const filePath = hookData.tool_input?.file_path;

    if (!filePath) return;

    // Check filename patterns first (for special cases like .11ty.js)
    let skillName = null;
    for (const { pattern, skill } of FILENAME_PATTERNS) {
      if (pattern.test(filePath)) {
        skillName = skill;
        break;
      }
    }

    // Fall back to extension-based matching
    if (!skillName) {
      const ext = extname(filePath).toLowerCase();
      skillName = SKILL_MAP[ext];
    }

    if (!skillName) return;

    const guidance = loadSkillGuidance(skillName);
    if (guidance) {
      console.log(guidance);
    }
  } catch {
    // JSON parse error or other issue - silent fail to not break hook chain
  }
}

main();
