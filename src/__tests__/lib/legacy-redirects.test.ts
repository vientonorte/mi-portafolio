import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { describe, expect, it } from "vitest";
import redirects from "../../data/legacy-redirects.json";
import { SERVICIOS_CARDS } from "../../servicios/servicios-content";

/**
 * Canon 2026-09-27: todo /s/** (salvo /s/polijuego-privacy/) y /poc/ son páginas de
 * redirección a /servicios/ (o al ancla de la tarjeta). Relativas → sirven en / y en /qa/.
 */
const root = process.cwd();
const KEEP = "/s/polijuego-privacy/";

function walkHtml(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walkHtml(p));
    else if (name.endsWith(".html")) out.push(p);
  }
  return out;
}

function urlPathOf(file: string): string {
  // public/s/consultoria/index.html -> /s/consultoria/
  return "/" + relative(resolve(root, "public"), file).replace(/index\.html$/, "");
}

function readPage(fromPath: string): string {
  return readFileSync(resolve(root, "public", fromPath.slice(1), "index.html"), "utf8");
}

/** Ejecuta el <script> inline de la página con un window falso y devuelve la URL final. */
function runRedirect(html: string, pageUrl: string): string {
  const m = html.match(/<script>([\s\S]*?)<\/script>/);
  if (!m) throw new Error("sin script inline");
  const u = new URL(pageUrl);
  let replaced: string | null = null;
  const fakeWindow = {
    location: {
      search: u.search,
      hash: u.hash,
      replace: (to: string) => {
        replaced = to;
      },
    },
  };
  new Function("window", m[1])(fakeWindow);
  if (replaced === null) throw new Error("no llamó location.replace");
  return new URL(replaced, pageUrl).href;
}

const cardIds = new Set(SERVICIOS_CARDS.map((c) => c.id));
const shareFiles = walkHtml(resolve(root, "public/s"));
const redirectPaths = shareFiles.map(urlPathOf).filter((p) => p !== KEEP);

describe("legacy redirects registry", () => {
  it("covers every /s/** page except polijuego-privacy, plus /poc/", () => {
    const registered = new Set(redirects.redirects.map((r) => r.from));
    expect(redirectPaths.length).toBeGreaterThanOrEqual(13);
    for (const p of redirectPaths) expect(registered.has(p), p).toBe(true);
    expect(registered.has("/poc/")).toBe(true);
    expect(registered.has(KEEP)).toBe(false);
    expect(redirects.keep).toEqual([KEEP]);
  });

  it("targets /servicios/ and anchors are real card ids of /servicios/", () => {
    for (const r of redirects.redirects) {
      expect(r.to, r.from).toBe("/servicios/");
      if (r.anchor) expect(cardIds.has(r.anchor), `${r.from} #${r.anchor}`).toBe(true);
    }
    const byFrom = Object.fromEntries(redirects.redirects.map((r) => [r.from, r]));
    expect(byFrom["/s/consultoria/"].anchor).toBe("consultoria-ux");
    expect(byFrom["/s/web-express/"].anchor).toBe("web-pymes");
    expect(byFrom["/s/"].anchor).toBe("");
    expect(byFrom["/poc/"].anchor).toBe("");
  });
});

describe("every /s/** (except polijuego-privacy) and /poc/ is a redirect page", () => {
  const all = [...redirectPaths, "/poc/"];

  it.each(all)("%s: meta refresh 0 + canonical + noindex + JS replace", (from) => {
    const html = readPage(from);
    const r = redirects.redirects.find((x) => x.from === from)!;
    const depth = from.split("/").filter(Boolean).length;
    const rel = "../".repeat(depth) + "servicios/" + (r.anchor ? `#${r.anchor}` : "");
    expect(html).toContain(`<meta http-equiv="refresh" content="0;url=${rel}" />`);
    expect(html).toContain('<link rel="canonical" href="https://vientonorte.io/servicios/" />');
    expect(html).toContain('<meta name="robots" content="noindex, follow" />');
    expect(html).toContain("window.location.replace(");
    expect(html).toContain("window.location.search");
    expect(html).toContain("window.location.hash");
    // sin URLs absolutas en el destino (relative-safe para /qa/), sin /#/, sin GTM
    expect(html).not.toMatch(/url=https?:/);
    expect(html).not.toContain("/#/");
    expect(html).not.toContain("GTM-");
    expect(html).not.toMatch(/<link rel="canonical" href="[^"]*#/);
  });

  it.each(all)("%s: preserves search + hash (UTMs) under / and /qa/", (from) => {
    const html = readPage(from);
    const r = redirects.redirects.find((x) => x.from === from)!;
    const anchor = r.anchor ? `#${r.anchor}` : "";
    for (const base of ["https://vientonorte.io", "https://vientonorte.io/qa"]) {
      const qs = "?utm_source=google&utm_medium=cpc&utm_campaign=a11y_gratis_pymes";
      expect(runRedirect(html, `${base}${from}${qs}`)).toBe(
        `${base}/servicios/${qs}${anchor}`
      );
      expect(runRedirect(html, `${base}${from}${qs}#formulario`)).toBe(
        `${base}/servicios/${qs}#formulario`
      );
      expect(runRedirect(html, `${base}${from}`)).toBe(`${base}/servicios/${anchor}`);
    }
  });
});

describe("/s/polijuego-privacy/ stays published (not a redirect)", () => {
  it("has no refresh/replace and keeps its self canonical", () => {
    const html = readPage(KEEP);
    expect(html).not.toContain('http-equiv="refresh"');
    expect(html).not.toContain("location.replace(");
    expect(html).not.toContain("noindex");
    expect(html).toContain('rel="canonical" href="https://vientonorte.io/s/polijuego-privacy/"');
  });
});
