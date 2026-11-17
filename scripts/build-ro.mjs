#!/usr/bin/env node
/* global process, console */
/**
 * npm run build:ro → dist-ro/ : la ficha /sobre-mi/ sola, para ro.vientonorte.io (vercel ro-portafolio, output public/).
 *
 * 1. vite build --config vite.ro.config.ts (entrada única sobre-mi; no importa App).
 * 2. Prerender de la ficha con src/sobre-mi/entry-server.tsx (igual que el apex) y dist-ro/sobre-mi/index.html → dist-ro/index.html.
 * 3. Copia desde public/ solo lo referenciado por el HTML/JS/CSS emitido, más public/ar/ (/ar).
 *    No van CV, sw.js, manifest, sitemap ni el resto del sitio.
 *
 * VITE_*: valores PÚBLICOS, los mismos que ya se ven en el bundle de https://vientonorte.io y en ro-portafolio#1.
 * Nada secreto. Se pueden sobrescribir por entorno. No se usa VITE_FORM_SUBMIT_INBOX.
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { injectOutlet, assertSingleDocumentHead, OUTLET } from './prerender-servicios.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'dist-ro');
const ssrDir = path.join(root, '.vn-ssr-ro');
const publicDir = path.join(root, 'public');

const PUBLIC_ENV = {
  VITE_BASE: '/',
  VITE_GTM_ID: 'GTM-PM5LBQRP',
  VITE_GOOGLE_FORM_ACTION_URL:
    'https://docs.google.com/forms/d/e/1FAIpQLSc90BMntvUDgJW5H-xWzqEE0iUNOIFZ-lwa2Nk3ZQLWb7EmaQ/formResponse',
  VITE_GOOGLE_FORM_ENTRY_NAME: 'entry.1017625325',
  VITE_GOOGLE_FORM_ENTRY_EMAIL: 'entry.1353894548',
  VITE_GOOGLE_FORM_ENTRY_MESSAGE: 'entry.844780369',
  VITE_GOOGLE_FORM_ENTRY_INTENT: 'entry.1037750254',
  VITE_GOOGLE_FORM_ENTRY_SOURCE: 'entry.453244438',
  VITE_GOOGLE_FORM_ENTRY_LANGUAGE: 'entry.366145820',
  VITE_A11Y_FREE_SCHEDULE_URL: 'https://calendar.app.google/NvXgpHrpSnJ2186X7',
};
const env = { ...process.env };
for (const [k, v] of Object.entries(PUBLIC_ENV)) if (!env[k]) env[k] = v;
// ro se publica en la raíz.
env.VITE_BASE = '/';
delete env.VITE_FORM_SUBMIT_INBOX;
delete env.VN_SSR_CHILD;

const vite = path.join(root, 'node_modules', 'vite', 'bin', 'vite.js');
const run = (args, extra = {}) =>
  execFileSync(process.execPath, [vite, ...args], { cwd: root, stdio: 'inherit', env: { ...env, ...extra } });

// 1. Cliente.
run(['build', '--config', 'vite.ro.config.ts']);

// 2. Prerender de la ficha (mismo entry-server que el apex).
run(
  ['build', '--config', 'vite.ro.config.ts', '--ssr', 'src/sobre-mi/entry-server.tsx', '--outDir', ssrDir, '--emptyOutDir'],
  { VN_SSR_CHILD: '1' },
);
try {
  const shellPath = path.join(outDir, 'sobre-mi', 'index.html');
  const shell = fs.readFileSync(shellPath, 'utf8');
  if (!shell.includes(OUTLET)) throw new Error('build-ro · dist-ro/sobre-mi/index.html sin <!--ssr-outlet-->');
  const ssrEntry = fs.readdirSync(ssrDir).find((f) => /^entry-server\.m?js$/.test(f));
  if (!ssrEntry) throw new Error('build-ro · falta el bundle SSR de la ficha');
  const { render } = await import(pathToFileURL(path.join(ssrDir, ssrEntry)).href);
  const app = await render();
  if (!app.includes('id="habilidades"') || !app.includes('UX Manager')) {
    throw new Error('build-ro · la ficha no renderizó (falta #habilidades / UX Manager)');
  }
  const html = injectOutlet(shell, app);
  assertSingleDocumentHead(html, '/ (ro)');
  fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
  fs.rmSync(path.join(outDir, 'sobre-mi'), { recursive: true, force: true });
} finally {
  fs.rmSync(ssrDir, { recursive: true, force: true });
}

// 3. Assets de public/ referenciados (transitivo por HTML/CSS/JS emitidos) + /ar.
const TEXT = /\.(html|js|css|json|svg|webmanifest)$/i;
const copied = new Set();
const queue = [];
const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
const copyPublic = (rel) => {
  if (copied.has(rel)) return;
  const src = path.join(publicDir, rel);
  if (!src.startsWith(publicDir + path.sep) || !fs.existsSync(src) || !fs.statSync(src).isFile()) return;
  const dest = path.join(outDir, rel);
  if (fs.existsSync(dest)) return;
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  copied.add(rel);
  if (TEXT.test(rel)) queue.push(dest);
};
const REF = /(?:^|["'`(\s,=])\/((?:[\w@.~-]+\/)*[\w@.~-]+\.(?:png|jpe?g|webp|avif|gif|svg|ico|woff2?|ttf|otf|mp4|webm|json|webmanifest|txt))(?=[?#"'`)\s,]|$)/g;
const EXCLUDE = /^(sw\.js|manifest\.json|sitemap\.xml|robots\.txt|google[\w]+\.html)$|\.(pdf|docx?)$/i;
queue.push(...walk(outDir).filter((f) => TEXT.test(f)));
while (queue.length) {
  const file = queue.shift();
  const text = fs.readFileSync(file, 'utf8');
  for (const m of text.matchAll(REF)) {
    const rel = m[1];
    if (rel.startsWith('assets/') || EXCLUDE.test(rel)) continue;
    copyPublic(rel);
  }
}
// /ar (sitio estático propio en public/ar/).
for (const f of walk(path.join(publicDir, 'ar'))) {
  const rel = path.relative(publicDir, f);
  const dest = path.join(outDir, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(f, dest);
  copied.add(rel);
}
console.log(`build-ro · dist-ro/index.html + ${copied.size} archivos de public/ (incluye ar/)`);
