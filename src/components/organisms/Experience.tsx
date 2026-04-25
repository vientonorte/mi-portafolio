import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@vientonorte/ui/card';
import { Badge } from '@vientonorte/ui/badge';
import { Briefcase, GraduationCap, Award, Clock } from "lucide-react";
import { SectionHeader } from "../molecules/SectionHeader";

const experiences = [
  {
    type: "work",
    company: "SURA Investments | Wealth Management",
    position: "Associate Estrategia Digital · Lead UX",
    period: "Nov 2023 - Actualidad",
    description: "Mi rol dentro del equipo de estrategia digital se centra en la correcta implementación del diseño de experiencia usuaria en las diversas iniciativas en que SURA Investments realiza desarrollos tanto regional como localmente a nivel tecnológico.",
    achievements: [
      "Diseño de lineamientos de experiencia e interfaz durante la ideación, estructuración e implementación de nuevas iniciativas",
      "Implementación de desarrollo evolutivo en productos digitales regionales",
      "Aplicación de Design Thinking adaptado a contextos enterprise y financieros",
    ],
    link: "https://www.regional.com",
    linkText: "¿Quieres ver cómo adapto design thinking?"
  },
  {
    type: "work",
    company: "Academia Desafío Latam",
    position: "Docente Carrera UX / UI",
    period: "Jun 2022 - Feb 2023",
    description: "Docente de la generación G48 de UX UI en Academia Desafío Latam, impartiendo cursos de diseño UX y diseño UI.",
    achievements: [
      "Impartición de cursos de diseño UX y UI como aprendizaje continuo",
      "Acompañamiento a estudiantes durante el diseño de productos usando Design Thinking como marco de trabajo ágil",
      "Mentoría en proyectos finales de la generación",
    ],
    link: "https://www.figma.com/design/BC1cwBvja12XYhdRUNh9ad?node-id=1607-767",
    linkText: "Leer más sobre esta experiencia aquí"
  },
  {
    type: "work",
    company: "Transvip",
    position: "Senior Product Designer",
    period: "2022 - 2023",
    description: "Diseño de aplicación premium de movilidad para traslados al aeropuerto y servicios ejecutivos.",
    achievements: [
      "Rediseño completo de la app de pasajeros premium",
      "Optimización del flujo de reservas con reducción de 40% en fricción",
      "Implementación de sistema de tracking en tiempo real",
    ],
  },
  {
    type: "work",
    company: "Karri by Transvip",
    position: "Lead UX Designer - Vertical Shoppers",
    period: "2022 - 2023",
    description: "Liderazgo en diseño UX para la vertical de shoppers y delivery de Transvip.",
    achievements: [
      "Diseño de calculadora de ganancias que aumentó activación en +35%",
      "Sistema de notificaciones centralizado con +58% engagement",
      "Optimización de onboarding con -42% de abandono",
    ],
  },
];

const education = [
  // Educación formal - sin roles docentes que ya están en experiencia profesional
];

const certifications = [
  "Design Thinking & Design Sprints",
  "Product Design: Sprint de desarrollo, MVPs & Handoff",
  "User Research & Testing",
  "Diseño UI: Figma, Frameworks & Accesibilidad",
];

export function Experience() {
  return (
    <section 
      id="experiencia"
      className="py-20 md:py-28 px-4 bg-muted/30"
      aria-labelledby="experience-heading"
    >
      <div className="container max-w-7xl mx-auto">
        <SectionHeader
          badge="Trayectoria"
          badgeIcon={Clock}
          title="Experiencia Profesional"
          description="Trayectoria en diseño de experiencias, implementación de UX y desarrollo de productos digitales en contextos enterprise"
        />

        <div className="space-y-12 md:space-y-16">
          {/* Work Experience */}
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-6 md:mb-8"
            >
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
              <h3>Experiencia Profesional</h3>
            </motion.div>
            
            <div className="space-y-4 md:space-y-6">
              {experiences.map((exp, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
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
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground text-sm md:text-base">
                        {exp.description}
                      </p>
                      <ul className="space-y-2" role="list" aria-label="Logros principales">
                        {exp.achievements.map((achievement, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 + i * 0.05 }}
                            className="flex items-start gap-2"
                          >
                            <span className="text-primary mt-1 flex-shrink-0" aria-hidden="true">
                              •
                            </span>
                            <span className="text-sm">{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>
                      {exp.link && (
                        <a
                          href={exp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          {exp.linkText}
                        </a>
                      )}
                    </CardContent>
                  </Card>
                </motion.article>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-6 md:mb-8"
            >
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Award className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
              <h3>Certificaciones</h3>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <ul 
                    className="grid sm:grid-cols-2 gap-3 md:gap-4"
                    role="list"
                    aria-label="Certificaciones profesionales"
                  >
                    {certifications.map((cert, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-start gap-2"
                      >
                        <span className="text-primary mt-1 flex-shrink-0" aria-hidden="true">
                          ✓
                        </span>
                        <span className="text-sm">{cert}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}