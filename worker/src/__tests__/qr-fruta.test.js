import { describe, expect, it } from 'vitest';
import worker from '../index.js';
import { QR_FORM_URL, QR_PUNTOS, buildFormUrl, santiagoDate } from '../api/qr-fruta.js';

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
function makeCtx() {
  const pending = [];
  return { pending, waitUntil: (p) => pending.push(p) };
}
const IP = '203.0.113.77';
const UA = 'TestAgent/9.9';

describe('QR FRUTA /q/:punto', () => {
  it.each(QR_PUNTOS)('%s → 302 al form con headers', async (punto) => {
    const env = { ADMIN_KV: makeKv() };
    const ctx = makeCtx();
    const res = await worker.fetch(new Request(`https://contact.vientonorte.io/q/${punto}`), env, ctx);
    expect(res.status).toBe(302);
    expect(res.headers.get('Location')).toBe(QR_FORM_URL);
    expect(res.headers.get('Cache-Control')).toBe('no-store');
    expect(res.headers.get('Referrer-Policy')).toBe('no-referrer');
    await Promise.all(ctx.pending);
    expect(env.ADMIN_KV.store.get(`qr:${punto}:total`)).toBe('1');
    expect(env.ADMIN_KV.store.get(`qr:${punto}:${santiagoDate()}`)).toBe('1');
  });

  it('facebook → mismo destino que los-leones, contadores separados; los-leones intacto', async () => {
    expect(QR_PUNTOS).toContain('facebook');
    expect(QR_PUNTOS).toContain('los-leones');
    const env = { ADMIN_KV: makeKv() };
    const ctx = makeCtx();
    const fb = await worker.fetch(new Request('https://contact.vientonorte.io/q/facebook'), env, ctx);
    const ll = await worker.fetch(new Request('https://contact.vientonorte.io/q/los-leones'), env, ctx);
    expect(fb.status).toBe(302);
    expect(ll.status).toBe(302);
    expect(fb.headers.get('Location')).toBe(ll.headers.get('Location'));
    expect(ll.headers.get('Location')).toBe(QR_FORM_URL);
    await Promise.all(ctx.pending);
    expect(env.ADMIN_KV.store.get('qr:facebook:total')).toBe('1');
    expect(env.ADMIN_KV.store.get('qr:los-leones:total')).toBe('1');
  });

  it('punto desconocido → 404 y no cuenta', async () => {
    const env = { ADMIN_KV: makeKv() };
    const res = await worker.fetch(new Request('https://contact.vientonorte.io/q/otro'), env, makeCtx());
    expect(res.status).toBe(404);
    expect(env.ADMIN_KV.store.size).toBe(0);
  });

  it('si KV falla igual redirige', async () => {
    const env = { ADMIN_KV: { get: async () => { throw new Error('kv down'); }, put: async () => {} } };
    const ctx = makeCtx();
    const res = await worker.fetch(new Request('https://contact.vientonorte.io/q/general'), env, ctx);
    expect(res.status).toBe(302);
    await expect(Promise.all(ctx.pending)).resolves.toBeDefined();
  });

  it('no guarda IP ni UA', async () => {
    const env = { ADMIN_KV: makeKv() };
    const ctx = makeCtx();
    await worker.fetch(
      new Request('https://contact.vientonorte.io/q/pajaritos?p=entry.123%3Dx', {
        headers: { 'CF-Connecting-IP': IP, 'User-Agent': UA, Cookie: 'a=b' },
      }),
      env,
      ctx
    );
    await Promise.all(ctx.pending);
    const dump = JSON.stringify([...env.ADMIN_KV.store.entries()]);
    expect(dump).not.toContain(IP);
    expect(dump).not.toContain(UA);
    expect([...env.ADMIN_KV.store.keys()].every((k) => /^qr:pajaritos:(total|\d{4}-\d{2}-\d{2})$/.test(k))).toBe(true);
  });

  it('?p= no reenvía nada con allowlist vacía; solo entry.<n> permitidas', () => {
    const u = new URL('https://x/q/general?p=' + encodeURIComponent('entry.1=a&foo=b&entry.2=c'));
    expect(buildFormUrl(u)).toBe(QR_FORM_URL);
    expect(buildFormUrl(u, ['entry.1', 'foo'])).toBe(`${QR_FORM_URL}?entry.1=a`);
  });
});

describe('QR FRUTA /q/stats', () => {
  it('sin token → 401', async () => {
    const res = await worker.fetch(new Request('https://contact.vientonorte.io/q/stats'), { ADMIN_KV: makeKv(), QR_STATS_TOKEN: 't0k' }, makeCtx());
    expect(res.status).toBe(401);
  });
  it('token incorrecto → 401; secret sin cargar → 401', async () => {
    const h = { Authorization: 'Bearer nope' };
    expect((await worker.fetch(new Request('https://contact.vientonorte.io/q/stats', { headers: h }), { ADMIN_KV: makeKv(), QR_STATS_TOKEN: 't0k' }, makeCtx())).status).toBe(401);
    expect((await worker.fetch(new Request('https://contact.vientonorte.io/q/stats', { headers: h }), { ADMIN_KV: makeKv() }, makeCtx())).status).toBe(401);
  });
  it('con token → JSON y HTML', async () => {
    const env = { ADMIN_KV: makeKv(), QR_STATS_TOKEN: 't0k' };
    const ctx = makeCtx();
    await worker.fetch(new Request('https://contact.vientonorte.io/q/las-rejas'), env, ctx);
    await Promise.all(ctx.pending);
    const auth = { Authorization: 'Bearer t0k' };
    const res = await worker.fetch(new Request('https://contact.vientonorte.io/q/stats', { headers: auth }), env, makeCtx());
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.stats['las-rejas'].total).toBe(1);
    expect(body.stats['las-rejas'].days[santiagoDate()]).toBe(1);
    const html = await worker.fetch(new Request('https://contact.vientonorte.io/q/stats?format=html', { headers: auth }), env, makeCtx());
    expect(html.headers.get('Content-Type')).toContain('text/html');
    expect(await html.text()).toContain('Las Rejas');
  });
});
