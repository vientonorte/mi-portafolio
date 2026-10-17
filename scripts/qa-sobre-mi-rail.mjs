#!/usr/bin/env node
/* global console, process */
// QA /sobre-mi/ — el rail fijo de secciones (ProcessNavigation .process-nav-rail) no tapa contenido.
// 1024: el rail no se ve (solo desde xl). 1280 / 1440 / 1680: se recorre la página con scroll y
// ningún texto, imagen, svg, botón, enlace o campo visible (fuera de capas position:fixed) cruza
// la caja del rail. Uso: node scripts/qa-sobre-mi-rail.mjs http://127.0.0.1:4173 [dir-capturas]
import { mkdirSync } from "node:fs";
import { chromium } from "playwright";

const base = (process.argv[2] || "http://127.0.0.1:4173").replace(/\/$/, "");
const shots = process.argv[3];
if (shots) mkdirSync(shots, { recursive: true });
const browser = await chromium.launch();
const failures = [];
const summary = [];

for (const width of [1024, 1280, 1440, 1680]) {
  const page = await (await browser.newContext({ viewport: { width, height: 900 } })).newPage();
  await page.goto(`${base}/sobre-mi/`, { waitUntil: "networkidle" });
  const railVisible = await page.evaluate(() => {
    const r = document.querySelector(".process-nav-rail");
    return !!r && getComputedStyle(r).display !== "none" && r.getBoundingClientRect().width > 0;
  });
  if (width < 1280) {
    if (railVisible) failures.push(`${width}px: el rail se ve (debe aparecer solo desde 1280px)`);
    summary.push(`${width}px rail oculto: ${!railVisible}`);
    continue;
  }
  if (!railVisible) { failures.push(`${width}px: el rail no se ve`); continue; }
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  let positions = 0, hitPositions = 0, hits = 0;
  for (let y = 0; y < height; y += 450) {
    await page.evaluate((v) => window.scrollTo(0, v), y);
    await page.waitForTimeout(120);
    positions++;
    const found = await page.evaluate(() => {
      const rail = document.querySelector(".process-nav-rail").getBoundingClientRect();
      const vw = window.innerWidth, vh = window.innerHeight;
      const isFixedLayer = (el) => {
        for (let e = el; e && e !== document.body; e = e.parentElement) {
          const cs = getComputedStyle(e);
          if (cs.position === "fixed") return true;
        }
        return false;
      };
      const hidden = (el) => {
        for (let e = el; e && e !== document.body; e = e.parentElement) {
          const cs = getComputedStyle(e);
          if (cs.visibility === "hidden" || cs.display === "none" || Number(cs.opacity) === 0) return true;
        }
        return false;
      };
      const crosses = (r) =>
        r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < vh && r.right > 0 && r.left < vw &&
        r.left < rail.right && r.right > rail.left && r.top < rail.bottom && r.bottom > rail.top;
      const out = [];
      const seen = new Set();
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      for (let n = walker.nextNode(); n; n = walker.nextNode()) {
        if (!n.textContent.trim()) continue;
        const el = n.parentElement;
        if (!el || seen.has(el) || isFixedLayer(el) || hidden(el) || el.closest(".sr-only")) continue;
        const range = document.createRange(); range.selectNodeContents(n);
        if ([...range.getClientRects()].some(crosses)) { seen.add(el); out.push(`texto «${n.textContent.trim().slice(0, 40)}»`); }
      }
      for (const el of document.querySelectorAll("img, svg, button, a, input, select, textarea, video, iframe")) {
        if (seen.has(el) || isFixedLayer(el) || hidden(el) || el.closest(".sr-only")) continue;
        if (crosses(el.getBoundingClientRect())) { seen.add(el); out.push(`${el.tagName.toLowerCase()} ${(el.getAttribute("alt") || el.textContent || "").trim().slice(0, 40)}`); }
      }
      return out;
    });
    if (found.length) {
      hitPositions++; hits += found.length;
      failures.push(`${width}px y=${y}: ${found.length} elementos bajo el rail → ${found.slice(0, 5).join(" · ")}`);
      if (shots) await page.screenshot({ path: `${shots}/rail-${width}-y${y}.png` });
    }
  }
  summary.push(`${width}px: ${hitPositions}/${positions} posiciones con solape, ${hits} elementos`);
  if (shots && !hitPositions) {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: `${shots}/rail-${width}-top.png` });
  }
}
await browser.close();
for (const s of summary) console.log(s);
if (failures.length) {
  console.error(`❌ rail de secciones tapa contenido en /sobre-mi/ (${failures.length}):`);
  for (const f of failures.slice(0, 40)) console.error(`  - ${f}`);
  process.exit(1);
}
console.log("✅ /sobre-mi/: el rail no tapa contenido (1280/1440/1680) y está oculto a 1024");
