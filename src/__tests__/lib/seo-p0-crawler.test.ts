import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import es from "../../lib/i18n/locales/es";
import en from "../../lib/i18n/locales/en";

const root = process.cwd();
const indexHtml = readFileSync(resolve(root, "index.html"), "utf8");
const polijuegoPrivacy = readFileSync(
  resolve(root, "public/s/polijuego-privacy/index.html"),
  "utf8"
);
const sitemap = readFileSync(resolve(root, "public/sitemap.xml"), "utf8");

describe("SEO P0 · title home vs query", () => {
  it("home title leads with Tecnología para empresas and stays ≤60", () => {
    expect(es.seo.pages.home.title).toBe(
      "Tecnología para empresas · Viento Norte"
    );
    expect(en.seo.pages.home.title).toBe(
      "Technology for business · Viento Norte"
    );
    expect(es.seo.pages.home.title.length).toBeLessThanOrEqual(60);
    expect(en.seo.pages.home.title.length).toBeLessThanOrEqual(60);
    expect(indexHtml).toContain(
      "<title>Tecnología para empresas · Viento Norte</title>"
    );
    expect(indexHtml).toContain('data-vn-route');
    expect(indexHtml).toContain('html[data-vn-route="inner"] #lcp-shell');
  });
});

describe("SEO P0 · /s/polijuego-privacy (única página /s/ publicada, fuera del sitemap)", () => {
  it("polijuego privacy is static, crawlable, and not FO /#/privacy", () => {
    expect(polijuegoPrivacy).toMatch(/<h1>\s*Privacidad · R\.A\.D\.A\.R\. El Polijuego\s*<\/h1>/);
    expect(polijuegoPrivacy).toContain("no account");
    expect(polijuegoPrivacy).toContain("no network for game content");
    expect(polijuegoPrivacy).toContain("AES-256-GCM vault on device");
    expect(polijuegoPrivacy).toContain("Keychain/Keystore ThisDeviceOnly");
    expect(polijuegoPrivacy).toContain("export JSON only on user action");
    expect(polijuegoPrivacy).toContain("purge rotates key and deletes file");
    expect(polijuegoPrivacy).toContain("no ads/analytics");
    expect(polijuegoPrivacy).toContain("Cero red de contenido");
    expect(polijuegoPrivacy).toContain(
      'rel="canonical" href="https://vientonorte.io/s/polijuego-privacy/"'
    );
    expect(polijuegoPrivacy).not.toContain("GTM-PM5LBQRP");
    expect(polijuegoPrivacy).not.toContain("gtag.js");
    expect(polijuegoPrivacy).not.toContain("/#/privacy");
    expect(polijuegoPrivacy).not.toContain("http-equiv=\"refresh\"");
    expect(polijuegoPrivacy).not.toMatch(/<form[\s>]/i);
    expect(polijuegoPrivacy).not.toContain("noIndex");
    expect(polijuegoPrivacy).not.toContain("Ley 21.719");
  });

  it("keeps VN chrome: skip-link, banner, principal nav, main#main, footer", () => {
    for (const s of [
      'href="/s/share.css"',
      'class="skip-link" href="#main"',
      "Ir al contenido principal",
      'role="banner"',
      'aria-label="Principal"',
      'id="main"',
      "<footer",
      'aria-label="Miga de pan"',
    ]) {
      expect(polijuegoPrivacy).toContain(s);
    }
    expect(polijuegoPrivacy).not.toContain('href="/s/news/"');
  });
});

describe("SEO P0 · sitemap HTTP only (canon 2026-09-27)", () => {
  it("lists only home + /servicios/: no /s/, no hash, no fichas", () => {
    const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    expect(locs).toEqual([
      "https://vientonorte.io/",
      "https://vientonorte.io/servicios/",
    ]);
    expect(sitemap).not.toContain("/s/");
    expect(sitemap).not.toContain("#");
    expect(sitemap).not.toContain("/news");
    expect(sitemap).not.toContain("/admin");
    expect(sitemap).not.toContain("finanzas.vientonorte.io");
    expect(sitemap).not.toMatch(/<lastmod>2026-08-/);
  });
});

describe("SEO P0 · legacy HTTP redirects (GSC)", () => {
  const legacyPortfolio = readFileSync(
    resolve(root, "public/mi-portafolio/index.html"),
    "utf8"
  );
  const legacyPoc = readFileSync(resolve(root, "public/poc/index.html"), "utf8");

  it(" /mi-portafolio refreshes to apex HTTP, not hash", () => {
    expect(legacyPortfolio).toContain('http-equiv="refresh"');
    expect(legacyPortfolio).toContain('content="0;url=https://vientonorte.io/"');
    expect(legacyPortfolio).toContain('name="robots" content="noindex, follow"');
    expect(legacyPortfolio).not.toContain('id="root"');
    expect(legacyPortfolio).not.toContain("/#/");
  });


  it("/poc refreshes straight to /servicios/ (no /s/consultoria/ hop, no hash)", () => {
    expect(legacyPoc).toContain('http-equiv="refresh"');
    expect(legacyPoc).toContain('content="0;url=../servicios/"');
    expect(legacyPoc).toContain('rel="canonical" href="https://vientonorte.io/servicios/"');
    expect(legacyPoc).toContain('name="robots" content="noindex, follow"');
    expect(legacyPoc).not.toContain('id="root"');
    expect(legacyPoc).not.toContain("/s/consultoria");
    expect(legacyPoc).not.toContain("/#/");
  });

  it("SPA fallback hops /poc to /servicios/ (HTTP), not /s/ nor hash", () => {
    expect(indexHtml).toContain('location.origin + "/servicios/"');
    expect(indexHtml).not.toContain('location.origin + "/s/consultoria/"');
    expect(indexHtml).not.toContain('location.origin + "/#/consultoria"');
  });
});

describe("SEO P0 · /s/news purged", () => {
  it("does not ship public/s/news or public/news crawler HTML", () => {
    expect(existsSync(resolve(root, "public/s/news"))).toBe(false);
    expect(existsSync(resolve(root, "public/news"))).toBe(false);
    expect(existsSync(resolve(root, "public/images/news"))).toBe(false);
  });
});
