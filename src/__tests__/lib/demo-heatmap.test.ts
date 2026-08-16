import { describe, expect, it } from "vitest";
import { heatElName, pointInSurface } from "../../lib/demo-heatmap";
import {
  applyEvents,
  cellIndex,
  emptyBucket,
} from "../../../worker/src/lib/demo-heat.js";

describe("demo heatmap math", () => {
  it("maps a click to 0–1 inside the surface", () => {
    const box = { left: 100, top: 50, width: 200, height: 100 } as DOMRect;
    expect(pointInSurface(150, 75, box)).toEqual({ x: 0.25, y: 0.25 });
    expect(pointInSurface(10, 75, box)).toBeNull();
  });

  it("reads data-heat from the closest ancestor", () => {
    const wrap = document.createElement("div");
    wrap.dataset.heat = "start";
    const btn = document.createElement("span");
    wrap.appendChild(btn);
    expect(heatElName(btn)).toBe("start");
  });

  it("bins worker clicks and named actions", () => {
    const next = applyEvents(emptyBucket(), [
      { type: "start" },
      { type: "click", x: 0.1, y: 0.1, el: "start" },
    ]);
    expect(next.counts.start).toBe(1);
    expect(next.grid[cellIndex(0.1, 0.1)]).toBe(1);
  });
});
