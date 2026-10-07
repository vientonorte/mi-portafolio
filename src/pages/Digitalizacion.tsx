/**
 * Landing «Digitalización de tu negocio» · ROUTES.digitalizacion (/#/digitalizacion).
 * MVP de prueba: noIndex, fuera de sitemap/nav/footer (shell aislado vía shouldHideSiteChrome).
 * Embudo: WhatsApp primero → demo → consultoría canónica (/#/consultoria con UTM).
 * Precios de Cobros y Dashboard: TODO_PRECIO (no inventar; pendiente Decider).
 */
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, CreditCard, Globe, MessageCircle } from "lucide-react";
import { SEOHead } from "../components/atoms/SEOHead";
import { canonicalFromPath } from "../lib/seo";
import { ROUTES } from "../lib/routes";
import {
  CONSULTORIA_UTM_URL,
  WEB_EXPRESS_URL,
  trackDigitalizacionCta,
  trackDigitalizacionWhatsapp,
  whatsappUrl,
} from "../lib/digitalizacion/offer";

const BLOCKS = [
  {
    id: "web",
    icon: Globe,
    title: "Web",
    price: "$30.000",
    priceNote: "one-page lista en 72 h hábiles",
    body: "Tu página profesional con WhatsApp, ubicación y lo que vendes. Es la entrada: sobre ella se suman Cobros y Dashboard.",
    link: { href: WEB_EXPRESS_URL, label: "Ver web express" },
  },
  {
    id: "cobros",
    icon: CreditCard,
    title: "Cobros",
    // TODO_PRECIO: precio de Cobros pendiente (Decider). No inventar.
    price: "Cotiza",
    priceNote: "precio por definir",
    body: "Tus clientes pagan con transferencia banco a banco desde tu web, un link o un QR, usando la API de Fintoc (Iniciación de Pagos). No es un POS de tarjetas.",
  },
  {
    id: "dashboard",
    icon: BarChart3,
    title: "Dashboard de caja",
    // TODO_PRECIO: precio de Dashboard pendiente (Decider). No inventar.
    price: "Cotiza",
    priceNote: "precio por definir",
    body: "Un panel mensual armado con los movimientos de tu cuenta: saldo, ingresos y gastos por categoría y conciliación de pagos con facturas. Hasta 24 meses de historial.",
  },
] as const;

const STEPS = [
  { title: "Conversamos por WhatsApp", body: "Nos cuentas cómo vendes y cobras hoy. Vemos qué bloque te sirve primero." },
  { title: "Publicamos tu web", body: "Web express en 72 h hábiles. Si ya tienes web, partimos desde ahí." },
  { title: "Conectas tu banco", body: "Tú autorizas la conexión en el widget de Fintoc. Nosotros nunca vemos ni guardamos tu clave bancaria." },
  { title: "Recibes tu panel", body: "Cada mes ves tu caja ordenada por categoría y los pagos por transferencia conciliados." },
];

const FAQ = [
  {
    q: "¿Es un POS de tarjetas?",
    a: "No. Cobros usa transferencias banco a banco (Fintoc Iniciación de Pagos): tu cliente paga desde su banco en tu web, en un link o escaneando un QR. Si necesitas cobrar con tarjeta de forma presencial, te conviene un lector como Mercado Pago Point o SumUp, y el Dashboard igual puede mostrar esos abonos.",
  },
  {
    q: "¿Quién ve mis datos bancarios?",
    a: "Tú autorizas la conexión directamente en el widget de Fintoc; tu clave bancaria no pasa por Viento Norte. Con tu permiso, el panel lee solo los movimientos de las cuentas que elijas, en modo lectura. Puedes revocar el acceso cuando quieras.",
  },
  {
    q: "¿Con qué bancos funciona?",
    a: "Con los bancos que soporta Fintoc en Chile, entre ellos Banco de Chile, Santander, Itaú y BICE, entre otros. Lo confirmamos para tu banco antes de partir.",
  },
  {
    q: "¿Tengo que cambiarme de banco o abrir otra cuenta?",
    a: "No. El panel y los cobros funcionan sobre las cuentas que ya tienes.",
  },
  {
    q: "¿Cuánto cuesta?",
    a: "La web express cuesta $30.000. Cobros y Dashboard se cotizan según tu caso. Los cobros por transferencia tienen además una comisión de Fintoc por pago exitoso, que depende de su contrato y tramos; te la mostramos antes de contratar.",
  },
  {
    q: "¿Viento Norte es parte de Fintoc?",
    a: "No. Somos un estudio independiente que construye sobre la API de Fintoc (integración con Fintoc), no una alianza oficial.",
  },
];

function WhatsAppCta({ location, className = "" }: { location: string; className?: string }) {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      data-digitalizacion-cta={location}
      onClick={() => {
        trackDigitalizacionCta(location, "whatsapp");
        trackDigitalizacionWhatsapp(location);
      }}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--vn-primitive-azul-noche,#0d1b3d)] px-6 py-3 text-base font-semibold text-white dark:bg-[var(--vn-primitive-marfil,#f7f2e7)] dark:text-[#0d1b3d] shadow-sm transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${className}`}
    >
      <MessageCircle className="h-5 w-5" aria-hidden />
      Escríbenos por WhatsApp
    </a>
  );
}

function DemoLink({ location }: { location: string }) {
  return (
    <Link
      to={ROUTES.digitalizacionDemo}
      data-digitalizacion-demo-link={location}
      onClick={() => trackDigitalizacionCta(location, "demo")}
      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-base font-semibold text-foreground transition hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      Ver demo del dashboard
      <ArrowRight className="h-5 w-5" aria-hidden />
    </Link>
  );
}

export default function Digitalizacion() {
  return (
    <div className="digitalizacion-landing min-h-screen bg-background text-foreground" data-surface="digitalizacion-landing">
      <SEOHead
        title="Digitalización de tu negocio: web, cobros y caja"
        description="Web express en 72 h, cobros por transferencia banco a banco y un dashboard mensual de caja con los movimientos de tu banco. Escríbenos por WhatsApp."
        url={canonicalFromPath(ROUTES.digitalizacion)}
        noIndex
      />

      <div className="mx-auto max-w-5xl px-4 pb-16 pt-10 sm:px-6 sm:pt-16">
        <header id="dig-hero" className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Viento Norte · Digitalización de tu negocio
          </p>
          <h1 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            Tu web, tus cobros y tu caja en un solo lugar
          </h1>
          <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
            Parte con una web en 72 h. Después suma cobros por transferencia y un panel mensual que ordena los
            movimientos de tu banco, sin planillas.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <WhatsAppCta location="hero" />
            <DemoLink location="hero" />
          </div>
        </header>

        <section id="dig-bloques" aria-labelledby="dig-bloques-title" className="mt-16">
          <h2 id="dig-bloques-title" className="text-2xl font-bold sm:text-3xl">
            Tres bloques, en el orden que te sirva
          </h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {BLOCKS.map((b) => (
              <li key={b.id} id={`dig-bloque-${b.id}`} className="flex flex-col rounded-2xl border border-border bg-card p-6 text-card-foreground">
                <b.icon className="h-7 w-7 text-primary" aria-hidden />
                <h3 className="mt-3 text-xl font-bold">{b.title}</h3>
                <p className="mt-1">
                  <span className="text-2xl font-black">{b.price}</span>{" "}
                  <span className="text-sm text-muted-foreground">{b.priceNote}</span>
                </p>
                <p className="mt-3 text-base text-muted-foreground">{b.body}</p>
                {"link" in b && b.link ? (
                  <a
                    href={b.link.href}
                    className="mt-4 inline-flex items-center gap-1 font-semibold text-foreground underline underline-offset-4"
                    onClick={() => trackDigitalizacionCta(`bloque-${b.id}`, "web-express")}
                  >
                    {b.link.label}
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        </section>

        <section id="dig-como-funciona" aria-labelledby="dig-como-title" className="mt-16">
          <h2 id="dig-como-title" className="text-2xl font-bold sm:text-3xl">Cómo funciona</h2>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={s.title} className="rounded-2xl border border-border p-5">
                <span className="text-sm font-bold text-muted-foreground">Paso {i + 1}</span>
                <h3 className="mt-1 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-base text-muted-foreground">{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="dig-demo" aria-labelledby="dig-demo-title" className="mt-16 rounded-2xl bg-muted p-6 sm:p-8">
          <h2 id="dig-demo-title" className="text-2xl font-bold sm:text-3xl">Mira el dashboard con datos de ejemplo</h2>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground">
            Una pyme ficticia con seis meses de movimientos: saldo, entradas y salidas por mes, gastos por categoría y
            la lista de movimientos. Ningún dato es real.
          </p>
          <div className="mt-6">
            <DemoLink location="demo-section" />
          </div>
        </section>

        <section id="dig-faq" aria-labelledby="dig-faq-title" className="mt-16">
          <h2 id="dig-faq-title" className="text-2xl font-bold sm:text-3xl">Preguntas frecuentes</h2>
          <div className="mt-6 divide-y divide-border rounded-2xl border border-border">
            {FAQ.map((f) => (
              <details key={f.q} className="group p-5">
                <summary className="cursor-pointer list-none text-lg font-semibold marker:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
                  <span className="mr-2 inline-block transition group-open:rotate-90" aria-hidden>›</span>
                  {f.q}
                </summary>
                <p className="mt-3 text-base text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="dig-cta-final" aria-labelledby="dig-cta-title" className="mt-16 text-center">
          <h2 id="dig-cta-title" className="text-2xl font-bold sm:text-3xl">¿Partimos por tu web?</h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-muted-foreground">
            Escríbenos y te decimos qué bloque te conviene primero. Respondemos por WhatsApp.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <WhatsAppCta location="final" />
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            ¿Buscas algo más grande?{" "}
            <a
              href={CONSULTORIA_UTM_URL}
              className="font-semibold text-foreground underline underline-offset-4"
              onClick={() => trackDigitalizacionCta("final", "consultoria")}
            >
              Conoce la consultoría de Viento Norte
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
