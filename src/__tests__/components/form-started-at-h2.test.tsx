/**
 * H2 · los tres formularios mandan `formStartedAt` (epoch ms del montaje, > 0)
 * y el front NO bloquea un envío antes de 3 s: el mínimo de llenado lo aplica
 * solo el worker (CONTACT_MIN_FILL_MS).
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { Contact } from "@/components/organisms/Contact";
import { ContactAssistant } from "@/components/organisms/ContactAssistant";
import { ServiciosPage } from "@/servicios/ServiciosPage";
import { LanguageProvider } from "@/lib/LanguageContext";
import { clearContactSession, writeContactSession } from "@/lib/contact-draft-storage";
import type { ContactPayload, ContactSubmitResult } from "@/lib/submit-contact";

const submitMock = vi.hoisted(() =>
  vi.fn(async (): Promise<ContactSubmitResult> => ({ ok: true, channel: "worker", workerConfirmed: true }))
);

vi.mock("@/lib/submit-contact", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/lib/submit-contact")>()),
  submitContactMessage: submitMock,
}));

vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

afterEach(() => {
  clearContactSession();
  vi.clearAllMocks();
  vi.restoreAllMocks();
});

function expectStartedAtBeforeSubmit(payload: { formStartedAt?: number }, renderedAt: number) {
  expect(typeof payload.formStartedAt).toBe("number");
  expect(payload.formStartedAt).toBeGreaterThan(0);
  expect(payload.formStartedAt).toBeGreaterThanOrEqual(renderedAt);
  // Enviado en < 3 s desde el montaje y el front igual lo dejó pasar.
  expect(Date.now() - (payload.formStartedAt as number)).toBeLessThan(3000);
}

describe("H2 · formStartedAt en el payload del front", () => {
  it("Contact (formulario clásico): manda formStartedAt > 0 y no bloquea antes de 3 s", async () => {
    writeContactSession({
      name: "Ana Prueba",
      email: "ana@empresa.test",
      message: "Quiero una auditoría de accesibilidad.",
      activeTab: "form",
    });
    const renderedAt = Date.now();
    render(
      <MemoryRouter>
        <LanguageProvider>
          <Contact contactDraft={null} />
        </LanguageProvider>
      </MemoryRouter>
    );
    const user = userEvent.setup();
    const preferForm = screen.queryByRole("button", { name: /Prefiero el formulario clásico/i });
    if (preferForm) await user.click(preferForm);

    // El panel se vuelve a montar tras restaurar la sesión: re-consultar siempre.
    const getForm = () => {
      const form = screen.getByDisplayValue("Quiero una auditoría de accesibilidad.").closest("form");
      if (!form) throw new Error("Contact form not found");
      return within(form);
    };
    await user.click(getForm().getByRole("checkbox", { name: /Ley 21\.719/i }));
    await waitFor(() =>
      expect(getForm().getByRole("checkbox", { name: /Ley 21\.719/i })).toHaveAttribute("aria-checked", "true")
    );
    await user.click(getForm().getByRole("button", { name: "Enviar mensaje" }));

    await waitFor(() => expect(submitMock).toHaveBeenCalledTimes(1));
    const payload = submitMock.mock.calls[0][0] as unknown as ContactPayload;
    expect(payload.source).toBe("form");
    expectStartedAtBeforeSubmit(payload, renderedAt);
  });

  it("ContactAssistant: manda formStartedAt > 0 y no bloquea antes de 3 s", async () => {
    const submit = vi.fn(
      async (_p: ContactPayload): Promise<ContactSubmitResult> => ({ ok: true, channel: "worker", workerConfirmed: true })
    );
    const renderedAt = Date.now();
    render(
      <MemoryRouter>
        <LanguageProvider>
          <ContactAssistant
            contactDraft={{ source: "onboarding", message: "Quiero una auditoría de accesibilidad." }}
            submit={submit}
            sharedIdentity={{ name: "Ana Prueba", email: "ana@empresa.test", consent: true }}
            onIdentityChange={() => {}}
            sharedMessage="Quiero una auditoría de accesibilidad."
            onMessageChange={() => {}}
            gotcha=""
            onGotchaChange={() => {}}
          />
        </LanguageProvider>
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole("button", { name: "Enviar mensaje" }));

    await waitFor(() => expect(submit).toHaveBeenCalledTimes(1));
    const payload = submit.mock.calls[0][0];
    expect(payload.source).toBe("assistant");
    expectStartedAtBeforeSubmit(payload, renderedAt);
  });

  it("ServiciosContactForm (/servicios/): manda formStartedAt > 0 y no bloquea antes de 3 s", async () => {
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 }));
    Element.prototype.scrollIntoView = vi.fn();
    const renderedAt = Date.now();
    render(<ServiciosPage />);
    fireEvent.click(screen.getByRole("link", { name: "Quiero mi web" }));
    fireEvent.change(screen.getByLabelText(/^Nombre/), { target: { value: "Ana" } });
    fireEvent.change(screen.getByLabelText(/^Correo/), { target: { value: "ana@pyme.cl" } });
    fireEvent.change(screen.getByLabelText(/^Cuéntanos más/), {
      target: { value: "Necesito una web para mi local" },
    });
    fireEvent.click(screen.getByLabelText(/Acepto que Viento Norte/));
    fireEvent.click(screen.getByRole("button", { name: "Enviar mensaje" }));

    await waitFor(() => expect(fetchSpy).toHaveBeenCalledTimes(1));
    const body = JSON.parse(String((fetchSpy.mock.calls[0][1] as RequestInit).body));
    expect(body.source).toBe("servicios");
    expectStartedAtBeforeSubmit(body, renderedAt);
  });
});
