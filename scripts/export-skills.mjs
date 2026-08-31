#!/usr/bin/env node
/**
 * export-skills.mjs
 *
 * Bundles the TypeScript data files via esbuild and runs the output to
 * generate backend/data/portfolio-context.json.
 *
 * Usage:
 *   npm run export:skills
 *   node scripts/export-skills.mjs
 */

import { execSync } from 'child_process';
import { writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outDir = join(root, 'backend', 'data');
const outFile = join(outDir, 'portfolio-context.json');
const driverTs = join(__dirname, '_export-driver.ts');
const bundledCjs = join(outDir, '_export-driver.bundled.cjs');

// Ensure output directory exists
mkdirSync(outDir, { recursive: true });

console.log('📦 Bundling portfolio data via esbuild...');

try {
  // Bundle the TypeScript driver with esbuild, replacing import.meta.env.BASE_URL
  execSync(
    [
      'npx --yes esbuild',
      `"${driverTs}"`,
      '--bundle',
      '--platform=node',
      '--format=cjs',
      '--define:import.meta.env.BASE_URL=\'""\'',
      `--outfile="${bundledCjs}"`,
    ].join(' '),
    { cwd: root, stdio: 'inherit' }
  );
} catch (err) {
  console.error('❌ esbuild failed:', err.message);
  process.exit(1);
}

console.log('⚙️  Extracting data...');

let json;
try {
  json = execSync(`node "${bundledCjs}"`, { cwd: root }).toString();
} catch (err) {
  console.error('❌ Failed to run bundled driver:', err.message);
  process.exit(1);
}

try {
  // Validate it's valid JSON
  JSON.parse(json);
} catch (err) {
  console.error('❌ Driver output is not valid JSON:', err.message);
  process.exit(1);
}

writeFileSync(outFile, json, 'utf8');

// Clean up temp bundled file
try {
  execSync(`rm -f "${bundledCjs}"`, { cwd: root });
} catch {
  // ignore cleanup errors
}

console.log(`✅ portfolio-context.json written to backend/data/`);

// Print a brief summary
const ctx = JSON.parse(json);
console.log(`   Experience entries : ${ctx.experience?.length ?? 0}`);
console.log(`   Projects           : ${ctx.projects?.length ?? 0}`);
console.log(`   Perfil cycle steps : ${ctx.perfilCycle?.length ?? 0}`);
console.log(`   N2N phases         : ${ctx.n2nPhases?.length ?? 0}`);
