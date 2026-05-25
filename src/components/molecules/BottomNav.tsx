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
      className="bottom-nav-mobile fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      aria-label={language === "es" ? "Navegación principal" : "Main navigation"}
    >
      <ul className="flex items-center justify-around h-16">
        {items.map((item) => {
          const Icon = item.icon;
          const active = isActive(item);
          return (
            <li key={item.id} className="flex-1">
              <button
                onClick={() => handleTap(item)}
                className="flex flex-col items-center justify-center w-full h-16 gap-1 transition-colors"
                style={{ color: active ? "var(--primary)" : "var(--muted-foreground)" }}
                aria-label={language === "es" ? item.labelEs : item.labelEn}
                aria-current={active ? "page" : undefined}
              >
                <Icon
                  className="h-5 w-5"
                  aria-hidden="true"
                  strokeWidth={active ? 2.5 : 1.5}
                />
                <span
                  className="text-xs"
                  style={{
                    fontWeight: active ? 600 : 400,
                    letterSpacing: "0.02em",
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
