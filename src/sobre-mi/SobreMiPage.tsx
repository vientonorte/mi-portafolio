import { Navigation } from "../components/organisms/Navigation";
import Footer from "../components/Footer";
import { SECTION_TITLE_CLASS } from "../components/marketing";
import { StaticBreadcrumbs } from "../components/static/StaticBreadcrumbs";
import { getExperiences } from "../data/experience-data";
import { EXPERIENCE_COVER, EXPERIENCE_COVER_META } from "../data/about-visuals";
import { about } from "../lib/i18n/locales/es/portfolio";
import { homeHref, minimalNavLinks, siteServiciosHref } from "../lib/site-nav";
import { cn } from "../lib/utils";

/** Contacto público de /sobre-mi/ (TL 13-oct): solo contacto@ y LinkedIn. Nunca teléfono, dirección ni RUT. */
export const SOBRE_MI_CONTACT = {
  email: "contacto@vientonorte.io",
  linkedin: "https://www.linkedin.com/in/rodrigo-gaete-ux/",
  linkedinLabel: "linkedin.com/in/rodrigo-gaete-ux",
} as const;

/** Únicos CV publicados: UX/UI Product Designer ES y EN (limpios, sin metadatos). */
export const SOBRE_MI_CVS = [
  { lang: "es", label: "CV UX/UI Product Designer (español, PDF)", file: "cv/Rodrigo-Gaete-CV-UX-UI-Product-Designer-ES.pdf" },
  { lang: "en", label: "CV UX/UI Product Designer (English, PDF)", file: "cv/Rodrigo-Gaete-CV-UX-UI-Product-Designer-EN.pdf" },
] as const;

/**
 * Formación y certificaciones: fuente SSOT TRAYECTORIA-INVESTIGACION-RO.md (vault 00-sistema).
 * Wording exacto aprobado por TL (13-oct). Nunca «etnógrafo certificado» ni «mediador cultural certificado».
 */
export const SOBRE_MI_FORMACION = [
  { title: "Estudios de Antropología", org: "Universidad Austral de Chile (UACh)", period: "2011–2015" },
  { title: "Diplomado en Gestión de Operaciones y Transformación Digital", org: "Escuela de Negocios UC", period: "2019" },
  { title: "Diseñador UX/UI", org: "Desafío Latam", period: "2020–2021" },
  { title: "Fotografía Profesional y Fotoperiodismo", org: "Instituto Profesional ARCOS", period: "2017–2018" },
] as const;

export const SOBRE_MI_CERTIFICADOS = [
  "curso certificado de Análisis Cualitativo, Academia Etnográfica 2022",
  "certificado de participación en mediación cultural, CNCA 2017",
] as const;

function assetHref(file: string) {
  const base = import.meta.env.BASE_URL || "/";
  return `${base.endsWith("/") ? base : `${base}/`}${file}`;
}

/**
 * /sobre-mi/ — perfil de Rö, página estática prerenderizada (mismo patrón que /privacidad/ y /noticias/).
 * Contenido: timeline con portadas locales (#322, incluido en #326) + perfil de la SSOT de trayectoria.
 * El detalle de cada etapa va en segundo nivel (details/summary). #/sobre-mi redirige aquí.
 */
export function SobreMiPage() {
  const experiences = getExperiences("es");
  return (
    <>
      <a href="#main" className="skip-link">
        Ir al contenido principal
      </a>
      <Navigation
        staticLinks={minimalNavLinks({ contactHref: siteServiciosHref("contacto") })}
        staticHomeHref={homeHref()}
        staticEnglishHref={homeHref()}
      />
      <main id="main" tabIndex={-1} className="pt-[var(--header-height)]" data-page="sobre-mi">
        <section aria-labelledby="sobre-mi-heading" className="container mx-auto max-w-3xl px-6 py-12 md:py-16">
          <StaticBreadcrumbs
            items={[
              { label: "Inicio", path: "/" },
              { label: "Sobre mí", path: "/sobre-mi/" },
            ]}
          />
          <p className="text-sm font-medium text-primary">{about.badge}</p>
          <h1 id="sobre-mi-heading" className={cn(SECTION_TITLE_CLASS, "font-[family-name:var(--font-chillax)]")}>
            Rodrigo Gaete · {about.title}
          </h1>
          <p className="mt-3 max-w-2xl">{about.description}</p>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Formación en antropología (UACh): base en etnografía y métodos cualitativos aplicada a user research.
          </p>

          <h2 id="experiencia" className="mb-4 mt-12 text-xl font-semibold tracking-tight">
            Trayectoria
          </h2>
          <ol className="m-0 list-none space-y-3 p-0" data-timeline>
            {experiences.map((exp) => {
              const cover = EXPERIENCE_COVER[exp.company] || (exp.companyId && EXPERIENCE_COVER[exp.companyId]) || undefined;
              const meta = cover ? EXPERIENCE_COVER_META[cover] : undefined;
              return (
                <li key={`${exp.company}-${exp.period}`} className="rounded-2xl border border-border bg-card">
                  <details className="group p-5">
                    <summary className="cursor-pointer list-none">
                      <span className="block font-semibold">{exp.position}</span>
                      <span className="block text-sm text-muted-foreground">
                        {exp.company} · {exp.period}
                      </span>
                    </summary>
                    <div className="mt-4 space-y-2 text-sm">
                      {cover && (
                        <img
                          src={cover}
                          alt={meta?.alt ?? `Portada de ${exp.company}`}
                          width={meta?.width ?? 840}
                          height={meta?.height ?? 360}
                          loading="lazy"
                          decoding="async"
                          className="mb-3 aspect-[21/9] w-full rounded-xl object-cover"
                        />
                      )}
                      <p className="m-0">{exp.context}</p>
                      <p className="m-0">{exp.role}</p>
                      <p className="m-0 text-muted-foreground">{exp.impact}</p>
                    </div>
                  </details>
                </li>
              );
            })}
          </ol>

          <h2 className="mb-4 mt-12 text-xl font-semibold tracking-tight">Formación y certificaciones</h2>
          <ul className="m-0 list-none space-y-2 p-0 text-sm">
            {SOBRE_MI_FORMACION.map((f) => (
              <li key={f.title}>
                <strong>{f.title}</strong> · {f.org} · {f.period}
              </li>
            ))}
          </ul>
          <details className="mt-4 rounded-2xl border border-border bg-card p-5 text-sm">
            <summary className="cursor-pointer font-medium">Certificados (detalle)</summary>
            <ul className="mb-0 mt-3 space-y-1" data-certificados>
              {SOBRE_MI_CERTIFICADOS.map((c) => (
                <li key={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</li>
              ))}
            </ul>
          </details>

          <h2 className="mb-4 mt-12 text-xl font-semibold tracking-tight">CV</h2>
          <ul className="m-0 list-none space-y-2 p-0 text-sm" data-cv>
            {SOBRE_MI_CVS.map((cv) => (
              <li key={cv.file}>
                <a href={assetHref(cv.file)} hrefLang={cv.lang} download className="text-primary underline underline-offset-2">
                  {cv.label}
                </a>
              </li>
            ))}
          </ul>

          <h2 id="contacto" className="mb-4 mt-12 text-xl font-semibold tracking-tight">
            Contacto
          </h2>
          <ul className="m-0 list-none space-y-2 p-0 text-sm" data-contact>
            <li>
              <a href={`mailto:${SOBRE_MI_CONTACT.email}`} className="text-primary underline underline-offset-2">
                {SOBRE_MI_CONTACT.email}
              </a>
            </li>
            <li>
              <a href={SOBRE_MI_CONTACT.linkedin} rel="noopener" className="text-primary underline underline-offset-2">
                LinkedIn · {SOBRE_MI_CONTACT.linkedinLabel}
              </a>
            </li>
          </ul>
        </section>
      </main>
      <Footer variant="contact-only" />
    </>
  );
}
