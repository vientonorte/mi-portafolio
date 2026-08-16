/** First-party click heat for timed demos. No PII. */

export const HEAT_PATHS = ['diagnostic', 'prototype', 'process', 'app'];
export const HEAT_COLS = 32;
export const HEAT_ROWS = 18;
export const HEAT_MAX_HITS = 800;
const KEY_PREFIX = 'vn:demo-heat:';

export function isHeatPath(id) {
  return HEAT_PATHS.includes(id);
}

export function emptyGrid() {
  return new Array(HEAT_COLS * HEAT_ROWS).fill(0);
}

export function emptyBucket() {
  return {
    counts: {
      view: 0,
      start: 0,
      end: 0,
      leave: 0,
      pause: 0,
      add_minute: 0,
      cta_schedule: 0,
      cta_consult: 0,
      click: 0,
      move: 0,
    },
    sessions: {
      started: 0,
      ended: 0,
      left: 0,
      cta: 0,
      dwellMs: 0,
    },
    grid: emptyGrid(),
    hits: [],
    updatedAt: null,
  };
}

export function cellIndex(x, y) {
  const nx = Number(x);
  const ny = Number(y);
  if (!Number.isFinite(nx) || !Number.isFinite(ny)) return -1;
  const c = Math.min(HEAT_COLS - 1, Math.max(0, Math.floor(nx * HEAT_COLS)));
  const r = Math.min(HEAT_ROWS - 1, Math.max(0, Math.floor(ny * HEAT_ROWS)));
  return r * HEAT_COLS + c;
}

export function normalizeEvent(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const type = typeof raw.type === 'string' ? raw.type.trim().slice(0, 32) : '';
  const allowed = new Set([
    'click',
    'move',
    'view',
    'start',
    'end',
    'leave',
    'tick',
    'pause',
    'add_minute',
    'cta_schedule',
    'cta_consult',
  ]);
  if (!allowed.has(type)) return null;
  const event = { type };
  if (type === 'click' || type === 'move') {
    const x = Number(raw.x);
    const y = Number(raw.y);
    if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
    event.x = Math.min(1, Math.max(0, x));
    event.y = Math.min(1, Math.max(0, y));
  }
  const ms = Number(raw.ms);
  if (Number.isFinite(ms) && ms >= 0) event.ms = Math.min(ms, 30 * 60 * 1000);
  if (typeof raw.phase === 'string') event.phase = raw.phase.trim().slice(0, 16);
  if (typeof raw.el === 'string') event.el = raw.el.trim().slice(0, 64);
  return event;
}

export function applyEvents(bucket, events, now = new Date().toISOString()) {
  const next = {
    counts: { ...emptyBucket().counts, ...bucket.counts },
    sessions: { ...emptyBucket().sessions, ...(bucket.sessions || {}) },
    grid: bucket.grid.slice(),
    hits: bucket.hits.slice(),
    updatedAt: now,
  };
  for (const event of events) {
    if (next.counts[event.type] !== undefined) next.counts[event.type] += 1;
    if (event.type === 'start') next.sessions.started += 1;
    if (event.type === 'end') next.sessions.ended += 1;
    if (event.type === 'leave') next.sessions.left += 1;
    if (event.type === 'cta_schedule' || event.type === 'cta_consult') {
      next.sessions.cta += 1;
    }
    if ((event.type === 'tick' || event.type === 'leave' || event.type === 'end') && event.ms) {
      next.sessions.dwellMs += event.ms;
    }
    if (event.type === 'click' || event.type === 'move') {
      const idx = cellIndex(event.x, event.y);
      if (idx >= 0) next.grid[idx] += event.type === 'click' ? 3 : 1;
      if (event.type === 'click') {
        next.hits.unshift({
          x: event.x,
          y: event.y,
          phase: event.phase || '',
          el: event.el || '',
          t: now,
        });
      }
    }
  }
  next.hits = next.hits.slice(0, HEAT_MAX_HITS);
  return next;
}

export function heatKey(pathId) {
  return `${KEY_PREFIX}${pathId}`;
}
