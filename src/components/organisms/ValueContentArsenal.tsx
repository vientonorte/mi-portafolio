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

type FilterId = "all" | ValueProofKind;

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

  const items = useMemo(() => getValueProofItems(language), [language]);

  const filtered = useMemo(
    () => (filter === "all" ? items : items.filter((item) => item.kind === filter)),
    [filter, items]
  );

  const filters: { id: FilterId; label: string }[] = [
    { id: "all", label: t.filters.all },
    { id: "prototype", label: t.filters.prototype },
    { id: "poc", label: t.filters.poc },
    { id: "audit", label: t.filters.audit },
    { id: "case", label: t.filters.case },
  ];

  const openProof = (id: string, href: string, external?: boolean) => {
    trackEvent("value_arsenal_view", { proof_id: id });
    if (external || href.startsWith("http")) {
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

  const scrollToOnboarding = () => {
    if (onStartOnboarding) {
      onStartOnboarding();
      return;
    }
    document.getElementById("consultoria-onboarding")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <PageSection
      id="valor"
      padding="spacious"
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
            onClick={() => setFilter(item.id)}
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

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" role="list">
        {filtered.map((item, index) => {
          const bundle = CONSULTING_PACKAGES.find((pkg) => pkg.id === item.bundleId);
          const href = VALUE_PROOF_EXTERNAL_URLS[item.id] ?? item.href;

          return (
            <li key={item.id} className="h-full">
              <ValueProofCard
                kind={item.kind}
                kindLabel={item.kindLabel}
                title={item.title}
                outcome={item.outcome}
                metric={item.metric}
                image={item.image}
                bundleLabel={`${t.bundleFit}: ${bundle?.name[language] ?? item.bundleId}`}
                viewLabel={t.viewProof}
                index={index}
                onView={() => openProof(item.id, href, item.external)}
                onBundle={() => startBundle(item.bundleId, item.id)}
              />
            </li>
          );
        })}
      </ul>

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
              onClick={() => navigate(ROUTES.consulting, { state: { scrollTo: "arbol" } })}
            >
              {t.treeCta}
            </Button>
          </div>
        </div>
      )}
    </PageSection>
  );
}