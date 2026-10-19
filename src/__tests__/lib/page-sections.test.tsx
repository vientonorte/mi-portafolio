import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import type { ProcessNavSection } from "@/hooks/useProcessSectionSpy";
import {
  PageSectionsProvider,
  usePageSections,
  useRegisterPageSections,
} from "@/lib/page-sections";

const sections: ProcessNavSection[] = [
  { id: "sobre-mi", number: "01", label: "Perfil" },
  { id: "habilidades", number: "02", label: "Método" },
];

function Register({ list }: { list: ProcessNavSection[] }) {
  useRegisterPageSections(list);
  return null;
}

function Readout() {
  const published = usePageSections();
  return <output>{published.map((section) => section.label).join("|")}</output>;
}

describe("page sections", () => {
  it("publica la ficha una vez y no reentra al cambiar el valor del contexto", () => {
    let reads = 0;
    function CountingReadout() {
      reads += 1;
      if (reads > 12) throw new Error("bucle de secciones");
      return <Readout />;
    }

    const view = render(
      <PageSectionsProvider>
        <Register list={sections} />
        <CountingReadout />
      </PageSectionsProvider>,
    );

    expect(document.querySelector("output")?.textContent).toBe("Perfil|Método");
    expect(reads).toBeLessThan(8);

    view.rerender(
      <PageSectionsProvider>
        <Register list={sections} />
        <CountingReadout />
      </PageSectionsProvider>,
    );
    expect(document.querySelector("output")?.textContent).toBe("Perfil|Método");
    expect(reads).toBeLessThan(12);
  });

  it("al desmontar vuelve a vacío", () => {
    const view = render(
      <PageSectionsProvider>
        <Register list={sections} />
        <Readout />
      </PageSectionsProvider>,
    );
    expect(document.querySelector("output")?.textContent).toBe("Perfil|Método");
    view.rerender(
      <PageSectionsProvider>
        <Readout />
      </PageSectionsProvider>,
    );
    expect(document.querySelector("output")?.textContent).toBe("");
  });
});
