/**
 * Hallazgo: https://vientonorte.io/contacto/ no es una página.
 * Pages responde 404 con la copia de la home (title y canonical del apex).
 * Rojo hasta que /contacto/ sea una entrada Vite con identidad propia.
 */
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { canonicalFromPath } from "@/vn-core/seo";

const root = process.cwd();

describe("hallazgo-contacto-404", () => {
  it("contacto/index.html es entrada Vite con title y canonical propios", () => {
    const htmlPath = resolve(root, "contacto/index.html");
    expect(existsSync(htmlPath), "falta contacto/index.html").toBe(true);
    const html = readFileSync(htmlPath, "utf8");
    expect(html).toContain("<title>Contacto · Viento Norte</title>");
    expect(html).toContain(
      '<link rel="canonical" href="https://vientonorte.io/contacto/" />'
    );
    expect(html).not.toContain(
      '<link rel="canonical" href="https://vientonorte.io/" />'
    );
    const vite = readFileSync(resolve(root, "vite.config.ts"), "utf8");
    expect(vite).toContain("contacto/index.html");
    const home = readFileSync(resolve(root, "index.html"), "utf8");
    expect(home).toContain('basePath + "contacto/"');
    const sitemap = readFileSync(resolve(root, "public/sitemap.xml"), "utf8");
    expect(sitemap).toContain("<loc>https://vientonorte.io/contacto/</loc>");
  });

  it("canonicalFromPath de /contacto es la ficha HTTP, no la home", () => {
    expect(canonicalFromPath("/contacto")).toBe("https://vientonorte.io/contacto/");
    expect(canonicalFromPath("/contacto/")).toBe("https://vientonorte.io/contacto/");
  });
});
