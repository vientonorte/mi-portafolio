export function scrollToSection(selector: string) {
  requestAnimationFrame(() => {
    const element = document.querySelector(selector);
    if (!element) return;

    const header = document.querySelector('header[role="banner"]');
    const topOffset =
      header instanceof HTMLElement ? header.offsetHeight : 64;

    const rect = element.getBoundingClientRect();
    const top = rect.top + window.scrollY - topOffset;

    window.scrollTo({
      top: Math.max(0, top),
      behavior: "smooth",
    });
  });
}