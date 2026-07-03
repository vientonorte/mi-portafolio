import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Briefcase, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageSection } from "../layout/PageSection";
import { SectionHeader } from "../molecules/SectionHeader";
import { getExperiences } from "../../data/experience-data";
import { CompanyLogo } from "../atoms/CompanyLogo";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";

export function Experience() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = useTranslation(language).experience;
  const experiences = getExperiences(language);

  return (
    <PageSection
      id="experiencia"
      padding="compact"
      width="wide"
      tone="section"
      aria-labelledby="experience-heading"
    >
        <SectionHeader
          badge={t.badge}
          badgeIcon={Briefcase}
          title={t.title}
          description=""
          titleId="experience-heading"
        />

        <div className="relative space-y-5 pl-5 sm:space-y-8 sm:pl-0 md:space-y-8">
          <div className="absolute left-2 top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent sm:left-6 md:left-8" />

          {experiences.map((exp, index) => (
            <motion.article
              key={`${exp.company}-${exp.period}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="relative"
            >
              <Card
                className={`hover:shadow-lg transition-shadow ${exp.isCurrent ? "border-primary/50 border-2 bg-primary/5" : ""}`}
              >
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="relative flex-shrink-0">
                        <CompanyLogo
                          src={exp.logo}
                          alt={`${exp.company} logo`}
                          size="md"
                        />
                        <div className="absolute -left-[1.35rem] top-1/2 z-10 h-3 w-3 -translate-y-1/2 rounded-full border-[3px] border-background bg-primary sm:-left-[1.85rem] sm:h-4 sm:w-4 sm:border-4 md:-left-[2.1rem]" />
                      </div>

                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <CardTitle>{exp.position}</CardTitle>
                          {exp.isCurrent && (
                            <Badge className="bg-green-500 hover:bg-green-600 text-white">
                              {t.current}
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
                  <p className="text-sm font-medium text-foreground/90 mt-1">{exp.summary}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1.5" role="list" aria-label={t.achievementsLabel}>
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
                        <span className="text-sm text-muted-foreground">{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>

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

                {exp.companyId && (
                  <CardContent className="pt-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1 px-0 text-primary hover:text-primary"
                      onClick={() => navigate(`/empresa/${exp.companyId}`)}
                    >
                      {t.viewCases}
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                )}
              </Card>
            </motion.article>
          ))}
        </div>
    </PageSection>
  );
}