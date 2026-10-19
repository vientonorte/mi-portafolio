import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { ProcessNavSection } from "../hooks/useProcessSectionSpy";

type PageSectionsContextValue = {
  sections: ProcessNavSection[];
  setSections: (sections: ProcessNavSection[]) => void;
};

const PageSectionsContext = createContext<PageSectionsContextValue | null>(null);

export function PageSectionsProvider({ children }: { children: ReactNode }) {
  const [sections, setSections] = useState<ProcessNavSection[]>([]);
  const value = useMemo(() => ({ sections, setSections }), [sections]);
  return <PageSectionsContext.Provider value={value}>{children}</PageSectionsContext.Provider>;
}

export function usePageSections(): ProcessNavSection[] {
  return useContext(PageSectionsContext)?.sections ?? [];
}

/** Publica las secciones de la ficha para el menú móvil. No-op fuera del provider. */
export function useRegisterPageSections(sections: ProcessNavSection[]) {
  const ctx = useContext(PageSectionsContext);
  const key = sections.map((section) => `${section.id}:${section.number}:${section.label}`).join("|");
  const sectionsRef = useRef(sections);
  sectionsRef.current = sections;
  useEffect(() => {
    if (!ctx) return;
    ctx.setSections(sectionsRef.current);
    return () => ctx.setSections([]);
  }, [ctx, key]);
}
