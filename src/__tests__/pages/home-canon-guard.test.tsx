import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Home from "@/pages/Home";
import { Navigation } from "@/components/organisms/Navigation";
import { BottomNav } from "@/components/molecules/BottomNav";
import { LanguageProvider } from "@/lib/LanguageContext";

// El mock global de motion (src/test/setup.ts) no trae los hooks de scroll del header de la home.
vi.mock("motion/react", () => {
  const value = { get: () => 0, set: () => {}, getPrevious: () => 0, onChange: () => () => {} };
  const strip = new Set(["initial", "animate", "exit", "whileInView", "whileHover", "whileTap", "transition", "viewport", "variants", "layoutId", "layout"]);
  const component = (tag: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const C = ({ children, ...props }: any) =>
      React.createElement(tag, Object.fromEntries(Object.entries(props).filter(([k]) => !strip.has(k))), children);
    C.displayName = `motion.${tag}`;
    return C;
  };
  return {
    motion: new Proxy({}, { get: (_t, prop) => component(String(prop)) }),
    useInView: () => true,
    useReducedMotion: () => false,
    useScroll: () => ({ scrollY: value, scrollYProgress: value }),
    useSpring: () => value,
    useTransform: () => value,
    useMotionValue: () => value,
    useMotionValueEvent: () => {},
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  };
});

/**
 * Guard (audit 2-oct, P1-1/2/3): la home renderizada (header, contenido y dock, con el
 * HashRouter real de la app) no puede exponer rutas hash `/#/…` / `#/…` ni los slugs viejos
 * de redirección, ni como href ni como texto visible.
 */
const OLD_SLUGS = ["/servicios/diagnostico-accesibilidad-wcag/", "/servicios/consultoria-ux-pymes/"];

/**
 * Única excepción, acotada: el link «política de privacidad» del consentimiento del formulario
 * de contacto (ContactConsentField, `data-privacy-link` → #/privacy). No es nav: es el aviso
 * legal del consentimiento (Ley 21.719) y hoy no existe una página HTTP de privacidad a la que
 * apuntarlo. Pendiente de decisión (Rö/PO): publicar /privacidad/ y quitar esta excepción.
 */
function isConsentPrivacyLink(el: Element): boolean {
  return el.hasAttribute("data-privacy-link") && el.getAttribute("href") === "#/privacy";
}

function renderHome() {
  window.location.hash = "#/";
  return render(
    <HelmetProvider>
      <HashRouter>
        <LanguageProvider>
          <Navigation />
          <Home />
          <BottomNav />
        </LanguageProvider>
      </HashRouter>
    </HelmetProvider>
  );
}

function offenders(container: HTMLElement): string[] {
  const hrefs = [...container.ownerDocument.querySelectorAll("[href]")]
    .filter((el) => !isConsentPrivacyLink(el))
    .map((el) => el.getAttribute("href") ?? "")
    .filter((h) => !h.startsWith("data:"));
  const bad = hrefs.filter(
    (h) => h.includes("/#/") || h.startsWith("#/") || OLD_SLUGS.some((slug) => h.includes(slug))
  );
  const text = container.ownerDocument.body.textContent ?? "";
  if (text.includes("/#/")) bad.push(`text: …${text.slice(Math.max(0, text.indexOf("/#/") - 40), text.indexOf("/#/") + 40)}…`);
  for (const slug of OLD_SLUGS) if (text.includes(slug)) bad.push(`text: ${slug}`);
  return bad;
}

afterEach(() => {
  cleanup();
  window.location.hash = "";
});

describe("home canon guard: sin /#/ ni slugs viejos en la home renderizada", () => {
  it("header + contenido + dock (desktop y drawer cerrado)", async () => {
    const { container } = renderHome();
    // Deja resolver lazy/suspense de las secciones
    await act(async () => {
      await new Promise((r) => setTimeout(r, 50));
    });
    const links = container.ownerDocument.querySelectorAll("a[href]");
    expect(links.length).toBeGreaterThan(10);
    expect(offenders(container)).toEqual([]);
  });

  it("con el menú móvil abierto (drawer + accesos rápidos)", async () => {
    const { container } = renderHome();
    fireEvent.click(screen.getAllByRole("button", { name: /Abrir menú de navegación/ })[0]!);
    await act(async () => {
      await new Promise((r) => setTimeout(r, 50));
    });
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(offenders(container)).toEqual([]);
  });

  it("el header de la home es el nav minimal: logo, Servicios, Contacto, sin «Más» ni Proceso", () => {
    renderHome();
    const header = document.querySelector('header[data-nav-shell="minimal"]')!;
    expect(header).not.toBeNull();
    const desktop = header.querySelector(".nav-desktop-only ul")!;
    expect([...desktop.querySelectorAll("li")].map((li) => li.textContent?.trim())).toEqual(["Servicios", "Contacto"]);
    expect(desktop.querySelector('a[href="/servicios/"]')).not.toBeNull();
    expect(desktop.querySelector('a[href="#contacto"]')).not.toBeNull();
    expect(header.textContent).not.toMatch(/Proceso|Más/);
    // Toggle de idioma de la home: «🌐 ES» (botón SPA, sin par es / EN)
    expect(header.querySelector("[data-lang-selector]")).toBeNull();
    expect(screen.getAllByRole("button", { name: "Cambiar a English" }).length).toBe(2);
  });
});
