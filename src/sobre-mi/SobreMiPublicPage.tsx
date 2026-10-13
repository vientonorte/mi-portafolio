import { Navigation } from "../components/organisms/Navigation";
import Footer from "../components/Footer";
import { SECTION_TITLE_CLASS } from "../components/marketing";
import { experiences } from "../data/experience-data";
import { homeHref, minimalNavLinks, siteServiciosHref } from "../lib/site-nav";
import { CV_ASSET, CV_DOCX_ES } from "../lib/site-contact";
import { cn } from "../lib/utils";
import { SOBRE_MI_FIGMA_LINKS } from "./figma-links";

/** Cargos de producto y web. El catálogo completo sigue en la ficha hash. */
const PUBLIC_COMPANIES = [
  "micro1",
  "Viento Norte",
  "SURA Investments",
  "Transvip Chile",
  "Karri by Transvip",
  "Havas Group Chile",
  "Valuesite Ltda",
] as const;

function asset(file: string): string {
  return `${homeHref()}${file}`;
}

/**
 * /sobre-mi/ — página estática (mismo patrón que /noticias/).
 * GitHub Pages no sirve la ruta HashRouter /#/sobre-mi como path HTTP.
 */
export function SobreMiPublicPage() {
  const roles = experiences.filter((entry) =>
    (PUBLIC_COMPANIES as readonly string[]).includes(entry.company)
  );

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
        <section aria-labelledby="sobre-mi-heading" className="border-b border-border/40 py-12 md:py-16">
          <div className="container mx-auto max-w-3xl px-4">
            <h1
              id="sobre-mi-heading"
              className={cn(SECTION_TITLE_CLASS, "font-[family-name:var(--font-chillax)]")}
            >
              Sobre mí
            </h1>
            <div className="mt-8 grid gap-6 sm:grid-cols-[160px_1fr] sm:items-start sm:gap-8">
              <img
                src={asset("profile-photo.jpg")}
                alt="Rodrigo Gaete, UX Manager en Viento Norte"
                width={160}
                height={200}
                className="mx-auto aspect-[4/5] w-full max-w-[160px] rounded-2xl object-cover ring-1 ring-border/60 sm:mx-0"
              />
              <div>
                <p className="text-xl font-semibold tracking-tight sm:text-2xl">Rodrigo Gaete</p>
                <p className="mt-1 text-base font-medium text-primary">UX Manager · Viento Norte</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  + AI Trainer · micro1 (EE.UU. · jornada parcial)
                </p>
                <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted-foreground">
                  Interfaces de producto en empresas reales. Hoy: Viento Norte (n2n) y micro1 (AI
                  data, EE.UU.). Antes: UX Lead SURA (regional, hasta jun. 2026).
                </p>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Años de oficio y liderazgo">
                  <li className="inline-flex min-h-8 items-center rounded-full border border-primary/25 bg-primary/5 px-2.5 py-1 text-[11px] font-semibold text-primary">
                    7+ años
                    <span className="ml-1 font-medium text-muted-foreground">
                      · Craft UX/UI · Viento Norte 2019–
                    </span>
                  </li>
                  <li className="inline-flex min-h-8 items-center rounded-full border border-primary/25 bg-primary/5 px-2.5 py-1 text-[11px] font-semibold text-primary">
                    3+ lead
                    <span className="ml-1 font-medium text-muted-foreground">
                      · Mobility → Wealth (Transvip · SURA)
                    </span>
                  </li>
                </ul>
                <p className="mt-4 flex flex-wrap gap-3">
                  <a className="inline-flex min-h-11 items-center underline underline-offset-2" href={asset(CV_ASSET)}>
                    CV en PDF
                  </a>
                  <a className="inline-flex min-h-11 items-center underline underline-offset-2" href={asset(CV_DOCX_ES)}>
                    CV en Word (ATS)
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="experiencia-heading" className="border-b border-border/40 py-12 md:py-16" id="experiencia">
          <div className="container mx-auto max-w-3xl px-4">
            <h2 id="experiencia-heading" className={cn(SECTION_TITLE_CLASS, "font-[family-name:var(--font-chillax)]")}>
              Trayecto
            </h2>
            <ul className="m-0 mt-8 list-none space-y-6 p-0">
              {roles.map((entry) => (
                <li key={entry.company} className="border-b border-border/40 pb-6 last:border-0">
                  <h3 className="text-lg font-semibold">{entry.company}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {entry.position} · {entry.period}
                  </p>
                  <p className="mt-2 max-w-prose text-sm leading-relaxed">{entry.role}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="figma-heading" className="py-12 md:py-16" id="prototipos">
          <div className="container mx-auto max-w-3xl px-4">
            <h2 id="figma-heading" className={cn(SECTION_TITLE_CLASS, "font-[family-name:var(--font-chillax)]")}>
              Prototipos en Figma
            </h2>
            <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted-foreground">
              Archivos y prototipos navegables de proyectos reales. Cada enlace abre Figma en una
              pestaña nueva.
            </p>
            <ul className="m-0 mt-8 list-none space-y-4 p-0">
              {SOBRE_MI_FIGMA_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 flex-col justify-center underline-offset-2 hover:underline"
                  >
                    <span className="font-medium">{link.title}</span>
                    <span className="text-sm text-muted-foreground">{link.detail}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer variant="contact-only" />
    </>
  );
}
