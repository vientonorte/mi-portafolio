import { useId, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Briefcase, ChevronDown, ChevronRight, GraduationCap, Link2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageSection } from "../layout/PageSection";
import { SectionHeader } from "../molecules/SectionHeader";
import { getExperiences, type ExperienceEntry } from "../../data/experience-data";
import { EXPERIENCE_COVER, EXPERIENCE_COVER_META } from "../../data/about-visuals";
import { CompanyLogo } from "../atoms/CompanyLogo";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";
import { scrollToSection } from "../../lib/scroll-to-section";
import { cn } from "../../lib/utils";

/** Portada tipo logo (EXPERIENCE_COVER_META fit "contain"): llena el marco sin recortar. */
const CONTAIN_COVER_STYLE = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "contain",
  padding: "1rem 1rem 2.25rem",
} as const;

/**
 * Formación y certificados — solo lo que lista la SSOT TRAYECTORIA-INVESTIGACION-RO.md, con su
 * redacción y año (mapa en docs/SSOT-TRAYECTORIA-CIFRAS.md). El curso de análisis cualitativo
 * certifica el curso, no un título; mediación cultural es certificado de participación.
 * Primer nivel: `main`. Resto en <details> accesible.
 */
const FORMACION = {
  es: {
    main: [
      "Antropología, Universidad Austral de Chile (UACh), 2011–2015",
      "Curso certificado de análisis de datos cualitativos (Academia Etnográfica, 2022)",
      "Certificado de participación en mediación cultural (CNCA, 2017)",
      "Diseñador UX/UI, Desafío Latam, 2020–2021",
    ],
    more: [
      "Etnografías en contextos complejos, Universidad Austral de Chile, 2017",
      "Primer Seminario «Antropología y Comunidades», UACh y Centro de Estudios Comunitarios (CEC), 2017",
      "Fotografía Profesional y Fotoperiodismo, Instituto Profesional ARCOS, 2017–2018",
      "Diplomado en Gestión de Operaciones y Transformación Digital, PUC Escuela de Negocios, 2019",
      "Scrum Master, CHILETEC, 2019",
      "Diploma de participación en la 3.ª Escuela de Memoria y Derechos Humanos, 2021",
      "Diplomado New Municipalism, Universidad Abierta de Recoleta, 2022",
      "Diseño accesible e inclusivo, Desafío Latam, 2025",
      "Innovación centrada en las personas, Laboratorio de Gobierno, 2026",
    ],
    moreLabel: "Ver toda la formación",
  },
  en: {
    main: [
      "Anthropology studies, Universidad Austral de Chile (UACh), 2011–2015",
      "Certified course in qualitative data analysis (Academia Etnográfica, 2022)",
      "Certificate of participation in cultural mediation (CNCA, 2017)",
      "UX/UI Designer, Desafío Latam, 2020–2021",
    ],
    more: [
      "Ethnographies in complex contexts, Universidad Austral de Chile, 2017",
      "First Seminar «Antropología y Comunidades», UACh and Centro de Estudios Comunitarios (CEC), 2017",
      "Professional Photography and Photojournalism, Instituto Profesional ARCOS, 2017–2018",
      "Diploma in Operations Management and Digital Transformation, PUC Business School, 2019",
      "Scrum Master, CHILETEC, 2019",
      "Certificate of participation, 3rd School of Memory and Human Rights, 2021",
      "New Municipalism diploma, Universidad Abierta de Recoleta, 2022",
      "Accessible and inclusive design, Desafío Latam, 2025",
      "Human-centred innovation, Laboratorio de Gobierno, 2026",
    ],
    moreLabel: "View all education",
  },
} as const;

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

      {/* lg–1679px: el rail fijo de secciones (ProcessNavigation, right-6) se superpone hasta ~160px; reservar ese ancho. */}
      <ol className="space-y-0 lg:pr-44 min-[1680px]:pr-0" role="list" aria-label={t.title}>
        {experiences.map((exp, index) => {
          const key = expKey(exp);
          const isLast = index === experiences.length - 1;
          const isOpen = openKey === key;
          const panelId = `${baseId}-panel-${index}`;
          const btnId = `${baseId}-dot-${index}`;
          // Nombre de empresa primero: Karri by Transvip comparte companyId "transvip" y no debe
          // heredar la portada de Transvip.
          const cover =
            EXPERIENCE_COVER[exp.company] ||
            (exp.companyId && EXPERIENCE_COVER[exp.companyId]) ||
            undefined;
          const coverMeta = cover ? EXPERIENCE_COVER_META[cover] : undefined;

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
                            <div className="bg-surface-matte px-3 pt-3">
                              <figure className="experience-cover aspect-[21/9] max-h-36 w-full sm:max-h-44">
                                <img
                                  src={cover}
                                  alt={
                                    es
                                      ? (coverMeta?.alt ?? `Pieza de ${exp.company}`)
                                      : `${exp.company} still`
                                  }
                                  width={coverMeta?.width}
                                  height={coverMeta?.height}
                                  loading="lazy"
                                  decoding="async"
                                  className={coverMeta?.fit === "contain" ? undefined : "experience-cover__image h-full w-full"}
                                  // Logo: entero y centrado. Inline porque una regla global img { height: auto } gana a h-full.
                                  style={coverMeta?.fit === "contain" ? CONTAIN_COVER_STYLE : undefined}
                                />
                                <span className="experience-cover__grade" aria-hidden />
                                <span className="experience-cover__vignette" aria-hidden />
                                <figcaption className="experience-cover__caption">
                                  {exp.company}
                                </figcaption>
                              </figure>
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

                            {exp.detailGroups && exp.detailGroups.length > 0 ? (
                              <details className="experience-detail group rounded-lg border border-border/60 bg-card/40">
                                <summary
                                  className={cn(
                                    "flex cursor-pointer list-none items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-primary",
                                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden"
                                  )}
                                >
                                  <span>
                                    {es ? "Ver detalle" : "View detail"}
                                    <span className="sr-only"> · {exp.company}</span>
                                  </span>
                                  <ChevronDown
                                    className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180 motion-reduce:transition-none"
                                    aria-hidden
                                  />
                                </summary>
                                <div className="space-y-3 px-3 pb-3 pt-1">
                                  {exp.detailGroups.map((group) => (
                                    <section key={group.title} aria-label={group.title}>
                                      <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground/80">
                                        {group.title}
                                      </h4>
                                      <ul className="mt-1.5 space-y-1.5" role="list">
                                        {group.items.map((item) => (
                                          <li
                                            key={item.slice(0, 48)}
                                            className="text-sm leading-snug text-muted-foreground"
                                          >
                                            · {item}
                                          </li>
                                        ))}
                                      </ul>
                                    </section>
                                  ))}
                                </div>
                              </details>
                            ) : null}

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

      <section
        aria-labelledby="formacion-heading"
        className="mt-8 rounded-xl border border-border/60 bg-card/60 p-4 sm:p-5 lg:mr-44 min-[1680px]:mr-0"
      >
        <h3
          id="formacion-heading"
          className="flex items-center gap-2 text-base font-semibold sm:text-lg"
        >
          <GraduationCap className="h-5 w-5 text-primary" aria-hidden />
          {es ? "Formación y certificados" : "Education and certificates"}
        </h3>
        <ul className="mt-3 space-y-1.5" role="list">
          {FORMACION[language].main.map((line) => (
            <li key={line} className="text-sm leading-snug text-muted-foreground">
              · {line}
            </li>
          ))}
        </ul>
        <details className="experience-detail group mt-3 rounded-lg border border-border/60 bg-card/40">
          <summary
            className={cn(
              "flex cursor-pointer list-none items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-primary",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden"
            )}
          >
            <span>
              {FORMACION[language].moreLabel} ({FORMACION[language].more.length})
            </span>
            <ChevronDown
              className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180 motion-reduce:transition-none"
              aria-hidden
            />
          </summary>
          <ul className="space-y-1.5 px-3 pb-3 pt-1" role="list">
            {FORMACION[language].more.map((line) => (
              <li key={line} className="text-sm leading-snug text-muted-foreground">
                · {line}
              </li>
            ))}
          </ul>
        </details>
      </section>
    </PageSection>
  );
}
