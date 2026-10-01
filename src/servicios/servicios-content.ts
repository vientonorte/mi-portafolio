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
  /**
   * Captura X|CMS del estándar Figma de Rö
   * (DeviceMockup, barra "x-cms · operaciones").
   */
  xcms: {
    webp: "images/consultoria/x-cms-dashboard.webp",
    png: "images/consultoria/x-cms-dashboard.png",
    alt: "X|CMS — dashboard de operaciones en el CMS del cliente",
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
  audience: "Elige el paso y sigue el recorrido.",
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
    thumbnail: {
      kind: "device",
      addressBar: "ejemplo · tu web",
      image: {
        webp: "images/branding/hero-ejemplo.webp",
        png: "images/branding/hero-ejemplo.png",
        alt: "Ejemplo de un sitio para una pyme. Maqueta ilustrativa, sin cifras ni precios.",
        width: 1440,
        height: 900,
      },
    },
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
    thumbnail: {
      kind: "device",
      addressBar: "x-cms · flujo",
      image: {
        png: "images/poc-modules/pedidos.png",
        alt: "Flujo de punto de venta en X|CMS. Maqueta de Viento Norte.",
        width: 1440,
        height: 900,
      },
    },
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
    thumbnail: { kind: "device", addressBar: "x-cms · operaciones", image: SERVICIOS_IMAGES.xcms },
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

/** Freelance de Viento Norte. Sin capturas de otra marca y sin la ficha cruda de producto. */
export const BRAND_CASES: readonly BrandCase[] = [
  {
    id: "monitas",
    client: "Monitas.cl",
    kicker: "Freelance · Viento Norte",
    problem:
      "La tienda no tenía un camino claro: quien entraba no encontraba los productos ni llegaba a pagar sin perderse.",
    whatWeDid: "Tienda: quién eres, qué ofreces y cómo pagan. El mismo embudo.",
    images: [],
    ctaLabel: "Ver web para pymes",
    ctaAnchor: "web-pymes",
  },
  {
    id: "edu21",
    client: "Edu21",
    kicker: "Freelance · Viento Norte",
    problem: "El servicio se explicaba en piezas sueltas y el camino de la familia no se veía.",
    whatWeDid: "Heurística, storyboard del servicio y benchmark. El mismo embudo.",
    images: [],
    ctaLabel: "Ver la revisión gratis",
    ctaAnchor: "revision-gratis",
  },
];

export const SERVICIOS_CASES = {
  heading: "El recorrido",
  intro: "Todo el freelance es Viento Norte. El embudo es el mismo en cada trabajo.",
} as const;

/** Embudo de una página pyme. Una idea por etapa y un solo cierre. */
export const SERVICIOS_FUNNEL = [
  { title: "Llegan", detail: "Una frase. Qué haces." },
  { title: "Entienden", detail: "Qué ofreces, sin ruido." },
  { title: "Confían", detail: "Quién eres." },
  { title: "Escriben", detail: "Un solo paso para contactarte." },
] as const;

export const SERVICIOS_STEPS = {
  heading: "Cómo trabajamos",
  intro: "Tres pasos, sin enredos.",
  steps: [
    {
      title: "Kickoff de 30 minutos",
      description: "Vemos el flujo.",
    },
    {
      title: "Propuesta con alcance y precio",
      description: "Alcance, plazo y precio.",
    },
    {
      title: "Entrega e iteración",
      description: "Entrega y ajuste.",
    },
  ],
} as const;

export const SERVICIOS_SEO = {
  title: "Servicios para pymes · Viento Norte",
  description:
    "Web profesional para tu Pyme en 72 horas por $30.000, revisión gratis de accesibilidad de un flujo y consultoría UX. Viento Norte, Chile.",
  canonical: "https://vientonorte.io/servicios/",
} as const;

/** Anclas canónicas de /servicios/. Ningún caso enlaza fuera de estas tres. */
export type ServiciosAnchor = "web-pymes" | "revision-gratis" | "consultoria-ux";
export const SERVICIOS_ANCHORS: readonly ServiciosAnchor[] = ["web-pymes", "revision-gratis", "consultoria-ux"];

export interface VnCase {
  id: string;
  name: string;
  /** true = el cliente no se nombra; la tarjeta lleva el rótulo «anonimizado». */
  anonymized?: boolean;
  /** Dos etiquetas por tarjeta: rubro y servicio. */
  tags: { rubro: string; servicio: string };
  summary: string;
  /** Hallazgos o entregables ya documentados en el repo. Sin cifras de resultado. */
  findings: readonly string[];
  /** Diagnóstico inicial. Se rotula «Punto de partida»; nunca es un resultado. */
  startingPoint?: string;
  /** Una imagen real del repo (public/). */
  image: MarketingImage;
}

export interface VnCaseGroup {
  anchor: ServiciosAnchor;
  label: string;
  linkLabel: string;
  cases: readonly VnCase[];
}

export const SERVICIOS_VN_CASES = {
  heading: "Casos de Viento Norte",
  intro: "Agrupados por servicio. Mostramos el diagnóstico y lo que hicimos, sin cifras de resultado.",
} as const;

/**
 * Casos de VN agrupados por ancla. Fuentes (todas en el repo):
 * - Monitas.cl: problema de BRAND_CASES; entregables de src/data/metodo-ro-cases.ts; imagen cases/monitas.
 * - Coworking: hallazgos de src/data/value-content-arsenal.ts (method-*); imagen recortada de
 *   method/coworking/a11y-contrast.png sin la marca del sitio (a11y-contrast-anon).
 * - vientonorte.io: razones de src/styles/globals.css (antes) y src/styles/vn-tokens.css (variantes 700),
 *   las mismas que fija src/__tests__/a11y/gradient-contrast.test.ts (#280).
 * - Edu 21: problema de BRAND_CASES; entregables de docs/staging/edu21-pack/PERMISO.md;
 *   punto de partida = cases/edu21/06-performance-seo.png (Test My Site, jun. 2022).
 * TodoClick.cl y Parcelas Terramar quedan fuera: sus hallazgos no están documentados en el repo.
 */
export const SERVICIOS_VN_CASE_GROUPS: readonly VnCaseGroup[] = [
  {
    anchor: "web-pymes",
    label: "Web para Pymes",
    linkLabel: "Ver el servicio: Web para Pymes",
    cases: [
      {
        id: "monitas",
        name: "Monitas.cl",
        tags: { rubro: "E-commerce", servicio: "Web para Pymes" },
        summary:
          "La tienda no tenía un camino claro: quien entraba no encontraba los productos ni llegaba a pagar sin perderse.",
        findings: ["Mapa de navegación", "Wireframe de la tienda", "Flujo de pago", "Embudo de conversión"],
        image: {
          png: "images/cases/monitas/02-map-nav.jpg",
          alt: "Mapa de navegación de la tienda Monitas.cl, del público al embudo.",
          width: 1600,
          height: 903,
        },
      },
    ],
  },
  {
    anchor: "revision-gratis",
    label: "Revisión gratis",
    linkLabel: "Ver el servicio: Revisión gratis",
    cases: [
      {
        id: "coworking",
        name: "Coworking",
        anonymized: true,
        tags: { rubro: "Coworking", servicio: "Revisión gratis" },
        summary: "Benchmark del sitio móvil de un coworking. El nombre del cliente no se publica.",
        findings: [
          "Embudo con pasos suficientes, pero mal aplicados al prospecto.",
          "Fallas de contraste que bloquean la lectura y la confianza.",
          "Experiencia no preparada para audiencias no locales.",
          "Servicios escondidos y poca información para el prospecto.",
        ],
        image: {
          png: "images/method/coworking/a11y-contrast-anon.png",
          webp: "images/method/coworking/a11y-contrast-anon.webp",
          alt: "Mensaje de chat en texto blanco sobre rojo: ejemplo de falla de contraste del benchmark anonimizado.",
          width: 760,
          height: 380,
        },
      },
      {
        id: "vientonorte-wcag",
        name: "vientonorte.io",
        tags: { rubro: "Servicios digitales", servicio: "Revisión gratis" },
        summary:
          "Auditoría WCAG 2.2 AA de nuestro propio sitio: el texto blanco sobre el degradado de marca no llegaba al contraste mínimo.",
        findings: [
          "Antes: blanco sobre rojo 4,05:1 y sobre azul evo 3,50:1. No pasa AA en texto normal (mínimo 4,5:1).",
          "Corrección: variantes 700 de los tokens, rojo 5,56:1 y azul evo 5,76:1 en todo el degradado.",
        ],
        image: {
          png: "images/branding/og-home-1200.png",
          alt: "Tarjeta de vientonorte.io con el isologo de Viento Norte.",
          width: 1200,
          height: 630,
        },
      },
    ],
  },
  {
    anchor: "consultoria-ux",
    label: "Consultoría UX",
    linkLabel: "Ver el servicio: Consultoría UX",
    cases: [
      {
        id: "edu21",
        name: "Edu 21",
        tags: { rubro: "Educación", servicio: "Consultoría UX" },
        summary: "El servicio se explicaba en piezas sueltas y el camino de la familia no se veía.",
        findings: [
          "Heurística del sitio web",
          "Benchmark de la competencia",
          "Estrategia de servicios y productos",
          "Pitch comercial y storyboard del servicio",
        ],
        startingPoint: "Informe de rendimiento móvil de edu21.cl (Test My Site, junio de 2022).",
        image: {
          png: "images/cases/edu21/01-heuristic-web.png",
          alt: "Portada de la heurística del sitio web de Edu 21.",
          width: 1200,
          height: 675,
        },
      },
    ],
  },
];

export interface RoExperienceItem {
  company: string;
  role: string;
  /** Solo cifras ya publicadas en el portafolio del repo. Vacío = solo el rol. */
  published: readonly string[];
}

/**
 * Franja «Experiencia de Rö»: empleos de Rö, nunca clientes de VN. Sin logos.
 * - Transvip: src/data/projects-data.ts:771 (App Pasajeros) y experience-data.ts:226 (rol).
 * - SURA Investments: src/data/projects-data.ts:170 y :173; rol en experience-data.ts:147.
 * - Karri: experience-data.ts:268. Pareti: experience-data.ts:453. Solo el rol.
 */
export const SERVICIOS_RO_EXPERIENCE = {
  heading: SERVICIOS_EXPERIENCE.heading,
  note: "Trabajo de Rö como parte de otros equipos. No son clientes de Viento Norte.",
  items: [
    {
      company: "Transvip",
      role: "Senior Product Designer",
      published: ["−40% en el tiempo de reserva", "+25% de conversión", "NPS 82"],
    },
    {
      company: "SURA Investments",
      role: "UX Lead · Associate, Estrategia Digital",
      published: [
        "Framework UX Enterprise implementado en 5+ países",
        "Onboarding: -40% tiempo (7-11 min vs 15+ min)",
      ],
    },
    { company: "Karri", role: "Lead UX — Vertical Shoppers", published: [] },
    { company: "Pareti", role: "Community Manager", published: [] },
  ] satisfies RoExperienceItem[],
} as const;
