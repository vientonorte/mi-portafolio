import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Briefcase, ChevronRight, Link2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageSection } from "../layout/PageSection";
import { SectionHeader } from "../molecules/SectionHeader";
import { getExperiences } from "../../data/experience-data";
import { EXPERIENCE_COVER } from "../../data/about-visuals";
import { CompanyLogo } from "../atoms/CompanyLogo";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";
import { scrollToSection } from "../../lib/scroll-to-section";
import { cn } from "../../lib/utils";

export function Experience() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = useTranslation(language).experience;
  const experiences = getExperiences(language);
  const es = language === "es";

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
        title={language === "es" ? "Línea de tiempo" : "Timeline"}
        description={
          language === "es"
            ? "Impacto + captura. Detalle en cada empresa."
            : "Impact + capture. Detail per company."
        }
        titleId="experience-heading"
      />

      <ol className="space-y-0" role="list" aria-label={t.title}>
        {experiences.map((exp, index) => {
          const isLast = index === experiences.length - 1;
          const cover =
            (exp.companyId && EXPERIENCE_COVER[exp.companyId]) ||
            EXPERIENCE_COVER[exp.company];

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
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                className="min-w-0 flex-1"
              >
                <Card
                  className={cn(
                    "overflow-hidden transition-shadow hover:shadow-lg",
                    exp.isCurrent && "border-2 border-primary/50 bg-primary/5"
                  )}
                >
                  {cover ? (
                    <div className="relative aspect-[21/9] max-h-40 w-full overflow-hidden border-b border-border/40 bg-muted sm:max-h-48">
                      <img
                        src={cover}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover object-top"
                      />
                      <div
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/50 to-transparent"
                        aria-hidden
                      />
                    </div>
                  ) : null}

                  <CardHeader className="pb-2">
                    <div className="flex flex-1 items-start gap-3 sm:gap-4">
                      <CompanyLogo
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        size="md"
                      />
                      <div className="min-w-0 flex-1 space-y-1">
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
                        <CardTitle className="text-base sm:text-lg">
                          {exp.position}
                        </CardTitle>
                        <CardDescription className="text-sm font-medium text-foreground/80">
                          {exp.company}
                          <span className="text-muted-foreground">
                            {" "}
                            · {exp.period}
                          </span>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3 pt-0">
                    <p className="text-sm font-semibold leading-snug text-primary">
                      {exp.impact}
                    </p>
                    <ul className="space-y-1.5" role="list">
                      {exp.achievements.slice(0, 3).map((line) => (
                        <li
                          key={line.slice(0, 48)}
                          className="text-sm leading-snug text-muted-foreground"
                        >
                          · {line}
                        </li>
                      ))}
                    </ul>

                    {exp.tools && exp.tools.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {exp.tools.map((tool) => (
                          <Badge key={tool} variant="secondary" className="text-[11px]">
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-3 pt-1">
                      {exp.evidenceSectionId ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1 px-0 text-primary hover:text-primary"
                          onClick={() => scrollToSection(exp.evidenceSectionId!)}
                        >
                          <Link2 className="h-4 w-4" aria-hidden />
                          {exp.evidenceCta
                            ? exp.evidenceCta[language]
                            : es
                              ? "Ver evidencia"
                              : "View evidence"}
                        </Button>
                      ) : null}
                      {exp.companyId ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1 px-0 text-primary hover:text-primary"
                          onClick={() => navigate(`/empresa/${exp.companyId}`)}
                        >
                          {t.viewCases}
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      ) : null}
                    </div>
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
