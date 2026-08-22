import { ArrowRight, Calendar, User, Download, CheckCircle2, Circle, Clock, Sparkles } from "lucide-react";
import { auditData } from "../data/audit-data";
import { useId, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SEOHead } from "../components/atoms/SEOHead";
import { SITE_CONTACT } from "../lib/site-contact";
import { PageShell } from "../components/layout/PageShell";
import { PremiumUxAuditBanner } from "../components/organisms/PremiumUxAuditBanner";
import { useLanguage } from "../lib/LanguageContext";
import { useTranslation } from "../lib/i18n";
import { getAuditPageCopy } from "../lib/audit-page-copy";
import { canonicalFromPath, SEO_SITE } from "../lib/seo";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { getConsultingPackage } from "../data/vientonorte-consulting";
import { scrollToSection } from "../lib/scroll-to-section";
import { navigateToContactAssistant } from "../lib/navigate-to-contact";
import { openFreeRadarEntry } from "../lib/free-radar-entry";

type ChecklistStatus = "pending" | "in_progress" | "completed";

interface ChecklistItem {
  id: number;
  task: string;
  category: string;
  status: ChecklistStatus;
}

const SEO_ITEMS = [
  {
    title: "Schema Markup",
    description:
      "Implementar schema.org/Person + schema.org/CreativeWork para indexación por IA",
    impact: "veryHigh" as const,
  },
  {
    title: "Meta Title Optimizado",
    description: '"[Cliente] | UX Designer | Portfolio & Case Studies"',
    impact: "high" as const,
  },
  {
    title: "Keywords Estratégicas",
    description: "Agregar especialización vertical en todos los proyectos (SaaS, Fintech, etc.)",
    impact: "high" as const,
  },
  {
    title: "Open Graph Tags",
    description: "Optimizar OG tags para compartir en redes y mejorar visibilidad",
    impact: "medium" as const,
  },
  {
    title: "Estructura Semántica",
    description: "Jerarquía H1-H6 correcta + landmarks ARIA para accesibilidad",
    impact: "medium" as const,
  },
  {
    title: "FAQs Indexables",
    description: "Sección de preguntas frecuentes con schema.org/FAQPage para featured snippets",
    impact: "medium" as const,
  },
];

function SectionHeading({
  id,
  title,
  subtitle,
}: {
  id: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-12">
      <h2 id={id} className="text-3xl font-medium mb-3 text-foreground">
        {title}
      </h2>
      <div className="gradient-line" aria-hidden="true" />
      {subtitle && <p className="text-muted-foreground mt-4">{subtitle}</p>}
    </div>
  );
}

function impactClass(impact: "veryHigh" | "high" | "medium"): string {
  switch (impact) {
    case "veryHigh":
      return "bg-destructive/10 text-destructive";
    case "high":
      return "bg-[color:var(--stat-tint-amber)] text-[color:var(--stat-tint-amber-fg)]";
    case "medium":
      return "bg-muted text-muted-foreground";
  }
}

export default function AuditoriaPortfolio() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = useTranslation(language);
  const copy = getAuditPageCopy(language);
  const progressHintId = useId();

  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([
    { id: 1, task: "Reescribir hero con especialización clara", category: "Posicionamiento", status: "completed" },
    { id: 2, task: "Implementar schema.org/Person + CreativeWork", category: "SEO", status: "completed" },
    { id: 3, task: "Optimizar meta title y description", category: "SEO", status: "completed" },
    { id: 4, task: "Agregar métricas cuantificables en proyectos", category: "Contenido", status: "completed" },
    { id: 5, task: "Desarrollar 1 case study completo con framework", category: "Contenido", status: "completed" },
    { id: 6, task: "Incluir 3 testimonios con validación social", category: "Credibilidad", status: "completed" },
    { id: 7, task: "Agregar keywords estratégicas en proyectos", category: "SEO", status: "completed" },
    { id: 8, task: "Implementar estructura semántica H1-H6", category: "Accesibilidad", status: "completed" },
  ]);

  const cycleStatus = (status: ChecklistStatus): ChecklistStatus => {
    if (status === "pending") return "in_progress";
    if (status === "in_progress") return "completed";
    return "pending";
  };

  const handleStatusChange = (id: number) => {
    setChecklistItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, status: cycleStatus(item.status) } : item
      )
    );
  };

  const completedCount = checklistItems.filter((item) => item.status === "completed").length;
  const progressPercentage = Math.round((completedCount / checklistItems.length) * 100);
  const progressSummary = copy.progressSummary
    .replace("{completed}", String(completedCount))
    .replace("{total}", String(checklistItems.length));

  const handleDownload = () => {
    window.print();
  };

  const recommendedPackage = getConsultingPackage("marco");

  /** Banner freemium: agendar a11y gratis (Calendar) o form — no mentoría. */
  const handleStartConsulting = () => {
    openFreeRadarEntry(navigate, language, "audit-page", { mode: "auto" });
  };

  /** CTA de muestra de auditoría (diagnóstico con evidencia). */
  const handlePaidDiagnostic = () => {
    const message =
      language === "es"
        ? "Solicito una auditoría / diagnóstico UX con evidencia (WCAG, heurísticas y plan P0–P2). Vi la muestra en /auditoria."
        : "I'd like a UX audit / diagnostic with evidence (WCAG, heuristics, and a P0–P2 plan). I reviewed the sample on /auditoria.";
    navigateToContactAssistant(navigate, {
      origin: "audit-page",
      source: "cta",
      intent: "consulting",
      packageId: "radar",
      consultingQ1: "portfolio",
      message,
    });
  };

  const externalLinkLabel = (label: string) => `${label} (${copy.opensNewTab})`;

  return (
    <PageShell crumbs={[{ label: t.breadcrumbs.audit, current: true }]}>
      <SEOHead
        {...t.seo.pages.audit}
        keywords={t.seo.keywords}
        url={canonicalFromPath("/auditoria")}
        type="article"
        noIndex
      />

      <header
        id="audit-sample"
        className="border-b border-border/60 bg-background px-4 py-8 no-print"
      >
        <div className="container mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              {auditData.meta.title}
            </h1>
            <p className="max-w-2xl text-sm text-muted-foreground">{auditData.meta.subtitle}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <User className="h-4 w-4 text-primary" aria-hidden="true" />
                <span>
                  {auditData.meta.author} · {SEO_SITE.role}
                </span>
              </span>
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" aria-hidden="true" />
                <time dateTime={auditData.meta.date}>
                  {new Date(auditData.meta.date).toLocaleDateString(
                    language === "es" ? "es-ES" : "en-US",
                    { day: "numeric", month: "long", year: "numeric" }
                  )}
                </time>
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-brand-gradient px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            {copy.downloadPdf}
          </button>
        </div>
      </header>

      <PremiumUxAuditBanner
        variant="hero"
        titleTag="p"
        onStartConsulting={handleStartConsulting}
        onViewSampleAudit={() => scrollToSection("audit-executive-summary")}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-16 lg:py-24 space-y-24">
        <section aria-labelledby="audit-executive-summary">
          <SectionHeading id="audit-executive-summary" title={copy.sections.executiveSummary} />

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <div className="p-6 rounded-xl bg-[color:var(--stat-tint-rose)] border border-border">
              <div className="text-4xl font-medium text-[color:var(--stat-tint-rose-fg)] mb-2">5</div>
              <div className="text-sm text-foreground">{copy.stats.criticalRisks}</div>
            </div>
            <div className="p-6 rounded-xl bg-[color:var(--stat-tint-blue)] border border-border">
              <div className="text-4xl font-medium text-[color:var(--stat-tint-blue-fg)] mb-2">6</div>
              <div className="text-sm text-foreground">{copy.stats.seoQuickWins}</div>
            </div>
            <div className="p-6 rounded-xl bg-[color:var(--stat-tint-amber)] border border-border">
              <div className="text-4xl font-medium text-[color:var(--stat-tint-amber-fg)] mb-2">3</div>
              <div className="text-sm text-foreground">{copy.stats.mentorshipSessions}</div>
            </div>
          </div>

          <div className="p-8 bg-gradient-to-br from-card to-muted/30 border border-border rounded-xl">
            <p className="text-lg leading-relaxed text-foreground">{auditData.executiveSummary}</p>
          </div>
        </section>

        <section aria-labelledby="audit-visual-analysis">
          <SectionHeading id="audit-visual-analysis" title={copy.sections.visualAnalysis} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {auditData.portfolioSections.map((section) => (
              <article key={section.id} className="flex flex-col">
                <div className="bg-card border border-border rounded-xl p-4 h-full">
                  <div className="mb-3 pb-3 border-b border-border flex items-center justify-between gap-3">
                    <h3 className="text-sm font-medium text-foreground">{section.title}</h3>
                    <span className="text-xs px-2 py-0.5 rounded bg-destructive/10 text-destructive font-medium whitespace-nowrap">
                      {copy.issuesCount.replace("{count}", "3")}
                    </span>
                  </div>
                  <div
                    className="aspect-[3/4] bg-muted/30 rounded-lg flex flex-col items-center justify-center p-6 text-center"
                    role="img"
                    aria-label={copy.visualMock}
                  >
                    {section.id === "hero" && (
                      <>
                        <div className="w-16 h-16 rounded-full bg-muted mb-3" aria-hidden="true" />
                        <p className="text-sm text-muted-foreground">"Digital and Front-end"</p>
                        <p className="text-xs text-muted-foreground mt-1">"layout Designer"</p>
                        <p className="text-xs text-primary mt-2 italic">"engaging user experiences"</p>
                      </>
                    )}
                    {section.id === "projects" && (
                      <div className="grid grid-cols-2 gap-2 w-full" aria-hidden="true">
                        {["No-code", "Digital", "Frontend", "UI"].map((label) => (
                          <div
                            key={label}
                            className="aspect-square bg-muted/30 rounded border border-border flex flex-col items-center justify-center gap-1"
                          >
                            <p className="text-xs text-muted-foreground">{label}</p>
                            <p className="text-xs text-primary">"Visit Page"</p>
                          </div>
                        ))}
                      </div>
                    )}
                    {section.id === "case-study" && (
                      <div className="space-y-2 w-full" aria-hidden="true">
                        <div className="w-full h-24 bg-muted/30 rounded border border-dashed border-border flex items-center justify-center">
                          <p className="text-xs text-muted-foreground">Visual</p>
                        </div>
                        <div className="space-y-1">
                          <div className="h-2 bg-muted/50 rounded w-3/4" />
                          <div className="h-2 bg-muted/50 rounded w-full" />
                          <div className="p-2 bg-destructive/5 border border-destructive/20 rounded">
                            <p className="text-xs text-destructive text-center">CERO métricas</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <ul className="mt-4 space-y-2" aria-label={section.title}>
                  {section.observations.map((obs, idx) => (
                    <li
                      key={idx}
                      className="p-3 bg-[#FFF1F2] dark:bg-card border-l-2 border-primary rounded text-sm text-foreground leading-snug"
                    >
                      {obs}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="audit-findings">
          <SectionHeading id="audit-findings" title={copy.sections.findings} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {auditData.mainFindings.map((finding, index) => {
              const isHigh = finding.severity === "high";
              const severityLabel = isHigh ? copy.severity.high : copy.severity.medium;
              const severityAnnouncement = isHigh
                ? copy.severity.highAnnouncement
                : copy.severity.mediumAnnouncement;

              return (
                <article
                  key={index}
                  className={cn(
                    "p-5 rounded-lg border",
                    isHigh
                      ? "bg-destructive/5 border-destructive/20 border-l-4 border-l-destructive"
                      : "bg-muted/50 border-border"
                  )}
                >
                  <div className="flex items-start gap-3 mb-2 flex-wrap">
                    {isHigh && (
                      <div
                        className="w-5 h-5 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0"
                        aria-hidden="true"
                      >
                        <span className="text-destructive text-xs font-bold">!</span>
                      </div>
                    )}
                    <h3 className="flex-1 text-foreground font-medium">
                      <span className="sr-only">{severityAnnouncement}: </span>
                      {finding.category}
                    </h3>
                    <span
                      className={cn(
                        "text-xs px-2 py-0.5 rounded font-medium",
                        isHigh
                          ? "bg-destructive/10 text-destructive"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {severityLabel}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{finding.description}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section
          className="relative"
          aria-labelledby="audit-quick-wins"
        >
          <div
            className="absolute inset-0 bg-gradient-to-br from-primary/5 to-orange-500/5 rounded-2xl -z-10"
            aria-hidden="true"
          />
          <div className="p-8 lg:p-12">
            <SectionHeading
              id="audit-quick-wins"
              title={copy.sections.quickWins}
              subtitle={copy.sections.quickWinsSubtitle}
            />
            <ol className="grid md:grid-cols-2 gap-4 list-none p-0 m-0">
              {auditData.quickWins.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-4 p-6 bg-card border border-border rounded-xl"
                >
                  <div
                    className="number-badge w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm shadow-md text-foreground"
                    aria-hidden="true"
                  >
                    {index + 1}
                  </div>
                  <p className="text-sm pt-1 text-foreground">{item}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="audit-mentorship">
          <SectionHeading
            id="audit-mentorship"
            title={copy.sections.mentorship}
            subtitle={copy.sections.mentorshipSubtitle}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {auditData.mentorshipPlan.map((session) => (
              <article
                key={session.session}
                className="p-6 bg-card border border-border rounded-xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="number-badge w-10 h-10 rounded-xl flex items-center justify-center text-base shadow-md text-foreground"
                    aria-hidden="true"
                  >
                    {session.session}
                  </div>
                  <h3 className="text-lg text-foreground">{session.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-6">{session.objective}</p>
                <div className="space-y-3 pt-4 border-t border-border">
                  <p className="text-xs font-medium text-primary">{copy.sections.deliverables}</p>
                  <ul className="space-y-2">
                    {session.deliverables.map((deliverable, idx) => (
                      <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                        <CheckCircle2
                          className="w-3 h-3 text-primary mt-0.5 flex-shrink-0"
                          aria-hidden="true"
                        />
                        <span>{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          {recommendedPackage && (
            <div className="mt-12 space-y-6 no-print">
              <div className="text-center">
                <h3 className="text-xl font-medium text-foreground">
                  {copy.sections.consultingCtaTitle}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {copy.sections.consultingCtaSubtitle}
                </p>
              </div>
              <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-sm">
                <Badge
                  variant="outline"
                  className="border-primary/25 bg-surface-matte-elevated text-foreground"
                >
                  <Sparkles className="mr-1.5 h-3.5 w-3.5 text-primary" aria-hidden />
                  {copy.sections.consultingCtaPackageLabel}
                </Badge>
                <h4 className="mt-4 text-2xl font-semibold text-foreground">
                  {recommendedPackage.name[language]}
                </h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  {recommendedPackage.tagline[language]}
                </p>
                <p className="mt-1 text-xs font-medium text-primary">
                  {recommendedPackage.duration[language]}
                </p>
                <ul className="mt-6 space-y-2" role="list">
                  {recommendedPackage.deliverables[language].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary"
                        aria-hidden
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  size="lg"
                  className="mt-8 w-full bg-brand-gradient font-semibold hover:opacity-90 sm:w-auto"
                  onClick={handlePaidDiagnostic}
                >
                  {copy.sections.consultingCtaPrimary}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </Button>
                <p className="mt-4 text-xs text-muted-foreground">
                  {copy.sections.consultingCtaNote}
                </p>
              </div>
            </div>
          )}
        </section>

        <section className="relative" aria-labelledby="audit-kpis">
          <div
            className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-primary/5 rounded-2xl -z-10"
            aria-hidden="true"
          />
          <div className="p-8 lg:p-12">
            <SectionHeading id="audit-kpis" title={copy.sections.kpis} />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {auditData.kpis.map((kpi, index) => (
                <div
                  key={index}
                  className="p-6 bg-card border border-border rounded-xl text-center"
                >
                  <div className="text-4xl lg:text-5xl font-medium mb-3 text-foreground">
                    {kpi.target}
                  </div>
                  <div className="text-xs text-muted-foreground leading-relaxed">{kpi.metric}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="audit-figjam">
          <SectionHeading
            id="audit-figjam"
            title={copy.sections.figjam}
            subtitle={copy.sections.figjamSubtitle}
          />
          <p id="audit-figjam-description" className="sr-only">
            {copy.sections.figjamEmbedDescription}
          </p>
          <div className="bg-card border border-border rounded-xl overflow-hidden shadow-xl no-print">
            <iframe
              width="100%"
              height="450"
              src="https://embed.figma.com/board/lEGDG3EDlNI3OOUCucTyyx/PORTAFOLIO?node-id=2-41&embed-host=share"
              title={copy.sections.figjamEmbedTitle}
              aria-describedby="audit-figjam-description"
              className="w-full border border-border"
              loading="lazy"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-3 text-center">
            <a
              href="https://www.figma.com/board/lEGDG3EDlNI3OOUCucTyyx/PORTAFOLIO?node-id=2-41"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
              aria-label={externalLinkLabel(copy.sections.figjamOpen)}
            >
              {copy.sections.figjamOpen} →
            </a>
          </p>
          <p className="print-only hidden text-sm border border-border rounded-lg p-4 mt-4 text-foreground">
            <strong>FigJam Board:</strong> figma.com/board/lEGDG3EDlNI3OOUCucTyyx/PORTAFOLIO?node-id=2-41
          </p>
        </section>

        <section aria-labelledby="audit-seo-aeo">
          <SectionHeading
            id="audit-seo-aeo"
            title={copy.sections.seoAeo}
            subtitle={copy.sections.seoAeoSubtitle}
          />
          <div className="grid gap-4">
            {SEO_ITEMS.map((item, index) => {
              const impactLabel =
                item.impact === "veryHigh"
                  ? copy.impact.veryHigh
                  : item.impact === "high"
                  ? copy.impact.high
                  : copy.impact.medium;

              return (
                <article
                  key={index}
                  className="bg-card border border-border rounded-xl p-6"
                >
                  <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className="number-badge w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm text-foreground"
                        aria-hidden="true"
                      >
                        {index + 1}
                      </div>
                      <h3 className="font-medium text-lg text-foreground">{item.title}</h3>
                    </div>
                    <span
                      className={cn(
                        "text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap",
                        impactClass(item.impact)
                      )}
                    >
                      {impactLabel}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground ml-0 sm:ml-11 leading-relaxed">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="relative" aria-labelledby="audit-action-plan">
          <div
            className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-orange-500/5 rounded-2xl -z-10"
            aria-hidden="true"
          />
          <div className="p-8 lg:p-12">
            <SectionHeading
              id="audit-action-plan"
              title={copy.sections.actionPlan}
              subtitle={copy.sections.actionPlanSubtitle}
            />

            <div className="no-print mb-8 p-6 bg-card border border-border rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-2 gap-3 flex-wrap">
                <p id={progressHintId} className="text-sm font-medium text-foreground">
                  {copy.progressLabel}
                </p>
                <p className="text-sm text-foreground font-medium" aria-live="polite">
                  {progressSummary}
                </p>
              </div>
              <div
                role="progressbar"
                aria-labelledby={progressHintId}
                aria-valuenow={progressPercentage}
                aria-valuemin={0}
                aria-valuemax={100}
                className="w-full h-3 bg-muted rounded-full overflow-hidden"
              >
                <div
                  className="h-full bg-brand-gradient transition-[width] duration-500 motion-reduce:transition-none"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            <ul className="grid gap-4 list-none p-0 m-0" aria-describedby="audit-checklist-hint">
              {checklistItems.map((item) => {
                const statusLabel = copy.statusLabels[item.status];

                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => handleStatusChange(item.id)}
                      aria-label={`${item.task}. ${copy.checklistToggle}. ${statusLabel}`}
                      aria-pressed={item.status === "completed"}
                      className={cn(
                        "w-full p-5 rounded-xl border text-left transition-colors duration-300",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                        item.status === "completed"
                          ? "bg-primary/5 border-primary/30 shadow-sm"
                          : item.status === "in_progress"
                          ? "bg-[color:var(--stat-tint-amber)] border-[color:var(--stat-tint-amber-fg)]/30 shadow-sm"
                          : "bg-card border-border hover:border-primary/20 hover:shadow-md"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <span className="flex-shrink-0 mt-0.5" aria-hidden="true">
                          {item.status === "completed" ? (
                            <CheckCircle2 className="w-5 h-5 text-primary" />
                          ) : item.status === "in_progress" ? (
                            <Clock className="w-5 h-5 text-[color:var(--stat-tint-amber-fg)]" />
                          ) : (
                            <Circle className="w-5 h-5 text-muted-foreground" />
                          )}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p
                            className={cn(
                              "text-sm font-medium text-foreground",
                              item.status === "completed" && "line-through text-muted-foreground"
                            )}
                          >
                            {item.task}
                          </p>
                          <p className="sr-only">{statusLabel}</p>
                        </div>
                        <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground whitespace-nowrap">
                          {item.category}
                        </span>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>

            <p id="audit-checklist-hint" className="no-print text-sm text-muted-foreground mt-8 text-center">
              {copy.checklistHint}
            </p>
          </div>
        </section>

        <footer className="pt-16 mt-16 border-t border-border">
          <div className="h-2 bg-brand-gradient w-full mb-8 rounded-full" aria-hidden="true" />
          <div className="text-center space-y-4">
            <div>
              <p className="text-2xl font-medium text-foreground mb-1">{auditData.meta.author}</p>
              <p className="text-sm text-muted-foreground">{SEO_SITE.role}</p>
            </div>
            <nav aria-label={language === "es" ? "Enlaces del autor" : "Author links"}>
              <ul className="flex items-center justify-center gap-6 text-sm list-none p-0 m-0 flex-wrap">
                <li>
                  <a
                    href="https://vientonorte.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
                    aria-label={externalLinkLabel(copy.footerPortfolio)}
                  >
                    {copy.footerPortfolio}
                  </a>
                </li>
                <li aria-hidden="true" className="text-muted-foreground">
                  ·
                </li>
                <li>
                  <a
                    href={SITE_CONTACT.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
                    aria-label={externalLinkLabel("LinkedIn")}
                  >
                    LinkedIn
                  </a>
                </li>
                <li aria-hidden="true" className="text-muted-foreground">
                  ·
                </li>
                <li>
                  <a
                    href={SITE_CONTACT.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
                    aria-label={externalLinkLabel("GitHub")}
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </nav>
            <p className="text-xs text-muted-foreground pt-4">
              <time dateTime={auditData.meta.date}>
                {new Date(auditData.meta.date).toLocaleDateString(
                  language === "es" ? "es-ES" : "en-US",
                  { year: "numeric", month: "long", day: "numeric" }
                )}
              </time>
            </p>
          </div>
        </footer>
      </div>
    </PageShell>
  );
}