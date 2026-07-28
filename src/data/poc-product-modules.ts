/**
 * Módulos-producto Viento Norte (referencia X|CMS / Figma Sites).
 * Cada módulo = producto a medida · local-first · dueño del dato.
 * Source demo: https://pouch-growl-74881457.figma.site
 */
import { portfolioImages } from "../lib/portfolio-image-urls";
import { CONSULTORIA_DEMO_X_CMS } from "./consultoria-demos";

export const POC_X_CMS_SITE = CONSULTORIA_DEMO_X_CMS.figmaSitesUrl!;
export const POC_X_CMS_MAKE = CONSULTORIA_DEMO_X_CMS.figmaMakeUrl!;

export type PocModuleId =
  | "dashboard"
  | "riesgo"
  | "inventario"
  | "pedidos"
  | "clientes"
  | "reportes";

export type PocModule = {
  id: PocModuleId;
  /** Etiqueta corta (nav chips) */
  chip: { es: string; en: string };
  /** Título producto (Apple-style, multi-línea con \n) */
  title: { es: string; en: string };
  /** Una frase de job-to-be-done */
  job: { es: string; en: string };
  /** Capacidad concreta del módulo */
  capabilities: { es: string[]; en: string[] };
  /** Por qué local-first / dueño del dato aplica aquí */
  ownership: { es: string; en: string };
  /**
   * Visual del módulo — hoy placeholder (portfolio reuse).
   * Rö reemplaza el archivo real; una sola línea en UI lo declara.
   */
  image: string;
};

/** Principios de negocio VN (no cloud SaaS genérico) */
export const POC_PRINCIPLES = {
  es: [
    {
      title: "Sin nube obligatoria",
      body: "El módulo corre en tu perímetro. Sin suscripción SaaS que se lleve el dato.",
    },
    {
      title: "Sin terceros de datos",
      body: "No entrenamos modelos con tu operación ni revendemos telemetría.",
    },
    {
      title: "Dueño de la empresa",
      body: "Licencia y código del módulo para la empresa — no un arriendo eterno.",
    },
    {
      title: "Dueño del dato",
      body: "Tus tablas, backups y export viven contigo. Portable. Auditables.",
    },
  ],
  en: [
    {
      title: "No mandatory cloud",
      body: "The module runs in your perimeter. No SaaS rent that owns the data.",
    },
    {
      title: "No third-party data",
      body: "We don’t train models on your ops or resell telemetry.",
    },
    {
      title: "Company owns the product",
      body: "Module license and code for the company — not endless rent.",
    },
    {
      title: "Company owns the data",
      body: "Your tables, backups, and exports stay with you. Portable. Auditable.",
    },
  ],
} as const;

/**
 * Módulos reales del stack X|CMS (Figma Make / Sites)
 * alineados a trayectoria enterprise VN.
 */
export const POC_MODULES: readonly PocModule[] = [
  {
    id: "dashboard",
    chip: { es: "Dashboard", en: "Dashboard" },
    title: {
      es: "Dashboard.\nTu operación en un aliento.",
      en: "Dashboard.\nYour ops in one breath.",
    },
    job: {
      es: "CFO y gerencia ven KPIs, ratios y alertas sin abrir diez herramientas.",
      en: "CFO and leadership see KPIs, ratios, and alerts without ten tools.",
    },
    capabilities: {
      es: [
        "Dashboard principal y financiero en tiempo real",
        "KPIs por local / canal",
        "Roles: Admin, Gerente, Vendedor, Analista",
      ],
      en: [
        "Main and financial dashboards in real time",
        "KPIs by site / channel",
        "Roles: Admin, Manager, Sales, Analyst",
      ],
    },
    ownership: {
      es: "Los números no salen a un BI de terceros: el panel es tuyo.",
      en: "Numbers don’t leave to a third-party BI — the board is yours.",
    },
    image: portfolioImages.consultoria.xCmsDashboard,
  },
  {
    id: "riesgo",
    chip: { es: "Riesgo", en: "Risk" },
    title: {
      es: "Control de riesgo.\nAntes de que duela.",
      en: "Risk control.\nBefore it hurts.",
    },
    job: {
      es: "Analista de riesgo y CFO priorizan alto / moderado / bajo con alertas automáticas.",
      en: "Risk analyst and CFO prioritize high / moderate / low with automatic alerts.",
    },
    capabilities: {
      es: [
        "Alertas de alto riesgo",
        "Distribución y riesgo por cliente",
        "Análisis financiero + evaluación de riesgo",
      ],
      en: [
        "High-risk alerts",
        "Distribution and risk by customer",
        "Financial analysis + risk evaluation",
      ],
    },
    ownership: {
      es: "Modelos y umbrales quedan en tu política — no en un black-box cloud.",
      en: "Models and thresholds stay in your policy — not a cloud black box.",
    },
    image: portfolioImages.consultoria.geesDashboard,
  },
  {
    id: "inventario",
    chip: { es: "Inventario", en: "Inventory" },
    title: {
      es: "Inventario.\nStock que se entiende.",
      en: "Inventory.\nStock you understand.",
    },
    job: {
      es: "Operaciones controla entrada, salida y rotación sin ERP monstruo.",
      en: "Ops controls in/out and turnover without a monster ERP.",
    },
    capabilities: {
      es: [
        "Control de inventario y stock",
        "Inventario y rotación",
        "Catálogo de productos",
      ],
      en: [
        "Inventory and stock control",
        "Inventory and turnover",
        "Product catalog",
      ],
    },
    ownership: {
      es: "El catálogo y el stock son activos de la empresa, no del proveedor SaaS.",
      en: "Catalog and stock are company assets — not the SaaS vendor’s.",
    },
    image: portfolioImages.sura.componentPipeline,
  },
  {
    id: "pedidos",
    chip: { es: "Pedidos", en: "Orders" },
    title: {
      es: "Pedidos.\nTodos los canales, un lugar.",
      en: "Orders.\nEvery channel, one place.",
    },
    job: {
      es: "Ventas y e-commerce unifican pedidos pendientes y procesados.",
      en: "Sales and e-commerce unify pending and processed orders.",
    },
    capabilities: {
      es: [
        "Pedidos y ventas multi-canal",
        "Pedidos recientes y pendientes",
        "Flujo operativo de un día real",
      ],
      en: [
        "Multi-channel orders and sales",
        "Recent and pending orders",
        "Real-day operational flow",
      ],
    },
    ownership: {
      es: "Historial de pedidos exportable y resguardado en tu perímetro.",
      en: "Order history exportable and held in your perimeter.",
    },
    image: portfolioImages.transvip.appMobile,
  },
  {
    id: "clientes",
    chip: { es: "Clientes", en: "Customers" },
    title: {
      es: "Clientes.\nRelación sin ceder la base.",
      en: "Customers.\nRelationship without giving away the base.",
    },
    job: {
      es: "Comercial y operaciones administran la base de clientes y fidelización.",
      en: "Sales and ops manage the customer base and loyalty.",
    },
    capabilities: {
      es: [
        "Gestión de clientes (activos, nuevos, inactivos)",
        "Gestión de fidelización y tiers",
        "Riesgo por cliente cuando aplica",
      ],
      en: [
        "Customer management (active, new, inactive)",
        "Loyalty and tiers",
        "Per-customer risk when needed",
      ],
    },
    ownership: {
      es: "La base de clientes no vive en un CRM ajeno con lock-in.",
      en: "The customer base doesn’t live in a locked-in foreign CRM.",
    },
    image: portfolioImages.sura.riaOnboarding,
  },
  {
    id: "reportes",
    chip: { es: "Reportes", en: "Reports" },
    title: {
      es: "Reportes.\nEvidencia para decidir.",
      en: "Reports.\nEvidence to decide.",
    },
    job: {
      es: "Dirección descarga reportes globales y financieros sin pedir favor al TI.",
      en: "Leadership downloads global and financial reports without IT favors.",
    },
    capabilities: {
      es: [
        "Reportes globales y financieros",
        "Acceso según rol",
        "Backups y control de seguridad",
      ],
      en: [
        "Global and financial reports",
        "Role-based access",
        "Backups and security control",
      ],
    },
    ownership: {
      es: "Reportes y backups salen a tu archivo — no a un silo del vendor.",
      en: "Reports and backups go to your archive — not a vendor silo.",
    },
    image: portfolioImages.sura.analyticsGa4,
  },
] as const;
