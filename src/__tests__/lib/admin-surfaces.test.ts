import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it, vi } from "vitest";
import {
  CALENDAR_DAY,
  P0_WRANGLER,
  datePrefix,
  fetchFinanzasSurface,
  isFinanzasStale,
} from "@/lib/admin-surfaces";

const robots = readFileSync(resolve(process.cwd(), "public/robots.txt"), "utf8");
const adminHub = readFileSync(resolve(process.cwd(), "src/pages/AdminHub.tsx"), "utf8");

describe("admin surfaces · Método Ro Calendar", () => {
  it("calendar SSOT is 18 ago and P0 is wrangler --keep-vars", () => {
    expect(CALENDAR_DAY).toBe("2026-08-18");
    expect(P0_WRANGLER).toBe("wrangler deploy --keep-vars");
  });

  it("marks updated 13 ago as stale vs Calendar 18 ago", () => {
    expect(isFinanzasStale("2026-08-13T20:40:00-04:00")).toBe(true);
    expect(datePrefix("2026-08-13T20:40:00-04:00")).toBe("2026-08-13");
  });

  it("marks updated 18 ago as current", () => {
    expect(isFinanzasStale("2026-08-18T09:00:00-04:00")).toBe(false);
  });

  it("missing updated is stale (cannot claim $ shipped)", () => {
    expect(isFinanzasStale(null)).toBe(true);
    expect(isFinanzasStale(undefined)).toBe(true);
    expect(isFinanzasStale("")).toBe(true);
  });

  it("fetchFinanzasSurface reads meta.updated and scores stale", async () => {
    const fetcher = vi.fn(async () =>
      new Response(
        JSON.stringify({
          meta: { updated: "2026-08-13T20:40:00-04:00", split_policy: "calendar_2026_08_18" },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      )
    );
    const surface = await fetchFinanzasSurface(fetcher as unknown as typeof fetch);
    expect(surface.updated).toBe("2026-08-13T20:40:00-04:00");
    expect(surface.stale).toBe(true);
  });

  it("keeps admin noIndex and robots Disallow; no iframe in hub", () => {
    expect(robots).toContain("Disallow: /admin");
    expect(robots).toContain("Disallow: /#/admin");
    expect(adminHub).toContain("noIndex");
    expect(adminHub).not.toContain("iframe");
  });

  it("HTTP error is stale + NO DATO-style evidence", async () => {
    const fetcher = vi.fn(async () => new Response("no", { status: 403 }));
    const surface = await fetchFinanzasSurface(fetcher as unknown as typeof fetch);
    expect(surface.stale).toBe(true);
    expect(surface.updated).toBeNull();
    expect(surface.evidence).toBe("HTTP 403");
  });
});
