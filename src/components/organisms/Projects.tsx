import { Briefcase } from "lucide-react";
import { SectionHeader } from "../molecules/SectionHeader";
import { EnhancedProjectCard } from "../molecules/EnhancedProjectCard";
import { StatCard } from "../molecules/StatCard";
import { Button } from "../ui/button";
import { FileText } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { allProjects } from "../../data/projects-data";

const stats = [
  { value: "3+", label: "Años experiencia Lead UX" },
  { value: "8+", label: "Proyectos completados" },
  { value: "G48", label: "Generación docente UX/UI" },
  { value: "100%", label: "Design Thinking aplicado" },
];

export function Projects({ onNavigateToCaseStudies }: { onNavigateToCaseStudies?: () => void }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section 
      id="proyectos" 
      className="py-20 md:py-28 px-4"
      aria-labelledby="projects-heading"
    >
      <div className="container max-w-7xl mx-auto">
        <SectionHeader
          badge="Portfolio"
          badgeIcon={Briefcase}
          title="Roles y Proyectos Destacados"
          description="Experiencia profesional organizada por empresa y rol. Cada proyecto incluye contexto empresarial, procesos aplicados y resultados medibles."
        />

        {/* Enhanced Projects Grid */}
        <div className="grid gap-8 md:gap-10">
          {allProjects.map((project, index) => (
            <EnhancedProjectCard key={index} {...project} index={index} />
          ))}
        </div>

        {/* CTA to Case Studies */}
        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center pt-12 md:pt-16"
        >
          <Button 
            size="lg" 
            className="bg-brand-gradient hover:opacity-90 transition-opacity group"
            onClick={onNavigateToCaseStudies}
          >
            <FileText className="mr-2 h-5 w-5 inline group-hover:scale-110 transition-transform" />
            Ver Casos de Estudio Completos
          </Button>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pt-12 md:pt-16">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} {...stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
