import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import News from "@/pages/News";
import { LanguageProvider } from "@/lib/LanguageContext";
import { newsEditionBySlug } from "@/data/news-editions";
import { newsSharePack } from "@/components/news/news-share";

describe("formatos de compartir", () => {
  it("LinkedIn e Instagram salen con su texto y sin la ruta de la nota", () => {
    const privacy = newsEditionBySlug("privacidad-flujo");
    const automation = newsEditionBySlug("automatizacion-sura");
    expect(privacy).toBeTruthy();
    expect(automation).toBeTruthy();
    if (!privacy || !automation) return;

    const linkedin = newsSharePack(privacy, "es");
    expect(linkedin.linkedinText.startsWith("Ley 21.719")).toBe(true);
    expect(linkedin.linkedinText).toContain(
      "https://vientonorte.io/servicios/?utm_source=linkedin&utm_medium=organic&utm_campaign=news_seo&utm_content=ley21719#revision-gratis",
    );
    expect(linkedin.linkedinText).toContain("#Ley21719");
    expect(linkedin.linkedinText).not.toContain("/#/news");
    expect(linkedin.linkedinHref).toContain("https://www.linkedin.com/sharing/share-offsite/?url=");
    expect(decodeURIComponent(linkedin.linkedinHref)).toContain("utm_source=linkedin");
    expect(decodeURIComponent(linkedin.linkedinHref)).not.toContain("/#/news");

    expect(linkedin.instagramText.startsWith(privacy.title.es)).toBe(true);
    expect(linkedin.instagramText).toContain("Enlace en la bio: vientonorte.io/servicios");
    expect(linkedin.instagramText.endsWith(privacy.hashtags.join(" "))).toBe(true);
    expect(linkedin.instagramText).not.toContain("/#/");
    expect(linkedin.instagramText).not.toContain("utm_source");

    expect(linkedin.articleUrl).toContain("/#/news/privacidad-flujo/");
    expect(linkedin.whatsappHref.startsWith("https://wa.me/?text=")).toBe(true);
    expect(linkedin.xHref.startsWith("https://twitter.com/intent/tweet?")).toBe(true);

    const sura = newsSharePack(automation, "es");
    expect(sura.linkedinText).not.toContain("inteligencia-artificial-negocios");
    expect(sura.linkedinText).toContain("utm_content=automatizacion");
    expect(sura.linkedinText).not.toContain("#revision-gratis");
  });

  it("Compartir abre LinkedIn y deja el post visible", async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });
    const open = vi.spyOn(window, "open").mockReturnValue({} as Window);

    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={["/news/privacidad-flujo"]}>
          <LanguageProvider>
            <Routes>
              <Route path="/news/:slug" element={<News />} />
            </Routes>
          </LanguageProvider>
        </MemoryRouter>
      </HelmetProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Compartir" }));
    await user.click(screen.getByRole("button", { name: "LinkedIn" }));

    expect(open).toHaveBeenCalledWith(
      expect.stringContaining("linkedin.com/sharing/share-offsite/"),
      "_blank",
      "noopener,noreferrer",
    );
    expect(writeText).toHaveBeenCalledWith(expect.stringContaining("utm_source=linkedin"));
    expect(screen.getByRole("textbox", { name: "Texto para compartir" })).toBeTruthy();
    expect(screen.getByText("Post copiado. Pégalo en LinkedIn.")).toBeTruthy();
    open.mockRestore();
  });
});
