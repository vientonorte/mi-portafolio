import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import es from "../../lib/i18n/locales/es";
import en from "../../lib/i18n/locales/en";

const root = process.cwd();
const indexHtml = readFileSync(resolve(root, "index.html"), "utf8");
const shareHome = readFileSync(resolve(root, "public/s/index.html"), "utf8");
const shareConsultoria = readFileSync(
  resolve(root, "public/s/consultoria/index.html"),
  "utf8"
);
const shareProceso = readFileSync(
  resolve(root, "public/s/proceso/index.html"),
  "utf8"
);
const polijuegoPrivacy = readFileSync(
  resolve(root, "public/s/polijuego-privacy/index.html"),
  "utf8"
);
const sitemap = readFileSync(resolve(root, "public/sitemap.xml"), "utf8");

const PATHS = ["Diagnóstico", "Prototipo", "Proceso de equipo"];

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

describe("SEO P0 · crawler HTML /s/", () => {
  it("share home has H1, three paths, and query in title/description", () => {
    expect(shareHome).toMatch(/<h1>\s*Tecnología para empresas\s*<\/h1>/);
    for (const name of PATHS) {
      expect(shareHome).toContain(name);
    }
    expect(shareHome).toContain(
      "<title>Tecnología para empresas · Viento Norte</title>"
    );
    expect(shareHome).toContain('name="description"');
    expect(shareHome).toMatch(/Tecnología para empresas:/);
    expect(shareHome).toContain('rel="canonical" href="https://vientonorte.io/"');
    expect(shareHome).toContain('content="5;url=https://vientonorte.io/"');
  });

  it("share consultoria has H1, three paths, query, and no hash canonical", () => {
    expect(shareConsultoria).toMatch(/<h1>\s*Tecnología para empresas\s*<\/h1>/);
    for (const name of PATHS) {
      expect(shareConsultoria).toContain(name);
    }
    expect(shareConsultoria).toMatch(/Tecnología para empresas:/);
    expect(shareConsultoria).toContain(
      'rel="canonical" href="https://vientonorte.io/s/consultoria/"'
    );
    expect(shareConsultoria).not.toContain(
      'rel="canonical" href="https://vientonorte.io/#/consultoria"'
    );
    expect(shareConsultoria).toContain(
      'content="5;url=https://vientonorte.io/#/consultoria"'
    );
  });

  it("share proceso has method H1, five phases, /s/canonical, hop to hash", () => {
    expect(shareProceso).toMatch(/<h1>\s*Diseño que reduce el ruido\s*<\/h1>/);
    for (const phase of [
      "UX Analytics",
      "UX Research",
      "UX/UI Design",
      "UX Testing",
      "Refinamiento",
    ]) {
      expect(shareProceso).toContain(phase);
    }
    expect(shareProceso).toContain("Jira");
    expect(shareProceso).toContain("SharePoint");
    expect(shareProceso).toContain("no es un quinto pack paid");
    expect(shareProceso).toContain(
      'rel="canonical" href="https://vientonorte.io/s/proceso/"'
    );
    expect(shareProceso).not.toContain(
      'rel="canonical" href="https://vientonorte.io/#/proceso"'
    );
    expect(shareProceso).toContain(
      'content="5;url=https://vientonorte.io/#/proceso"'
    );
    expect(shareProceso).toContain("og-proceso-1200.png");
    expect(shareProceso).toContain("GTM-PM5LBQRP");
    expect(shareProceso).not.toContain("gtag.js");
    expect(shareProceso).not.toMatch(/Radar/i);
    expect(shareProceso).not.toContain("/auditoria");
  });

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
});

describe("SEO P0 · sitemap HTTP only", () => {
  it("lists / /s/ /s/consultoria/ and no hash locs", () => {
    expect(sitemap).toContain("<loc>https://vientonorte.io/</loc>");
    expect(sitemap).toContain("<loc>https://vientonorte.io/s/</loc>");
    expect(sitemap).toContain(
      "<loc>https://vientonorte.io/s/consultoria/</loc>"
    );
    expect(sitemap).toContain(
      "<loc>https://vientonorte.io/s/polijuego-privacy/</loc>"
    );
    expect(sitemap).toContain("<loc>https://vientonorte.io/s/proceso/</loc>");
    expect(sitemap).not.toMatch(/<loc>https:\/\/vientonorte\.io\/#\//);
    expect(sitemap).not.toContain("/admin");
    expect(sitemap).not.toContain("finanzas.vientonorte.io");
  });
});
