import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import News from "@/pages/News";
import { LanguageProvider } from "@/lib/LanguageContext";
import { newsPublicExit } from "@/data/news-editions";
import { readingMinutes } from "@/components/news/news-format";

function renderNews(path: string) {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[path]}>
        <LanguageProvider>
          <Routes>
            <Route path="/news/:slug" element={<News />} />
            <Route path="/news" element={<News />} />
          </Routes>
        </LanguageProvider>
      </MemoryRouter>
    </HelmetProvider>
  );
}

describe("News interna · card SURA + salida /seo-vn", () => {
  it("el índice tiene un H1 y la card con categoría, tiempo y leer", () => {
    renderNews("/news");
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getAllByText("Leer la noticia")).toHaveLength(3);
    expect(screen.getByText("Accesibilidad")).toBeTruthy();
    expect(screen.getAllByText(/min de lectura/).length).toBeGreaterThan(0);
    expect(document.body.textContent).not.toContain("/#/consultoria");
    expect(document.body.textContent).not.toContain("/auditoria");
    expect(document.body.innerHTML).not.toContain("/images/news/");
    expect(
      document.querySelector('img[src="/images/vn-assets/transvip-system-design.png"]')
    ).toBeTruthy();
    expect(
      document.querySelector('img[src="/images/sura/ia-automation-dashboard.png"]')
    ).toBeTruthy();
    expect(
      document.querySelector('img[src="/images/seo/ley-21719-flujo.svg"]')?.getAttribute("alt")
    ).toContain("Ley 21.719");
    const canonical = document.querySelector('link[rel="canonical"]');
    expect(canonical?.getAttribute("href")).toBe("https://vientonorte.io/");
  });

  it("la edición sigue el artículo: volver, un H1, lead y otras noticias", () => {
    renderNews("/news/privacidad-flujo");
    expect(screen.getByRole("link", { name: "Volver a las noticias" })).toBeTruthy();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", { level: 1, name: "Privacidad por diseño, no por banner" })
    ).toBeTruthy();
    expect(screen.getByText(/Ley 21\.719 en el flujo/)).toBeTruthy();
    const ley = document.querySelector('img[src="/images/seo/ley-21719-flujo.svg"]');
    expect(ley?.getAttribute("alt")).toContain("Ley 21.719");
    expect(screen.getByRole("heading", { level: 2, name: "Otras noticias" })).toBeTruthy();
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(2);
    const exit = screen.getByRole("link", { name: "Revisión gratis de un flujo" });
    expect(exit.getAttribute("href")).toBe("/servicios/#revision-gratis");
    expect(document.body.textContent).not.toContain("/#/consultoria");
    expect(document.body.textContent).not.toContain("/auditoria");
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe(
      "https://vientonorte.io/"
    );
  });

  it("accesibilidad no cita el slug y automatización sale al hub", () => {
    const { unmount } = renderNews("/news/accesibilidad-transvip");
    expect(document.body.textContent).not.toContain("diagnostico-accesibilidad-wcag");
    expect(
      screen.getByRole("link", { name: "Revisión gratis de un flujo" }).getAttribute("href")
    ).toBe("/servicios/#revision-gratis");
    unmount();

    renderNews("/news/automatizacion-sura");
    expect(screen.getByRole("link", { name: "Ver servicios" }).getAttribute("href")).toBe(
      "/servicios/"
    );
    expect(document.body.textContent).not.toContain("inteligencia-artificial-negocios");
  });

  it("la salida pública no usa hash de mentoría ni slug", () => {
    expect(newsPublicExit("accesibilidad")).toBe("/servicios/#revision-gratis");
    expect(newsPublicExit("privacidad")).toBe("/servicios/#revision-gratis");
    expect(newsPublicExit("automatizacion")).toBe("/servicios/");
    expect(readingMinutes(["uno dos tres"])).toBe(1);
  });
});
