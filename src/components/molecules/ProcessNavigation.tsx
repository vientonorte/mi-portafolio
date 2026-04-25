import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Card } from '@vientonorte/ui/card';
import { CheckCircle2 } from "lucide-react";

interface ProcessNavigationProps {
  sections: {
    id: string;
    label: string;
    number: string;
  }[];
}

export function ProcessNavigation({ sections }: ProcessNavigationProps) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || "");
  const [visitedSections, setVisitedSections] = useState<Set<string>>(new Set([sections[0]?.id]));

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          // Mark as visited
          setVisitedSections(prev => new Set(prev).add(sections[i].id));
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="hidden xl:block fixed right-8 top-1/2 -translate-y-1/2 z-30"
    >
      <Card className="p-4 bg-background/95 backdrop-blur-lg border-2 shadow-xl max-w-[200px]">
        <nav aria-label="Process navigation">
          <ul className="space-y-3">
            {sections.map((section, index) => {
              const isActive = activeSection === section.id;
              const isVisited = visitedSections.has(section.id);
              return (
                <li key={section.id}>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left transition-all duration-300 group flex items-start gap-3 ${
                      isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                    aria-current={isActive ? "true" : undefined}
                    aria-label={`${section.label}${isVisited ? " - visitado" : ""}`}
                  >
                    {/* Number indicator with progress */}
                    <div className="relative flex-shrink-0">
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isActive
                            ? "bg-primary text-primary-foreground scale-110"
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
                      
                      {/* Pulsing effect for active */}
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 rounded-full bg-primary/30"
                          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </div>

                    {/* Label */}
                    <div className="flex-1 pt-1">
                      <span className={`text-xs font-medium leading-tight block ${
                        isActive ? "font-bold" : ""
                      }`}>
                        {section.label}
                      </span>
                    </div>
                  </button>

                  {/* Connector line with progress */}
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
  );
}