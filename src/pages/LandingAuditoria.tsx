/**
 * Landing aislada 100% SEM (Google Ads) · diagnóstico Enterprise
 * (Accesibilidad WCAG 2.2 AA + Privacidad por Diseño, Ley 21.719).
 * Ruta: ROUTES.adsLandingA11y ("/ads/auditoria-accesibilidad").
 *
 * Reglas de aislamiento (evitar fuga de presupuesto / fuga de clics):
 * - SIN header/nav global (Navigation) ni dock (BottomNav) — ver App.tsx (isAdsLandingPath).
 * - SIN footer con links a otras secciones (el sitio ya no tiene footer global, ver App.tsx).
 * - SIN links salientes en la prueba social (texto plano, sin <a> ni logos sin asset real).
 * - Un único CTA: agendar en Google Calendar (mismo canal que FreeA11yScheduleCta).
 * - `noIndex` en SEOHead: tráfico SEM, no debe competir/mezclarse con el SEO orgánico general.
 * - Mail de confirmación de kickoff: el click ya registra `POST /api/booking`
 *   (origin `ads-a11y-landing`, ver `recordBookingIntent`); el mail propio con
 *   el guion de los 30 min lo dispara el puente Calendar → Worker cuando el
 *   evento se confirma con email real — ver `docs/CALENDAR-BOOKING-BRIDGE.md`.
 */
import { Calendar, ShieldCheck } from "lucide-react";
import { SEOHead } from "../components/atoms/SEOHead";
import { FreeA11yScheduleCta } from "../components/molecules/FreeA11yScheduleCta";
import { canonicalFromPath } from "../lib/seo";
import { ROUTES } from "../lib/routes";

/** Viñetas de beneficio: riesgo legal (multas + pérdida de clientes), no "diseño bonito". */
const BENEFIT_BULLETS: string[] = [
  "Evita multas por incumplimiento de accesibilidad (WCAG 2.2 AA) y de la Ley 21.719 de protección de datos.",
  "Mitiga el riesgo legal estructural de tu flujo antes de que lo detecte un regulador o un cliente enterprise.",
  "No pierdas clientes corporativos que exigen cumplimiento como requisito de contrato.",
];

export default function LandingAuditoria() {
  return (
    <div className="ads-landing min-h-screen bg-background">
      <SEOHead
        title="Cumplimiento digital estructural (WCAG 2.2 + Ley 21.719) · Viento Norte"
        description="Diagnóstico de 5 días: accesibilidad (WCAG 2.2 AA) y privacidad por diseño (Ley 21.719) en un solo flujo crítico. Agenda un kickoff gratis de 30 minutos."
        url={canonicalFromPath(ROUTES.adsLandingA11y)}
        noIndex
      />

      <main id="main" tabIndex={-1} className="container mx-auto max-w-3xl px-4 py-16 sm:py-24">
        <header className="text-center">
          <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
            No dejes que un flujo mal diseñado te cueste una multa o un cliente
          </h1>
          <h2 className="mt-4 text-lg font-semibold text-muted-foreground sm:text-xl">
            Diagnóstico Enterprise de Accesibilidad (WCAG 2.2 AA) + Privacidad por Diseño
            (Ley 21.719)
          </h2>
          <ul className="mx-auto mt-8 flex max-w-xl flex-col gap-3 text-left">
            {BENEFIT_BULLETS.map((bullet, index) => (
              <li key={index} className="flex items-start gap-2.5">
                <ShieldCheck
                  className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                  aria-hidden
                />
                <span className="text-base text-muted-foreground sm:text-lg">{bullet}</span>
              </li>
            ))}
          </ul>
        </header>

        {/* Prueba social: texto plano, sin links salientes ni logos sin asset real. */}
        <section
          aria-label="Empresas con las que hemos trabajado"
          className="mt-12"
        >
          <p className="text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Empresas con las que hemos trabajado
          </p>
          <p className="mt-4 text-center text-sm font-medium text-muted-foreground sm:text-base">
            Mandato AFP · SURA Investments · RIA
          </p>
        </section>

        {/* CTA único: agenda Google Calendar. Nada más compite por el clic. */}
        <section className="mt-14" aria-label="Agendar auditoría gratis">
          <FreeA11yScheduleCta origin="ads-a11y-landing" layout="card" className="mx-auto" />
          <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" aria-hidden />
            Agenda directa en Google Calendar
          </p>
        </section>
      </main>
    </div>
  );
}
