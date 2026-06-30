import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Briefcase, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SectionHeader } from "../molecules/SectionHeader";
import { experiences } from "../../data/experience-data";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function Experience() {
  const navigate = useNavigate();
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
                          <ImageWithFallback
                            src={exp.logo}
                            alt={`${exp.company} — evidencia visual`}
                            className="w-full h-full object-cover object-top"
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

                {"companyId" in exp && exp.companyId && (
                  <CardContent className="pt-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1 px-0 text-primary hover:text-primary"
                      onClick={() => navigate(`/empresa/${exp.companyId}`)}
                    >
                      Ver casos y evidencias
                      <ChevronRight className="h-4 w-4" />
                    </Button>
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
