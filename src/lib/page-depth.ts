/** Home = nav global + bottom nav; subpáginas = nav global + dock deep (TL 9-oct, sin SubpageToolbar). */
export function isDeepPortfolioPage(pathname: string): boolean {
  const path = pathname.replace(/\/+$/, "") || "/";
  return path !== "/";
}