import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SEOHead } from "../components/atoms/SEOHead";
import { PageShell } from "../components/layout/PageShell";
import { ValueContentArsenal } from "../components/organisms/ValueContentArsenal";
import { ConsultoriaDemoShowcase } from "../components/organisms/ConsultoriaDemoShowcase";
import { ConsultoriaTreePreview } from "../components/organisms/ConsultoriaTreePreview";
import { ConsultoriaOnboarding } from "../components/organisms/ConsultoriaOnboarding";
import type { ConsultingPackageId } from "../data/vientonorte-consulting";
import { useLanguage } from "../lib/LanguageContext";
import { useTranslation } from "../lib/i18n";
import { canonicalFromPath } from "../lib/seo";
import { withHomeCrumb } from "../lib/breadcrumb-helpers";
import {
  runPendingSectionScroll,
  type SectionScrollState,
} from "../lib/navigate-to-section";
import { consumePendingSectionScroll } from "../lib/normalize-hash-url";

type ConsultoriaLocationState = SectionScrollState & {
  recommendedPackage?: ConsultingPackageId;
};

export default function ConsultoriaVientoNorte() {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [recommendedPackage, setRecommendedPackage] = useState<ConsultingPackageId | undefined>();

  useEffect(() => {
    const state = location.state as ConsultoriaLocationState | null;
    if (state?.recommendedPackage) {
      setRecommendedPackage(state.recommendedPackage);
    }

    const scrollTo =
      state?.scrollTo ?? consumePendingSectionScroll(location.pathname);

    if (!scrollTo) return;

    runPendingSectionScroll(scrollTo);
    navigate(location.pathname, { replace: true, state: null });
  }, [location.pathname, location.state, navigate]);

  const scrollToOnboarding = (packageId?: ConsultingPackageId) => {
    if (packageId) setRecommendedPackage(packageId);
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
      <ValueContentArsenal onStartOnboarding={scrollToOnboarding} />
      <ConsultoriaDemoShowcase />
      <ConsultoriaTreePreview
        onRecommendPackage={setRecommendedPackage}
        onStartOnboarding={() => scrollToOnboarding()}
      />
      <div id="consultoria-onboarding">
        <ConsultoriaOnboarding initialPackageId={recommendedPackage} />
      </div>
    </PageShell>
  );
}