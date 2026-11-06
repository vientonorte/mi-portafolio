/**
 * /sobre-mi/: la plantilla ya trae title y canonical. El prerender inyecta el
 * HTML de React (Helmet / <title> hoisted) en <!--ssr-outlet-->. El documento
 * publicado queda con dos title y dos canonical. El <title> de un <svg> no cuenta.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
// @ts-expect-error — módulo .mjs sin tipos
import { OUTLET, injectOutlet } from "../../../scripts/prerender-servicios.mjs";

const shell = readFileSync(resolve(process.cwd(), "sobre-mi/index.html"), "utf8");

function counts(html: string) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const titles = [...doc.querySelectorAll("title")].filter((node) => !node.closest("svg"));
  return {
    titles: titles.length,
    canonicals: doc.querySelectorAll('link[rel="canonical"]').length,
    svgTitles: doc.querySelectorAll("svg title").length,
  };
}

describe("prerender /sobre-mi/ · un solo title y un solo canonical", () => {
  it("inyectar el fragmento SSR no duplica title ni canonical y conserva el title del svg", () => {
    const app = [
      "<title>Sobre mí · Viento Norte</title>",
      '<link rel="canonical" href="https://vientonorte.io/sobre-mi/"/>',
      '<svg role="img"><title>Radar de perfil estratégico</title></svg>',
      '<main id="habilidades">UX Manager</main>',
    ].join("");
    const html = injectOutlet(shell, app);
    const got = counts(html);
    expect(got.titles).toBe(1);
    expect(got.canonicals).toBe(1);
    expect(got.svgTitles).toBe(1);
    expect(html).not.toContain(OUTLET);
    expect(html).toContain('id="habilidades"');
    expect(docTitle(html)).toBe("Sobre mí · Viento Norte");
    expect(canonicalHref(html)).toBe("https://vientonorte.io/sobre-mi/");
  });
});

function docTitle(html: string) {
  return new DOMParser().parseFromString(html, "text/html").querySelector("head title")?.textContent;
}

function canonicalHref(html: string) {
  return new DOMParser()
    .parseFromString(html, "text/html")
    .querySelector('link[rel="canonical"]')
    ?.getAttribute("href");
}
