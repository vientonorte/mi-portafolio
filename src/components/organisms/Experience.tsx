import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Briefcase, Clock } from "lucide-react";
import { SectionHeader } from "../molecules/SectionHeader";

const experiences = [
  {
    company: "SURA Investments | Wealth Management",
    position: "Associate Estrategia Digital · Lead UX",
    period: "Nov 2023 - Actualidad",
    summary: "-40% onboarding · 50+ componentes design system · 5+ países",
    achievements: [
      "Diseño de lineamientos de experiencia e interfaz durante la ideación, estructuración e implementación de nuevas iniciativas",
      "Implementación de desarrollo evolutivo en productos digitales regionales",
      "Aplicación de Design Thinking adaptado a contextos enterprise y financieros",
    ],
  },
  {
    company: "Academia Desafío Latam",
    position: "Docente Carrera UX / UI",
    period: "Jun 2022 - Feb 2023",
    summary: "Generación G48 · Design Thinking · Mentoría de proyectos finales",
    achievements: [
      "Cursos de diseño UX y UI como aprendizaje continuo",
      "Mentoría en proyectos finales de la generación",
    ],
  },
  {
    company: "Transvip",
    position: "Senior Product Designer",
    period: "2022 - 2023",
    summary: "-40% fricción en reservas · Tracking en tiempo real",
    achievements: [
      "Rediseño completo de la app de pasajeros premium",
      "Optimización del flujo de reservas con reducción de 40% en fricción",
    ],
  },
  {
    company: "Karri by Transvip",
    position: "Lead UX Designer - Vertical Shoppers",
    period: "2022 - 2023",
    summary: "+35% activación · +58% engagement · -42% abandono",
    achievements: [
      "Calculadora de ganancias que aumentó activación en +35%",
      "Sistema de notificaciones centralizado con +58% engagement",
      "Optimización de onboarding con -42% de abandono",
    ],
  },
];

export function Experience() {
  return (
    <section
      id="experiencia"
      className="py-12 md:py-16 px-4 bg-muted/30"
      aria-labelledby="experience-heading"
    >
      <div className="container max-w-7xl mx-auto">
        <SectionHeader
          badge="Trayectoria"
          badgeIcon={Briefcase}
          title="Experiencia Profesional"
          description=""
        />

        <div className="space-y-5 md:space-y-8">
          {experiences.map((exp, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="space-y-1">
                      <CardTitle>{exp.position}</CardTitle>
                      <CardDescription>{exp.company}</CardDescription>
                    </div>
                    <Badge variant="secondary" className="self-start whitespace-nowrap">
                      {exp.period}
                    </Badge>
                  </div>
                  {/* Metric summary — most important info up front */}
                  <p className="text-sm font-medium text-primary mt-1">{exp.summary}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1.5" role="list" aria-label="Logros principales">
                    {exp.achievements.map((achievement, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                        className="flex items-start gap-2"
                      >
                        <span className="text-primary mt-1 flex-shrink-0" aria-hidden="true">•</span>
                        <span className="text-sm text-muted-foreground">{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
