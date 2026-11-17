import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockupGallery } from "@/components/molecules/MockupGallery";
import { LanguageProvider } from "@/lib/LanguageContext";

const items = [
  { src: "/images/a.png", alt: "A", label: "Captura A" },
  { src: "/images/b.png", alt: "B", label: "Captura B" },
  { src: "/images/c.png", alt: "C", label: "Captura C" },
];

function renderGallery(props: { maxVisible?: number }) {
  return render(
    <LanguageProvider>
      <MockupGallery mockups={items} language="es" embedded {...props} />
    </LanguageProvider>
  );
}

describe("MockupGallery", () => {
  it("muestra todas las capturas por defecto, sin Ver n capturas más", async () => {
    renderGallery({});
    expect(await screen.findByText("Captura A")).toBeInTheDocument();
    expect(screen.getByText("Captura B")).toBeInTheDocument();
    expect(screen.getByText("Captura C")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /capturas más/i })).toBeNull();
  });

  it("con maxVisible=1 oculta el resto detrás del expand", async () => {
    renderGallery({ maxVisible: 1 });
    expect(await screen.findByText("Captura A")).toBeInTheDocument();
    expect(screen.queryByText("Captura B")).toBeNull();
    expect(screen.getByRole("button", { name: /capturas más/i })).toBeInTheDocument();
  });

  it("el lightbox avanza con la flecha derecha, vuelve con Escape y devuelve el foco", async () => {
    const user = userEvent.setup();
    renderGallery({});
    const open = screen.getAllByRole("button", { name: "Ampliar imagen" })[0];
    await user.click(open);
    const dialog = await screen.findByRole("dialog");
    expect(dialog).toHaveTextContent("Captura A");
    await user.keyboard("{ArrowRight}");
    expect(dialog).toHaveTextContent("Captura B");
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});
