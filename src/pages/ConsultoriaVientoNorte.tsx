import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SEOHead } from "../components/atoms/SEOHead";
import { PageShell } from "../components/layout/PageShell";
import { ConsultoriaLandingHero } from "../components/organisms/ConsultoriaLandingHero";
import { ConsultoriaN2NMethod } from "../components/organisms/ConsultoriaN2NMethod";
import { ConsultoriaPrivateTooling } from "../components/organisms/ConsultoriaPrivateTooling";
import { ConsultoriaPractices } from "../components/organisms/ConsultoriaPractices";
import { ConsultoriaPackages } from "../components/organisms/ConsultoriaPackages";
import { ConsultoriaEducationPartner } from "../components/organisms/ConsultoriaEducationPartner";
import { ValueContentArsenal } from "../components/organisms/ValueContentArsenal";
import { ConsultoriaDemoShowcase } from "../components/organisms/ConsultoriaDemoShowcase";
import { ConsultoriaTreePreview } from "../components/organisms/ConsultoriaTreePreview";
import { ConsultoriaOnboarding } from "../components/organisms/ConsultoriaOnboarding";
import { AppQuoter } from "../components/organisms/AppQuoter";
import { StickyCTA } from "../components/molecules/StickyCTA";
import {
  PARTNER_EDU_CONTACT_GOAL,
  type ConsultingPackageId,
} from "../data/vientonorte-consulting";
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
import { scrollToSection } from "../lib/scroll-to-section";

type ConsultoriaLocationState = SectionScrollState & {
  recommendedPackage?: ConsultingPackageId;
  c1Goal?: boolean;
};

type EntryGoalKind = "c1" | "education" | null;

export default function ConsultoriaVientoNorte() {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();
  const t = useTranslation(language);

  const entryState = location.state as ConsultoriaLocationState | null;

  const [selectedPackage, setSelectedPackage] = useState<
    ConsultingPackageId | undefined
  >(() => entryState?.recommendedPackage);
  const [packageLocked, setPackageLocked] = useState(
    () => Boolean(entryState?.recommendedPackage)
  );
  const [goalKind, setGoalKind] = useState<EntryGoalKind>(
    entryState?.c1Goal ? "c1" : null
  );
  const [entryNonce, setEntryNonce] = useState(0);

  const locationState = location.state as ConsultoriaLocationState | null;
  const recommendedPackage =
    selectedPackage ?? locationState?.recommendedPackage;

  const initialGoal =
    goalKind === "c1"
      ? C1_ONBOARDING_GOAL[language]
      : goalKind === "education"
        ? PARTNER_EDU_CONTACT_GOAL[language]
        : undefined;

  const initialIndustry =
    goalKind === "education"
      ? language === "es"
        ? "Educación"
        : "Education"
      : undefined;

  useEffect(() => {
    const state = location.state as ConsultoriaLocationState | null;
    const scrollTo =
      state?.scrollTo ?? consumePendingSectionScroll(location.pathname);

    // One-shot scroll entry; package is seeded via useState from location.state
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

  /**
   * Entra al onboarding sin pasos de más:
   * - packageId → salta welcome + re-elección de modalidad
   * - c1Goal / education → goal e industria prearmados
   */
  const scrollToOnboarding = (
    packageId?: ConsultingPackageId,
    options?: { c1Goal?: boolean; education?: boolean }
  ) => {
    if (packageId) {
      setSelectedPackage(packageId);
      setPackageLocked(true);
    } else {
      setPackageLocked(false);
    }

    if (options?.education) setGoalKind("education");
    else if (options?.c1Goal) setGoalKind("c1");
    else if (packageId) setGoalKind(null);
    // sticky sin package: limpia goal forzado
    else setGoalKind(null);

    setEntryNonce((n) => n + 1);

    requestAnimationFrame(() => {
      scrollToSection("consultoria-onboarding");
    });
  };

  const scrollToEvidence = () => {
    scrollToSection("valor");
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
        onStartOnboarding={(packageId, options) =>
          scrollToOnboarding(packageId, options)
        }
        onExploreEvidence={scrollToEvidence}
      />

      <ConsultoriaN2NMethod
        onStartOnboarding={() => scrollToOnboarding("marco")}
      />

      <ConsultoriaPrivateTooling
        onStartOnboarding={(packageId) =>
          scrollToOnboarding(packageId, { c1Goal: true })
        }
      />

      <ConsultoriaPractices />
      <ConsultoriaPackages
        onSelectPackage={(id) => scrollToOnboarding(id)}
      />

      <ConsultoriaEducationPartner
        onStartOnboarding={() =>
          scrollToOnboarding("marco", { education: true })
        }
      />

      {/* Modalidades ya están en ConsultoriaPackages — sin strip duplicado aquí */}
      <ValueContentArsenal
        showBundleStrip={false}
        onStartOnboarding={(id) => scrollToOnboarding(id)}
      />
      <ConsultoriaDemoShowcase />

      <ConsultoriaTreePreview
        onRecommendPackage={setSelectedPackage}
        onStartOnboarding={(packageId) => scrollToOnboarding(packageId)}
      />
      <AppQuoter onRecommendPackage={setSelectedPackage} />

      <div id="consultoria-onboarding">
        <ConsultoriaOnboarding
          key={`onboarding-${entryNonce}-${recommendedPackage ?? "none"}-${goalKind ?? "x"}`}
          initialPackageId={recommendedPackage}
          initialGoal={initialGoal}
          initialIndustry={initialIndustry}
          packageLocked={packageLocked && Boolean(recommendedPackage)}
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
