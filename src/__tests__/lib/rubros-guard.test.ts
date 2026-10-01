import { execFileSync, spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";
import redirects from "../../data/legacy-redirects.json";
import rubrosFile from "../../data/rubros.json";
// @ts-expect-error — módulo .mjs sin tipos (script de build)
import {
  assertRubroLinksResolve,
  assertRubroPathsFree,
  findRubroRefs,
  injectRubro,
  readRubroSlugs,
} from "../../../scripts/prerender-servicios.mjs";

/**
 * P4: /servicios/<slug>/ de src/data/rubros.json es de Vite (prerender). Ni
 * generate-service-landings.py ni build-static-share.py pueden escribir esas rutas.
 */
const root = process.cwd();
const rubroPaths = Object.keys(rubrosFile.rubros).map((s) => `/servicios/${s}/`);

/** Copia mínima del repo (scripts + datos + public/) para correr los generadores sin tocar el árbol real. */
function sandbox(): string {
  const dir = mkdtempSync(join(tmpdir(), "vn-rubros-guard-"));
  mkdirSync(join(dir, "scripts"), { recursive: true });
  for (const f of ["generate-service-landings.py", "build-static-share.py", "redirect_pages.py", "share_chrome.py"]) {
    if (existsSync(resolve(root, "scripts", f))) cpSync(resolve(root, "scripts", f), join(dir, "scripts", f));
  }
  cpSync(resolve(root, "src/data"), join(dir, "src/data"), { recursive: true });
  cpSync(resolve(root, "public"), join(dir, "public"), {
    recursive: true,
    filter: (src) => !src.includes(`${join("public", "images")}`),
  });
  return dir;
}

const py = (dir: string, script: string) =>
  spawnSync("python3", [join(dir, "scripts", script)], { cwd: dir, encoding: "utf8" });

describe("rubros · guardas de rutas", () => {
  it("no rubro path is registered as a legacy redirect, and none exists in public/", () => {
    const froms = new Set(redirects.redirects.map((r) => r.from));
    for (const p of rubroPaths) {
      expect(froms.has(p), p).toBe(false);
      expect(existsSync(resolve(root, "public", p.slice(1), "index.html")), p).toBe(false);
    }
    expect(() => assertRubroPathsFree(root, readRubroSlugs(root))).not.toThrow();
  });

  it("both Python generators run clean and never write public/servicios/<rubro>/", () => {
    const dir = sandbox();
    try {
      for (const script of ["generate-service-landings.py", "build-static-share.py"]) {
        const res = py(dir, script);
        expect(res.status, `${script}: ${res.stderr}`).toBe(0);
      }
      for (const p of rubroPaths) expect(existsSync(join(dir, "public", p.slice(1))), p).toBe(false);
      // Sitemap regenerado: incluye el rubro, sin /s/ ni '#'
      const sm = readFileSync(join(dir, "public/sitemap.xml"), "utf8");
      for (const p of rubroPaths) expect(sm).toContain(`<loc>https://vientonorte.io${p}</loc>`);
      expect(sm).not.toContain("/s/");
      expect(sm).not.toContain("#");
      // Y es idéntico al versionado
      expect(sm).toBe(readFileSync(resolve(root, "public/sitemap.xml"), "utf8"));
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("generators fail if someone adds a rubro path to legacy-redirects.json", () => {
    const dir = sandbox();
    try {
      const file = join(dir, "src/data/legacy-redirects.json");
      const data = JSON.parse(readFileSync(file, "utf8"));
      data.redirects.push({ from: rubroPaths[0], to: "/servicios/", anchor: "" });
      writeFileSync(file, JSON.stringify(data));
      for (const script of ["generate-service-landings.py", "build-static-share.py"]) {
        const res = py(dir, script);
        expect(res.status, script).not.toBe(0);
        expect(res.stderr + res.stdout).toMatch(/rubro|Vite/);
      }
      expect(existsSync(join(dir, "public", rubroPaths[0].slice(1), "index.html"))).toBe(false);
      expect(() => assertRubroPathsFree(dir, readRubroSlugs(dir))).toThrow(/legacy-redirects/);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("redirect_pages.write_redirect refuses every Vite-owned path", () => {
    const dir = sandbox();
    try {
      const code = [
        "import sys, pathlib",
        "sys.path.insert(0, 'scripts')",
        "from redirect_pages import write_redirect, vite_owned_paths",
        "root = pathlib.Path('.')",
        "bad = []",
        "for p in sorted(vite_owned_paths(root)):",
        "    try:",
        "        write_redirect(root, p, '/servicios/')",
        "        bad.append(p)",
        "    except SystemExit:",
        "        pass",
        "print(','.join(sorted(vite_owned_paths(root))))",
        "print('OK' if not bad else 'WROTE ' + ','.join(bad))",
      ].join("\n");
      const out = execFileSync("python3", ["-c", code], { cwd: dir, encoding: "utf8" }).trim().split("\n");
      expect(out[0].split(",")).toEqual(["/servicios/", ...rubroPaths].sort());
      expect(out[1]).toBe("OK");
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("prerender refuses a public/servicios/<rubro>/ page", () => {
    const dir = mkdtempSync(join(tmpdir(), "vn-rubros-pub-"));
    try {
      cpSync(resolve(root, "src/data"), join(dir, "src/data"), { recursive: true });
      mkdirSync(join(dir, "public", rubroPaths[0].slice(1)), { recursive: true });
      writeFileSync(join(dir, "public", rubroPaths[0].slice(1), "index.html"), "<html></html>");
      expect(() => assertRubroPathsFree(dir, readRubroSlugs(dir))).toThrow(/pisaría/);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});

describe("rubros · injectRubro (prerender)", () => {
  const template =
    '<html><head>\n<!--rubro-head-->\n</head><body><div id="rubro-root" data-slug=""><!--ssr-outlet--></div></body></html>';

  it("injects head, slug and app HTML exactly once", () => {
    const out = injectRubro(template, { slug: "web-dental", head: "<title>T</title>", app: "<main>x</main>" });
    expect(out).toContain("<title>T</title>");
    expect(out).toContain('data-slug="web-dental"><main>x</main></div>');
    expect(out).not.toContain("<!--rubro-head-->");
    expect(out).not.toContain("<!--ssr-outlet-->");
  });

  it("fails loudly if the template lost a marker", () => {
    expect(() =>
      injectRubro(template.replace("<!--rubro-head-->", ""), { slug: "web-dental", head: "", app: "" })
    ).toThrow(/rubro-head/);
  });

  it("the Vite template keeps its markers", () => {
    const tpl = readFileSync(resolve(root, "rubros/index.html"), "utf8");
    for (const m of ["<!--rubro-head-->", "<!--ssr-outlet-->", 'data-slug=""']) expect(tpl).toContain(m);
    expect(tpl).not.toContain('rel="canonical"');
  });
});

/** Archivos de texto del repo que pueden enlazar o listar rubros (sin tests, sin build, sin binarios). */
function sourceFiles(): string[] {
  const exts = [".ts", ".tsx", ".js", ".mjs", ".py", ".json", ".html", ".xml", ".txt", ".md", ".css"];
  const skip = new Set(["node_modules", "dist", "__tests__", "images", ".git", "V2"]);
  const out: string[] = [];
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      if (skip.has(name)) continue;
      const abs = join(dir, name);
      if (statSync(abs).isDirectory()) walk(abs);
      else if (exts.some((e) => name.endsWith(e))) out.push(abs);
    }
  };
  for (const d of ["src", "public", "scripts", "servicios", "rubros"]) if (existsSync(resolve(root, d))) walk(resolve(root, d));
  for (const f of ["index.html", "vite.config.ts"]) out.push(resolve(root, f));
  return out;
}

describe("rubros · solo se enlaza lo que existe", () => {
  const slugs = Object.keys(rubrosFile.rubros);

  it("findRubroRefs detecta /servicios/web-<slug>/ con y sin base", () => {
    expect(findRubroRefs('<a href="/servicios/web-dental/">x</a> <a href="/qa/servicios/web-contable/#oferta">')).toEqual([
      "web-contable",
      "web-dental",
    ]);
    expect(findRubroRefs("<loc>https://vientonorte.io/servicios/web-juridico/</loc>")).toEqual(["web-juridico"]);
    expect(findRubroRefs('<a href="/servicios/">hub</a> /servicios/asistente-ia/')).toEqual([]);
  });

  it("ninguna fuente (cards, nav, sitemap, datos, scripts) nombra un rubro que no está en rubros.json", () => {
    const orphans: string[] = [];
    for (const f of sourceFiles()) {
      const text = readFileSync(f, "utf8");
      for (const slug of findRubroRefs(text)) if (!slugs.includes(slug)) orphans.push(`${f}: ${slug}`);
      for (const m of text.matchAll(/\bweb-(contable|juridico|jur\u00eddico)\b/g)) orphans.push(`${f}: ${m[0]}`);
    }
    expect(orphans).toEqual([]);
  });

  it("public/sitemap.xml solo lista rubros con entrada en rubros.json, y los mockups son de rubros existentes", () => {
    const sm = readFileSync(resolve(root, "public/sitemap.xml"), "utf8");
    for (const slug of findRubroRefs(sm)) expect(slugs, slug).toContain(slug);
    for (const dir of readdirSync(resolve(root, "public/images/rubros"))) expect(slugs, dir).toContain(dir);
  });

  it("assertRubroLinksResolve: el build falla si una página o el sitemap enlaza un rubro sin página generada", () => {
    const dir = mkdtempSync(join(tmpdir(), "vn-rubros-links-"));
    try {
      mkdirSync(join(dir, "servicios/web-dental"), { recursive: true });
      writeFileSync(join(dir, "servicios/web-dental/index.html"), "<html></html>");
      writeFileSync(join(dir, "servicios/index.html"), '<a href="/qa/servicios/web-dental/">Dental</a>');
      writeFileSync(join(dir, "sitemap.xml"), "<loc>https://vientonorte.io/servicios/web-dental/</loc>");
      expect(() => assertRubroLinksResolve(dir, ["web-dental"])).not.toThrow();

      writeFileSync(join(dir, "servicios/index.html"), '<a href="/servicios/web-contable/">Contable</a>');
      expect(() => assertRubroLinksResolve(dir, ["web-dental"])).toThrow(/servicios\/index\.html → \/servicios\/web-contable\//);

      writeFileSync(join(dir, "servicios/index.html"), "<p></p>");
      writeFileSync(join(dir, "sitemap.xml"), "<loc>https://vientonorte.io/servicios/web-juridico/</loc>");
      expect(() => assertRubroLinksResolve(dir, ["web-dental"])).toThrow(/sitemap\.xml → \/servicios\/web-juridico\//);

      // En rubros.json pero sin página en el build: también falla.
      writeFileSync(join(dir, "sitemap.xml"), "<loc>https://vientonorte.io/servicios/web-dental/</loc>");
      rmSync(join(dir, "servicios/web-dental"), { recursive: true });
      expect(() => assertRubroLinksResolve(dir, ["web-dental"])).toThrow(/web-dental/);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it.runIf(existsSync(resolve(root, "dist/servicios/index.html")))("el build actual (dist/) no enlaza rubros sin página", () => {
    expect(() => assertRubroLinksResolve(resolve(root, "dist"), slugs)).not.toThrow();
  });
});
