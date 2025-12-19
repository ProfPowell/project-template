import { describe, it } from 'node:test';
import { execSync } from 'node:child_process';
import assert from 'node:assert';

/**
 * Lighthouse CI Tests
 *
 * Note: These tests verify that the Lighthouse CLI is available and configured.
 * Full Lighthouse audits require a running server and are typically run as
 * part of CI/CD pipelines or via `npm run lighthouse`.
 */

function checkLighthouseCLI() {
  try {
    const output = execSync('npx lhci --version', { encoding: 'utf8', stdio: 'pipe' });
    return { available: true, version: output.trim() };
  } catch (error) {
    return { available: false, error: error.message };
  }
}

describe('Lighthouse CI', () => {
  describe('setup', () => {
    it('has @lhci/cli installed', () => {
      const result = checkLighthouseCLI();
      assert.strictEqual(
        result.available,
        true,
        `Lighthouse CLI not available: ${result.error || 'unknown error'}`
      );
    });

    it('reports version information', () => {
      const result = checkLighthouseCLI();
      assert.ok(result.version, 'Should report a version number');
      assert.match(result.version, /\d+\.\d+\.\d+/, 'Version should be semver format');
    });

    it('has lighthouserc.js configuration file', async () => {
      const fs = await import('node:fs');
      const path = await import('node:path');
      const configPath = path.resolve(process.cwd(), 'lighthouserc.js');
      
      assert.ok(
        fs.existsSync(configPath),
        'lighthouserc.js configuration file should exist'
      );
    });

    it('has valid configuration structure', async () => {
      const path = await import('node:path');
      const configPath = path.resolve(process.cwd(), 'lighthouserc.js');
      
      const config = await import(configPath);
      const lhConfig = config.default;
      
      assert.ok(lhConfig.ci, 'Config should have ci property');
      assert.ok(lhConfig.ci.collect, 'Config should have collect settings');
      assert.ok(lhConfig.ci.assert, 'Config should have assert settings');
      assert.ok(lhConfig.ci.assert.assertions, 'Config should have assertions');
    });

    it('has required budget thresholds configured', async () => {
      const path = await import('node:path');
      const configPath = path.resolve(process.cwd(), 'lighthouserc.js');
      const config = await import(configPath);
      const assertions = config.default.ci.assert.assertions;
      
      assert.ok(assertions['categories:performance'], 'Should have performance threshold');
      assert.strictEqual(
        assertions['categories:performance'][1].minScore,
        0.9,
        'Performance threshold should be 0.9 (90%)'
      );
      
      assert.ok(assertions['categories:accessibility'], 'Should have accessibility threshold');
      assert.strictEqual(
        assertions['categories:accessibility'][1].minScore,
        1.0,
        'Accessibility threshold should be 1.0 (100%)'
      );
      
      assert.ok(assertions['categories:best-practices'], 'Should have best-practices threshold');
      assert.strictEqual(
        assertions['categories:best-practices'][1].minScore,
        0.9,
        'Best practices threshold should be 0.9 (90%)'
      );
      
      assert.ok(assertions['categories:seo'], 'Should have SEO threshold');
      assert.strictEqual(
        assertions['categories:seo'][1].minScore,
        1.0,
        'SEO threshold should be 1.0 (100%)'
      );
    });
  });

  describe('npm script', () => {
    it('has lighthouse script in package.json', async () => {
      const fs = await import('node:fs');
      const path = await import('node:path');
      const pkgPath = path.resolve(process.cwd(), 'package.json');
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      
      assert.ok(pkg.scripts.lighthouse, 'package.json should have lighthouse script');
      assert.match(
        pkg.scripts.lighthouse,
        /lhci/,
        'lighthouse script should invoke lhci'
      );
    });
  });
});
