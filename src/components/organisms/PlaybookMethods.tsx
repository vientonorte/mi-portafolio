import { memo } from "react";
import { motion } from "motion/react";
import { SectionHeader } from "../molecules/SectionHeader";
import { SectionBadge } from "../atoms/SectionBadge";
import { MethodCard } from "../molecules/MethodCard";
import { MethodBadge } from "../atoms/MethodBadge";
import { 
  Search, 
  Users, 
  Lightbulb, 
  TestTube, 
  Target,
  Repeat,
  Sparkles,
  BookOpen
} from "lucide-react";

const methodologies = [
  {
    icon: Search,
    title: "User Research",
    description: "Investigación profunda para entender necesidades y comportamientos de usuarios.",
    steps: [
      "Entrevistas en profundidad con usuarios",
      "Análisis de datos cualitativos y cuantitativos",
      "Creación de personas y journey maps",
      "Identificación de pain points y oportunidades",
    ],
  },
  {
    icon: Lightbulb,
    title: "Design Thinking",
    description: "Proceso iterativo para resolver problemas complejos con foco en el usuario.",
    steps: [
      "Empatizar: entender el contexto del usuario",
      "Definir: articular el problema a resolver",
      "Idear: generar múltiples soluciones creativas",
      "Prototipar y testear iterativamente",
    ],
  },
  {
    icon: TestTube,
    title: "Usability Testing",
    description: "Validación continua de diseños con usuarios reales para optimizar la experiencia.",
    steps: [
      "Definición de objetivos y métricas de éxito",
      "Reclutamiento de participantes representativos",
      "Facilitación de sesiones de testing",
      "Análisis y priorización de hallazgos",
    ],
  },
  {
    icon: Target,
    title: "Design Sprint",
    description: "Proceso acelerado de 5 días para validar ideas y resolver desafíos críticos.",
    steps: [
      "Día 1: Mapear el problema y definir objetivo",
      "Día 2: Sketching y divergencia de soluciones",
      "Día 3: Decidir y crear storyboard",
      "Día 4-5: Prototipar y validar con usuarios",
    ],
  },
  {
    icon: Repeat,
    title: "Continuous Discovery",
    description: "Investigación continua integrada al proceso de desarrollo de producto.",
    steps: [
      "Entrevistas semanales con usuarios",
      "Mapeo de oportunidades y priorización",
      "Validación rápida de asunciones",
      "Integración de insights al roadmap",
    ],
  },
  {
    icon: Sparkles,
    title: "Design System",
    description: "Construcción y mantenimiento de sistemas de diseño escalables y consistentes.",
    steps: [
      "Auditoría de UI y definición de tokens",
      "Creación de componentes atómicos",
      "Documentación y guías de uso",
      "Versionado y governance del sistema",
    ],
  },
];

const tools = [
  { icon: Search, label: "User Interviews" },
  { icon: Users, label: "Focus Groups" },
  { icon: Target, label: "A/B Testing" },
  { icon: Lightbulb, label: "Workshops" },
  { icon: TestTube, label: "Prototype Testing" },
  { icon: BookOpen, label: "Heuristic Analysis" },
];

export function PlaybookMethods() {
  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-muted/30 dark:bg-muted/10" aria-labelledby="methods-heading">
      <div className="container max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SectionBadge>Metodologías</SectionBadge>
            <h2 id="methods-heading" className="mt-4 mb-4">
              UX Playbook
            </h2>
            <p className="text-muted-foreground text-lg">
              Frameworks y metodologías que utilizo para resolver problemas complejos de diseño
              y garantizar soluciones centradas en el usuario.
            </p>
          </motion.div>
        </div>

        {/* Methods */}
        <div>
          <SectionHeader
            badge="Metodologías"
            badgeIcon={BookOpen}
            title="Playbook de Métodos UX"
            description="Frameworks y procesos que aplico para crear experiencias excepcionales"
            align="left"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {methodologies.map((method, index) => (
              <MethodCard key={method.title} {...method} index={index} />
            ))}
          </div>
        </div>

        {/* Tools & Techniques */}
        <div>
          <SectionHeader
            badge="Herramientas"
            title="Técnicas y Métodos"
            description="Arsenal de herramientas para investigación y validación"
            align="left"
          />

          <div className="flex flex-wrap gap-3 justify-center">
            {tools.map((tool, index) => (
              <MethodBadge key={tool.label} {...tool} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}