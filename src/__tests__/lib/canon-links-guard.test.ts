import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Canon de links (Rö, 2026-10-01): a clientes = https://vientonorte.io/servicios/?<utm>#ancla
 * (#web-pymes, #revision-gratis, #consultoria-ux).
 *
 * Alcance (TL 2026-10-02): solo la salida a clientes: CTAs, emails, ads, sitemap y
 * structured-data/JSON-LD. Cada superficie se lista por archivo o carpeta en CLIENT_SURFACES.
 * Fuera de alcance, porque no salen a clientes: páginas internas, el ruteo, los orígenes de las
 * redirecciones (legacy-redirects.json, service-landings.json, redirect_pages.py,
 * build-static-share.py), ads-query/ (validador de Final URLs, lo cubre #283) y los tests.
 *
 * Un link prohibido solo pasa si figura en INTERNAL_ALLOWLIST (archivo + URL exacta) o en
 * INTERNAL_DOCS (documentación).
 */
const root = process.cwd();

type Category = "cta" | "email" | "ads" | "sitemap" | "structured-data";

/** Superficies que salen a clientes. Una entrada que termina en "/" es una carpeta. */
const CLIENT_SURFACES: Record<Category, string[]> = {
  cta: [
    "src/servicios/",
    "src/components/atoms/LiquidNavCta.tsx",
    "src/components/molecules/FreeA11yScheduleCta.tsx",
    "src/components/molecules/HeroAudienceCta.tsx",
    "src/components/molecules/StickyCTA.tsx",
    "src/components/organisms/ContactAssistant.tsx",
    "src/components/organisms/HomeSpecialtyPaths.tsx",
    "src/data/news-editions.json",
    "src/data/news-editions.ts",
    "src/data/linkedin-cold-demos.json",
    "scripts/share_chrome.py",
    "worker/src/api/share.js",
    "public/s/",
    "public/servicios/",
    "servicios/index.html",
  ],
  email: [
    "worker/src/lib/email-templates.js",
    "worker/src/lib/notify.js",
    "worker/src/contact.js",
    "worker/src/api/public.js",
  ],
  ads: [
    "campaigns/",
    "public/images/ads/index.html",
    "src/data/posicionapp-ia-empresas-chile.json",
  ],
  sitemap: [
    "public/sitemap.xml",
    "public/robots.txt",
    "scripts/generate-service-landings.py",
  ],
  "structured-data": [
    "index.html",
    "src/lib/structured-data.ts",
    "src/components/atoms/StructuredData.tsx",
    "src/vn-core/seo.ts",
    "src/lib/i18n/locales/es/seo.ts",
    "src/lib/i18n/locales/en/seo.ts",
  ],
};

const EXTS = [".ts", ".tsx", ".js", ".mjs", ".py", ".json", ".html", ".xml", ".txt"];
const SKIP_DIRS = new Set(["node_modules", "__tests__", "dist"]);

/** Rutas internas que el TL permite (2026-10-02). Ninguna entrada puede salir de aquí. */
const INTERNAL_ROUTES: { name: string; re: RegExp }[] = [
  { name: "News SPA", re: /^https:\/\/vientonorte\.io\/(?:#\/news(?:\/[\w-]+)?|news\/(?:[\w-]+\/)?)$/ },
  { name: "/#/demo", re: /^https:\/\/vientonorte\.io\/#\/demo\/[\w-]+$/ },
  { name: "/#/proyecto", re: /^https:\/\/vientonorte\.io\/#\/proyecto\/[\w-]+$/ },
  { name: "/#/admin", re: /^https:\/\/vientonorte\.io\/#\/admin$/ },
];

/**
 * Excepción interna, no es salida a clientes (TL 2026-10-02).
 * Cada entrada es un archivo y las URLs exactas que puede nombrar; cualquier otro link de la
 * denylist en ese mismo archivo sigue fallando.
 */
const INTERNAL_ALLOWLIST: { file: string; route: string; links: string[]; why: string }[] = [
  {
    file: "src/data/news-editions.json",
    route: "News SPA",
    links: ["https://vientonorte.io/#/news", "https://vientonorte.io/news/"],
    why: "spaIndex/aliasIndex: índice de la News SPA, no el CTA (ctaUrl va a /servicios/)",
  },
  {
    file: "src/vn-core/seo.ts",
    route: "News SPA",
    links: ["https://vientonorte.io/#/news"],
    why: "shareNewsUrl (@deprecated): enlace a la News SPA, nunca canonical ni JSON-LD",
  },
  {
    file: "src/data/linkedin-cold-demos.json",
    route: "/#/demo",
    links: [
      "https://vientonorte.io/#/demo/diagnostic",
      "https://vientonorte.io/#/demo/prototype",
      "https://vientonorte.io/#/demo/x-cms",
      "https://vientonorte.io/#/demo/process",
      "https://vientonorte.io/#/demo/app",
    ],
    why: "demos con reloj del HashRouter, sin equivalente en /servicios/",
  },
  {
    file: "worker/src/api/public.js",
    route: "/#/admin",
    links: ["https://vientonorte.io/#/admin"],
    why: "aviso de agenda que llega al inbox de VN (notifyInbox), no al cliente",
  },
];

/**
 * Excepción interna, no es salida a clientes (TL 2026-10-02): documentación y CHANGELOG
 * pueden nombrar rutas prohibidas para explicar el canon. Carpeta docs/ y archivos .md exactos.
 */
const INTERNAL_DOCS = {
  dirs: ["docs/"],
  files: [
    "CHANGELOG.md",
    "README.md",
    "CONTRIBUTING.md",
    "DEPLOY.md",
    "campaigns/2026-08-26-piloto-a11y/README.md",
  ],
};

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

function isInternalDoc(rel: string): boolean {
  return INTERNAL_DOCS.files.includes(rel) || INTERNAL_DOCS.dirs.some((d) => rel.startsWith(d) && rel.endsWith(".md"));
}

/** Quita comentarios: los comentarios no son links. */
function stripComments(rel: string, src: string): string {
  if (rel.endsWith(".py") || rel.endsWith(".txt")) return src.replace(/^\s*#.*$/gm, "");
  if (rel.endsWith(".html") || rel.endsWith(".xml")) return src.replace(/<!--[\s\S]*?-->/g, "");
  if (rel.endsWith(".json")) return src;
  return src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
}

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");

/** Borra solo las URLs exactas permitidas para ese archivo ("/news/" no tapa "/news/01/"). */
function clean(rel: string, src: string): string {
  let s = stripComments(rel, src);
  for (const entry of INTERNAL_ALLOWLIST.filter((e) => e.file === rel)) {
    for (const link of entry.links) s = s.replace(new RegExp(`${escapeRe(link)}(?![\\w/?#&=.%-])`, "g"), "(excepcion-interna)");
  }
  return s;
}

export function findForbiddenLinks(rel: string, src: string): string[] {
  if (isInternalDoc(rel)) return [];
  const text = clean(rel, src);
  const hits: string[] = [];
  text.split("\n").forEach((line, i) => {
    for (const { name, re } of FORBIDDEN) if (re.test(line)) hits.push(`${rel}:${i + 1} ${name} → ${line.trim().slice(0, 140)}`);
  });
  return hits;
}

function surfaceFiles(): { rel: string; category: Category }[] {
  const out: { rel: string; category: Category }[] = [];
  const walk = (abs: string, category: Category) => {
    if (statSync(abs).isDirectory()) {
      for (const name of readdirSync(abs)) if (!SKIP_DIRS.has(name)) walk(join(abs, name), category);
    } else if (EXTS.some((e) => abs.endsWith(e))) {
      out.push({ rel: relative(root, abs).replace(/\\/g, "/"), category });
    }
  };
  for (const [category, paths] of Object.entries(CLIENT_SURFACES) as [Category, string[]][]) {
    for (const p of paths) walk(resolve(root, p), category);
  }
  return out;
}

describe("canon de links · la salida a clientes no enlaza la denylist", () => {
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
      '"u": "https://vientonorte.io/servicios/web-dental/"',
      '"u": "https://vientonorte.io/servicios/web-contable/"',
      '"u": "https://vientonorte.io/servicios/web-juridico/"',
    ]) {
      expect(findForbiddenLinks("x.json", ok), ok).toEqual([]);
    }
    // Los comentarios no cuentan.
    expect(findForbiddenLinks("x.ts", "// antes: https://vientonorte.io/#/consultoria\nconst a = 1;")).toEqual([]);
    expect(findForbiddenLinks("x.py", "# antes /s/consultoria\nA = '/servicios/'")).toEqual([]);
  });

  it("(a) un link prohibido en un CTA, email, ad, sitemap o JSON-LD falla", () => {
    const cases: [string, string][] = [
      ["src/servicios/servicios-cta.ts", 'export const CTA = "https://vientonorte.io/#/consultoria";'],
      ["src/data/news-editions.json", '  "ctaUrl": "https://vientonorte.io/s/consultoria/?utm_source=linkedin",'],
      ["worker/src/lib/email-templates.js", "  `Agenda: https://vientonorte.io/#/contacto`,"],
      ["campaigns/2026-08-26-piloto-a11y/assets/ad-1080x1080.html", "<p>vientonorte.io/s/consultoria</p>"],
      ["public/sitemap.xml", "  <url><loc>https://vientonorte.io/news/</loc></url>"],
      ["public/sitemap.xml", "  <url><loc>https://vientonorte.io/servicios/consultoria-ux-pymes/</loc></url>"],
      [
        "index.html",
        '<script type="application/ld+json">{"@type":"Service","url":"https://vientonorte.io/#/proyecto/sura-ux-enterprise"}</script>',
      ],
      ["src/lib/structured-data.ts", '  image: "https://vientonorte.io/mi-portafolio/images/og.png",'],
      // Una ruta permitida en un archivo no sirve en otro.
      ["src/servicios/servicios-cta.ts", 'const demo = "https://vientonorte.io/#/demo/app";'],
      // Un archivo de la allowlist sigue fallando con un link que no está en su entrada.
      ["src/data/news-editions.json", '  "ctaUrl": "https://vientonorte.io/#/consultoria?utm_source=linkedin",'],
      ["src/data/news-editions.json", '  "u": "https://vientonorte.io/news/01/"'],
      ["worker/src/api/public.js", "  `Admin: https://vientonorte.io/#/admin/leads`,"],
    ];
    for (const [file, line] of cases) expect(findForbiddenLinks(file, line), `${file} · ${line}`).not.toEqual([]);
  });

  it("(b) un link prohibido en una ruta de la allowlist interna pasa", () => {
    const cases: [string, string][] = [
      ["src/data/news-editions.json", '  "spaIndex": "https://vientonorte.io/#/news",'],
      ["src/data/news-editions.json", '  "aliasIndex": "https://vientonorte.io/news/",'],
      ["src/vn-core/seo.ts", '  shareNewsUrl: "https://vientonorte.io/#/news",'],
      ["src/data/linkedin-cold-demos.json", '      "url": "https://vientonorte.io/#/demo/x-cms",'],
      ["worker/src/api/public.js", "    `Admin: https://vientonorte.io/#/admin`,"],
      ["docs/URL-CANON-VIENTONORTE.md", "Antes: https://vientonorte.io/s/consultoria/ y /#/consultoria"],
      ["CHANGELOG.md", "- /servicios/diagnostico-accesibilidad-wcag/ pasa a /servicios/#revision-gratis"],
      ["campaigns/2026-08-26-piloto-a11y/README.md", "Final URL anterior: vientonorte.io/#/consultoria"],
    ];
    for (const [file, line] of cases) expect(findForbiddenLinks(file, line), `${file} · ${line}`).toEqual([]);
  });

  it("la allowlist es acotada: cada URL es una ruta interna del TL y sigue presente en su archivo", () => {
    const surfaces = new Set(surfaceFiles().map((f) => f.rel));
    for (const { file, route, links } of INTERNAL_ALLOWLIST) {
      const internal = INTERNAL_ROUTES.find((r) => r.name === route);
      expect(internal, `${file}: ruta ${route}`).toBeDefined();
      expect(surfaces.has(file), `${file} no es una superficie escaneada`).toBe(true);
      const src = readFileSync(resolve(root, file), "utf8");
      for (const link of links) {
        expect(link, `${file}: ${link} fuera de ${route}`).toMatch(internal!.re);
        expect(src, `${file}: ${link} ya no está; quitarla de la allowlist`).toContain(link);
      }
    }
    for (const f of INTERNAL_DOCS.files) {
      expect(f.endsWith(".md"), f).toBe(true);
      expect(existsSync(resolve(root, f)), f).toBe(true);
    }
  });

  it("CTAs, emails, ads, sitemap y structured-data no traen links de la denylist", () => {
    const hits = surfaceFiles().flatMap(({ rel }) => findForbiddenLinks(rel, readFileSync(resolve(root, rel), "utf8")));
    expect(hits).toEqual([]);
  });

  it("cada categoría de salida a clientes tiene archivos y cubre sus superficies clave", () => {
    for (const paths of Object.values(CLIENT_SURFACES)) {
      for (const p of paths) expect(existsSync(resolve(root, p)), p).toBe(true);
    }
    const files = surfaceFiles();
    const byCategory = (c: Category) => files.filter((f) => f.category === c).map((f) => f.rel);
    expect(byCategory("cta")).toEqual(expect.arrayContaining(["src/servicios/servicios-cta.ts", "src/data/news-editions.json", "worker/src/api/share.js", "public/s/polijuego-privacy/index.html"]));
    expect(byCategory("email")).toEqual(expect.arrayContaining(["worker/src/lib/email-templates.js", "worker/src/contact.js"]));
    expect(byCategory("ads")).toEqual(expect.arrayContaining(["campaigns/2026-08-26-piloto-a11y/assets/ad-1080x1080.html", "public/images/ads/index.html"]));
    expect(byCategory("sitemap")).toEqual(expect.arrayContaining(["public/sitemap.xml", "scripts/generate-service-landings.py"]));
    expect(byCategory("structured-data")).toEqual(expect.arrayContaining(["index.html", "src/lib/structured-data.ts"]));
  });
});
