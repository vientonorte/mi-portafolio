/**
 * POC · Product onboarding estilo Apple (no embudo prod).
 * Referencias craft: RIA onboarding, X|CMS / GEES demos, Map FigJam rediseño.
 * Ruta: /#/poc/product-onboarding
 */
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Calendar, ChevronDown } from "lucide-react";
import { SEOHead } from "../components/atoms/SEOHead";
import { Button } from "../components/ui/button";
import { useLanguage } from "../lib/LanguageContext";
import { freeRadarHasSchedule, openFreeRadarEntry } from "../lib/free-radar-entry";
import { ROUTES } from "../lib/routes";
import { cn } from "../lib/utils";
import { portfolioImages } from "../lib/portfolio-image-urls";

const STEPS = ["welcome", "clarity", "proof", "start"] as const;
type StepId = (typeof STEPS)[number];

const STEP_MEDIA = {
  welcome: portfolioImages.sura.riaOnboarding,
  clarity: portfolioImages.consultoria.xCmsDashboard,
  proof: portfolioImages.consultoria.geesDashboard,
  start: portfolioImages.sura.onboardingFlags,
} as const;

export default function PocProductOnboarding() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const es = language === "es";
  const [active, setActive] = useState(0);
  const scheduleReady = freeRadarHasSchedule();

  const copy = es
    ? {
        badge: "POC · no es la landing de producción",
        skip: "Ir a consultoría",
        steps: [
          {
            kicker: "Viento Norte",
            title: "Un front office\nque se entiende en un aliento.",
            body: "Ex Agencia Maraña. UXtech: captación, freemium a11y y evidencia enterprise — sin ruido de nueve botones.",
          },
          {
            kicker: "Claridad",
            title: "Un path.\nUn job.\nUna agenda real.",
            body: "Hero → modalidades → onboarding → contacto. Free a11y abre Google Calendar. Sin segunda agenda fantasma.",
          },
          {
            kicker: "Prueba",
            title: "Craft que ya construiste.",
            body: "RIA SURA (onboarding multi-país), demos producto, design systems. Esta POC toma ese ritmo visual — no reinventar demos Apple en el funnel principal.",
          },
          {
            kicker: "Empezar",
            title: "Reserva 30 min\no escribe alcance.",
            body: scheduleReady
              ? "Agenda online de Viento Norte (Appointment Schedule). O cierra el embudo en consultoría."
              : "Configura VITE_A11Y_FREE_SCHEDULE_URL para la agenda. Mientras, el embudo de consultoría sigue vivo.",
          },
        ],
        ctaSchedule: "Abrir agenda Google",
        ctaFunnel: "Empezar en consultoría",
        ctaNext: "Continuar",
        ctaDone: "Listo",
        hint: "Scroll o flechas · estilo producto",
      }
    : {
        badge: "POC · not production landing",
        skip: "Go to consulting",
        steps: [
          {
            kicker: "Viento Norte",
            title: "A front office\nyou get in one breath.",
            body: "Formerly Agencia Maraña. UXtech: capture, free a11y, enterprise proof — without nine-button noise.",
          },
          {
            kicker: "Clarity",
            title: "One path.\nOne job.\nOne real calendar.",
            body: "Hero → packages → onboarding → contact. Free a11y opens Google Calendar. No ghost second schedule.",
          },
          {
            kicker: "Proof",
            title: "Craft you already shipped.",
            body: "RIA SURA multi-country onboarding, product demos, design systems. This POC borrows that visual rhythm — not Apple banners in the main funnel.",
          },
          {
            kicker: "Start",
            title: "Book 30 minutes\nor write scope.",
            body: scheduleReady
              ? "Viento Norte online Appointment Schedule. Or finish the consulting funnel."
              : "Set VITE_A11Y_FREE_SCHEDULE_URL for the schedule. Consulting funnel stays live.",
          },
        ],
        ctaSchedule: "Open Google Calendar",
        ctaFunnel: "Start consulting",
        ctaNext: "Continue",
        ctaDone: "Done",
        hint: "Scroll or arrows · product style",
      };

  const go = useCallback(
    (i: number) => {
      setActive(Math.max(0, Math.min(STEPS.length - 1, i)));
      document
        .getElementById(`poc-step-${STEPS[Math.max(0, Math.min(STEPS.length - 1, i))]}`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    []
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        go(active + 1);
      }
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        go(active - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, go]);

  useEffect(() => {
    const els = STEPS.map((id) => document.getElementById(`poc-step-${id}`)).filter(
      Boolean
    ) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible?.target.id) return;
        const idx = STEPS.findIndex((s) => `poc-step-${s}` === visible.target.id);
        if (idx >= 0) setActive(idx);
      },
      { threshold: [0.45, 0.6] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const openSchedule = () => {
    openFreeRadarEntry(navigate, language, "free-radar", { mode: "schedule" });
  };

  return (
    <>
      <SEOHead
        title={es ? "POC Onboarding producto · Viento Norte" : "POC Product onboarding · Viento Norte"}
        description={
          es
            ? "Prueba de concepto: onboarding de producto estilo Apple para el front office VN."
            : "Proof of concept: Apple-style product onboarding for VN front office."
        }
        noIndex
      />

      <div className="relative min-h-screen bg-[var(--vn-azul-noche,#0d1b3d)] text-[var(--vn-marfil,#f7f2e7)]">
        {/* Chrome mínimo */}
        <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-4 py-3 md:px-8">
          <span className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-[11px] font-medium tracking-wide backdrop-blur">
            {copy.badge}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-white/80 hover:bg-white/10 hover:text-white"
            onClick={() => navigate(ROUTES.consulting)}
          >
            {copy.skip}
            <ArrowRight className="ml-1 h-3.5 w-3.5" aria-hidden />
          </Button>
        </header>

        {/* Dots */}
        <nav
          className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2 md:flex"
          aria-label={es ? "Pasos" : "Steps"}
        >
          {STEPS.map((id, i) => (
            <button
              key={id}
              type="button"
              aria-label={`${i + 1}`}
              aria-current={active === i ? "step" : undefined}
              className={cn(
                "h-2.5 w-2.5 rounded-full transition-all",
                active === i ? "scale-125 bg-white" : "bg-white/30 hover:bg-white/60"
              )}
              onClick={() => go(i)}
            />
          ))}
        </nav>

        {STEPS.map((id, i) => {
          const step = copy.steps[i];
          const media = STEP_MEDIA[id as StepId];
          const isLast = i === STEPS.length - 1;
          return (
            <section
              key={id}
              id={`poc-step-${id}`}
              className="flex min-h-[100dvh] flex-col justify-center px-5 pb-16 pt-20 md:px-16 lg:px-24"
              aria-labelledby={`poc-title-${id}`}
            >
              <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div className="space-y-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                    {step.kicker}
                  </p>
                  <h1
                    id={`poc-title-${id}`}
                    className="whitespace-pre-line text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl"
                  >
                    {step.title}
                  </h1>
                  <p className="max-w-md text-base leading-relaxed text-white/70 md:text-lg">
                    {step.body}
                  </p>
                  <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
                    {isLast ? (
                      <>
                        {scheduleReady ? (
                          <Button
                            size="lg"
                            className="min-h-[48px] bg-white font-semibold text-[#0d1b3d] hover:bg-white/90"
                            onClick={openSchedule}
                          >
                            <Calendar className="mr-2 h-4 w-4" aria-hidden />
                            {copy.ctaSchedule}
                          </Button>
                        ) : null}
                        <Button
                          size="lg"
                          variant="outline"
                          className="min-h-[48px] border-white/30 bg-transparent font-semibold text-white hover:bg-white/10"
                          onClick={() => navigate(ROUTES.consulting)}
                        >
                          {copy.ctaFunnel}
                          <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                        </Button>
                      </>
                    ) : (
                      <Button
                        size="lg"
                        className="min-h-[48px] bg-white font-semibold text-[#0d1b3d] hover:bg-white/90"
                        onClick={() => go(i + 1)}
                      >
                        {copy.ctaNext}
                        <ChevronDown className="ml-2 h-4 w-4" aria-hidden />
                      </Button>
                    )}
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[#1A8FDC]/30 to-transparent blur-2xl" />
                  <figure className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-2xl">
                    <img
                      src={media}
                      alt=""
                      className="aspect-[4/3] w-full object-cover object-top opacity-95"
                      loading={i === 0 ? "eager" : "lazy"}
                    />
                    <figcaption className="sr-only">{step.kicker}</figcaption>
                  </figure>
                </div>
              </div>

              {!isLast && (
                <p className="mt-12 text-center text-[11px] tracking-wide text-white/35 md:mt-16">
                  {copy.hint}
                </p>
              )}
            </section>
          );
        })}
      </div>
    </>
  );
}
