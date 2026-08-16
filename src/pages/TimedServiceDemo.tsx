/**
 * Demo con reloj para un path de servicio.
 * Gate en vientonorte.io → iframe / poster + timer + CTAs.
 */
import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
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
import { useLanguage } from "../lib/LanguageContext";
import { trackEvent } from "../lib/analytics";
import { freeRadarHasSchedule, openFreeRadarEntry } from "../lib/free-radar-entry";
import { navigateToContactAssistant } from "../lib/navigate-to-contact";
import { ROUTES } from "../lib/routes";
import { canonicalFromPath } from "../lib/seo";
import {
  DEMO_RESTRICTIONS,
  DEMO_UTM_STORAGE_KEY,
  captureDemoUtmsFromSearch,
  formatMmSs,
  readDemoUtms,
} from "../lib/demo-x-cms-campaign";
import {
  demoMinutes,
  getServicePathDemo,
  resolveServicePathId,
  type ServicePathId,
} from "../data/service-path-demos";
import { cn } from "../lib/utils";

type Phase = "gate" | "live" | "ended";

export default function TimedServiceDemo({
  forcedPath,
}: {
  forcedPath?: ServicePathId;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathId: rawPathId } = useParams<{ pathId?: string }>();
  const { language } = useLanguage();
  const es = language === "es";
  const scheduleReady = freeRadarHasSchedule();

  const pathId = forcedPath ?? resolveServicePathId(rawPathId);
  const demo = pathId ? getServicePathDemo(pathId) : undefined;

  const [phase, setPhase] = useState<Phase>("gate");
  const [remaining, setRemaining] = useState(demo?.durationSec ?? 0);

  useEffect(() => {
    if (!demo) return;
    const fromSearch = location.search || "";
    const hashQ = location.hash.includes("?")
      ? location.hash.slice(location.hash.indexOf("?"))
      : "";
    captureDemoUtmsFromSearch(fromSearch || hashQ);
    const utm = readDemoUtms();
    trackEvent("demo_path_view", {
      category: "campaign",
      surface: "service_path_demo",
      path_id: demo.id,
      package_id: demo.packageId,
      ...utm,
    });
    if (demo.id === "prototype") {
      trackEvent("demo_x_cms_view", {
        category: "campaign",
        surface: "demo_x_cms",
        ...utm,
      });
    }
  }, [demo, location.search, location.hash]);

  useEffect(() => {
    if (!demo || phase !== "live") return;
    const id = window.setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          window.clearInterval(id);
          queueMicrotask(() => {
            setPhase("ended");
            const utm = readDemoUtms();
            trackEvent("demo_path_ended", {
              category: "campaign",
              reason: "timeout",
              path_id: demo.id,
              package_id: demo.packageId,
              ...utm,
            });
            if (demo.id === "prototype") {
              trackEvent("demo_x_cms_ended", {
                category: "campaign",
                reason: "timeout",
                ...utm,
              });
            }
          });
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [demo, phase]);

  const startDemo = useCallback(() => {
    if (!demo) return;
    setRemaining(demo.durationSec);
    setPhase("live");
    const utm = readDemoUtms();
    trackEvent("demo_path_start", {
      category: "campaign",
      duration_sec: demo.durationSec,
      path_id: demo.id,
      package_id: demo.packageId,
      ...utm,
    });
    if (demo.id === "prototype") {
      trackEvent("demo_x_cms_start", {
        category: "campaign",
        duration_sec: demo.durationSec,
        ...utm,
      });
    }
  }, [demo]);

  const openSchedule = () => {
    if (!demo) return;
    trackEvent("demo_path_cta", {
      category: "conversion",
      cta: "schedule",
      path_id: demo.id,
      package_id: demo.packageId,
      ...readDemoUtms(),
    });
    openFreeRadarEntry(navigate, language, "service-path-demo", {
      mode: "schedule",
    });
  };

  const openConsulting = () => {
    if (!demo) return;
    const utm = readDemoUtms();
    trackEvent("demo_path_cta", {
      category: "conversion",
      cta: "consulting",
      path_id: demo.id,
      package_id: demo.packageId,
      ...utm,
    });
    navigateToContactAssistant(navigate, {
      origin: "other",
      intent: "consulting",
      source: "cta",
      packageId: demo.packageId,
      conversationTitle: es
        ? `Demo ${demo.caption.es} · quiero este path`
        : `Demo ${demo.caption.en} · I want this path`,
      message: es
        ? `Hola Viento Norte — vi la demo del path ${demo.id} (${demoMinutes(demo)} min).

Empresa: [nombre]
Siguiente paso: ${demo.packageId}${demo.appGoal ? " · app punta a punta" : ""}.

UTM: ${JSON.stringify(utm ?? {})}`
        : `Hi Viento Norte — I viewed the ${demo.id} path demo (${demoMinutes(demo)} min).

Company: [name]
Next step: ${demo.packageId}${demo.appGoal ? " · end-to-end app" : ""}.

UTM: ${JSON.stringify(utm ?? {})}`,
    });
  };

  const t = useMemo(() => {
    if (!demo) return null;
    const mins = demoMinutes(demo);
    const time = formatMmSs(demo.durationSec);
    return es
      ? {
          title: `Demo ${demo.caption.es} · ${mins} min`,
          desc: demo.body.es,
          kicker: demo.kicker.es,
          headline: demo.headline.es,
          body: demo.body.es,
          start: `Iniciar demo (${time})`,
          rules: "Reglas de la sesión",
          restrictions: [
            `Sesión limitada a ${mins} minutos por visita.`,
            "Solo exploración — sin editar, exportar ni datos reales.",
            "Al terminar, el panel se bloquea y te ofrecemos el siguiente paso.",
            ...DEMO_RESTRICTIONS.es.slice(2, 3),
          ],
          live: "Demo en curso",
          timeLeft: "Tiempo restante",
          endedTitle: "Sesión de demo terminada",
          endedBody:
            "El panel se bloqueó. Siguiente paso: agenda 30 min o cuéntanos qué path necesitás.",
          ctaSchedule: "Agenda Google · 30 min",
          ctaConsult: "Quiero este servicio",
          ctaAgain: `Otra sesión de ${mins} min`,
          openTab: "Abrir en pestaña (sin reloj)",
          note: "Si el proto es cross-origin, el iframe puede no cargar. El límite de tiempo y los CTAs se aplican en Viento Norte.",
          caption: demo.caption.es,
        }
      : {
          title: `Demo ${demo.caption.en} · ${mins} min`,
          desc: demo.body.en,
          kicker: demo.kicker.en,
          headline: demo.headline.en,
          body: demo.body.en,
          start: `Start demo (${time})`,
          rules: "Session rules",
          restrictions: [
            `Session limited to ${mins} minutes per visit.`,
            "Explore only — no edit, export, or real data.",
            "When time ends the panel locks and we offer the next step.",
            ...DEMO_RESTRICTIONS.en.slice(2, 3),
          ],
          live: "Demo in progress",
          timeLeft: "Time left",
          endedTitle: "Demo session ended",
          endedBody:
            "The panel is locked. Next: book 30 minutes or tell us which path you need.",
          ctaSchedule: "Google Calendar · 30 min",
          ctaConsult: "I want this service",
          ctaAgain: `Another ${mins}-min session`,
          openTab: "Open in a tab (no timer)",
          note: "Cross-origin protos may not load in the frame. Time limit and CTAs are enforced on Viento Norte.",
          caption: demo.caption.en,
        };
  }, [demo, es]);

  if (!pathId || !demo || !t) {
    return <Navigate to={ROUTES.home} replace />;
  }

  const warn = phase === "live" && remaining <= demo.warnSec;
  const iframeTitle = es
    ? `Demo ${demo.caption.es}`
    : `Demo ${demo.caption.en}`;

  return (
    <>
      <SEOHead
        title={t.title}
        description={t.desc}
        url={canonicalFromPath(
          forcedPath ? ROUTES.demoXcms : ROUTES.serviceDemo(demo.id)
        )}
        keywords={
          es
            ? "demo, diagnóstico, prototipo, proceso, app, Viento Norte"
            : "demo, diagnostic, prototype, process, app, Viento Norte"
        }
      />

      <div
        className="min-h-dvh bg-[#050a14] pb-[env(safe-area-inset-bottom,0px)] text-[#f7f2e7]"
        data-surface="timed-demo"
        data-testid="timed-service-demo"
        data-path={demo.id}
        data-package={demo.packageId}
        data-duration-sec={demo.durationSec}
      >
        <div className="mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-12">
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
                    className="min-h-[44px] bg-[#1A8FDC] text-white hover:bg-[#1570b0]"
                    onClick={startDemo}
                  >
                    <Play className="mr-2 h-4 w-4" aria-hidden />
                    {t.start}
                  </Button>
                  <Button
                    type="button"
                    size="lg"
                    variant="outline"
                    className="min-h-[44px] border-white/20 bg-transparent text-white hover:bg-white/10"
                    onClick={() => navigate(ROUTES.consulting)}
                  >
                    {es ? "Ver modalidades" : "See formats"}
                  </Button>
                </div>
                <p className="flex items-start gap-2 text-xs text-white/45">
                  <Shield className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
                  {t.note}
                </p>
              </div>
              <figure className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40">
                <img
                  src={demo.poster}
                  alt=""
                  className="aspect-[16/10] w-full object-cover object-top opacity-90"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-xs text-white/70">
                  {t.caption}
                </figcaption>
              </figure>
            </div>
          )}

          {(phase === "live" || phase === "ended") && (
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
                {phase === "live" && demo.iframeUrl ? (
                  <iframe
                    title={iframeTitle}
                    src={demo.iframeUrl}
                    className="h-[min(55dvh,520px)] w-full bg-black md:h-[min(70vh,720px)]"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                ) : phase === "live" ? (
                  <img
                    src={demo.poster}
                    alt={t.caption}
                    className="h-[min(55dvh,520px)] w-full object-cover object-top md:h-[min(70vh,720px)]"
                  />
                ) : (
                  <div className="flex h-[min(50vh,480px)] flex-col items-center justify-center gap-4 bg-[#0a1220] p-8 text-center">
                    <Lock className="h-10 w-10 text-white/40" aria-hidden />
                    <p className="max-w-md text-sm text-white/60">{t.endedBody}</p>
                  </div>
                )}
                {phase === "ended" && (
                  <div className="absolute inset-0 flex items-end justify-center bg-black/50 p-6 backdrop-blur-[2px]">
                    <div className="w-full max-w-lg rounded-2xl border border-white/15 bg-[#0a1220]/95 p-6 shadow-xl">
                      <p className="text-lg font-semibold">{t.endedTitle}</p>
                      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                        {scheduleReady ? (
                          <Button
                            type="button"
                            className="min-h-[44px] bg-[#1A8FDC] text-white hover:bg-[#1570b0]"
                            onClick={openSchedule}
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            {t.ctaSchedule}
                          </Button>
                        ) : null}
                        <Button
                          type="button"
                          className="min-h-[44px] bg-white text-[#050a14] hover:bg-white/90"
                          onClick={openConsulting}
                        >
                          {t.ctaConsult}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          className="min-h-[44px] border-white/20 text-white hover:bg-white/10"
                          onClick={startDemo}
                        >
                          {t.ctaAgain}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {phase === "live" && demo.iframeUrl && (
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-white/45">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                    {t.live}
                  </span>
                  <button
                    type="button"
                    className="inline-flex min-h-[44px] items-center gap-1 underline-offset-2 hover:text-white/70 hover:underline"
                    onClick={() =>
                      window.open(demo.iframeUrl, "_blank", "noopener,noreferrer")
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
