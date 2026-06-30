import { motion, useReducedMotion } from "motion/react";
import { FolderOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SectionHeader } from "../molecules/SectionHeader";
import { CaseStudyCard } from "../molecules/CaseStudyCard";
import { featuredCaseStudies } from "../../data/case-study-cards";

export function CaseStudiesGrid() {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="py-16 md:py-20 px-4 bg-muted/20"
      aria-labelledby="case-studies-grid-heading"
    >
      <div className="container max-w-7xl mx-auto">
        <SectionHeader
          badge="Casos visuales"
          badgeIcon={FolderOpen}
          title="Evidencia de impacto"
          description="Selección de proyectos con capturas reales, métricas y profundidad de caso. Toca para ver el estudio completo."
        />

        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1 }}
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {featuredCaseStudies.map((study, index) => (
            <CaseStudyCard
              key={study.id}
              title={study.title}
              company={study.company}
              description={study.description}
              image={study.image}
              tags={study.tags}
              metrics={study.metrics}
              index={index}
              onRead={() => navigate(`/proyecto/${study.id}`)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}