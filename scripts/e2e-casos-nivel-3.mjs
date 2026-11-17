#!/usr/bin/env node
/**
 * E2E del piloto /casos/mobiliario-edu/ sobre el build local. Nunca contra producción.
 *
 *   node scripts/e2e-casos-nivel-3.mjs [baseUrl]
 *
 * Home → caso → pieza, lightbox con teclado, y /#/proyecto/<id> → URL limpia.
 */
import { chromium } from "playwright";

const BASE = (process.argv[2] || "http://127.0.0.1:4173").replace(/\/$/, "");
const failures = [];
const fail = (message) => {
  failures.push(message);
  console.error(`✗ ${message}`);
};

const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  const home = await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
  if (home?.status() !== 200) fail(`home → ${home?.status()}`);

  const caseLink = page.locator('a[href$="/casos/mobiliario-edu/"]').first();
  await caseLink.click();
  await page.waitForURL(/\/casos\/mobiliario-edu\/$/);
  if ((await page.locator("h1").first().textContent())?.trim() !== "Pyme de mobiliario educacional") {
    fail(`h1 del caso: ${await page.locator("h1").first().textContent()}`);
  }

  const pieceLink = page.locator('a[href$="/casos/mobiliario-edu/pitch-ventas/"]');
  const [pieceRes] = await Promise.all([
    page.waitForNavigation({ waitUntil: "domcontentloaded" }),
    pieceLink.click(),
  ]);
  if (pieceRes?.status() !== 200) fail(`pieza → ${pieceRes?.status()}`);
  const h1 = (await page.locator("h1").first().textContent())?.trim();
  if (h1 !== "Pitch de ventas y simulación") fail(`h1 de la pieza: ${h1}`);
  const slides = await page.locator("[data-slide]").count();
  if (slides < 3 || slides > 5) fail(`láminas ${slides}`);
  const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
  if (canonical !== "https://vientonorte.io/casos/mobiliario-edu/pitch-ventas/") fail(`canonical ${canonical}`);
  if ((await page.locator("body").innerText()).match(/edu[ _-]?21/i)) fail("el nombre del cliente aparece en la pieza");

  const trigger = page.locator("[data-slide] button").first();
  await trigger.focus();
  await page.keyboard.press("Enter");
  const dialog = page.locator('[role="dialog"]');
  await dialog.waitFor({ state: "visible" });
  const before = (await dialog.innerText()).slice(0, 80);
  await page.keyboard.press("ArrowRight");
  const after = (await dialog.innerText()).slice(0, 80);
  if (before === after) fail("la flecha derecha no cambió la lámina");
  await page.keyboard.press("Escape");
  if (await dialog.isVisible().catch(() => false)) fail("Escape no cerró el lightbox");
  const focused = await page.evaluate(() => document.activeElement?.getAttribute("data-slide-open") !== null && document.activeElement?.tagName === "BUTTON");
  if (!focused) fail("el foco no volvió al disparador");

  await page.locator('a', { hasText: "Volver al caso" }).first().click();
  await page.waitForURL(/\/casos\/mobiliario-edu\/$/);

  await page.goto(`${BASE}/#/proyecto/mobiliario-edu`, { waitUntil: "domcontentloaded" });
  await page.waitForURL(/\/casos\/mobiliario-edu\/$/, { timeout: 8000 });
  if (!page.url().endsWith("/casos/mobiliario-edu/")) fail(`hash → ${page.url()}`);
  else console.log("✓ home → caso → pieza · lightbox · hash");
} finally {
  await browser.close();
}

if (failures.length) {
  console.error(`\n${failures.length} fallo(s)`);
  process.exit(1);
}
console.log("\ne2e /casos/mobiliario-edu/ OK");
