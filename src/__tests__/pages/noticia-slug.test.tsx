/**
 * /noticias/<slug>/: una página prerenderizada por edición EXISTENTE de news-editions.json.
 * Canonical propio, indexable, migas con aria-current, CTA a servicios aparte, sin #/news.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { NOTICIA_SLUGS, render, renderHead } from "@/noticia/entry-server";
import { render as renderIndex } from "@/noticias/entry-server";
import { NEWS_CATALOG, newsEditionCanonical, newsTopicLanding } from "@/data/news-editions";

const parse = (html: string) => new DOMParser().parseFromString(`<body>${html}</body>`, "text/html");

describe("/noticias/<slug>/ prerender", () => {
  it("una página por edición existente", () => {
    expect(NOTICIA_SLUGS).toEqual(NEWS_CATALOG.editions.map((e) => e.slug));
  });

  for (const e of NEWS_CATALOG.editions) {
    describe(e.slug, () => {
      const doc = parse(render(e.slug));
      it("h1 = título; cuerpo = párrafos del JSON (sin texto nuevo)", () => {
        expect(doc.querySelector("h1")?.textContent).toBe(e.title.es);
        const body = [...doc.querySelectorAll("[data-news-body] p")].map((p) => p.textContent);
        expect(body).toEqual(e.paragraphs.es);
      });
      it("migas Inicio › Noticias › edición con aria-current", () => {
        const nav = doc.querySelector('nav[aria-label="Migas de pan"]');
        expect([...nav!.querySelectorAll("a")].map((a) => [a.textContent, a.getAttribute("href")])).toEqual([
          ["Inicio", "/"],
          ["Noticias", "/noticias/"],
        ]);
        expect(nav!.querySelector('[aria-current="page"]')?.textContent).toBe(e.title.es);
      });
      it("CTA a servicios como botón aparte, sin #/news", () => {
        const cta = doc.querySelector("[data-news-cta] a");
        expect(cta?.getAttribute("href")).toBe(newsTopicLanding(e.topic)!.path);
        for (const a of doc.querySelectorAll("a")) expect(a.getAttribute("href") ?? "").not.toMatch(/#\/news/);
      });
      it("head: canonical propio e indexable", () => {
        const head = renderHead(e.slug);
        expect(head).toContain(`<link rel="canonical" href="${newsEditionCanonical(e.slug)}" />`);
        expect(newsEditionCanonical(e.slug)).toBe(`https://vientonorte.io/noticias/${e.slug}/`);
        expect(head).toContain('<meta name="robots" content="index, follow" />');
      });
    });
  }

  it("cada tarjeta de /noticias/ es un <a> a /noticias/<slug>/ con nombre accesible", () => {
    const doc = parse(renderIndex());
    for (const e of NEWS_CATALOG.editions) {
      const a = doc.querySelector(`[data-news-edition="${e.slug}"] a`);
      expect(a?.getAttribute("href")).toBe(`/noticias/${e.slug}/`);
      expect(a?.getAttribute("aria-label")).toBe(`Leer la noticia: ${e.title.es}`);
    }
  });

  it("plantilla noticia/index.html con outlets", () => {
    const html = readFileSync(resolve(process.cwd(), "noticia/index.html"), "utf8");
    for (const m of ["<!--noticia-head-->", "<!--ssr-outlet-->", 'data-slug=""']) expect(html).toContain(m);
  });
});
