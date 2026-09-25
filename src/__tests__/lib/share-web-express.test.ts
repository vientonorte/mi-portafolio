import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const html = readFileSync(resolve(root, "public/s/web-express/index.html"), "utf8");
const sitemap = readFileSync(resolve(root, "public/sitemap.xml"), "utf8");

/** /s/web-express · «Web profesional en 72h» 30.000 CLP (estático, crawlable). */
describe("share /s/web-express", () => {
  it("has one H1, canonical /s/ HTTP (no hash) and OG", () => {
    expect(html.match(/<h1[\s>]/g)?.length).toBe(1);
    expect(html).toContain("Tu web profesional en 72h por $30.000");
    expect(html).toContain('rel="canonical" href="https://vientonorte.io/s/web-express/"');
    expect(html).toContain('property="og:url" content="https://vientonorte.io/s/web-express/"');
    expect(html).not.toContain('href="https://vientonorte.io/#/');
    expect(html).toContain("GTM-PM5LBQRP");
  });

  it("JSON-LD Service + Offer 30000 CLP", () => {
    const m = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    expect(m).toBeTruthy();
    const ld = JSON.parse(m![1]);
    expect(ld["@type"]).toBe("Service");
    expect(ld.offers["@type"]).toBe("Offer");
    expect(ld.offers.price).toBe("30000");
    expect(ld.offers.priceCurrency).toBe("CLP");
  });

  it("states offer scope and 50/50 payment", () => {
    for (const s of ["1 ronda de cambios", "72h hábiles", "Responsive", "Dominio y hosting", "Tienda online", "$15.000"]) {
      expect(html).toContain(s);
    }
  });

  it("keeps payment/WhatsApp placeholders explicit (no invented phone)", () => {
    expect(html).toContain('MP_LINK_ANTICIPO = "TODO_MP_LINK"');
    expect(html).toContain('VN_WHATSAPP = "TODO_WHATSAPP"');
    expect(html).not.toMatch(/wa\.me\/\d/);
    expect(html).toContain('data-we-cta="mp"');
    expect(html).toContain('data-we-cta="whatsapp"');
  });

  it("examples are labeled as Ejemplo, no testimonials", () => {
    expect(html.match(/Ejemplo · /g)?.length).toBe(3);
    expect(html).not.toContain("<blockquote");
    expect(html).not.toMatch(/\+\s?\d+\s+clientes/i);
  });

  it("is listed in sitemap", () => {
    expect(sitemap).toContain("<loc>https://vientonorte.io/s/web-express/</loc>");
  });
});
