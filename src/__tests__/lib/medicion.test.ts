import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  FIRST_TOUCH_KEY,
  attributionFields,
  getFirstTouch,
  parseUtm,
  recordFirstTouch,
} from "@/lib/utm";
import {
  EVENT_ALLOWLIST,
  UMAMI_SCRIPT_SRC,
  __resetTrackingForTests,
  buildPageViewProps,
  initTracking,
  sanitizeEventProps,
  track,
} from "@/lib/track";
import { buildServiciosPayload, type ServiciosContactValues } from "@/servicios/servicios-contact";
import { ctaClickFromTarget } from "@/servicios/servicios-cta";

const PII = {
  email: "ana@empresa.cl",
  correo: "ana@empresa.cl",
  name: "Ana Pérez",
  nombre: "Ana Pérez",
  message: "Hola, necesito una web",
  mensaje: "Hola, necesito una web",
  detalle: "Hola, necesito una web",
  phone: "+56 9 1234 5678",
  telefono: "+56 9 1234 5678",
};
const PII_VALUES = ["ana@empresa.cl", "Ana Pérez", "Hola, necesito una web", "+56 9 1234 5678"];
const PII_KEYS = Object.keys(PII);

function umamiScripts() {
  return document.querySelectorAll(`script[src="${UMAMI_SCRIPT_SRC}"]`);
}

beforeEach(() => {
  sessionStorage.clear();
  document.head.querySelectorAll("script").forEach((s) => s.remove());
  delete window.umami;
  __resetTrackingForTests();
});
afterEach(() => {
  vi.unstubAllEnvs();
});

describe("parseUtm", () => {
  it("lee utm_source, utm_medium y utm_campaign", () => {
    expect(parseUtm("?utm_source=google&utm_medium=cpc&utm_campaign=pymes_72h&gclid=x")).toEqual({
      utm_source: "google",
      utm_medium: "cpc",
      utm_campaign: "pymes_72h",
    });
  });
  it("acepta query sin '?' y devuelve vacíos si falta algo", () => {
    expect(parseUtm("utm_source=ig")).toEqual({ utm_source: "ig", utm_medium: "", utm_campaign: "" });
    expect(parseUtm("")).toEqual({ utm_source: "", utm_medium: "", utm_campaign: "" });
    expect(parseUtm(undefined)).toEqual({ utm_source: "", utm_medium: "", utm_campaign: "" });
  });
  it("descarta valores con email o teléfono y corta a 100 caracteres", () => {
    const p = parseUtm(`?utm_source=ana%40empresa.cl&utm_medium=%2B56912345678&utm_campaign=${"a".repeat(150)}`);
    expect(p.utm_source).toBe("");
    expect(p.utm_medium).toBe("");
    expect(p.utm_campaign).toHaveLength(100);
  });
});

describe("primer toque en sessionStorage", () => {
  it("guarda UTM + landing_path al aterrizar", () => {
    const t = recordFirstTouch({ pathname: "/servicios/", search: "?utm_source=google&utm_medium=cpc&utm_campaign=web" });
    expect(t).toEqual({ utm_source: "google", utm_medium: "cpc", utm_campaign: "web", landing_path: "/servicios/" });
    expect(JSON.parse(sessionStorage.getItem(FIRST_TOUCH_KEY)!)).toEqual(t);
  });
  it("no sobrescribe el primer toque de la sesión", () => {
    recordFirstTouch({ pathname: "/servicios/", search: "?utm_source=google&utm_medium=cpc&utm_campaign=web" });
    const second = recordFirstTouch({ pathname: "/", search: "?utm_source=instagram&utm_medium=social" });
    expect(second?.utm_source).toBe("google");
    expect(getFirstTouch()).toMatchObject({ utm_source: "google", landing_path: "/servicios/" });
  });
  it("un aterrizaje sin UTM también es primer toque (directo)", () => {
    recordFirstTouch({ pathname: "/servicios/", search: "" });
    recordFirstTouch({ pathname: "/servicios/", search: "?utm_source=tarde" });
    expect(getFirstTouch()).toEqual({ utm_source: "", utm_medium: "", utm_campaign: "", landing_path: "/servicios/" });
  });
  it("ignora datos corruptos y no rompe sin storage", () => {
    sessionStorage.setItem(FIRST_TOUCH_KEY, "{no json");
    expect(getFirstTouch()).toBeNull();
    expect(recordFirstTouch({ pathname: "/x", search: "" }, null)).toMatchObject({ landing_path: "/x" });
    expect(attributionFields(null)).toEqual({});
  });
});

describe("payload del formulario con UTM", () => {
  const values: ServiciosContactValues = {
    nombre: "Ana Pérez",
    correo: "ana@empresa.cl",
    empresa: "",
    intent: "Web nueva",
    detalle: "Necesito una web para mi pyme",
    consent: true,
    gotcha: "",
  };
  it("agrega utm_source, utm_medium, utm_campaign y landing_path desde sessionStorage", () => {
    recordFirstTouch({ pathname: "/servicios/", search: "?utm_source=google&utm_medium=cpc&utm_campaign=web72" });
    const p = buildServiciosPayload(values);
    expect(p).toMatchObject({
      utm_source: "google",
      utm_medium: "cpc",
      utm_campaign: "web72",
      landing_path: "/servicios/",
      source: "servicios",
      consent: true,
    });
  });
  it("sin primer toque el payload queda como antes", () => {
    const p = buildServiciosPayload(values);
    expect(p).not.toHaveProperty("utm_source");
    expect(p).not.toHaveProperty("landing_path");
  });
});

describe("track sin configuración", () => {
  it("no inyecta script ni falla", () => {
    vi.stubEnv("VITE_UMAMI_WEBSITE_ID", "");
    expect(() => {
      initTracking();
      track("cta_click", { ancla: "web-pymes", posicion: "opciones-1" });
      track("form_submit", { status: "success" });
    }).not.toThrow();
    expect(umamiScripts()).toHaveLength(0);
  });
  it("initTracking sin ID igual guarda el primer toque (atribución activa)", () => {
    vi.stubEnv("VITE_UMAMI_WEBSITE_ID", "");
    initTracking();
    expect(getFirstTouch()).not.toBeNull();
  });
});

describe("track con Umami", () => {
  it("inyecta un solo script defer con el ID y encola hasta que carga", () => {
    vi.stubEnv("VITE_UMAMI_WEBSITE_ID", "test-website-id");
    track("form_submit", { status: "error" });
    track("cta_click", { ancla: "revision-gratis", posicion: "caso-edu21" });
    const scripts = umamiScripts();
    expect(scripts).toHaveLength(1);
    const s = scripts[0] as HTMLScriptElement;
    expect(s.defer).toBe(true);
    expect(s.getAttribute("data-website-id")).toBe("test-website-id");
    expect(s.getAttribute("data-auto-track")).toBe("false");

    const calls: unknown[][] = [];
    window.umami = { track: (...a: unknown[]) => calls.push(a) };
    s.dispatchEvent(new Event("load"));
    expect(calls).toEqual([
      ["form_submit", { status: "error" }],
      ["cta_click", { ancla: "revision-gratis", posicion: "caso-edu21" }],
    ]);
  });
});

describe("ningún evento lleva PII", () => {
  it("el sanitizador solo deja claves de la allowlist", () => {
    for (const event of Object.keys(EVENT_ALLOWLIST)) {
      const out = sanitizeEventProps(event, { ...PII, path: "/servicios/", ancla: "web-pymes", posicion: "opciones-1", status: "success" })!;
      for (const k of Object.keys(out)) expect(EVENT_ALLOWLIST[event as keyof typeof EVENT_ALLOWLIST]).toContain(k);
      for (const k of PII_KEYS) expect(out).not.toHaveProperty(k);
      for (const v of PII_VALUES) expect(JSON.stringify(out)).not.toContain(v);
    }
  });
  it("descarta valores con email/teléfono incluso en claves permitidas y valores fuera del enum", () => {
    expect(sanitizeEventProps("page_view", { path: "/x?email=ana@empresa.cl", utm_source: "ana@empresa.cl", referrer: "+56 9 1234 5678" })).toEqual({ path: "/x" });
    expect(sanitizeEventProps("cta_click", { ancla: "otra", posicion: "ana@empresa.cl" })).toEqual({});
    expect(sanitizeEventProps("form_submit", { status: "ana@empresa.cl" })).toEqual({});
    expect(sanitizeEventProps("evento_libre", { email: "ana@empresa.cl" })).toBeNull();
  });
  it("lo que llega a Umami no contiene PII", () => {
    vi.stubEnv("VITE_UMAMI_WEBSITE_ID", "test-website-id");
    const calls: unknown[][] = [];
    window.umami = { track: (...a: unknown[]) => calls.push(a) };
    // @ts-expect-error — props con PII a propósito
    track("form_submit", { status: "success", ...PII });
    // @ts-expect-error — props con PII a propósito
    track("cta_click", { ancla: "consultoria-ux", posicion: "opciones-3", ...PII });
    // @ts-expect-error — props con PII a propósito
    track("page_view", { path: "/servicios/", ...PII });
    expect(calls).toHaveLength(3);
    const sent = JSON.stringify(calls);
    for (const v of PII_VALUES) expect(sent).not.toContain(v);
    for (const k of PII_KEYS) expect(sent).not.toContain(`"${k}"`);
  });
  it("page_view: ruta sin query, UTM y referrer solo como origen externo", () => {
    const p = buildPageViewProps(
      { pathname: "/servicios/", search: "?utm_source=google&utm_medium=cpc&utm_campaign=web&email=ana@empresa.cl", host: "vientonorte.io" },
      "https://www.google.com/search?q=ana%40empresa.cl"
    );
    expect(p).toEqual({ path: "/servicios/", utm_source: "google", utm_medium: "cpc", utm_campaign: "web", referrer: "https://www.google.com" });
    expect(buildPageViewProps({ pathname: "/", search: "", host: "vientonorte.io" }, "https://vientonorte.io/x").referrer).toBeUndefined();
  });
});

describe("cta_click en los CTAs reales de /servicios/", () => {
  it("mapea tarjeta y caso a {ancla, posicion}", () => {
    document.body.innerHTML = `
      <ol><li data-card="revision-gratis"><a href="#contacto" id="a1"><span id="s1">Pedir</span></a></li></ol>
      <a href="#consultoria-ux" data-case-cta="edu21" id="a2">Ver</a>
      <a href="#contacto" id="a3">Escríbenos</a>`;
    expect(ctaClickFromTarget(document.getElementById("s1"))).toEqual({ ancla: "revision-gratis", posicion: "opciones-2" });
    expect(ctaClickFromTarget(document.getElementById("a2"))).toEqual({ ancla: "consultoria-ux", posicion: "caso-edu21" });
    expect(ctaClickFromTarget(document.getElementById("a3"))).toBeNull();
  });
});
