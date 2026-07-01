import { useEffect, useState, useCallback } from "react";

export interface ProcessNavSection {
  id: string;
  label: string;
  number: string;
}

function getScrollOffset(): number {
  const isSubpageOnly = document.documentElement.dataset.nav === "subpage";
  const header = isSubpageOnly ? null : document.querySelector('header[role="banner"]');
  const toolbar = document.querySelector(".subpage-toolbar");
  const mobileNav = document.querySelector(".process-nav-mobile");
  return (
    (header instanceof HTMLElement ? header.offsetHeight : 0) +
    (toolbar instanceof HTMLElement ? toolbar.offsetHeight : isSubpageOnly ? 56 : 56) +
    (mobileNav instanceof HTMLElement ? mobileNav.offsetHeight : 0) +
    12
  );
}

export function useProcessSectionSpy(sections: ProcessNavSection[]) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || "");
  const [visitedSections, setVisitedSections] = useState<Set<string>>(
    () => new Set(sections[0]?.id ? [sections[0].id] : [])
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + getScrollOffset();

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          setVisitedSections((prev) => new Set(prev).add(sections[i].id));
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const offset = getScrollOffset();
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }, []);

  return { activeSection, visitedSections, scrollToSection };
}