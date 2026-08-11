/**
 * Banner fijo en ambientes QA (hostname qa.* o path /qa/ o VITE_APP_ENV=qa).
 */
function isQaEnv(): boolean {
  if (import.meta.env.VITE_APP_ENV === "qa") return true;
  if (typeof window === "undefined") return false;
  const host = window.location.hostname;
  const path = window.location.pathname;
  return (
    host.startsWith("qa.") || path === "/qa" || path.startsWith("/qa/")
  );
}

export function QaEnvBanner() {
  if (!isQaEnv()) return null;

  return (
    <div
      role="status"
      className="sticky top-0 z-[200] border-b border-amber-500/40 bg-amber-500/15 px-3 py-2 text-center text-xs font-medium text-amber-100 backdrop-blur-md"
    >
      <span className="font-semibold text-amber-50">QA · no producción</span>
      <span className="mx-2 opacity-50" aria-hidden>
        ·
      </span>
      <span className="text-amber-100/90">
        VB multi-dispositivo · noindex ·{" "}
        <a
          className="underline underline-offset-2 hover:text-white"
          href="https://vientonorte.io/#/sobre-mi"
        >
          prod
        </a>
      </span>
    </div>
  );
}
