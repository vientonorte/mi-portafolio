/** Solo Home usa nav global + bottom nav; el resto lleva SubpageToolbar. */
export function isDeepPortfolioPage(pathname: string): boolean {
  const path = pathname.replace(/\/+$/, "") || "/";
  return path !== "/";
}