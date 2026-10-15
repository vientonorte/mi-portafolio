import { describe, expect, it } from 'vitest';
import {
  HEAT_PATHS,
  HEAT_PATH_ALIASES,
  applyEvents,
  canonicalHeatPath,
  isHeatPath,
  cellIndex,
  emptyBucket,
  normalizeEvent,
} from '../lib/demo-heat.js';

describe('demo-heat', () => {
  it('rejects unknown types and keeps click in 0–1', () => {
    expect(normalizeEvent({ type: 'page_view' })).toBeNull();
    expect(normalizeEvent({ type: 'click', x: 1.4, y: -0.2 })).toEqual({
      type: 'click',
      x: 1,
      y: 0,
    });
  });

  it('bins clicks and counts named actions', () => {
    const next = applyEvents(emptyBucket(), [
      { type: 'start' },
      { type: 'click', x: 0.1, y: 0.1, el: 'start' },
      { type: 'cta_consult' },
    ]);
    expect(next.counts.start).toBe(1);
    expect(next.counts.click).toBe(1);
    expect(next.counts.cta_consult).toBe(1);
    // Un click pesa 3 en la grilla; un move pesa 1. El conteo de eventos sigue en 1.
    expect(next.grid[cellIndex(0.1, 0.1)]).toBe(3);
    expect(next.hits).toHaveLength(1);
  });

  it("accumulates session dwell from tick and leave", () => {
    const next = applyEvents(emptyBucket(), [
      { type: "start" },
      { type: "tick", ms: 5000 },
      { type: "leave", ms: 2000 },
    ]);
    expect(next.sessions.started).toBe(1);
    expect(next.sessions.left).toBe(1);
    expect(next.sessions.dwellMs).toBe(7000);
  });

  it('acepta el id canónico y el alias legado del caso anonimizado', () => {
    const legacy = ['edu', '21-edu'].join('');
    expect(HEAT_PATHS).toContain('mobiliario-edu-edu');
    expect(HEAT_PATHS).not.toContain(legacy);
    expect(isHeatPath('mobiliario-edu-edu')).toBe(true);
    expect(isHeatPath(legacy)).toBe(true);
    expect(canonicalHeatPath(legacy)).toBe('mobiliario-edu-edu');
    expect(canonicalHeatPath('x-cms-n2n')).toBe('x-cms-n2n');
    expect(isHeatPath('otro-edu')).toBe(false);
    expect(Object.keys(HEAT_PATH_ALIASES)).toEqual([legacy]);
  });
});
