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
  /**
   * Recorte limpio del POS de X|CMS (pedidos.png 180,480-1440,900): sin la fila «Ventas Hoy» ni cifras de demo
   * que parezcan métricas. Hero y tarjetas de /servicios/ (la home sigue con `xcms`).
   */
  xcmsClean: {
    webp: "images/products/x-cms/pos-productos.webp",
    png: "images/products/x-cms/pos-productos.png",
    alt: "X|CMS — punto de venta con productos por categoría y carrito",
    width: 1260,
    height: 709,
  },
  /** Recorte limpio del CFO Dashboard (riesgo.png 180,180-1440,620), sin la línea de complejidad. */
  ratioClean: {
    webp: "images/products/ratio/cfo-dashboard.webp",
    png: "images/products/ratio/cfo-dashboard.png",
    alt: "X|CMS — CFO Dashboard con vistas por rol",
    width: 1260,
    height: 709,
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
      image: { ...SERVICIOS_IMAGES.xcmsClean, alt: "Flujo de punto de venta en X|CMS. Maqueta de Viento Norte." },
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
    // Sin precio: pendiente (decisión Rö vía PO, 1-oct 10:32). Mismo nivel visual que la web 72 h.
    priceNote: "Partimos con un kickoff de 30 min.",
    cta: "Conversar mi caso",
    intent: "Consultoría UX",
    thumbnail: { kind: "device", addressBar: "x-cms · operaciones", image: SERVICIOS_IMAGES.ratioClean },
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

/**
 * Freelance de Viento Norte. Sin capturas de otra marca y sin la ficha cruda de producto.
 * Solo la home (#home-casos) usa BRAND_CASES, SERVICIOS_CASES y SERVICIOS_FUNNEL: /servicios/ ya no
 * muestra «El recorrido» (TL tras QA de Rö, 2-oct).
 */
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
/**
 * Anclas con casos en la grilla. Caso 6 (vientonorte.io · contraste WCAG, TL 1-oct 10:36) siempre visible:
 * el flag SERVICIOS_SHOW_VN_WCAG_CASE se eliminó en el fix-forward de branding 02/03 (PO, 2-oct).
 */
export const SERVICIOS_CASE_ANCHORS: readonly ServiciosAnchor[] = ["web-pymes", "revision-gratis", "consultoria-ux"];

export interface VnCase {
  id: string;
  name: string;
  /** Dos etiquetas por tarjeta: rubro y servicio. */
  tags: { rubro: string; servicio: string };
  summary: string;
  /** Hallazgos o entregables ya documentados en el repo. Sin cifras de resultado. */
  findings: readonly string[];
  /** Diagnóstico inicial. Se rotula «Punto de partida»; nunca es un resultado. */
  startingPoint?: string;
  /**
   * Una imagen real del repo (public/), WebP dentro del mockup DS.
   * Ausente = gap Figma Design (X|CMS / GEES): no se usa asset repo; marco vacío + nota.
   */
  image?: MarketingImage;
  /** Barra del marco de navegador (mismo tratamiento que la tarjeta 01). */
  addressBar?: string;
  /** Destino del click de la tarjeta. Por defecto = ancla del grupo. Edu21 → #revision-gratis. */
  ctaAnchor?: ServiciosAnchor;
  /**
   * Origen visible cuando NO es encargo de un cliente VN.
   * En Conceptos, Claro/Transvip llevan su origin en ConceptCase.
   */
  origin?: { label: string; note: string };
  /**
   * Marca de inventario (código/DOM). Los 5 sin OK Figma: asset repo · pendiente OK Figma
   * (comentario + data-asset-origen; el literal «pendiente» no va al HTML renderizado).
   */
  assetOrigen?: "repo" | "figma" | "gap-figma";
  /** Variante del DeviceMockup. Default browser. */
  mockupVariant?: "browser" | "phone";
  /** Gap Figma Design sin export (X|CMS, GEES). */
  figmaGap?: { note: string };
}

export interface VnCaseGroup {
  anchor: ServiciosAnchor;
  label: string;
  linkLabel: string;
  cases: readonly VnCase[];
}

export const SERVICIOS_VN_CASES = {
  heading: "Casos de Viento Norte",
  intro:
    "Agrupados por servicio. Mostramos el diagnóstico y lo que hicimos, sin cifras de resultado. Si un trabajo es un concepto propio o un proyecto in-house, la tarjeta lo dice.",
} as const;

/**
 * Casos de VN agrupados por ancla. Fuentes (todas en el repo salvo gaps Figma):
 * - TodoClick / Terramar / WCAG / Ratio / Edu21: WebP del repo dentro del mockup DS.
 *   // asset repo · pendiente OK Figma (Rö vie 15:15)
 * - X|CMS y GEES (consultoría estratégica): export Figma Design **NO DATO** hoy — sin asset repo
 *   en la tarjeta (gap marcado). Makes/Sites no cuentan como export Design.
 * - Edu 21: contenido en #consultoria-ux; CTA de la tarjeta → #revision-gratis (prod path).
 * - Claro + Transvip: sección #conceptos (no bajo #consultoria-ux).
 * - MASCOTAPP: solo /qa/ (Conceptos, sin image).
 * Monitas no va en /servicios/ (Rö, 1-oct). 15 nodos Prueba de Conceptos = duda (mapa 5-oct).
 */
export const SERVICIOS_VN_CASE_GROUPS: readonly VnCaseGroup[] = [
  {
    anchor: "web-pymes",
    label: "Web para Pymes",
    linkLabel: "Ver el servicio: Web para Pymes",
    cases: [
      {
        id: "todoclick",
        name: "TodoClick.cl",
        tags: { rubro: "E-commerce", servicio: "Web para Pymes" },
        // asset repo · pendiente OK Figma
        // Fuente: benchmark PDF mc-todoclick-benchmark.pdf → inv/pdf/txt/mc-todoclick-benchmark.txt L9, L186, L194-195.
        summary:
          "Benchmark de su tienda y su Instagram: faltaba un h1 y el camino a la compra se podía acortar.",
        findings: [
          "El copy no rotula bien el contenido: la página no tiene h1.",
          "El embudo de compra no cumple los pasos de una buena experiencia.",
          "Se pueden acortar los pasos coordinando las publicaciones con los productos destacados de la tienda.",
          "Faltan datos útiles para comprar, como la política de despacho, en las historias destacadas.",
        ],
        addressBar: "todoclick.cl · benchmark",
        assetOrigen: "repo",
        image: {
          png: "images/cases/todoclick/benchmark-heuristica.png",
          webp: "images/cases/todoclick/benchmark-heuristica.webp",
          alt: "Página del benchmark de TodoClick.cl: evaluación heurística de los llamados a la acción.",
          width: 1200,
          height: 675,
        },
      },
      {
        id: "terramar",
        name: "Parcelas Terramar",
        tags: { rubro: "Inmobiliaria", servicio: "Web para Pymes" },
        // asset repo · pendiente OK Figma
        // Fuente: benchmark PDF mc-terramar-benchmark.pdf → inv/pdf/txt/mc-terramar-benchmark.txt L9, L197.
        summary:
          "Diagnóstico de su sitio e Instagram: el contacto comercial funciona, pero el sitio necesita mapa de contenidos.",
        findings: [
          "Los llamados a la acción del Instagram no alcanzan.",
          "La rotulación y el uso de íconos se pueden mejorar.",
          "El sitio es responsivo, pero le faltan capas interactivas de contacto comercial.",
          "Fortaleza: el cliente queda a un clic del contacto comercial por chat.",
          "El embudo de conversión de la web puede mejorar.",
          "Hay información útil, pero no está en el feed: si no se busca, no se encuentra.",
          "Conviene reorganizar los contenidos según lo que necesita la audiencia.",
        ],
        addressBar: "terramar · benchmark",
        assetOrigen: "repo",
        image: {
          png: "images/cases/terramar/benchmark-heuristica.png",
          webp: "images/cases/terramar/benchmark-heuristica.webp",
          alt: "Página del benchmark de Parcelas Terramar: evaluación heurística de los llamados a la acción.",
          width: 1200,
          height: 675,
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
        id: "vientonorte-wcag",
        name: "vientonorte.io · contraste WCAG",
        tags: { rubro: "Consultora / sitio propio", servicio: "Revisión gratis" },
        // asset repo · pendiente OK Figma
        // Fuente: PR #280; src/styles/globals.css / vn-tokens.css.
        summary: "Revisamos nuestro propio sitio con WCAG 2.2 AA y corregimos el contraste de los degradados.",
        findings: [
          "Antes: texto blanco sobre el azul evo, 3,50:1. No pasa AA en texto normal (mínimo 4,5:1).",
          "Corrección: variante 700 del token, 5,76:1, en todo el degradado de marca.",
        ],
        addressBar: "vientonorte.io · contraste",
        assetOrigen: "repo",
        image: {
          png: "images/cases/vientonorte/contraste-antes-despues.png",
          webp: "images/cases/vientonorte/contraste-antes-despues.webp",
          alt: "Antes y después: botón con texto blanco sobre el azul evo (3,50:1, no pasa AA) y sobre el azul evo 700 (5,76:1, pasa AA).",
          width: 1200,
          height: 675,
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
        id: "x-cms",
        name: "X|CMS · Da Pleisë",
        tags: { rubro: "Café / retail", servicio: "Consultoría UX" },
        // Gap Figma Design NO DATO (Make/Sites ≠ export Design). NO usar asset repo (TL/PO 5-oct).
        summary:
          "Back-office para un café: punto de venta, productos y clientes en un solo panel, publicado como prototipo navegable.",
        findings: [
          "Punto de venta con catálogo por categoría y carrito",
          "Gestión de productos, clientes y fidelización",
          "Prototipo navegable publicado en Figma Sites",
        ],
        addressBar: "x-cms · punto de venta",
        assetOrigen: "gap-figma",
        figmaGap: {
          note: "Gap Figma Design · NO DATO · Make X|CMS (sin export hoy)",
        },
      },
      {
        id: "ratio-irarrazaval",
        name: "CFO Dashboard · Ratio Irarrázaval",
        tags: { rubro: "Café / finanzas pyme", servicio: "Consultoría UX" },
        // asset repo · pendiente OK Figma
        // Fuente: README vientonorte/dashfin; crop limpio en products/ratio.
        summary:
          "Dashboard financiero para un local de café con tres líneas de negocio, con vistas distintas para CFO, socio y equipo.",
        findings: [
          "Vistas por rol: CFO, socio-gerente y colaborador",
          "Arquitectura de pestañas consolidada",
          "Publicado como dashboard en vivo",
        ],
        addressBar: "ratio · cfo dashboard",
        assetOrigen: "repo",
        image: {
          png: "images/products/ratio/cfo-dashboard.png",
          webp: "images/products/ratio/cfo-dashboard.webp",
          alt: "CFO Dashboard del local de Irarrázaval: encabezado y selector de vista por rol.",
          width: 1260,
          height: 709,
        },
      },
      {
        id: "edu21",
        name: "Edu 21",
        tags: { rubro: "Edtech", servicio: "Consultoría UX" },
        // asset repo · pendiente OK Figma
        // Contenido en Consultoría UX; CTA de tarjeta → #revision-gratis (prod /servicios/?utm…#revision-gratis).
        summary: "Revisión heurística de su sitio web antes de trabajar el servicio: el diagnóstico base del que partimos.",
        findings: [
          "Heurística del sitio web",
          "Benchmark de la competencia",
          "Informe de rendimiento del sitio en celulares",
        ],
        startingPoint: "Diagnóstico base (junio de 2022): carga de 15,4 s y calificación «deficiente».",
        addressBar: "edu21.cl · diagnóstico",
        ctaAnchor: "revision-gratis",
        assetOrigen: "repo",
        image: {
          png: "images/cases/edu21/06-performance-seo-diagnostico.png",
          webp: "images/cases/edu21/06-performance-seo-diagnostico.webp",
          alt: "Portada del informe de rendimiento en celulares de edu21.cl (junio de 2022), punto de partida del diagnóstico.",
          width: 927,
          height: 579,
        },
      },
      {
        id: "consultoria-estrategica",
        name: "Dashboard de consultoría estratégica",
        tags: { rubro: "Consultoría", servicio: "Consultoría UX" },
        // Gap Figma Design NO DATO (dashboard consultoría anon.). NO usar asset products/consultoria-estrategica del repo (TL/PO 5-oct).
        summary:
          "Propuesta ejecutiva interactiva para una consultora: el plan de transformación digital ordenado en módulos navegables.",
        findings: [
          "Contexto estratégico y oportunidad de negocio",
          "Propuesta de plataforma y hoja de ruta",
          "Módulos navegables en vez de un documento largo",
        ],
        addressBar: "consultoría · módulos",
        assetOrigen: "gap-figma",
        figmaGap: {
          note: "Gap Figma Design · NO DATO · Make Executive Dashboard (por confirmar Rö)",
        },
      },
    ],
  },
];

/** Pieza de «Conceptos»: exploración propia o in-house, sin cliente VN en la grilla de casos. */
export interface ConceptCase {
  id: string;
  name: string;
  tags: { rubro: string; servicio: string };
  summary: string;
  findings: string[];
  addressBar: string;
  /** Captura 16:10. Ausente = solo /qa/ con placeholder (MASCOTAPP). */
  image?: MarketingImage;
  origin?: { label: string; note: string };
  /** Origen en Figma del asset que falta. Solo placeholder en build QA (/qa/). */
  pendingAsset?: { fileKey: string; fileName: string; nodeId: string; ratio: "16:10" };
  mockupVariant?: "browser" | "phone";
}

export const SERVICIOS_CONCEPTOS = {
  heading: "Conceptos",
  intro: "Ejercicios de diseño propios o in-house, sin encargo de un cliente de Viento Norte. Son exploración, no casos.",
} as const;

/**
 * «Conceptos» (TL/PO 5-oct): Claro + Transvip con export Figma ya en repo.
 * MASCOTAPP: sin image → solo /qa/ (15 nodos Prueba de Conceptos = duda; frame 2844:427 pendiente).
 * Monitas NO. Walmart/Maraña/Penji fuera.
 */
export const SERVICIOS_CONCEPTOS_CASES: readonly ConceptCase[] = [
  {
    id: "claro",
    name: "Portal comercial · Claro",
    tags: { rubro: "Telecomunicaciones", servicio: "Concepto" },
    // Figma Portal Comercial Claro D39xjsA7ObbhntcDEyPWQG · 7:473, recorte 16:10.
    summary:
      "Rediseño de la home del portal comercial: accesos directos a las tareas más pedidas y un ingreso de clientes más visible.",
    findings: [
      "Accesos directos a pagar, revisar saldo, contratar y recargar",
      "Ingreso de clientes y entrada para empresas sobre el primer pliegue",
      "Bloque «¿En qué podemos apoyarte hoy?» con las tareas frecuentes",
    ],
    origin: {
      label: "Concepto propio",
      note: "Concepto propio, no encargado por la marca",
    },
    addressBar: "claro · portal comercial",
    image: {
      png: "images/cases/claro/portal-comercial-concepto.png",
      webp: "images/cases/claro/portal-comercial-concepto.webp",
      alt: "Concepto de home del portal comercial de Claro: menú principal, banner, ingreso de clientes y accesos a pagar la factura, ver saldos, contratar un servicio y recargar.",
      width: 1440,
      height: 900,
    },
  },
  {
    id: "transvip",
    name: "Sistema de diseño · App Cliente Transvip",
    tags: { rubro: "Movilidad / transporte", servicio: "Concepto" },
    // Figma AEMOE8Hv5iv1nfyR7jlMgO · 323:48165. In-house, no cliente VN.
    summary:
      "Sistema de diseño para la app de clientes, hecho dentro del equipo de producto: principios, componentes y pruebas de concepto.",
    findings: [
      "Propósito definido: acortar los tiempos de diseño del producto",
      "Librería de componentes (átomos a templates) con base en Material UI",
      "Pruebas de concepto de tarjetas y pestañas para la app móvil",
    ],
    origin: {
      label: "Proyecto in-house",
      note: "Proyecto in-house del equipo de producto de Transvip. No es un cliente de Viento Norte.",
    },
    addressBar: "transvip · system design",
    image: {
      png: "images/cases/transvip/system-design-proposito.png",
      webp: "images/cases/transvip/system-design-proposito.webp",
      alt: "Lámina «Propósito» del sistema de diseño de la app Transvip: objetivos, por qué, beneficios y usuarios (el equipo interno de Tecnología y Producto).",
      width: 1200,
      height: 750,
    },
  },
  {
    id: "mascotapp",
    name: "MASCOTAPP",
    tags: { rubro: "App móvil · mascotas", servicio: "Concepto" },
    summary: "Concepto de app móvil para el cuidado de mascotas, trabajado desde los flujos de usuario.",
    findings: ["Flujos de usuario por tarea", "Pantallas móviles", "Kit de interfaz e íconos"],
    addressBar: "mascotapp · concepto",
    // phone cuando exista export; hoy placeholder va en marco browser (screenContent).
    pendingAsset: {
      fileKey: "CBguM4Y5rIvc9TV5pGhOxL",
      fileName: "Prueba de Conceptos",
      nodeId: "2844:427",
      ratio: "16:10",
    },
  },
];

