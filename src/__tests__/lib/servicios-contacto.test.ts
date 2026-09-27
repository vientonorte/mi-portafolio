import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { JSDOM } from "jsdom";
import { describe, expect, it, vi } from "vitest";

/**
 * Canon Ro 2026-09-27: nada client-facing usa /s/ ni /#/. Fichas en /servicios/<slug>/
 * con formulario en página (#contacto) → relay contact.vientonorte.io.
 * Los envíos se prueban con fetch mockeado: ningún test llega al relay real.
 */
const root = process.cwd();
const RELAY = "https://contact.vientonorte.io/api/contact";

const FORM_PAGES = [
  { slug: "diagnostico-accesibilidad-wcag", source: "wcag", preset: "Revisión gratis de un flujo" },
  { slug: "consultoria-ux-pymes", source: "ux-pymes", preset: "" },
];

function walkHtml(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walkHtml(p));
    else if (name.endsWith(".html")) out.push(p);
  }
  return out;
}

const read = (slug: string) =>
  readFileSync(resolve(root, `public/servicios/${slug}/index.html`), "utf8");

describe("servicios · URL canon (sin /#/, sin /s/, sin TODO, links relativos)", () => {
  const files = [
    ...walkHtml(resolve(root, "public/servicios")),
    ...walkHtml(resolve(root, "public/s/servicios")),
  ];

  it("covers generated pages and hops", () => {
    expect(files.length).toBeGreaterThanOrEqual(18);
  });

  it.each(files.map((f) => [relative(root, f), f]))("%s", (_rel, file) => {
    const html = readFileSync(file, "utf8");
    expect(html).not.toContain("/#/");
    expect(html).not.toMatch(/href="[^"]*\/s\//);
    expect(html).not.toMatch(/url=[^"]*\/s\//);
    expect(html).not.toContain("TODO");
    expect(html).not.toContain("Ver prototipo");
    expect(html).not.toMatch(/wa\.me|whatsapp/i);
    // Internos relativos: ningún href/src root-absolute (rompería /qa/).
    expect(html).not.toMatch(/(?:href|src)="\/(?!\/)/);
    expect(html).not.toMatch(/url=\//);
    // Nada interno apunta a producción salvo canonical / og / JSON-LD.
    const prodHrefs = [...html.matchAll(/(?:href|src)="(https:\/\/vientonorte\.io[^"]*)"/g)]
      .filter((m) => !/rel="canonical"/.test(html.slice(Math.max(0, m.index! - 40), m.index!)))
      .map((m) => m[1]);
    expect(prodHrefs).toEqual([]);
  });

  it("/s/servicios/* are relative redirects (meta refresh + canonical + location.replace)", () => {
    for (const file of walkHtml(resolve(root, "public/s/servicios"))) {
      const html = readFileSync(file, "utf8");
      expect(html).toContain('name="robots" content="noindex, follow"');
      expect(html).toMatch(/<link rel="canonical" href="https:\/\/vientonorte\.io\/servicios\//);
      expect(html).toMatch(/http-equiv="refresh" content="0;url=(\.\.\/)+servicios\//);
      expect(html).toMatch(/window\.location\.replace\("(\.\.\/)+servicios\//);
    }
  });
});

describe.each(FORM_PAGES)("servicios/$slug · formulario #contacto", ({ slug, source, preset }) => {
  const html = read(slug);

  it("has #contacto form posting to the relay with the right source", () => {
    expect(html).toContain('id="contacto"');
    expect(html).toContain('id="contacto-form"');
    expect(html).toContain(`data-relay="${RELAY}"`);
    expect(html).toContain(`data-source="${source}"`);
    for (const n of ["name", "email", "empresa", "intent", "detalle", "_gotcha", "consent"]) {
      expect(html).toContain(`name="${n}"`);
    }
    for (const o of ["Revisión gratis de un flujo", "Web nueva", "Otro servicio digital"]) {
      expect(html).toContain(`<option value="${o}"`);
    }
    expect(html).toMatch(/role="status" aria-live="polite"/);
    expect(html).toContain('href="mailto:contacto@vientonorte.io');
  });

  it("CTAs Hablemos / Gratis · un flujo WCAG / nav Contacto scroll to #contacto", () => {
    expect(html).toContain('<a class="share-cta" href="#contacto">Hablemos</a>');
    expect(html).toMatch(/href="#contacto" data-intent="Revisión gratis de un flujo">Gratis · un flujo WCAG</);
    expect(html).toContain('<a href="#contacto">Contacto</a>');
  });

  it("nav links to the other servicios pages (relative) and marks itself current", () => {
    for (const other of FORM_PAGES.filter((p) => p.slug !== slug)) {
      expect(html).toContain(`href="../${other.slug}/"`);
    }
    expect(html).toMatch(/<a href="\.\/" aria-current="page">/);
  });

  function load() {
    const dom = new JSDOM(html, {
      runScripts: "dangerously",
      url: `https://vientonorte.io/servicios/${slug}/`,
    });
    const w = dom.window as unknown as Window & typeof globalThis;
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ ok: true }),
    });
    (w as unknown as { fetch: unknown }).fetch = fetchMock;
    const doc = w.document;
    const form = doc.getElementById("contacto-form") as HTMLFormElement;
    const $ = <T extends HTMLElement>(id: string) => doc.getElementById(id) as T;
    const fill = (o: { name?: string; email?: string; detalle?: string; consent?: boolean; intent?: string }) => {
      $<HTMLInputElement>("contacto-nombre").value = o.name ?? "Ana Pérez";
      $<HTMLInputElement>("contacto-correo").value = o.email ?? "ana@example.cl";
      $<HTMLInputElement>("contacto-empresa").value = "Pyme SpA";
      $<HTMLSelectElement>("contacto-intent").value = o.intent ?? "Web nueva";
      $<HTMLTextAreaElement>("contacto-detalle").value = o.detalle ?? "Necesito revisar mi checkout.";
      $<HTMLInputElement>("contacto-consent").checked = o.consent ?? true;
    };
    const submit = () => form.dispatchEvent(new w.Event("submit", { cancelable: true, bubbles: true }));
    return { w, doc, form, fetchMock, fill, submit, $ };
  }

  it("preselects intent as configured", () => {
    const { $ } = load();
    expect($<HTMLSelectElement>("contacto-intent").value).toBe(preset);
  });

  it("blocks submit without consent", () => {
    const { fetchMock, fill, submit, $ } = load();
    fill({ consent: false });
    submit();
    expect(fetchMock).not.toHaveBeenCalled();
    expect($("contacto-consent").getAttribute("aria-invalid")).toBe("true");
    expect($("contacto-consent-error").hidden).toBe(false);
    expect($("contacto-status").textContent).toMatch(/Revisa/);
  });

  it("blocks submit with message < 10 chars", () => {
    const { fetchMock, fill, submit, $ } = load();
    fill({ detalle: "hola     " });
    submit();
    expect(fetchMock).not.toHaveBeenCalled();
    expect($("contacto-detalle").getAttribute("aria-invalid")).toBe("true");
  });

  it("sends relay payload with source + intent, empresa inside message (fetch mocked)", async () => {
    const { fetchMock, fill, submit, $ } = load();
    fill({});
    submit();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(RELAY);
    expect(init.method).toBe("POST");
    const body = JSON.parse(init.body);
    expect(body).toMatchObject({
      name: "Ana Pérez",
      email: "ana@example.cl",
      source,
      intent: "Web nueva",
      consent: true,
      language: "es",
      _gotcha: "",
    });
    expect(body.source.length).toBeLessThanOrEqual(40);
    expect(body.message).toContain("Necesito revisar mi checkout.");
    expect(body.message).toContain("Empresa: Pyme SpA");
    expect(body.message.trim().length).toBeGreaterThanOrEqual(10);
    await vi.waitFor(() => expect($("contacto-status").textContent).toMatch(/Listo/));
    expect($("contacto-status").getAttribute("data-state")).toBe("ok");
  });

  it("shows accessible error when relay fails", async () => {
    const { fetchMock, fill, submit, $ } = load();
    fetchMock.mockReset();
    fetchMock.mockRejectedValue(new Error("offline"));
    fill({});
    submit();
    await vi.waitFor(() =>
      expect($("contacto-status").getAttribute("data-state")).toBe("error")
    );
    expect($("contacto-status").textContent).toContain("contacto@vientonorte.io");
  });
});
