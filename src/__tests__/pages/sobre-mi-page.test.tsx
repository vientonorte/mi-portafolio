/**
 * /sobre-mi/ (13-oct): perfil prerenderizado (patrón /privacidad/ y /noticias/), migas accesibles con
 * BreadcrumbList, wording exacto de certificados, solo 2 CV UX/UI limpios y contacto solo contacto@ + LinkedIn.
 * Incluye el guard de que ninguna página estática deja links internos /#/.
 */
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it, vi } from "vitest";
import { render } from "@/sobre-mi/entry-server";
import { render as renderServicios } from "@/servicios/entry-server";
import { render as renderNoticias } from "@/noticias/entry-server";
import { render as renderRubro } from "@/rubros/entry-server";
import { buildSobreMiRedirectUrl } from "@/components/layout/SobreMiRedirect";
import { SOBRE_MI_CVS } from "@/sobre-mi/SobreMiPage";

const root = process.cwd();
const parse = (html: string) => new DOMParser().parseFromString(`<body>${html}</body>`, "text/html");

describe("/sobre-mi/ prerender", () => {
  const html = render();
  const doc = parse(html);
  const text = doc.body.textContent || "";

  it("tiene h1, timeline con detalle en segundo nivel (details/summary) y portadas locales", () => {
    expect(doc.querySelector("h1")?.textContent).toMatch(/Rodrigo Gaete/);
    const items = doc.querySelectorAll("[data-timeline] > li details > summary");
    expect(items.length).toBeGreaterThan(5);
    const imgs = [...doc.querySelectorAll("[data-timeline] img")].map((i) => i.getAttribute("src") || "");
    expect(imgs.some((s) => s.endsWith("images/experience/marana-sitio-home.webp"))).toBe(true);
    for (const s of imgs) expect(s).not.toMatch(/cloudfront|portfoliobox/);
  });

  it("wording exacto de certificados; nunca «etnógrafo certificado» ni «mediador cultural certificado»", () => {
    expect(text).toMatch(/curso certificado de Análisis Cualitativo, Academia Etnográfica 2022/i);
    expect(text).toMatch(/certificado de participación en mediación cultural, CNCA 2017/i);
    expect(text).not.toMatch(/etn[óo]grafo certificado|mediador cultural certificado/i);
    expect(doc.querySelector("details [data-certificados]")).not.toBeNull();
  });

  it("contacto solo contacto@ y LinkedIn; sin teléfono, dirección ni RUT", () => {
    const hrefs = [...doc.querySelectorAll("[data-contact] a")].map((a) => a.getAttribute("href"));
    expect(hrefs).toEqual(["mailto:contacto@vientonorte.io", "https://www.linkedin.com/in/rodrigo-gaete-ux/"]);
    expect(html).not.toMatch(/\+56|4263|gaete\.gaona@|RUT\b|Recoleta, Santiago/);
  });

  it("publica solo los 2 CV UX/UI (ES/EN) y existen en public/cv/", () => {
    const links = [...doc.querySelectorAll("[data-cv] a")].map((a) => a.getAttribute("href"));
    expect(links).toEqual(SOBRE_MI_CVS.map((c) => `/${c.file}`));
    for (const c of SOBRE_MI_CVS) expect(existsSync(resolve(root, "public", c.file))).toBe(true);
  });

  it("migas accesibles con aria-current y BreadcrumbList", () => {
    const nav = doc.querySelector('nav[aria-label="Migas de pan"]');
    expect(nav).not.toBeNull();
    expect(nav?.querySelector('[aria-current="page"]')?.textContent).toBe("Sobre mí");
    const ld = JSON.parse(nav?.querySelector('script[type="application/ld+json"]')?.textContent || "{}");
    expect(ld["@type"]).toBe("BreadcrumbList");
    expect(ld.itemListElement.at(-1).item).toBe("https://vientonorte.io/sobre-mi/");
  });

  it("index.html: canonical propio y redirect inline de #/sobre-mi", () => {
    const page = readFileSync(resolve(root, "sobre-mi/index.html"), "utf8");
    expect(page).toContain('<link rel="canonical" href="https://vientonorte.io/sobre-mi/" />');
    const home = readFileSync(resolve(root, "index.html"), "utf8");
    expect(home).toMatch(/#\\\/sobre-mi/);
    expect(home).toContain('"%BASE_URL%sobre-mi/"');
    expect(buildSobreMiRedirectUrl("?utm_source=x", "?utm_medium=y")).toBe("/sobre-mi/?utm_source=x&utm_medium=y");
  });
});

describe("migas en páginas estáticas (mismo componente)", () => {
  const pages: Array<[string, string, string]> = [
    ["/servicios/", renderServicios(), "Servicios"],
    ["/noticias/", renderNoticias(), "Noticias"],
    ["/servicios/web-dental/", renderRubro("web-dental"), "Web dental"],
  ];
  it.each(pages)("%s tiene migas con aria-current", (_p, html, current) => {
    const d = parse(html);
    expect(d.querySelector('nav[aria-label="Migas de pan"] [aria-current="page"]')?.textContent).toBe(current);
  });
});

describe("sin links internos /#/", () => {
  it("ninguna página estática prerenderizada enlaza a /#/ ni #/", () => {
    for (const html of [render(), renderServicios(), renderNoticias(), renderRubro("web-dental")]) {
      const hrefs = [...parse(html).querySelectorAll("a[href]")].map((a) => a.getAttribute("href") || "");
      const bad = hrefs.filter((h) => /^(\/|\/qa\/)?#\//.test(h) || /vientonorte\.io\/(qa\/)?#\//.test(h));
      expect(bad).toEqual([]);
    }
  });
});

describe("deep links #/sobre-mi/<sección> → /sobre-mi/#<sección>", () => {
  it("builder agrega la sección como fragmento y conserva UTM", () => {
    expect(buildSobreMiRedirectUrl("", "", "experiencia")).toBe("/sobre-mi/#experiencia");
    expect(buildSobreMiRedirectUrl("?utm_source=x", "", "experiencia")).toBe("/sobre-mi/?utm_source=x#experiencia");
    expect(buildSobreMiRedirectUrl("", "", "<script>")).toBe("/sobre-mi/");
  });
  it("la sección destino existe en la página", () => {
    const d = parse(render());
    expect(d.getElementById("experiencia")).not.toBeNull();
  });
  it("script inline de index.html: #/sobre-mi/experiencia → /sobre-mi/#experiencia", () => {
    const home = readFileSync(resolve(root, "index.html"), "utf8");
    const m = home.match(/var ssec = \(hn\.split\("\?"\)\[0\]\.match\((\/.+?\/)\) \|\| \[\]\)\[1\];/);
    expect(m).not.toBeNull();
    // eslint-disable-next-line no-new-func
    const re = new Function(`return ${m![1]}`)() as RegExp;
    expect("#/sobre-mi/experiencia".match(re)?.[1]).toBe("experiencia");
    expect("#/sobre-mi".match(re)).toBeNull();
  });
  it("SPA: ruta /sobre-mi/:section y state.scrollTo redirigen con fragmento", async () => {
    const { render: rtl } = await import("@testing-library/react");
    const { MemoryRouter, Routes, Route } = await import("react-router-dom");
    const { SobreMiRedirect } = await import("@/components/layout/SobreMiRedirect");
    const replace = vi.fn();
    vi.stubGlobal("location", { ...window.location, search: "", replace });
    rtl(
      <MemoryRouter initialEntries={["/sobre-mi/experiencia"]}>
        <Routes>
          <Route path="/sobre-mi/:section" element={<SobreMiRedirect />} />
        </Routes>
      </MemoryRouter>
    );
    rtl(
      <MemoryRouter initialEntries={[{ pathname: "/sobre-mi", state: { scrollTo: "experiencia" } }]}>
        <Routes>
          <Route path="/sobre-mi" element={<SobreMiRedirect />} />
        </Routes>
      </MemoryRouter>
    );
    expect(replace).toHaveBeenNthCalledWith(1, "/sobre-mi/#experiencia");
    expect(replace).toHaveBeenNthCalledWith(2, "/sobre-mi/#experiencia");
    vi.unstubAllGlobals();
  });
});
