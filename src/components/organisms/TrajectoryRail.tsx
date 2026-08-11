import { useLanguage } from "../../lib/LanguageContext";
import { cn } from "../../lib/utils";

/**
 * Arco profesional — el nodo final es el empleo actual (VN).
 * Wealth/SURA queda como etapa pasada, no “ahora”.
 */
const STAGES = {
  es: [
    { id: "foundation", label: "Base", sub: "Retail · Agencia" },
    { id: "mobility", label: "Mobility", sub: "Transvip · Karri" },
    { id: "wealth", label: "Wealth", sub: "SURA · 23–26" },
    { id: "vn", label: "Viento Norte", sub: "UX Manager · ahora" },
  ],
  en: [
    { id: "foundation", label: "Foundation", sub: "Retail · Agency" },
    { id: "mobility", label: "Mobility", sub: "Transvip · Karri" },
    { id: "wealth", label: "Wealth", sub: "SURA · 23–26" },
    { id: "vn", label: "Viento Norte", sub: "UX Manager · now" },
  ],
} as const;

export function TrajectoryRail({ className }: { className?: string }) {
  const { language } = useLanguage();
  const stages = STAGES[language];

  return (
    <nav
      aria-label={language === "es" ? "Arco profesional" : "Career arc"}
      className={cn("w-full", className)}
    >
      <p className="mb-3 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:text-left">
        {language === "es" ? "Arco (no empleo actual en cada nodo)" : "Arc (not every node = current job)"}
      </p>
      <ol className="flex flex-wrap items-stretch justify-between gap-2 sm:gap-0">
        {stages.map((s, i) => {
          const isNow = i === stages.length - 1;
          return (
            <li
              key={s.id}
              className="relative flex min-w-[42%] flex-1 flex-col items-center px-1 sm:min-w-0"
            >
              {i < stages.length - 1 ? (
                <span
                  className="absolute left-[calc(50%+14px)] right-[calc(-50%+14px)] top-3 hidden h-px bg-gradient-to-r from-primary/50 to-primary/20 sm:block"
                  aria-hidden
                />
              ) : null}
              <span
                className={cn(
                  "relative z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-background text-[10px] font-bold",
                  isNow
                    ? "bg-primary text-primary-foreground ring-2 ring-primary/30"
                    : "bg-primary/15 text-primary"
                )}
              >
                {i + 1}
              </span>
              <span
                className={cn(
                  "mt-2 text-center text-xs font-semibold",
                  isNow ? "text-primary" : "text-foreground"
                )}
              >
                {s.label}
              </span>
              <span className="text-center text-[10px] text-muted-foreground">
                {s.sub}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
