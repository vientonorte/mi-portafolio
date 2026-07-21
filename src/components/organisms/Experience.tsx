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
import { cn } from "../../lib/utils";

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
        description={t.description}
        titleId="experience-heading"
      />

      <ol className="space-y-0" role="list" aria-label={t.title}>
        {experiences.map((exp, index) => {
          const isLast = index === experiences.length - 1;

          return (
            <li
              key={`${exp.company}-${exp.period}`}
              className={cn("flex gap-4 sm:gap-5", !isLast && "pb-8 sm:pb-10")}
            >
              <div
                className="relative flex w-4 shrink-0 flex-col items-center self-stretch sm:w-5"
                aria-hidden="true"
              >
                <div
                  className={cn(
                    "relative z-10 size-3.5 shrink-0 rounded-full border-[3px] border-background sm:size-4 sm:border-4",
                    exp.isCurrent
                      ? "bg-primary ring-2 ring-primary/30"
                      : "bg-primary/90 ring-1 ring-primary/20"
                  )}
                />
                {!isLast && (
                  <div className="absolute left-1/2 top-4 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-primary via-primary/55 to-primary/25 sm:top-5" />
                )}
              </div>

              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="min-w-0 flex-1"
              >
                <Card
                  className={cn(
                    "transition-shadow hover:shadow-lg",
                    exp.isCurrent && "border-2 border-primary/50 bg-primary/5"
                  )}
                >
                  <CardHeader>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex flex-1 items-start gap-4">
                        <CompanyLogo
                          src={exp.logo}
                          alt={`${exp.company} logo`}
                          size="md"
                        />

                        <div className="min-w-0 flex-1 space-y-1.5">
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge
                              variant="outline"
                              className="border-primary/25 font-mono text-[10px] uppercase tracking-[0.14em] text-primary"
                            >
                              {exp.stage}
                            </Badge>
                            {exp.isCurrent && (
                              <Badge className="bg-green-500 text-white hover:bg-green-600">
                                {t.current}
                              </Badge>
                            )}
                          </div>
                          <CardTitle className="text-lg sm:text-xl">{exp.position}</CardTitle>
                          <CardDescription className="text-base font-medium text-foreground/80">
                            {exp.company}
                          </CardDescription>
                          <p className="text-xs text-muted-foreground">
                            {exp.period}
                            <span aria-hidden="true"> · </span>
                            {exp.location}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Relato por etapa: contexto → rol → impacto */}
                    <dl className="space-y-3 border-b border-border/60 pb-4">
                      <div>
                        <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                          {t.contextLabel}
                        </dt>
                        <dd className="mt-1 text-sm leading-relaxed text-foreground/90">
                          {exp.context}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                          {t.roleLabel}
                        </dt>
                        <dd className="mt-1 text-sm leading-relaxed text-foreground/90">
                          {exp.role}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                          {t.impactLabel}
                        </dt>
                        <dd className="mt-1 text-sm font-semibold leading-relaxed text-primary">
                          {exp.impact}
                        </dd>
                      </div>
                    </dl>

                    <div>
                      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                        {t.evidenceLabel}
                      </p>
                      <ul className="space-y-1.5" role="list" aria-label={t.evidenceLabel}>
                        {exp.achievements.map((achievement, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.08 + i * 0.04 }}
                            className="flex items-start gap-2"
                          >
                            <span className="mt-1 shrink-0 text-primary" aria-hidden="true">
                              •
                            </span>
                            <span className="text-sm text-muted-foreground">{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {exp.tools && exp.tools.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {exp.tools.map((tool) => (
                          <Badge key={tool} variant="secondary" className="text-xs">
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {exp.companyId && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1 px-0 text-primary hover:text-primary"
                        onClick={() => navigate(`/empresa/${exp.companyId}`)}
                      >
                        {t.viewCases}
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.article>
            </li>
          );
        })}
      </ol>
    </PageSection>
  );
}
