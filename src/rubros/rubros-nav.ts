import type { StaticNavLink } from "../components/organisms/Navigation";
import { homeHref } from "../servicios/servicios-nav";

/** /servicios/ respetando base de Vite ("/servicios/" en prod, "/qa/servicios/" en QA). */
export function serviciosHref(): string {
  return `${homeHref()}servicios/`;
}

export function rubroNavLinks(): StaticNavLink[] {
  return [
    { id: "inicio", label: "Inicio", href: homeHref() },
    { id: "servicios", label: "Servicios", href: serviciosHref() },
    { id: "oferta", label: "Web 72 h", href: "#oferta" },
    { id: "contacto", label: "Contacto", href: "#contacto" },
  ];
}
