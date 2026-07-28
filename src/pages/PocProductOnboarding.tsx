/**
 * POC · Product-story tour (Apple-like physics, not wizard chrome).
 * Snap + scroll scrub (opacity/translate). Ruta: /#/poc/product-onboarding
 * Gate #130: mockups OK before merge — polish only.
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
import { LogoMarkSvg } from "../components/atoms/Logo";
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

/** Ease scrub: peak at center, soft falloff (physics feel, not linear snap cut). */
function scrubFromDistance(dist: number) {
  const a = Math.min(1, Math.abs(dist));
  // opacity: 1 at center → ~0.42 at edge
  const opacity = Math.max(0.42, 1 - a * 0.72);
  // translateY: content floats toward center (px)
  const y = dist * 36;
  // scale micro
  const scale = 1 - a * 0.028;
  return { opacity, y, scale };
}

export default function PocProductOnboarding() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const es = language === "es";
  const scheduleReady = freeRadarHasSchedule();
  const principles = POC_PRINCIPLES[es ? "es" : "en"];
  const scrollerRef = useRef<HTMLDivElement>(null);
  const reduceMotionRef = useRef(false);
  const [reduceMotion, setReduceMotion] = useState(false);

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
  const total = screens.length;

  const t = es
    ? {
        wordmark: "Viento Norte",
        skip: "Consultoría",
        intro: {
          kicker: "Front office",
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
            ? "30 min en Calendar o embudo de consultoría. Hablamos del módulo."
            : "Embudo de consultoría — cierra alcance del módulo.",
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
        skip: "Consulting",
        intro: {
          kicker: "Front office",
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
            ? "30 min on Calendar or consulting funnel. We talk modules."
            : "Consulting funnel — close module scope.",
        },
        ctaSchedule: "Book 30 min",
        ctaFunnel: "Start",
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
      setActive(next);
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
    [screens, total]
  );

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
        if (idx >= 0) setActive(idx);
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
            ? "Viento Norte · Tour módulos-producto"
            : "Viento Norte · Product modules tour"
        }
        description={
          es
            ? "Tour de oferta: módulos a medida, sin nube obligatoria, dueño del dato."
            : "Offer tour: custom modules, no mandatory cloud, you own the data."
        }
        noIndex
      />

      <div className="fixed inset-0 z-[100] flex flex-col bg-[#050a14] text-[#f5f5f7]">
        {/* Minimal progress hairline */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-[60] h-px bg-white/10"
          aria-hidden
        >
          <div
            className="h-full bg-white/70 transition-[width] duration-500 ease-out"
            style={{ width: `${((active + 1) / total) * 100}%` }}
          />
        </div>

        {/* Thin header — less density */}
        <header className="relative z-[55] flex shrink-0 items-center justify-between gap-4 px-5 py-3 md:px-10 md:py-4">
          <div className="flex min-w-0 items-center gap-2.5">
            <LogoMarkSvg size={28} plate="floating" className="shrink-0 opacity-90" />
            <span className="truncate font-display text-[13px] font-medium tracking-tight text-white/90 md:text-sm">
              {t.wordmark}
            </span>
          </div>
          <button
            type="button"
            onClick={() => navigate(ROUTES.consulting)}
            className="text-[13px] font-medium text-white/55 transition-colors hover:text-white"
          >
            {t.skip}
          </button>
        </header>

        {/* Module chips — only while in modules, quieter */}
        <div
          className={cn(
            "relative z-[50] shrink-0 px-5 transition-all duration-300 md:px-10",
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
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => go(idx)}
                  className={cn(
                    "shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium tracking-wide transition-colors",
                    on
                      ? "bg-white text-black"
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
          {/* INTRO */}
          <TourScreen id="intro">
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
                    <li key={name} className="text-sm text-white/50">
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
                  <LogoMarkSvg size={96} plate="floating" />
                  <p className="mt-8 font-display text-xl font-medium tracking-tight text-white/90">
                    {t.wordmark}
                  </p>
                </div>
              </div>
            </div>
          </TourScreen>

          {/* PRINCIPLES — 4 short titles, no heavy cards if possible; light cards ok */}
          <TourScreen id="principles">
            <div className="mx-auto w-full max-w-3xl">
              <BrandKicker>{t.principles.kicker}</BrandKicker>
              <TourTitle>{t.principles.title}</TourTitle>
              <TourBody className="mt-6">{t.principles.body}</TourBody>
              <ul className="mt-16 grid gap-10 sm:grid-cols-2">
                {principles.map((p) => (
                  <li key={p.title}>
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
            <TourScreen key={m.id} id={m.id}>
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
                <DeviceMockup
                  src={m.image}
                  alt={`${m.chip[lang]} · X|CMS`}
                  caption={t.mockSource}
                  variant="laptop"
                  className="lg:justify-self-end"
                />
              </div>
            </TourScreen>
          ))}

          {/* BUILD */}
          <TourScreen id="build">
            <div className="mx-auto w-full max-w-2xl text-center">
              <BrandKicker className="text-center">{t.build.kicker}</BrandKicker>
              <TourTitle className="text-center">{t.build.title}</TourTitle>
              <TourBody className="mx-auto mt-6 text-center">{t.build.body}</TourBody>
              <p className="mt-16 text-[15px] leading-relaxed tracking-wide text-white/40">
                {t.build.line}
              </p>
            </div>
          </TourScreen>

          {/* START — only fold with solid white primary */}
          <TourScreen id="start">
            <div className="mx-auto w-full max-w-xl text-center">
              <div className="mb-10 flex justify-center opacity-90">
                <LogoMarkSvg size={44} plate="floating" />
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
                <PrimaryCta onClick={() => navigate(ROUTES.consulting)}>
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

        {/* Fine side dots only — no prev/next dock */}
        <nav
          className="pointer-events-none absolute right-3 top-1/2 z-[55] hidden -translate-y-1/2 flex-col gap-1.5 md:flex md:right-5"
          aria-label={t.dotsAria}
        >
          {screens.map((id, i) => (
            <button
              key={id}
              type="button"
              tabIndex={-1}
              aria-label={`${i + 1} / ${total}`}
              aria-current={i === active ? "true" : undefined}
              onClick={() => go(i)}
              className={cn(
                "pointer-events-auto h-1 w-1 rounded-full transition-all duration-300",
                i === active
                  ? "h-3.5 bg-white/80"
                  : "bg-white/20 hover:bg-white/45"
              )}
            />
          ))}
        </nav>
      </div>
    </>
  );
}

function TourScreen({ id, children }: { id: string; children: ReactNode }) {
  return (
    <section
      id={`poc-screen-${id}`}
      data-screen={id}
      className="flex w-full snap-start snap-always flex-col justify-center px-6 py-16 md:px-14 lg:px-20"
      style={{ minHeight: "100dvh" }}
    >
      <div
        data-scrub
        className="will-change-transform"
        style={{
          transformOrigin: "50% 50%",
          transition: "none",
        }}
      >
        {children}
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
      className="min-h-[48px] rounded-full bg-white px-7 font-semibold text-black hover:bg-white/90"
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
      className="min-h-[48px] rounded-full border-white/25 bg-transparent px-6 font-medium text-white hover:bg-white/8 hover:text-white"
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
