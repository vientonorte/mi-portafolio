import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { render as rtlRender, screen, fireEvent, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { render } from "@/servicios/entry-server";
import { ServiciosPage } from "@/servicios/ServiciosPage";
import {
  buildServiciosPayload,
  validateServiciosContact,
} from "@/servicios/servicios-contact";
import { SERVICIOS_INTENTS, SERVICIOS_SEO } from "@/servicios/servicios-content";

const root = process.cwd();
const html = render();
const doc = new DOMParser().parseFromString(`<body>${html}</body>`, "text/html");
const META_DESCRIPTION =
  "Web profesional para tu Pyme en 72 horas por $30.000, revisión gratis de accesibilidad de un flujo y consultoría UX. Viento Norte, Chile.";
const AI_SLUGS = ["asistente-ia", "asistente-ecommerce", "inteligencia-artificial-negocios"];

/** Home root: "/" en build prod/test; "/qa/" bajo VITE_BASE=/qa/. */
const HOME_ROOTS = new Set(["/", "/qa/"]);
const isAllowedHref = (href: string) =>
  HOME_ROOTS.has(href) ||
  href === "/servicios/" ||
  href.startsWith("/images/") ||
  href.startsWith("/qa/images/") ||
  /^#[A-Za-z][\w-]*$/.test(href) ||
  /^\/servicios\/#[A-Za-z][\w-]*$/.test(href) ||
  href === "mailto:contacto@vientonorte.io";

describe("/servicios/ prerender (react-dom/server)", () => {
  it("renders the 3 cards in PO v3 order (web → revisión → consultoría) with prices", () => {
    const cards = [...doc.querySelectorAll("[data-card]")];
    expect(cards.map((c) => c.getAttribute("data-card"))).toEqual([
      "web-pymes",
      "revision-gratis",
      "consultoria-ux",
    ]);
    // ids/anclas estables
    for (const id of ["web-pymes", "revision-gratis", "consultoria-ux"]) {
      expect(doc.getElementById(id)?.getAttribute("data-card")).toBe(id);
    }
    const titles = cards.map((c) => c.querySelector("h3")?.textContent);
    expect(titles).toEqual([
      "Web para Pymes en 72 horas",
      "Revisión gratis de un flujo",
      "Consultoría UX para Pymes",
    ]);
    const prices = cards.map((c) => c.querySelector("[data-price]")?.textContent);
    // Consultoría UX sin precio (pendiente, decisión Rö vía PO 1-oct 10:32): misma tarjeta, sin bloque «Precio».
    expect(prices).toEqual(["$30.000 CLP", "Gratis", undefined]);
    expect(cards[2].textContent).not.toContain("Precio");
    expect(cards[2].textContent).not.toMatch(/\$|Cotización/);
    expect(cards[2].className).toBe(cards[0].className);
    expect(cards[0].textContent).toContain("72 horas");
    expect(cards[0].textContent).toContain("50%");
    expect(cards[0].textContent).toContain("después del primer contacto");
    for (const c of cards) {
      expect(c.textContent).toContain("Para quién");
      expect(c.textContent).toContain("Qué incluye");
      expect(c.querySelector("img")).not.toBeNull();
      expect(c.querySelector('a[href="#contacto"][data-intent]')).not.toBeNull();
    }
  });

  it("each card has its 'para quién' audience line (exact PO text), before the title", () => {
    const cards = [...doc.querySelectorAll("[data-card]")];
    const lines = cards.map((c) => c.querySelector("[data-audience]")?.textContent);
    expect(lines).toEqual([
      "¿No tienes sitio?",
      "¿Tu sitio tiene problemas?",
      "¿Buscas talento joven o un equipo UX?",
    ]);
    for (const c of cards) {
      const aud = c.querySelector("[data-audience]")!;
      const h3 = c.querySelector("h3")!;
      expect(aud.compareDocumentPosition(h3) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    }
  });

  it("each card's kicker above the title: WCAG card says 'Gratis' (no 'Puerta de entrada')", () => {
    const kickers = [...doc.querySelectorAll("[data-card]")].map((c) =>
      c.querySelector("article > div > p.font-mono")?.textContent
    );
    expect(kickers).toEqual(["01 · Web en 72 horas", "02 · Gratis", "03 · Consultoría"]);
    const wcag = doc.querySelector('[data-card="revision-gratis"]')!;
    const kicker = wcag.querySelector("article > div > p.font-mono")!;
    expect(kicker.compareDocumentPosition(wcag.querySelector("h3")!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(html).not.toContain("Puerta de entrada");
  });

  it("has one h1 aligned with the home and lang-safe headings", () => {
    const h1s = doc.querySelectorAll("h1");
    expect(h1s).toHaveLength(1);
    expect(h1s[0].textContent).toContain("Tecnología para empresas");
  });

  it("renders the contact form with source 'servicios' and required consent", () => {
    const form = doc.querySelector("form");
    expect(form).not.toBeNull();
    expect(form!.getAttribute("data-source")).toBe("servicios");
    expect(form!.getAttribute("data-endpoint")).toBe("https://contact.vientonorte.io/api/contact");
    expect(doc.querySelector('input[name="source"]')?.getAttribute("value")).toBe("servicios");
    expect(doc.querySelector('input[name="consent"][type="checkbox"]')?.hasAttribute("required")).toBe(true);
    expect(doc.querySelector('input[name="_gotcha"]')).not.toBeNull();
    const group = doc.querySelector("fieldset");
    expect(group?.querySelector("legend")?.textContent).toBe("¿Qué te gustaría conversar? *");
    expect(group?.textContent).not.toContain("Oportunidad laboral");
    expect(group?.textContent).not.toContain("Proyecto freelance");
    const radios = [...doc.querySelectorAll<HTMLInputElement>('input[type="radio"][name="intent"]')];
    expect(radios).toHaveLength(4);
    for (const radio of radios) expect(radio.hasAttribute("required")).toBe(true);
    // Ninguna marcada: el visitante todavía no elige
    expect(radios.filter((r) => r.hasAttribute("checked"))).toHaveLength(0);
    // Orden PO: web → revisión → consultoría → otro
    expect(radios.map((r) => r.value)).toEqual([
      "Web nueva",
      "Revisión gratis de un flujo",
      "Consultoría UX",
      "Otro servicio digital",
    ]);
    expect(radios.map((r) => r.closest("label")?.textContent)).toEqual([
      "Web nueva",
      "Revisión gratis de un flujo",
      "Consultoría UX",
      "Otro servicio digital",
    ]);
    expect(doc.querySelector('[role="status"][aria-live="polite"]')).not.toBeNull();
    for (const name of ["nombre", "correo", "empresa", "detalle"]) {
      const field = doc.querySelector(`[name="${name}"]`);
      expect(field, name).not.toBeNull();
      expect(doc.querySelector(`label[for="${field!.id}"]`), `label ${name}`).not.toBeNull();
    }
  });

  it("has no /#/, /s/, TODO or AI services", () => {
    expect(html).not.toContain("/#/");
    expect(html).not.toMatch(/href="[^"]*\/s\//);
    expect(html).not.toContain("/s/");
    expect(html).not.toContain("TODO");
    expect(html).not.toMatch(/whatsapp|wa\.me|mercadopago/i);
    for (const slug of AI_SLUGS) expect(html).not.toContain(slug);
  });

  it("every href is the home root, /servicios/, an in-page #anchor, /servicios/#anchor or the mailto", () => {
    const hrefs = [...html.matchAll(/href="([^"]*)"/g)].map((m) => m[1]);
    expect(hrefs.length).toBeGreaterThan(5);
    const bad = hrefs.filter((h) => !isAllowedHref(h));
    expect(bad).toEqual([]);
    // in-page anchors must resolve to an element on the page
    for (const h of hrefs.filter((x) => x.startsWith("#") || x.startsWith("/servicios/#"))) {
      expect(doc.getElementById(h.split("#")[1]), h).not.toBeNull();
    }
    const footer = doc.querySelector("footer");
    expect([...footer!.querySelectorAll("a")].map((a) => a.getAttribute("href"))).toEqual([
      "mailto:contacto@vientonorte.io",
    ]);
    // Nav minimal canónico (src/lib/site-nav.ts): logo → raíz · Servicios · Contacto · toggle → raíz.
    const navHrefs = [...doc.querySelectorAll("header a")].map((a) => a.getAttribute("href"));
    expect(navHrefs).toContain("/");
    expect(navHrefs).toContain("/servicios/");
    expect(navHrefs).toContain("/servicios/#contacto");
    // Las anclas de tarjetas ya no van en el header (están en la grilla «Tres formas de partir»).
    for (const anchor of ["/servicios/#revision-gratis", "/servicios/#web-pymes", "/servicios/#consultoria-ux"]) {
      expect(navHrefs).not.toContain(anchor);
    }
    for (const h of navHrefs) expect(h, h ?? "").toMatch(/^\/(?:servicios\/(?:#[a-z][\w-]*)?)?$/);
  });

  it("template has SEO + outlet, and built dist (if present) is the prerendered page", () => {
    const tpl = readFileSync(resolve(root, "servicios/index.html"), "utf8");
    expect(tpl).toContain('<html lang="es"');
    expect(tpl).toContain("<title>Servicios para pymes · Viento Norte</title>");
    expect(tpl).toContain('name="description"');
    // Meta description exacta (PO) y og/twitter la replican
    const metaContent = (attr: string) =>
      new DOMParser().parseFromString(tpl, "text/html").querySelector(`meta[${attr}]`)?.getAttribute("content");
    expect(metaContent('name="description"')).toBe(META_DESCRIPTION);
    expect(metaContent('property="og:description"')).toBe(META_DESCRIPTION);
    expect(metaContent('name="twitter:description"')).toBe(META_DESCRIPTION);
    expect(SERVICIOS_SEO.description).toBe(META_DESCRIPTION);
    expect(tpl).toContain('rel="canonical" href="https://vientonorte.io/servicios/"');
    expect(tpl).toContain('property="og:title"');
    expect(tpl).not.toContain("share.css");
    const dist = resolve(root, "dist/servicios/index.html");
    if (existsSync(dist)) {
      const built = readFileSync(dist, "utf8");
      expect(built).not.toContain("<!--ssr-outlet-->");
      expect(built).toContain("Web para Pymes en 72 horas");
      expect(built).toContain(`name="description"`);
      expect(built).toContain(META_DESCRIPTION);
      expect(built).not.toContain("share.css");
    }
  });
});

describe("/servicios/ contact form (client)", () => {
  afterEach(() => vi.restoreAllMocks());

  const base = {
    nombre: "Ana",
    correo: "ana@pyme.cl",
    empresa: "Pyme SpA",
    intent: "Web nueva" as const,
    detalle: "Necesito una web para mi local",
    consent: true,
    gotcha: "",
  };

  it("validation blocks without consent or with message < 10", () => {
    expect(validateServiciosContact(base)).toEqual({});
    expect(validateServiciosContact({ ...base, consent: false }).consent).toBeTruthy();
    expect(validateServiciosContact({ ...base, detalle: "corto" }).detalle).toBeTruthy();
    expect(validateServiciosContact({ ...base, nombre: "A" }).nombre).toBeTruthy();
    expect(validateServiciosContact({ ...base, correo: "x@" }).correo).toBeTruthy();
    expect(validateServiciosContact({ ...base, intent: "" }).intent).toBe("Elige qué necesitas.");
    for (const intent of SERVICIOS_INTENTS) {
      expect(validateServiciosContact({ ...base, intent }), intent).toEqual({});
    }
  });

  it("every intent value fits the relay contract (non-empty string ≤80)", () => {
    for (const intent of SERVICIOS_INTENTS) {
      const p = buildServiciosPayload({ ...base, intent });
      expect(p.intent).toBe(intent);
      expect(p.intent.length).toBeGreaterThan(0);
      expect(p.intent.length).toBeLessThanOrEqual(80);
    }
  });

  it("payload matches worker/src/contact.js contract", () => {
    const p = buildServiciosPayload(base);
    expect(p).toMatchObject({
      name: "Ana",
      email: "ana@pyme.cl",
      consent: true,
      source: "servicios",
      intent: "Web nueva",
      language: "es",
      _gotcha: "",
    });
    expect(p.message).toContain("Empresa: Pyme SpA");
    expect(p.message).toContain("Necesito una web para mi local");
    expect(p.source.length).toBeLessThanOrEqual(40);
    expect(p.intent.length).toBeLessThanOrEqual(80);
  });

  const intentGroup = () => screen.getByRole("group", { name: /¿Qué te gustaría conversar\?/ });
  const checkedIntent = () =>
    (screen.queryByRole("radio", { checked: true }) as HTMLInputElement | null)?.value ?? "";

  it("the line starts with nothing chosen; submit without choosing shows an accessible error and does not send", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), { status: 200 })
    );
    Element.prototype.scrollIntoView = vi.fn();
    rtlRender(<ServiciosPage />);
    expect(checkedIntent()).toBe("");
    expect(intentGroup()).toHaveAttribute("aria-required", "true");

    fireEvent.change(screen.getByLabelText(/^Nombre/), { target: { value: "Ana" } });
    fireEvent.change(screen.getByLabelText(/^Correo/), { target: { value: "ana@pyme.cl" } });
    fireEvent.change(screen.getByLabelText(/^Cuéntanos más/), {
      target: { value: "Necesito una web para mi local" },
    });
    fireEvent.click(screen.getByLabelText(/Acepto que Viento Norte/));
    fireEvent.click(screen.getByRole("button", { name: "Enviar mensaje" }));

    expect(fetchSpy).not.toHaveBeenCalled();
    const err = await screen.findByText("Elige qué necesitas.");
    expect(intentGroup()).toHaveAttribute("aria-invalid", "true");
    expect(intentGroup().getAttribute("aria-describedby")).toBe(err.id);
    expect(intentGroup()).toHaveAccessibleDescription("Elige qué necesitas.");
    expect(document.activeElement).toBe(intentGroup());
    expect(screen.getByRole("status")).toHaveTextContent("Revisa los campos marcados antes de enviar.");

    fireEvent.click(screen.getByRole("radio", { name: "Otro servicio digital" }));
    expect(screen.queryByText("Elige qué necesitas.")).toBeNull();
    expect(intentGroup()).not.toHaveAttribute("aria-invalid");
    fireEvent.click(screen.getByRole("button", { name: "Enviar mensaje" }));
    await waitFor(() => expect(fetchSpy).toHaveBeenCalledTimes(1));
    const body = JSON.parse(String((fetchSpy.mock.calls[0][1] as RequestInit).body));
    expect(body).toMatchObject({ source: "servicios", intent: "Otro servicio digital", consent: true });
  });

  it.each([
    ["Quiero mi web", "Web nueva"],
    ["Pedir revisión gratis", "Revisión gratis de un flujo"],
    ["Conversar mi caso", "Consultoría UX"],
  ])("card button '%s' preselects '%s' on the line", (cta, expected) => {
    Element.prototype.scrollIntoView = vi.fn();
    rtlRender(<ServiciosPage />);
    expect(checkedIntent()).toBe("");
    fireEvent.click(screen.getByRole("link", { name: cta }));
    expect(checkedIntent()).toBe(expected);
    expect(screen.getByRole("radio", { name: expected })).toBeChecked();
    expect(screen.getByRole("status")).toHaveTextContent(`Opción seleccionada en el formulario: ${expected}.`);
  });

  it("card preselect clears a pending intent error; submit without consent does not call fetch", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), { status: 200 })
    );
    Element.prototype.scrollIntoView = vi.fn();
    rtlRender(<ServiciosPage />);
    fireEvent.click(screen.getByRole("button", { name: "Enviar mensaje" }));
    expect(await screen.findByText("Elige qué necesitas.")).toBeInTheDocument();

    // Preselección por intent de la tarjeta (no por posición)
    fireEvent.click(screen.getByRole("link", { name: "Conversar mi caso" }));
    expect(checkedIntent()).toBe("Consultoría UX");
    expect(screen.queryByText("Elige qué necesitas.")).toBeNull();
    fireEvent.click(screen.getByRole("link", { name: "Pedir revisión gratis" }));
    expect(checkedIntent()).toBe("Revisión gratis de un flujo");
    fireEvent.click(screen.getByRole("link", { name: "Quiero mi web" }));
    expect(checkedIntent()).toBe("Web nueva");

    fireEvent.change(screen.getByLabelText(/^Nombre/), { target: { value: "Ana" } });
    fireEvent.change(screen.getByLabelText(/^Correo/), { target: { value: "ana@pyme.cl" } });
    fireEvent.change(screen.getByLabelText(/^Cuéntanos más/), { target: { value: "corto" } });
    fireEvent.click(screen.getByRole("button", { name: "Enviar mensaje" }));
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(await screen.findByText("Cuéntanos un poco más (mínimo 10 caracteres).")).toBeInTheDocument();
    expect(screen.getByText(/acepta que te contactemos/)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Cuéntanos más/)).toHaveAttribute("aria-invalid", "true");

    fireEvent.change(screen.getByLabelText(/^Cuéntanos más/), {
      target: { value: "Necesito una web para mi local" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Enviar mensaje" }));
    expect(fetchSpy).not.toHaveBeenCalled();

    fireEvent.click(screen.getByLabelText(/Acepto que Viento Norte/));
    fireEvent.click(screen.getByRole("button", { name: "Enviar mensaje" }));
    await waitFor(() => expect(fetchSpy).toHaveBeenCalledTimes(1));
    const [url, init] = fetchSpy.mock.calls[0];
    expect(url).toBe("https://contact.vientonorte.io/api/contact");
    const body = JSON.parse(String((init as RequestInit).body));
    expect(body).toMatchObject({ source: "servicios", intent: "Web nueva", consent: true });
    expect(await screen.findByText(/Recibimos tu mensaje/)).toBeInTheDocument();
    expect(checkedIntent()).toBe("");
  });
});

describe("/servicios/ nav · selector de idioma (variante estática de Navigation)", () => {
  afterEach(() => {
    localStorage.clear();
  });

  it("el prerender trae el nav minimal de la home: logo, Servicios, Contacto, tema y «🌐 ES» (sin par es / EN)", () => {
    const header = doc.querySelector("header")!;
    const nav = header.querySelector('nav[aria-label="Navegación principal"]')!;
    expect(nav).not.toBeNull();
    expect(header.getAttribute("data-nav-shell")).toBe("minimal");
    // Logo → home
    expect(nav.querySelector('a[aria-label^="Inicio"]')?.getAttribute("href")).toBe("/");
    // Links primarios del desktop: exactamente Servicios · Contacto
    const desktop = nav.querySelector(".nav-desktop-only ul")!;
    expect([...desktop.querySelectorAll("a")].map((a) => a.textContent)).toEqual(["Servicios", "Contacto"]);
    // Sin el par «es / EN» del selector viejo
    expect(header.querySelector("[data-lang-selector]")).toBeNull();
    expect(header.textContent).not.toMatch(/es\s*\/\s*en/i);
    // Toggle discreto: desktop + móvil, muestra el idioma actual (es) y lleva a la home en EN
    const switches = [...header.querySelectorAll('a[data-lang-switch="en"]')];
    expect(switches.length).toBe(2); // escritorio + móvil
    for (const a of switches) {
      expect(a.getAttribute("href")).toBe("/");
      expect(a.getAttribute("hreflang")).toBe("en");
      expect(a.getAttribute("data-lang-current")).toBe("es");
      expect(a.textContent?.trim().toLowerCase()).toBe("es");
      expect(a.getAttribute("aria-label")).toMatch(/English/);
    }
    expect(header.querySelector(".nav-desktop-only a[data-lang-switch] svg")).not.toBeNull(); // 🌐
    // Tema: desktop + móvil
    expect(header.querySelectorAll('button[aria-label^="Activar modo"]').length).toBe(2);
    const tpl = readFileSync(resolve(root, "servicios/index.html"), "utf8");
    expect(tpl).toMatch(/<html lang="es"/);
  });

  it("ningún link del nav ni de la página usa /#/", () => {
    const hrefs = [...doc.querySelectorAll("a")].map((a) => a.getAttribute("href") ?? "");
    for (const h of hrefs) expect(h, h).not.toContain("/#/");
  });

  it("elegir EN guarda el idioma con el mecanismo de la home y navega a la raíz", () => {
    localStorage.setItem("language", "es");
    rtlRender(<ServiciosPage />);
    const en = screen.getAllByRole("link", { name: /English/ })[0];
    expect(en.getAttribute("href")).toBe("/");
    const notPrevented = fireEvent.click(en);
    expect(notPrevented).toBe(true); // el navegador sigue el href a la home
    expect(localStorage.getItem("language")).toBe("en");
  });
});

describe("/servicios/ JSON-LD ItemList", () => {
  it("follows the card order: Web pymes 1, Revisión gratis 2, Consultoría UX 3", () => {
    const page = readFileSync(resolve(root, "servicios/index.html"), "utf8");
    const m = page.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    expect(m).toBeTruthy();
    const ld = JSON.parse(m![1]);
    expect(ld["@type"]).toBe("ItemList");
    const items = ld.itemListElement as { position: number; item: { name: string } }[];
    expect(items.map((i) => i.position)).toEqual([1, 2, 3]);
    expect(items.map((i) => i.item.name)).toEqual([
      "Web para Pymes en 72 horas",
      "Revisión gratis de un flujo (accesibilidad WCAG)",
      "Consultoría UX para Pymes",
    ]);
  });
});
