/**
 * Landing oferta consultoría · product-story tour (ex-POC).
 * Rutas SEM: /#/consultoria · /#/consultoria/modulos/:id
 * Embudo FO = home /#/ (CTAs Empezar → ROUTES.home)
 * Física: snap + scroll scrub · micro-interacciones Apple + tokens root.
 * Scope: docs/CONSULTORIA-MVP-SCOPE.md
 *
 * Analytics (limitaciones — no GTM/GA live esta semana):
 * - FIRST_VALUE_BUDGET_MS = 29s → claim + primer CTA alcanzable
 * - Calendar free open < 30s (T4 humano)
 * - Medición propia solo en cierre embudo (DS-08-03), no eventos por scroll
 */
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Calendar, ExternalLink } from "lucide-react";
import { SEOHead } from "../components/atoms/SEOHead";
import { Logo, LogoMarkSvg } from "../components/atoms/Logo";
import { DeviceMockup } from "../components/molecules/DeviceMockup";
import { Button } from "../components/ui/button";
import { useLanguage } from "../lib/LanguageContext";
import { freeRadarHasSchedule, openFreeRadarEntry } from "../lib/free-radar-entry";
import { ROUTES } from "../lib/routes";
import { cn } from "../lib/utils";
import {
  POC_MODULES,
  POC_PRINCIPLES,
  POC_X_CMS_SITE,
  type PocModuleId,
} from "../data/poc-product-modules";

type Screen = "intro" | "principles" | PocModuleId | "build" | "start";

const TRAJECTORY = ["SURA", "Transvip", "Karri", "Pymes"] as const;

/**
 * Presupuesto de primera comprensión (Apple-style first impression).
 * No cablear GA aquí; es DoD de craft + límite para analytics propias post-Test.
 */
export const OFFER_FIRST_VALUE_BUDGET_MS = 29_000;
/** SLA humano T4: abrir Calendar free a11y */
export const OFFER_CALENDAR_OPEN_SLA_MS = 30_000;

/** Ease scrub: peak at center, soft falloff (physics feel, not linear snap cut). */
function scrubFromDistance(dist: number) {
  const a = Math.min(1, Math.abs(dist));
  // Apple-soft falloff: slightly gentler than linear
  const eased = a * a * (3 - 2 * a); // smoothstep
  const opacity = Math.max(0.48, 1 - eased * 0.62);
  const y = dist * 28;
  const scale = 1 - eased * 0.022;
  return { opacity, y, scale };
}

type PocProductOnboardingProps = {
  /** Deep link desde /consultoria/modulos/:moduleId */
  initialModuleId?: PocModuleId;
};

export default function PocProductOnboarding({
  initialModuleId,
}: PocProductOnboardingProps) {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const es = language === "es";
  const scheduleReady = freeRadarHasSchedule();
  const principles = POC_PRINCIPLES[es ? "es" : "en"];
  const scrollerRef = useRef<HTMLDivElement>(null);
  const reduceMotionRef = useRef(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const didInitModule = useRef(false);

  const screens: Screen[] = useMemo(
    () => [
      "intro",
      "principles",
      ...POC_MODULES.map((m) => m.id),
      "build",
      "start",
    ],
    []
  );

  const [active, setActive] = useState(0);
  /** Visitado — mismo patrón craft que ProcessNavigation TOC (actualiza en setActive) */
  const [visited, setVisited] = useState<Set<number>>(() => new Set([0]));
  const total = screens.length;
  const enterKey = screens[active] ?? "intro";

  const markActive = useCallback((idx: number) => {
    setActive(idx);
    setVisited((prev) => {
      if (prev.has(idx)) return prev;
      const next = new Set(prev);
      next.add(idx);
      return next;
    });
  }, []);

  const t = es
    ? {
        wordmark: "Viento Norte",
        /** Nav: copy cliente, no jerga ops ("embudo") */
        skip: "Empezar",
        intro: {
          kicker: "Consultoría · Front office",
          title: "Software que se instala.\nNo se alquila la nube.",
          body: "Módulos-producto a la medida: job claro, roles reales, dato en tu perímetro.",
        },
        principles: {
          kicker: "Promesa",
          title: "Cuatro reglas.",
          body: "Si un módulo no las cumple, no lo vendemos.",
        },
        build: {
          kicker: "Método",
          title: "A medida.\nCraft enterprise.",
          body: "Discovery del job → prototipo → entrega local-first.",
          line: "IA del módulo · UI con roles · perímetro del cliente · handoff con evidencia",
        },
        start: {
          kicker: "Empezar",
          title: "Elige el módulo.\nLo hacemos tuyo.",
          body: scheduleReady
            ? "Agenda 30 min o entra al path de consultoría. Hablamos del módulo."
            : "Entra al path de consultoría y cierra alcance del módulo.",
        },
        ctaSchedule: "Agendar 30 min",
        ctaFunnel: "Empezar",
        ctaDemo: "X|CMS en vivo",
        ctaScroll: "Desplazarse",
        moduleLabel: "Módulo",
        ownership: "Dueño del dato",
        /** Una sola línea: fuente del visual */
        mockSource: "X|CMS · captura live",
        chipsAria: "Módulos",
        dotsAria: "Progreso del tour",
        trajectory: "Trayectoria",
      }
    : {
        wordmark: "Viento Norte",
        skip: "Get started",
        intro: {
          kicker: "Consulting · Front office",
          title: "Software you install.\nNot cloud you rent forever.",
          body: "Custom product modules: clear job, real roles, data in your perimeter.",
        },
        principles: {
          kicker: "Promise",
          title: "Four rules.",
          body: "If a module breaks them, we don’t sell it.",
        },
        build: {
          kicker: "Method",
          title: "Custom.\nEnterprise craft.",
          body: "Job discovery → prototype → local-first delivery.",
          line: "Module IA · role UI · client perimeter · proof handoff",
        },
        start: {
          kicker: "Start",
          title: "Pick the module.\nWe make it yours.",
          body: scheduleReady
            ? "Book 30 min or enter the consulting path. We talk modules."
            : "Enter the consulting path and close module scope.",
        },
        ctaSchedule: "Book 30 min",
        ctaFunnel: "Get started",
        ctaDemo: "Live X|CMS",
        ctaScroll: "Scroll",
        moduleLabel: "Module",
        ownership: "Data owner",
        mockSource: "X|CMS · live capture",
        chipsAria: "Modules",
        dotsAria: "Tour progress",
        trajectory: "Track record",
      };

  const go = useCallback(
    (i: number) => {
      const next = Math.max(0, Math.min(total - 1, i));
      markActive(next);
      const el = document.getElementById(`poc-screen-${screens[next]}`);
      const root = scrollerRef.current;
      if (el && root) {
        root.scrollTo({
          top: el.offsetTop,
          behavior: reduceMotionRef.current ? "auto" : "smooth",
        });
      } else {
        el?.scrollIntoView({
          behavior: reduceMotionRef.current ? "auto" : "smooth",
          block: "start",
        });
      }
    },
    [screens, total, markActive]
  );

  /* Deep link: saltar al módulo una vez montado el scroller */
  useEffect(() => {
    if (!initialModuleId || didInitModule.current) return;
    const idx = screens.indexOf(initialModuleId);
    if (idx < 0) return;
    didInitModule.current = true;
    const tmr = window.setTimeout(() => go(idx), 80);
    return () => window.clearTimeout(tmr);
  }, [initialModuleId, screens, go]);

  /* Prefers-reduced-motion */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      reduceMotionRef.current = mq.matches;
      setReduceMotion(mq.matches);
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  /* Keyboard tour — no dock dependency */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
        if (e.key === " " && (e.target as HTMLElement)?.tagName === "INPUT") return;
        e.preventDefault();
        go(active + 1);
      }
      if (e.key === "ArrowUp" || e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        go(active - 1);
      }
      if (e.key === "Home") {
        e.preventDefault();
        go(0);
      }
      if (e.key === "End") {
        e.preventDefault();
        go(total - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, go, total]);

  /* Active index via IntersectionObserver (native snap owns physics) */
  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;
    const els = screens
      .map((id) => document.getElementById(`poc-screen-${id}`))
      .filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible?.target.id) return;
        const idx = screens.findIndex((s) => `poc-screen-${s}` === visible.target.id);
        if (idx >= 0) {
          // Callback de IO (sistema externo) — ok actualizar estado aquí
          setActive(idx);
          setVisited((prev) => {
            if (prev.has(idx)) return prev;
            const next = new Set(prev);
            next.add(idx);
            return next;
          });
        }
      },
      { root, threshold: [0.35, 0.55, 0.7] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [screens]);

  /**
   * Scroll scrub physics: each screen’s inner content tracks distance from
   * scroller center → opacity + translateY + micro-scale (rAF, no wheel hijack).
   */
  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;

    let raf = 0;
    const scrub = () => {
      raf = 0;
      if (reduceMotionRef.current) {
        root.querySelectorAll<HTMLElement>("[data-scrub]").forEach((inner) => {
          inner.style.opacity = "1";
          inner.style.transform = "none";
        });
        return;
      }
      const rootRect = root.getBoundingClientRect();
      const mid = rootRect.top + rootRect.height * 0.48;
      const sections = root.querySelectorAll<HTMLElement>("[data-screen]");
      sections.forEach((section) => {
        const inner = section.querySelector<HTMLElement>("[data-scrub]");
        if (!inner) return;
        const r = section.getBoundingClientRect();
        const center = r.top + r.height / 2;
        const dist = (center - mid) / Math.max(rootRect.height * 0.55, 1);
        const { opacity, y, scale } = scrubFromDistance(dist);
        inner.style.opacity = String(opacity);
        inner.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;
      });
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(scrub);
    };

    root.addEventListener("scroll", onScroll, { passive: true });
    scrub();
    return () => {
      root.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [screens]);

  const openSchedule = () => {
    openFreeRadarEntry(navigate, language, "free-radar", { mode: "schedule" });
  };

  const lang = es ? "es" : "en";
  const inModules = active >= 2 && active < 2 + POC_MODULES.length;

  return (
    <>
      <SEOHead
        title={
          es
            ? "Viento Norte · Oferta SEM · Módulos-producto a medida"
            : "Viento Norte · SEM offer · Custom product modules"
        }
        description={
          es
            ? "Landing SEM: módulos a medida, dueño del dato. Empezar lleva al embudo FO (home)."
            : "SEM landing: custom modules, you own the data. Get started opens FO home funnel."
        }
      />

      <div
        className="fixed inset-0 z-[100] flex flex-col bg-[#050a14] text-[#f5f5f7]"
        data-surface="consultoria-offer"
        data-testid="consultoria-offer"
        data-first-value-budget-ms={OFFER_FIRST_VALUE_BUDGET_MS}
        data-calendar-sla-ms={OFFER_CALENDAR_OPEN_SLA_MS}
        data-analytics="deferred-no-gtm"
      >
        {/* Progress — more visible (2px + glow) so craft is obvious */}
        <div
          className="offer-progress-track pointer-events-none absolute inset-x-0 top-0 z-[60]"
          aria-hidden
        >
          <div
            className="offer-progress-fill"
            style={{ width: `${((active + 1) / total) * 100}%` }}
          />
        </div>

        {/* Header SEM: logo DS (interactive + plate floating + lockup VN) */}
        <header className="relative z-[55] flex shrink-0 items-center justify-between gap-4 px-5 py-3 md:px-10 md:py-4">
          <Logo
            size="sm"
            showText
            showRole={false}
            interactive
            plate="floating"
            tone="onDark"
            onClick={() => navigate(ROUTES.home)}
            className="min-w-0"
          />
          <button
            type="button"
            onClick={() => navigate(ROUTES.consultingFunnel)}
            className="offer-skip text-[13px] font-medium text-white/55 hover:text-white"
          >
            {t.skip}
          </button>
        </header>

        {/* Module chips — only while in modules, quieter */}
        <div
          className={cn(
            "relative z-[50] shrink-0 px-5 md:px-10",
            "transition-[max-height,opacity,padding] duration-[var(--offer-base,250ms)] ease-[var(--offer-ease-soft,ease)]",
            inModules
              ? "max-h-12 opacity-100 pb-1"
              : "pointer-events-none max-h-0 overflow-hidden opacity-0"
          )}
        >
          <nav
            className="mx-auto flex max-w-3xl justify-center gap-1.5 overflow-x-auto"
            aria-label={t.chipsAria}
          >
            {POC_MODULES.map((m) => {
              const idx = screens.indexOf(m.id);
              const on = screens[active] === m.id;
              const was = visited.has(idx);
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => go(idx)}
                  aria-current={on ? "true" : undefined}
                  className={cn(
                    "offer-chip shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium tracking-wide",
                    on
                      ? "offer-chip--on bg-white text-black"
                      : was
                        ? "text-white/55 hover:text-white/80"
                        : "text-white/40 hover:text-white/75"
                  )}
                >
                  {m.chip[lang]}
                </button>
              );
            })}
          </nav>
        </div>

        {/* SCROLL TOUR — native snap physics, scrub on content */}
        <div
          ref={scrollerRef}
          className="relative min-h-0 flex-1 snap-y snap-mandatory overflow-y-auto overscroll-y-contain"
          style={{
            scrollSnapType: "y mandatory",
            scrollBehavior: reduceMotion ? "auto" : "smooth",
          }}
        >
          {/* INTRO — first-value window ≤ 29s (claim + job) */}
          <TourScreen id="intro" enterActive={enterKey === "intro" && !reduceMotion}>
            <div className="mx-auto grid w-full max-w-5xl items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
              <div className="max-w-xl">
                <BrandKicker>{t.intro.kicker}</BrandKicker>
                <TourTitle>{t.intro.title}</TourTitle>
                <TourBody className="mt-6">{t.intro.body}</TourBody>
                <p className="mt-14 text-[11px] font-medium uppercase tracking-[0.2em] text-white/30">
                  {t.trajectory}
                </p>
                <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1" role="list">
                  {TRAJECTORY.map((name) => (
                    <li
                      key={name}
                      className="text-sm text-white/50 transition-colors duration-[var(--offer-fast,150ms)] hover:text-white/75"
                    >
                      {name}
                    </li>
                  ))}
                </ul>
                {/* Space before CTA — Apple breathing room */}
                <div className="mt-16 flex flex-wrap items-center gap-4">
                  <GhostCta
                    onClick={() =>
                      window.open(POC_X_CMS_SITE, "_blank", "noopener,noreferrer")
                    }
                  >
                    {t.ctaDemo}
                    <ExternalLink className="ml-2 h-3.5 w-3.5 opacity-70" aria-hidden />
                  </GhostCta>
                  <span className="text-[12px] text-white/30">
                    {es ? "Scroll o ↓" : "Scroll or ↓"}
                  </span>
                </div>
              </div>
              <div className="relative mx-auto hidden w-full max-w-sm lg:block">
                <div className="absolute -inset-10 rounded-full bg-white/[0.04] blur-3xl" />
                <div className="relative flex aspect-square flex-col items-center justify-center">
                  {/* Display mark: interactive per DS (arco 22° on hover) */}
                  <LogoMarkSvg size={96} plate="floating" interactive labelled />
                  <p
                    className="mt-8 font-display text-xl font-semibold tracking-tight text-[#f5f5f7]"
                    style={{ fontFamily: "var(--font-chillax)" }}
                  >
                    {t.wordmark}
                  </p>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                    {es ? "UXtech · front office" : "UXtech · front office"}
                  </p>
                </div>
              </div>
            </div>
          </TourScreen>

          {/* PRINCIPLES — 4 short titles, no heavy cards if possible; light cards ok */}
          <TourScreen
            id="principles"
            enterActive={enterKey === "principles" && !reduceMotion}
          >
            <div className="mx-auto w-full max-w-3xl">
              <BrandKicker>{t.principles.kicker}</BrandKicker>
              <TourTitle>{t.principles.title}</TourTitle>
              <TourBody className="mt-6">{t.principles.body}</TourBody>
              <ul className="mt-16 grid gap-10 sm:grid-cols-2">
                {principles.map((p) => (
                  <li
                    key={p.title}
                    className="rounded-xl border border-transparent p-1 transition-[border-color,background-color] duration-[var(--offer-base,250ms)] ease-[var(--offer-ease-soft,ease)] hover:border-white/[0.06] hover:bg-white/[0.02]"
                  >
                    <p className="text-lg font-semibold tracking-tight text-white/95">
                      {p.title}
                    </p>
                    <p className="mt-2 text-[15px] leading-relaxed text-white/45">
                      {p.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </TourScreen>

          {/* MODULES — 1 job + 1 visual only */}
          {POC_MODULES.map((m, mi) => (
            <TourScreen
              key={m.id}
              id={m.id}
              enterActive={enterKey === m.id && !reduceMotion}
            >
              <div className="mx-auto grid w-full max-w-5xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
                <div className="max-w-md">
                  <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/35">
                    {t.moduleLabel} {String(mi + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-5 whitespace-pre-line font-display text-[2.5rem] font-semibold leading-[1.05] tracking-tight text-[#f5f5f7] md:text-5xl lg:text-[3.25rem]">
                    {m.title[lang]}
                  </h2>
                  {/* Single job line — no capability bullets */}
                  <p className="mt-8 text-lg leading-relaxed text-white/55 md:text-xl">
                    {m.job[lang]}
                  </p>
                  <p className="mt-10 text-[13px] leading-relaxed text-white/35">
                    <span className="text-white/50">{t.ownership}. </span>
                    {m.ownership[lang]}
                  </p>
                </div>
                <div className="offer-device-frame lg:justify-self-end">
                  <DeviceMockup
                    src={m.image}
                    alt={`${m.chip[lang]} · X|CMS`}
                    caption={t.mockSource}
                    variant="laptop"
                  />
                </div>
              </div>
            </TourScreen>
          ))}

          {/* BUILD */}
          <TourScreen id="build" enterActive={enterKey === "build" && !reduceMotion}>
            <div className="mx-auto w-full max-w-2xl text-center">
              <BrandKicker className="text-center">{t.build.kicker}</BrandKicker>
              <TourTitle className="text-center">{t.build.title}</TourTitle>
              <TourBody className="mx-auto mt-6 text-center">{t.build.body}</TourBody>
              <p className="mt-16 text-[15px] leading-relaxed tracking-wide text-white/40">
                {t.build.line}
              </p>
            </div>
          </TourScreen>

          {/* START — only fold with solid white primary · conversion (no GA) */}
          <TourScreen id="start" enterActive={enterKey === "start" && !reduceMotion}>
            <div className="mx-auto w-full max-w-xl text-center">
              <div className="mb-10 flex justify-center">
                <LogoMarkSvg size={44} plate="floating" interactive labelled />
              </div>
              <BrandKicker className="text-center">{t.start.kicker}</BrandKicker>
              <TourTitle className="text-center">{t.start.title}</TourTitle>
              <TourBody className="mx-auto mt-6 text-center">{t.start.body}</TourBody>
              <div className="mt-16 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
                {scheduleReady ? (
                  <PrimaryCta onClick={openSchedule}>
                    <Calendar className="mr-2 h-4 w-4" aria-hidden />
                    {t.ctaSchedule}
                  </PrimaryCta>
                ) : null}
                <PrimaryCta onClick={() => navigate(ROUTES.consultingFunnel)}>
                  {t.ctaFunnel}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </PrimaryCta>
                <GhostCta
                  onClick={() =>
                    window.open(POC_X_CMS_SITE, "_blank", "noopener,noreferrer")
                  }
                >
                  {t.ctaDemo}
                </GhostCta>
              </div>
            </div>
          </TourScreen>
        </div>

        {/* Dots: side desktop · bottom mobile (antes solo md → “no veo cambios”) */}
        <nav
          className="pointer-events-none absolute inset-x-0 bottom-5 z-[55] flex justify-center gap-2 md:inset-x-auto md:bottom-auto md:right-5 md:top-1/2 md:-translate-y-1/2 md:flex-col md:gap-1.5"
          aria-label={t.dotsAria}
        >
          {screens.map((id, i) => {
            const isOn = i === active;
            const was = visited.has(i);
            return (
              <button
                key={id}
                type="button"
                tabIndex={-1}
                aria-label={`${i + 1} / ${total}`}
                aria-current={isOn ? "true" : undefined}
                onClick={() => go(i)}
                className={cn(
                  "offer-dot pointer-events-auto rounded-full",
                  isOn
                    ? "offer-dot--active h-2 w-6 bg-white md:h-5 md:w-2"
                    : was
                      ? "offer-dot--visited h-2 w-2 bg-white/50 hover:bg-white/70 md:h-1.5 md:w-1.5"
                      : "h-2 w-2 bg-white/25 hover:bg-white/50 md:h-1.5 md:w-1.5"
                )}
              />
            );
          })}
        </nav>
      </div>
    </>
  );
}

function TourScreen({
  id,
  children,
  enterActive = false,
}: {
  id: string;
  children: ReactNode;
  /** Soft enter when this fold is the active snap target */
  enterActive?: boolean;
}) {
  return (
    <section
      id={`poc-screen-${id}`}
      data-screen={id}
      className="flex w-full snap-start snap-always flex-col justify-center px-6 py-16 md:px-14 lg:px-20"
      style={{ minHeight: "100dvh" }}
    >
      <div
        data-scrub
        className={cn("will-change-transform", enterActive && "offer-screen-enter")}
        style={{
          transformOrigin: "50% 50%",
          transition: "none",
        }}
      >
        {/* opacity enter only — scrub controls transform */}
        <div data-offer-enter key={enterActive ? `in-${id}` : id}>
          {children}
        </div>
      </div>
    </section>
  );
}

function BrandKicker({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mb-5 text-[11px] font-medium uppercase tracking-[0.24em] text-white/35",
        className
      )}
    >
      {children}
    </p>
  );
}

function TourTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={cn(
        "whitespace-pre-line font-display text-[2.6rem] font-semibold leading-[1.05] tracking-tight text-[#f5f5f7] md:text-5xl lg:text-[3.5rem]",
        className
      )}
    >
      {children}
    </h1>
  );
}

function TourBody({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "max-w-md text-base leading-relaxed text-white/50 md:text-lg",
        className
      )}
    >
      {children}
    </p>
  );
}

/** Apple-style solid white primary — used mainly on close fold */
function PrimaryCta({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <Button
      type="button"
      size="lg"
      className="offer-cta-primary min-h-[48px] rounded-full bg-white px-7 font-semibold text-black hover:bg-white/90"
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

/** Outline / ghost — folds mid-tour */
function GhostCta({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <Button
      type="button"
      size="lg"
      variant="outline"
      className="offer-cta-ghost min-h-[48px] rounded-full border-white/25 bg-transparent px-6 font-medium text-white hover:bg-white/8 hover:text-white"
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
