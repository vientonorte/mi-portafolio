import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Briefcase,
  ClipboardCheck,
  Mail,
  Search,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "../../lib/utils";
import { trackEvent } from "../../lib/analytics";
import { navigateFeaturedPath } from "../../lib/featured-path-routes";
import {
  filterHeroSuggestions,
  type HeroSearchCategory,
  type HeroSearchSuggestion,
} from "../../lib/hero-search";
import type { HeroBannerPanelCopy } from "./HeroUnifiedBanner";

interface HeroIntelligentSearchProps {
  groupLabel: string;
  searchPlaceholder: string;
  searchAriaLabel: string;
  suggestionsLabel: string;
  noResults: string;
  tabs: Record<HeroSearchCategory, string>;
  panels: Record<HeroSearchCategory, HeroBannerPanelCopy>;
  suggestions: HeroSearchSuggestion[];
  onPrimaryAction: (category: HeroSearchCategory) => void;
  onSecondaryAction: (category: HeroSearchCategory) => void;
}

const CATEGORY_ORDER: HeroSearchCategory[] = ["negocios", "contacto", "auditorias"];

const CATEGORY_ICONS: Record<HeroSearchCategory, LucideIcon> = {
  negocios: Briefcase,
  contacto: Mail,
  auditorias: ClipboardCheck,
};

export function HeroIntelligentSearch({
  groupLabel,
  searchPlaceholder,
  searchAriaLabel,
  suggestionsLabel,
  noResults,
  tabs,
  panels,
  suggestions,
  onPrimaryAction,
  onSecondaryAction,
}: HeroIntelligentSearchProps) {
  const [active, setActive] = useState<HeroSearchCategory>("negocios");
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const listboxId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const panel = panels[active];

  const filtered = useMemo(
    () => filterHeroSuggestions(suggestions, { query, category: active }),
    [active, query, suggestions]
  );

  const selectCategory = (category: HeroSearchCategory) => {
    setActive(category);
    setHighlightIndex(0);
    trackEvent("hero_banner_category", { category });
  };

  const goToSuggestion = useCallback(
    (suggestion: HeroSearchSuggestion) => {
      trackEvent("hero_search_select", {
        suggestion_id: suggestion.id,
        category: suggestion.category,
        query: query.trim(),
      });
      navigateFeaturedPath(navigate, suggestion.href, location.pathname);
      setIsOpen(false);
      setQuery("");
      inputRef.current?.blur();
    },
    [location.pathname, navigate, query]
  );

  const handleSubmit = () => {
    if (filtered[highlightIndex]) {
      goToSuggestion(filtered[highlightIndex]);
      return;
    }
    trackEvent("hero_search_submit", { category: active, query: query.trim() });
    onPrimaryAction(active);
  };

  useEffect(() => {
    setHighlightIndex(0);
  }, [query, active]);

  return (
    <div
      className="w-full overflow-hidden rounded-3xl border border-border/80 bg-card/80 shadow-lg backdrop-blur-sm"
      role="search"
      aria-label={groupLabel}
    >
      <div className="border-b border-border/60 px-4 py-4 sm:px-5">
        <p
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
          id="hero-search-label"
        >
          {groupLabel}
        </p>

        <div className="relative mt-3">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            ref={inputRef}
            type="search"
            value={query}
            role="combobox"
            aria-expanded={isOpen}
            aria-controls={listboxId}
            aria-autocomplete="list"
            aria-labelledby="hero-search-label"
            aria-label={searchAriaLabel}
            placeholder={searchPlaceholder}
            className="h-12 rounded-2xl border-border/70 bg-muted/30 pl-11 pr-4 text-base shadow-none"
            onChange={(event) => {
              setQuery(event.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onBlur={() => {
              window.setTimeout(() => setIsOpen(false), 120);
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                setIsOpen(true);
                setHighlightIndex((prev) => Math.min(prev + 1, Math.max(filtered.length - 1, 0)));
              } else if (event.key === "ArrowUp") {
                event.preventDefault();
                setHighlightIndex((prev) => Math.max(prev - 1, 0));
              } else if (event.key === "Enter") {
                event.preventDefault();
                handleSubmit();
              } else if (event.key === "Escape") {
                setIsOpen(false);
              }
            }}
          />

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: -4 }}
                animate={prefersReducedMotion ? false : { opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: -4 }}
                transition={{ duration: 0.16 }}
                className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-20 overflow-hidden rounded-2xl border border-border/80 bg-background/95 shadow-xl backdrop-blur-md"
              >
                <p className="border-b border-border/60 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {suggestionsLabel}
                </p>
                {filtered.length > 0 ? (
                  <ul id={listboxId} role="listbox" className="max-h-64 overflow-y-auto py-1">
                    {filtered.map((suggestion, index) => {
                      const Icon = CATEGORY_ICONS[suggestion.category];
                      const isHighlighted = index === highlightIndex;

                      return (
                        <li key={suggestion.id} role="presentation">
                          <button
                            type="button"
                            role="option"
                            aria-selected={isHighlighted}
                            className={cn(
                              "flex w-full items-start gap-3 px-4 py-3 text-left transition-colors",
                              isHighlighted ? "bg-primary/10" : "hover:bg-muted/50"
                            )}
                            onMouseDown={(event) => event.preventDefault()}
                            onClick={() => goToSuggestion(suggestion)}
                          >
                            <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                            <span className="min-w-0">
                              <span className="block text-sm font-medium text-foreground">
                                {suggestion.title}
                              </span>
                              <span className="block text-xs leading-snug text-muted-foreground">
                                {suggestion.hint}
                              </span>
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="px-4 py-3 text-sm text-muted-foreground">{noResults}</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="px-4 py-3 sm:px-5">
        <div
          className="flex flex-wrap gap-2"
          role="tablist"
          aria-labelledby="hero-search-label"
        >
          {CATEGORY_ORDER.map((category) => {
            const Icon = CATEGORY_ICONS[category];
            const isActive = active === category;

            return (
              <button
                key={category}
                type="button"
                role="tab"
                id={`hero-tab-${category}`}
                aria-selected={isActive}
                aria-controls={`hero-panel-${category}`}
                onClick={() => selectCategory(category)}
                className={cn(
                  "inline-flex min-h-10 items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  isActive
                    ? "border-primary/35 bg-primary/10 text-foreground shadow-sm"
                    : "border-border/80 bg-background/70 text-muted-foreground hover:border-primary/25 hover:bg-surface-matte hover:text-foreground"
                )}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                {tabs[category]}
              </button>
            );
          })}
        </div>
      </div>

      <div
        id={`hero-panel-${active}`}
        role="tabpanel"
        aria-labelledby={`hero-tab-${active}`}
        className="space-y-4 border-t border-border/60 px-4 py-4 sm:px-5 sm:py-5"
      >
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
          <span className="font-medium text-foreground">{tabs[active]}</span>
          <span aria-hidden="true"> · </span>
          {panel.composerHint}
        </p>

        <div className="flex flex-wrap gap-2.5">
          <Button
            size="default"
            className="rounded-full bg-brand-gradient font-semibold hover:opacity-90"
            onClick={() => {
              trackEvent("hero_banner_cta", { category: active, action: "primary" });
              onPrimaryAction(active);
            }}
          >
            {panel.ctaPrimary}
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            size="default"
            variant="outline"
            className="rounded-full"
            onClick={() => {
              trackEvent("hero_banner_cta", { category: active, action: "secondary" });
              onSecondaryAction(active);
            }}
          >
            {panel.ctaSecondary}
          </Button>
        </div>
      </div>
    </div>
  );
}