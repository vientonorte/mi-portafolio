import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SEOHead } from "../components/atoms/SEOHead";
import { PageShell } from "../components/layout/PageShell";
import { ConsultoriaLandingHero } from "../components/organisms/ConsultoriaLandingHero";
import { ConsultoriaPackages } from "../components/organisms/ConsultoriaPackages";
import { Contact } from "../components/organisms/Contact";
import { ProcessNavigation } from "../components/molecules/ProcessNavigation";
import { StickyCTA } from "../components/molecules/StickyCTA";
import { type ConsultingPackageId } from "../data/vientonorte-consulting";
import { openCalendarBooking } from "../lib/site-contact";
import { consultingMotiveMessage } from "../lib/consulting-contact-motive";
import { useLanguage } from "../lib/LanguageContext";
import { useTranslation } from "../lib/i18n";
import { type ContactDraft } from "../lib/contact-draft";
import { ROUTES } from "../lib/routes";
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
};

export default function ConsultoriaVientoNorte() {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();
  const t = useTranslation(language);

  const entryState = location.state as ConsultoriaLocationState | null;

  const [selectedPackage, setSelectedPackage] = useState<
    ConsultingPackageId | undefined
  >(() => entryState?.recommendedPackage);

  useEffect(() => {
    const state = location.state as ConsultoriaLocationState | null;
    const scrollTo =
      state?.scrollTo ?? consumePendingSectionScroll(location.pathname);
    if (!scrollTo) return;
    runPendingSectionScroll(scrollTo);
    navigate(location.pathname, {
      replace: true,
      state: state?.recommendedPackage
        ? { recommendedPackage: state.recommendedPackage }
        : {},
    });
  }, [location.pathname, location.state, navigate]);

  const goContactWithPackage = (packageId?: ConsultingPackageId) => {
    if (packageId) setSelectedPackage(packageId);
    requestAnimationFrame(() => scrollToSection("contacto"));
  };

  const contactDraft = useMemo<ContactDraft>(
    () => ({
      message: selectedPackage
        ? consultingMotiveMessage(selectedPackage, language)
        : "",
      source: "cta",
      intent: "consulting",
      packageId: selectedPackage,
    }),
    [language, selectedPackage]
  );

  const funnelNav = t.consultoria.landing.nav;

  const funnelSections: ProcessNavSection[] = useMemo(
    () => [
      { id: "modalidades", label: funnelNav.packages, number: "01" },
      { id: "contacto", label: funnelNav.contact, number: "02" },
    ],
    [funnelNav.contact, funnelNav.packages]
  );

  const isHomeSurface =
    location.pathname.replace(/\/+$/, "") === "" ||
    location.pathname === "/";

  return (
    <PageShell
      showLogoText={false}
      /* Home FO: sin SubpageToolbar — el header global basta.
         Evita “Inicio › Inicio”, doble ES y chrome de subpágina peligroso. */
      showToolbar={!isHomeSurface}
      crumbs={
        isHomeSurface
          ? []
          : withHomeCrumb(t.breadcrumbs.home, () => navigate(ROUTES.home), [
              { label: t.breadcrumbs.consulting, current: true },
            ])
      }
    >
      {/*
        Embudo FO = home. SEM paid = /#/consultoria (tour).
        Un solo chrome de sitio + TOC embudo + dock. No GTM live.
      */}
      <div
        data-surface="consultoria-funnel"
        data-testid="consultoria-funnel"
        data-role={isHomeSurface ? "fo-home" : "fo-sem-offer"}
        data-first-value-budget-ms={29000}
        data-calendar-sla-ms={30000}
        data-analytics="deferred-no-gtm"
      >
        <SEOHead
          {...(isHomeSurface ? t.seo.pages.home : t.seo.pages.consultoria)}
          isHome={isHomeSurface}
          keywords={
            isHomeSurface
              ? t.seo.keywords
              : (t.seo.pages.consultoria.keywords ?? t.seo.keywords)
          }
          url={canonicalFromPath(
            isHomeSurface ? ROUTES.home : ROUTES.consulting
          )}
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
          onExploreEvidence={() => scrollToSection("modalidades")}
        />

        <ConsultoriaPackages
          onSelectPackage={(id) => goContactWithPackage(id)}
        />

        <section
          id="mas-del-sitio"
          className="container mx-auto max-w-2xl px-4 py-8 text-center"
        >
          <p className="mb-3 text-sm text-muted-foreground">
            {language === "es"
              ? "Método, casos y oferta completa están en páginas interiores."
              : "Method, cases, and the full offer live on interior pages."}
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <Link className="underline-offset-4 hover:underline" to={ROUTES.process}>
              {language === "es" ? "Proceso" : "Process"}
            </Link>
            <Link className="underline-offset-4 hover:underline" to={ROUTES.projects}>
              {language === "es" ? "Proyectos" : "Projects"}
            </Link>
            <Link className="underline-offset-4 hover:underline" to={ROUTES.consulting}>
              {language === "es" ? "Oferta / tour" : "Offer / tour"}
            </Link>
          </div>
        </section>

        <Contact
          key={selectedPackage ?? "none"}
          surface="consulting"
          contactDraft={contactDraft}
        />

        <StickyCTA
          label={t.consultoria.stickyCta}
          ariaLabel={t.consultoria.stickyCta}
          onClick={() => {
            if (!openCalendarBooking()) scrollToSection("contacto");
          }}
          showAfterScroll={480}
        />
      </div>
    </PageShell>
  );
}
