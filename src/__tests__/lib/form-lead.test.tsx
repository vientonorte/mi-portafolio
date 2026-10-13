/** generate_lead de formularios (TL 13-oct): solo en 200, con form_id/topic/UTM y sin PII. */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ServiciosPage } from "@/servicios/ServiciosPage";
import { formLeadParams, trackFormLead } from "@/lib/form-lead";
import { FIRST_TOUCH_KEY } from "@/lib/utm";

type DL = Array<Record<string, unknown>>;
const dl = () => ((window as unknown as { dataLayer?: DL }).dataLayer ?? []);
const leads = () => dl().filter((e) => e.event === "generate_lead");
const PII = /ana@pyme\.cl|Ana Prueba|Necesito una web|\+56|@/;

beforeEach(() => {
  (window as unknown as { dataLayer: DL }).dataLayer = [];
  sessionStorage.setItem(
    FIRST_TOUCH_KEY,
    JSON.stringify({ utm_source: "linkedin", utm_medium: "social", utm_campaign: "web-pymes-oct26", landing_path: "/servicios/", ts: 1 })
  );
  Element.prototype.scrollIntoView = vi.fn();
});
afterEach(() => {
  sessionStorage.clear();
  vi.restoreAllMocks();
});

async function submitServicios(status: number, ok = status === 200) {
  vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(JSON.stringify({ ok }), { status }));
  render(<ServiciosPage />);
  fireEvent.click(screen.getByRole("link", { name: "Quiero mi web" }));
  fireEvent.change(screen.getByLabelText(/^Nombre/), { target: { value: "Ana Prueba" } });
  fireEvent.change(screen.getByLabelText(/^Correo/), { target: { value: "ana@pyme.cl" } });
  fireEvent.change(screen.getByLabelText(/^Cuéntanos más/), { target: { value: "Necesito una web para mi local" } });
  fireEvent.click(screen.getByLabelText(/Acepto que Viento Norte/));
  fireEvent.click(screen.getByRole("button", { name: "Enviar mensaje" }));
  await waitFor(() => expect(globalThis.fetch).toHaveBeenCalledTimes(1));
}

describe("generate_lead · /servicios/", () => {
  it("dispara una vez en HTTP 200 con form_id, topic y UTM, sin PII", async () => {
    await submitServicios(200);
    await waitFor(() => expect(leads()).toHaveLength(1));
    const ev = leads()[0];
    expect(ev).toMatchObject({ form_id: "servicios", topic: "Web nueva", utm_source: "linkedin", utm_campaign: "web-pymes-oct26" });
    expect(JSON.stringify(ev)).not.toMatch(PII);
    for (const k of ["name", "nombre", "email", "correo", "message", "detalle", "phone", "telefono"]) expect(ev).not.toHaveProperty(k);
  });

  it("no dispara en error (HTTP 400)", async () => {
    await submitServicios(400, false);
    await new Promise((r) => setTimeout(r, 50));
    expect(leads()).toHaveLength(0);
  });
});

describe("trackFormLead", () => {
  it("solo con status 200", () => {
    expect(trackFormLead(201, { formId: "home-contacto" })).toBe(false);
    expect(trackFormLead(undefined, { formId: "home-contacto" })).toBe(false);
    expect(leads()).toHaveLength(0);
    expect(trackFormLead(200, { formId: "home-contacto", topic: "accesibilidad" })).toBe(true);
    expect(leads()).toHaveLength(1);
  });
  it("descarta topic con aspecto de PII", () => {
    expect(formLeadParams({ formId: "x", topic: "ana@pyme.cl" }, null)).not.toHaveProperty("topic");
    expect(formLeadParams({ formId: "x", topic: "+56 9 1234 5678" }, null)).not.toHaveProperty("topic");
  });
});
