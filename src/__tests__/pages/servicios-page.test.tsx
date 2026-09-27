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

const root = process.cwd();
const html = render();
const doc = new DOMParser().parseFromString(`<body>${html}</body>`, "text/html");
const AI_SLUGS = ["asistente-ia", "asistente-ecommerce", "inteligencia-artificial-negocios"];

/** Home root: "/" en build prod/test; "/qa/" bajo VITE_BASE=/qa/. */
const HOME_ROOTS = new Set(["/", "/qa/"]);
const isAllowedHref = (href: string) =>
  HOME_ROOTS.has(href) || /^#[A-Za-z][\w-]*$/.test(href) || href === "mailto:contacto@vientonorte.io";

describe("/servicios/ prerender (react-dom/server)", () => {
  it("renders the 3 cards in PO order with prices", () => {
    const cards = [...doc.querySelectorAll("[data-card]")];
    expect(cards.map((c) => c.getAttribute("data-card"))).toEqual([
      "revision-gratis",
      "web-pymes",
      "consultoria-ux",
    ]);
    const titles = cards.map((c) => c.querySelector("h3")?.textContent);
    expect(titles).toEqual([
      "Revisión gratis de un flujo",
      "Web para Pymes en 72 horas",
      "Consultoría UX para Pymes",
    ]);
    const prices = cards.map((c) => c.querySelector("[data-price]")?.textContent);
    expect(prices).toEqual(["Gratis", "$30.000 CLP", "Cotización según alcance"]);
    expect(cards[1].textContent).toContain("50%");
    expect(cards[1].textContent).toContain("después del primer contacto");
    for (const c of cards) {
      expect(c.textContent).toContain("Para quién");
      expect(c.textContent).toContain("Qué incluye");
      expect(c.querySelector('a[href="#contacto"][data-intent]')).not.toBeNull();
    }
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
    const options = [...doc.querySelectorAll('select[name="intent"] option')].map((o) => o.textContent);
    expect(options).toEqual(["Revisión gratis de un flujo", "Web nueva", "Otro servicio digital"]);
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
    expect(tpl).toContain('rel="canonical" href="https://vientonorte.io/servicios/"');
    expect(tpl).toContain('property="og:title"');
    expect(tpl).not.toContain("share.css");
    const dist = resolve(root, "dist/servicios/index.html");
    if (existsSync(dist)) {
      const built = readFileSync(dist, "utf8");
      expect(built).not.toContain("<!--ssr-outlet-->");
      expect(built).toContain("Web para Pymes en 72 horas");
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

  it("card button preselects intent; submit without consent does not call fetch", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), { status: 200 })
    );
    Element.prototype.scrollIntoView = vi.fn();
    rtlRender(<ServiciosPage />);
    fireEvent.click(screen.getByRole("link", { name: "Quiero mi web" }));
    expect((screen.getByLabelText(/¿Qué necesitas\?/) as HTMLSelectElement).value).toBe("Web nueva");

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
  });
});
