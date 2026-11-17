import { describe, expect, it } from "vitest";
import { indexableTodoProblems } from "../../../scripts/check-dist-no-indexable-todo.mjs";

const sitemap = `<?xml version="1.0"?><urlset>
  <url><loc>https://vientonorte.io/</loc></url>
  <url><loc>https://vientonorte.io/casos/ejemplo/</loc></url>
</urlset>`;

describe("páginas con TODO", () => {
  it("falla si no tiene noindex o si está en el sitemap", () => {
    const pages = [
      { route: "/casos/ejemplo/", html: '<meta name="robots" content="index, follow" />[TODO Rö] falta' },
      { route: "/casos/ejemplo/", html: '<meta name="robots" content="noindex" />[TODO Rö] falta' },
    ];
    const problems = indexableTodoProblems(pages, sitemap);
    expect(problems).toEqual([
      { route: "/casos/ejemplo/", indexed: true, inSitemap: true },
      { route: "/casos/ejemplo/", indexed: false, inSitemap: true },
    ]);
  });

  it("pasa cuando hay noindex y la URL no está en el sitemap", () => {
    const pages = [
      { route: "/casos/pieza/", html: '<meta name="robots" content="noindex" />[TODO Rö] falta' },
      { route: "/", html: '<meta name="robots" content="index, follow" />sin marca' },
    ];
    expect(indexableTodoProblems(pages, sitemap)).toEqual([]);
  });
});
