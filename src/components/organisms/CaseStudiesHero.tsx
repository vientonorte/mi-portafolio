import { motion } from "motion/react";
import { SectionBadge } from "../atoms/SectionBadge";
import { Button } from "../ui/button";
import { FileText, Filter } from "lucide-react";

interface CaseStudiesHeroProps {
  onFilterChange?: (filter: string) => void;
  activeFilter?: string;
}

const filters = [
  { id: "all", label: "Todos" },
  { id: "research", label: "Research" },
  { id: "design", label: "Diseño" },
  { id: "testing", label: "Testing" },
  { id: "strategy", label: "Estrategia" },
];

export function CaseStudiesHero({ onFilterChange, activeFilter = "all" }: CaseStudiesHeroProps) {
  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-muted/30 to-background">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center space-y-6 md:space-y-8 mb-12 md:mb-16 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SectionBadge icon={FileText}>Casos de Estudio</SectionBadge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Proyectos que Transformaron Experiencias
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto"
          >
            Casos de estudio detallados de proyectos UX que generaron impacto medible en
            métricas de negocio y satisfacción de usuarios.
          </motion.p>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-3 flex-wrap"
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Filter className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Filtrar por:</span>
            <span className="sm:hidden">Filtrar:</span>
          </div>
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterChange?.(filter.id)}
              className="transition-all"
            >
              {filter.label}
            </Button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}