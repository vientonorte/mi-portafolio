#!/usr/bin/env node
/**
 * Sitemap en build time (fix/sitemap-build-time). Corre después de `vite build`:
 * recorre dist/**\/index.html, aplica la política de src/data/sitemap-canon.json
 * (indexable, sin meta refresh, canonical propio, fuera de deny/outsideSitemap — misma
 * lógica que src/lib/sitemap-canon.ts) y escribe dist/sitemap.xml.
 * lastmod = `git log -1 --format=%cs` de los archivos fuente de cada ruta (el más reciente).
 * Requiere historia completa (CI: actions/checkout fetch-depth: 0); con checkout shallow falla.
 * `--public` además copia el resultado a public/sitemap.xml (copia versionada que leen los tests
 * estáticos y sitemap-live.yml).
 */
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

function rootDir() {
  try {
    return resolve(fileURLToPath(new URL("..", import.meta.url)));
  } catch {
    return process.cwd(); // vitest (jsdom) no expone import.meta.url como file:
  }
}
const ROOT = rootDir();
const CANON = JSON.parse(readFileSync(join(ROOT, "src/data/sitemap-canon.json"), "utf8"));
const ORIGIN = CANON.origin;

export function routeFromIndexHtml(rel) {
  const dir = rel.replace(/\\/g, "/").replace(/(^|\/)index\.html$/, "");
  return dir ? `/${dir}/` : "/";
}

export function isDeniedPath(path) {
  if (CANON.denyExceptions.some((ex) => path === ex || path.startsWith(ex))) return false;
  if (path.includes("#")) return true;
  return CANON.deny.some((d) => path === d || path.startsWith(d));
}

function meta(html, name) {
  for (const tag of html.match(/<meta\b[^>]*>/gi) ?? []) {
    const n = tag.match(/\b(?:name|http-equiv)\s*=\s*"([^"]*)"/i)?.[1];
    if (n?.toLowerCase() === name) return tag.match(/\bcontent\s*=\s*"([^"]*)"/i)?.[1] ?? "";
  }
  return null;
}
function canonical(html) {
  for (const tag of html.match(/<link\b[^>]*>/gi) ?? []) {
    if (/\brel\s*=\s*"canonical"/i.test(tag)) return tag.match(/\bhref\s*=\s*"([^"]*)"/i)?.[1] ?? null;
  }
  return null;
}
export function isPublicPage(route, html) {
  const robots = meta(html, "robots");
  if (robots && /\bnoindex\b|\bnone\b/i.test(robots)) return false;
  if (meta(html, "refresh") !== null) return false;
  const c = canonical(html);
  return c === null || c === ORIGIN + route;
}

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const abs = join(dir, name);
    if (statSync(abs).isDirectory()) walk(abs, out);
    else if (name === "index.html") out.push(abs);
  }
  return out;
}

export function publicRoutes(distDir = join(ROOT, "dist")) {
  return [
    ...new Set(
      walk(distDir)
        .map((abs) => ({ route: routeFromIndexHtml(relative(distDir, abs)), html: readFileSync(abs, "utf8") }))
        .filter((p) => !p.route.startsWith("/qa/"))
        .filter((p) => !isDeniedPath(p.route) && !CANON.outsideSitemap.includes(p.route))
        .filter((p) => isPublicPage(p.route, p.html))
        .map((p) => p.route)
    ),
  ].sort();
}

const RUBROS = Object.keys(JSON.parse(readFileSync(join(ROOT, "src/data/rubros.json"), "utf8")).rubros);

/** Archivos fuente cuyo último commit define el lastmod de cada ruta. */
export function sourcesFor(route) {
  if (route === "/") return ["index.html", "src/pages/Home.tsx"];
  if (route === "/servicios/")
    return ["servicios/index.html", "src/servicios", "src/data/service-landings.json", "scripts/prerender-servicios.mjs"];
  if (route === "/noticias/") return ["noticias/index.html", "src/noticias", "src/components/news", "src/data/news-editions.json"];
  const rubro = route.match(/^\/servicios\/([^/]+)\/$/)?.[1];
  if (rubro && RUBROS.includes(rubro))
    return ["rubros/index.html", "src/rubros", "src/data/rubros.json", `public/images/rubros/${rubro}`];
  const pub = `public${route}index.html`;
  if (existsSync(join(ROOT, pub))) return [pub];
  throw new Error(`sitemap: sin fuente conocida para ${route} (agrégala en scripts/generate-sitemap.mjs#sourcesFor)`);
}

export function lastmodFor(route) {
  const paths = sourcesFor(route).filter((p) => existsSync(join(ROOT, p)));
  if (!paths.length) throw new Error(`sitemap: ninguna fuente existe para ${route}`);
  const shallow = execFileSync("git", ["rev-parse", "--is-shallow-repository"], { cwd: ROOT, encoding: "utf8" }).trim();
  if (shallow === "true") throw new Error("sitemap: checkout shallow; lastmod requiere fetch-depth: 0");
  const d = execFileSync("git", ["log", "-1", "--format=%cs", "--", ...paths], { cwd: ROOT, encoding: "utf8" }).trim();
  if (!d) throw new Error(`sitemap: sin commits para ${route} (${paths.join(", ")})`);
  return d;
}

function priority(route) {
  if (route === "/") return "1.0";
  if (route === "/servicios/") return "0.9";
  if (route.startsWith("/servicios/")) return "0.8";
  if (route === "/noticias/") return "0.6";
  return "0.5";
}

export function buildSitemap(distDir = join(ROOT, "dist")) {
  const blocks = publicRoutes(distDir).map(
    (r) =>
      `  <url>\n    <loc>${ORIGIN}${r}</loc>\n    <lastmod>${lastmodFor(r)}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priority(r)}</priority>\n  </url>`
  );
  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    "  <!-- Generado en build por scripts/generate-sitemap.mjs desde dist/**/index.html públicos; lastmod = último commit de las fuentes. -->\n" +
    blocks.join("\n") +
    "\n</urlset>\n"
  );
}

if (process.argv[1]?.endsWith("generate-sitemap.mjs")) {
  const xml = buildSitemap();
  writeFileSync(join(ROOT, "dist/sitemap.xml"), xml);
  console.log("[sitemap] dist/sitemap.xml");
  if (process.argv.includes("--public")) {
    writeFileSync(join(ROOT, "public/sitemap.xml"), xml);
    console.log("[sitemap] public/sitemap.xml");
  }
}
