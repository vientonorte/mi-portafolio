#!/usr/bin/env node
// QA móvil /sobre-mi/ — WebKit 390x844: imágenes visibles (naturalWidth>0, opacity≠0),
// sin overflow horizontal y el inicio de la página no queda bajo la barra fija.
// Uso: node scripts/qa-sobre-mi-mobile.mjs http://127.0.0.1:4173 [dir-capturas]
import { mkdirSync } from "node:fs";
import { webkit } from "playwright";

const base = (process.argv[2] || "http://127.0.0.1:4173").replace(/\/$/, "");
const shots = process.argv[3];
const browser = await webkit.launch();
const page = await (await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true })).newPage();
await page.goto(`${base}/sobre-mi/`, { waitUntil: "networkidle" });
const errors = [];

const height = await page.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y <= height; y += 500) {
  await page.evaluate((v) => window.scrollTo(0, v), y);
  await page.waitForTimeout(80);
}
await page.waitForLoadState("networkidle");
await page.waitForTimeout(800);

const r = await page.evaluate(() => {
  const imgs = [...document.querySelectorAll("img")].map((i) => ({
    src: i.getAttribute("src"),
    nw: i.naturalWidth,
    op: Number(getComputedStyle(i).opacity),
    shown: i.getBoundingClientRect().width > 0,
  }));
  // Cada fila del Trayecto: el primer hijo es la caja del logo (img o ícono fallback).
  const boxes = [...document.querySelectorAll("#experiencia button[id*='-dot-']")]
    .map((b) => b.firstElementChild)
    .filter(Boolean);
  const rows = boxes.length;
  const logos = boxes.filter((b) => b.querySelector("img, svg")).length;
  return { sw: document.documentElement.scrollWidth, iw: window.innerWidth, imgs, logos, rows };
});

if (r.sw > r.iw) errors.push(`overflow horizontal: scrollWidth ${r.sw} > innerWidth ${r.iw}`);
const shown = r.imgs.filter((i) => i.shown);
if (shown.length < 10) errors.push(`solo ${shown.length} imágenes en la página`);
for (const i of shown) {
  if (i.nw === 0) errors.push(`imagen sin cargar: ${i.src}`);
  if (i.op === 0) errors.push(`imagen invisible (opacity 0): ${i.src}`);
}
if (r.rows > 0 && r.logos < r.rows) errors.push(`Trayecto: ${r.logos}/${r.rows} cajas de logo con imagen o ícono (las demás quedan vacías)`);

await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(300);
const overlap = await page.evaluate(() => {
  const nav = document.querySelector(".process-nav-mobile");
  const first = document.querySelector("#sobre-mi");
  if (!nav || !first) return null;
  return { navBottom: nav.getBoundingClientRect().bottom, firstTop: first.getBoundingClientRect().top };
});
if (overlap && overlap.firstTop < overlap.navBottom - 1)
  errors.push(`la barra de secciones tapa el inicio (#sobre-mi top ${overlap.firstTop} < nav ${overlap.navBottom})`);

if (shots) {
  mkdirSync(shots, { recursive: true });
  await page.screenshot({ path: `${shots}/sobre-mi-390-top.png` });
  for (const id of ["experiencia", "evidencia-vn"]) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await page.screenshot({ path: `${shots}/sobre-mi-390-${id}.png` });
  }
}
await browser.close();
console.log(`/sobre-mi/ móvil: ${shown.length} imágenes, ${r.logos}/${r.rows} logos, scrollWidth ${r.sw}/${r.iw}`);
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
