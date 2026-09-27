import type { StaticNavLink } from "../components/organisms/Navigation";
import { SERVICIOS_CARDS } from "./servicios-content";

/** Home root respetando base de Vite: "/" en prod, "/qa/" en QA. */
export function homeHref(): string {
  return import.meta.env.BASE_URL || "/";
}

export function serviciosNavLinks(): StaticNavLink[] {
  return [
    { id: "inicio", label: "Inicio", href: homeHref() },
    ...SERVICIOS_CARDS.map((c) => ({ id: c.id, label: navLabel(c.id), href: `#${c.id}` })),
    { id: "contacto", label: "Contacto", href: "#contacto" },
  ];
}

function navLabel(id: string): string {
  if (id === "revision-gratis") return "Revisión gratis";
  if (id === "web-pymes") return "Web 72 h";
  return "Consultoría UX";
}

