/**
 * H2 · anti-bot + conversiones (frontend).
 * - El formulario manda `formStartedAt` al worker (tiempo mínimo de llenado).
 * - `workerConfirmed` solo es true con HTTP 200 + ok del worker.
 * - Las conversiones GA4/Ads (submit_contact_form success, generate_lead,
 *   book_call, conversión Ads) solo se disparan tras la confirmación del worker.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { submitContactMessage } from "@/lib/submit-contact";
import { buildServiciosPayload } from "@/servicios/servicios-contact";

type DL = Array<Record<string, unknown>>;
const events = () =>
  ((window.dataLayer ?? []) as DL)
    .filter((e) => e && typeof e === "object" && "event" in e)
    .map((e) => e.event);

// Import dinámico por variable: así el archivo carga aunque el módulo aún no
// exista (permite contar los tests que fallan sobre main sin el fix).
const CONVERSION_MODULE = "../../lib/contact-conversion";
async function loadConversion(): Promise<{
  trackContactSubmitted: (
    result: { ok: boolean; channel?: string; workerConfirmed?: boolean },
    lead?: Record<string, string> | null
  ) => boolean;
}> {
  return import(/* @vite-ignore */ CONVERSION_MODULE);
}

const PAYLOAD = {
  name: "Ana Prueba",
  email: "ana@empresa.test",
  message: "Quiero una auditoría de accesibilidad.",
  consent: true,
  formStartedAt: 1_700_000_000_000,
};

function workerBody(): Record<string, unknown> {
  const call = (globalThis.fetch as unknown as ReturnType<typeof vi.fn>).mock.calls.find(
    ([url]) => String(url).includes("/api/contact")
  );
  return JSON.parse(String((call?.[1] as RequestInit).body));
}

beforeEach(() => {
  window.dataLayer = [];
  HTMLFormElement.prototype.submit = vi.fn();
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  vi.resetModules();
});

describe("H2 · submitContactMessage", () => {
  it("manda formStartedAt al worker y marca workerConfirmed con 200 + ok", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 }))
    );
    const result = await submitContactMessage(PAYLOAD);
    expect(workerBody().formStartedAt).toBe(PAYLOAD.formStartedAt);
    expect(result.ok).toBe(true);
    expect(result.workerConfirmed).toBe(true);
  });

  it("si el worker responde 429, workerConfirmed es false aunque otro canal entregue", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: false }), { status: 429 }))
    );
    const result = await submitContactMessage(PAYLOAD);
    expect(result.workerConfirmed).not.toBe(true);
  });

  it("honeypot: sin red y sin confirmación del worker", async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);
    const result = await submitContactMessage({ ...PAYLOAD, _gotcha: "x" });
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(result.workerConfirmed).not.toBe(true);
  });
});

describe("H2 · conversiones del formulario solo tras 200 del worker", () => {
  it("sin confirmación del worker no dispara submit_contact_form success ni generate_lead", async () => {
    const { trackContactSubmitted } = await loadConversion();
    const fired = trackContactSubmitted(
      { ok: true, channel: "google_forms", workerConfirmed: false },
      { lead_type: "free_a11y", channel: "contact_form", origin: "contact_assistant" }
    );
    expect(fired).toBe(false);
    expect(events()).not.toContain("generate_lead");
    expect(
      ((window.dataLayer ?? []) as DL).some(
        (e) => e.event === "submit_contact_form" && e.success === true
      )
    ).toBe(false);
  });

  it("con confirmación del worker dispara submit_contact_form success y generate_lead", async () => {
    const { trackContactSubmitted } = await loadConversion();
    const fired = trackContactSubmitted(
      { ok: true, channel: "worker", workerConfirmed: true },
      { lead_type: "free_a11y", channel: "contact_form", origin: "contact_assistant" }
    );
    expect(fired).toBe(true);
    expect(events()).toContain("generate_lead");
    expect(events()).toContain("submit_contact_form");
  });
});

describe("H2 · booking: book_call y conversión Ads solo con respuesta OK del worker", () => {
  it("worker 429 → sin book_call, sin conversión Ads, sin onConfirmed", async () => {
    vi.stubEnv("VITE_GOOGLE_ADS_CONVERSION_ID", "AW-1/abc");
    const gtag = vi.fn();
    window.gtag = gtag;
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("{}", { status: 429 })));
    const onConfirmed = vi.fn();
    const { recordBookingIntent } = await import("@/lib/vn-booking");
    await recordBookingIntent({ origin: "test", onConfirmed });
    expect(events()).not.toContain("book_call");
    expect(gtag.mock.calls.some((c) => c[1] === "conversion")).toBe(false);
    expect(onConfirmed).not.toHaveBeenCalled();
    vi.unstubAllEnvs();
  });

  it("worker 201 → book_call + conversión Ads + onConfirmed", async () => {
    vi.stubEnv("VITE_GOOGLE_ADS_CONVERSION_ID", "AW-1/abc");
    const gtag = vi.fn();
    window.gtag = gtag;
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("{}", { status: 201 })));
    const onConfirmed = vi.fn();
    const { recordBookingIntent } = await import("@/lib/vn-booking");
    await recordBookingIntent({ origin: "test", onConfirmed });
    expect(events()).toContain("book_call");
    expect(gtag.mock.calls.some((c) => c[1] === "conversion")).toBe(true);
    expect(onConfirmed).toHaveBeenCalledTimes(1);
    vi.unstubAllEnvs();
  });
});

describe("H2 · servicios", () => {
  it("buildServiciosPayload incluye formStartedAt", () => {
    const p = buildServiciosPayload(
      {
        nombre: "Ana",
        correo: "ana@pyme.test",
        empresa: "",
        intent: "Web nueva",
        detalle: "Necesito una web para mi local",
        consent: true,
        gotcha: "",
      },
      "servicios",
      null,
      1_700_000_000_000
    );
    expect(p).toMatchObject({ formStartedAt: 1_700_000_000_000 });
  });
});
