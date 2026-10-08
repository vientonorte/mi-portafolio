/** Pastilla de la card de noticias de SURA Investments: punto + categoría. Tokens VN, no marca SURA. */
export function NewsCategoryPill({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-sm text-foreground">
      <span className="size-1.5 shrink-0 rounded-full bg-foreground" aria-hidden="true" />
      {children}
    </span>
  );
}
