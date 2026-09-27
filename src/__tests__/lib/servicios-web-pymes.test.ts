import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { SERVICE_LANDINGS } from "@/data/service-landings";

/** /servicios/web-pymes/ · oferta «Web en 72 h» (contenido de /s/web-express/, PR #272). */
const root = process.cwd();
const html = readFileSync(resolve(root, "public/servicios/web-pymes/index.html"), "utf8");
const sitemap = readFileSync(resolve(root, "public/sitemap.xml"), "utf8");
const text = html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ");

describe("servicios/web-pymes", () => {
  it("is generated from the registry with self canonical and one H1", () => {
    const item = SERVICE_LANDINGS.find((l) => l.id === "web-pymes");
    expect(item?.path).toBe("/servicios/web-pymes/");
    expect(item?.form?.source).toBe("web-pymes");
    expect(html.match(/<h1[\s>]/g)?.length).toBe(1);
    expect(html).toContain('<h1 id="page-h1">Tu web profesional en 72 h por $30.000</h1>');
    expect(html).toContain('rel="canonical" href="https://vientonorte.io/servicios/web-pymes/"');
    expect(sitemap).toContain("<loc>https://vientonorte.io/servicios/web-pymes/</loc>");
    // Ficha nueva: no crea URL /s/.
    expect(existsSync(resolve(root, "public/s/servicios/web-pymes"))).toBe(false);
  });

  it("JSON-LD Service + Offer 30000 CLP", () => {
    const m = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    const ld = JSON.parse(m![1]);
    expect(ld["@type"]).toBe("Service");
    expect(ld.offers).toMatchObject({ "@type": "Offer", price: "30000", priceCurrency: "CLP" });
  });

  it("matches the offer: 72 h, $30.000, 50/50, includes/excludes, 4 steps, 3 examples, FAQ", () => {
    for (const s of [
      "$30.000",
      "72 h hábiles",
      "50% al partir, 50% al entregar",
      "$15.000",
      "1 ronda de cambios",
      "Responsive",
      "Dominio y hosting",
      "Tienda online",
      "Más páginas.",
    ]) {
      expect(text).toContain(s);
    }
    const steps = html.slice(html.indexOf('class="share-steps"'), html.indexOf("</ol>", html.indexOf('class="share-steps"')));
    expect(steps.match(/<li>/g)?.length).toBe(4);
    expect(html.match(/Ejemplo · /g)?.length).toBe(3);
    expect(html.match(/class="share-faq"/g)?.length).toBeGreaterThanOrEqual(4);
  });

  it("payment is coordinated after first contact; no buy button, MP or WhatsApp", () => {
    expect(text).toContain("El pago se coordina después del primer contacto.");
    expect(html).not.toMatch(/mercado ?pago|MP_LINK|Pagar anticipo/i);
    expect(html).not.toMatch(/whatsapp|wa\.me/i);
    expect(html).not.toContain("TODO");
  });

  it("form preselects Web nueva with source web-pymes", () => {
    expect(html).toContain('data-source="web-pymes"');
    expect(html).toContain('<option value="Web nueva" selected>');
  });

  it("nav links to/from the other servicios pages (relative)", () => {
    expect(html).toContain('href="../consultoria-ux-pymes/"');
    expect(html).toContain('href="../diagnostico-accesibilidad-wcag/"');
    for (const slug of ["consultoria-ux-pymes", "diagnostico-accesibilidad-wcag"]) {
      const other = readFileSync(resolve(root, `public/servicios/${slug}/index.html`), "utf8");
      expect(other).toContain('<a href="../web-pymes/">Web pymes</a>');
    }
  });
});
