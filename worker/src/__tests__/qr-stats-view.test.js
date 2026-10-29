import { describe, expect, it } from 'vitest';
import worker from '../index.js';
import { QR_FORM_URL, santiagoDate } from '../api/qr-fruta.js';
import { QR_POINT_DEFS, QR_POINTS } from '../qr-points.ts';

function makeKv() {
  const store = new Map();
  return {
    store,
    async get(k) { return store.has(k) ? store.get(k) : null; },
    async put(k, v) { store.set(k, v); },
    async list({ prefix = '' } = {}) {
      return { keys: [...store.keys()].filter((k) => k.startsWith(prefix)).map((name) => ({ name })), list_complete: true };
    },
  };
}
const ctx = () => { const pending = []; return { pending, waitUntil: (p) => pending.push(p) }; };
const VIEW = 'v'.repeat(43);
const ADMIN = 'a'.repeat(43);
const BASE = 'https://contact.vientonorte.io';
const get = (path, env, headers = {}) => worker.fetch(new Request(BASE + path, { headers }), env, ctx());

function expectStatsHeaders(res) {
  expect(res.headers.get('Cache-Control')).toBe('no-store');
  expect(res.headers.get('Referrer-Policy')).toBe('no-referrer');
  expect(res.headers.get('X-Robots-Tag')).toBe('noindex');
  expect(res.headers.get('Content-Security-Policy')).toBe("default-src 'none'; style-src 'unsafe-inline'");
}

describe('QR stats vista ?k=', () => {
  it('qr-points: 20 puntos con comuna', () => {
    expect(QR_POINTS).toHaveLength(20);
    for (const p of QR_POINT_DEFS) expect(p.comuna).toBeTruthy();
    expect(QR_POINT_DEFS[0]).toEqual({ slug: 'general', label: 'General', comuna: '—' });
  });

  it('key válida → 200 HTML con los 20 puntos en orden, comuna y hora CL', async () => {
    const env = { ADMIN_KV: makeKv(), QR_VIEW_KEY: VIEW };
    const c = ctx();
    await worker.fetch(new Request(BASE + '/q/baquedano'), env, c);
    await Promise.all(c.pending);
    const res = await get(`/q/stats?k=${VIEW}`, env);
    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Type')).toContain('text/html');
    expectStatsHeaders(res);
    const html = await res.text();
    let last = -1;
    for (const p of QR_POINT_DEFS) {
      const i = html.indexOf(p.label.replace('—', ''));
      expect(i).toBeGreaterThan(last);
      last = i;
      expect(html).toContain(p.comuna);
    }
    expect(html).toMatch(/actualizado a las \d{2}:\d{2} CL/);
    expect(html).toContain(santiagoDate());
    expect(html).not.toMatch(/<script/i);
  });

  it('?format=json → 200 con comuna', async () => {
    const env = { ADMIN_KV: makeKv(), QR_VIEW_KEY: VIEW };
    const res = await get(`/q/stats?k=${VIEW}&format=json`, env);
    expect(res.status).toBe(200);
    expectStatsHeaders(res);
    const body = await res.json();
    expect(body.puntos.map((p) => p.slug)).toEqual([...QR_POINTS]);
    expect(body.puntos.every((p) => typeof p.comuna === 'string')).toBe(true);
  });

  it('key incorrecta → 401 con headers', async () => {
    const res = await get('/q/stats?k=nope', { ADMIN_KV: makeKv(), QR_VIEW_KEY: VIEW });
    expect(res.status).toBe(401);
    expectStatsHeaders(res);
  });

  it('sin key → 401; secret sin cargar → 401', async () => {
    expect((await get('/q/stats', { ADMIN_KV: makeKv(), QR_VIEW_KEY: VIEW })).status).toBe(401);
    expect((await get(`/q/stats?k=${VIEW}`, { ADMIN_KV: makeKv() })).status).toBe(401);
    expect((await get('/q/stats?k=', { ADMIN_KV: makeKv() })).status).toBe(401);
  });

  it('Bearer admin sigue funcionando (JSON)', async () => {
    const res = await get('/q/stats', { ADMIN_KV: makeKv(), QR_STATS_TOKEN: ADMIN }, { Authorization: `Bearer ${ADMIN}` });
    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Type')).toContain('application/json');
  });

  it('view key no sirve como Bearer admin', async () => {
    const res = await get('/q/stats', { ADMIN_KV: makeKv(), QR_STATS_TOKEN: ADMIN, QR_VIEW_KEY: VIEW }, { Authorization: `Bearer ${VIEW}` });
    expect(res.status).toBe(401);
  });

  it.each(QR_POINTS)('/q/%s sigue 302 al Form', async (slug) => {
    const res = await get(`/q/${slug}`, { ADMIN_KV: makeKv() });
    expect(res.status).toBe(302);
    expect(res.headers.get('Location')).toBe(QR_FORM_URL);
  });
});
