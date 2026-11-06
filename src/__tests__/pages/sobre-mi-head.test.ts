/**
 * /sobre-mi/ es un redirect estático a ro.vientonorte.io (#354).
 * No se prerenderiza: inyectar el SSR duplicaba title y canonical (#378).
 * El documento publicado tiene un solo <head>, un title y un canonical.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const html = readFileSync(resolve(process.cwd(), "sobre-mi/index.html"), "utf8");

describe("redirect /sobre-mi/ · un solo head", () => {
  it("el stub tiene un title, un canonical a ro y no un segundo documento", () => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const titles = [...doc.querySelectorAll("title")].filter((node) => !node.closest("svg"));
    const heads = html.match(/<head[\s>]/gi) ?? [];
    expect(heads).toHaveLength(1);
    expect(titles).toHaveLength(1);
    expect(doc.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
    expect(doc.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe(
      "https://ro.vientonorte.io/"
    );
    expect(html).not.toContain("<!--ssr-outlet-->");
    expect(html).not.toContain('href="https://vientonorte.io/sobre-mi/"');
    expect(html).toContain("https://ro.vientonorte.io/");
  });
});
