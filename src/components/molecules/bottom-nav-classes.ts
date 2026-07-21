/**
 * Dock inferior liquid glass — thumb zone < lg (header desktop cubre ≥ lg).
 * Hide on desktop is enforced in global.css (@media min-width 1024) because
 * `.bottom-nav-mobile { display:block }` used to override Tailwind `lg:hidden`.
 */
export const BOTTOM_NAV_BASE_CLASS =
  "bottom-nav-mobile bottom-nav-mobile--glass fixed bottom-0 left-0 right-0 z-[60] block lg:hidden";

export const BOTTOM_NAV_DOCK_CLASS = "nav-dock nav-dock--pinned";
