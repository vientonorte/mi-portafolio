import { describe, expect, it, vi } from 'vitest';
import worker from '../index.js';

const BASE = 'https://contact.vientonorte.io';

const QR_PATHS = [
  '/q',
  '/q/',
  '/q/general',
  '/q/general/',
  '/q/facebook',
  '/q/los-leones',
  '/q/baquedano',
  '/q/irarrazaval',
  '/q/otro',
  '/q/stats',
  '/q/stats/',
  '/q/stats?k=clave-de-vista',
  '/q/stats?k=clave-de-vista&format=json',
  '/q/stats?format=html',
  '/stats',
  '/stats/',
  '/stats?k=clave-de-vista',
];

function makeKv() {
  const store = new Map();
  return {
    store,
    get: vi.fn(async (key) => store.get(key) ?? null),
    put: vi.fn(async (key, value) => {
      store.set(key, value);
    }),
    delete: vi.fn(async (key) => {
      store.delete(key);
    }),
    list: vi.fn(async () => ({
      keys: [...store.keys()].map((name) => ({ name })),
      list_complete: true,
    })),
  };
}

function makeEnv(kv = makeKv()) {
  return {
    kv,
    env: {
      ADMIN_KV: kv,
      ALLOWED_ORIGIN: 'https://vientonorte.io',
      CONTACT_INBOX: 'inbox@vientonorte.test',
      CONTACT_FROM: 'contacto@vientonorte.io',
      CONTACT_FROM_NAME: 'Viento Norte',
      QR_VIEW_KEY: 'view-key-must-not-authorize',
      QR_STATS_TOKEN: 'admin-token-must-not-authorize',
    },
  };
}

const ctx = { waitUntil() {} };

function call(path, { method = 'GET', headers = {}, body } = {}, env) {
  return worker.fetch(
    new Request(BASE + path, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    }),
    env,
    ctx
  );
}

describe('QR FRUTA retirado', () => {
  it.each(QR_PATHS)('GET %s → 410 y no escribe KV', async (path) => {
    const { env, kv } = makeEnv();
    const res = await call(path, {}, env);
    expect(res.status).toBe(410);
    expect(res.headers.get('Location')).toBeNull();
    expect(res.headers.get('Cache-Control')).toBe('no-store');
    const text = await res.text();
    expect(text).not.toMatch(/docs\.google\.com\/forms|\/q\/stats|QR FRUTA/i);
    expect(kv.get).not.toHaveBeenCalled();
    expect(kv.put).not.toHaveBeenCalled();
    expect(kv.delete).not.toHaveBeenCalled();
    expect(kv.list).not.toHaveBeenCalled();
    expect([...kv.store.keys()]).toEqual([]);
  });

  it.each(['POST', 'OPTIONS', 'PUT'])('%s /q/stats → 410 sin KV', async (method) => {
    const { env, kv } = makeEnv();
    const res = await call(
      '/q/stats?k=clave-de-vista',
      {
        method,
        headers: {
          Authorization: 'Bearer admin-token-must-not-authorize',
          Accept: 'text/html',
          Origin: 'https://vientonorte.io',
        },
      },
      env
    );
    expect(res.status).toBe(410);
    expect(kv.put).not.toHaveBeenCalled();
    expect(kv.get).not.toHaveBeenCalled();
    expect(kv.list).not.toHaveBeenCalled();
  });

  it('POST /q/general no redirige ni cuenta', async () => {
    const { env, kv } = makeEnv();
    const res = await call('/q/general', { method: 'POST' }, env);
    expect(res.status).toBe(410);
    expect(res.headers.get('Location')).toBeNull();
    expect([...kv.store.keys()].some((key) => key.startsWith('qr:'))).toBe(false);
  });

  it('GET / ya no sirve la portada con enlace a /q/stats', async () => {
    const { env } = makeEnv();
    const res = await call('/', {}, env);
    expect(res.status).toBe(404);
    const text = await res.text();
    expect(text).not.toMatch(/\/q\/stats|QR FRUTA|Contador QR/i);
  });

  it('rutas que no eran QR no caen en el 410', async () => {
    const { env } = makeEnv();
    const queue = await call('/queue', { headers: { Origin: 'https://vientonorte.io' } }, env);
    expect(queue.status).toBe(404);
    expect(queue.headers.get('Access-Control-Allow-Origin')).toBe('https://vientonorte.io');

    const statsExtra = await call('/stats/extra', { headers: { Origin: 'https://vientonorte.io' } }, env);
    expect(statsExtra.status).toBe(404);
  });
});

describe('health y contact siguen', () => {
  it('GET /api/health → 200', async () => {
    const { env } = makeEnv();
    const res = await call('/api/health', { headers: { Origin: 'https://vientonorte.io' } }, env);
    expect(res.status).toBe(200);
    expect(res.headers.get('Access-Control-Allow-Origin')).toBe('https://vientonorte.io');
    const body = await res.json();
    expect(body).toMatchObject({ ok: true, service: 'vientonorte-api', kv: true });
    expect(Number.isNaN(Date.parse(body.time))).toBe(false);
  });

  it('POST /api/contact sigue guardando el lead y avisando por EMAIL', async () => {
    const { env, kv } = makeEnv();
    const send = vi.fn().mockResolvedValue(undefined);
    env.EMAIL = { send };
    const res = await call(
      '/api/contact',
      {
        method: 'POST',
        headers: { Origin: 'https://vientonorte.io', 'Content-Type': 'application/json' },
        body: {
          name: 'Ana Prueba',
          email: 'ana@empresa.cl',
          message: 'Quiero una auditoría de accesibilidad.',
          consent: true,
          formStartedAt: Date.now() - 10_000,
        },
      },
      env
    );
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toMatchObject({ ok: true, emailed: true });
    expect(data.leadId).toMatch(/^lead_/);
    expect(send).toHaveBeenCalled();
    expect([...kv.store.keys()].some((key) => key.startsWith('qr:'))).toBe(false);
    expect(kv.store.has('vn:leads')).toBe(true);
  });
});
