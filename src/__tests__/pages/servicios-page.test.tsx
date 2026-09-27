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
  HOME_ROOTS.has(href) || /^#[A-Za-z][\w-]*$/.test(href) || href === "mailto:contacto@vientonorte.io";

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
    expect(prices).toEqual(["$30.000 CLP", "Gratis", "Cotización según alcance"]);
    expect(cards[0].textContent).toContain("72 horas");
    expect(cards[0].textContent).toContain("50%");
    expect(cards[0].textContent).toContain("después del primer contacto");
    for (const c of cards) {
      expect(c.textContent).toContain("Para quién");
      expect(c.textContent).toContain("Qué incluye");
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
    const select = doc.querySelector<HTMLSelectElement>('select[name="intent"]')!;
    expect(select.hasAttribute("required")).toBe(true);
    const opts = [...select.querySelectorAll("option")];
    // Placeholder vacío, primero y seleccionado por defecto
    expect(opts[0].textContent).toBe("Elige qué necesitas");
    expect(opts[0].getAttribute("value")).toBe("");
    expect(opts[0].hasAttribute("selected")).toBe(true);
    expect(opts.filter((o) => o.hasAttribute("selected"))).toHaveLength(1);
    // Orden PO: web → revisión → consultoría → otro
    expect(opts.map((o) => o.textContent)).toEqual([
      "Elige qué necesitas",
      "Web nueva",
      "Revisión gratis de un flujo",
      "Consultoría UX",
      "Otro servicio digital",
    ]);
    expect(opts.slice(1).map((o) => o.getAttribute("value"))).toEqual([
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

  it("every href is the home root, an in-page #anchor or the mailto", () => {
    const hrefs = [...html.matchAll(/href="([^"]*)"/g)].map((m) => m[1]);
    expect(hrefs.length).toBeGreaterThan(5);
    const bad = hrefs.filter((h) => !isAllowedHref(h));
    expect(bad).toEqual([]);
    // in-page anchors must resolve to an element on the page
    for (const h of hrefs.filter((x) => x.startsWith("#"))) {
      expect(doc.getElementById(h.slice(1)), h).not.toBeNull();
    }
    const footer = doc.querySelector("footer");
    expect([...footer!.querySelectorAll("a")].map((a) => a.getAttribute("href"))).toEqual([
      "mailto:contacto@vientonorte.io",
    ]);
    const navHrefs = [...doc.querySelectorAll("header a")].map((a) => a.getAttribute("href"));
    expect(navHrefs).toContain("/");
    expect(navHrefs).toContain("#contacto");
    expect(navHrefs).toEqual(expect.arrayContaining(["#revision-gratis", "#web-pymes", "#consultoria-ux"]));
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

  const intentSelect = () => screen.getByLabelText(/¿Qué necesitas\?/) as HTMLSelectElement;

  it("select starts on the empty placeholder; submit without choosing shows an accessible error and does not send", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), { status: 200 })
    );
    Element.prototype.scrollIntoView = vi.fn();
    rtlRender(<ServiciosPage />);
    expect(intentSelect().value).toBe("");
    expect(intentSelect()).toBeRequired();

    fireEvent.change(screen.getByLabelText(/^Nombre/), { target: { value: "Ana" } });
    fireEvent.change(screen.getByLabelText(/^Correo/), { target: { value: "ana@pyme.cl" } });
    fireEvent.change(screen.getByLabelText(/^Cuéntanos más/), {
      target: { value: "Necesito una web para mi local" },
    });
    fireEvent.click(screen.getByLabelText(/Acepto que Viento Norte/));
    fireEvent.click(screen.getByRole("button", { name: "Enviar mensaje" }));

    expect(fetchSpy).not.toHaveBeenCalled();
    const err = await screen.findByText("Elige qué necesitas.");
    expect(intentSelect()).toHaveAttribute("aria-invalid", "true");
    expect(intentSelect().getAttribute("aria-describedby")).toBe(err.id);
    expect(intentSelect()).toHaveAccessibleDescription("Elige qué necesitas.");
    expect(document.activeElement).toBe(intentSelect());
    expect(screen.getByRole("status")).toHaveTextContent("Revisa los campos marcados antes de enviar.");

    // Elegir a mano limpia el error y permite enviar
    fireEvent.change(intentSelect(), { target: { value: "Otro servicio digital" } });
    expect(screen.queryByText("Elige qué necesitas.")).toBeNull();
    expect(intentSelect()).not.toHaveAttribute("aria-invalid");
    fireEvent.click(screen.getByRole("button", { name: "Enviar mensaje" }));
    await waitFor(() => expect(fetchSpy).toHaveBeenCalledTimes(1));
    const body = JSON.parse(String((fetchSpy.mock.calls[0][1] as RequestInit).body));
    expect(body).toMatchObject({ source: "servicios", intent: "Otro servicio digital", consent: true });
  });

  it.each([
    ["Quiero mi web", "Web nueva"],
    ["Pedir revisión gratis", "Revisión gratis de un flujo"],
    ["Conversar mi caso", "Consultoría UX"],
  ])("card button '%s' preselects '%s' from the empty placeholder", (cta, expected) => {
    Element.prototype.scrollIntoView = vi.fn();
    rtlRender(<ServiciosPage />);
    expect(intentSelect().value).toBe("");
    fireEvent.click(screen.getByRole("link", { name: cta }));
    expect(intentSelect().value).toBe(expected);
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
    expect(intentSelect().value).toBe("Consultoría UX");
    expect(screen.queryByText("Elige qué necesitas.")).toBeNull();
    fireEvent.click(screen.getByRole("link", { name: "Pedir revisión gratis" }));
    expect(intentSelect().value).toBe("Revisión gratis de un flujo");
    fireEvent.click(screen.getByRole("link", { name: "Quiero mi web" }));
    expect(intentSelect().value).toBe("Web nueva");

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
    // Tras enviar, el select vuelve al placeholder
    expect(intentSelect().value).toBe("");
  });
});
