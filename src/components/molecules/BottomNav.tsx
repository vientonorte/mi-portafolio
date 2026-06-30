import { useEffect, useRef, useState } from "react";
import { Home, FolderOpen, Palette, Mail } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "../../lib/LanguageContext";
import { NavTabItem } from "../atoms/NavTabItem";

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
  const [homeSection, setHomeSection] = useState<"inicio" | "contacto">("inicio");

  useEffect(() => {
    if (location.pathname === "/" && pendingScroll.current) {
      const target = pendingScroll.current;
      pendingScroll.current = null;
      requestAnimationFrame(() => {
        document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, [location.pathname]);

  const isOnHome = location.pathname === "/";

  useEffect(() => {
    if (!isOnHome) return;

    const contact = document.querySelector("#contacto");
    if (!contact) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHomeSection(entry.isIntersecting ? "contacto" : "inicio");
      },
      { threshold: 0.25, rootMargin: "-20% 0px -55% 0px" }
    );
    observer.observe(contact);
    return () => observer.disconnect();
  }, [isOnHome]);

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
    if (item.id === "contacto") return isOnHome && homeSection === "contacto";
    if (item.id === "inicio") return isOnHome && homeSection === "inicio";
    return false;
  };

  return (
    <nav
      className="bottom-nav-mobile fixed bottom-0 left-0 right-0 z-50 border-t border-border/70 bg-background/95 shadow-[0_-4px_18px_rgba(15,23,42,0.08)] backdrop-blur-md supports-[backdrop-filter]:bg-background/85"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      aria-label={language === "es" ? "Navegación principal" : "Main navigation"}
    >
      <ul className="bottom-nav-mobile__list">
        {items.map((item) => {
          const label = language === "es" ? item.labelEs : item.labelEn;
          return (
            <li key={item.id} className="bottom-nav-mobile__item">
              <NavTabItem
                icon={item.icon}
                label={label}
                active={isActive(item)}
                onClick={() => handleTap(item)}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}