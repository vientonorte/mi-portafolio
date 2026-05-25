import { useEffect, useRef } from "react";
import { Home, FolderOpen, Palette, Mail } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "../../lib/LanguageContext";

const items = [
  {
    id: "inicio",
    labelEs: "Inicio",
    labelEn: "Home",
    icon: Home,
    type: "anchor" as const,
    target: "#inicio",
    route: "/",
  },
  {
    id: "cases",
    labelEs: "Casos",
    labelEn: "Cases",
    icon: FolderOpen,
    type: "route" as const,
    target: "/cases",
    route: "/cases",
  },
  {
    id: "design-system",
    labelEs: "Diseño",
    labelEn: "Design",
    icon: Palette,
    type: "route" as const,
    target: "/design-system",
    route: "/design-system",
  },
  {
    id: "contacto",
    labelEs: "Contacto",
    labelEn: "Contact",
    icon: Mail,
    type: "anchor" as const,
    target: "#contacto",
    route: "/",
  },
];

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();
  const pendingScroll = useRef<string | null>(null);

  // Fire pending scroll once home route is actually mounted
  useEffect(() => {
    if (location.pathname === "/" && pendingScroll.current) {
      const target = pendingScroll.current;
      pendingScroll.current = null;
      // rAF ensures DOM is painted before we query
      requestAnimationFrame(() => {
        document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, [location.pathname]);

  const handleTap = (item: typeof items[0]) => {
    if (item.type === "route") {
      navigate(item.route);
      return;
    }
    if (location.pathname !== "/") {
      pendingScroll.current = item.target;
      navigate("/");
    } else {
      document.querySelector(item.target)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isActive = (item: typeof items[0]) => {
    if (item.type === "route") return location.pathname === item.route;
    return location.pathname === "/" && item.id === "inicio";
  };

  return (
    <nav
      className="bottom-nav-mobile fixed bottom-0 left-0 right-0 z-50 border-t border-border/70 bg-background/95 shadow-[0_-4px_18px_rgba(15,23,42,0.08)] backdrop-blur-md supports-[backdrop-filter]:bg-background/85"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      aria-label={language === "es" ? "Navegación principal" : "Main navigation"}
    >
      <ul className="grid h-16 grid-cols-4 items-stretch justify-items-stretch">
        {items.map((item) => {
          const Icon = item.icon;
          const active = isActive(item);
          return (
            <li key={item.id} className="min-w-0">
              <button
                onClick={() => handleTap(item)}
                className="flex h-16 w-full flex-col items-center justify-center gap-1 px-1 transition-colors"
                style={{ color: active ? "var(--primary)" : "var(--muted-foreground)" }}
                aria-label={language === "es" ? item.labelEs : item.labelEn}
                aria-current={active ? "page" : undefined}
              >
                <Icon
                  className="h-[18px] w-[18px]"
                  aria-hidden="true"
                  strokeWidth={active ? 2.5 : 1.5}
                />
                <span
                  className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap px-0.5 text-center text-[11px] leading-none"
                  style={{
                    fontWeight: active ? 600 : 400,
                    letterSpacing: "0.01em",
                  }}
                >
                  {language === "es" ? item.labelEs : item.labelEn}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
