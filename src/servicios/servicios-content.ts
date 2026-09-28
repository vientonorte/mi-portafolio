/**
 * /servicios/ — contenido decidido por PO (es-CL).
 * Orden fijo (PO v3): web 72 h → revisión gratis → consultoría UX.
 * Los ids/anclas (#web-pymes, #revision-gratis, #consultoria-ux) no cambian;
 * la preselección del formulario va por card.intent, no por posición.
 * Sin servicios IA, sin enlaces a /s/ ni a rutas hash.
 */
import type { MarketingImage, ServiceCardData } from "../components/marketing";

export const SERVICIOS_SOURCE = "servicios";
export const CONTACT_ENDPOINT = "https://contact.vientonorte.io/api/contact";
export const CONTACT_EMAIL = "contacto@vientonorte.io";

/**
 * CTA primario con gradiente de marca (--brand-gradient, variantes 700 AA:
 * blanco ≥ 5.56:1 en todo el degradado). Sin hover:opacity (bajaría el contraste).
 */
export const PRIMARY_CTA_CLASS =
  "min-h-[48px] bg-brand-gradient px-6 text-[1.1875rem] font-bold text-white shadow-sm transition-shadow hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary";

/**
 * Valores del select "¿Qué necesitas?" → payload.intent (≤80, texto libre en
 * worker/src/contact.js). Orden PO: web → revisión → consultoría → otro.
 * Va precedido por la opción vacía SERVICIOS_INTENT_PLACEHOLDER (obligatorio elegir).
 */
export const SERVICIOS_INTENTS = [
  "Web nueva",
  "Revisión gratis de un flujo",
  "Consultoría UX",
  "Otro servicio digital",
] as const;

export type ServiciosIntent = (typeof SERVICIOS_INTENTS)[number];
/** Estado del select: "" = aún no elige (opción placeholder). */
export type ServiciosIntentValue = ServiciosIntent | "";

export const SERVICIOS_INTENT_PLACEHOLDER = "Elige qué necesitas";

/** Capturas reales de trabajo VN (X|CMS). Rutas relativas a public/. */
export const SERVICIOS_IMAGES = {
  /**
   * Hero de home y /servicios/: sitio ficticio marcado «Ejemplo».
   * Sin cifras ni precios dentro del dispositivo.
   */
  heroEjemplo: {
    webp: "images/branding/hero-ejemplo.webp",
    png: "images/branding/hero-ejemplo.png",
    alt: "Ejemplo de un sitio para una pyme. Maqueta ilustrativa, sin cifras ni precios.",
    width: 1440,
    height: 900,
  },
  /** Dashboard del prototipo (misma captura que poc-modules/dashboard.png; webp compartido). */
  consultoriaThumb: {
    webp: "images/consultoria/x-cms-dashboard.webp",
    png: "images/poc-modules/dashboard.png",
    alt: "Prototipo de dashboard X|CMS diseñado por Viento Norte para ordenar la operación de una pyme.",
    width: 1440,
    height: 900,
  },
} satisfies Record<string, MarketingImage>;

export interface ServicioCard extends ServiceCardData {
  intent: ServiciosIntent;
}

export const SERVICIOS_HERO = {
  badge: "Viento Norte · pymes",
  eyebrow: "Servicios",
  /** Alineado con la home: "Tecnología para empresas." */
  title: "Tecnología para empresas: elige cómo partimos.",
  audience:
    "Para dueños y equipos de pymes en Chile que quieren atender y vender mejor en digital, sin enredos.",
  /** Botón principal → #contacto (spec PO v2). */
  ctaPrimary: "Escríbenos",
  ctaSecondary: "Ver las opciones",
} as const;

export const SERVICIOS_CARDS: ServicioCard[] = [
  {
    id: "web-pymes",
    eyebrow: "Web en 72 horas",
    title: "Web para Pymes en 72 horas",
    audience: "¿No tienes sitio?",
    forWhom:
      "Para emprendedores y pymes que hoy venden solo por redes sociales y necesitan una página con su marca.",
    includes: [
      "Una página: quién eres, qué ofreces y cómo contactarte.",
      "Tu logo, colores y textos; no una plantilla genérica.",
      "Formulario de contacto y diseño adaptado al celular.",
      "1 ronda de cambios. Lista en 72 horas hábiles.",
    ],
    price: "$30.000 CLP",
    priceNote:
      "Pago 50/50: 50% al partir y 50% al entregar. El pago se coordina después del primer contacto. Dominio, hosting y tienda online se cotizan aparte.",
    cta: "Quiero mi web",
    intent: "Web nueva",
    thumbnail: { kind: "pending", label: "Mockup web pyme (pendiente)" },
  },
  {
    id: "revision-gratis",
    eyebrow: "Gratis",
    title: "Revisión gratis de un flujo",
    audience: "¿Tu sitio tiene problemas?",
    forWhom:
      "Para pymes que ya tienen web, tienda o formulario y quieren saber si cualquier persona puede usarlo.",
    includes: [
      "Revisión de accesibilidad WCAG 2.2 AA de un flujo crítico (contacto, reserva o pago).",
      "Lista priorizada de barreras y cómo corregirlas.",
      "Conversación de 30 min para revisar los hallazgos.",
    ],
    price: "Gratis",
    priceNote: "Sin compromiso. Un flujo por empresa.",
    cta: "Pedir revisión gratis",
    intent: "Revisión gratis de un flujo",
    thumbnail: { kind: "pending", label: "Antes / después de un flujo (pendiente)" },
  },
  {
    id: "consultoria-ux",
    eyebrow: "Consultoría",
    title: "Consultoría UX para Pymes",
    audience: "¿Buscas talento joven o un equipo UX?",
    forWhom:
      "Para pymes en Chile que necesitan ordenar un flujo o proceso digital sobre su CMS o CRM.",
    includes: [
      "Diagnóstico del flujo que usa tu cliente.",
      "Prototipo del módulo en tu operación.",
      "Proceso de equipo para sostener los cambios.",
      "Sin nube obligatoria: el dato queda en tu CMS o CRM.",
    ],
    price: "Cotización según alcance",
    priceNote: "Partimos con un kickoff de 30 min.",
    cta: "Conversar mi caso",
    intent: "Consultoría UX",
    thumbnail: { kind: "device", image: SERVICIOS_IMAGES.consultoriaThumb },
  },
];

/** Franja de texto. Nunca «clientes VN» ni logos de terceros. */
export const SERVICIOS_EXPERIENCE = {
  heading: "Experiencia de Rö",
  names: ["Transvip", "Karri", "SURA Investments", "Pareti"],
} as const;

export const SERVICIOS_FOUNDER = {
  heading: "Quién está detrás",
  name: "Rodrigo Gaete",
  role: "UX Manager, Viento Norte",
  lines: ["UX Lead en SURA Investments, 2023–2026", "Diplomado PUC"],
} as const;

export interface BrandCase {
  id: string;
  client: string;
  kicker: string;
  problem: string;
  whatWeDid: string;
  /** Cifra ya publicada en el repo. Ausente = el caso no muestra resultado. */
  result?: string;
  images: MarketingImage[];
  ctaLabel: string;
  /** Ancla de /servicios/. El llamador arma el href (path en la home, # en la misma página). */
  ctaAnchor: "web-pymes" | "revision-gratis" | "consultoria-ux";
}

const monitas = (file: string, alt: string, height: number): MarketingImage => ({
  png: `images/cases/monitas/${file}`,
  alt,
  width: 1600,
  height,
});

const coworking = (file: string, alt: string, width: number): MarketingImage => ({
  png: `images/method/coworking/${file}`,
  alt,
  width,
  height: 1400,
});

/**
 * Tres casos cerrados por el Decider (28-sep).
 * Transvip: métricas tal cual en projects-data.ts
 * («App Pasajeros: −40% tiempo de reserva, +25% conversión, NPS 82»).
 */
export const BRAND_CASES: readonly BrandCase[] = [
  {
    id: "monitas",
    client: "Monitas.cl",
    kicker: "Asesoría Método Ro · e-commerce",
    problem:
      "La tienda no tenía un camino claro: quien entraba no encontraba los productos ni llegaba a pagar sin perderse.",
    whatWeDid: "Armamos el wireframe, la navegación, el flujo de pago y el embudo.",
    images: [
      monitas("01-wireframe.jpg", "Wireframe de la tienda Monitas.", 903),
      monitas("02-map-nav.jpg", "Mapa de navegación de Monitas.", 903),
      monitas("03-flujo-pago.jpg", "Flujo de pago de Monitas.", 798),
      monitas("04-embudo.jpg", "Embudo de la tienda Monitas.", 1325),
    ],
    ctaLabel: "Ver web para pymes",
    ctaAnchor: "web-pymes",
  },
  {
    id: "coworking",
    client: "Coworking",
    kicker: "Auditoría de contraste y accesibilidad",
    problem: "En el sitio de un coworking, el contraste y la lectura dificultaban usar un flujo. El nombre queda fuera.",
    whatWeDid: "Revisamos contraste y accesibilidad de ese flujo y dejamos los hallazgos priorizados.",
    images: [
      coworking("a11y-contrast.png", "Revisión de contraste en el sitio de un coworking. Caso anonimizado.", 806),
      coworking("a11y-readability.png", "Revisión de lectura en el sitio de un coworking. Caso anonimizado.", 794),
    ],
    ctaLabel: "Pedir revisión gratis",
    ctaAnchor: "revision-gratis",
  },
  {
    id: "transvip",
    client: "Transvip",
    kicker: "Experiencia de Rö · Senior Product Designer, 2022–2023",
    problem: "Quien reservaba un traslado premium encontraba fricción y poca claridad en la app.",
    whatWeDid: "Rediseño del flujo de reserva de la app de pasajeros.",
    result: "−40% tiempo de reserva, +25% conversión, NPS 82.",
    images: [],
    ctaLabel: "Conversar consultoría UX",
    ctaAnchor: "consultoria-ux",
  },
];

export const SERVICIOS_CASES = {
  heading: "Casos",
  intro: "Problema y qué se hizo. Si hay cifras, son las que ya estaban publicadas.",
} as const;

export const SERVICIOS_STEPS = {
  heading: "Cómo trabajamos",
  intro: "Tres pasos, sin enredos.",
  steps: [
    {
      title: "Kickoff de 30 minutos",
      description: "Conversamos sobre tu negocio, el flujo o la web que necesitas y qué quieres lograr.",
    },
    {
      title: "Propuesta con alcance y precio",
      description: "Te enviamos por escrito qué haremos, en qué plazo y cuánto cuesta antes de partir.",
    },
    {
      title: "Entrega e iteración",
      description: "Entregamos, lo revisamos contigo y ajustamos según lo acordado.",
    },
  ],
} as const;

export const SERVICIOS_SEO = {
  title: "Servicios para pymes · Viento Norte",
  description:
    "Web profesional para tu Pyme en 72 horas por $30.000, revisión gratis de accesibilidad de un flujo y consultoría UX. Viento Norte, Chile.",
  canonical: "https://vientonorte.io/servicios/",
} as const;
