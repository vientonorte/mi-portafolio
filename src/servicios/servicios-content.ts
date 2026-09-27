/**
 * /servicios/ — contenido decidido por PO (es-CL).
 * Orden fijo: revisión gratis (puerta de entrada) → web 72 h → consultoría UX.
 * Sin servicios IA, sin enlaces a /s/ ni a rutas hash.
 */

export const SERVICIOS_SOURCE = "servicios";
export const CONTACT_ENDPOINT = "https://contact.vientonorte.io/api/contact";
export const CONTACT_EMAIL = "contacto@vientonorte.io";

/**
 * CTA primario con gradiente de marca. Blanco sobre #E8401C→#1A8FDC ronda 3.5:1,
 * así que el texto va a ≥19px bold (texto grande WCAG → mínimo 3:1) y sin
 * hover:opacity (bajaría el contraste).
 */
export const PRIMARY_CTA_CLASS =
  "min-h-[48px] bg-brand-gradient px-6 text-[1.1875rem] font-bold text-white shadow-sm transition-shadow hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary";

/** Valores del select "¿Qué necesitas?" → payload.intent (≤80). */
export const SERVICIOS_INTENTS = [
  "Revisión gratis de un flujo",
  "Web nueva",
  "Otro servicio digital",
] as const;

export type ServiciosIntent = (typeof SERVICIOS_INTENTS)[number];

export interface ServicioCard {
  id: string;
  eyebrow: string;
  title: string;
  forWhom: string;
  includes: string[];
  price: string;
  priceNote: string;
  cta: string;
  intent: ServiciosIntent;
}

export const SERVICIOS_HERO = {
  badge: "Viento Norte · pymes",
  eyebrow: "Servicios",
  /** Alineado con la home: "Tecnología para empresas." */
  title: "Tecnología para empresas: elige cómo partimos.",
  audience:
    "Para dueños y equipos de pymes en Chile que quieren atender y vender mejor en digital, sin enredos.",
  ctaPrimary: "Ver las opciones",
  ctaSecondary: "Escríbenos",
} as const;

export const SERVICIOS_CARDS: ServicioCard[] = [
  {
    id: "revision-gratis",
    eyebrow: "Puerta de entrada",
    title: "Revisión gratis de un flujo",
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
  },
  {
    id: "web-pymes",
    eyebrow: "Web en 72 horas",
    title: "Web para Pymes en 72 horas",
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
  },
  {
    id: "consultoria-ux",
    eyebrow: "Consultoría",
    title: "Consultoría UX para Pymes",
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
    intent: "Otro servicio digital",
  },
];

export const SERVICIOS_SEO = {
  title: "Servicios para pymes · Viento Norte",
  description:
    "Revisión gratis de accesibilidad de un flujo, web para pymes en 72 horas por $30.000 y consultoría UX para pymes en Chile. Elige y escríbenos.",
  canonical: "https://vientonorte.io/servicios/",
} as const;
