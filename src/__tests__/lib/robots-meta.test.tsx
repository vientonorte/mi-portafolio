import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { SEOHead } from "@/components/atoms/SEOHead";
import {
  applyRobotsMeta,
  isNoindex,
  resolveRobots,
  restoreRobotsMeta,
  ROBOTS_INDEX,
  ROBOTS_NOINDEX,
} from "@/lib/robots-meta";

/** Gate #292: nunca dos <meta name="robots">; noindex gana (página, build QA o HTML estático). */
const robots = () => Array.from(document.head.querySelectorAll('meta[name="robots"]'));

function staticMeta(content: string | null) {
  document.head.innerHTML = "";
  if (content !== null) {
    const m = document.createElement("meta");
    m.setAttribute("name", "robots");
    m.setAttribute("content", content);
    document.head.appendChild(m);
  }
}

afterEach(() => {
  cleanup(); // desmonta antes de vaciar <head> (React 19 hoistea title/meta de Helmet)
  document.head.innerHTML = "";
});

describe("robots-meta · resolveRobots", () => {
  it("noindex gana si la página, el build QA o el HTML lo piden", () => {
    expect(resolveRobots({ staticContent: ROBOTS_INDEX, noIndex: false, qa: false })).toBe(ROBOTS_INDEX);
    expect(resolveRobots({ staticContent: null, noIndex: false, qa: false })).toBe(ROBOTS_INDEX);
    expect(resolveRobots({ staticContent: ROBOTS_INDEX, noIndex: true, qa: false })).toBe(ROBOTS_NOINDEX);
    expect(resolveRobots({ staticContent: ROBOTS_INDEX, noIndex: false, qa: true })).toBe(ROBOTS_NOINDEX);
    expect(resolveRobots({ staticContent: "noindex, nofollow", noIndex: false, qa: false })).toBe(ROBOTS_NOINDEX);
    expect(resolveRobots({ staticContent: "none", noIndex: false, qa: false })).toBe(ROBOTS_NOINDEX);
    expect(isNoindex("index, follow")).toBe(false);
  });
});

describe("robots-meta · applyRobotsMeta reutiliza el meta del HTML", () => {
  it.each([
    [ROBOTS_INDEX, false, false, ROBOTS_INDEX],
    [ROBOTS_INDEX, true, false, ROBOTS_NOINDEX],
    [ROBOTS_INDEX, false, true, ROBOTS_NOINDEX],
    [ROBOTS_NOINDEX, false, false, ROBOTS_NOINDEX],
    [null, false, false, ROBOTS_INDEX],
    [null, true, false, ROBOTS_NOINDEX],
  ] as const)("HTML=%s noIndex=%s qa=%s → un solo meta %s", (html, noIndex, qa, expected) => {
    staticMeta(html);
    const original = robots()[0];
    applyRobotsMeta(document, { noIndex, qa });
    applyRobotsMeta(document, { noIndex, qa });
    expect(robots()).toHaveLength(1);
    expect(robots()[0].getAttribute("content")).toBe(expected);
    if (original) expect(robots()[0]).toBe(original);
  });

  it("si el HTML trae duplicados, deja uno y conserva el noindex", () => {
    staticMeta(ROBOTS_NOINDEX);
    const extra = document.createElement("meta");
    extra.setAttribute("name", "ROBOTS");
    extra.setAttribute("content", ROBOTS_INDEX);
    document.head.appendChild(extra);
    applyRobotsMeta(document, { noIndex: false, qa: false });
    const all = Array.from(document.head.querySelectorAll("meta")).filter((m) => m.name.toLowerCase() === "robots");
    expect(all).toHaveLength(1);
    expect(all[0].content).toBe(ROBOTS_NOINDEX);
  });

  it("navegar de una página noindex a una indexable vuelve al valor del HTML, no queda pegado el noindex", () => {
    staticMeta(ROBOTS_INDEX);
    applyRobotsMeta(document, { noIndex: true, qa: false });
    expect(robots()[0].getAttribute("content")).toBe(ROBOTS_NOINDEX);
    restoreRobotsMeta(document, false);
    expect(robots()).toHaveLength(1);
    expect(robots()[0].getAttribute("content")).toBe(ROBOTS_INDEX);
    applyRobotsMeta(document, { noIndex: false, qa: false });
    expect(robots()[0].getAttribute("content")).toBe(ROBOTS_INDEX);
  });
});

describe("SEOHead · nunca emite un segundo meta robots", () => {
  const renderSeo = (noIndex: boolean, count = 1) =>
    render(
      <HelmetProvider>
        {Array.from({ length: count }, (_, i) => (
          <SEOHead key={i} title="T" description="D" url="https://vientonorte.io/" noIndex={noIndex} />
        ))}
      </HelmetProvider>
    );

  it.each([
    [ROBOTS_NOINDEX, false, ROBOTS_NOINDEX], // build QA: deploy-qa.yml dejó noindex en el HTML
    [ROBOTS_INDEX, false, ROBOTS_INDEX],
    [ROBOTS_INDEX, true, ROBOTS_NOINDEX],
    [null, false, ROBOTS_INDEX],
  ] as const)("HTML=%s noIndex=%s → exactamente un meta %s", async (html, noIndex, expected) => {
    staticMeta(html);
    renderSeo(noIndex, 2);
    await new Promise((r) => setTimeout(r, 20)); // Helmet aplica en un tick
    expect(robots()).toHaveLength(1);
    expect(robots()[0].getAttribute("content")).toBe(expected);
  });

  it("al desmontar vuelve al HTML estático y sigue habiendo un solo meta", async () => {
    staticMeta(ROBOTS_INDEX);
    const { unmount } = renderSeo(true);
    await new Promise((r) => setTimeout(r, 20));
    expect(robots()[0].getAttribute("content")).toBe(ROBOTS_NOINDEX);
    unmount();
    expect(robots()).toHaveLength(1);
    expect(robots()[0].getAttribute("content")).toBe(ROBOTS_INDEX);
  });

  it("SEOHead no pasa robots por Helmet (Helmet siempre agrega un tag nuevo)", () => {
    const src = readFileSync(resolve(process.cwd(), "src/components/atoms/SEOHead.tsx"), "utf8");
    expect(src).not.toMatch(/<meta\s+name="robots"/);
  });

  it("cada HTML de entrada trae a lo más un meta robots", () => {
    for (const f of ["index.html", "servicios/index.html"]) {
      const html = readFileSync(resolve(process.cwd(), f), "utf8");
      expect((html.match(/<meta\s+name="robots"/gi) ?? []).length, f).toBeLessThanOrEqual(1);
    }
  });
});
