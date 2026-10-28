import { Navigation } from "../components/organisms/Navigation";
import Footer from "../components/Footer";
import { SECTION_TITLE_CLASS } from "../components/marketing";
import { privacyPage as p } from "../lib/i18n/locales/es/portfolio";
import { homeHref, minimalNavLinks, siteServiciosHref } from "../lib/site-nav";
import { SITE_CONTACT } from "../lib/site-contact";
import { cn } from "../lib/utils";

const APP_PRIVACY = "https://vientonorte.io/s/polijuego-privacy/";

/**
 * /privacidad/ — política de privacidad, página estática prerenderizada (mismo patrón que /noticias/).
 * Contenido = el que ya existía en la vista SPA #/privacy (src/lib/i18n/locales/es/portfolio.ts,
 * `privacyPage`). No se agrega texto legal nuevo aquí. #/privacy redirige a esta página.
 */
export function PrivacidadPage() {
  const rightsMailto = `mailto:${SITE_CONTACT.email}?subject=${encodeURIComponent("Derechos ARSOPL · privacidad")}`;
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
      <main id="main" tabIndex={-1} className="pt-[var(--header-height)]" data-page="privacidad">
        <section aria-labelledby="privacidad-heading" className="container mx-auto max-w-3xl px-6 py-12 md:py-16">
          <nav aria-label="Migas de pan" className="mb-6 text-sm text-muted-foreground" data-breadcrumbs>
            <ol className="m-0 flex list-none flex-wrap gap-2 p-0">
              <li>
                <a href={homeHref()} className="underline underline-offset-2 hover:text-foreground">
                  Inicio
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">Política de privacidad</li>
            </ol>
          </nav>
          <p className="text-sm font-medium text-primary">{p.badge}</p>
          <h1 id="privacidad-heading" className={cn(SECTION_TITLE_CLASS, "font-[family-name:var(--font-chillax)]")}>
            {p.title}
          </h1>
          <p className="mt-3 max-w-2xl">{p.lead}</p>
          <p className="text-sm text-muted-foreground">{p.updated}</p>

          <ul className="m-0 mb-12 mt-8 grid list-none gap-4 p-0 sm:grid-cols-2">
            {p.principles.map((item) => (
              <li key={item.title} className="rounded-2xl border border-border bg-card p-5">
                <h2 className="m-0 text-lg font-semibold tracking-tight">{item.title}</h2>
                <p className="mb-0 mt-2 text-sm text-muted-foreground">{item.body}</p>
              </li>
            ))}
          </ul>

          <h2 className="mb-2 text-xl font-semibold tracking-tight">{p.inventoryTitle}</h2>
          <p className="mb-4 text-sm text-muted-foreground">{p.inventoryHint}</p>
          <div className="mb-10 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-left">
                <tr>
                  {p.inventoryHead.map((h) => (
                    <th key={h} scope="col" className="px-4 py-3 font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {p.inventoryRows.map((row) => (
                  <tr key={row.data} className="border-t border-border">
                    <th scope="row" className="px-4 py-3 text-left align-top font-medium">
                      {row.data}
                    </th>
                    <td className="px-4 py-3 align-top text-muted-foreground">{row.purpose}</td>
                    <td className="px-4 py-3 align-top text-muted-foreground">{row.basis}</td>
                    <td className="px-4 py-3 align-top text-muted-foreground">{row.keep}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="mb-3 text-xl font-semibold tracking-tight">{p.notTitle}</h2>
          <ul className="mb-12 space-y-2 text-sm text-muted-foreground">
            {p.notItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h2 className="mb-2 text-xl font-semibold tracking-tight">{p.rightsTitle}</h2>
          <p className="mb-4 text-sm text-muted-foreground">{p.rightsLead}</p>
          <ul className="m-0 mb-12 flex list-none flex-wrap gap-2 p-0">
            {p.rights.map((r) => (
              <li key={r.label}>
                <a
                  href={rightsMailto}
                  className="inline-flex min-h-11 items-center rounded-full border border-border bg-card px-4 text-sm font-medium hover:border-primary/40"
                >
                  {r.label}
                </a>
              </li>
            ))}
          </ul>

          <article className="mb-10 rounded-2xl border border-border bg-card p-6">
            <h2 className="m-0 text-lg font-semibold tracking-tight">{p.appTitle}</h2>
            <p className="mb-4 mt-2 text-sm text-muted-foreground">{p.appBody}</p>
            <a href={APP_PRIVACY} className="text-sm font-medium text-primary underline underline-offset-2">
              {p.appCta}
            </a>
          </article>

          <h2 className="mb-2 text-xl font-semibold tracking-tight">{p.controllerTitle}</h2>
          <p className="mb-8 text-sm text-muted-foreground">{p.controllerBody}</p>
          <p className="text-sm">
            <a href={`mailto:${SITE_CONTACT.email}`} className="text-primary underline underline-offset-2">
              {SITE_CONTACT.email}
            </a>
          </p>
        </section>
      </main>
      <Footer variant="contact-only" />
    </>
  );
}
