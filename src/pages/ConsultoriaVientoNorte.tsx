import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SEOHead } from "../components/atoms/SEOHead";
import { PageShell } from "../components/layout/PageShell";
import { ConsultoriaLandingHero } from "../components/organisms/ConsultoriaLandingHero";
import { ConsultoriaN2NMethod } from "../components/organisms/ConsultoriaN2NMethod";
import { ConsultoriaPrivateTooling } from "../components/organisms/ConsultoriaPrivateTooling";
import { ConsultoriaPractices } from "../components/organisms/ConsultoriaPractices";
import { ConsultoriaPackages } from "../components/organisms/ConsultoriaPackages";
import { ValueContentArsenal } from "../components/organisms/ValueContentArsenal";
import { ConsultoriaDemoShowcase } from "../components/organisms/ConsultoriaDemoShowcase";
import { ConsultoriaTreePreview } from "../components/organisms/ConsultoriaTreePreview";
import { ConsultoriaOnboarding } from "../components/organisms/ConsultoriaOnboarding";
import { AppQuoter } from "../components/organisms/AppQuoter";
import { StickyCTA } from "../components/molecules/StickyCTA";
import type { ConsultingPackageId } from "../data/vientonorte-consulting";
import { C1_ONBOARDING_GOAL } from "../data/n2n-method";
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
  /** Prefill C1 / N2N goal template */
  c1Goal?: boolean;
};

export default function ConsultoriaVientoNorte() {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [selectedPackage, setSelectedPackage] = useState<
    ConsultingPackageId | undefined
  >();
  const [useC1Goal, setUseC1Goal] = useState(false);
  const locationState = location.state as ConsultoriaLocationState | null;
  const recommendedPackage =
    selectedPackage ?? locationState?.recommendedPackage;
  const initialGoal =
    useC1Goal || locationState?.c1Goal
      ? C1_ONBOARDING_GOAL[language]
      : undefined;

  useEffect(() => {
    const state = location.state as ConsultoriaLocationState | null;
    const scrollTo =
      state?.scrollTo ?? consumePendingSectionScroll(location.pathname);

    if (!scrollTo) return;

    runPendingSectionScroll(scrollTo);
    navigate(location.pathname, {
      replace: true,
      state: {
        ...(state?.recommendedPackage
          ? { recommendedPackage: state.recommendedPackage }
          : {}),
        ...(state?.c1Goal ? { c1Goal: true } : {}),
      },
    });
  }, [location.pathname, location.state, navigate]);

  const scrollToOnboarding = (
    packageId?: ConsultingPackageId,
    options?: { c1Goal?: boolean }
  ) => {
    if (packageId) setSelectedPackage(packageId);
    if (options?.c1Goal) setUseC1Goal(true);
    document
      .getElementById("consultoria-onboarding")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToEvidence = () => {
    document.getElementById("valor")?.scrollIntoView({ behavior: "smooth" });
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

      <ConsultoriaLandingHero
        onStartOnboarding={() => scrollToOnboarding()}
        onExploreEvidence={scrollToEvidence}
      />

      {/* 1. Método N2N + link demo */}
      <ConsultoriaN2NMethod
        onStartOnboarding={() => scrollToOnboarding("marco")}
      />

      {/* 2. C1 Offline / private / IA / 21.719 */}
      <ConsultoriaPrivateTooling
        onStartOnboarding={(packageId) =>
          scrollToOnboarding(packageId, { c1Goal: true })
        }
      />

      <ConsultoriaPractices />
      <ConsultoriaPackages
        onSelectPackage={(id) => scrollToOnboarding(id)}
      />
      <ValueContentArsenal onStartOnboarding={scrollToOnboarding} />
      <ConsultoriaDemoShowcase />

      <ConsultoriaTreePreview
        onRecommendPackage={setSelectedPackage}
        onStartOnboarding={() => scrollToOnboarding()}
      />
      <AppQuoter onRecommendPackage={setSelectedPackage} />

      <div id="consultoria-onboarding">
        <ConsultoriaOnboarding
          initialPackageId={recommendedPackage}
          initialGoal={initialGoal}
        />
      </div>

      <StickyCTA
        label={t.consultoria.stickyCta}
        ariaLabel={t.consultoria.stickyCta}
        onClick={() => scrollToOnboarding()}
        showAfterScroll={480}
      />
    </PageShell>
  );
}
