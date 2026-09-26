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
  });

  it("funnel: one primary CTA (hero|sticky|final) → form fallback; MP only in step 3", () => {
    const primary = html.match(/class="vn-btn vn-btn--primary"[^>]*>([^<]+)</g) ?? [];
    expect(primary.length).toBe(3);
    for (const b of primary) expect(b).toContain("Quiero mi web en 72h");
    for (const loc of ["hero", "sticky", "final"]) {
      expect(html).toContain(`data-we-cta="${loc}"`);
    }
    const hero = html.slice(html.indexOf('class="offer-hero"'), html.indexOf('id="we-recibes"'));
    expect(hero).not.toContain("data-we-mp");
    const steps = html.slice(html.indexOf('id="como-funciona"'), html.indexOf('id="we-no-incluye"'));
    expect(steps).toContain("data-we-mp");
    expect(html.match(/data-we-mp /g)?.length).toBe(1);
    expect(html).toContain('id="formulario"');
    expect(html).toContain('id="we-form"');
  });

  it("section order by objection", () => {
    const order = ["we-title", "we-recibes", "we-ejemplos", "we-pasos", "we-no-incluye", "we-faq", "we-cta-final"];
    const idx = order.map((id) => html.indexOf(`id="${id}"`));
    expect(idx.every((i) => i > 0)).toBe(true);
    expect([...idx].sort((a, b) => a - b)).toEqual(idx);
  });

  it("tracks funnel events", () => {
    for (const e of ["web_express_cta_click", "web_express_form_submit", "web_express_mp_click"]) {
      expect(html).toContain(e);
    }
  });

  it("form posts to existing contact relay (no new backend)", () => {
    expect(html).toContain("https://contact.vientonorte.io/api/contact");
    expect(html).toContain('name="_gotcha"');
    expect(html).toContain('name="consent"');
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
