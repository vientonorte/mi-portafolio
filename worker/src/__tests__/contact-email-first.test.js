import { afterEach, describe, expect, it, vi } from 'vitest';
import { handleContact } from '../contact.js';

/**
 * 13-oct · /api/contact avisa SOLO por Cloudflare Email (binding EMAIL). No hay fetch a
 * FormSubmit. Si EMAIL falla o falta, el lead queda en KV y responde 200 emailed:false.
 */
const CORS = { 'Access-Control-Allow-Origin': '*' };

function makeRequest() {
  return new Request('https://contact.vientonorte.io/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Ana Prueba',
      email: 'ana@empresa.cl',
      message: 'Quiero una auditoría de accesibilidad.',
      consent: true,
      // Inofensivo sin H2; con H2 (#303) pasa el tiempo mínimo de llenado.
      formStartedAt: Date.now() - 10_000,
    }),
  });
}

function makeKv() {
  const store = new Map();
  return {
    get: vi.fn(async (key) => store.get(key) ?? null),
    put: vi.fn(async (key, value) => {
      store.set(key, value);
    }),
  };
}

function makeEnv(extra = {}) {
  return { ADMIN_KV: makeKv(), CONTACT_INBOX: 'inbox@vientonorte.test', ...extra };
}

describe('handleContact · Cloudflare Email primero, sin FormSubmit', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('avisa al inbox por EMAIL y nunca llama a formsubmit.co', async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error('no network in tests'));
    vi.stubGlobal('fetch', fetchMock);
    const send = vi.fn().mockResolvedValue(undefined);
    const env = makeEnv({ EMAIL: { send } });

    const res = await handleContact(makeRequest(), env, CORS);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toMatchObject({ ok: true, emailed: true });
    expect(send.mock.calls[0][0]).toMatchObject({
      to: 'inbox@vientonorte.test',
      replyTo: { email: 'ana@empresa.cl', name: 'Ana Prueba' },
    });
    const urls = fetchMock.mock.calls.map((c) => String(c[0]));
    expect(urls.some((u) => u.includes('formsubmit.co'))).toBe(false);
  });

  it('si EMAIL falla: 200, emailed:false, lead guardado, sin fallback a terceros', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    const fetchMock = vi.fn().mockRejectedValue(new Error('no network in tests'));
    vi.stubGlobal('fetch', fetchMock);
    const send = vi.fn().mockRejectedValue(new Error('E_SEND_FAILED'));
    const env = makeEnv({ EMAIL: { send } });

    const res = await handleContact(makeRequest(), env, CORS);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toMatchObject({ ok: true, emailed: false });
    expect(data.leadId).toMatch(/^lead_/);
    expect(env.ADMIN_KV.put).toHaveBeenCalled();
    expect(fetchMock.mock.calls.some((c) => String(c[0]).includes('formsubmit.co'))).toBe(false);
  });

  it('sin binding EMAIL: 200, emailed:false y el lead queda en KV', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    const fetchMock = vi.fn().mockRejectedValue(new Error('no network in tests'));
    vi.stubGlobal('fetch', fetchMock);
    const env = makeEnv();

    const res = await handleContact(makeRequest(), env, CORS);
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ ok: true, emailed: false });
    expect(env.ADMIN_KV.put).toHaveBeenCalled();
    expect(fetchMock.mock.calls.some((c) => String(c[0]).includes('formsubmit.co'))).toBe(false);
  });
});
