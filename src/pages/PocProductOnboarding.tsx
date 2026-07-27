/**
 * POC · Onboarding de producto estilo Apple.
 * Narrativa: cada módulo X|CMS es un producto a medida (sin nube, dueño del dato).
 * Demo canónica: https://pouch-growl-74881457.figma.site
 * Ruta: /#/poc/product-onboarding · noIndex · no embudo prod
 */
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Calendar,
  ChevronDown,
  ExternalLink,
  Lock,
  Server,
  Shield,
  Building2,
} from "lucide-react";
import { SEOHead } from "../components/atoms/SEOHead";
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

type Screen =
  | "intro"
  | "principles"
  | PocModuleId
  | "build"
  | "start";

export default function PocProductOnboarding() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const es = language === "es";
  const scheduleReady = freeRadarHasSchedule();
  const principles = POC_PRINCIPLES[language === "en" ? "en" : "es"];

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

  const t = es
    ? {
        badge: "POC · módulos-producto Viento Norte",
        skip: "Consultoría",
        liveDemo: "Abrir demo X|CMS",
        intro: {
          kicker: "Modelo de negocio",
          title: "No vendemos nube.\nConstruimos módulos.",
          body: "Cada módulo es un producto a medida para la empresa dueña del dato. Trayectoria enterprise (SURA, Transvip, pymes) — empaquetada como software que se instala y se entiende.",
        },
        principles: {
          kicker: "Promesa",
          title: "Cuatro reglas.\nSin letra chica.",
          body: "Si el módulo no las cumple, no es Viento Norte.",
        },
        build: {
          kicker: "Cómo se construye",
          title: "A medida.\nCon craft enterprise.",
          body: "Partimos del job real (riesgo, inventario, pedidos…). Diseñamos, prototipamos y entregamos el módulo con dueño claro del dato. Referencia viva: X|CMS en Figma Sites.",
          points: [
            "Discovery + IA del módulo (qué decide quién)",
            "UI y flujos con roles reales",
            "Entrega local-first / perímetro del cliente",
            "Handoff y evidencia (como en RIA / N2N)",
          ],
        },
        start: {
          kicker: "Siguiente paso",
          title: "Elige un módulo.\nLo hacemos tuyo.",
          body: scheduleReady
            ? "Agenda 30 min o cierra alcance en consultoría. Sin demo de marketing vacía: hablamos del módulo que necesitas."
            : "Cierra alcance en consultoría. Configura agenda free a11y para reservar slot online.",
        },
        ctaNext: "Continuar",
        ctaSchedule: "Agenda Google · 30 min",
        ctaFunnel: "Empezar en consultoría",
        ctaDemo: "Ver X|CMS en vivo",
        moduleLabel: "Módulo",
        capabilities: "Incluye",
        ownership: "Dueño del dato",
        hint: "Scroll · flechas · un módulo = un producto",
        chipsAria: "Módulos producto",
      }
    : {
        badge: "POC · Viento Norte product modules",
        skip: "Consulting",
        liveDemo: "Open X|CMS demo",
        intro: {
          kicker: "Business model",
          title: "We don’t sell cloud.\nWe build modules.",
          body: "Each module is a custom product for the company that owns the data. Enterprise trajectory (SURA, Transvip, SMBs) — packaged as software you install and understand.",
        },
        principles: {
          kicker: "Promise",
          title: "Four rules.\nNo fine print.",
          body: "If the module breaks them, it isn’t Viento Norte.",
        },
        build: {
          kicker: "How we build",
          title: "Custom.\nEnterprise craft.",
          body: "We start from the real job (risk, inventory, orders…). Design, prototype, and deliver the module with clear data ownership. Live reference: X|CMS on Figma Sites.",
          points: [
            "Discovery + module IA (who decides what)",
            "UI and flows with real roles",
            "Local-first / client perimeter delivery",
            "Handoff and proof (RIA / N2N style)",
          ],
        },
        start: {
          kicker: "Next step",
          title: "Pick a module.\nWe make it yours.",
          body: scheduleReady
            ? "Book 30 minutes or close scope in consulting. No empty marketing demo — we talk about the module you need."
            : "Close scope in consulting. Configure free a11y calendar for online booking.",
        },
        ctaNext: "Continue",
        ctaSchedule: "Google Calendar · 30 min",
        ctaFunnel: "Start consulting",
        ctaDemo: "See live X|CMS",
        moduleLabel: "Module",
        capabilities: "Includes",
        ownership: "Data owner",
        hint: "Scroll · arrows · one module = one product",
        chipsAria: "Product modules",
      };

  const go = useCallback(
    (i: number) => {
      const next = Math.max(0, Math.min(screens.length - 1, i));
      setActive(next);
      document
        .getElementById(`poc-screen-${screens[next]}`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [screens]
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
      { threshold: [0.4, 0.55] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [screens]);

  const openSchedule = () => {
    openFreeRadarEntry(navigate, language, "free-radar", { mode: "schedule" });
  };

  const lang = es ? "es" : "en";
  const principleIcons = [Server, Shield, Building2, Lock];

  return (
    <>
      <SEOHead
        title={
          es
            ? "POC · Módulos producto Viento Norte"
            : "POC · Viento Norte product modules"
        }
        description={
          es
            ? "Onboarding de módulos-producto a medida: sin nube, dueño del dato. Referencia X|CMS."
            : "Custom product-module onboarding: no cloud lock-in, data ownership. X|CMS reference."
        }
        noIndex
      />

      <div className="relative min-h-screen bg-[#050a14] text-[#f7f2e7]">
        <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-3 px-4 py-3 md:px-8">
          <span className="rounded-full border border-white/12 bg-black/40 px-3 py-1 text-[11px] font-medium tracking-wide backdrop-blur-md">
            {t.badge}
          </span>
          <div className="flex items-center gap-2">
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
              className="text-white/80 hover:bg-white/10 hover:text-white"
              onClick={() => navigate(ROUTES.consulting)}
            >
              {t.skip}
              <ArrowRight className="ml-1 h-3.5 w-3.5" aria-hidden />
            </Button>
          </div>
        </header>

        {/* Chips de módulos — sticky bajo header cuando hay un módulo activo */}
        <div
          className={cn(
            "fixed inset-x-0 top-12 z-40 border-b border-white/5 bg-[#050a14]/80 px-3 py-2 backdrop-blur-md transition-opacity md:top-14",
            active >= 2 && active < 2 + POC_MODULES.length
              ? "opacity-100"
              : "pointer-events-none opacity-0"
          )}
        >
          <nav
            className="mx-auto flex max-w-5xl gap-2 overflow-x-auto pb-1"
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
                      ? "bg-white text-[#050a14]"
                      : "bg-white/8 text-white/70 hover:bg-white/15 hover:text-white"
                  )}
                >
                  {m.chip[lang]}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Dots desktop */}
        <nav
          className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2 lg:flex"
          aria-label={es ? "Pantallas" : "Screens"}
        >
          {screens.map((id, i) => (
            <button
              key={id}
              type="button"
              aria-label={`${i + 1}`}
              aria-current={active === i ? "step" : undefined}
              className={cn(
                "h-2 w-2 rounded-full transition-all",
                active === i ? "scale-125 bg-white" : "bg-white/25 hover:bg-white/50"
              )}
              onClick={() => go(i)}
            />
          ))}
        </nav>

        {/* INTRO */}
        <ScreenShell id="intro" dark>
          <Kicker>{t.intro.kicker}</Kicker>
          <Title>{t.intro.title}</Title>
          <Body>{t.intro.body}</Body>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Primary onClick={() => go(1)}>{t.ctaNext}</Primary>
            <Ghost
              onClick={() => window.open(POC_X_CMS_SITE, "_blank", "noopener,noreferrer")}
            >
              {t.ctaDemo}
              <ExternalLink className="ml-2 h-4 w-4" aria-hidden />
            </Ghost>
          </div>
          <p className="mt-16 text-center text-[11px] tracking-wide text-white/30 md:mt-20">
            {t.hint}
          </p>
        </ScreenShell>

        {/* PRINCIPLES */}
        <ScreenShell id="principles" dark>
          <Kicker>{t.principles.kicker}</Kicker>
          <Title>{t.principles.title}</Title>
          <Body>{t.principles.body}</Body>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {principles.map((p, i) => {
              const Icon = principleIcons[i] ?? Lock;
              return (
                <li
                  key={p.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
                >
                  <Icon className="mb-3 h-5 w-5 text-[#1A8FDC]" aria-hidden />
                  <p className="text-base font-semibold tracking-tight">{p.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{p.body}</p>
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
        </ScreenShell>

        {/* MODULES */}
        {POC_MODULES.map((m, mi) => {
          const idx = screens.indexOf(m.id);
          return (
            <ScreenShell key={m.id} id={m.id} dark split>
              <div className="space-y-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
                  {t.moduleLabel} {String(mi + 1).padStart(2, "0")} · {m.chip[lang]}
                </p>
                <h2 className="whitespace-pre-line text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl lg:text-[3.25rem]">
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
                        className="flex gap-2 text-sm text-white/75 before:mt-2 before:h-1 before:w-1 before:shrink-0 before:rounded-full before:bg-[#1A8FDC] before:content-['']"
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="rounded-xl border border-[#1A8FDC]/25 bg-[#1A8FDC]/10 px-4 py-3 text-sm leading-relaxed text-white/85">
                  <span className="font-semibold text-[#7ec8f5]">{t.ownership}: </span>
                  {m.ownership[lang]}
                </p>
                <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                  <Primary onClick={() => go(idx + 1)}>{t.ctaNext}</Primary>
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
                <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-[#1A8FDC]/25 to-transparent blur-2xl" />
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/50 shadow-2xl">
                  <img
                    src={m.image}
                    alt=""
                    className="aspect-[4/3] w-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
              </figure>
            </ScreenShell>
          );
        })}

        {/* BUILD */}
        <ScreenShell id="build" dark>
          <Kicker>{t.build.kicker}</Kicker>
          <Title>{t.build.title}</Title>
          <Body>{t.build.body}</Body>
          <ol className="mt-10 max-w-lg space-y-4">
            {t.build.points.map((p, i) => (
              <li key={p} className="flex gap-4 text-base text-white/80">
                <span className="font-mono text-sm text-[#1A8FDC]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {p}
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <Primary onClick={() => go(screens.length - 1)}>{t.ctaNext}</Primary>
          </div>
        </ScreenShell>

        {/* START */}
        <ScreenShell id="start" dark>
          <Kicker>{t.start.kicker}</Kicker>
          <Title>{t.start.title}</Title>
          <Body>{t.start.body}</Body>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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
              onClick={() => window.open(POC_X_CMS_SITE, "_blank", "noopener,noreferrer")}
            >
              {t.ctaDemo}
              <ExternalLink className="ml-2 h-4 w-4" aria-hidden />
            </Ghost>
          </div>
        </ScreenShell>
      </div>
    </>
  );
}

function ScreenShell({
  id,
  children,
  dark,
  split,
}: {
  id: string;
  children: ReactNode;
  dark?: boolean;
  split?: boolean;
}) {
  return (
    <section
      id={`poc-screen-${id}`}
      className={cn(
        "flex min-h-[100dvh] flex-col justify-center px-5 pb-20 pt-24 md:px-16 lg:px-24",
        dark && "bg-[#050a14]"
      )}
    >
      <div
        className={cn(
          "mx-auto w-full max-w-6xl",
          split && "grid items-center gap-12 lg:grid-cols-2 lg:gap-16"
        )}
      >
        {children}
      </div>
    </section>
  );
}

function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
      {children}
    </p>
  );
}

function Title({ children }: { children: ReactNode }) {
  return (
    <h1 className="mb-5 whitespace-pre-line text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
      {children}
    </h1>
  );
}

function Body({ children }: { children: ReactNode }) {
  return (
    <p className="max-w-xl text-base leading-relaxed text-white/65 md:text-lg">
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
      className="min-h-[48px] bg-white font-semibold text-[#050a14] hover:bg-white/90"
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
