import { useMemo, useState } from "react";
import { ArrowRight, Layers, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageSection } from "../layout/PageSection";
import { SectionHeader } from "../molecules/SectionHeader";
import { ValueProofCard } from "../molecules/ValueProofCard";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";
import {
  getValueProofItems,
  VALUE_PROOF_EXTERNAL_URLS,
  type ValueProofKind,
} from "../../data/value-content-arsenal";
import {
  CONSULTING_PACKAGES,
  type ConsultingPackageId,
} from "../../data/vientonorte-consulting";
import { ROUTES } from "../../lib/routes";
import { trackEvent } from "../../lib/analytics";
import { cn } from "../../lib/utils";
import { scrollToSection } from "../../lib/scroll-to-section";
import { goToContactWithIntent } from "../../lib/lead-intent";

type FilterId = "all" | ValueProofKind;

/** Una pieza destacada; el resto solo si el usuario pide más (sin sensación de scroll infinito). */
const INITIAL_VISIBLE_COUNT = 1;
const LOAD_MORE_INCREMENT = 3;

interface ValueContentArsenalProps {
  showBundleStrip?: boolean;
  onStartOnboarding?: (packageId?: ConsultingPackageId) => void;
}

export function ValueContentArsenal({
  showBundleStrip = true,
  onStartOnboarding,
}: ValueContentArsenalProps) {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = useTranslation(language).valueArsenal;
  const [filter, setFilter] = useState<FilterId>("all");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  const items = useMemo(() => getValueProofItems(language), [language]);

  const filtered = useMemo(
    () => (filter === "all" ? items : items.filter((item) => item.kind === filter)),
    [filter, items]
  );

  const visibleItems = useMemo(
    () => filtered.slice(0, visibleCount),
    [filtered, visibleCount]
  );

  const hasMore = visibleCount < filtered.length;

  const handleFilterChange = (id: FilterId) => {
    setFilter(id);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  const filters: { id: FilterId; label: string }[] = [
    { id: "all", label: t.filters.all },
    { id: "prototype", label: t.filters.prototype },
    { id: "poc", label: t.filters.poc },
    { id: "audit", label: t.filters.audit },
    { id: "case", label: t.filters.case },
  ];

  const goToLeadForm = (proofId?: string) => {
    trackEvent("value_arsenal_lead_cta", { proof_id: proofId ?? "section" });
    if (onStartOnboarding) {
      onStartOnboarding();
      return;
    }
    const msg =
      language === "es"
        ? `Hola — vi el recurso «${proofId ?? "landing"}» y quiero conversar sobre alcance.`
        : `Hi — I saw the «${proofId ?? "landing"}» resource and want to talk scope.`;
    if (document.getElementById("contacto")) {
      goToContactWithIntent(scrollToSection, msg);
      return;
    }
    navigate(ROUTES.home, { state: { scrollTo: "contacto" } });
  };

  const openProof = (id: string, href: string, external?: boolean) => {
    // Apple-style: mock/evidence opens preview; live external only for true prototypes
    trackEvent("value_arsenal_view", { proof_id: id, mode: "mock_or_route" });
    if (external || href.startsWith("http")) {
      // Prefer lead path for figma.site demos — mock landing is primary
      if (href.includes("figma.site")) {
        trackEvent("demo_mockup_intent", { proof_id: id });
        goToLeadForm(id);
        return;
      }
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }
    if (href.includes("#")) {
      const [path, hash] = href.split("#");
      navigate(path || ROUTES.consulting, { state: { scrollTo: hash } });
      return;
    }
    navigate(href);
  };

  const startBundle = (bundleId: ConsultingPackageId, proofId: string) => {
    trackEvent("value_arsenal_bundle", { proof_id: proofId, bundle_id: bundleId });
    if (onStartOnboarding) {
      onStartOnboarding(bundleId);
      return;
    }
    navigate(ROUTES.consulting, { state: { recommendedPackage: bundleId, scrollTo: "consultoria-onboarding" } });
  };

  const loadMore = () => {
    setVisibleCount((count) => Math.min(count + LOAD_MORE_INCREMENT, filtered.length));
  };

  const scrollToOnboarding = () => {
    goToLeadForm("bundle");
  };

  return (
    <PageSection
      id="recursos"
      padding="default"
      width="wide"
      tone="matte"
      aria-labelledby="value-arsenal-heading"
    >
      <SectionHeader
        badge={t.badge}
        badgeIcon={Sparkles}
        title={t.title}
        description={t.description}
        titleId="value-arsenal-heading"
      />

      <div
        className="mb-8 flex flex-wrap justify-center gap-2"
        role="tablist"
        aria-label={t.filterAriaLabel}
      >
        {filters.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={filter === item.id}
            onClick={() => handleFilterChange(item.id)}
            className={cn(
              "min-h-[44px] rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              filter === item.id
                ? "border-primary/30 bg-primary/10 text-primary"
                : "border-border bg-background/80 text-muted-foreground hover:border-primary/20 hover:text-foreground"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <p className="mb-6 text-center text-sm text-muted-foreground" aria-live="polite">
        {t.showingCount
          .replace("{visible}", String(visibleItems.length))
          .replace("{total}", String(filtered.length))}
      </p>

      {/*
        Cards horizontales a ancho completo (md+): llenan el viewport
        y evitan el hueco vacío de “1 de N” en grid de 3 columnas.
        Móvil: apiladas (imagen arriba).
      */}
      <ul className="flex w-full flex-col gap-5 md:gap-6" role="list">
        {visibleItems.map((item, index) => {
          const href = VALUE_PROOF_EXTERNAL_URLS[item.id] ?? item.href;

          return (
            <li key={item.id} className="w-full min-w-0">
              <ValueProofCard
                kind={item.kind}
                kindLabel={item.kindLabel}
                title={item.title}
                outcome={item.outcome}
                metric={item.metric}
                image={item.image}
                viewLabel={t.viewProof}
                index={index}
                layout="horizontal"
                onView={() => openProof(item.id, href, item.external)}
              />
              <div className="mt-2 flex justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-primary"
                  onClick={() => goToLeadForm(item.id)}
                >
                  {t.ctaLead}
                  <ArrowRight className="ml-1 h-3.5 w-3.5" aria-hidden />
                </Button>
              </div>
            </li>
          );
        })}
      </ul>

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <Button
            type="button"
            size="lg"
            variant="outline"
            className="min-w-[12rem] border-primary/25"
            onClick={loadMore}
          >
            {t.loadMore}
          </Button>
        </div>
      )}

      {showBundleStrip && (
        <div className="mt-12 md:mt-16 overflow-hidden rounded-2xl border border-[color:var(--logo-surface-border)] bg-surface-matte-elevated p-6 md:p-8">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-primary" aria-hidden />
                <p className="text-sm font-semibold text-foreground">{t.bundleStripTitle}</p>
              </div>
              <p className="text-sm text-muted-foreground">{t.bundleStripDescription}</p>
            </div>
            <Badge variant="outline" className="w-fit border-primary/25 text-foreground">
              {t.bundleStripBadge}
            </Badge>
          </div>

          <ul className="mb-6 grid gap-3 md:grid-cols-3" role="list">
            {CONSULTING_PACKAGES.map((pkg) => (
              <li key={pkg.id}>
                <button
                  type="button"
                  onClick={() => startBundle(pkg.id, "bundle-strip")}
                  className={cn(
                    "h-full w-full rounded-xl border p-4 text-left transition-colors",
                    "border-[color:var(--logo-surface-border)] bg-surface-matte hover:border-primary/25",
                    pkg.featured && "ring-1 ring-primary/20"
                  )}
                >
                  <p className="font-semibold text-foreground">{pkg.name[language]}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{pkg.tagline[language]}</p>
                  {pkg.featured && (
                    <span className="mt-2 inline-block text-[10px] font-semibold uppercase tracking-wide text-primary">
                      {t.recommended}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button
              size="lg"
              className="bg-brand-gradient font-semibold hover:opacity-90"
              onClick={scrollToOnboarding}
            >
              {t.bundleCta}
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                if (document.getElementById("arbol")) {
                  scrollToSection("arbol");
                  return;
                }
                navigate(ROUTES.consulting, { state: { scrollTo: "arbol" } });
              }}
            >
              {t.treeCta}
            </Button>
          </div>
        </div>
      )}
    </PageSection>
  );
}