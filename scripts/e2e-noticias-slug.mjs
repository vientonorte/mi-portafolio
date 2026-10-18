#!/usr/bin/env node
/* global process, console, URL */
/**
 * E2E /noticias/<slug>/ — sobre el build local (vite preview / serve). Nunca contra producción.
 *
 * Uso:
 *   npm run build && npx vite preview --host 127.0.0.1 --port 4174 --strictPort
 *   node scripts/e2e-noticias-slug.mjs [baseUrl]   # default http://127.0.0.1:4174
 *
 * Por cada tarjeta de /noticias/ ([data-news-edition]):
 *  1. tiene un <a> real a <base>noticias/<slug>/ con nombre accesible (aria-label con el título);
 *  2. al hacer click, la respuesta del documento es 200 y la URL final es /noticias/<slug>/;
 *  3. el <h1> es el título de la edición (src/data/news-editions.json);
 *  4. canonical propio https://vientonorte.io/noticias/<slug>/ y migas con aria-current="page".
 * Además: ningún enlace de /noticias/ ni de las ediciones apunta a /#/news.
 */
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';

const BASE = (process.argv[2] || 'http://127.0.0.1:4174').replace(/\/$/, '');
const BASE_PATH = (() => {
  const p = new URL(`${BASE}/`).pathname;
  return p.endsWith('/') ? p : `${p}/`;
})();
const ORIGIN = new URL(BASE).origin;
const catalog = JSON.parse(readFileSync(new URL('../src/data/news-editions.json', import.meta.url), 'utf8'));
const titles = Object.fromEntries(catalog.editions.map((e) => [e.slug, e.title.es]));

const failures = [];
const fail = (m) => {
  failures.push(m);
  console.error(`✗ ${m}`);
};

const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  const res = await page.goto(`${BASE}/noticias/`, { waitUntil: 'domcontentloaded' });
  if (res?.status() !== 200) fail(`/noticias/ → ${res?.status()}`);
  const cards = await page.locator('[data-news-edition]').evaluateAll((els) =>
    els.map((el) => el.getAttribute('data-news-edition')),
  );
  const expected = catalog.editions.map((e) => e.slug);
  if (JSON.stringify(cards) !== JSON.stringify(expected)) fail(`tarjetas ${cards} ≠ ediciones ${expected}`);

  for (const slug of cards) {
    await page.goto(`${BASE}/noticias/`, { waitUntil: 'domcontentloaded' });
    const link = page.locator(`[data-news-edition="${slug}"] a[href]`).first();
    const href = await link.getAttribute('href');
    const want = new URL(`${BASE_PATH}noticias/${slug}/`, ORIGIN).href;
    if (new URL(href, ORIGIN).href !== want) fail(`${slug}: href ${href} ≠ ${want}`);
    const name = await link.getAttribute('aria-label');
    if (!name || !name.includes(titles[slug])) fail(`${slug}: nombre accesible «${name}» sin el título`);

    const [nav] = await Promise.all([page.waitForNavigation({ waitUntil: 'domcontentloaded' }), link.click()]);
    if (nav?.status() !== 200) fail(`${slug}: status ${nav?.status()}`);
    if (page.url() !== want) fail(`${slug}: URL final ${page.url()} ≠ ${want}`);
    const h1 = (await page.locator('h1').first().textContent())?.trim();
    if (h1 !== titles[slug]) fail(`${slug}: h1 «${h1}» ≠ «${titles[slug]}»`);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    if (canonical !== `https://vientonorte.io/noticias/${slug}/`) fail(`${slug}: canonical ${canonical}`);
    const robots = await page.locator('meta[name="robots"]').getAttribute('content');
    if (BASE_PATH === '/' && !/index/.test(robots || '') ) fail(`${slug}: robots ${robots}`);
    const current = (await page.locator('nav[aria-label="Migas de pan"] [aria-current="page"]').textContent())?.trim();
    if (current !== titles[slug]) fail(`${slug}: migas aria-current «${current}»`);
    const hrefs = await page.locator('a[href]').evaluateAll((as) => as.map((a) => a.getAttribute('href')));
    const hash = hrefs.filter((h) => /#\/news/.test(h));
    if (hash.length) fail(`${slug}: enlaces a #/news ${hash}`);
    if (!failures.length) console.log(`✓ ${slug}: 200 · h1 «${h1}»`);
  }
} finally {
  await browser.close();
}
if (failures.length) {
  console.error(`\n${failures.length} fallo(s)`);
  process.exit(1);
}
console.log('\ne2e /noticias/<slug>/ OK');
