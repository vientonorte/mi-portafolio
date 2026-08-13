/** Catálogo público de Viento Norte — fuente del GET /api/services|cases|company. */

export const COMPANY = {
  name: 'Viento Norte',
  tagline: 'Transformamos complejidad en capacidad de decisión.',
  kind: 'Consultora UXtech',
  url: 'https://vientonorte.io',
  email: 'contacto@vientonorte.io',
  bookingMinutes: 30,
  axes: [
    {
      id: 'interfaces',
      es: 'Interfaces y productos digitales (front office, e-comm, dashboards, sistemas internos)',
      en: 'Interfaces and digital products (front office, e-comm, dashboards, internal systems)',
    },
    {
      id: 'design-systems',
      es: 'Design Systems y Design Ops (tokens, componentes, WCAG, handoff real)',
      en: 'Design Systems and Design Ops (tokens, components, WCAG, real handoff)',
    },
    {
      id: 'research-ai',
      es: 'Investigación + analytics + AI data aplicados a decisiones de negocio',
      en: 'Research + analytics + AI data applied to business decisions',
    },
  ],
  differentiators: [
    {
      id: 'installable',
      es: 'Software que se instala (no solo prototipos)',
      en: 'Software that installs (not only prototypes)',
    },
    {
      id: 'data-owner',
      es: 'Cliente dueño del dato y del código',
      en: 'Client owns the data and the code',
    },
    {
      id: 'n2n',
      es: 'Enfoque N2N: de la fricción detectada a capacidad de decisión operativa',
      en: 'N2N: from detected friction to operational decision capacity',
    },
  ],
};

export const SERVICES = [
  {
    id: 'radar',
    kind: 'package',
    active: true,
    order: 1,
    name: { es: 'Diagnóstico', en: 'Diagnostic' },
    packLabel: { es: 'Radar', en: 'Radar' },
    duration: { es: '5–7 días hábiles', en: '5–7 business days' },
    tagline: {
      es: 'Diagnóstico express: usabilidad, accesibilidad y plan de mejoras.',
      en: 'Express diagnostic: usability, accessibility, and improvement plan.',
    },
  },
  {
    id: 'marco',
    kind: 'package',
    active: true,
    order: 2,
    featured: true,
    name: { es: 'Prototipo', en: 'Prototype' },
    packLabel: { es: 'Marco', en: 'Marco' },
    duration: { es: '3–4 semanas', en: '3–4 weeks' },
    tagline: {
      es: 'Pantallas listas para construir. Incluye diagnóstico y 3 sesiones.',
      en: 'Screens ready to build. Includes diagnostic and 3 sessions.',
    },
  },
  {
    id: 'ops',
    kind: 'package',
    active: true,
    order: 3,
    name: { es: 'Proceso de equipo', en: 'Team process' },
    packLabel: { es: 'Ops', en: 'Ops' },
    duration: { es: '4–6 semanas', en: '4–6 weeks' },
    tagline: {
      es: 'Ordenar cómo diseña y entrega tu equipo.',
      en: 'Organize how your team designs and delivers.',
    },
  },
  {
    id: 'dashboard',
    kind: 'module',
    active: true,
    order: 10,
    name: { es: 'Dashboard', en: 'Dashboard' },
    packLabel: { es: 'Módulo', en: 'Module' },
    tagline: {
      es: 'Operación y KPIs en un aliento, instalado en tu perímetro.',
      en: 'Ops and KPIs in one breath, installed in your perimeter.',
    },
  },
  {
    id: 'riesgo',
    kind: 'module',
    active: true,
    order: 11,
    name: { es: 'Riesgo', en: 'Risk' },
    packLabel: { es: 'Módulo', en: 'Module' },
    tagline: {
      es: 'Alertas y control de riesgo sin ceder el dato.',
      en: 'Risk alerts and control without giving up the data.',
    },
  },
  {
    id: 'inventario',
    kind: 'module',
    active: true,
    order: 12,
    name: { es: 'Inventario', en: 'Inventory' },
    packLabel: { es: 'Módulo', en: 'Module' },
    tagline: {
      es: 'Stock y movimiento con ownership de tablas.',
      en: 'Stock and movement with table ownership.',
    },
  },
  {
    id: 'pedidos',
    kind: 'module',
    active: true,
    order: 13,
    name: { es: 'Pedidos', en: 'Orders' },
    packLabel: { es: 'Módulo', en: 'Module' },
    tagline: {
      es: 'Front office de pedidos, instalable.',
      en: 'Installable order front office.',
    },
  },
  {
    id: 'clientes',
    kind: 'module',
    active: true,
    order: 14,
    name: { es: 'Clientes', en: 'Customers' },
    packLabel: { es: 'Módulo', en: 'Module' },
    tagline: {
      es: 'Base comercial y fidelización, dueño del dato.',
      en: 'Commercial base and loyalty — you own the data.',
    },
  },
  {
    id: 'reportes',
    kind: 'module',
    active: true,
    order: 15,
    name: { es: 'Reportes', en: 'Reports' },
    packLabel: { es: 'Módulo', en: 'Module' },
    tagline: {
      es: 'Reportes exportables, sin arriendo de analítica.',
      en: 'Exportable reports, no analytics rent.',
    },
  },
];

export const CASES = [
  {
    id: 'sura-ux-enterprise',
    published: true,
    company: 'SURA Investments',
    title: { es: 'UX enterprise Wealth', en: 'Wealth enterprise UX' },
    url: 'https://vientonorte.io/#/proyecto/sura-ux-enterprise',
  },
  {
    id: 'transvip-app-premium',
    published: true,
    company: 'Transvip',
    title: { es: 'App premium de reserva', en: 'Premium booking app' },
    url: 'https://vientonorte.io/#/proyecto/transvip-app-premium',
  },
  {
    id: 'karri-design-sprint',
    published: true,
    company: 'Karri',
    title: { es: 'Design Sprint y delivery', en: 'Design Sprint and delivery' },
    url: 'https://vientonorte.io/#/proyecto/karri-design-sprint',
  },
  {
    id: 'edu21',
    published: true,
    company: 'Edu21',
    title: { es: 'Producto educativo', en: 'Education product' },
    url: 'https://vientonorte.io/#/proyectos',
  },
  {
    id: 'xcms',
    published: true,
    company: 'Viento Norte',
    title: { es: 'X|CMS · módulos a medida', en: 'X|CMS · custom modules' },
    url: 'https://vientonorte.io/#/demo/x-cms',
  },
];

export function getCompany() {
  return COMPANY;
}

export function getServices({ includeInactive = false } = {}) {
  return SERVICES.filter((item) => includeInactive || item.active).sort(
    (a, b) => a.order - b.order
  );
}

export function getCases({ includeUnpublished = false } = {}) {
  return CASES.filter((item) => includeUnpublished || item.published);
}
