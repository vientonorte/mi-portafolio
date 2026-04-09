import { 
  Palette, 
  Users, 
  Layers, 
  Lightbulb, 
  Sparkles,
  Rocket,
  CheckCircle2,
  Box
} from "lucide-react";
import { SectionHeader } from "../molecules/SectionHeader";
import { SkillCard } from "../molecules/SkillCard";

const skills = [
  {
    icon: Palette,
    title: "Diseño UI",
    description: "Figma (experto), Frameworks, Accesibilidad, Design Systems",
  },
  {
    icon: Users,
    title: "User Research",
    description: "Research de producto y usuarios, Testing, Validación continua",
  },
  {
    icon: Lightbulb,
    title: "Design Thinking",
    description: "Facilitación de workshops, ideación, marco de trabajo ágil",
  },
  {
    icon: Layers,
    title: "Design Sprints",
    description: "Sprint de desarrollo, prototipado rápido, validación ágil",
  },
  {
    icon: Rocket,
    title: "Product Design",
    description: "Sprint de desarrollo, MVPs, Handoff, desarrollo evolutivo",
  },
  {
    icon: CheckCircle2,
    title: "Implementación UX",
    description: "Lineamientos de experiencia e interfaz en contextos enterprise",
  },
  {
    icon: Box,
    title: "Design Systems",
    description: "Creación y gestión de sistemas de diseño escalables y consistentes",
  },
  {
    icon: Users,
    title: "Docencia UX/UI",
    description: "Enseñanza de diseño UX y UI, mentoring de nuevos diseñadores",
  },
];

export function Skills() {
  return (
    <section 
      id="habilidades"
      className="py-20 md:py-28 px-4"
      aria-labelledby="skills-heading"
    >
      <div className="container max-w-7xl mx-auto">
        <SectionHeader
          badge="Expertise"
          badgeIcon={Sparkles}
          title="Habilidades & Metodologías"
          description="Stack completo de herramientas, metodologías y frameworks para diseño de experiencias centradas en el usuario"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {skills.map((skill, index) => (
            <SkillCard
              key={skill.title}
              {...skill}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}