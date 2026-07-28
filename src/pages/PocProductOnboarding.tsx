/**
 * POC · Scrolling tour ofertado Viento Norte (módulos-producto).
 * Snap scroll + branding VN + progress. Ruta: /#/poc/product-onboarding
 * Ref: X|CMS https://pouch-growl-74881457.figma.site
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
import {
  ArrowRight,
  Calendar,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Lock,
  Server,
  Shield,
  Building2,
} from "lucide-react";
import { SEOHead } from "../components/atoms/SEOHead";
import { LogoMarkSvg } from "../components/atoms/Logo";
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

export default function PocProductOnboarding() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const es = language === "es";
  const scheduleReady = freeRadarHasSchedule();
  const principles = POC_PRINCIPLES[es ? "es" : "en"];
  const scrollerRef = useRef<HTMLDivElement>(null);
  const wheelLock = useRef(false);

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
  const progress = ((active + 1) / total) * 100;

  const t = es
    ? {
        badge: "Oferta Viento Norte",
        wordmark: "Viento Norte",
        tagline: "UXtech · módulos a medida · dueño del dato",
        skip: "Ir a consultoría",
        liveDemo: "Demo X|CMS",
        intro: {
          kicker: "Front office · ex Agencia Maraña",
          title: "Software que se instala.\nNo se alquila la nube.",
          body: "Construimos módulos-producto a la medida de tu empresa: cada uno es un producto con job claro, roles reales y el dato en tu perímetro. Trayectoria enterprise empaquetada para pymes y equipos que ya operan en serio.",
        },
        principles: {
          kicker: "Marca · promesa",
          title: "Cuatro reglas de Viento Norte.",
          body: "Si un módulo no las cumple, no lo vendemos.",
        },
        build: {
          kicker: "Método",
          title: "A medida.\nCon craft enterprise.",
          body: "Discovery del job → prototipo → entrega local-first. Misma disciplina que en wealth y mobility, sin venderte un multi-tenant genérico.",
          points: [
            "IA del módulo: quién decide qué",
            "UI y flujos con roles reales",
            "Perímetro del cliente (sin nube obligatoria)",
            "Handoff y evidencia (RIA / N2N)",
          ],
        },
        start: {
          kicker: "Cierre",
          title: "Elige el módulo.\nLo hacemos tuyo.",
          body: scheduleReady
            ? "Agenda 30 min gratis o entra al embudo de consultoría. Hablamos del módulo, no de un pitch vacío."
            : "Entra al embudo de consultoría y cierra alcance del módulo.",
        },
        ctaNext: "Siguiente",
        ctaPrev: "Anterior",
        ctaSchedule: "Agenda Google · 30 min",
        ctaFunnel: "Empezar con Viento Norte",
        ctaDemo: "Ver X|CMS en vivo",
        moduleLabel: "Módulo",
        capabilities: "Incluye",
        ownership: "Dueño del dato",
        tourHint: "Scroll o flechas · un paso = un producto",
        chipsAria: "Módulos producto",
        progressAria: "Progreso del tour",
        of: "de",
        trajectory: "Trayectoria",
      }
    : {
        badge: "Viento Norte offer",
        wordmark: "Viento Norte",
        tagline: "UXtech · custom modules · you own the data",
        skip: "Go to consulting",
        liveDemo: "X|CMS demo",
        intro: {
          kicker: "Front office · formerly Agencia Maraña",
          title: "Software you install.\nNot cloud you rent forever.",
          body: "We build product modules tailored to your company: each one is a product with a clear job, real roles, and data in your perimeter. Enterprise craft packaged for teams that already ship.",
        },
        principles: {
          kicker: "Brand promise",
          title: "Four Viento Norte rules.",
          body: "If a module breaks them, we don’t sell it.",
        },
        build: {
          kicker: "Method",
          title: "Custom.\nEnterprise craft.",
          body: "Job discovery → prototype → local-first delivery. Same discipline as wealth and mobility — not a generic multi-tenant rent.",
          points: [
            "Module IA: who decides what",
            "UI and flows with real roles",
            "Client perimeter (no mandatory cloud)",
            "Handoff and proof (RIA / N2N)",
          ],
        },
        start: {
          kicker: "Close",
          title: "Pick the module.\nWe make it yours.",
          body: scheduleReady
            ? "Book 30 free minutes or enter the consulting funnel. We talk modules — not empty pitch."
            : "Enter the consulting funnel and close module scope.",
        },
        ctaNext: "Next",
        ctaPrev: "Back",
        ctaSchedule: "Google Calendar · 30 min",
        ctaFunnel: "Start with Viento Norte",
        ctaDemo: "See live X|CMS",
        moduleLabel: "Module",
        capabilities: "Includes",
        ownership: "Data owner",
        tourHint: "Scroll or arrows · one step = one product",
        chipsAria: "Product modules",
        progressAria: "Tour progress",
        of: "of",
        trajectory: "Track record",
      };

  const go = useCallback(
    (i: number) => {
      const next = Math.max(0, Math.min(total - 1, i));
      setActive(next);
      const el = document.getElementById(`poc-screen-${screens[next]}`);
      const root = scrollerRef.current;
      if (el && root) {
        root.scrollTo({ top: el.offsetTop, behavior: "smooth" });
      } else {
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [screens, total]
  );

  /* Keyboard tour */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === "PageDown") {
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

  /* IntersectionObserver sync active step */
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
      { root, threshold: [0.45, 0.6] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [screens]);

  /* Wheel → step tour (throttled) for “Apple section” feel */
  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 18) return;
      if (wheelLock.current) {
        e.preventDefault();
        return;
      }
      // Prefer native snap when trackpad small; step on decisive flick
      if (Math.abs(e.deltaY) < 40) return;
      e.preventDefault();
      wheelLock.current = true;
      go(active + (e.deltaY > 0 ? 1 : -1));
      window.setTimeout(() => {
        wheelLock.current = false;
      }, 650);
    };
    root.addEventListener("wheel", onWheel, { passive: false });
    return () => root.removeEventListener("wheel", onWheel);
  }, [active, go]);

  const openSchedule = () => {
    openFreeRadarEntry(navigate, language, "free-radar", { mode: "schedule" });
  };

  const lang = es ? "es" : "en";
  const principleIcons = [Server, Shield, Building2, Lock];
  const inModules =
    active >= 2 && active < 2 + POC_MODULES.length;

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

      <div className="fixed inset-0 z-[100] flex flex-col bg-[#050a14] text-[#f7f2e7]">
        {/* Brand progress */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-[60] h-1 bg-white/10"
          role="progressbar"
          aria-valuenow={active + 1}
          aria-valuemin={1}
          aria-valuemax={total}
          aria-label={t.progressAria}
        >
          <div
            className="h-full bg-brand-gradient transition-[width] duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Header brand */}
        <header className="relative z-[55] flex shrink-0 items-center justify-between gap-3 border-b border-white/8 bg-[#050a14]/90 px-4 py-3 backdrop-blur-md md:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <LogoMarkSvg size={32} plate="floating" className="shrink-0" />
            <div className="min-w-0">
              <p className="truncate font-display text-sm font-semibold tracking-tight text-white md:text-base">
                {t.wordmark}
              </p>
              <p className="truncate text-[10px] text-white/50 md:text-[11px]">
                {t.tagline}
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <span className="hidden rounded-full border border-white/12 bg-white/5 px-2.5 py-1 text-[10px] font-medium text-white/70 sm:inline">
              {t.badge}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="hidden text-white/75 hover:bg-white/10 hover:text-white sm:inline-flex"
              onClick={() => window.open(POC_X_CMS_SITE, "_blank", "noopener,noreferrer")}
            >
              {t.liveDemo}
              <ExternalLink className="ml-1.5 h-3.5 w-3.5" aria-hidden />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-white/85 hover:bg-white/10 hover:text-white"
              onClick={() => navigate(ROUTES.consulting)}
            >
              {t.skip}
              <ArrowRight className="ml-1 h-3.5 w-3.5" aria-hidden />
            </Button>
          </div>
        </header>

        {/* Module chips */}
        <div
          className={cn(
            "relative z-[50] shrink-0 border-b border-white/5 bg-[#050a14]/85 px-3 py-2 backdrop-blur transition-all duration-300",
            inModules
              ? "max-h-14 opacity-100"
              : "max-h-0 overflow-hidden border-0 py-0 opacity-0"
          )}
        >
          <nav
            className="mx-auto flex max-w-5xl gap-2 overflow-x-auto pb-0.5"
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
                    "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                    on
                      ? "bg-brand-gradient text-white shadow-sm"
                      : "bg-white/8 text-white/70 hover:bg-white/15 hover:text-white"
                  )}
                >
                  {m.chip[lang]}
                </button>
              );
            })}
          </nav>
        </div>

        {/* SCROLL TOUR */}
        <div
          ref={scrollerRef}
          className="relative min-h-0 flex-1 snap-y snap-mandatory overflow-y-auto overscroll-y-contain scroll-smooth"
          style={{ scrollSnapType: "y mandatory" }}
        >
          {/* INTRO */}
          <TourScreen id="intro">
            <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
              <div>
                <BrandKicker>{t.intro.kicker}</BrandKicker>
                <TourTitle>{t.intro.title}</TourTitle>
                <TourBody>{t.intro.body}</TourBody>
                <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">
                  {t.trajectory}
                </p>
                <ul className="mt-3 flex flex-wrap gap-2" role="list">
                  {TRAJECTORY.map((name) => (
                    <li
                      key={name}
                      className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs font-medium text-white/80"
                    >
                      {name}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Primary onClick={() => go(1)}>
                    {t.ctaNext}
                    <ChevronDown className="ml-2 h-4 w-4" aria-hidden />
                  </Primary>
                  <Ghost
                    onClick={() =>
                      window.open(POC_X_CMS_SITE, "_blank", "noopener,noreferrer")
                    }
                  >
                    {t.ctaDemo}
                    <ExternalLink className="ml-2 h-4 w-4" aria-hidden />
                  </Ghost>
                </div>
                <p className="mt-10 text-[11px] tracking-wide text-white/30">
                  {t.tourHint}
                </p>
              </div>
              <div className="relative hidden lg:block">
                <div className="absolute -inset-8 rounded-[2.5rem] bg-gradient-to-br from-[#FF1D25]/20 via-[#1A8FDC]/15 to-transparent blur-3xl" />
                <div className="relative flex aspect-square max-h-[420px] flex-col items-center justify-center rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/8 to-transparent p-10">
                  <LogoMarkSvg size={88} plate="floating" />
                  <p className="mt-6 font-display text-2xl font-semibold tracking-tight">
                    {t.wordmark}
                  </p>
                  <p className="mt-2 max-w-[14rem] text-center text-sm text-white/55">
                    {t.tagline}
                  </p>
                </div>
              </div>
            </div>
          </TourScreen>

          {/* PRINCIPLES */}
          <TourScreen id="principles">
            <div className="mx-auto w-full max-w-5xl">
              <BrandKicker>{t.principles.kicker}</BrandKicker>
              <TourTitle>{t.principles.title}</TourTitle>
              <TourBody>{t.principles.body}</TourBody>
              <ul className="mt-10 grid gap-4 sm:grid-cols-2">
                {principles.map((p, i) => {
                  const Icon = principleIcons[i] ?? Lock;
                  return (
                    <li
                      key={p.title}
                      className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-white/20"
                    >
                      <Icon className="mb-3 h-5 w-5 text-[#1A8FDC]" aria-hidden />
                      <p className="text-base font-semibold tracking-tight">{p.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-white/60">
                        {p.body}
                      </p>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-10">
                <Primary onClick={() => go(2)}>
                  {t.ctaNext}
                  <ChevronDown className="ml-2 h-4 w-4" aria-hidden />
                </Primary>
              </div>
            </div>
          </TourScreen>

          {/* MODULES */}
          {POC_MODULES.map((m, mi) => {
            const idx = screens.indexOf(m.id);
            return (
              <TourScreen key={m.id} id={m.id}>
                <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
                  <div className="space-y-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
                      {t.moduleLabel} {String(mi + 1).padStart(2, "0")} ·{" "}
                      {m.chip[lang]}
                    </p>
                    <h2 className="whitespace-pre-line font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl lg:text-[3.1rem]">
                      {m.title[lang]}
                    </h2>
                    <p className="max-w-md text-lg leading-relaxed text-white/70">
                      {m.job[lang]}
                    </p>
                    <div>
                      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-white/40">
                        {t.capabilities}
                      </p>
                      <ul className="space-y-2">
                        {m.capabilities[lang].map((c) => (
                          <li
                            key={c}
                            className="flex gap-2 text-sm text-white/75 before:mt-2 before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-[#FF1D25] before:content-['']"
                          >
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <p className="rounded-xl border border-[#1A8FDC]/30 bg-[#1A8FDC]/10 px-4 py-3 text-sm leading-relaxed text-white/90">
                      <span className="font-semibold text-[#7ec8f5]">
                        {t.ownership}:{" "}
                      </span>
                      {m.ownership[lang]}
                    </p>
                    <div className="flex flex-col gap-3 pt-1 sm:flex-row">
                      <Primary onClick={() => go(idx + 1)}>
                        {t.ctaNext}
                        <ChevronDown className="ml-2 h-4 w-4" aria-hidden />
                      </Primary>
                      <Ghost
                        onClick={() =>
                          window.open(POC_X_CMS_SITE, "_blank", "noopener,noreferrer")
                        }
                      >
                        {t.ctaDemo}
                      </Ghost>
                    </div>
                  </div>
                  <figure className="relative">
                    <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-[#FF1D25]/15 via-[#1A8FDC]/20 to-transparent blur-2xl" />
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/50 shadow-2xl ring-1 ring-white/5">
                      <img
                        src={m.image}
                        alt=""
                        className="aspect-[4/3] w-full object-cover object-top"
                        loading="lazy"
                      />
                      <figcaption className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-3 pt-10 text-xs font-medium text-white/90">
                        Viento Norte · {m.chip[lang]}
                      </figcaption>
                    </div>
                  </figure>
                </div>
              </TourScreen>
            );
          })}

          {/* BUILD */}
          <TourScreen id="build">
            <div className="mx-auto w-full max-w-3xl">
              <BrandKicker>{t.build.kicker}</BrandKicker>
              <TourTitle>{t.build.title}</TourTitle>
              <TourBody>{t.build.body}</TourBody>
              <ol className="mt-10 space-y-4">
                {t.build.points.map((p, i) => (
                  <li key={p} className="flex gap-4 text-base text-white/85">
                    <span className="font-mono text-sm font-semibold text-transparent bg-brand-gradient bg-clip-text">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {p}
                  </li>
                ))}
              </ol>
              <div className="mt-10">
                <Primary onClick={() => go(total - 1)}>
                  {t.ctaNext}
                  <ChevronDown className="ml-2 h-4 w-4" aria-hidden />
                </Primary>
              </div>
            </div>
          </TourScreen>

          {/* START */}
          <TourScreen id="start">
            <div className="mx-auto w-full max-w-3xl text-center">
              <div className="mb-6 flex justify-center">
                <LogoMarkSvg size={48} plate="floating" />
              </div>
              <BrandKicker className="text-center">{t.start.kicker}</BrandKicker>
              <TourTitle className="text-center">{t.start.title}</TourTitle>
              <TourBody className="mx-auto text-center">{t.start.body}</TourBody>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
                {scheduleReady ? (
                  <Primary onClick={openSchedule}>
                    <Calendar className="mr-2 h-4 w-4" aria-hidden />
                    {t.ctaSchedule}
                  </Primary>
                ) : null}
                <Primary onClick={() => navigate(ROUTES.consulting)}>
                  {t.ctaFunnel}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </Primary>
                <Ghost
                  onClick={() =>
                    window.open(POC_X_CMS_SITE, "_blank", "noopener,noreferrer")
                  }
                >
                  {t.ctaDemo}
                  <ExternalLink className="ml-2 h-4 w-4" aria-hidden />
                </Ghost>
              </div>
            </div>
          </TourScreen>
        </div>

        {/* Bottom tour dock */}
        <footer className="relative z-[55] flex shrink-0 items-center justify-between gap-3 border-t border-white/8 bg-[#050a14]/95 px-3 py-2.5 backdrop-blur-md md:px-6">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={active === 0}
            className="min-h-10 text-white/80 disabled:opacity-30 hover:bg-white/10 hover:text-white"
            onClick={() => go(active - 1)}
          >
            <ChevronUp className="mr-1 h-4 w-4" aria-hidden />
            <span className="hidden sm:inline">{t.ctaPrev}</span>
          </Button>

          <div className="flex flex-col items-center gap-1">
            <p className="font-mono text-[11px] tabular-nums text-white/55">
              {active + 1} {t.of} {total}
            </p>
            <div className="flex gap-1.5" aria-hidden>
              {screens.map((id, i) => (
                <button
                  key={id}
                  type="button"
                  tabIndex={-1}
                  onClick={() => go(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i === active
                      ? "w-5 bg-brand-gradient"
                      : "w-1.5 bg-white/25 hover:bg-white/45"
                  )}
                />
              ))}
            </div>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={active >= total - 1}
            className="min-h-10 text-white/80 disabled:opacity-30 hover:bg-white/10 hover:text-white"
            onClick={() => go(active + 1)}
          >
            <span className="hidden sm:inline">{t.ctaNext}</span>
            <ChevronDown className="ml-1 h-4 w-4" aria-hidden />
          </Button>
        </footer>
      </div>
    </>
  );
}

function TourScreen({ id, children }: { id: string; children: ReactNode }) {
  return (
    <section
      id={`poc-screen-${id}`}
      className="flex w-full snap-start snap-always flex-col justify-center px-5 py-10 md:px-12 lg:px-16"
      /* altura del viewport del tour (header + dock + progress) */
      style={{ minHeight: "calc(100dvh - 7.25rem)" }}
    >
      {children}
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
        "mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-white/45",
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
        "mb-5 whitespace-pre-line font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl",
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
        "max-w-xl text-base leading-relaxed text-white/65 md:text-lg",
        className
      )}
    >
      {children}
    </p>
  );
}

function Primary({
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
      className="min-h-[48px] bg-brand-gradient font-semibold text-white hover:opacity-90"
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

function Ghost({
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
      className="min-h-[48px] border-white/25 bg-transparent font-semibold text-white hover:bg-white/10"
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
