/**
 * Landing de demo X|CMS para campañas (Google Ads / SEO / LinkedIn SEM).
 * Gate en vientonorte.io → iframe Sites con timer + MKT CTAs.
 */
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Calendar,
  Clock,
  ExternalLink,
  Lock,
  Play,
  Shield,
} from "lucide-react";
import { SEOHead } from "../components/atoms/SEOHead";
import { Button } from "../components/ui/button";
import { portfolioImages } from "../lib/portfolio-image-urls";
import { useLanguage } from "../lib/LanguageContext";
import { trackEvent } from "../lib/analytics";
import { freeRadarHasSchedule, openFreeRadarEntry } from "../lib/free-radar-entry";
import { navigateToContactAssistant } from "../lib/navigate-to-contact";
import { ROUTES } from "../lib/routes";
import { canonicalFromPath } from "../lib/seo";
import {
  DEMO_RESTRICTIONS,
  DEMO_UTM_STORAGE_KEY,
  DEMO_X_CMS_DURATION_SEC,
  DEMO_X_CMS_URL,
  DEMO_X_CMS_WARN_SEC,
  captureDemoUtmsFromSearch,
  formatMmSs,
  readDemoUtms,
} from "../lib/demo-x-cms-campaign";
import { cn } from "../lib/utils";

type Phase = "gate" | "live" | "ended";

export default function DemoXcmsCampaign() {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();
  const es = language === "es";
  const scheduleReady = freeRadarHasSchedule();

  const [phase, setPhase] = useState<Phase>("gate");
  const [remaining, setRemaining] = useState(DEMO_X_CMS_DURATION_SEC);

  // UTMs: search string (and hash query if present)
  useEffect(() => {
    const fromSearch = location.search || "";
    const hashQ = location.hash.includes("?")
      ? location.hash.slice(location.hash.indexOf("?"))
      : "";
    captureDemoUtmsFromSearch(fromSearch || hashQ);
    trackEvent("demo_x_cms_view", {
      category: "campaign",
      surface: "demo_x_cms",
      ...readDemoUtms(),
    });
  }, [location.search, location.hash]);

  useEffect(() => {
    if (phase !== "live") return;
    const id = window.setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          window.clearInterval(id);
          // End phase after tick to avoid setState-in-effect lint on render path
          queueMicrotask(() => {
            setPhase("ended");
            trackEvent("demo_x_cms_ended", {
              category: "campaign",
              reason: "timeout",
              ...readDemoUtms(),
            });
          });
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [phase]);

  const startDemo = useCallback(() => {
    setRemaining(DEMO_X_CMS_DURATION_SEC);
    setPhase("live");
    trackEvent("demo_x_cms_start", {
      category: "campaign",
      duration_sec: DEMO_X_CMS_DURATION_SEC,
      ...readDemoUtms(),
    });
  }, []);

  const openSchedule = () => {
    trackEvent("demo_x_cms_cta", {
      category: "conversion",
      cta: "schedule",
      ...readDemoUtms(),
    });
    openFreeRadarEntry(navigate, language, "free-radar", { mode: "message" });
  };

  const openConsulting = () => {
    trackEvent("demo_x_cms_cta", {
      category: "conversion",
      cta: "consulting_module",
      ...readDemoUtms(),
    });
    const utm = readDemoUtms();
    navigateToContactAssistant(navigate, {
      origin: "other",
      intent: "consulting",
      source: "cta",
      packageId: "marco",
      conversationTitle: es
        ? "Demo X|CMS · quiero este módulo"
        : "X|CMS demo · I want this module",
      message: es
        ? `Hola Viento Norte — vi la demo X|CMS (campaña${utm?.utm_campaign ? ` ${utm.utm_campaign}` : ""}).

Me interesa el módulo / job: [dashboard | riesgo | inventario | pedidos | …]
Empresa: [nombre]
Siguiente paso preferido: consultoría / demo guiada.

UTM: ${JSON.stringify(utm ?? {})}`
        : `Hi Viento Norte — I viewed the X|CMS demo (campaign${utm?.utm_campaign ? ` ${utm.utm_campaign}` : ""}).

Module / job of interest: [dashboard | risk | inventory | orders | …]
Company: [name]
Preferred next step: consulting / guided demo.

UTM: ${JSON.stringify(utm ?? {})}`,
    });
  };

  const warn = phase === "live" && remaining <= DEMO_X_CMS_WARN_SEC;
  const t = useMemo(
    () =>
      es
        ? {
            title: "Demo X|CMS · 5 minutos",
            desc: "Explora el dashboard demo. Tiempo limitado para campañas. Sin edición ni datos reales.",
            kicker: "Campaña · demo guiada",
            headline: "Mira el producto.\nLuego elige el módulo.",
            body: "Demo pública con reloj de 5 minutos. Ideal para Google Ads, SEO y LinkedIn: mismo mensaje, conversión en nuestro dominio.",
            start: "Iniciar demo (5:00)",
            rules: "Reglas de la sesión",
            restrictions: DEMO_RESTRICTIONS.es,
            live: "Demo en curso",
            timeLeft: "Tiempo restante",
            endedTitle: "Sesión de demo terminada",
            endedBody:
              "El panel se bloqueó. Siguiente paso: agenda 30 min o cuéntanos qué módulo necesitas.",
            ctaSchedule: "Agenda Google · 30 min",
            ctaModule: "Quiero este módulo",
            ctaPoc: "Ver story de módulos",
            ctaAgain: "Otra sesión de 5 min",
            openTab: "Abrir Sites en pestaña (sin reloj)",
            note: "El iframe de Figma Sites no permite bloquear todos los controles internos (cross-origin). El límite de tiempo y los CTAs se aplican en Viento Norte.",
          }
        : {
            title: "X|CMS demo · 5 minutes",
            desc: "Explore the demo dashboard. Time-limited for campaigns. No editing or real data.",
            kicker: "Campaign · guided demo",
            headline: "See the product.\nThen pick the module.",
            body: "Public demo with a 5-minute clock. Built for Google Ads, SEO, and LinkedIn: conversion stays on our domain.",
            start: "Start demo (5:00)",
            rules: "Session rules",
            restrictions: DEMO_RESTRICTIONS.en,
            live: "Demo in progress",
            timeLeft: "Time left",
            endedTitle: "Demo session ended",
            endedBody:
              "The panel is locked. Next: book 30 minutes or tell us which module you need.",
            ctaSchedule: "Google Calendar · 30 min",
            ctaModule: "I want this module",
            ctaPoc: "Module story",
            ctaAgain: "Another 5-min session",
            openTab: "Open Sites in a tab (no timer)",
            note: "The Figma Sites iframe cannot fully lock internal controls (cross-origin). Time limit and CTAs are enforced on Viento Norte.",
          },
    [es]
  );

  return (
    <>
      <SEOHead
        title={t.title}
        description={t.desc}
        url={canonicalFromPath(ROUTES.demoXcms)}
        keywords={
          es
            ? "demo CMS, dashboard, Viento Norte, módulos producto, sin nube"
            : "CMS demo, dashboard, Viento Norte, product modules"
        }
      />

      <div className="min-h-screen bg-[#050a14] text-[#f7f2e7]">
        <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
          {/* Header MKT */}
          <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1A8FDC]">
                {t.kicker}
              </p>
              <h1 className="mt-2 whitespace-pre-line text-3xl font-semibold tracking-tight md:text-4xl">
                {phase === "ended" ? t.endedTitle : t.headline}
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/65 md:text-base">
                {phase === "ended" ? t.endedBody : t.body}
              </p>
            </div>
            {phase === "live" && (
              <div
                className={cn(
                  "flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-lg tabular-nums",
                  warn
                    ? "border-amber-400/50 bg-amber-500/15 text-amber-100"
                    : "border-white/15 bg-black/40 text-white"
                )}
                role="timer"
                aria-live="polite"
                aria-label={`${t.timeLeft}: ${formatMmSs(remaining)}`}
              >
                <Clock className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
                {formatMmSs(remaining)}
              </div>
            )}
          </header>

          {phase === "gate" && (
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div className="space-y-6">
                <div>
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-white/40">
                    {t.rules}
                  </p>
                  <ul className="space-y-2">
                    {t.restrictions.map((r) => (
                      <li
                        key={r}
                        className="flex gap-2 text-sm text-white/75 before:mt-2 before:h-1 before:w-1 before:shrink-0 before:rounded-full before:bg-[#1A8FDC] before:content-['']"
                      >
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Button
                    type="button"
                    size="lg"
                    className="bg-[#1A8FDC] text-white hover:bg-[#1570b0]"
                    onClick={startDemo}
                  >
                    <Play className="mr-2 h-4 w-4" aria-hidden />
                    {t.start}
                  </Button>
                  <Button
                    type="button"
                    size="lg"
                    variant="outline"
                    className="border-white/20 bg-transparent text-white hover:bg-white/10"
                    onClick={() => navigate(ROUTES.pocProductOnboarding)}
                  >
                    {t.ctaPoc}
                  </Button>
                </div>
                <p className="flex items-start gap-2 text-xs text-white/45">
                  <Shield className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
                  {t.note}
                </p>
              </div>
              <figure className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40">
                <img
                  src={portfolioImages.consultoria.xCmsDashboard}
                  alt=""
                  className="aspect-[16/10] w-full object-cover object-top opacity-90"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-xs text-white/70">
                  X|CMS · preview
                </figcaption>
              </figure>
            </div>
          )}

          {(phase === "live" || phase === "ended") && (
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
                {phase === "live" ? (
                  <iframe
                    title="X|CMS demo"
                    src={DEMO_X_CMS_URL}
                    className="h-[min(70vh,720px)] w-full bg-black"
                    // sandbox: allow scripts for Figma Sites; block top-nav where possible
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                ) : (
                  <div className="flex h-[min(50vh,480px)] flex-col items-center justify-center gap-4 bg-[#0a1220] p-8 text-center">
                    <Lock className="h-10 w-10 text-white/40" aria-hidden />
                    <p className="max-w-md text-sm text-white/60">{t.endedBody}</p>
                  </div>
                )}
                {phase === "ended" && (
                  <div
                    className="absolute inset-0 flex items-end justify-center bg-black/50 p-6 backdrop-blur-[2px]"
                    aria-hidden={false}
                  >
                    <div className="w-full max-w-lg rounded-2xl border border-white/15 bg-[#0a1220]/95 p-6 shadow-xl">
                      <p className="text-lg font-semibold">{t.endedTitle}</p>
                      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                        {scheduleReady ? (
                          <Button
                            type="button"
                            className="bg-[#1A8FDC] text-white hover:bg-[#1570b0]"
                            onClick={openSchedule}
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            {t.ctaSchedule}
                          </Button>
                        ) : null}
                        <Button
                          type="button"
                          className="bg-white text-[#050a14] hover:bg-white/90"
                          onClick={openConsulting}
                        >
                          {t.ctaModule}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          className="border-white/20 text-white hover:bg-white/10"
                          onClick={startDemo}
                        >
                          {t.ctaAgain}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {phase === "live" && (
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-white/45">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                    {t.live}
                  </span>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 underline-offset-2 hover:text-white/70 hover:underline"
                    onClick={() =>
                      window.open(DEMO_X_CMS_URL, "_blank", "noopener,noreferrer")
                    }
                  >
                    {t.openTab}
                    <ExternalLink className="h-3 w-3" />
                  </button>
                </div>
              )}

              {phase === "ended" && (
                <p className="text-center text-xs text-white/40">
                  sessionStorage · {DEMO_UTM_STORAGE_KEY}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
