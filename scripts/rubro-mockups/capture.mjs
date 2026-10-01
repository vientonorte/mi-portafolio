#!/usr/bin/env node
/* global process, console, Buffer, document, Image */
/**
 * Capturas de mockups por rubro (regla PO 2026-09-27).
 *
 * El mockup de cada landing /servicios/<slug>/ muestra SOLO un dispositivo con el
 * sitio del cliente ficticio (nada de Viento Norte, ofertas, cifras, precios ni
 * testimonios). El rótulo «Ejemplo» va fuera del dispositivo (caption de la página).
 *
 * Fuente: scripts/rubro-mockups/<site>/index.html (sitio estático ficticio).
 * Salida: public/images/rubros/<slug>/{desktop,mobile,card}.{png,webp}
 *   - desktop: 1280×800 (viewport, sin marco; el marco lo pone <DeviceFrame>)
 *   - mobile:  390×844
 *   - card (og:image): 1200×630, composición solo-dispositivos sin titular ni marca.
 *
 * Uso:  node scripts/rubro-mockups/capture.mjs <slug> [<slug> …]   (slugs de src/data/rubros.json)
 *       node scripts/rubro-mockups/capture.mjs --all
 * Requiere Chromium de Playwright (npx playwright install chromium).
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../..");

/** slug de rubros.json → carpeta del sitio ficticio en scripts/rubro-mockups/. */
export const RUBRO_SITES = {
  "web-dental": "dental-brisa",
};

export const SHOTS = {
  desktop: { width: 1280, height: 800 },
  mobile: { width: 390, height: 844 },
  card: { width: 1200, height: 630 },
};

const WEBP_QUALITY = 0.9;

/** Codifica un PNG a WebP con el propio Chromium (canvas.toDataURL), sin dependencias extra. */
async function pngToWebp(page, png) {
  const dataUrl = await page.evaluate(
    async ({ b64, q }) => {
      const img = new Image();
      img.src = `data:image/png;base64,${b64}`;
      await img.decode();
      const c = document.createElement("canvas");
      c.width = img.naturalWidth;
      c.height = img.naturalHeight;
      c.getContext("2d").drawImage(img, 0, 0);
      return c.toDataURL("image/webp", q);
    },
    { b64: png.toString("base64"), q: WEBP_QUALITY }
  );
  if (!dataUrl.startsWith("data:image/webp")) throw new Error("Chromium no pudo codificar WebP");
  return Buffer.from(dataUrl.split(",")[1], "base64");
}

/** og:image: escritorio + celular sobre fondo neutro. Sin texto, sin marca del estudio. */
function cardHtml(desktopB64, mobileB64) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
  html,body{margin:0;width:1200px;height:630px;overflow:hidden}
  body{background:linear-gradient(135deg,#eef3f4 0%,#dfe8ea 100%);position:relative}
  .desk{position:absolute;left:90px;top:62px;width:820px;border-radius:14px;overflow:hidden;
    background:#262626;border:1px solid #3a3a3a;box-shadow:0 30px 70px rgba(15,30,35,.28)}
  .bar{height:30px;display:flex;align-items:center;gap:7px;padding:0 14px}
  .bar i{width:10px;height:10px;border-radius:50%;background:#737373;display:block}
  .bar b{margin-left:12px;flex:1;height:12px;border-radius:4px;background:#404040;display:block}
  .desk img{display:block;width:100%}
  .phone{position:absolute;right:120px;bottom:34px;width:238px;border:9px solid #262626;border-radius:38px;
    background:#262626;box-shadow:0 30px 60px rgba(15,30,35,.32)}
  .phone .scr{border-radius:30px;overflow:hidden}
  .phone img{display:block;width:100%}
  .notch{position:absolute;left:50%;top:4px;width:56px;height:6px;margin-left:-28px;border-radius:6px;background:#404040;z-index:1}
  </style></head><body>
  <div class="desk"><div class="bar"><i></i><i></i><i></i><b></b></div><img src="data:image/png;base64,${desktopB64}"></div>
  <div class="phone"><span class="notch"></span><div class="scr"><img src="data:image/png;base64,${mobileB64}"></div></div>
  </body></html>`;
}

export async function captureRubro(browser, slug) {
  const site = RUBRO_SITES[slug];
  if (!site) throw new Error(`Sin sitio ficticio para "${slug}". Agrégalo a RUBRO_SITES.`);
  const src = join(here, site, "index.html");
  if (!existsSync(src)) throw new Error(`No existe ${src}`);
  const outDir = join(root, "public/images/rubros", slug);
  mkdirSync(outDir, { recursive: true });

  const pngs = {};
  for (const kind of ["desktop", "mobile"]) {
    const ctx = await browser.newContext({
      viewport: SHOTS[kind],
      deviceScaleFactor: 1,
      isMobile: kind === "mobile",
      hasTouch: kind === "mobile",
      reducedMotion: "reduce",
    });
    const page = await ctx.newPage();
    // Sin red: el sitio ficticio es 100% local.
    await page.route(/^(?!file:|data:)/, (r) => r.abort());
    await page.goto(pathToFileURL(src).href, { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    pngs[kind] = await page.screenshot({ type: "png", fullPage: false });
    await ctx.close();
  }

  const ctx = await browser.newContext({ viewport: SHOTS.card, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.setContent(cardHtml(pngs.desktop.toString("base64"), pngs.mobile.toString("base64")), {
    waitUntil: "load",
  });
  pngs.card = await page.screenshot({ type: "png", fullPage: false });

  const written = [];
  for (const [kind, png] of Object.entries(pngs)) {
    writeFileSync(join(outDir, `${kind}.png`), png);
    writeFileSync(join(outDir, `${kind}.webp`), await pngToWebp(page, png));
    written.push(`${kind}.png`, `${kind}.webp`);
  }
  await ctx.close();
  return { outDir, written };
}

/**
 * Navegador: PLAYWRIGHT_CHANNEL si está definido; si no, el Chromium de Playwright
 * y, como respaldo, el Chrome del sistema (channel "chrome").
 */
async function launch() {
  if (process.env.PLAYWRIGHT_CHANNEL) return chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL });
  let lastError;
  for (const opts of [{}, { channel: "chromium" }, { channel: "chrome" }]) {
    try {
      return await chromium.launch(opts);
    } catch (e) {
      lastError = e;
    }
  }
  throw lastError;
}

async function main(argv) {
  const all = argv.includes("--all");
  const rubros = JSON.parse(readFileSync(join(root, "src/data/rubros.json"), "utf8")).rubros;
  const slugs = all ? Object.keys(rubros) : argv.filter((a) => !a.startsWith("--"));
  if (!slugs.length) {
    console.error("Uso: node scripts/rubro-mockups/capture.mjs <slug…> | --all");
    process.exit(2);
  }
  for (const s of slugs) if (!rubros[s]) throw new Error(`"${s}" no está en src/data/rubros.json`);
  const browser = await launch();
  try {
    for (const slug of slugs) {
      const { outDir, written } = await captureRubro(browser, slug);
      console.log(`${slug} → ${outDir.replace(`${root}/`, "")}: ${written.join(", ")}`);
    }
  } finally {
    await browser.close();
  }
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  main(process.argv.slice(2)).catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
