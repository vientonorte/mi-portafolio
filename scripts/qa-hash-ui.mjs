#!/usr/bin/env node
/**
 * QA UI HashRouter — canon humano. Nunca /s/.
 * Uso:
 *   node scripts/qa-hash-ui.mjs
 *   node scripts/qa-hash-ui.mjs http://localhost:3000 https://vientonorte.io
 */
import { chromium } from "playwright";

const DEFAULT_BASES = ["http://localhost:3000", "https://vientonorte.io"];
const BASES = (process.argv.slice(2).length ? process.argv.slice(2) : DEFAULT_BASES).map((b) =>
  b.replace(/\/$/, "")
);

const PATHS = ["/", "/consultoria", "/proceso", "/design-system"];

const EXPECT = {
  "/": {
    h1Needle: "Tecnología para empresas",
  },
  "/consultoria": {
    h1Needle: "Tecnología para empresas",
    funnel: true,
  },
  "/proceso": {
    h1Needle: "Diseño que reduce el ruido",
  },
  "/design-system": {
    h1Needle: "Sistema de diseño",
    token: true,
  },
};

function hashUrl(base, path) {
  const clean = path === "/" ? "/" : path;
  return `${base}/#${clean}`;
}

async function chromeText(page) {
  return page.evaluate(() => {
    const bits = [];
    const header = document.querySelector('header[role="banner"]');
    if (header) bits.push(header.innerText);
    document.querySelectorAll("nav").forEach((n) => bits.push(n.innerText));
    const dock = document.querySelector('[class*="bottom-nav"], [class*="nav-dock"]');
    if (dock) bits.push(dock.innerText);
    return bits.join("\n");
  });
}

async function checkPage(page, base, path) {
  const url = hashUrl(base, path);
  const errors = [];
  const spec = EXPECT[path];
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForSelector("#main", { state: "attached", timeout: 25000 });
    await page.waitForFunction((needle) => {
      const h1s = [...document.querySelectorAll("h1")].filter((el) => !el.closest("#lcp-shell"));
      return h1s.some((el) => (el.textContent || "").replace(/\s+/g, " ").includes(needle));
    }, spec.h1Needle, { timeout: 25000 });

    const href = page.url();
    if (!href.includes("/#") || href.includes("/s/")) {
      errors.push(`no es HashRouter: ${href}`);
    }
    if (path !== "/" && !href.includes(`#${path}`)) {
      errors.push(`hash esperado #${path}, got ${href}`);
    }

    const h1 = await page.evaluate((needle) => {
      const h1s = [...document.querySelectorAll("h1")].filter((el) => !el.closest("#lcp-shell"));
      const hit = h1s.find((el) => (el.textContent || "").replace(/\s+/g, " ").includes(needle));
      return (hit?.textContent || h1s[0]?.textContent || "").replace(/\s+/g, " ").trim();
    }, spec.h1Needle);
    if (!h1) errors.push("sin H1");
    else if (!h1.includes(spec.h1Needle)) errors.push(`H1="${h1}"`);

    const chrome = await chromeText(page);
    if (/auditor[ií]a/i.test(chrome)) errors.push("nav chrome contiene Auditoría");

    if (spec.funnel) {
      const funnel = await page.locator('[data-testid="consultoria-funnel"]').count();
      if (!funnel) errors.push("falta consultoria-funnel");
    }

    if (spec.token) {
      const tokenHit = await page.evaluate(() => {
        const cs = getComputedStyle(document.documentElement);
        const red = cs.getPropertyValue("--brand-red").trim();
        const body = document.body?.innerText || "";
        return red.toLowerCase().includes("e8401c") || /--brand-red|#E8401C/i.test(body);
      });
      if (!tokenHit) errors.push("tokens --brand-red no visibles");
    }

    return { url, ok: errors.length === 0, h1, errors };
  } catch (err) {
    return { url, ok: false, h1: "", errors: [err.message.split("\n")[0]] };
  }
}

async function baseReachable(base) {
  try {
    const r = await fetch(base, { method: "GET", signal: AbortSignal.timeout(4000) });
    return r.ok;
  } catch {
    return false;
  }
}

async function main() {
  console.log("QA HashRouter UI · nunca /s/\n");
  let browser;
  try {
    browser = await chromium.launch({
      headless: true,
      channel: process.env.PW_CHANNEL || "chrome",
    });
  } catch {
    browser = await chromium.launch({ headless: true });
  }
  const results = [];

  for (const base of BASES) {
    const up = await baseReachable(base);
    if (!up) {
      console.log(`SKIP ${base} (no responde)`);
      results.push({ url: base, ok: true, skipped: true, errors: ["unreachable"] });
      continue;
    }
    const ctx = await browser.newContext({ serviceWorkers: "block" });
    const page = await ctx.newPage();
    for (const path of PATHS) {
      const r = await checkPage(page, base, path);
      results.push(r);
      const mark = r.ok ? "PASS" : "FAIL";
      console.log(`${mark}  ${r.url}${r.h1 ? `  H1=${r.h1}` : ""}${r.errors.length ? `  — ${r.errors.join("; ")}` : ""}`);
    }
    await ctx.close();
  }

  await browser.close();
  const ran = results.filter((r) => !r.skipped);
  const failed = ran.filter((r) => !r.ok);
  console.log(`\n---\nran=${ran.length} pass=${ran.length - failed.length} fail=${failed.length} skip=${results.length - ran.length}`);
  process.exit(failed.length ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
