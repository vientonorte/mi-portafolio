import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SEOHead } from "../components/atoms/SEOHead";
import { PageShell } from "../components/layout/PageShell";
import { PremiumUxAuditBanner } from "../components/organisms/PremiumUxAuditBanner";
import { ConsultoriaTreePreview } from "../components/organisms/ConsultoriaTreePreview";
import { ConsultoriaOnboarding } from "../components/organisms/ConsultoriaOnboarding";
import type { ConsultingPackageId } from "../data/vientonorte-consulting";
import { useLanguage } from "../lib/LanguageContext";
import { useTranslation } from "../lib/i18n";
import { canonicalFromPath } from "../lib/seo";
import { withHomeCrumb } from "../lib/breadcrumb-helpers";

export default function ConsultoriaVientoNorte() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [recommendedPackage, setRecommendedPackage] = useState<ConsultingPackageId | undefined>();

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