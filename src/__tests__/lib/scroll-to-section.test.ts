import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { scrollToSection, scrollToTop } from "@/lib/scroll-to-section";

describe("scroll helpers", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "scrollTo",
      vi.fn() as unknown as typeof window.scrollTo
    );
    document.documentElement.style.setProperty("--header-height", "64px");
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    document.body.innerHTML = "";
  });

  it("scrollToTop goes to document start", () => {
    scrollToTop("auto");
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  });

  it("scrollToSection targets section start with header offset", async () => {
    const el = document.createElement("section");
    el.id = "valor";
    Object.defineProperty(el, "getBoundingClientRect", {
      value: () => ({ top: 200, left: 0, bottom: 400, right: 0, width: 100, height: 200 }),
    });
    document.body.appendChild(el);

    scrollToSection("valor", "smooth");

    await new Promise((r) => requestAnimationFrame(() => r(undefined)));

    expect(window.scrollTo).toHaveBeenCalled();
    const call = (window.scrollTo as ReturnType<typeof vi.fn>).mock.calls.at(-1)?.[0] as {
      top: number;
      behavior: string;
    };
    expect(call.behavior).toBe("smooth");
    // 200 + scrollY(0) - 64 header
    expect(call.top).toBe(136);
  });
});
