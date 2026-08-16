import { describe, expect, it } from 'vitest';
import {
  applyEvents,
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
    expect(next.grid[cellIndex(0.1, 0.1)]).toBe(1);
    expect(next.hits).toHaveLength(1);
  });
});
