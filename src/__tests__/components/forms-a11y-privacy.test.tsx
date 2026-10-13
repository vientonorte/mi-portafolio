/**
 * QA formularios 13-oct: foco al primer error, describedby del consentimiento, aria-live,
 * aviso de privacidad exacto con enlace a /privacidad/, consentimiento NO premarcado.
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { Contact } from "@/components/organisms/Contact";
import { ServiciosPage } from "@/servicios/ServiciosPage";
import { RubroPage } from "@/rubros/RubroPage";
import { RUBRO_SLUGS } from "@/rubros/rubros-content";
import { LanguageProvider } from "@/lib/LanguageContext";
import { clearContactSession } from "@/lib/contact-draft-storage";
import { CONTACT_SUCCESS_MESSAGE } from "@/components/molecules/PrivacyNotice";
import type { ContactSubmitResult } from "@/lib/submit-contact";

const NOTICE =
  "Usamos tus datos solo para responder a tu solicitud. No los compartimos con terceros ni los usamos para publicidad. Puedes pedir acceso, rectificación o eliminación en cualquier momento escribiendo a contacto@vientonorte.io. Más detalles en nuestra Política de privacidad (Ley 21.719).";

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
  sessionStorage.clear();
  vi.clearAllMocks();
});

function renderHomeForm() {
  render(
    <MemoryRouter>
      <LanguageProvider>
        <Contact contactDraft={null} />
      </LanguageProvider>
    </MemoryRouter>
  );
  const btn = screen.getByRole("button", { name: /Prefiero el formulario clásico/i });
  fireEvent.click(btn);
  // El panel se vuelve a montar al escribir (sesión): re-consultar el form en cada acceso.
  const scope = () => within(document.getElementById("name")!.closest("form") as HTMLElement);
  return {
    getByRole: (...a: Parameters<ReturnType<typeof scope>["getByRole"]>) => scope().getByRole(...a),
  };
}

function expectNotice(scope: HTMLElement) {
  const notices = scope.querySelectorAll("[data-privacy-notice]");
  expect(notices.length).toBeGreaterThan(0);
  notices.forEach((n) => {
    expect(n.textContent).toBe(NOTICE);
    const link = within(n as HTMLElement).getByRole("link", { name: "Política de privacidad" });
    expect(link.getAttribute("href")).toBe("/privacidad/");
  });
}

describe("F1 home · formulario clásico", () => {
  it("foco al primer campo con error y describedby en el consentimiento", async () => {
    const f = renderHomeForm();
    fireEvent.change(document.getElementById("name")!, { target: { value: "Ana" } });
    fireEvent.click(f.getByRole("button", { name: "Enviar mensaje" }));
    await waitFor(() => expect(document.activeElement?.id).toBe("email"));
    const consent = () => f.getByRole("checkbox");
    expect(consent()).toHaveAttribute("aria-invalid", "true");
    expect(consent()).toHaveAttribute("aria-describedby", "consent-error");
    expect(document.getElementById("consent-error")?.textContent).toBeTruthy();
    expect(f.getByRole("alert")).toHaveAttribute("aria-live", "assertive");
    expect(f.getByRole("alert").textContent).not.toBe("");
  });

  it("el consentimiento NO viene premarcado", () => {
    const f = renderHomeForm();
    expect(f.getByRole("checkbox")).toHaveAttribute("aria-checked", "false");
  });

  it("anuncia éxito con aria-live polite y el texto exacto", async () => {
    const user = userEvent.setup();
    const f = renderHomeForm();
    fireEvent.change(document.getElementById("name")!, { target: { value: "Ana Prueba" } });
    fireEvent.change(document.getElementById("email")!, { target: { value: "ana@empresa.test" } });
    fireEvent.change(document.getElementById("message")!, { target: { value: "Quiero una auditoría de accesibilidad." } });
    await user.click(f.getByRole("checkbox"));
    await user.click(f.getByRole("button", { name: "Enviar mensaje" }));
    await waitFor(() => expect(submitMock).toHaveBeenCalledTimes(1));
    expect(f.getByRole("status")).toHaveAttribute("aria-live", "polite");
    await waitFor(() => expect(f.getByRole("status").textContent).toBe(CONTACT_SUCCESS_MESSAGE));
  });

  it("aviso de privacidad exacto con enlace a /privacidad/", () => {
    renderHomeForm();
    expectNotice(document.body);
    document.querySelectorAll("a[data-privacy-link]").forEach((a) => {
      expect(a.getAttribute("href")).toBe("/privacidad/");
    });
  });
});

describe("/servicios/ y rubros", () => {
  it("/servicios/: consentimiento sin premarcar y aviso exacto", () => {
    render(<ServiciosPage />);
    expect(screen.getByLabelText(/Acepto que Viento Norte/)).not.toBeChecked();
    expectNotice(document.body);
  });

  it("/servicios/: éxito con el texto exacto", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 }));
    Element.prototype.scrollIntoView = vi.fn();
    render(<ServiciosPage />);
    fireEvent.click(screen.getByRole("link", { name: "Quiero mi web" }));
    fireEvent.change(screen.getByLabelText(/^Nombre/), { target: { value: "Ana" } });
    fireEvent.change(screen.getByLabelText(/^Correo/), { target: { value: "ana@pyme.cl" } });
    fireEvent.change(screen.getByLabelText(/^Cuéntanos más/), { target: { value: "Necesito una web para mi local" } });
    fireEvent.click(screen.getByLabelText(/Acepto que Viento Norte/));
    fireEvent.click(screen.getByRole("button", { name: "Enviar mensaje" }));
    await waitFor(() => expect(screen.getByText(CONTACT_SUCCESS_MESSAGE)).toBeInTheDocument());
    expect(sessionStorage.getItem("vn_entry_anchor")).toBe("#web-pymes");
  });

  it("rubro: consentimiento sin premarcar y aviso exacto", () => {
    render(<RubroPage slug={RUBRO_SLUGS[0]} />);
    expect(screen.getByLabelText(/Acepto que Viento Norte/)).not.toBeChecked();
    expectNotice(document.body);
  });
});
