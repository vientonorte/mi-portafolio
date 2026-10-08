import { useRef, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import type { NewsEdition } from "../../data/news-editions";
import { NEWS_CATALOG } from "../../data/news-editions";
import type { Language } from "../../lib/i18n/types";
import { newsTopicLabel } from "./NewsCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export type NewsSort = "recent" | "oldest";

const TOPICS = NEWS_CATALOG.topics;

/** Categoría y orden del índice. País y solución no existen en este catálogo. */
export function selectNewsEditions(
  editions: readonly NewsEdition[],
  topics: ReadonlySet<string>,
  sort: NewsSort,
): NewsEdition[] {
  const rows = editions.filter((edition) => topics.has(edition.topic));
  rows.sort((a, b) =>
    sort === "recent" ? b.month.localeCompare(a.month) : a.month.localeCompare(b.month),
  );
  return rows;
}

export function NewsFilters({
  language,
  appliedTopics,
  appliedSort,
  onApply,
}: {
  language: Language;
  appliedTopics: ReadonlySet<string>;
  appliedSort: NewsSort;
  onApply: (topics: Set<string>, sort: NewsSort) => void;
}) {
  const es = language === "es";
  const [open, setOpen] = useState(false);
  const [draftTopics, setDraftTopics] = useState<Set<string>>(() => new Set(appliedTopics));
  const [draftSort, setDraftSort] = useState<NewsSort>(appliedSort);
  const draftTopicsRef = useRef(draftTopics);
  const draftSortRef = useRef(draftSort);

  function remember(topics: Set<string>, sort: NewsSort) {
    draftTopicsRef.current = topics;
    draftSortRef.current = sort;
    setDraftTopics(topics);
    setDraftSort(sort);
  }

  function onOpenChange(next: boolean) {
    if (next) remember(new Set(appliedTopics), appliedSort);
    setOpen(next);
  }

  function toggleTopic(topic: string) {
    const next = new Set(draftTopicsRef.current);
    if (next.has(topic)) next.delete(topic);
    else next.add(topic);
    remember(next, draftSortRef.current);
  }

  function clearDraft() {
    remember(new Set(TOPICS), "recent");
  }

  function apply() {
    onApply(new Set(draftTopicsRef.current), draftSortRef.current);
    setOpen(false);
  }

  return (
    <>
      <button
        type="button"
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground"
        aria-haspopup="dialog"
        onClick={() => onOpenChange(true)}
      >
        <SlidersHorizontal className="size-4" aria-hidden="true" />
        {es ? "Filtrar y ordenar" : "Filter and sort"}
      </button>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{es ? "Filtros" : "Filters"}</DialogTitle>
            <DialogDescription>
              {es ? "Categoría y orden de las ediciones." : "Category and order of the editions."}
            </DialogDescription>
          </DialogHeader>
          <fieldset className="m-0 grid gap-3 border-0 p-0">
            <legend className="text-sm font-semibold">{es ? "Categoría" : "Category"}</legend>
            {TOPICS.map((topic) => (
              <label key={topic} className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  className="size-4 accent-foreground"
                  checked={draftTopics.has(topic)}
                  onChange={() => toggleTopic(topic)}
                />
                {newsTopicLabel(topic, language)}
              </label>
            ))}
          </fieldset>
          <fieldset className="m-0 grid gap-3 border-0 p-0">
            <legend className="text-sm font-semibold">{es ? "Ordenar por" : "Sort by"}</legend>
            <label className="flex items-center gap-3 text-sm">
              <input
                type="radio"
                name="news-sort"
                className="size-4 accent-foreground"
                checked={draftSort === "recent"}
                onChange={() => setDraftSort("recent")}
              />
              {es ? "Más recientes" : "Newest"}
            </label>
            <label className="flex items-center gap-3 text-sm">
              <input
                type="radio"
                name="news-sort"
                className="size-4 accent-foreground"
                checked={draftSort === "oldest"}
                onChange={() => setDraftSort("oldest")}
              />
              {es ? "Más antiguas" : "Oldest"}
            </label>
          </fieldset>
          <DialogFooter>
            <button
              type="button"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-4 py-2 text-sm font-semibold"
              onClick={clearDraft}
            >
              {es ? "Limpiar filtros" : "Clear filters"}
            </button>
            <button
              type="button"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-foreground bg-foreground px-4 py-2 text-sm font-semibold text-background"
              onClick={apply}
            >
              {es ? "Aplicar filtros" : "Apply filters"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
