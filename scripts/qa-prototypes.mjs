#!/usr/bin/env node
/**
 * QA de prototipos, POCs y enlaces Figma en producción.
 * Sincroniza URLs desde src/data/*.ts y valida presencia en DOM + clicks arsenal.
 *
 * Uso: node scripts/qa-prototypes.mjs [baseUrl]
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BASE = (process.argv[2] || 'https://vientonorte.github.io/mi-portafolio').replace(/\/$/, '');

/** Embeds Figma cableados en fases/proyectos (src/data/figma-embeds.ts) */
const ACTIVE_FIGMA_EMBEDS = [
  {
    path: '/proceso/fase/ux-testing',
    needles: ['WQ3yWzgIrOSZXTuExwRzS9', 'embed.figma.com/board'],
    label: 'UX Testing · FigJam crítica',
  },
  {
    path: '/proyecto/sura-ux-enterprise',
    needles: ['xxKiHNAOPDpxmfuqyE7N72', 'embed.figma.com/slides'],
    label: 'SURA Enterprise · Figma Slides Colombia',
  },
];

function hashUrl(path) {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${BASE}/#${clean}`;
}

function readSrc(relPath) {
  return readFileSync(join(ROOT, relPath), 'utf8');
}

function parseQuotedUrls(ts) {
  const urls = {};
  const constRe = /export const (\w+)\s*=\s*\n?\s*"([^"]+)"/g;
  for (const match of ts.matchAll(constRe)) {
    urls[match[1]] = match[2];
  }
  return urls;
}

function parseValueProofExternalUrls(arsenalTs, demosTs) {
  const block = arsenalTs.match(/export const VALUE_PROOF_EXTERNAL_URLS[\s\S]*?=\s*\{([\s\S]*?)\};/);
  if (!block) return {};

  const urls = {};
  const constUrls = parseQuotedUrls(arsenalTs);
  const consultoria = parseConsultoriaDemos(demosTs);
  const body = block[1];

  const entryRe =
    /"([^"]+)":\s*(?:"([^"]+)"|(CONSULTORIA_DEMO_(?:X_CMS|GEES)\.figmaSitesUrl)|([A-Z][A-Z0-9_]+))/g;
  for (const match of body.matchAll(entryRe)) {
    const [, id, quoted, consultoriaRef, constRef] = match;
    if (quoted) urls[id] = quoted;
    else if (consultoriaRef?.includes('GEES')) urls[id] = consultoria.figmaSitesUrls?.find((u) => u.includes('duct-juice')) || consultoria.figmaSitesUrls?.[1];
    else if (consultoriaRef) urls[id] = consultoria.figmaSitesUrl;
    else if (constRef && constUrls[constRef]) urls[id] = constUrls[constRef];
  }

  for (const match of body.matchAll(/"([^"]+)":\s*\n\s*"([^"]+)"/g)) {
    urls[match[1]] = match[2];
  }

  return urls;
}

function parseArsenalTitlesEs(ts) {
  const titles = {};
  const itemRe = /id:\s*"([^"]+)"[\s\S]*?es:\s*\{[\s\S]*?title:\s*"([^"]+)"/g;
  for (const match of ts.matchAll(itemRe)) {
    titles[match[1]] = match[2];
  }
  return titles;
}

function parseConsultoriaDemos(ts) {
  const sites = [...ts.matchAll(/figmaSitesUrl:\s*"([^"]+)"/g)].map((m) => m[1]);
  const make = ts.match(/figmaMakeUrl:\s*\n?\s*"([^"]+)"/)?.[1];
  return {
    figmaSitesUrl: sites[0],
    figmaSitesUrls: sites,
    figmaMakeUrl: make,
  };
}

function parseProjectExternalLinks(ts, constUrls) {
  const projects = [];
  const chunks = ts.split(/\n\s*\{/);
  for (const chunk of chunks) {
    const id = chunk.match(/^\s*id:\s*"([^"]+)"/m)?.[1];
    const external = chunk.match(/externalLink:\s*("([^"]+)"|([A-Z_]+))/m);
    if (!id || !external) continue;
    const url = external[2] || constUrls[external[3]];
    if (url) projects.push({ id, path: `/proyecto/${id}`, url });
  }
  return projects;
}

function urlNeedle(url) {
  try {
    const u = new URL(url);
    if (u.hostname.endsWith('figma.site')) return u.hostname.split('.')[0];
    return u.pathname.split('/').filter(Boolean).slice(-2).join('/') || u.hostname;
  } catch {
    return url.slice(0, 24);
  }
}

function loadManifest() {
  const arsenalTs = readSrc('src/data/value-content-arsenal.ts');
  const demosTs = readSrc('src/data/consultoria-demos.ts');
  const projectsTs = readSrc('src/data/projects-data.ts');

  const constUrls = parseQuotedUrls(arsenalTs);
  const consultoria = parseConsultoriaDemos(demosTs);
  const arsenalExternal = parseValueProofExternalUrls(arsenalTs, demosTs);
  const arsenalTitles = parseArsenalTitlesEs(arsenalTs);
  const projects = parseProjectExternalLinks(projectsTs, constUrls).filter((p) =>
    /figma\.(com|site)/.test(p.url)
  );

  return { arsenalExternal, arsenalTitles, consultoria, projects, constUrls };
}

async function checkFigmaSites(urls) {
  const results = [];
  const unique = [...new Set(urls.filter((u) => u.includes('figma.site')))];
  for (const url of unique) {
    try {
      const res = await fetch(url, { method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(20000) });
      results.push({ label: `HTTP ${url}`, ok: res.ok, errors: res.ok ? [] : [`status ${res.status}`] });
    } catch (err) {
      results.push({ label: `HTTP ${url}`, ok: false, errors: [err.message] });
    }
  }
  return results;
}

async function visit(page, path, waitMs = 3500) {
  await page.goto(hashUrl(path), { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForSelector('#main', { timeout: 30000 });
  await page.waitForTimeout(waitMs);
}

async function collectHrefAndIframeSrc(page) {
  const links = await page.locator('a[href]').evaluateAll((els) =>
    els.map((e) => e.getAttribute('href')).filter(Boolean)
  );
  const iframes = await page.locator('iframe[src]').evaluateAll((els) =>
    els.map((e) => e.getAttribute('src')).filter(Boolean)
  );
  return [...links, ...iframes];
}

async function checkPageNeedles(page, { path, needles, label }) {
  await visit(page, path);
  const haystack = (await collectHrefAndIframeSrc(page)).join('\n');
  const missing = needles.filter((n) => !haystack.includes(n));
  return {
    label,
    ok: missing.length === 0,
    errors: missing.length ? [`falta en DOM: ${missing.join(', ')}`] : [],
  };
}

async function checkConsultoriaDemo(page, consultoria) {
  await visit(page, '/consultoria');
  await page.locator('#consultoria-demo').scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);

  const errors = [];
  const haystack = (await collectHrefAndIframeSrc(page)).join('\n');
  const siteUrls = consultoria.figmaSitesUrls?.length
    ? consultoria.figmaSitesUrls
    : [consultoria.figmaSitesUrl].filter(Boolean);

  for (const siteUrl of siteUrls) {
    if (!haystack.includes(urlNeedle(siteUrl))) {
      errors.push(`iframe/link Figma Sites ausente: ${urlNeedle(siteUrl)}`);
    }
  }

  const primary = page.getByRole('button', { name: /demo publicada|published demo|abrir demo|open demo/i });
  if ((await primary.count()) < siteUrls.length) {
    errors.push(`CTA principal demo: esperados ≥${siteUrls.length}, hay ${await primary.count()}`);
  }

  const secondary = page.getByRole('button', { name: /figma make/i });
  if ((await secondary.count()) === 0) errors.push('CTA secundario Figma Make no encontrado');

  if (errors.length === 0) {
    await page.evaluate(() => {
      window.__openedUrls = [];
      window.open = (url) => {
        window.__openedUrls.push(String(url));
        return null;
      };
    });
    await secondary.first().click();
    await page.waitForTimeout(300);
    const opened = await page.evaluate(() => window.__openedUrls ?? []);
    if (!opened.some((u) => u.includes('figma.com/make'))) {
      errors.push('click Figma Make no abrió URL esperada');
    }
  }

  return { label: 'Consultoría demos Figma Sites', ok: errors.length === 0, errors };
}

async function expandArsenal(page) {
  await visit(page, '/consultoria');
  await page.locator('#recursos').scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);

  // Expand all pages of Arsenal cards (external items are often below the fold).
  const loadMore = page.getByRole('button', { name: /cargar más|load more|ver más|show more/i });
  for (let i = 0; i < 40; i++) {
    if (!(await loadMore.isVisible().catch(() => false))) break;
    if (!(await loadMore.isEnabled().catch(() => false))) break;
    await loadMore.click();
    await page.waitForTimeout(400);
  }
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);
}

async function checkArsenalExternalClicks(page, arsenalExternal, arsenalTitles) {
  await page.addInitScript(() => {
    window.__openedUrls = [];
    const orig = window.open;
    window.open = (url, ...args) => {
      window.__openedUrls.push(String(url));
      return orig.call(window, 'about:blank', ...args.slice(1));
    };
  });

  await expandArsenal(page);

  const results = [];
  for (const [id, url] of Object.entries(arsenalExternal)) {
    const title = arsenalTitles[id];
    const label = `Arsenal click · ${id}`;
    if (!title) {
      results.push({ label, ok: false, errors: ['título ES no parseado'] });
      continue;
    }

    await page.evaluate(() => {
      window.__openedUrls = [];
    });

    // Prefer article+h3; fall back to any heading/text match for the card title.
    let article = page.locator('article').filter({
      has: page.getByRole('heading', { name: title, exact: false }),
    });
    if ((await article.count()) === 0) {
      article = page.locator('article').filter({ has: page.getByText(title, { exact: false }) });
    }
    if ((await article.count()) === 0) {
      // Last resort: scroll all articles into view after extra expand
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(300);
      article = page.locator('article').filter({
        has: page.getByRole('heading', { name: title, exact: false }),
      });
    }
    if ((await article.count()) === 0) {
      results.push({ label, ok: false, errors: [`card no visible: "${title}"`] });
      continue;
    }

    await article.first().scrollIntoViewIfNeeded();
    await article.first().getByRole('button').first().click();
    await page.waitForTimeout(400);
    const opened = await page.evaluate(() => window.__openedUrls ?? []);
    const needle = urlNeedle(url);
    const ok = opened.some((u) => u.includes(needle) || u === url);
    results.push({
      label,
      ok,
      errors: ok ? [] : [`esperaba ${url}, abrió: ${opened.join(' | ') || '(vacío)'}`],
    });
  }
  return results;
}

function parsePendingPocs(ts) {
  const pending = [];
  for (const block of ts.matchAll(/id:\s*"([^"]+)"[\s\S]*?status:\s*"(draft|ready)"/g)) {
    pending.push(block[1]);
  }
  return pending;
}

function reportPocBacklog() {
  const ts = readSrc('src/data/poc-registry.ts');
  const pending = parsePendingPocs(ts);
  if (pending.length === 0) {
    console.log('⏭️  Backlog · poc-registry — sin POCs draft/ready (issue #97)');
    return;
  }
  console.log(
    `⏭️  Backlog · poc-registry — ${pending.length} POC(s) pendiente(s): ${pending.join(', ')}`
  );
}

function logResult(r) {
  if (r.skipped) {
    const note = r.note ? ` — ${r.note}` : '';
    console.log(r.ok ? `⏭️  ${r.label}${note}` : `⚠️  ${r.label} — ${r.errors?.join('; ')}`);
    return;
  }
  console.log(r.ok ? `✅ ${r.label}` : `❌ ${r.label} — ${r.errors.join('; ')}`);
}

async function main() {
  const manifest = loadManifest();
  const { arsenalExternal, arsenalTitles, consultoria, projects } = manifest;

  console.log(`\n🔬 QA prototipos — ${BASE}\n`);
  console.log(`Arsenal externo: ${Object.keys(arsenalExternal).length} · Proyectos externalLink: ${projects.length}\n`);

  const results = [];

  const siteUrls = [
    ...(consultoria.figmaSitesUrls || [consultoria.figmaSitesUrl]),
    ...Object.values(arsenalExternal),
    ...projects.map((p) => p.url),
  ].filter(Boolean);

  for (const r of await checkFigmaSites(siteUrls)) {
    results.push(r);
    logResult(r);
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ serviceWorkers: 'block' });
  const page = await context.newPage();

  for (const project of projects) {
    const r = await checkPageNeedles(page, {
      path: project.path,
      needles: [urlNeedle(project.url)],
      label: `Proyecto · ${project.id}`,
    });
    results.push(r);
    logResult(r);
  }

  const auditoria = await checkPageNeedles(page, {
    path: '/auditoria',
    needles: ['lEGDG3EDlNI3OOUCucTyyx', 'embed.figma.com/board'],
    label: 'Auditoría · FigJam embed',
  });
  results.push(auditoria);
  logResult(auditoria);

  const consultoriaCheck = await checkConsultoriaDemo(page, consultoria);
  results.push(consultoriaCheck);
  logResult(consultoriaCheck);

  console.log('\n🧩 Figma embeds (FigJam / Slides)\n');
  for (const embed of ACTIVE_FIGMA_EMBEDS) {
    const r = await checkPageNeedles(page, embed);
    results.push(r);
    logResult(r);
  }

  console.log('\n🎯 Arsenal — clicks externos (soft: no bloquea CI; ver issue #113)\n');
  for (const r of await checkArsenalExternalClicks(page, arsenalExternal, arsenalTitles)) {
    // Soft-fail: report visibility/click issues without failing the pipeline.
    // Hard gates remain: project pages, embeds, consultoria demo, figma sites.
    results.push({ ...r, skipped: true, soft: true });
    logResult({ ...r, skipped: true });
  }

  console.log('\n📋 Backlog documentado (no bloquea CI)\n');
  reportPocBacklog();

  await browser.close();

  const failed = results.filter((r) => !r.ok && !r.skipped);
  const passed = results.filter((r) => r.ok && !r.skipped);
  console.log(`\n---\nActivos: ${results.length} | OK: ${passed.length} | FAIL: ${failed.length}\n`);
  process.exit(failed.length ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});