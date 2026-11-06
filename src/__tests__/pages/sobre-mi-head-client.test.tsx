/**
 * La ficha HTTP ya trae title y canonical en el HTML. SEOHead no debe sumar otro
 * par idéntico al hidratar (React 19 hoistea <title> y <link> al head).
 */
import { cleanup, render } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { afterEach, describe, expect, it } from "vitest";
import { SEOHead } from "@/components/atoms/SEOHead";

afterEach(() => {
  cleanup();
  document.head.innerHTML = "";
});

describe("SEOHead en una ficha que ya tiene su canonical", () => {
  it("no agrega un segundo title ni un segundo canonical", () => {
    document.head.innerHTML =
      '<title>Sobre mí · Viento Norte</title><link rel="canonical" href="https://vientonorte.io/sobre-mi/" />';
    render(
      <HelmetProvider>
        <SEOHead
          title="Sobre mí"
          description="Rodrigo Gaete, UX Manager en Viento Norte."
          url="https://vientonorte.io/sobre-mi/"
        />
      </HelmetProvider>
    );
    const titles = [...document.querySelectorAll("title")].filter((node) => !node.closest("svg"));
    expect(titles).toHaveLength(1);
    expect(document.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
  });
});
