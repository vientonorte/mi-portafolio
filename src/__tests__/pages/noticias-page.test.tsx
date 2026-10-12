/**
 * /noticias/ (S42 v3): página estática prerenderizada con las ediciones EXISTENTES
 * (src/data/news-editions.json), nav único (site-nav) y redirecciones desde /news/ y #/news.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { render } from "@/noticias/entry-server";
import { render as renderServicios } from "@/servicios/entry-server";
import { NEWS_CATALOG } from "@/data/news-editions";
import { buildNoticiasRedirectUrl } from "@/components/layout/NoticiasRedirect";

const root = process.cwd();
const parse = (html: string) => new DOMParser().parseFromString(`<body>${html}</body>`, "text/html");
const headerLinks = (doc: Document) =>
  [...doc.querySelectorAll(".nav-desktop-only ul a")].map((a) => [a.textContent, a.getAttribute("href")]);

afterEach(() => vi.unstubAllEnvs());

describe("/noticias/ prerender", () => {
  const doc = parse(render());

  it("lista exactamente las ediciones existentes, sin contenido nuevo", () => {
    const slugs = [...doc.querySelectorAll("[data-news-edition]")].map((el) => el.getAttribute("data-news-edition"));
    expect(slugs).toEqual(NEWS_CATALOG.editions.map((e) => e.slug));
    for (const e of NEWS_CATALOG.editions) expect(doc.body.textContent).toContain(e.title.es);
    expect(doc.querySelector("h1")?.textContent).toBe("Noticias");
  });

  it("sin /#/, sin /news/, sin placeholders", () => {
    const hrefs = [...doc.querySelectorAll("a")].map((a) => a.getAttribute("href") ?? "");
    for (const h of hrefs) {
      expect(h, h).not.toMatch(/\/#\/|^#\/|(^|\/)news(\/|$)|\/s\//);
    }
    expect(doc.querySelector("[data-placeholder]")).toBeNull();
  });

  it("mismo nav que /servicios/ (lista única de site-nav)", () => {
    const servicios = parse(renderServicios());
    expect(headerLinks(doc)).toEqual(headerLinks(servicios));
    expect(headerLinks(doc)).toEqual([
      ["Servicios", "/servicios/"],
      ["Noticias", "/noticias/"],
      ["Contacto", "/servicios/#contacto"],
    ]);
  });

  it("respeta base /qa/", () => {
    vi.stubEnv("BASE_URL", "/qa/");
    const qa = parse(render());
    expect(headerLinks(qa)).toEqual([
      ["Servicios", "/qa/servicios/"],
      ["Noticias", "/qa/noticias/"],
      ["Contacto", "/qa/servicios/#contacto"],
    ]);
  });

  it("plantilla: canonical, title, meta description, indexable y outlet", () => {
    const html = readFileSync(resolve(root, "noticias/index.html"), "utf8");
    expect(html).toContain('<link rel="canonical" href="https://vientonorte.io/noticias/" />');
    expect(html).toContain("<title>Noticias · Viento Norte</title>");
    expect(html).toMatch(/<meta\s+name="description"\s+content="[^"]{40,}"/);
    expect(html).toContain('<meta name="robots" content="index, follow" />');
    expect(html).toContain('<div id="noticias-root"><!--ssr-outlet--></div>');
  });
});

describe("redirecciones a /noticias/", () => {
  it("#/news (React, respaldo): conserva query real y de la ruta hash", () => {
    expect(buildNoticiasRedirectUrl("", "")).toBe("/noticias/");
    expect(buildNoticiasRedirectUrl("?utm_source=x", "?utm_medium=y")).toBe("/noticias/?utm_source=x&utm_medium=y");
    vi.stubEnv("BASE_URL", "/qa/");
    expect(buildNoticiasRedirectUrl("?a=1", "")).toBe("/qa/noticias/?a=1");
  });

  it("#/news en carga directa: script inline de index.html antes de montar la SPA (sin doble carga)", () => {
    const html = readFileSync(resolve(root, "index.html"), "utf8");
    const head = html.slice(0, html.indexOf('<div id="root"'));
    expect(head).toContain('location.replace("%BASE_URL%noticias/" + qs)');
    expect(head).toMatch(/\^#\\\/news/);
  });
});
