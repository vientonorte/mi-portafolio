import { labelFor } from '../api/qr-exclusions.js';
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
  expect(res.headers.get('Content-Security-Policy')).toContain("default-src 'none'");
}

describe('QR stats vista ?k=', () => {
  it('qr-points: 20 puntos con comuna', () => {
    expect(QR_POINTS).toHaveLength(20);
    for (const p of QR_POINT_DEFS) expect(p.comuna).toBeTruthy();
    expect(QR_POINT_DEFS[0]).toEqual({ slug: 'general', label: 'General', comuna: '—' });
  });

  it('key válida → 200 HTML con los 20 puntos en orden de grupo, comuna y hora CL', async () => {
    const env = { ADMIN_KV: makeKv(), QR_VIEW_KEY: VIEW };
    const c = ctx();
    await worker.fetch(new Request(BASE + '/q/baquedano'), env, c);
    await Promise.all(c.pending);
    const res = await get(`/q/stats?k=${VIEW}`, env);
    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Type')).toContain('text/html');
    expectStatsHeaders(res);
    const html = await res.text();
    const order = [...QR_POINT_DEFS.filter((p) => p.who === 'Rö'), ...QR_POINT_DEFS.filter((p) => p.who === 'Jhordan'), ...QR_POINT_DEFS.filter((p) => !p.who)];
    let last = -1;
    for (const p of order) {
      const l = labelFor(p, santiagoDate());
      const i = html.indexOf(`<th scope="row">${l.label}<`, last + 1);
      expect(i).toBeGreaterThan(last);
      last = i;
      expect(html).toContain(l.before ? `antes: ${l.before}` : p.comuna);
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

import { renderStatsHtml, LAUNCH_TEST_DAY } from '../api/qr-fruta.js';
describe('QR stats vista · tabla transpuesta y grupos', () => {
  const mk = (slug, who, days) => ({ slug, label: slug, comuna: 'x', who, days, total: Object.values(days).reduce((a, n) => a + n, 0) });
  const html = renderStatsHtml([
    mk('fixture-ro', 'Rö', { '2026-10-27': 2, '2026-10-29': 1 }),
    mk('los-leones', 'Jhordan', { '2026-10-28': 4 }),
    mk('facebook', null, { '2026-10-29': 5 }),
  ]);
  it('tres grupos en orden Rö, Jhordan, Otros', () => {
    const r = html.indexOf('Puntos de Rö'), j = html.indexOf('Puntos de Jhordan'), o = html.indexOf('>Otros');
    expect(r).toBeGreaterThan(0); expect(j).toBeGreaterThan(r); expect(o).toBeGreaterThan(j);
    expect(html.indexOf('fixture-ro')).toBeLessThan(j);
    expect(html.indexOf('facebook')).toBeGreaterThan(o);
  });
  it('filas = puntos con th scope=row, días como columnas, total y caption', () => {
    expect(html).toContain('<th scope="row">fixture-ro');
    expect(html).toContain('<th scope="col" class="n">2026-10-28</th>');
    expect(html).toContain('<caption>');
    // fixture ficticio (no es dato de terreno): 2 prueba (27-oct) + 1 sin exclusión (29-oct) → real 1, con pruebas 3
    expect(html).toContain('<td class="n tot">1</td><td class="n">3</td>');
    expect(html).toMatch(/overflow-x:auto/);
    expect(html).toMatch(/position:sticky/);
    expect(html).toContain('#FF931E');
  });
  it('nota visible del 27-oct como pruebas de lanzamiento', () => {
    expect(LAUNCH_TEST_DAY).toBe('2026-10-27');
    expect(html).toContain('2026-10-27 (prueba)');
    expect(html).toMatch(/prueba de lanzamiento/);
  });
  it('puntos asignados según points.json', async () => {
    const { QR_POINT_DEFS } = await import('../qr-points.ts');
    const by = (w) => QR_POINT_DEFS.filter((p) => p.who === w).map((p) => p.slug);
    expect(by('Jhordan')).toEqual(['los-leones', 'u-catolica', 'u-de-chile', 'los-heroes', 'estacion-central']);
    expect(by('Rö')).toHaveLength(13);
    expect(QR_POINT_DEFS.find((p) => p.slug === 'facebook').who).toBeUndefined();
  });
});
