import { ADMIN_API_BASE } from "./admin-config";
import type { ServicePathId } from "../data/service-path-demos";
import type { ConsultoriaDemoId } from "../data/consultoria-demos";

export type DemoHeatPathId = ServicePathId | ConsultoriaDemoId;

export type DemoHeatType =
  | "click"
  | "move"
  | "view"
  | "start"
  | "end"
  | "leave"
  | "tick"
  | "pause"
  | "add_minute"
  | "cta_schedule"
  | "cta_consult";

export type DemoHeatEvent = {
  type: DemoHeatType;
  x?: number;
  y?: number;
  ms?: number;
  phase?: string;
  el?: string;
};

const QUEUE: DemoHeatEvent[] = [];
let flushTimer: number | null = null;
let activePath: DemoHeatPathId | null = null;

export function heatElName(target: EventTarget | null): string {
  if (!(target instanceof Element)) return "";
  const tagged = target.closest("[data-heat]");
  if (tagged instanceof HTMLElement) return tagged.dataset.heat ?? "";
  return target.tagName.toLowerCase().slice(0, 32);
}

export function pointInSurface(
  clientX: number,
  clientY: number,
  surface: DOMRect
): { x: number; y: number } | null {
  if (surface.width < 8 || surface.height < 8) return null;
  const x = (clientX - surface.left) / surface.width;
  const y = (clientY - surface.top) / surface.height;
  if (x < 0 || x > 1 || y < 0 || y > 1) return null;
  return { x, y };
}

export function queueDemoHeat(pathId: DemoHeatPathId, event: DemoHeatEvent): void {
  activePath = pathId;
  QUEUE.push(event);
  if (QUEUE.length >= 8) {
    void flushDemoHeat();
    return;
  }
  if (flushTimer !== null) return;
  flushTimer = window.setTimeout(() => {
    flushTimer = null;
    void flushDemoHeat();
  }, 1800);
}

export async function flushDemoHeat(): Promise<void> {
  if (flushTimer !== null) {
    window.clearTimeout(flushTimer);
    flushTimer = null;
  }
  if (!activePath || QUEUE.length === 0) return;
  const events = QUEUE.splice(0, QUEUE.length);
  const pathId = activePath;
  try {
    await fetch(`${ADMIN_API_BASE}/api/demo/heat`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ pathId, events }),
      keepalive: true,
    });
  } catch {
    /* heatmap is best-effort */
  }
}
