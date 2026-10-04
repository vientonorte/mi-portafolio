import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { env } from 'cloudflare:test';
import { call, clearKv, mockOutbound, ORIGIN } from './helpers.js';

describe('GET /api/health', () => {
  it('200 con kv:true (binding Miniflare) y ga4Mp según el secreto', async () => {
    const res = await call('/api/health');
    expect(res.status).toBe(200);
    expect(res.headers.get('Access-Control-Allow-Origin')).toBe(ORIGIN);
    const data = await res.json();
    expect(data).toMatchObject({ ok: true, service: 'vientonorte-api', kv: true, ga4Mp: false });
    expect(Number.isNaN(Date.parse(data.time))).toBe(false);

    const withMp = await call('/api/health', { envOverrides: { GA4_MP_API_SECRET: 'test-only' } });
    expect((await withMp.json()).ga4Mp).toBe(true);
  });
});

describe('CORS', () => {
  it('preflight OPTIONS desde origen permitido → 204 con headers CORS y credenciales', async () => {
    const res = await call('/api/contact', { method: 'OPTIONS' });
    expect(res.status).toBe(204);
    expect(res.headers.get('Access-Control-Allow-Origin')).toBe(ORIGIN);
    expect(res.headers.get('Access-Control-Allow-Methods')).toContain('POST');
    expect(res.headers.get('Access-Control-Allow-Headers')).toContain('Content-Type');
    expect(res.headers.get('Access-Control-Allow-Credentials')).toBe('true');
  });

  it('localhost (dev en :3000) está permitido', async () => {
    const res = await call('/api/health', { origin: 'http://localhost:3000' });
    expect(res.status).toBe(200);
    expect(res.headers.get('Access-Control-Allow-Origin')).toBe('http://localhost:3000');
  });

  it('origen no permitido → 403 sin headers CORS, también en POST /api/contact', async () => {
    const pre = await call('/api/contact', { method: 'OPTIONS', origin: 'https://evil.example' });
    expect(pre.status).toBe(403);
    expect(pre.headers.get('Access-Control-Allow-Origin')).toBeNull();

    await clearKv();
    const post = await call('/api/contact', {
      method: 'POST',
      origin: 'https://evil.example',
      body: { name: 'Bot', email: 'b@x.cl', message: 'x'.repeat(20), consent: true },
    });
    expect(post.status).toBe(403);
    expect((await env.ADMIN_KV.list()).keys).toHaveLength(0);
  });

  it('sin header Origin (server-to-server) → Access-Control-Allow-Origin: * sin credenciales', async () => {
    const res = await call('/api/health', { origin: null });
    expect(res.status).toBe(200);
    expect(res.headers.get('Access-Control-Allow-Origin')).toBe('*');
    expect(res.headers.get('Access-Control-Allow-Credentials')).toBeNull();
  });
});

describe('/api/admin/auth/passkey* → 404 (hotfix C1, PR #300)', () => {
  beforeEach(clearKv);
  afterEach(() => vi.restoreAllMocks());

  const paths = [
    '/api/admin/auth/passkey',
    '/api/admin/auth/passkey/',
    '/api/admin/auth/passkey/register/begin',
    '/api/admin/auth/passkey/register/finish',
    '/api/admin/auth/passkey/login/begin',
    '/api/admin/auth/passkey/login/finish',
    '/api/admin/auth/passkey/cualquier-cosa',
  ];

  it.each(paths.flatMap((p) => ['GET', 'POST', 'OPTIONS'].map((m) => [m, p])))(
    '%s %s → 404',
    async (method, path) => {
      const { spy } = mockOutbound();
      const res = await call(path, { method, body: method === 'POST' ? {} : undefined });
      expect(res.status).toBe(404);
      expect(await res.json()).toEqual({ ok: false, error: 'Not found' });
      expect(spy).not.toHaveBeenCalled();
      expect((await env.ADMIN_KV.list()).keys).toHaveLength(0);
    }
  );

  it('responde 404 antes del chequeo CORS (origen no permitido también recibe 404)', async () => {
    const res = await call('/api/admin/auth/passkey/login/begin', {
      method: 'POST',
      body: {},
      origin: 'https://evil.example',
    });
    expect(res.status).toBe(404);
  });

  it('/api/admin/auth/passkeyX (prefijo distinto) no entra al cortocircuito: cae en 404 genérico con CORS', async () => {
    const res = await call('/api/admin/auth/passkeyX');
    expect(res.status).toBe(404);
    expect(res.headers.get('Access-Control-Allow-Origin')).toBe(ORIGIN);
  });
});

describe('rutas admin sin sesión', () => {
  it('GET /api/admin/auth/session sin cookie → {ok:false}', async () => {
    const res = await call('/api/admin/auth/session');
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ ok: false });
  });

  it('GET /api/admin/leads sin sesión no expone datos (401/403)', async () => {
    const res = await call('/api/admin/leads');
    expect([401, 403]).toContain(res.status);
  });
});
