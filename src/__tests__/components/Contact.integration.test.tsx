import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { Contact } from "@/components/organisms/Contact";
import { LanguageProvider } from "@/lib/LanguageContext";
import {
  clearContactSession,
  readContactSession,
  writeContactSession,
} from "@/lib/contact-draft-storage";
import { submitContactMessage } from "@/lib/submit-contact";

vi.mock("@/lib/submit-contact", () => ({
  submitContactMessage: vi.fn(),
}));

vi.mock("@/lib/analytics", () => ({
  analytics: {
    submitContactForm: vi.fn(),
    track: vi.fn(),
  },
}));

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const mockedSubmit = vi.mocked(submitContactMessage);

function renderContact(props: { contactDraft?: Parameters<typeof Contact>[0]["contactDraft"] } = {}) {
  return render(
    <MemoryRouter>
      <LanguageProvider>
        <Contact contactDraft={props.contactDraft ?? null} />
      </LanguageProvider>
    </MemoryRouter>
  );
}

function getTabPanel(tabName: RegExp) {
  const tab = screen.getByRole("tab", { name: tabName });
  const tabPanelId = tab.getAttribute("aria-controls");
  if (!tabPanelId) throw new Error(`Tab ${tabName} missing aria-controls`);
  const panel = document.getElementById(tabPanelId);
  if (!panel) throw new Error(`Tab panel ${tabPanelId} not found`);
  return within(panel);
}

function getFormPanel() {
  return getTabPanel(/Escribir directo/i);
}

function getAssistantPanel() {
  return getTabPanel(/Asistente/i);
}

describe("Contact integration — sessionStorage", () => {
  afterEach(() => {
    clearContactSession();
    vi.clearAllMocks();
  });

  it("restores name, email, message and active tab from sessionStorage with consent unchecked", () => {
    writeContactSession({
      name: "Rö Test",
      email: "ro@example.com",
      message: "Borrador restaurado desde sesión",
      activeTab: "form",
    });

    renderContact();

    expect(screen.getByRole("tab", { name: /Escribir directo/i })).toHaveAttribute(
      "data-state",
      "active"
    );

    const form = getFormPanel();
    expect(form.getByDisplayValue("Rö Test")).toBeInTheDocument();
    expect(form.getByDisplayValue("ro@example.com")).toBeInTheDocument();
    expect(form.getByDisplayValue("Borrador restaurado desde sesión")).toBeInTheDocument();

    const consentBoxes = screen.getAllByRole("checkbox", { name: /Ley 21\.719/i });
    expect(consentBoxes.length).toBeGreaterThan(0);
    consentBoxes.forEach((box) => expect(box).not.toBeChecked());
  });

  it("remount simulates reload and keeps restored draft", () => {
    writeContactSession({
      name: "Persist",
      email: "persist@example.com",
      message: "Sigue aquí tras remount",
      activeTab: "form",
    });

    const { unmount } = renderContact();
    unmount();
    renderContact();

    const form = getFormPanel();
    expect(form.getByDisplayValue("Persist")).toBeInTheDocument();
    expect(form.getByDisplayValue("persist@example.com")).toBeInTheDocument();
    expect(form.getByDisplayValue("Sigue aquí tras remount")).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /Escribir directo/i })).toHaveAttribute(
      "data-state",
      "active"
    );
  });

  it("prefers contactDraft message and assistant tab over session snapshot", () => {
    writeContactSession({
      name: "Sesión",
      email: "session@example.com",
      message: "Mensaje viejo en storage",
      activeTab: "form",
    });

    renderContact({
      contactDraft: {
        message: "Mensaje desde onboarding",
        source: "onboarding",
      },
    });

    expect(screen.getByRole("tab", { name: /Asistente/i })).toHaveAttribute("data-state", "active");

    const assistant = getAssistantPanel();
    expect(assistant.getByDisplayValue("Mensaje desde onboarding")).toBeInTheDocument();
  });
});

describe("Contact integration — persist debounce", () => {
  afterEach(() => {
    clearContactSession();
    vi.clearAllMocks();
  });

  it("persists edits to sessionStorage after debounce without consent", async () => {
    const user = userEvent.setup();
    renderContact();

    await user.click(screen.getByRole("tab", { name: /Escribir directo/i }));

    const form = getFormPanel();
    fireEvent.change(form.getByLabelText(/^Nombre/i), { target: { name: "name", value: "Ana" } });
    fireEvent.change(form.getByLabelText(/^Email/i), {
      target: { name: "email", value: "ana@example.com" },
    });
    fireEvent.change(form.getByLabelText(/^Mensaje/i), {
      target: { name: "message", value: "Consulta de integración" },
    });

    expect(readContactSession()).toBeNull();

    await waitFor(
      () => {
        expect(readContactSession()).toEqual(
          expect.objectContaining({
            name: "Ana",
            email: "ana@example.com",
            message: "Consulta de integración",
            activeTab: "form",
          })
        );
      },
      { timeout: 800 }
    );

    const raw = sessionStorage.getItem("vn-contact-session-v1");
    expect(raw).not.toContain("consent");
  });
});

describe("Contact integration — clear on submit", () => {
  afterEach(() => {
    clearContactSession();
    vi.clearAllMocks();
  });

  it("clears sessionStorage after successful direct form submit", async () => {
    mockedSubmit.mockResolvedValueOnce({ ok: true, channel: "google_forms" });

    writeContactSession({
      name: "Enviar",
      email: "enviar@example.com",
      message: "Mensaje listo para enviar",
      activeTab: "form",
    });

    const user = userEvent.setup();
    renderContact();

    const form = getFormPanel();
    await user.click(form.getByRole("checkbox", { name: /Ley 21\.719/i }));
    await user.click(form.getByRole("button", { name: /Enviar mensaje/i }));

    await waitFor(() => {
      expect(mockedSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Enviar",
          email: "enviar@example.com",
          message: "Mensaje listo para enviar",
          consent: true,
          source: "form",
        })
      );
    });

    await waitFor(
      () => {
        expect(readContactSession()).toBeNull();
      },
      { timeout: 800 }
    );
  });
});