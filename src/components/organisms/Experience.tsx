import { useId, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Briefcase, ChevronRight, Link2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageSection } from "../layout/PageSection";
import { SectionHeader } from "../molecules/SectionHeader";
import { getExperiences, type ExperienceEntry } from "../../data/experience-data";
import { EXPERIENCE_COVER } from "../../data/about-visuals";
import { CompanyLogo } from "../atoms/CompanyLogo";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";
import { scrollToSection } from "../../lib/scroll-to-section";
import { cn } from "../../lib/utils";

function expKey(exp: ExperienceEntry) {
  return `${exp.company}-${exp.period}`;
}

/**
 * Línea de tiempo colapsable por dots: un solo rol expandido reduce scroll.
 * Por defecto abre el rol actual (o el primero).
 */
export function Experience() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const tRoot = useTranslation(language);
  const t = tRoot.experience;
  const experiences = getExperiences(language);
  const es = language === "es";
  const prefersReducedMotion = useReducedMotion();
  const baseId = useId();

  const defaultKey =
    experiences.find((e) => e.isCurrent)?.period &&
    experiences.find((e) => e.isCurrent)
      ? expKey(experiences.find((e) => e.isCurrent)!)
      : experiences[0]
        ? expKey(experiences[0])
        : null;

  const [openKey, setOpenKey] = useState<string | null>(defaultKey);

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
            ? "Toca un punto para abrir el rol. Un solo detalle a la vez."
            : "Tap a dot to open a role. One detail at a time."
        }
        titleId="experience-heading"
      />

      <ol className="space-y-0" role="list" aria-label={t.title}>
        {experiences.map((exp, index) => {
          const key = expKey(exp);
          const isLast = index === experiences.length - 1;
          const isOpen = openKey === key;
          const panelId = `${baseId}-panel-${index}`;
          const btnId = `${baseId}-dot-${index}`;
          const cover =
            (exp.companyId && EXPERIENCE_COVER[exp.companyId]) ||
            EXPERIENCE_COVER[exp.company];

          return (
            <li
              key={key}
              className={cn("flex gap-3 sm:gap-5", !isLast && (isOpen ? "pb-6 sm:pb-8" : "pb-2 sm:pb-3"))}
            >
              {/* Rail + dot button */}
              <div className="relative flex w-8 shrink-0 flex-col items-center self-stretch sm:w-9">
                <button
                  type="button"
                  id={btnId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  aria-label={
                    es
                      ? `${isOpen ? "Cerrar" : "Abrir"} ${exp.position} · ${exp.company}`
                      : `${isOpen ? "Collapse" : "Expand"} ${exp.position} · ${exp.company}`
                  }
                  onClick={() => setOpenKey(isOpen ? null : key)}
                  className={cn(
                    "relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full transition-transform",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    "hover:scale-110 active:scale-95"
                  )}
                >
                  <span
                    className={cn(
                      "size-3.5 rounded-full border-[3px] border-background sm:size-4 sm:border-4",
                      exp.isCurrent
                        ? "bg-primary ring-2 ring-primary/40"
                        : isOpen
                          ? "bg-primary ring-2 ring-primary/25"
                          : "bg-primary/50 ring-1 ring-primary/15"
                    )}
                    aria-hidden
                  />
                </button>
                {!isLast && (
                  <div
                    className="absolute left-1/2 top-8 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-primary/70 via-primary/40 to-primary/15"
                    aria-hidden
                  />
                )}
              </div>

              <div className="min-w-0 flex-1">
                {/* Compact row always visible — also toggles */}
                <button
                  type="button"
                  onClick={() => setOpenKey(isOpen ? null : key)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isOpen
                      ? "border-primary/40 bg-primary/5"
                      : "border-border/50 bg-card/60 hover:border-primary/25 hover:bg-card"
                  )}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <CompanyLogo
                    src={exp.logo}
                    alt=""
                    size="sm"
                    className="shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold leading-tight">
                      {exp.position}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {exp.company}
                      <span className="text-muted-foreground/80"> · {exp.period}</span>
                    </p>
                  </div>
                  {exp.isCurrent && (
                    <Badge className="shrink-0 bg-green-500 text-[10px] text-white hover:bg-green-600">
                      {t.current}
                    </Badge>
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      initial={
                        prefersReducedMotion
                          ? { opacity: 1 }
                          : { opacity: 0, height: 0 }
                      }
                      animate={
                        prefersReducedMotion
                          ? { opacity: 1 }
                          : { opacity: 1, height: "auto" }
                      }
                      exit={
                        prefersReducedMotion
                          ? { opacity: 0 }
                          : { opacity: 0, height: 0 }
                      }
                      transition={{ duration: 0.28, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <motion.article
                        initial={prefersReducedMotion ? false : { y: 8 }}
                        animate={{ y: 0 }}
                        className="pt-3"
                      >
                        <Card
                          className={cn(
                            "overflow-hidden transition-shadow",
                            exp.isCurrent && "border-2 border-primary/50 bg-primary/5"
                          )}
                        >
                          {cover ? (
                            <div className="relative aspect-[21/9] max-h-36 w-full overflow-hidden border-b border-border/40 bg-muted sm:max-h-44">
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
                            <div className="flex flex-wrap items-center gap-2">
                              <Badge
                                variant="outline"
                                className="border-primary/25 font-mono text-[10px] uppercase tracking-[0.14em] text-primary"
                              >
                                {exp.stage}
                              </Badge>
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
                                  <Badge
                                    key={tool}
                                    variant="secondary"
                                    className="text-[11px]"
                                  >
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
                                  onClick={() =>
                                    scrollToSection(exp.evidenceSectionId!)
                                  }
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
                                  onClick={() =>
                                    navigate(`/empresa/${exp.companyId}`)
                                  }
                                >
                                  {t.viewCases}
                                  <ChevronRight className="h-4 w-4" />
                                </Button>
                              ) : null}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.article>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </li>
          );
        })}
      </ol>
    </PageSection>
  );
}
