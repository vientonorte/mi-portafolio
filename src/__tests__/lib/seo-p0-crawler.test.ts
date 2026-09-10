import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
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
    expect(shareHome).not.toContain("http-equiv=\"refresh\"");
    expect(shareHome).not.toContain("location.replace(");
    expect(shareHome).toContain("GTM-PM5LBQRP");
    expect(shareHome).toContain("googletagmanager.com/gtm.js?id=");
    expect(shareHome).not.toContain("gtag/js?id=");
  });

  it("share consultoria has H1, three paths, query, and no hash canonical", () => {
    expect(shareConsultoria).toMatch(/<h1>\s*Tecnología para empresas\s*<\/h1>/);
    for (const name of PATHS) {
      expect(shareConsultoria).toContain(name);
    }
    expect(shareConsultoria).toMatch(/Tecnología para empresas:/);
    expect(shareConsultoria).toContain("el flujo que usa tu cliente");
    expect(shareConsultoria).toContain("operaciones digitales");
    expect(shareConsultoria).toContain("CMS o CRM");
    expect(shareConsultoria).toContain(
      'rel="canonical" href="https://vientonorte.io/s/consultoria/"'
    );
    expect(shareConsultoria).not.toContain(
      'rel="canonical" href="https://vientonorte.io/#/consultoria"'
    );
    expect(shareConsultoria).not.toContain("http-equiv=\"refresh\"");
    expect(shareConsultoria).not.toContain("location.replace(");
  });

  it("share proceso has method H1, five phases, /s/canonical, no hash hop", () => {
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
    expect(shareProceso).toMatch(/no es un quinto pack paid/i);
    expect(shareProceso).toContain(
      'rel="canonical" href="https://vientonorte.io/s/proceso/"'
    );
    expect(shareProceso).not.toContain(
      'rel="canonical" href="https://vientonorte.io/#/proceso"'
    );
    expect(shareProceso).not.toContain("http-equiv=\"refresh\"");
    expect(shareProceso).not.toContain("location.replace(");
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
  it("lists / /s/consultoria/ /s/proceso/ and no /s/news or hash locs", () => {
    expect(sitemap).toContain("<loc>https://vientonorte.io/</loc>");
    expect(sitemap).not.toContain("<loc>https://vientonorte.io/s/</loc>");
    expect(sitemap).toContain(
      "<loc>https://vientonorte.io/s/consultoria/</loc>"
    );
    expect(sitemap).toContain(
      "<loc>https://vientonorte.io/s/polijuego-privacy/</loc>"
    );
    expect(sitemap).toContain("<loc>https://vientonorte.io/s/proceso/</loc>");
    expect(sitemap).not.toContain("/s/news");
    expect(sitemap).not.toContain("<loc>https://vientonorte.io/news/");
    expect(sitemap).not.toMatch(/<loc>https:\/\/vientonorte\.io\/#\//);
    expect(sitemap).not.toContain("/admin");
    expect(sitemap).not.toContain("finanzas.vientonorte.io");
    expect(sitemap).toContain("<lastmod>2026-09-09</lastmod>");
    expect(sitemap).not.toMatch(/<lastmod>2026-08-/);
    expect(sitemap).not.toMatch(/<lastmod>2026-09-0[0-8]</);
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

  it("/poc refreshes to /s/consultoria/, not /#/consultoria", () => {
    expect(legacyPoc).toContain('http-equiv="refresh"');
    expect(legacyPoc).toContain(
      'content="0;url=https://vientonorte.io/s/consultoria/"'
    );
    expect(legacyPoc).toContain('name="robots" content="noindex, follow"');
    expect(legacyPoc).not.toContain('id="root"');
    expect(legacyPoc).not.toContain("/#/consultoria");
  });

  it("SPA fallback hops /poc to /s/consultoria/ (HTTP), not hash", () => {
    expect(indexHtml).toContain('location.origin + "/s/consultoria/"');
    expect(indexHtml).not.toContain('location.origin + "/#/consultoria"');
  });
});

describe("SEO P0 · /s/news purged", () => {
  it("does not ship public/s/news or public/news crawler HTML", () => {
    expect(existsSync(resolve(root, "public/s/news"))).toBe(false);
    expect(existsSync(resolve(root, "public/news"))).toBe(false);
    expect(existsSync(resolve(root, "public/images/news"))).toBe(false);
  });

  it("remaining /s/ chrome has no News nav/footer link", () => {
    for (const html of [shareHome, shareConsultoria, shareProceso, polijuegoPrivacy]) {
      expect(html).not.toContain('href="/s/news/"');
    }
  });
});

describe("SEO P0 · public/s/** stays on the share URL", () => {
  it("has no meta-refresh or location.replace in any share HTML", () => {
    const shareRoot = resolve(root, "public/s");
    const files: string[] = [];
    const walk = (dir: string) => {
      for (const name of readdirSync(dir)) {
        const p = join(dir, name);
        if (statSync(p).isDirectory()) walk(p);
        else if (name.endsWith(".html")) files.push(p);
      }
    };
    walk(shareRoot);
    expect(files.length).toBeGreaterThan(3);
    for (const file of files) {
      const html = readFileSync(file, "utf8");
      const rel = relative(root, file);
      expect(html.includes("http-equiv=\"refresh\""), rel).toBe(false);
      expect(html.includes("location.replace("), rel).toBe(false);
    }
  });

  it("uses VN chrome: skip-link, banner, principal nav, main#main, footer", () => {
    const shareRoot = resolve(root, "public/s");
    const files: string[] = [];
    const walk = (dir: string) => {
      for (const name of readdirSync(dir)) {
        const p = join(dir, name);
        if (statSync(p).isDirectory()) walk(p);
        else if (name.endsWith(".html")) files.push(p);
      }
    };
    walk(shareRoot);
    for (const file of files) {
      const html = readFileSync(file, "utf8");
      const rel = relative(root, file);
      expect(html.includes('href="/s/share.css"'), rel).toBe(true);
      expect(html.includes('class="skip-link" href="#main"'), rel).toBe(true);
      expect(html.includes("Ir al contenido principal"), rel).toBe(true);
      expect(html.includes('role="banner"'), rel).toBe(true);
      expect(html.includes('aria-label="Principal"'), rel).toBe(true);
      expect(html.includes('id="main"'), rel).toBe(true);
      expect(html.includes("<footer"), rel).toBe(true);
      expect(html.includes('aria-label="Miga de pan"'), rel).toBe(true);
    }
  });
});
