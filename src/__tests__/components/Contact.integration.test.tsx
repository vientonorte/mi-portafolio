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

function getTabPanel(tabName: RegExp) {
  const tab = screen.getByRole("tab", { name: tabName });
  const tabPanelId = tab.getAttribute("aria-controls");
  if (!tabPanelId) throw new Error(`Tab ${tabName} missing aria-controls`);
  const panel = document.getElementById(tabPanelId);
  if (!panel) throw new Error(`Tab panel ${tabPanelId} not found`);
  return within(panel);
}

function getFormPanelElement() {
  const formTab = screen.getByRole("tab", { name: /Escribir directo/i });
  const tabPanelId = formTab.getAttribute("aria-controls");
  if (!tabPanelId) throw new Error("Form tab missing aria-controls");
  const panel = document.getElementById(tabPanelId);
  if (!panel) throw new Error(`Tab panel ${tabPanelId} not found`);
  return panel;
}

function getFormPanel() {
  return within(getFormPanelElement());
}

function setControlledInputValue(input: HTMLInputElement | HTMLTextAreaElement, value: string) {
  fireEvent.change(input, { target: { name: input.name, value } });
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

  it("persists message edits after debounce without consent", async () => {
    writeContactSession({
      name: "Ana",
      email: "ana@example.com",
      message: "Borrador anterior",
      activeTab: "form",
    });

    renderContact();

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

    const panel = getFormPanelElement();
    setControlledInputValue(panel.querySelector("#message") as HTMLTextAreaElement, "");

    await waitFor(() => expect(readContactSession()).toBeNull(), { timeout: 1000 });
  });

  it("keeps shared message when switching tabs", async () => {
    const user = userEvent.setup();
    renderContact();

    const panel = getFormPanelElement();
    setControlledInputValue(
      panel.querySelector("#message") as HTMLTextAreaElement,
      "Mensaje compartido entre tabs"
    );

    await user.click(screen.getByRole("tab", { name: /Asistente/i }));
    await user.click(screen.getByRole("tab", { name: /Escribir directo/i }));

    expect(
      getFormPanel().getByDisplayValue("Mensaje compartido entre tabs")
    ).toBeInTheDocument();
  });
});