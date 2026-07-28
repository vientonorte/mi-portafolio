import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SEOHead } from "../components/atoms/SEOHead";
import { PageShell } from "../components/layout/PageShell";
import { ConsultoriaLandingHero } from "../components/organisms/ConsultoriaLandingHero";
import { ConsultoriaN2NMethod } from "../components/organisms/ConsultoriaN2NMethod";
import { ConsultoriaPackages } from "../components/organisms/ConsultoriaPackages";
import { ConsultoriaEducationPartner } from "../components/organisms/ConsultoriaEducationPartner";
import { ConsultoriaDemoShowcase } from "../components/organisms/ConsultoriaDemoShowcase";
import { ConsultoriaOnboarding } from "../components/organisms/ConsultoriaOnboarding";
import { Contact } from "../components/organisms/Contact";
import { ProcessNavigation } from "../components/molecules/ProcessNavigation";
import { StickyCTA } from "../components/molecules/StickyCTA";
import {
  PARTNER_EDU_CONTACT_GOAL,
  type ConsultingPackageId,
} from "../data/vientonorte-consulting";
import { APP_ONBOARDING_GOAL, C1_ONBOARDING_GOAL } from "../data/n2n-method";
import { useLanguage } from "../lib/LanguageContext";
import { useTranslation } from "../lib/i18n";
import { CONSULTORIA_FUNNEL_KICKOFF_ID } from "../lib/nav-config";
import { canonicalFromPath } from "../lib/seo";
import { withHomeCrumb } from "../lib/breadcrumb-helpers";
import {
  runPendingSectionScroll,
  type SectionScrollState,
} from "../lib/navigate-to-section";
import { consumePendingSectionScroll } from "../lib/normalize-hash-url";
import { scrollToSection } from "../lib/scroll-to-section";
import type { ProcessNavSection } from "../hooks/useProcessSectionSpy";

type ConsultoriaLocationState = SectionScrollState & {
  recommendedPackage?: ConsultingPackageId;
  c1Goal?: boolean;
  appGoal?: boolean;
};

type EntryGoalKind = "c1" | "education" | "app" | null;

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
  const [goalKind, setGoalKind] = useState<EntryGoalKind>(() => {
    if (entryState?.appGoal) return "app";
    if (entryState?.c1Goal) return "c1";
    return null;
  });
  const [entryNonce, setEntryNonce] = useState(0);

  const locationState = location.state as ConsultoriaLocationState | null;
  const recommendedPackage =
    selectedPackage ?? locationState?.recommendedPackage;

  const initialGoal =
    goalKind === "c1"
      ? C1_ONBOARDING_GOAL[language]
      : goalKind === "education"
        ? PARTNER_EDU_CONTACT_GOAL[language]
        : goalKind === "app"
          ? APP_ONBOARDING_GOAL[language]
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
        ...(state?.appGoal ? { appGoal: true } : {}),
      },
    });
  }, [location.pathname, location.state, navigate]);

  /**
   * Entra al onboarding sin pasos de más:
   * - packageId → salta welcome + re-elección de modalidad
   * - c1Goal / appGoal / education → goal e industria prearmados
   */
  const scrollToOnboarding = (
    packageId?: ConsultingPackageId,
    options?: { c1Goal?: boolean; education?: boolean; appGoal?: boolean }
  ) => {
    if (packageId) {
      setSelectedPackage(packageId);
      setPackageLocked(true);
    } else {
      setPackageLocked(false);
    }

    if (options?.education) setGoalKind("education");
    else if (options?.appGoal) setGoalKind("app");
    else if (options?.c1Goal) setGoalKind("c1");
    else if (packageId) setGoalKind(null);
    // sticky sin package: limpia goal forzado
    else setGoalKind(null);

    setEntryNonce((n) => n + 1);

    requestAnimationFrame(() => {
      scrollToSection(CONSULTORIA_FUNNEL_KICKOFF_ID);
    });
  };

  /** Hero secondary CTA → modalidades (Radar · Marco · Ops). */
  const scrollToModalidades = () => {
    scrollToSection("modalidades");
  };

  const funnelNav = t.consultoria.landing.nav;

  /** Embudo: ofertas → kickoff → método → prueba → contacto. */
  const funnelSections: ProcessNavSection[] = useMemo(
    () => [
      { id: "modalidades", label: funnelNav.packages, number: "01" },
      {
        id: CONSULTORIA_FUNNEL_KICKOFF_ID,
        label: funnelNav.start,
        number: "02",
      },
      { id: "metodo-n2n", label: funnelNav.n2n, number: "03" },
      { id: "consultoria-demo", label: funnelNav.evidence, number: "04" },
      { id: "contacto", label: funnelNav.contact, number: "05" },
    ],
    [
      funnelNav.contact,
      funnelNav.evidence,
      funnelNav.n2n,
      funnelNav.packages,
      funnelNav.start,
    ]
  );

  return (
    <PageShell
      showLogoText={false}
      crumbs={withHomeCrumb(t.breadcrumbs.home, () => navigate("/"), [
        { label: t.breadcrumbs.consulting, current: true },
      ])}
    >
      <SEOHead
        {...t.seo.pages.consultoria}
        keywords={t.seo.keywords}
        url={canonicalFromPath("/consultoria/embudo")}
      />

      <ProcessNavigation
        sections={funnelSections}
        mobileAriaLabel={funnelNav.ariaLabel}
      />

      {/*
        Path principal (anti-ruido):
        Hero ofertas → detalle entregables → onboarding → método → prueba.
        Sin calculadora ni árbol (duplicaban la decisión del hero).
      */}
      <ConsultoriaLandingHero
        onStartOnboarding={(packageId, options) =>
          scrollToOnboarding(packageId, options)
        }
        onExploreEvidence={scrollToModalidades}
      />

      <ConsultoriaPackages
        onSelectPackage={(id, options) =>
          scrollToOnboarding(id, { appGoal: options?.appGoal })
        }
      />

      <div
        id={CONSULTORIA_FUNNEL_KICKOFF_ID}
        className="scroll-mt-[calc(var(--header-height)+0.75rem)]"
      >
        <ConsultoriaOnboarding
          key={`onboarding-${entryNonce}-${recommendedPackage ?? "none"}-${goalKind ?? "x"}`}
          initialPackageId={recommendedPackage}
          initialGoal={initialGoal}
          initialIndustry={initialIndustry}
          packageLocked={packageLocked && Boolean(recommendedPackage)}
        />
      </div>

      <ConsultoriaN2NMethod
        onStartOnboarding={() => scrollToOnboarding("marco")}
      />

      <ConsultoriaEducationPartner
        onStartOnboarding={() =>
          scrollToOnboarding("marco", { education: true })
        }
      />

      <ConsultoriaDemoShowcase />

      {/* Cierre embudo: Contact en modo consultoría (intent fijo, sin laboral/freelance) */}
      <Contact surface="consulting" />

      <StickyCTA
        label={t.consultoria.stickyCta}
        ariaLabel={t.consultoria.stickyCta}
        onClick={() => scrollToOnboarding()}
        showAfterScroll={480}
      />
    </PageShell>
  );
}
