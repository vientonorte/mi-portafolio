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

function renderContact(props: { contactDraft?: Parameters<typeof Contact>[0]["contactDraft"] } = {}) {
  return render(
    <MemoryRouter>
      <LanguageProvider>
        <Contact contactDraft={props.contactDraft ?? null} />
      </LanguageProvider>
    </MemoryRouter>
  );
}

/** P1 UI: no Radix TabsList — toggle via preferForm / preferAssistant */
async function switchToForm(user = userEvent.setup()) {
  const preferForm = screen.queryByRole("button", {
    name: /Prefiero el formulario clásico/i,
  });
  if (preferForm) {
    await user.click(preferForm);
  }
}

async function switchToAssistant(user = userEvent.setup()) {
  const preferAssistant = screen.queryByRole("button", {
    name: /Volver al asistente guiado/i,
  });
  if (preferAssistant) {
    await user.click(preferAssistant);
  }
}

function getFormPanelElement() {
  // Form panel always force-mounted; fields visible when activeTab=form
  const message = screen.getByLabelText(/mensaje|message/i);
  const form = message.closest("form");
  if (!form) throw new Error("Contact form not found");
  return form;
}

function getFormPanel() {
  return within(getFormPanelElement());
}

function setControlledInputValue(input: HTMLInputElement | HTMLTextAreaElement, value: string) {
  fireEvent.change(input, { target: { name: input.name, value } });
}

describe("Contact integration — sessionStorage", () => {
  afterEach(() => {
    clearContactSession();
    vi.clearAllMocks();
  });

  it("restores name, email, message and active tab from sessionStorage with consent unchecked", async () => {
    writeContactSession({
      name: "Rö Test",
      email: "ro@example.com",
      message: "Borrador restaurado desde sesión",
      activeTab: "form",
    });

    renderContact();
    await switchToForm();

    expect(screen.getByText(/^Escribir directo$/i)).toBeInTheDocument();

    const form = getFormPanel();
    expect(form.getByDisplayValue("Rö Test")).toBeInTheDocument();
    expect(form.getByDisplayValue("ro@example.com")).toBeInTheDocument();
    expect(form.getByDisplayValue("Borrador restaurado desde sesión")).toBeInTheDocument();

    const consentBoxes = screen.getAllByRole("checkbox", { name: /Ley 21\.719/i });
    expect(consentBoxes.length).toBeGreaterThan(0);
    consentBoxes.forEach((box) => expect(box).not.toBeChecked());
  });

  it("remount simulates reload and keeps restored draft", async () => {
    writeContactSession({
      name: "Persist",
      email: "persist@example.com",
      message: "Sigue aquí tras remount",
      activeTab: "form",
    });

    const { unmount } = renderContact();
    unmount();
    renderContact();
    await switchToForm();

    const form = getFormPanel();
    expect(form.getByDisplayValue("Persist")).toBeInTheDocument();
    expect(form.getByDisplayValue("persist@example.com")).toBeInTheDocument();
    expect(form.getByDisplayValue("Sigue aquí tras remount")).toBeInTheDocument();
    expect(screen.getByText(/^Escribir directo$/i)).toBeInTheDocument();
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

    expect(screen.getByText(/^Asistente$/i)).toBeInTheDocument();
    // forceMount keeps both panels; shared message appears in assistant + form
    expect(
      screen.getAllByDisplayValue("Mensaje desde onboarding").length
    ).toBeGreaterThan(0);
  });
});

describe("Contact integration — persist debounce", () => {
  afterEach(() => {
    clearContactSession();
    vi.clearAllMocks();
  });

  it("persists message edits after debounce without consent", async () => {
    writeContactSession({
      name: "Ana",
      email: "ana@example.com",
      message: "Borrador anterior",
      activeTab: "form",
    });

    renderContact();
    await switchToForm();

    const panel = getFormPanelElement();
    setControlledInputValue(
      panel.querySelector("#message") as HTMLTextAreaElement,
      "Consulta de integración actualizada"
    );

    await waitFor(
      () => {
        expect(readContactSession()).toEqual(
          expect.objectContaining({
            name: "Ana",
            email: "ana@example.com",
            message: "Consulta de integración actualizada",
            activeTab: "form",
          })
        );
      },
      { timeout: 1000 }
    );

    const raw = sessionStorage.getItem("vn-contact-session-v1");
    expect(raw).not.toContain("consent");
  });
});

describe("Contact integration — clear on empty", () => {
  afterEach(() => {
    clearContactSession();
    vi.clearAllMocks();
  });

  it("clears sessionStorage when message is cleared and identity is empty", async () => {
    writeContactSession({
      name: "",
      email: "",
      message: "Mensaje temporal",
      activeTab: "form",
    });

    renderContact();
    await switchToForm();

    const panel = getFormPanelElement();
    setControlledInputValue(panel.querySelector("#message") as HTMLTextAreaElement, "");

    await waitFor(() => expect(readContactSession()).toBeNull(), { timeout: 1000 });
  });

  it("keeps shared message when switching modes", async () => {
    const user = userEvent.setup();
    renderContact();
    await switchToForm(user);

    const panel = getFormPanelElement();
    setControlledInputValue(
      panel.querySelector("#message") as HTMLTextAreaElement,
      "Mensaje compartido entre modos"
    );

    await switchToAssistant(user);
    await switchToForm(user);

    expect(getFormPanel().getByDisplayValue("Mensaje compartido entre modos")).toBeInTheDocument();
  });
});
