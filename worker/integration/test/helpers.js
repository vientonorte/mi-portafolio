import { env } from 'cloudflare:test';
import { vi } from 'vitest';
import worker from '../../src/index.js';

export const ORIGIN = 'https://vientonorte.io';
export const BASE = 'https://contact.vientonorte.io';

/** Mock del binding send_email: registra cada mensaje que el worker mandaría. */
export function makeEmailMock() {
  return { send: vi.fn(async () => undefined) };
}

/**
 * Mock del fetch saliente (FormSubmit, GA4 Measurement Protocol). Cualquier URL no
 * prevista hace fallar el test: no hay red en estos tests.
 */
export function mockOutbound({ formsubmit = 'ok' } = {}) {
  const calls = [];
  const spy = vi.spyOn(globalThis, 'fetch').mockImplementation(async (input, init = {}) => {
    const url = typeof input === 'string' ? input : input.url;
    const body = init.body ? JSON.parse(init.body) : null;
    calls.push({ url, body });
    if (url.startsWith('https://formsubmit.co/ajax/')) {
      if (formsubmit === 'ok') return Response.json({ success: 'true' });
      return Response.json({ success: 'false', message: 'rejected' }, { status: 200 });
    }
    if (url.startsWith('https://www.google-analytics.com/mp/collect')) {
      return new Response(null, { status: 204 });
    }
    throw new Error(`fetch saliente no mockeado: ${url}`);
  });
  return { spy, calls };
}

/** Llama al fetch handler real con el env de Miniflare (KV real) + overrides (EMAIL mock, secretos). */
export async function call(path, { method = 'GET', body, origin = ORIGIN, headers = {}, envOverrides = {} } = {}) {
  const h = new Headers(headers);
  if (origin) h.set('Origin', origin);
  if (body !== undefined && !h.has('Content-Type')) h.set('Content-Type', 'application/json');
  const request = new Request(`${BASE}${path}`, {
    method,
    headers: h,
    body: body === undefined ? undefined : typeof body === 'string' ? body : JSON.stringify(body),
  });
  return worker.fetch(request, { ...env, ...envOverrides });
}

export async function readCollection(key) {
  const raw = await env.ADMIN_KV.get(key);
  return raw ? JSON.parse(raw) : [];
}

export async function clearKv() {
  const { keys } = await env.ADMIN_KV.list();
  await Promise.all(keys.map((k) => env.ADMIN_KV.delete(k.name)));
}
