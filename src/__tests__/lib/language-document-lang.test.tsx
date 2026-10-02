import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import { LanguageProvider, syncDocumentLang, useLanguage } from "@/lib/LanguageContext";
import { render as renderServicios } from "@/servicios/entry-server";

function Toggle() {
  const { language, setLanguage } = useLanguage();
  return (
    <>
      <span data-testid="lang">{language}</span>
      <button type="button" onClick={() => setLanguage("en")}>en</button>
      <button type="button" onClick={() => setLanguage("es")}>es</button>
    </>
  );
}

afterEach(() => {
  cleanup();
  localStorage.clear();
  document.documentElement.lang = "es";
});

describe("LanguageContext · <html lang> sigue al idioma activo", () => {
  it("arranca en es y cambia a en / vuelve a es con el toggle", async () => {
    document.documentElement.lang = "es";
    render(
      <LanguageProvider>
        <Toggle />
      </LanguageProvider>
    );
    await screen.findByTestId("lang");
    expect(document.documentElement.lang).toBe("es");

    await act(async () => screen.getByRole("button", { name: "en" }).click());
    await waitFor(() => expect(screen.getByTestId("lang").textContent).toBe("en"));
    expect(document.documentElement.lang).toBe("en");

    await act(async () => screen.getByRole("button", { name: "es" }).click());
    await waitFor(() => expect(screen.getByTestId("lang").textContent).toBe("es"));
    expect(document.documentElement.lang).toBe("es");
  });

  it("con el idioma guardado en en, <html lang> queda en en desde la carga", async () => {
    localStorage.setItem("language", "en");
    document.documentElement.lang = "es";
    render(
      <LanguageProvider>
        <Toggle />
      </LanguageProvider>
    );
    await waitFor(() => expect(screen.getByTestId("lang").textContent).toBe("en"));
    expect(document.documentElement.lang).toBe("en");
  });

  it("syncDocumentLang solo escribe en/es", () => {
    syncDocumentLang("en");
    expect(document.documentElement.lang).toBe("en");
    syncDocumentLang("es");
    expect(document.documentElement.lang).toBe("es");
  });

  it("/servicios/ queda en es: su HTML declara lang=\"es\" y la página no monta LanguageProvider", () => {
    const tpl = readFileSync(resolve(process.cwd(), "servicios/index.html"), "utf8");
    expect(tpl).toMatch(/<html lang="es"/);
    localStorage.setItem("language", "en");
    document.documentElement.lang = "es";
    renderServicios();
    expect(document.documentElement.lang).toBe("es");
    const src = readFileSync(resolve(process.cwd(), "src/servicios/ServiciosPage.tsx"), "utf8");
    expect(src).not.toMatch(/LanguageProvider/);
  });
});
