import { Navigation } from "../components/organisms/Navigation";
import Footer from "../components/Footer";
import { Breadcrumbs } from "../components/molecules/Breadcrumbs";
import { SECTION_TITLE_CLASS } from "../components/marketing";
import { homeHref, minimalNavLinks, siteServiciosHref, siteSobreMiHref } from "../lib/site-nav";
import { cn } from "../lib/utils";

/** Nav único (src/lib/site-nav.ts): Servicios · Noticias · Contacto (→ /servicios/#contacto). */
export function nosotrosNavLinks() {
  return minimalNavLinks({ contactHref: siteServiciosHref("contacto") });
}

/** Qué hacemos: 3 tarjetas → anclas existentes de /servicios/ (SERVICIOS_ANCHORS). */
export const NOSOTROS_SERVICIOS = [
  {
    id: "web-pymes",
    title: "Web para pymes",
    body: "Sitios claros y accesibles para que tus clientes encuentren lo que buscan y te contacten.",
  },
  {
    id: "consultoria-ux",
    title: "Consultoría UX en un flujo",
    body: "Tomamos un flujo crítico de tu servicio, lo investigamos con personas reales y lo mejoramos.",
  },
  {
    id: "revision-gratis",
    title: "Revisión de accesibilidad",
    body: "Revisamos tu sitio contra WCAG 2.2 AA y te decimos qué arreglar primero.",
  },
] as const;

export const NOSOTROS_PRINCIPIOS = [
  { title: "Investigación con personas reales", body: "Diseñamos a partir de lo que vemos y escuchamos de quienes usan el servicio." },
  { title: "Accesibilidad WCAG 2.2 AA por defecto", body: "La accesibilidad es parte de cada entrega, no un extra." },
  { title: "Privacidad desde el diseño", body: "Tratamos los datos personales con el criterio de la Ley 21.719 desde el primer boceto." },
  { title: "Entregas cortas con QA", body: "Avanzamos en ciclos breves y cada entrega pasa por control de calidad." },
] as const;

/**
 * Casos: con nombre SOLO Maraña, Pareti y Teatro Di Popolo; EDU21 solo como
 * «pyme de mobiliario educacional». Ningún otro nombre de cliente (brief PO 2026-10-22).
 * Los enlaces apuntan a casos que ya existen en el sitio o en el portafolio.
 */
export function nosotrosCasos() {
  return [
    {
      id: "marana",
      name: "Maraña",
      body: "Diseño UX/UI de soluciones digitales: e-commerce, CMS y planes de marketing.",
      href: `${siteSobreMiHref()}#experiencia`,
      cta: "Ver caso",
      external: false,
    },
    {
      id: "pareti",
      name: "Pareti",
      body: "Marketing digital: SEO/SEM, monitoreo de audiencias y branding.",
      href: "https://khuro.pb.online/pareti",
      cta: "Ver caso",
      external: true,
    },
    {
      id: "teatro-di-popolo",
      name: "Teatro Di Popolo",
      body: "Registro fotográfico y audiovisual para la compañía.",
      href: "https://www.behance.net/gallery/53888227/Sacco-Vanzetti",
      cta: "Ver caso",
      external: true,
    },
    {
      id: "mobiliario-edu",
      name: "Pyme de mobiliario educacional",
      body: "Taller de diseño de servicios en tres etapas: heurística, estrategia y herramientas comerciales.",
      href: siteServiciosHref("consultoria-ux"),
      cta: "Ver caso",
      external: false,
    },
  ];
}

const CARD = "flex h-full flex-col gap-2 rounded-xl border border-border bg-card p-5 shadow-sm";
const LINK =
  "mt-auto inline-flex items-center gap-1 font-medium text-primary underline underline-offset-2 hover:text-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";
const SECTION = "scroll-mt-[calc(var(--header-height)+0.75rem)] border-b border-border/40 py-12 md:py-16";

/** /nosotros/ — página de empresa (prerenderizada, mismo patrón que /noticias/). */
export function NosotrosPage() {
  return (
    <>
      <a href="#main" className="skip-link">
        Ir al contenido principal
      </a>
      <Navigation staticLinks={nosotrosNavLinks()} staticHomeHref={homeHref()} staticEnglishHref={homeHref()} />
      <main id="main" tabIndex={-1} className="pt-[var(--header-height)]" data-page="nosotros">
        <section id="que-es" aria-labelledby="nosotros-heading" className={SECTION}>
          <div className="container mx-auto max-w-6xl px-4">
            <Breadcrumbs
              className="mb-6"
              links={[{ label: "Inicio", href: homeHref() }, { label: "Nosotros", current: true }]}
            />
            <h1 id="nosotros-heading" className={cn(SECTION_TITLE_CLASS, "font-[family-name:var(--font-chillax)]")}>
              Nosotros
            </h1>
            <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
              Viento Norte es un estudio de UX/UI, accesibilidad y privacidad desde el diseño para pymes y empresas en
              Chile.
            </p>
          </div>
        </section>

        <section id="que-hacemos" aria-labelledby="que-hacemos-heading" className={SECTION}>
          <div className="container mx-auto max-w-6xl px-4">
            <h2 id="que-hacemos-heading" className={SECTION_TITLE_CLASS}>
              Qué hacemos
            </h2>
            <ul className="m-0 mt-8 grid list-none gap-6 p-0 md:grid-cols-3">
              {NOSOTROS_SERVICIOS.map((s) => (
                <li key={s.id} className={CARD} data-nosotros-servicio={s.id}>
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                  <p className="text-muted-foreground">{s.body}</p>
                  <a className={LINK} href={siteServiciosHref(s.id)}>
                    Ver en servicios<span className="sr-only">: {s.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="como-trabajamos" aria-labelledby="como-trabajamos-heading" className={SECTION}>
          <div className="container mx-auto max-w-6xl px-4">
            <h2 id="como-trabajamos-heading" className={SECTION_TITLE_CLASS}>
              Cómo trabajamos
            </h2>
            <ul className="m-0 mt-8 grid list-none gap-6 p-0 md:grid-cols-2">
              {NOSOTROS_PRINCIPIOS.map((p) => (
                <li key={p.title} className={CARD}>
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p className="text-muted-foreground">{p.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="casos" aria-labelledby="casos-heading" className={SECTION}>
          <div className="container mx-auto max-w-6xl px-4">
            <h2 id="casos-heading" className={SECTION_TITLE_CLASS}>
              Casos
            </h2>
            <ul className="m-0 mt-8 grid list-none gap-6 p-0 md:grid-cols-2 lg:grid-cols-4">
              {nosotrosCasos().map((c) => (
                <li key={c.id} className={CARD} data-nosotros-caso={c.id}>
                  <h3 className="text-lg font-semibold">{c.name}</h3>
                  <p className="text-muted-foreground">{c.body}</p>
                  <a
                    className={LINK}
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {c.cta}
                    <span className="sr-only">
                      : {c.name}
                      {c.external ? " (se abre en una pestaña nueva)" : ""}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="quien" aria-labelledby="quien-heading" className={SECTION}>
          <div className="container mx-auto max-w-6xl px-4">
            <h2 id="quien-heading" className={SECTION_TITLE_CLASS}>
              Quién está detrás
            </h2>
            <p className="mt-4 text-lg">
              <a className={LINK} href={siteSobreMiHref()}>
                Fundado por Rodrigo Gaete
              </a>
            </p>
          </div>
        </section>

        <section id="contacto" aria-labelledby="contacto-heading" className="bg-muted/30 py-12 md:py-16">
          <div className="container mx-auto max-w-3xl px-4">
            <h2 id="contacto-heading" className={SECTION_TITLE_CLASS}>
              Conversemos
            </h2>
            <p className="mt-2 text-base text-muted-foreground">Cuéntanos qué necesitas. Te respondemos sin compromiso.</p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href={siteServiciosHref("contacto")}
                className="inline-flex min-h-11 items-center rounded-lg bg-primary px-5 font-semibold text-primary-foreground hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Ir al formulario de contacto
              </a>
              <a
                href={siteServiciosHref("revision-gratis")}
                className="inline-flex min-h-11 items-center rounded-lg border border-border px-5 font-semibold hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Pedir revisión de accesibilidad
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer variant="contact-only" />
    </>
  );
}
