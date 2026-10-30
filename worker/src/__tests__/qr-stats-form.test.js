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


describe('QR stats · formulario de clave', () => {
  const env = () => ({ ADMIN_KV: makeKv(), QR_VIEW_KEY: VIEW, QR_STATS_TOKEN: ADMIN });

  it('navegador sin clave → 401 con formulario accesible', async () => {
    const res = await get('/q/stats', env(), { Accept: 'text/html,*/*' });
    expect(res.status).toBe(401);
    expect(res.headers.get('Content-Type')).toContain('text/html');
    expect(res.headers.get('Cache-Control')).toBe('no-store');
    expect(res.headers.get('Referrer-Policy')).toBe('no-referrer');
    expect(res.headers.get('Content-Security-Policy')).toContain("form-action 'self'");
    const html = await res.text();
    expect(html).toContain('<label for="k">Clave del contador</label>');
    expect(html).toMatch(/<input id="k" name="k" type="password" autocomplete="current-password"/);
    expect(html).toContain('method="get" action="/q/stats"');
    expect(html).not.toContain('role="alert"');
    expect(html).not.toContain(VIEW);
  });

  it('sin Accept (curl) también recibe formulario', async () => {
    const res = await get('/q/stats', env());
    expect(res.status).toBe(401);
    expect(await res.text()).toContain('Clave del contador');
  });

  it('clave incorrecta → formulario con error, sin eco de la clave', async () => {
    const res = await get('/q/stats?k=clave-mala-123', env(), { Accept: 'text/html' });
    expect(res.status).toBe(401);
    const html = await res.text();
    expect(html).toContain('role="alert"');
    expect(html).toContain('aria-invalid="true"');
    expect(html).not.toContain('clave-mala-123');
  });

  it('cliente API → JSON 401', async () => {
    const a = await get('/q/stats', env(), { Accept: 'application/json' });
    expect(a.status).toBe(401);
    expect(await a.json()).toEqual({ ok: false, error: 'unauthorized' });
    const b = await get('/q/stats', env(), { Authorization: 'Bearer malo' });
    expect(b.status).toBe(401);
    expect(b.headers.get('Content-Type')).toBe('application/json');
  });

  it('clave correcta sigue dando 200 HTML', async () => {
    const res = await get(`/q/stats?k=${VIEW}`, env());
    expect(res.status).toBe(200);
    expect(await res.text()).not.toContain('Clave del contador');
  });

  it('no registra la clave en consola', async () => {
    const logs = [];
    const orig = { log: console.log, warn: console.warn, error: console.error };
    for (const m of Object.keys(orig)) console[m] = (...a) => logs.push(a.join(' '));
    try {
      await get('/q/stats?k=secreto-xyz', env());
      await get(`/q/stats?k=${VIEW}`, env());
    } finally { Object.assign(console, orig); }
    expect(logs.join('\n')).not.toContain('secreto-xyz');
    expect(logs.join('\n')).not.toContain(VIEW);
  });
});
