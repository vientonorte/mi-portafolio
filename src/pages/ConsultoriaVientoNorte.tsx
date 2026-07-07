import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SEOHead } from "../components/atoms/SEOHead";
import { PageShell } from "../components/layout/PageShell";
import { PremiumUxAuditBanner } from "../components/organisms/PremiumUxAuditBanner";
import { ConsultoriaDemoShowcase } from "../components/organisms/ConsultoriaDemoShowcase";
import { ConsultoriaTreePreview } from "../components/organisms/ConsultoriaTreePreview";
import { ConsultoriaOnboarding } from "../components/organisms/ConsultoriaOnboarding";
import type { ConsultingPackageId } from "../data/vientonorte-consulting";
import { useLanguage } from "../lib/LanguageContext";
import { useTranslation } from "../lib/i18n";
import { canonicalFromPath } from "../lib/seo";
import { withHomeCrumb } from "../lib/breadcrumb-helpers";

type ConsultoriaLocationState = { scrollTo?: string };

export default function ConsultoriaVientoNorte() {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [recommendedPackage, setRecommendedPackage] = useState<ConsultingPackageId | undefined>();

  useEffect(() => {
    const scrollTo = (location.state as ConsultoriaLocationState | null)?.scrollTo;
    if (scrollTo !== "arbol") return;

    const timer = window.setTimeout(() => {
      document.getElementById("arbol")?.scrollIntoView({ behavior: "smooth" });
    }, 120);

    navigate(location.pathname, { replace: true, state: null });
    return () => window.clearTimeout(timer);
  }, [location.pathname, location.state, navigate]);

  const scrollToOnboarding = () => {
    document.getElementById("consultoria-onboarding")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <PageShell
      crumbs={withHomeCrumb(t.breadcrumbs.home, () => navigate("/"), [
        { label: t.breadcrumbs.consulting, current: true },
      ])}
    >
      <SEOHead
        {...t.seo.pages.consultoria}
        keywords={t.seo.keywords}
        url={canonicalFromPath("/consultoria")}
      />
      <PremiumUxAuditBanner
        variant="compact"
        onStartConsulting={scrollToOnboarding}
        onViewSampleAudit={() => navigate("/auditoria")}
      />
      <ConsultoriaDemoShowcase />
      <ConsultoriaTreePreview
        onRecommendPackage={setRecommendedPackage}
        onStartOnboarding={scrollToOnboarding}
      />
      <div id="consultoria-onboarding">
        <ConsultoriaOnboarding initialPackageId={recommendedPackage} />
      </div>
    </PageShell>
  );
}