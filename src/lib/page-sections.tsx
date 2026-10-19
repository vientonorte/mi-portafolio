import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { ProcessNavSection } from "../hooks/useProcessSectionSpy";

type PageSectionsContextValue = {
  sections: ProcessNavSection[];
  setSections: (sections: ProcessNavSection[]) => void;
};

const PageSectionsContext = createContext<PageSectionsContextValue | null>(null);

function sectionKey(sections: ProcessNavSection[]) {
  return sections.map((section) => `${section.id}:${section.number}:${section.label}`).join("|");
}

export function PageSectionsProvider({ children }: { children: ReactNode }) {
  const [sections, setSectionsState] = useState<ProcessNavSection[]>([]);
  const setSections = useCallback((next: ProcessNavSection[]) => {
    setSectionsState((prev) => (sectionKey(prev) === sectionKey(next) ? prev : next));
  }, []);
  const value = useMemo(() => ({ sections, setSections }), [sections, setSections]);
  return <PageSectionsContext.Provider value={value}>{children}</PageSectionsContext.Provider>;
}

export function usePageSections(): ProcessNavSection[] {
  return useContext(PageSectionsContext)?.sections ?? [];
}

/** Publica las secciones de la ficha para el menú móvil. No-op fuera del provider. */
export function useRegisterPageSections(sections: ProcessNavSection[]) {
  const setSections = useContext(PageSectionsContext)?.setSections;
  const key = sectionKey(sections);
  const sectionsRef = useRef(sections);
  sectionsRef.current = sections;
  useEffect(() => {
    if (!setSections) return;
    setSections(sectionsRef.current);
    return () => setSections([]);
  }, [setSections, key]);
}
