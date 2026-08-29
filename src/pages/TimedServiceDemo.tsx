/**
 * Demo con reloj por path de servicio.
 * Brand FO (tokens + PageShell) · WCAG 2.2 AA (tiempo ajustable, contraste, foco).
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ArrowRight,
  Calendar,
  Clock,
  ExternalLink,
  Lock,
  Pause,
  Play,
  Plus,
  Shield,
} from "lucide-react";
import { SEOHead } from "../components/atoms/SEOHead";
import { PageShell } from "../components/layout/PageShell";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { useLanguage } from "../lib/LanguageContext";
import { useTranslation } from "../lib/i18n";
import { trackEvent } from "../lib/analytics";
import { freeRadarHasSchedule, openFreeRadarEntry } from "../lib/free-radar-entry";
import { navigateToContactAssistant } from "../lib/navigate-to-contact";
import { ROUTES } from "../lib/routes";
import { canonicalFromPath } from "../lib/seo";
import { withHomeCrumb } from "../lib/breadcrumb-helpers";
import {
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
import {
  flushDemoHeat,
  heatElName,
  pointInSurface,
  queueDemoHeat,
} from "../lib/demo-heatmap";
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
  const i18n = useTranslation(language);
  const copy = i18n.consultoria.timedDemo;
  const es = language === "es";
  const scheduleReady = freeRadarHasSchedule();
  const endedTitleRef = useRef<HTMLHeadingElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const liveStartedAt = useRef<number | null>(null);
  const lastTickAt = useRef<number | null>(null);
  const lastMoveAt = useRef(0);

  const pathId = forcedPath ?? resolveServicePathId(rawPathId);
  const demo = pathId ? getServicePathDemo(pathId) : undefined;

  const [phase, setPhase] = useState<Phase>("gate");
  const [paused, setPaused] = useState(false);
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
    if (!demo || phase !== "live" || paused) return;
    const id = window.setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          window.clearInterval(id);
          queueMicrotask(() => {
            setPhase("ended");
            setPaused(false);
            const utm = readDemoUtms();
            trackEvent("demo_path_ended", {
              category: "campaign",
              reason: "timeout",
              path_id: demo.id,
              package_id: demo.packageId,
              ...utm,
            });
            const started = liveStartedAt.current;
            const ms = started ? Date.now() - started : 0;
            liveStartedAt.current = null;
            lastTickAt.current = null;
            queueDemoHeat(demo.id, { type: "end", phase: "ended", el: "timeout", ms });
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
  }, [demo, phase, paused]);

  useEffect(() => {
    if (phase !== "ended") return;
    endedTitleRef.current?.focus();
  }, [phase]);

  const startDemo = useCallback(() => {
    if (!demo) return;
    setRemaining(demo.durationSec);
    setPaused(false);
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
    liveStartedAt.current = Date.now();
    lastTickAt.current = Date.now();
    queueDemoHeat(demo.id, { type: "start", phase: "live", el: "start" });
  }, [demo]);

  const openSchedule = () => {
    if (!demo) return;
    const utm = readDemoUtms();
    trackEvent("demo_path_cta", {
      category: "conversion",
      cta: "schedule",
      path_id: demo.id,
      package_id: demo.packageId,
      ...utm,
    });
    if (demo.id === "prototype") {
      trackEvent("demo_x_cms_cta", {
        category: "conversion",
        cta: "schedule",
        surface: "demo_x_cms",
        path_id: demo.id,
        package_id: demo.packageId,
        ...utm,
      });
    }
    queueDemoHeat(demo.id, { type: "cta_schedule", phase, el: "cta-schedule" });
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
    if (demo.id === "prototype") {
      trackEvent("demo_x_cms_cta", {
        category: "conversion",
        cta: "consulting_module",
        surface: "demo_x_cms",
        path_id: demo.id,
        package_id: demo.packageId,
        ...utm,
      });
    }
    queueDemoHeat(demo.id, { type: "cta_consult", phase, el: "cta-consult" });
    navigateToContactAssistant(navigate, {
      origin: "service-path-demo",
      intent: "consulting",
      source: "cta",
      packageId: demo.packageId,
      conversationTitle: es
        ? `Demo ${demo.caption.es} · quiero este servicio`
        : `Demo ${demo.caption.en} · I want this service`,
      message: es
        ? `Hola Viento Norte — vi la demo ${demo.caption.es} (${demoMinutes(demo)} min).

Empresa: [nombre]
Siguiente paso: ${demo.packageId}${demo.appGoal ? " · app punta a punta" : ""}.`
        : `Hi Viento Norte — I viewed the ${demo.caption.en} demo (${demoMinutes(demo)} min).

Company: [name]
Next step: ${demo.packageId}${demo.appGoal ? " · end-to-end app" : ""}.`,
    });
  };

  useEffect(() => {
    if (!demo) return;
    queueDemoHeat(demo.id, { type: "view", phase: "gate", el: "view" });
  }, [demo]);

  useEffect(() => {
    if (!demo) return;

    const stageBox = () =>
      (stageRef.current ?? surfaceRef.current)?.getBoundingClientRect();

    const onPointerDown = (event: PointerEvent) => {
      const box = stageBox();
      if (!box) return;
      const point = pointInSurface(event.clientX, event.clientY, box);
      if (!point) return;
      queueDemoHeat(demo.id, {
        type: "click",
        x: point.x,
        y: point.y,
        phase,
        el: heatElName(event.target),
      });
    };

    const onPointerMove = (event: PointerEvent) => {
      if (phase !== "live") return;
      const now = Date.now();
      if (now - lastMoveAt.current < 450) return;
      lastMoveAt.current = now;
      const box = stageBox();
      if (!box) return;
      const point = pointInSurface(event.clientX, event.clientY, box);
      if (!point) return;
      queueDemoHeat(demo.id, {
        type: "move",
        x: point.x,
        y: point.y,
        phase: "live",
        el: "stage",
      });
    };

    const flushLeave = () => {
      if (phase === "live" && liveStartedAt.current) {
        const now = Date.now();
        const sinceTick = lastTickAt.current ? now - lastTickAt.current : 0;
        queueDemoHeat(demo.id, {
          type: "leave",
          phase: "live",
          el: "leave",
          ms: sinceTick,
        });
        liveStartedAt.current = null;
        lastTickAt.current = null;
      }
      void flushDemoHeat();
    };

    const onHidden = () => {
      if (document.visibilityState === "hidden") flushLeave();
    };

    const root = surfaceRef.current;
    root?.addEventListener("pointerdown", onPointerDown);
    root?.addEventListener("pointermove", onPointerMove);
    document.addEventListener("visibilitychange", onHidden);
    window.addEventListener("pagehide", flushLeave);
    return () => {
      root?.removeEventListener("pointerdown", onPointerDown);
      root?.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onHidden);
      window.removeEventListener("pagehide", flushLeave);
      void flushDemoHeat();
    };
  }, [demo, phase]);

  useEffect(() => {
    if (!demo || phase !== "live" || paused) return;
    const id = window.setInterval(() => {
      const now = Date.now();
      const prev = lastTickAt.current ?? now;
      lastTickAt.current = now;
      queueDemoHeat(demo.id, {
        type: "tick",
        phase: "live",
        el: "tick",
        ms: now - prev,
      });
    }, 5000);
    return () => window.clearInterval(id);
  }, [demo, phase, paused]);

  const mins = demo ? demoMinutes(demo) : 0;
  const restrictions = useMemo(() => {
    if (!demo) return [];
    return [
      copy.restrictionTime.replace("{min}", String(mins)),
      copy.restrictionExplore,
      copy.restrictionLock,
      copy.restrictionData,
    ];
  }, [copy, demo, mins]);

  if (!pathId || !demo) {
    return <Navigate to={ROUTES.home} replace />;
  }

  const warn = phase === "live" && remaining <= demo.warnSec;
  const caption = demo.caption[language];
  const iframeTitle = es ? `Demo ${caption}` : `Demo ${caption}`;
  const seoTitle = `${caption} · ${mins} min`;

  return (
    <PageShell
      showLogoText={false}
      crumbs={withHomeCrumb(i18n.breadcrumbs.home, () => navigate(ROUTES.home), [
        {
          label: i18n.breadcrumbs.consulting,
          onClick: () => navigate(ROUTES.consulting),
        },
        { label: copy.crumb, current: true },
      ])}
      contentClassName="section-pad-default"
    >
      <SEOHead
        title={seoTitle}
        description={demo.body[language]}
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
        ref={surfaceRef}
        className="container mx-auto max-w-5xl"
        data-surface="timed-demo"
        data-testid="timed-service-demo"
        data-path={demo.id}
        data-package={demo.packageId}
        data-duration-sec={demo.durationSec}
        data-phase={phase}
      >
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 space-y-3">
            <Badge
              variant="outline"
              className="border-primary/25 font-normal text-foreground"
            >
              {demo.kicker[language]}
            </Badge>
            <h1
              id="timed-demo-heading"
              className="whitespace-pre-line text-3xl font-bold tracking-tight md:text-4xl"
            >
              {phase === "ended" ? copy.endedTitle : demo.headline[language]}
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
              {phase === "ended" ? copy.endedBody : demo.body[language]}
            </p>
          </div>

          {phase === "live" && (
            <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
              <div
                className={cn(
                  "inline-flex min-h-11 items-center gap-2 rounded-full border-2 px-4 py-2 font-mono text-lg tabular-nums",
                  warn
                    ? "border-foreground bg-muted text-foreground"
                    : "border-border bg-card text-foreground"
                )}
                role="timer"
                aria-live={warn ? "assertive" : "polite"}
                aria-atomic="true"
                aria-label={`${copy.timeLeft}: ${formatMmSs(remaining)}${
                  paused ? ` · ${copy.paused}` : ""
                }${warn ? ` · ${copy.warn}` : ""}`}
              >
                <Clock className="h-4 w-4 shrink-0" aria-hidden />
                {formatMmSs(remaining)}
              </div>
              {warn ? (
                <p className="text-sm font-medium text-foreground">{copy.warn}</p>
              ) : null}
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="min-h-11"
                  aria-pressed={paused}
                  data-heat="pause"
                  onClick={() => {
                    setPaused((p) => {
                      if (!p) queueDemoHeat(demo.id, { type: "pause", phase: "live", el: "pause" });
                      return !p;
                    });
                  }}
                >
                  {paused ? (
                    <Play className="mr-2 h-4 w-4" aria-hidden />
                  ) : (
                    <Pause className="mr-2 h-4 w-4" aria-hidden />
                  )}
                  {paused ? copy.resume : copy.pause}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="min-h-11"
                  data-heat="add-minute"
                  onClick={() => {
                    setRemaining((r) => r + 60);
                    queueDemoHeat(demo.id, { type: "add_minute", phase: "live", el: "add-minute" });
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" aria-hidden />
                  {copy.addMinute}
                </Button>
              </div>
            </div>
          )}
        </header>

        {phase === "gate" && (
          <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
            <Card className="border-2 border-[color:var(--logo-surface-border)] bg-surface-matte-elevated shadow-sm">
              <CardContent className="space-y-6 p-6">
                <div>
                  <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-foreground">
                    {copy.rules}
                  </h2>
                  <ul className="space-y-2">
                    {restrictions.map((r) => (
                      <li
                        key={r}
                        className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                          aria-hidden
                        />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Button
                    type="button"
                    size="lg"
                    className="min-h-11 bg-brand-gradient font-semibold hover:opacity-90"
                    data-heat="start"
                    onClick={startDemo}
                  >
                    <Play className="mr-2 h-4 w-4" aria-hidden />
                    {copy.start.replace("{time}", formatMmSs(demo.durationSec))}
                  </Button>
                  <Button
                    type="button"
                    size="lg"
                    variant="outline"
                    className="min-h-11"
                    onClick={() => navigate(ROUTES.consulting)}
                  >
                    {copy.ctaFormats}
                  </Button>
                </div>
                <p className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Shield className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                  {copy.note}
                </p>
              </CardContent>
            </Card>

            <figure
              ref={stageRef}
              data-heat="poster"
              className="overflow-hidden rounded-xl border-2 border-[color:var(--logo-surface-border)] bg-muted"
            >
              <img
                src={demo.poster}
                alt={caption}
                className="aspect-[16/10] w-full object-cover object-top"
              />
              <figcaption className="border-t border-border bg-card px-4 py-3 text-sm text-muted-foreground">
                {caption}
              </figcaption>
            </figure>
          </div>
        )}

        {(phase === "live" || phase === "ended") && (
          <div className="space-y-4">
            <div
              ref={stageRef}
              data-heat="stage"
              className="relative overflow-hidden rounded-xl border-2 border-[color:var(--logo-surface-border)] bg-muted shadow-sm"
            >
              {phase === "live" && demo.iframeUrl ? (
                <iframe
                  title={iframeTitle}
                  src={demo.iframeUrl}
                  className="h-[min(55dvh,520px)] w-full bg-background md:h-[min(70vh,720px)]"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : phase === "live" ? (
                <img
                  src={demo.poster}
                  alt={caption}
                  className="h-[min(55dvh,520px)] w-full object-cover object-top md:h-[min(70vh,720px)]"
                />
              ) : (
                <div className="flex h-[min(40vh,360px)] flex-col items-center justify-center gap-3 bg-muted p-8 text-center">
                  <Lock className="h-10 w-10 text-muted-foreground" aria-hidden />
                  <p className="max-w-md text-sm text-muted-foreground">
                    {copy.endedBody}
                  </p>
                </div>
              )}

              {phase === "ended" && (
                <div
                  className="absolute inset-0 flex items-end justify-center bg-background/70 p-4 backdrop-blur-[2px] sm:p-6"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="timed-demo-ended-title"
                  aria-describedby="timed-demo-ended-body"
                >
                  <Card className="w-full max-w-lg border-2 border-primary/25 bg-card shadow-lg">
                    <CardContent className="space-y-4 p-6">
                      <h2
                        id="timed-demo-ended-title"
                        ref={endedTitleRef}
                        tabIndex={-1}
                        className="text-lg font-semibold tracking-tight outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        {copy.endedTitle}
                      </h2>
                      <p
                        id="timed-demo-ended-body"
                        className="text-sm text-muted-foreground"
                      >
                        {copy.endedBody}
                      </p>
                      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                        {scheduleReady ? (
                          <Button
                            type="button"
                            className="min-h-11 bg-brand-gradient font-semibold hover:opacity-90"
                            data-heat="cta-schedule"
                            onClick={openSchedule}
                          >
                            <Calendar className="mr-2 h-4 w-4" aria-hidden />
                            {copy.ctaSchedule}
                          </Button>
                        ) : null}
                        <Button
                          type="button"
                          variant="outline"
                          className="min-h-11"
                          data-heat="cta-consult"
                          onClick={openConsulting}
                        >
                          {copy.ctaConsult}
                          <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          className="min-h-11"
                          onClick={startDemo}
                        >
                          {copy.ctaAgain.replace("{min}", String(mins))}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>

            {phase === "live" && demo.iframeUrl ? (
              <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <span
                    className={cn(
                      "h-2 w-2 rounded-full",
                      paused
                        ? "bg-muted-foreground"
                        : "bg-primary motion-safe:animate-pulse"
                    )}
                    aria-hidden
                  />
                  {paused ? copy.paused : copy.live}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  className="min-h-11"
                  onClick={() =>
                    window.open(demo.iframeUrl, "_blank", "noopener,noreferrer")
                  }
                >
                  {copy.openTab}
                  <ExternalLink className="ml-2 h-4 w-4" aria-hidden />
                </Button>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </PageShell>
  );
}
