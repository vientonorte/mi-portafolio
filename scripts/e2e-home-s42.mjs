#!/usr/bin/env node
/**
 * E2E S42 P0 — home `/` sobre el build local (vite preview). Nunca contra producción.
 *
 * Uso:
 *   npm run build && npx vite preview --host 127.0.0.1 --port 4174 --strictPort
 *   node scripts/e2e-home-s42.mjs [baseUrl]            # default http://127.0.0.1:4174
 *   node scripts/e2e-home-s42.mjs [baseUrl] --measure  # solo imprime cajas (para fijar baseline)
 *   E2E_SHOTS_DIR=/ruta node scripts/e2e-home-s42.mjs  # guarda capturas (viewport + recorte mockup)
 *
 * Para cubrir el chequeo GA4 (dr) el build debe tener un ID de medición, p. ej.
 *   VITE_GA_MEASUREMENT_ID=G-E2ETEST00 npm run build
 * gtag.js se reemplaza por un stub local y TODO tráfico a Google se intercepta y se
 * responde vacío (nada sale a GA). El stub emula GA4: un hit /g/collect por cada
 * page_view del documento, con dr = document.referrer.
 *
 * Chequeos:
 *  1. Primera visita (contexto limpio, SW habilitado): exactamente 1 carga de documento
 *     en el main frame (sin location.reload() por el SW) y ningún /g/collect con dr = origen propio.
 *  2. Mobile 360×740 y 390×844: oferta «Web en 72h · $30.000 · 50/50» entera dentro del
 *     viewport, no tapada; DeviceMockup en la misma caja que 5d17bb9 (±2 px); sin solape.
 *  3. Sin CTA flotante en / (ni «Agendar» fijo): solo header/nav pueden ser fixed/sticky con enlaces.
 *  4. CTAs del hero: primario /servicios/#web-pymes, secundario /servicios/#consultoria-ux; canon.
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const args = process.argv.slice(2);
const MEASURE = args.includes('--measure');
const BASE = (args.find((a) => !a.startsWith('--')) || 'http://127.0.0.1:4174').replace(/\/$/, '');
const ORIGIN = new URL(BASE).origin;
const SHOTS = process.env.E2E_SHOTS_DIR || '';
const SHOT_PREFIX = process.env.E2E_SHOT_PREFIX || 'after';
if (SHOTS) mkdirSync(SHOTS, { recursive: true });

const OFFER_TEXT = 'Web en 72h · $30.000 · 50/50';

/**
 * Caja del DeviceMockup del hero ([data-testid="hero-mockup"]) medida sobre el build de
 * 5d17bb9 (main aprobado por Rö, mockup congelado) servido con `vite preview`, 5-oct-2026,
 * Chrome, contexto mobile (isMobile, DPR 2), scrollY 0, fuentes cargadas.
 */
const MOCKUP_BASELINE_5D17BB9 = {
  '360x740': { x: 16, y: 568, width: 328, height: 278 },
  '390x844': { x: 16, y: 568, width: 358, height: 296.8 },
};
const TOL = 2;

const VIEWPORTS = [
  { width: 360, height: 740 },
  { width: 390, height: 844 },
];

const results = [];
function record(label, ok, detail = '') {
  results.push({ label, ok, detail });
  console.log(`${ok ? '✅' : '❌'} ${label}${detail ? ` — ${detail}` : ''}`);
}

async function launch() {
  const channel = process.env.PW_CHANNEL;
  if (channel) return chromium.launch({ channel });
  try {
    return await chromium.launch();
  } catch {
    // Navegador de Playwright no instalado: usar Google Chrome del sistema.
    return chromium.launch({ channel: 'chrome' });
  }
}

/** Stub de gtag.js: procesa dataLayer y emite un hit GA4 por page_view (sin red real). */
const GTAG_STUB = `(() => {
  var dl = (window.dataLayer = window.dataLayer || []);
  var tid = '';
  function hit(en) {
    var q = new URLSearchParams({ v: '2', tid: tid || 'G-STUB', en: en, dl: location.href, dr: document.referrer || '' });
    try { fetch('https://region1.google-analytics.com/g/collect?' + q.toString(), { method: 'POST', mode: 'no-cors', keepalive: true }); } catch (e) {}
  }
  function handle(entry) {
    if (!entry) return;
    if (typeof entry === 'object' && !Array.isArray(entry) && typeof entry.length !== 'number') {
      if (entry.event === 'page_view') hit('page_view');
      return;
    }
    var a = Array.prototype.slice.call(entry);
    if (a[0] === 'config') tid = a[1];
    if (a[0] === 'event' && a[1] === 'page_view') hit('page_view');
  }
  for (var i = 0; i < dl.length; i++) handle(dl[i]);
  var push = dl.push.bind(dl);
  dl.push = function () { for (var j = 0; j < arguments.length; j++) handle(arguments[j]); return push.apply(null, arguments); };
})();`;

async function interceptGoogle(context, sink) {
  await context.route(/^https:\/\/www\.googletagmanager\.com\//, (route) => {
    sink.gtagRequests.push(route.request().url());
    route.fulfill({ status: 200, contentType: 'application/javascript', body: GTAG_STUB });
  });
  await context.route(/^https:\/\/([a-z0-9-]+\.)*(google-analytics\.com|analytics\.google\.com|doubleclick\.net)\//, (route) => {
    sink.collect.push(route.request().url());
    route.fulfill({ status: 204, body: '' });
  });
}

async function checkFirstVisit(browser) {
  const sink = { gtagRequests: [], collect: [] };
  // Contexto nuevo = caché, storage y SW limpios.
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await interceptGoogle(context, sink);
  await context.addInitScript(() => {
    try {
      const n = Number(sessionStorage.getItem('__e2e_doc_loads') || '0') + 1;
      sessionStorage.setItem('__e2e_doc_loads', String(n));
    } catch {
      /* noop */
    }
  });
  const page = await context.newPage();
  let loadEvents = 0;
  let mainNavRequests = 0;
  page.on('load', () => loadEvents++);
  page.on('request', (r) => {
    if (r.isNavigationRequest() && r.frame() === page.mainFrame()) mainNavRequests++;
  });
  try {
    await page.goto(`${BASE}/`, { waitUntil: 'load', timeout: 45000 });
    // Esperar a que el SW se instale, active y tome control (clients.claim → controllerchange).
    const swState = await page.evaluate(async () => {
      if (!('serviceWorker' in navigator)) return 'unsupported';
      const reg = await Promise.race([
        navigator.serviceWorker.ready,
        new Promise((r) => setTimeout(() => r(null), 15000)),
      ]);
      return reg ? 'ready' : 'timeout';
    });
    await page.waitForTimeout(1500);
    await page.waitForLoadState('load');
    await page.waitForTimeout(2500); // margen para una eventual recarga tardía
    const state = await page.evaluate(() => ({
      docLoads: Number(sessionStorage.getItem('__e2e_doc_loads') || '0'),
      controlled: Boolean(navigator.serviceWorker && navigator.serviceWorker.controller),
    }));
    const detail = `docLoads=${state.docLoads} loadEvents=${loadEvents} mainNavRequests=${mainNavRequests} sw=${swState} controlled=${state.controlled}`;
    record(
      'Primera visita: exactamente 1 carga de documento (sin reload del SW)',
      state.docLoads === 1 && loadEvents === 1 && mainNavRequests === 1,
      detail
    );
    const selfDr = sink.collect.filter((u) => {
      try {
        const dr = new URL(u).searchParams.get('dr') || '';
        return dr && new URL(dr).origin === ORIGIN;
      } catch {
        return false;
      }
    });
    if (sink.gtagRequests.length === 0) {
      record('GA4: sin /g/collect con dr = origen propio', selfDr.length === 0,
        'AVISO: build sin VITE_GA_MEASUREMENT_ID (gtag no se cargó); chequeo dr no cubierto');
    } else {
      record('GA4: sin /g/collect con dr = origen propio', selfDr.length === 0,
        `gtag stub=${sink.gtagRequests.length} collect=${sink.collect.length} dr_self=${selfDr.length}`);
    }
  } catch (err) {
    record('Primera visita', false, err.message.split('\n')[0]);
  } finally {
    await context.close();
  }
}

async function measureHero(page) {
  return page.evaluate(() => {
    const box = (el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { x: +r.x.toFixed(1), y: +r.y.toFixed(1), width: +r.width.toFixed(1), height: +r.height.toFixed(1) };
    };
    const offer = document.querySelector('#inicio [data-hero-offer]');
    let offerVisibleAtCenter = false;
    if (offer) {
      const r = offer.getBoundingClientRect();
      const hit = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
      offerVisibleAtCenter = Boolean(hit && (hit === offer || offer.contains(hit)));
    }
    return {
      offer: box(offer),
      offerText: offer ? offer.textContent.trim() : null,
      offerVisibleAtCenter,
      mockup: box(document.querySelector('#inicio [data-testid="hero-mockup"]')),
      scrollY: window.scrollY,
    };
  });
}

async function openMobile(browser, vp) {
  const context = await browser.newContext({
    viewport: vp,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    serviceWorkers: 'block',
  });
  await context.route(/^https:\/\/([a-z0-9-]+\.)*(googletagmanager\.com|google-analytics\.com|analytics\.google\.com)\//, (r) =>
    r.fulfill({ status: 204, body: '' })
  );
  const page = await context.newPage();
  await page.goto(`${BASE}/`, { waitUntil: 'load', timeout: 45000 });
  await page.waitForSelector('#inicio [data-testid="hero-mockup"] img', { timeout: 25000 });
  await page.evaluate(async () => {
    await document.fonts.ready;
    const img = document.querySelector('#inicio [data-testid="hero-mockup"] img');
    if (img && !img.complete) await new Promise((r) => img.addEventListener('load', r, { once: true }));
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(400);
  return { context, page };
}

const inside = (b, vp) => b.x >= 0 && b.y >= 0 && b.x + b.width <= vp.width && b.y + b.height <= vp.height;
const overlap = (a, b) =>
  a.x < b.x + b.width && b.x < a.x + a.width && a.y < b.y + b.height && b.y < a.y + a.height;
const near = (a, b) => ['x', 'y', 'width', 'height'].every((k) => Math.abs(a[k] - b[k]) <= TOL);

async function checkMobileHero(browser) {
  for (const vp of VIEWPORTS) {
    const key = `${vp.width}x${vp.height}`;
    const { context, page } = await openMobile(browser, vp);
    try {
      const m = await measureHero(page);
      if (SHOTS) {
        await page.screenshot({ path: join(SHOTS, `${SHOT_PREFIX}-viewport-${key}.png`) });
        await page.locator('#inicio [data-testid="hero-mockup"]').screenshot({ path: join(SHOTS, `${SHOT_PREFIX}-mockup-${key}.png`) });
      }
      if (MEASURE) {
        console.log(`📐 ${key} ${JSON.stringify(m)}`);
        continue;
      }
      const base = MOCKUP_BASELINE_5D17BB9[key];
      record(`${key} oferta «${OFFER_TEXT}» presente`, m.offerText === OFFER_TEXT, `text=${JSON.stringify(m.offerText)}`);
      record(`${key} oferta entera dentro del viewport y no tapada`, Boolean(m.offer && inside(m.offer, vp) && m.offerVisibleAtCenter),
        `offer=${JSON.stringify(m.offer)} visibleAtCenter=${m.offerVisibleAtCenter}`);
      record(`${key} DeviceMockup = baseline 5d17bb9 (±${TOL}px)`, Boolean(m.mockup && base && near(m.mockup, base)),
        `mockup=${JSON.stringify(m.mockup)} baseline=${JSON.stringify(base)}`);
      record(`${key} oferta no se solapa con el mockup`, Boolean(m.offer && m.mockup && !overlap(m.offer, m.mockup)));
    } catch (err) {
      record(`${key} hero mobile`, false, err.message.split('\n')[0]);
    } finally {
      await context.close();
    }
  }
}

async function checkNoFloatingCta(browser) {
  for (const vp of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
    const context = await browser.newContext({ viewport: vp, serviceWorkers: 'block' });
    await context.route(/^https:\/\/([a-z0-9-]+\.)*(googletagmanager\.com|google-analytics\.com|analytics\.google\.com)\//, (r) =>
      r.fulfill({ status: 204, body: '' })
    );
    const page = await context.newPage();
    const offenders = [];
    try {
      await page.goto(`${BASE}/`, { waitUntil: 'load', timeout: 45000 });
      await page.waitForSelector('#inicio h1', { timeout: 25000 });
      for (const y of [0, 700, 1500, 3000]) {
        await page.evaluate((top) => window.scrollTo(0, top), y);
        await page.waitForTimeout(900);
        const found = await page.evaluate(() =>
          [...document.querySelectorAll('body *')]
            .filter((el) => {
              const cs = getComputedStyle(el);
              if (cs.position !== 'fixed' && cs.position !== 'sticky') return false;
              if (cs.display === 'none' || cs.visibility === 'hidden' || Number(cs.opacity) === 0) return false;
              const r = el.getBoundingClientRect();
              if (r.width === 0 || r.height === 0) return false;
              if (!el.querySelector('a, button')) return false;
              // Permitidos: header del sitio y navegación (dock, índice de secciones).
              const isNav = el.matches('header, nav, [role="navigation"], [role="banner"]') ||
                Boolean(el.closest('header, nav')) || Boolean(el.querySelector('nav, [role="navigation"]'));
              return !isNav;
            })
            .map((el) => (el.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 60))
        );
        for (const t of found) offenders.push(`y=${y}: ${t}`);
      }
      record(`${vp.width}×${vp.height} sin CTA flotante (p. ej. «Agendar →» con ×)`, offenders.length === 0,
        offenders.length ? [...new Set(offenders)].join(' | ') : '');
    } catch (err) {
      record(`${vp.width}×${vp.height} sin CTA flotante`, false, err.message.split('\n')[0]);
    } finally {
      await context.close();
    }
  }
}

const FORBIDDEN = [/\/#\//, /\/news\//, /\/qa\//, /\/mi-portafolio\//, /\/servicios\/diagnostico-accesibilidad-wcag\//, /\/servicios\/consultoria-ux-pymes\//];

async function checkHeroCtas(browser) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, serviceWorkers: 'block' });
  const page = await context.newPage();
  try {
    await page.goto(`${BASE}/`, { waitUntil: 'load', timeout: 45000 });
    await page.waitForSelector('#inicio a[data-marketing-cta="hero-primary"]', { timeout: 25000 });
    const hrefs = await page.$$eval('#inicio a', (as) => as.map((a) => a.getAttribute('href')));
    const ok = hrefs.length === 2 && hrefs[0] === '/servicios/#web-pymes' && hrefs[1] === '/servicios/#consultoria-ux';
    const canon = hrefs.every((h) => !FORBIDDEN.some((re) => re.test(h)) && (!/\/s\//.test(h) || h.includes('/s/polijuego-privacy/')));
    record('CTAs hero: primario /servicios/#web-pymes, secundario /servicios/#consultoria-ux, canon OK', ok && canon, JSON.stringify(hrefs));
  } catch (err) {
    record('CTAs hero', false, err.message.split('\n')[0]);
  } finally {
    await context.close();
  }
}

async function main() {
  if (/vientonorte\.io/.test(BASE)) {
    console.error('Este e2e es solo local (vite preview). No se ejecuta contra producción.');
    process.exit(2);
  }
  console.log(`\n🔍 E2E S42 home — ${BASE}${MEASURE ? ' (measure)' : ''}\n`);
  const browser = await launch();
  try {
    if (MEASURE) {
      await checkMobileHero(browser);
      return;
    }
    await checkFirstVisit(browser);
    await checkMobileHero(browser);
    await checkNoFloatingCta(browser);
    await checkHeroCtas(browser);
  } finally {
    await browser.close();
  }
  const failed = results.filter((r) => !r.ok);
  console.log(`\n---\nTotal: ${results.length} | OK: ${results.length - failed.length} | FAIL: ${failed.length}\n`);
  process.exit(failed.length ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
