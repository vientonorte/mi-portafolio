function getScrollTopOffset(): number {
  const root = getComputedStyle(document.documentElement);
  const headerHeight = parseFloat(root.getPropertyValue("--header-height"));
  if (!Number.isNaN(headerHeight) && headerHeight > 0) return headerHeight;

  const header = document.querySelector('header[role="banner"]');
  return header instanceof HTMLElement ? header.offsetHeight : 64;
}

export function scrollToSection(selector: string) {
  requestAnimationFrame(() => {
    const element = document.querySelector(selector);
    if (!element) return;

    const topOffset = getScrollTopOffset();
    const rect = element.getBoundingClientRect();
    const top = rect.top + window.scrollY - topOffset;

    window.scrollTo({
      top: Math.max(0, top),
      behavior: "smooth",
    });
  });
}