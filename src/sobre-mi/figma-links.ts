/**
 * Prototipos que ya están en el portafolio (value-content-arsenal / figma-assets-ssot).
 * La página pública /sobre-mi/ los lista. No agrega archivos internos de campaña ni el
 * dashboard de escenarios de demanda (expediente laboral).
 */
export interface SobreMiFigmaLink {
  id: string;
  title: string;
  detail: string;
  href: string;
}

export const SOBRE_MI_FIGMA_LINKS: readonly SobreMiFigmaLink[] = [
  {
    id: "transvip-proto",
    title: "App pasajeros Transvip",
    detail: "Prototipo navegable · reserva premium",
    href: "https://www.figma.com/proto/sRPhPaZNBewEhLVwu07TFu?node-id=0-1",
  },
  {
    id: "transvip-system",
    title: "System Design · App Cliente Transvip",
    detail: "Archivo Figma · componentes y handoff",
    href: "https://www.figma.com/design/AEMOE8Hv5iv1nfyR7jlMgO/System-Design-APP-Cliente---Transvip",
  },
  {
    id: "ria-us",
    title: "RIA SURA Investments US",
    detail: "Prototipo navegable · onboarding",
    href: "https://www.figma.com/proto/MOhbYMwUtCSZ8IuJxG41ho/RIA?node-id=311-11144&starting-point-node-id=311%3A11144&page-id=311%3A11143&scaling=min-zoom&content-scaling=fixed",
  },
  {
    id: "avem",
    title: "AVEM · Landing Page",
    detail: "Prototipo navegable · Valuesite",
    href: "https://www.figma.com/proto/xqCj0eIocn9cG6pbPKu6Vy/AVEM-Prototipo-Landing-Page?node-id=5-104&starting-point-node-id=5%3A104&page-id=0%3A1",
  },
  {
    id: "claro-tienda",
    title: "Tienda Claro 2021",
    detail: "Archivo Figma · Havas · tienda de equipos",
    href: "https://www.figma.com/design/lrMqvUERZjDwTwZpQRBSC5/Tienda-Claro-2021",
  },
  {
    id: "claro-portal",
    title: "Portal Comercial Claro",
    detail: "Archivo Figma · Havas · portal",
    href: "https://www.figma.com/design/D39xjsA7ObbhntcDEyPWQG/Portal-Comercial-Claro",
  },
];
