import { motion, useReducedMotion } from "motion/react";
import { Card } from "../ui/card";
import { CheckCircle2 } from "lucide-react";
import {
  useProcessSectionSpy,
  type ProcessNavSection,
} from "../../hooks/useProcessSectionSpy";

interface ProcessNavigationProps {
  sections: ProcessNavSection[];
  mobileAriaLabel?: string;
}

export function ProcessNavigation({ sections, mobileAriaLabel }: ProcessNavigationProps) {
  const { activeSection, visitedSections, scrollToSection } = useProcessSectionSpy(sections);
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      {/* Mobile: sticky horizontal section nav */}
      <nav
        className="process-nav-mobile lg:hidden sticky z-40 border-b border-border/50 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/85"
        style={{ top: "var(--process-nav-mobile-top, 3.25rem)" }}
        aria-label={mobileAriaLabel ?? "Secciones de la página"}
      >
        <div className="container max-w-7xl mx-auto px-2 py-2">
          <ul className="flex gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory">
            {sections.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <li key={section.id} className="shrink-0 snap-start">
                  <button
                    type="button"
                    onClick={() => scrollToSection(section.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)] motion-reduce:transition-none ${
                      isActive
                        ? "border-primary bg-primary text-primary-foreground shadow-sm"
                        : "border-border/70 bg-muted/40 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                    }`}
                  >
                    <span className="font-bold tabular-nums">{section.number}</span>
                    <span>{section.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Desktop: lateral TOC */}
      <motion.div
        initial={
          prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 16 }
        }
        animate={{ opacity: 1, x: 0 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 0.25, ease: [0.4, 0, 0.2, 1], delay: 0.15 }
        }
        className="hidden lg:block fixed right-6 top-1/2 z-30 -translate-y-1/2"
      >
        <Card className="p-4 bg-background/95 backdrop-blur-lg border-2 shadow-xl max-w-[200px]">
          <nav aria-label={mobileAriaLabel ?? "Process navigation"}>
            <ul className="space-y-3">
              {sections.map((section, index) => {
                const isActive = activeSection === section.id;
                const isVisited = visitedSections.has(section.id);
                return (
                  <li key={section.id}>
                    <button
                      type="button"
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left group flex items-start gap-3 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)] motion-reduce:transition-none ${
                        isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                      }`}
                      aria-current={isActive ? "true" : undefined}
                      aria-label={`${section.label}${isVisited ? " - visitado" : ""}`}
                    >
                      <div className="relative flex-shrink-0">
                        <div
                          className={`h-8 w-8 rounded-full flex items-center justify-center transition-[background-color,color,transform] duration-[var(--duration-base)] ease-[var(--ease-out)] motion-reduce:transition-none motion-reduce:transform-none ${
                            isActive
                              ? "bg-primary text-primary-foreground scale-110 motion-reduce:scale-100"
                              : isVisited
                              ? "bg-primary/20 text-primary"
                              : "bg-muted text-muted-foreground group-hover:bg-primary/20"
                          }`}
                        >
                          {isVisited && !isActive ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : (
                            <span className="text-xs font-bold">{section.number}</span>
                          )}
                        </div>

                        {isActive && (
                          <motion.div
                            className="absolute inset-0 rounded-full bg-primary/30"
                            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                      </div>

                      <div className="flex-1 pt-1">
                        <span
                          className={`text-xs font-medium leading-tight block ${
                            isActive ? "font-bold" : ""
                          }`}
                        >
                          {section.label}
                        </span>
                      </div>
                    </button>

                    {index < sections.length - 1 && (
                      <div className="ml-4 my-1 h-4 w-0.5 relative bg-border overflow-hidden">
                        {isVisited && (
                          <motion.div
                            className="absolute inset-0 bg-primary/50"
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ duration: 0.5 }}
                            style={{ transformOrigin: "top" }}
                          />
                        )}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </Card>
      </motion.div>
    </>
  );
}