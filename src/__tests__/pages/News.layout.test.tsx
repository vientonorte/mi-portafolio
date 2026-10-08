import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import News from "@/pages/News";
import { LanguageProvider } from "@/lib/LanguageContext";
import { newsPublicExit } from "@/data/news-editions";
import { serviciosHref } from "@/lib/servicios-links";
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
    </HelmetProvider>,
  );
}

describe("News interna · card SURA + salida a servicios", () => {
  it("el índice tiene un H1 y la card con categoría, tiempo y leer", () => {
    renderNews("/news");
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getAllByText("Leer la noticia")).toHaveLength(3);
    expect(screen.getByRole("list", { name: "Ediciones" }).className).toContain("lg:grid-cols-3");
    expect(screen.getByRole("button", { name: /Filtrar y ordenar/ })).toBeTruthy();
    expect(screen.getByText("Accesibilidad")).toBeTruthy();
    expect(screen.getAllByText(/min de lectura/).length).toBeGreaterThan(0);
    expect(document.body.textContent).not.toContain("/#/consultoria");
    expect(document.body.textContent).not.toContain("/auditoria");
    expect(document.body.innerHTML).not.toContain("/images/news/");
    expect(document.querySelector('img[src="/images/vn-assets/transvip-system-design.png"]')).toBeTruthy();
    expect(document.querySelector('img[src="/images/sura/ia-automation-dashboard.png"]')).toBeTruthy();
    expect(document.querySelector('img[src="/images/seo/ley-21719-flujo.svg"]')?.getAttribute("alt")).toContain(
      "Ley 21.719",
    );
    const canonical = document.querySelector('link[rel="canonical"]');
    expect(canonical?.getAttribute("href")).toBe("https://vientonorte.io/");
  });

  it("filtrar por categoría deja solo esa edición", async () => {
    const user = userEvent.setup();
    renderNews("/news");
    await user.click(screen.getByRole("button", { name: /Filtrar y ordenar/ }));
    await user.click(screen.getByRole("checkbox", { name: "Accesibilidad" }));
    await user.click(screen.getByRole("checkbox", { name: "Automatización" }));
    await user.click(screen.getByRole("button", { name: "Aplicar filtros" }));
    expect(screen.getAllByText("Leer la noticia")).toHaveLength(1);
    expect(screen.getByRole("heading", { name: "Privacidad por diseño, no por banner" })).toBeTruthy();
    expect(screen.queryByText("Accesibilidad")).toBeNull();
  });

  it("la edición sigue el artículo: volver, un H1, lead y otras noticias", () => {
    renderNews("/news/privacidad-flujo");
    expect(screen.getByRole("link", { name: "Volver a las noticias" })).toBeTruthy();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1, name: "Privacidad por diseño, no por banner" })).toBeTruthy();
    expect(screen.getByText("Se cumple en el trámite, no en un banner de cookies.")).toBeTruthy();
    const ley = document.querySelector('img[src="/images/seo/ley-21719-flujo.svg"]');
    expect(ley?.getAttribute("alt")).toContain("Ley 21.719");
    expect(screen.getByRole("link", { name: "Ley 21.719" }).getAttribute("href")).toBe("/privacy");
    expect(document.body.textContent).toContain("Marco:");
    expect(document.body.textContent).not.toContain("contra-archivo");
    expect(document.body.textContent).not.toContain("Grounded Theory");
    expect(document.body.textContent).not.toContain("hub público");
    expect(document.body.textContent).not.toContain("seguridad-privacidad-digital");
    expect(document.body.textContent).not.toContain("Sin KPI");
    expect(document.body.textContent).not.toContain("projects-data.ts");
    expect(screen.getByRole("heading", { level: 2, name: "Otras noticias" })).toBeTruthy();
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(2);
    const exit = screen.getByRole("link", { name: "Revisión gratis de un flujo" });
    expect(exit.getAttribute("href")).toBe(serviciosHref("revision-gratis"));
    expect(document.body.textContent).not.toContain("/#/consultoria");
    expect(document.body.textContent).not.toContain("/auditoria");
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe("https://vientonorte.io/");
  });

  it("accesibilidad no cita el slug y automatización sale al hub", () => {
    const { unmount } = renderNews("/news/accesibilidad-transvip");
    expect(document.body.textContent).not.toContain("diagnostico-accesibilidad-wcag");
    expect(screen.getByRole("link", { name: "Revisión gratis de un flujo" }).getAttribute("href")).toBe(
      serviciosHref("revision-gratis"),
    );
    unmount();

    renderNews("/news/automatizacion-sura");
    expect(screen.getByRole("link", { name: "Ver servicios" }).getAttribute("href")).toBe(serviciosHref());
    expect(document.body.textContent).not.toContain("inteligencia-artificial-negocios");
    const caso = screen.getByRole("link", { name: "SURA Investments" });
    expect(caso.getAttribute("href")).toBe("/empresa/sura-investments");
    expect(document.body.textContent).toContain("Caso en el portafolio");
    expect(document.body.textContent).not.toContain("projects-data.ts");
    expect(document.body.textContent).not.toContain("suraHub");
    expect(document.body.textContent).not.toContain("Fuente (no inventada)");
    expect(document.body.textContent).not.toContain("/empresa/sura-investments");
  });

  it("la salida pública no usa hash de mentoría ni slug", () => {
    expect(newsPublicExit("accesibilidad")).toBe(serviciosHref("revision-gratis"));
    expect(newsPublicExit("privacidad")).toBe(serviciosHref("revision-gratis"));
    expect(newsPublicExit("automatizacion")).toBe(serviciosHref());
    expect(readingMinutes(["uno dos tres"])).toBe(1);
  });
});
