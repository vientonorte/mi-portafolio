/**
 * Landing aislada 100% SEM (Google Ads) · auditoría de accesibilidad gratis.
 * Ruta: ROUTES.adsLandingA11y ("/ads/auditoria-accesibilidad").
 *
 * Reglas de aislamiento (evitar fuga de presupuesto / fuga de clics):
 * - SIN header/nav global (Navigation) ni dock (BottomNav) — ver App.tsx (isAdsLandingPath).
 * - SIN footer con links a otras secciones (el sitio ya no tiene footer global, ver App.tsx).
 * - SIN links salientes en la prueba social (solo logos estáticos, sin <a>).
 * - Un único CTA: agendar en Google Calendar (mismo canal que FreeA11yScheduleCta).
 * - `noIndex` en SEOHead: tráfico SEM, no debe competir/mezclarse con el SEO orgánico general.
 */
import { Calendar, ExternalLink } from "lucide-react";
import { SEOHead } from "../components/atoms/SEOHead";
import { FreeA11yScheduleCta } from "../components/molecules/FreeA11yScheduleCta";
import { portfolioImages } from "../lib/portfolio-image-urls";
import { canonicalFromPath } from "../lib/seo";
import { ROUTES } from "../lib/routes";

/** Prueba social: solo logos estáticos, sin links (evita fuga de clics). */
const SOCIAL_PROOF_LOGOS: Array<{ src: string; alt: string }> = [
  { src: portfolioImages.brands.walmart, alt: "Walmart" },
  { src: portfolioImages.transvip.logo, alt: "Transvip" },
  { src: portfolioImages.sura.logo, alt: "Sura" },
  { src: portfolioImages.brands.havas, alt: "Havas" },
  { src: portfolioImages.karri.logo, alt: "Karri" },
];

export default function LandingAuditoria() {
  return (
    <div className="ads-landing min-h-screen bg-background">
      <SEOHead
        title="Auditoría de accesibilidad gratis · Viento Norte"
        description="Revisión gratuita de accesibilidad (WCAG 2.2 AA) de un flujo crítico de tu sitio. Agenda 30 minutos online, sin formularios."
        url={canonicalFromPath(ROUTES.adsLandingA11y)}
        noIndex
      />

      <main id="main" tabIndex={-1} className="container mx-auto max-w-3xl px-4 py-16 sm:py-24">
        <header className="text-center">
          <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
            Auditoría de accesibilidad gratis para tu sitio
          </h1>
          <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
            Revisamos un flujo crítico (WCAG 2.2 AA) y te entregamos hallazgos accionables
            en una llamada de 30 minutos — sin formularios ni compromiso.
          </p>
        </header>

        {/* Prueba social: logos estáticos, sin links salientes. */}
        <section
          aria-label="Empresas con las que hemos trabajado"
          className="mt-12"
        >
          <p className="text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Empresas con las que hemos trabajado
          </p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 list-none p-0">
            {SOCIAL_PROOF_LOGOS.map((logo) => (
              <li key={logo.alt} className="flex items-center">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  loading="lazy"
                  className="h-8 w-auto opacity-70 grayscale sm:h-10"
                />
              </li>
            ))}
          </ul>
        </section>

        {/* CTA único: agenda Google Calendar. Nada más compite por el clic. */}
        <section className="mt-14" aria-label="Agendar auditoría gratis">
          <FreeA11yScheduleCta origin="ads-a11y-landing" layout="card" className="mx-auto" />
          <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" aria-hidden />
            Agenda directa en Google Calendar
            <ExternalLink className="h-3 w-3" aria-hidden />
          </p>
        </section>
      </main>
    </div>
  );
}
