import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Briefcase } from "lucide-react";
import { SectionHeader } from "../molecules/SectionHeader";

const experiences = [
  {
    company: "SURA Investments | Wealth Management",
    position: "Associate Estrategia Digital · Lead UX",
    period: "Nov 2023 - Actualidad",
    isCurrent: true,
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop",
    location: "Remoto",
    summary: "-40% onboarding · 50+ componentes design system · 5+ países",
    achievements: [
      "Diseño de lineamientos de experiencia e interfaz durante la ideación, estructuración e implementación de nuevas iniciativas",
      "Implementación de desarrollo evolutivo en productos digitales regionales",
      "Aplicación de Design Thinking adaptado a contextos enterprise y financieros",
    ],
    tools: ["Figma", "Miro", "Jira", "Confluence", "Analytics"],
  },
  {
    company: "Academia Desafío Latam",
    position: "Docente Carrera UX / UI",
    period: "Jun 2022 - Feb 2023",
    isCurrent: false,
    logo: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=100&h=100&fit=crop",
    location: "Remoto",
    summary: "Generación G48 · Design Thinking · Mentoría de proyectos finales",
    achievements: [
      "Cursos de diseño UX y UI como aprendizaje continuo",
      "Mentoría en proyectos finales de la generación",
    ],
    tools: ["Figma", "Design Thinking", "User Research"],
  },
  {
    company: "Transvip",
    position: "Senior Product Designer",
    period: "2022 - 2023",
    isCurrent: false,
    logo: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=100&h=100&fit=crop",
    location: "Remoto",
    summary: "-40% fricción en reservas · Tracking en tiempo real",
    achievements: [
      "Rediseño completo de la app de pasajeros premium",
      "Optimización del flujo de reservas con reducción de 40% en fricción",
    ],
    tools: ["Figma", "Sketch", "User Testing", "A/B Testing"],
  },
  {
    company: "Karri by Transvip",
    position: "Lead UX Designer - Vertical Shoppers",
    period: "2022 - 2023",
    isCurrent: false,
    logo: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=100&h=100&fit=crop",
    location: "Remoto",
    summary: "+35% activación · +58% engagement · -42% abandono",
    achievements: [
      "Calculadora de ganancias que aumentó activación en +35%",
      "Sistema de notificaciones centralizado con +58% engagement",
      "Optimización de onboarding con -42% de abandono",
    ],
    tools: ["Figma", "Analytics", "User Research", "Prototyping"],
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

        <div className="space-y-5 md:space-y-8 relative">
          {/* Timeline connector line */}
          <div className="absolute left-6 md:left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent hidden sm:block" />
          
          {experiences.map((exp, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="relative"
            >
              <Card className={`hover:shadow-lg transition-shadow ${exp.isCurrent ? 'border-primary/50 border-2 bg-primary/5' : ''}`}>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="flex items-start gap-4 flex-1">
                      {/* Company Logo */}
                      <div className="relative flex-shrink-0">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl overflow-hidden bg-muted flex items-center justify-center ring-2 ring-border">
                          <img 
                            src={exp.logo} 
                            alt={`${exp.company} logo`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback to icon if image fails to load
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.parentElement!.innerHTML = '<svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>';
                            }}
                          />
                        </div>
                        {/* Timeline dot */}
                        <div className="absolute -left-[1.85rem] md:-left-[2.1rem] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background hidden sm:block z-10" />
                      </div>
                      
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <CardTitle>{exp.position}</CardTitle>
                          {exp.isCurrent && (
                            <Badge className="bg-green-500 hover:bg-green-600 text-white">
                              Actualidad
                            </Badge>
                          )}
                        </div>
                        <CardDescription>{exp.company}</CardDescription>
                      </div>
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
                
                {/* Tools/Tech Tags */}
                {exp.tools && (
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-2">
                      {exp.tools.map((tool) => (
                        <Badge key={tool} variant="secondary" className="text-xs">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
