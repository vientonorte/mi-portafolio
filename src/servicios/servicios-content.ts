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
 * Valores de la línea "¿Qué te gustaría conversar?" → payload.intent (≤80,
 * texto libre en worker/src/contact.js). Orden PO: web → revisión →
 * consultoría → otro. Ninguna marcada = aún no elige.
 */
export const SERVICIOS_INTENTS = [
  "Web nueva",
  "Revisión gratis de un flujo",
  "Consultoría UX",
  "Otro servicio digital",
] as const;

export type ServiciosIntent = (typeof SERVICIOS_INTENTS)[number];
/** "" = ninguna opción marcada en la línea. */
export type ServiciosIntentValue = ServiciosIntent | "";

/** Capturas reales de trabajo VN (X|CMS). Rutas relativas a public/. */
export const SERVICIOS_IMAGES = {
  /**
   * Hero de /servicios/ (Decider 9-oct): sitio ficticio marcado «Ejemplo».
   * Sin cifras ni precios. La home sigue con `xcms`.
   */
  ejemplo: {
    webp: "images/branding/hero-ejemplo.webp",
    png: "images/branding/hero-ejemplo.png",
    alt: "Ejemplo de un sitio para una pyme. Maqueta ilustrativa, sin cifras ni precios.",
    width: 1440,
    height: 900,
  },
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
   * que parezcan métricas. Tarjeta de revisión gratis. El hero de /servicios/ es `ejemplo`.
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
      image: SERVICIOS_IMAGES.ejemplo,
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
/** Anclas con casos en la grilla. #revision-gratis no tiene caso (PO, 1-oct 10:31). */
/**
 * Caso 6 (vientonorte.io · contraste WCAG, #revision-gratis). Aprobado por el TL (1-oct 10:36).
 * Para sacarlo basta con poner false: desaparecen el grupo y su ancla de la grilla.
 */
export const SERVICIOS_SHOW_VN_WCAG_CASE = true;

export const SERVICIOS_CASE_ANCHORS: readonly ServiciosAnchor[] = SERVICIOS_SHOW_VN_WCAG_CASE
  ? ["web-pymes", "revision-gratis", "consultoria-ux"]
  : ["web-pymes", "consultoria-ux"];

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
  /** Una imagen real del repo (public/). */
  image: MarketingImage;
  /** Barra del mockup. Mismo marco que Conceptos. */
  addressBar: string;
  mockupFit?: "cover" | "contain";
}

export interface VnCaseGroup {
  anchor: ServiciosAnchor;
  label: string;
  linkLabel: string;
  cases: readonly VnCase[];
}

/** Casos y conceptos son las experiencias de Viento Norte: un discurso, un layout, una tarjeta. */
export const SERVICIOS_EXPERIENCIAS = {
  heading: "Experiencias",
  intro: "Experiencia y método en práctica.",
} as const;

export const SERVICIOS_VN_CASES = {
  heading: SERVICIOS_EXPERIENCIAS.heading,
  intro: SERVICIOS_EXPERIENCIAS.intro,
} as const;

/**
 * Casos de VN agrupados por ancla. Fuentes (todas en el repo):
 * - Edu 21: problema de BRAND_CASES; entregables de docs/staging/edu21-pack/PERMISO.md;
 *   punto de partida = informe SEO WordPress jun. 2022 (inv/pdf/txt/edu21-seo.txt L59, L84).
 * - TodoClick.cl y Parcelas Terramar: con nombre (permiso en docs/staging/casos-mc-pack/PERMISO.md). Hallazgos de sus
 *   benchmark PDF (Benchmark Maraña, 2021), texto extraído en el box de ops: inv/pdf/txt/mc-*-benchmark.txt
 *   (las líneas van en cada hallazgo). Imagen: página 3 de cada PDF (escala heurística), sin logo de la marca;
 *   las capturas de iCloud traen logos de terceros o el logo grande de la marca.
 * - X|CMS y CFO Dashboard «Ratio Irarrázaval»: productos propios de Da Pleisë (marca de Rö). Recortes de
 *   poc-modules/pedidos.png (180,480)-(1440,900) y riesgo.png (180,180)-(1440,620), sin cifras demo.
 * - Dashboard de consultoría estratégica: concepto propio de Rö, anonimizado (Rö, 1-oct 10:37): sin marca del
 *   cliente, sin nombres ni montos. Recorte nuevo (0,540)-(1440,900) de la grilla de módulos.
 * - vientonorte.io: PR #280 (globals.css, vn-tokens.css). Detrás de SERVICIOS_SHOW_VN_WCAG_CASE.
 * Monitas no va en /servicios/ (Rö, 1-oct 10:33). La grilla recibe más tarjetas agregando casos o grupos.
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
        tags: { rubro: "E-commerce", servicio: "Diseño" },
        addressBar: "todoclick · heurística",
        mockupFit: "contain",
        // Fuente: benchmark PDF mc-todoclick-benchmark.pdf → inv/pdf/txt/mc-todoclick-benchmark.txt L9, L186, L194-195.
        summary:
          "Benchmark de su tienda y su Instagram: faltaba un h1 y el camino a la compra se podía acortar.",
        findings: [
          // L101 «2 Mejoraría la Ro…» (título del pantallazo: «Mejoraría la Rotulación en el Copy, no hay h1»).
          "El copy no rotula bien el contenido: la página no tiene h1.",
          // L140 «5 embudo de co…» (pantallazo: el embudo de conversión no cumple los pasos UX).
          "El embudo de compra no cumple los pasos de una buena experiencia.",
          // L129, L195, L214: coordinar los post con los productos destacados para acotar pasos.
          "Se pueden acortar los pasos coordinando las publicaciones con los productos destacados de la tienda.",
          // L187, L215-216: historias destacadas con información útil (p. ej. política de despachos).
          "Faltan datos útiles para comprar, como la política de despacho, en las historias destacadas.",
        ],
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
        tags: { rubro: "Inmobiliaria", servicio: "Diseño" },
        addressBar: "terramar · heurística",
        mockupFit: "contain",
        // Fuente: benchmark PDF mc-terramar-benchmark.pdf → inv/pdf/txt/mc-terramar-benchmark.txt L9, L197.
        summary:
          "Diagnóstico de su sitio e Instagram: el contacto comercial funciona, pero el sitio necesita mapa de contenidos.",
        findings: [
          // L90 «1 CTAS insu'cie…», L188.
          "Los llamados a la acción del Instagram no alcanzan.",
          // L101 «2 Rotulación pue…», L188.
          "La rotulación y el uso de íconos se pueden mejorar.",
          // L116 «3 sitio responsiv…», L218.
          "El sitio es responsivo, pero le faltan capas interactivas de contacto comercial.",
          // L131 «4 a un click de di…», L189 (fortaleza; el PDF nombra la app de chat, que esta página no menciona: servicios-page.test.tsx).
          "Fortaleza: el cliente queda a un clic del contacto comercial por chat.",
          // L142 «5 embudo puede…», L188-189, L199 «Mejoraría el embudo de conversión de la web».
          "El embudo de conversión de la web puede mejorar.",
          // L197-198.
          "Hay información útil, pero no está en el feed: si no se busca, no se encuentra.",
          // L168 «7 mapa de conte…», L190, L216-217.
          "Conviene reorganizar los contenidos según lo que necesita la audiencia.",
        ],
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
  ...(SERVICIOS_SHOW_VN_WCAG_CASE
    ? [
        {
          anchor: "revision-gratis",
          label: "Revisión gratis",
          linkLabel: "Ver el servicio: Revisión gratis",
          cases: [
            {
              id: "vientonorte-wcag",
              name: "vientonorte.io · contraste WCAG",
              tags: { rubro: "Consultora / sitio propio", servicio: "Desarrollo" },
              addressBar: "vientonorte · contraste",
              mockupFit: "contain",
              // Fuente: PR #280; src/styles/globals.css:29-30 (antes) y src/styles/vn-tokens.css:34,36 (después).
              summary: "Revisamos nuestro propio sitio con WCAG 2.2 AA y corregimos el contraste de los degradados.",
              findings: [
                "Antes: texto blanco sobre el azul evo, 3,50:1. No pasa AA en texto normal (mínimo 4,5:1).",
                "Corrección: variante 700 del token, 5,76:1, en todo el degradado de marca.",
              ],
              image: {
                png: "images/cases/vientonorte/contraste-antes-despues.png",
                webp: "images/cases/vientonorte/contraste-antes-despues.webp",
                alt: "Antes y después: botón con texto blanco sobre el azul evo (3,50:1, no pasa AA) y sobre el azul evo 700 (5,76:1, pasa AA).",
                width: 1200,
                height: 675,
              },
            },
          ],
        } satisfies VnCaseGroup,
      ]
    : []),
  {
    anchor: "consultoria-ux",
    label: "Consultoría UX",
    linkLabel: "Ver el servicio: Consultoría UX",
    cases: [
      {
        id: "x-cms",
        name: "X|CMS · Da Pleisë",
        tags: { rubro: "Café / retail", servicio: "Desarrollo" },
        addressBar: "x-cms · operaciones",
        mockupFit: "contain",
        // Fuente: src/data/consultoria-demos.ts:24-31 (Figma Sites publicado), public/images/poc-modules/README.md.
        summary:
          "Back-office para un café: punto de venta, productos y clientes en un solo panel, publicado como prototipo navegable.",
        findings: [
          "Punto de venta con catálogo por categoría y carrito",
          "Gestión de productos, clientes y fidelización",
          "Prototipo navegable publicado en Figma Sites",
        ],
        image: {
          png: "images/products/x-cms/pos-productos.png",
          webp: "images/products/x-cms/pos-productos.webp",
          alt: "Punto de venta de X|CMS: grilla de productos de café por categoría y carrito.",
          width: 1260,
          height: 709,
        },
      },
      {
        id: "ratio-irarrazaval",
        name: "CFO Dashboard · Ratio Irarrázaval",
        tags: { rubro: "Café / finanzas pyme", servicio: "Desarrollo" },
        addressBar: "ratio · dashboard",
        mockupFit: "contain",
        // Fuente: README de vientonorte/dashfin («Da Pleisë — CFO Dashboard»), live vientonorte.github.io/dashfin/.
        summary:
          "Dashboard financiero para un local de café con tres líneas de negocio, con vistas distintas para CFO, socio y equipo.",
        findings: [
          "Vistas por rol: CFO, socio-gerente y colaborador",
          "Arquitectura de pestañas consolidada",
          "Publicado como dashboard en vivo",
        ],
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
        tags: { rubro: "Edtech", servicio: "Diseño" },
        addressBar: "edu21 · estrategia",
        mockupFit: "contain",
        // Brief vn-productos-grilla-2026-10-01 §2; etapas en docs/staging/edu21-pack/PERMISO.md L26-28.
        summary: "Taller de diseño de servicios en tres etapas: heurística, estrategia y herramientas comerciales.",
        findings: [
          "Heurística del sitio web",
          "Benchmark de la competencia",
          "Estrategia de servicios y productos",
          "Pitch comercial y storyboard del servicio",
        ],
        // Diagnóstico base, no resultado: informe «SEO - WORDPRES» (edu21-seo.pdf, jun. 2022) → inv/pdf/txt/edu21-seo.txt
        // L59 «15.4 segundos» y L84 «CALIFICACIÓN : Deficiente» (box de ops).
        startingPoint: "Informe SEO del sitio (junio de 2022): carga de 15,4 s y SEO «Deficiente».",
        image: {
          png: "images/cases/edu21/03-service-strategy.png",
          alt: "Tablero de estrategia de servicios de Edu 21: audiencias, problemas, mensaje, canales y metas.",
          width: 1200,
          height: 672,
        },
      },
      {
        id: "consultoria-estrategica",
        name: "Dashboard de consultoría estratégica",
        tags: { rubro: "Consultoría", servicio: "Diseño" },
        addressBar: "consultoría · módulos",
        mockupFit: "contain",
        // Concepto propio de Rö, anonimizado (Rö, 1-oct 10:37). Sin marca del cliente, nombres ni montos.
        summary:
          "Propuesta ejecutiva interactiva para una consultora: el plan de transformación digital ordenado en módulos navegables.",
        findings: [
          "Contexto estratégico y oportunidad de negocio",
          "Propuesta de plataforma y hoja de ruta",
          "Módulos navegables en vez de un documento largo",
        ],
        image: {
          png: "images/products/consultoria-estrategica/modulos.png",
          webp: "images/products/consultoria-estrategica/modulos.webp",
          alt: "Grilla de módulos estratégicos de la propuesta: contexto, oportunidad, plataforma y hoja de ruta.",
          width: 1440,
          height: 810,
        },
      },
    ],
  },
];

/** Pieza de la misma grilla de experiencias. Sigue en #conceptos para no mezclar estas marcas con los casos de cliente. */
export interface ConceptCase {
  id: string;
  name: string;
  tags: { rubro: string; servicio: string };
  summary: string;
  findings: string[];
  addressBar: string;
  /** Portada (mockup). Ausente = solo cuando los placeholders de QA están activos (MASCOTAPP). */
  image?: MarketingImage;
  origin?: { label: string; note: string };
  /** browser = estándar de tarjeta (16:10). phone = una sola pantalla móvil. */
  mockupVariant?: "browser" | "phone";
  /** cover recorta a 16:10. contain muestra la pantalla entera. */
  mockupFit?: "cover" | "contain";
  /** Escala entera para un archivo de pocos píxeles. 2 = cada píxel de origen se pinta 2×2. */
  pixelScale?: number;
}

export const SERVICIOS_CONCEPTOS = SERVICIOS_EXPERIENCIAS;

/**
 * Claro, Walmart y Transvip: encargos de la marca, en el currículum.
 * MASCOTAPP no tiene imagen: vive solo en conceptCases() del build QA (ver abajo).
 * Monitas no entra.
 */
export const SERVICIOS_CONCEPTOS_CASES: readonly ConceptCase[] = [
  {
    id: "claro",
    name: "Claro",
    tags: { rubro: "Telecomunicaciones", servicio: "Diseño" },
    summary:
      "Encargo de Claro, vía Havas. Siguen en producción. Nav y tienda de equipos: header, filtros y la primera fila de productos.",
    findings: [
      "Rediseño de la navegación principal",
      "Rediseño de la tienda de equipos",
      "Esos diseños siguen en producción",
    ],
    addressBar: "claro · tienda equipos",
    image: {
      png: "images/cases/claro/tienda-equipos-screen.png",
      webp: "images/cases/claro/tienda-equipos-screen.webp",
      alt: "Tienda de equipos Claro: header, filtros y primera fila de celulares.",
      width: 1692,
      height: 1058,
    },
  },
  {
    id: "walmart",
    name: "Walmart",
    tags: { rubro: "Retail", servicio: "News" },
    summary:
      "Encargo de la marca, en el equipo de conversión y diseño. Mayo — junio 2022. La pieza es un correo con la cabecera Lider.",
    findings: ["Diseño y contenido para canales digitales", "Marca Lider en la cabecera"],
    addressBar: "walmart · catálogo",
    mockupFit: "contain",
    pixelScale: 2,
    image: {
      png: "images/cases/walmart/catalogo-screen.png",
      webp: "images/cases/walmart/catalogo-screen.webp",
      alt: "Correo de Walmart Chile con la cabecera Lider, en los píxeles del archivo de origen.",
      width: 125,
      height: 117,
    },
  },
  {
    id: "transvip",
    name: "Sistema de diseño · App Cliente Transvip",
    tags: { rubro: "Movilidad / transporte", servicio: "Diseño" },
    summary:
      "Encargo del equipo de producto de Transvip. Julio 2022 — septiembre 2023. Sistema de diseño para la app de clientes: principios, componentes y pruebas de tarjetas.",
    findings: [
      "Propósito definido: acortar los tiempos de diseño del producto",
      "Librería de componentes (átomos a templates) con base en Material UI",
      "Pruebas de tarjetas y pestañas para la app móvil",
    ],
    addressBar: "transvip · system design",
    mockupFit: "contain",
    image: {
      png: "images/cases/transvip/system-design-proposito.png",
      webp: "images/cases/transvip/system-design-proposito.webp",
      alt: "Lámina Propósito del sistema de diseño de la app Transvip: objetivos, por qué, beneficios y usuarios del equipo interno.",
      width: 1200,
      height: 750,
    },
  },
];

/**
 * MASCOTAPP (PendingSlot, sin imagen) solo en el build QA (base /qa/). La comparación usa
 * import.meta.env.BASE_URL en línea: en el build de prod Vite la reemplaza por "/" y el
 * minificador elimina la rama, así el texto no llega al bundle público
 * (guarda: scripts/check-prod-no-mascotapp.sh). En vitest se evalúa en runtime (vi.stubEnv).
 */
export function conceptCases(): readonly ConceptCase[] {
  if (import.meta.env.BASE_URL === "/qa/") {
    return [
      ...SERVICIOS_CONCEPTOS_CASES,
      {
        id: "mascotapp",
        name: "MASCOTAPP",
        tags: { rubro: "App móvil · mascotas", servicio: "Diseño" },
        summary: "Concepto de app móvil para el cuidado de mascotas, trabajado desde los flujos de usuario.",
        findings: ["Flujos de usuario por tarea", "Pantallas móviles", "Kit de interfaz e íconos"],
        addressBar: "mascotapp · concepto",
      },
    ];
  }
  return SERVICIOS_CONCEPTOS_CASES;
}
