import { NavDock } from "../organisms/NavDock";

/** Dock de navegación principal — solo visible en viewports móvil/tablet (< lg). */
export function BottomNav() {
  return <NavDock variant="home" />;
}