import { useLanguage } from "../../lib/LanguageContext";
import { cn } from "../../lib/utils";

/**
 * Alcance de trabajo — no “base débil → actual”.
 * Cada nodo suma valor: nacional · regional · internacional · práctica VN.
 */
const STAGES = {
  es: [
    {
      id: "national",
      label: "Nacional",
      sub: "Transvip · Karri · e-comm",
    },
    {
      id: "regional",
      label: "Regional",
      sub: "SURA 23–26 · 5+ países",
    },
    {
      id: "international",
      label: "Internacional",
      sub: "micro1 · EE.UU. remoto",
    },
    {
      id: "vn",
      label: "Viento Norte",
      sub: "ahora · UX Manager n2n",
    },
  ],
  en: [
    {
      id: "national",
      label: "National",
      sub: "Transvip · Karri · e-comm",
    },
    {
      id: "regional",
      label: "Regional",
      sub: "SURA 23–26 · 5+ countries",
    },
    {
      id: "international",
      label: "International",
      sub: "micro1 · US remote",
    },
    {
      id: "vn",
      label: "Viento Norte",
      sub: "now · UX Manager n2n",
    },
  ],
} as const;

export function TrajectoryRail({ className }: { className?: string }) {
  const { language } = useLanguage();
  const stages = STAGES[language];
  const es = language === "es";

  return (
    <nav
      aria-label={es ? "Alcance de trabajo" : "Work scope"}
      className={cn("w-full", className)}
    >
      <p className="mb-3 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:text-left">
        {es ? "Alcance de trabajo" : "Work scope"}
      </p>
      <ol className="flex flex-wrap items-stretch justify-between gap-2 sm:gap-0">
        {stages.map((s, i) => {
          const isHighlight = s.id === "vn" || s.id === "international";
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
                  isHighlight
                    ? "bg-primary text-primary-foreground ring-2 ring-primary/30"
                    : "bg-primary/15 text-primary"
                )}
              >
                {i + 1}
              </span>
              <span
                className={cn(
                  "mt-2 text-center text-xs font-semibold",
                  isHighlight ? "text-primary" : "text-foreground"
                )}
              >
                {s.label}
              </span>
              <span className="text-center text-[10px] leading-snug text-muted-foreground">
                {s.sub}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
