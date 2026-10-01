import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Canon de links (Rö, 2026-10-01): a clientes = https://vientonorte.io/servicios/?<utm>#ancla
 * (#web-pymes, #revision-gratis, #consultoria-ux). Este test falla si reaparece un link de la
 * denylist en una superficie que lo emite (datos, componentes, páginas, scripts que generan HTML,
 * worker, piezas de campaña, HTML de public/).
 *
 * Fuera a propósito (deben nombrar las rutas prohibidas): legacy-redirects.json y service-landings.json
 * (origen de las redirecciones), los generadores de redirecciones (redirect_pages.py,
 * build-static-share.py), el ruteo (vn-core/routes.ts, App.tsx, worker/src/lib/public-paths.js),
 * public/mi-portafolio/ (página de redirección legacy), ads-query/ (lo cubre #283) y los tests.
 */
const root = process.cwd();

const SCAN_DIRS = [
  "src/data",
  "src/components",
  "src/pages",
  "src/lib",
  "src/servicios",
  "src/vn-core",
  "scripts",
  "worker/src",
  "campaigns",
  "public",
];
const EXTS = [".ts", ".tsx", ".js", ".mjs", ".py", ".json", ".html"];
const SKIP_DIRS = new Set(["node_modules", "__tests__", "images-src", "dist"]);
const SKIP_FILES = new Set([
  "src/data/legacy-redirects.json",
  "src/data/service-landings.json",
  "scripts/redirect_pages.py",
  "scripts/build-static-share.py",
  "src/vn-core/routes.ts",
  "worker/src/lib/public-paths.js",
  "public/mi-portafolio/index.html",
]);

/**
 * Pendientes con dueño (quitar de aquí cuando se resuelvan):
 * - news-editions.json utmBase/ctaUrl: los cambia #283 (/servicios/?utm…); ctaUrl además debe
 *   terminar en #consultoria-ux tras #283 (ver descripción del PR fix/canon-links-cleanup).
 * - QaEnvBanner (/#/sobre-mi): lo arregla #291 (enlaza a /).
 * - News SPA (/#/news, /news/), demos con reloj (/#/demo/…), fichas de proyecto (/#/proyecto…) y
 *   admin (/#/admin): rutas del HashRouter sin equivalente en /servicios/; decisión de producto pendiente.
 */
const PENDING_EXACT = [
  "https://vientonorte.io/#/consultoria?utm_source=linkedin&utm_medium=organic&utm_campaign=weekly_seo",
  "https://vientonorte.io/#/consultoria?utm_source=linkedin&utm_medium=organic&utm_campaign=news_seo",
  "https://vientonorte.io/#/sobre-mi",
  "https://vientonorte.io/news/",
];
const PENDING_HASH_ROUTES = /vientonorte\.io\/#\/(?:news|demo\/|proyecto|admin)/g;

const FORBIDDEN: { name: string; re: RegExp }[] = [
  { name: "/#/consultoria", re: /\/#\/consultoria/ },
  { name: "/s/ (salvo /s/polijuego-privacy/ y /s/share.css)", re: /\/s\/(?!polijuego-privacy\/|share\.css)[a-z]/ },
  { name: "ruta hash absoluta /#/…", re: /vientonorte\.io\/#\// },
  { name: 'href="/#/…"', re: /href=["'{`]*\/#\// },
  { name: "/servicios/diagnostico-accesibilidad-wcag/", re: /\/servicios\/diagnostico-accesibilidad-wcag\// },
  { name: "/servicios/consultoria-ux-pymes/", re: /\/servicios\/consultoria-ux-pymes\// },
  { name: "vientonorte.io/news/", re: /vientonorte\.io\/news\// },
  { name: "vientonorte.io/qa/", re: /vientonorte\.io\/qa\// },
  { name: "vientonorte.io/mi-portafolio/", re: /vientonorte\.io\/mi-portafolio\// },
  { name: "vnmkt.figma.site", re: /vnmkt\.figma\.site/i },
  { name: "vientonorte.github.io/mi-portafolio/consultoria", re: /vientonorte\.github\.io\/mi-portafolio\/(?:#\/)?consultoria/i },
];

/** Quita comentarios: los comentarios no son links. */
function stripComments(rel: string, src: string): string {
  if (rel.endsWith(".py")) return src.replace(/^\s*#.*$/gm, "");
  if (rel.endsWith(".html")) return src.replace(/<!--[\s\S]*?-->/g, "");
  if (rel.endsWith(".json")) return src;
  return src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
}

function clean(rel: string, src: string): string {
  let s = stripComments(rel, src);
  // Valor completo entre comillas: "https://vientonorte.io/news/" no tapa "https://vientonorte.io/news/01/".
  for (const p of PENDING_EXACT) s = s.split(`"${p}"`).join('""');
  return s.replace(PENDING_HASH_ROUTES, "vientonorte.io/(pendiente)");
}

function surfaceFiles(): string[] {
  const out: string[] = [];
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      if (SKIP_DIRS.has(name)) continue;
      const abs = join(dir, name);
      if (statSync(abs).isDirectory()) walk(abs);
      else if (EXTS.some((e) => name.endsWith(e))) {
        const rel = relative(root, abs).replace(/\\/g, "/");
        if (!SKIP_FILES.has(rel)) out.push(rel);
      }
    }
  };
  for (const d of SCAN_DIRS) walk(resolve(root, d));
  return out;
}

export function findForbiddenLinks(rel: string, src: string): string[] {
  const text = clean(rel, src);
  const hits: string[] = [];
  text.split("\n").forEach((line, i) => {
    for (const { name, re } of FORBIDDEN) if (re.test(line)) hits.push(`${rel}:${i + 1} ${name} → ${line.trim().slice(0, 140)}`);
  });
  return hits;
}

describe("canon de links · ninguna superficie enlaza la denylist", () => {
  it("el escáner detecta cada ruta prohibida y deja pasar el canon", () => {
    for (const bad of [
      '<a href="/#/consultoria">x</a>',
      'href: "https://vientonorte.io/#/consultoria",',
      '"url": "/s/consultoria/"',
      '<a href="/s/proceso/">Proceso</a>',
      '<a href="/#/proceso">Proceso</a>',
      'dest: "https://vientonorte.io/#/contacto"',
      '"path": "/servicios/diagnostico-accesibilidad-wcag/"',
      '"path": "/servicios/consultoria-ux-pymes/"',
      'image: "https://vientonorte.io/mi-portafolio/images/x.png"',
      '"u": "https://vientonorte.io/news/01/"',
      '"u": "https://vientonorte.io/qa/servicios/"',
      '"u": "https://vnmkt.figma.site/"',
      '"u": "http://vientonorte.github.io/mi-portafolio/#/consultoria"',
    ]) {
      expect(findForbiddenLinks("x.json", bad), bad).not.toEqual([]);
    }
    for (const ok of [
      '"url": "https://vientonorte.io/servicios/?utm_source=google&utm_medium=cpc#revision-gratis"',
      '<a href="/servicios/#consultoria-ux">Consultoría</a>',
      '<a href="/s/polijuego-privacy/">Privacidad</a>',
      '<link rel="stylesheet" href="/s/share.css" />',
      '"u": "https://vientonorte.io/servicios/#web-pymes"',
    ]) {
      expect(findForbiddenLinks("x.json", ok), ok).toEqual([]);
    }
    // Los comentarios no cuentan.
    expect(findForbiddenLinks("x.ts", "// antes: https://vientonorte.io/#/consultoria\nconst a = 1;")).toEqual([]);
    expect(findForbiddenLinks("x.py", "# antes /s/consultoria\nA = '/servicios/'")).toEqual([]);
  });

  it("datos, componentes, scripts, worker, campañas y public/ no traen links de la denylist", () => {
    const hits = surfaceFiles().flatMap((rel) => findForbiddenLinks(rel, readFileSync(resolve(root, rel), "utf8")));
    expect(hits).toEqual([]);
  });

  it("las superficies listadas en el pedido de Rö (2026-10-01) están cubiertas por el escáner", () => {
    const files = surfaceFiles();
    for (const f of [
      "scripts/generate-service-landings.py",
      "scripts/share_chrome.py",
      "src/data/admin-roadmap.ts",
      "src/data/posicionapp-ia-empresas-chile.json",
      "campaigns/2026-08-26-piloto-a11y/assets/ad-1080x1080.html",
      "public/s/polijuego-privacy/index.html",
      "src/data/news-editions.json",
      "worker/src/api/share.js",
    ]) {
      expect(files, f).toContain(f);
    }
  });
});
