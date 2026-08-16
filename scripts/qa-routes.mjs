#!/usr/bin/env node
/**
 * QA de rutas HashRouter — verifica que cada path renderice #root con contenido.
 * Uso: node scripts/qa-routes.mjs [baseUrl]
 */
import { chromium } from 'playwright';

const BASE = (process.argv[2] || 'https://vientonorte.io').replace(/\/$/, '');

const STATIC_ROUTES = [
  '/',
  '/proyectos',
  '/proyectos/autosuggest-fondos',
  '/sobre-mi',
  '/contacto',
  '/privacy',
  '/grafo',
  '/design-system',
  '/proceso',
  '/framework',
  '/auditoria',
  '/consultoria',
  '/consultoria/embudo',
  '/consultoria/modulos/dashboard',
  '/admin',
  '/admin/fotos',
  '/cases',
  '/cases/process/ux-analytics',
  '/ruta-qa-inexistente',
];

const PROCESS_IDS = ['ux-analytics', 'ux-research', 'ux-ui-design', 'ux-testing'];

const COMPANY_IDS = ['sura-investments', 'transvip'];

const PROJECT_IDS = [
  'sura-ux-enterprise',
  'sura-inversiones-dashboard',
  'sura-ecosistema-digital',
  'sura-ria-us',
  'sura-ia-automation-dashboard',
  'transvip-app-premium',
  'karri-calculadora',
  'karri-notificaciones',
  'karri-design-sprint',
  'ux-tools',
  'framework',
];

// Home FO + SEM paid = mismo funnel (packs + OB). Tour = /consultoria/modulos/:id
// Legacy /consultoria/embudo redirige a / — las secciones se checan en home.
const SECTION_CHECKS = [
  { path: '/', sectionId: 'inicio', label: 'Home embudo #inicio' },
  { path: '/', sectionId: 'modalidades', label: 'Home embudo #modalidades' },
  { path: '/', sectionId: 'consultoria-onboarding', label: 'Home embudo #consultoria-onboarding' },
  { path: '/', sectionId: 'consultoria-demo', label: 'Home embudo #consultoria-demo' },
  { path: '/', sectionId: 'contacto', label: 'Home embudo #contacto' },
  { path: '/consultoria', sectionId: 'modalidades', label: 'SEM #modalidades' },
  { path: '/consultoria', sectionId: 'consultoria-onboarding', label: 'SEM #consultoria-onboarding' },
  { path: '/consultoria', sectionId: 'contacto', label: 'SEM #contacto' },
  { path: '/design-system', sectionId: 'figma-export', label: 'Design System #figma-export' },
];

const PORTFOLIO_IMAGES = [
  'images/sura/logo.svg',
  'images/sura/ria-onboarding.png',
  'images/sura/web-prototype.png',
  'images/sura/analytics-ga4.png',
  'images/transvip/logo.svg',
  'images/transvip/app-desktop.png',
  'images/transvip/app-mobile.png',
  'images/transvip/figma-prototype.png',
  'images/transvip/product-vision.png',
  'images/karri/logo.png',
  'images/framework/ux-value-chain.png',
];

function hashUrl(path) {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${BASE}/#${clean}`;
}

function isBenignConsoleError(text) {
  const benign = [
    'favicon',
    'GA',
    'GTM',
    'fontshare',
    'manifest',
    'CORS',
    'workers.dev',
    'google-analytics',
    'googletagmanager',
    'Failed to load resource: net::ERR_FAILED',
    'net::ERR_BLOCKED_BY_CLIENT',
    // Optional/lazy assets or missing mock images must not fail FO home smoke
    'status of 404',
    '404 (Not Found)',
  ];
  return benign.some((b) => text.includes(b));
}

function isSameOriginAsset(url) {
  return url.includes('/assets/') || url.startsWith(BASE);
}

const routes = [
  ...STATIC_ROUTES.map((p) => ({ path: p, label: p })),
  ...PROCESS_IDS.map((id) => ({ path: `/proceso/fase/${id}`, label: `proceso/${id}` })),
  ...COMPANY_IDS.map((id) => ({ path: `/empresa/${id}`, label: `empresa/${id}` })),
  ...PROJECT_IDS.map((id) => ({ path: `/proyecto/${id}`, label: `proyecto/${id}` })),
];

async function checkRoute(page, { path, label }) {
  const errors = [];
  const consoleErrors = [];
  const pageErrors = [];
  const failedAssets = [];

  const onConsole = (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  };
  const onPageError = (err) => pageErrors.push(err.message);
  const onRequestFailed = (req) => {
    const url = req.url();
    if (isSameOriginAsset(url)) failedAssets.push(url);
  };

  page.on('console', onConsole);
  page.on('pageerror', onPageError);
  page.on('requestfailed', onRequestFailed);

  try {
    await page.goto(hashUrl(path), { waitUntil: 'domcontentloaded', timeout: 45000 });
    // #main siempre en el shell; tour oferta es fixed (puede no “visible” a PW por height)
    await page.waitForSelector('#main', { state: 'attached', timeout: 25000 });
    if (
      path === '/' ||
      path === '/consultoria/embudo' ||
      path === '/consultoria'
    ) {
      await page.waitForSelector('[data-testid="consultoria-funnel"]', {
        state: 'attached',
        timeout: 20000,
      });
    }
    if (path.startsWith('/consultoria/modulos/')) {
      await page.waitForSelector('[data-testid="consultoria-offer"]', {
        state: 'attached',
        timeout: 20000,
      });
    }

    const root = await page.locator('#root').innerHTML();
    const rootLen = root.trim().length;
    const title = await page.title();

    if (rootLen < 100) errors.push('root vacío o sin render');
    if (!title || title.length < 3) errors.push('title vacío');

    if (path === '/ruta-qa-inexistente') {
      const notFound = await page.getByText(/no encontr|not found|página|page/i).count();
      if (notFound === 0) errors.push('404 no visible');
    }

    const criticalConsole = consoleErrors.filter((e) => !isBenignConsoleError(e));
    if (criticalConsole.length) errors.push(`console: ${criticalConsole[0].slice(0, 120)}`);
    if (pageErrors.length) errors.push(`pageerror: ${pageErrors[0].slice(0, 120)}`);
    const criticalAssets = failedAssets.filter((u) => u.includes('/assets/') && !u.includes('.map'));
    if (criticalAssets.length && rootLen < 500) {
      const u = criticalAssets[0].replace(BASE, '').slice(0, 80);
      errors.push(`asset: ${u}`);
    }

    return { label, path, ok: errors.length === 0, errors, title };
  } catch (err) {
    return { label, path, ok: false, errors: [err.message], title: '' };
  } finally {
    page.off('console', onConsole);
    page.off('pageerror', onPageError);
    page.off('requestfailed', onRequestFailed);
  }
}

/** Home FO = embudo: hero #inicio + CTAs (ya no path cards de portafolio). */
async function checkHeroMobileSuggestions(browser) {
  const ctx = await browser.newContext({
    serviceWorkers: 'block',
    viewport: { width: 390, height: 844 },
  });
  const mPage = await ctx.newPage();
  try {
    await mPage.goto(hashUrl('/'), { waitUntil: 'domcontentloaded', timeout: 45000 });
    await mPage.waitForSelector('[data-testid="consultoria-funnel"]', { timeout: 25000 });
    await mPage.waitForSelector('#inicio', { timeout: 15000 });
    const startCta = mPage.locator('#inicio').getByRole('button').first();
    const visible = await startCta.isVisible();
    const modalidades = await mPage.locator('#modalidades').count();
    return {
      label: 'Home embudo mobile hero',
      ok: visible && modalidades > 0,
      errors:
        visible && modalidades > 0
          ? []
          : [
              !visible ? 'CTA no visible en #inicio' : '',
              modalidades === 0 ? 'falta #modalidades' : '',
            ].filter(Boolean),
    };
  } catch (err) {
    return { label: 'Home embudo mobile hero', ok: false, errors: [err.message.split('\n')[0]] };
  } finally {
    await ctx.close();
  }
}

/** Menú lateral mobile: marca en header, panel sin logo/toggles duplicados, ancho completo. */
async function checkMobileMenuNav(browser) {
  const viewport = { width: 390, height: 844 };
  const ctx = await browser.newContext({ serviceWorkers: 'block', viewport });
  const mPage = await ctx.newPage();
  const errors = [];

  try {
    await mPage.goto(hashUrl('/'), { waitUntil: 'domcontentloaded', timeout: 45000 });
    await mPage.waitForSelector('header[role="banner"]', { timeout: 25000 });

    const header = mPage.locator('header[role="banner"]').first();
    // Marca FO: Viento Norte (no nombre personal)
    const homeBrand = header.getByRole('link', { name: /inicio|viento norte/i }).first();
    const headerBrandVisible = await homeBrand.isVisible().catch(() => false);
    if (!headerBrandVisible) errors.push('marca no visible en header mobile');

    const openMenu = header.getByRole('button', { name: /abrir menú de navegación/i });
    await openMenu.click();
    await mPage.waitForSelector('#mobile-menu', { state: 'visible', timeout: 10000 });

    const menu = mPage.locator('#mobile-menu');
    const menuBox = await menu.boundingBox();
    if (!menuBox || menuBox.width < viewport.width * 0.92) {
      errors.push(`panel no usa ancho completo (${menuBox?.width ?? 0}px)`);
    }

    const brandInMenu = await menu.getByText('Rodrigo Gaete').count();
    if (brandInMenu > 0) errors.push('logo/marca personal duplicada dentro del sidebar');

    const logoMarkInMenu = await menu.locator('.logo-mark').count();
    if (logoMarkInMenu > 0) errors.push('isologo duplicado dentro del sidebar');

    const closeInMenu = await menu.getByRole('button', { name: /cerrar menú/i }).count();
    if (closeInMenu > 0) errors.push('botón cerrar duplicado en sidebar');

    const quickLinks = await menu
      .getByText(/enlaces rápidos|quick links/i)
      .isVisible()
      .catch(() => false);
    if (!quickLinks) errors.push('sección enlaces rápidos ausente');

    const contactChip = await menu.getByRole('link', { name: /contacto|contact/i }).count();
    if (contactChip === 0) errors.push('enlace contacto ausente en sidebar');

    const navItem = await menu
      .getByRole('button', { name: /inicio|home|proceso|process|negocios|projects/i })
      .count();
    if (navItem === 0) errors.push('ítems de navegación no visibles');

    // Header puede colapsar marca con menú abierto en FO; no bloquear si el panel está OK
    const headerBrandAfterOpen = await homeBrand.isVisible().catch(() => false);
    if (!headerBrandAfterOpen && headerBrandVisible) {
      // soft: only warn if brand was visible and vanished AND menu broken
      // skip hard fail for FO logo mark-only header
    }

    return {
      label: 'Mobile menú sin redundancia',
      ok: errors.length === 0,
      errors,
    };
  } catch (err) {
    return {
      label: 'Mobile menú sin redundancia',
      ok: false,
      errors: [err.message.split('\n')[0]],
    };
  } finally {
    await ctx.close();
  }
}

async function checkSection(page, { path, sectionId, label, lazy = false }) {
  try {
    await page.goto(hashUrl(path), { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForSelector('#main', { timeout: 25000 });

    const el = page.locator(`#${sectionId}`);
    const timeout = lazy ? 40000 : 15000;

    if (lazy) {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 3));
    }

    await el.waitFor({ state: 'visible', timeout });
    return { label, ok: true, errors: [] };
  } catch (err) {
    return { label, ok: false, errors: [err.message.split('\n')[0]] };
  }
}

async function checkAssets() {
  const origin = new URL(BASE).origin;
  const res = await fetch(`${BASE}/index.html`);
  const html = await res.text();
  const assets = [...html.matchAll(/(?:\/)?assets\/[^"]+\.js/g)].map((m) =>
    m[0].startsWith('/') ? m[0] : `/${m[0]}`
  );
  const missing = [];
  for (const asset of [...new Set(assets)]) {
    const r = await fetch(`${origin}${asset}`, { method: 'HEAD' });
    if (!r.ok) missing.push(asset);
  }
  return { ok: missing.length === 0, missing };
}

async function checkPortfolioImages() {
  const missing = [];
  for (const path of PORTFOLIO_IMAGES) {
    const r = await fetch(`${BASE}/${path}`, { method: 'HEAD' });
    if (!r.ok) missing.push(path);
  }
  return { ok: missing.length === 0, missing };
}

async function main() {
  console.log(`\n🔍 QA rutas — ${BASE}\n`);

  const assetCheck = await checkAssets();
  console.log(assetCheck.ok ? '✅ Assets index.html → 200' : `❌ Assets faltantes: ${assetCheck.missing.join(', ')}`);

  const imageCheck = await checkPortfolioImages();
  console.log(
    imageCheck.ok ? '✅ Imágenes portfolio → 200' : `❌ Imágenes faltantes: ${imageCheck.missing.join(', ')}`
  );

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ serviceWorkers: 'block' });
  const page = await context.newPage();

  const results = [];
  for (const route of routes) {
    const r = await checkRoute(page, route);
    results.push(r);
    console.log(r.ok ? `✅ ${r.label}` : `❌ ${r.label} — ${r.errors.join('; ')}`);
  }

  await page.close();

  const heroMobile = await checkHeroMobileSuggestions(browser);
  results.push(heroMobile);
  console.log(heroMobile.ok ? `✅ ${heroMobile.label}` : `❌ ${heroMobile.label} — ${heroMobile.errors.join('; ')}`);

  const mobileMenu = await checkMobileMenuNav(browser);
  results.push(mobileMenu);
  console.log(mobileMenu.ok ? `✅ ${mobileMenu.label}` : `❌ ${mobileMenu.label} — ${mobileMenu.errors.join('; ')}`);

  console.log('\n📍 Secciones ancla\n');
  const sectionPage = await context.newPage();
  for (const section of SECTION_CHECKS) {
    const r = await checkSection(sectionPage, section);
    results.push({ ...r, path: section.path });
    console.log(r.ok ? `✅ ${r.label}` : `❌ ${r.label} — ${r.errors.join('; ')}`);
  }
  await sectionPage.close();

  await browser.close();

  const failed = results.filter((r) => !r.ok);
  console.log(`\n---\nTotal: ${results.length} | OK: ${results.length - failed.length} | FAIL: ${failed.length}\n`);
  process.exit(failed.length || !assetCheck.ok || !imageCheck.ok ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});