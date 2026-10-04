import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { call, clearKv, makeEmailMock, mockOutbound, readCollection } from './helpers.js';

// Puente Calendar → Worker (docs/CALENDAR-BOOKING-BRIDGE.md): el Apps Script hace
// POST /api/booking con eventId y X-VN-BOOKING-KEY. Aquí se simula ese request; no hay
// Apps Script ni red real. Comportamiento de main: H1 (#301) cambiará los marcados "H1".
const KEY = 'test-webhook-key';
const BRIDGE = {
  name: 'Ana Legal',
  email: 'ana@empresa.cl',
  origin: 'ads-a11y-landing',
  intent: 'kickoff',
  startAt: '2026-10-08T15:00:00-03:00',
  eventId: 'evt123abc',
  phone: '+56 9 1111 1111',
  website: 'https://empresa.cl',
};

describe('POST /api/booking · webhook Apps Script (mock)', () => {
  let EMAIL;
  beforeEach(async () => {
    await clearKv();
    EMAIL = makeEmailMock();
  });
  afterEach(() => vi.restoreAllMocks());

  it('con la clave correcta registra booking + lead en KV, avisa al inbox y confirma al visitante', async () => {
    const { calls } = mockOutbound({ formsubmit: 'ok' });
    const res = await call('/api/booking', {
      method: 'POST',
      body: BRIDGE,
      headers: { 'X-VN-BOOKING-KEY': KEY },
      envOverrides: { EMAIL, VN_BOOKING_WEBHOOK_KEY: KEY },
    });
    expect(res.status).toBe(201);
    const data = await res.json();
    expect(data).toMatchObject({ ok: true, emailed: true, booking: { status: 'pendiente' } });

    const bookings = await readCollection('vn:bookings');
    expect(bookings).toHaveLength(1);
    expect(bookings[0]).toMatchObject({ eventId: 'evt123abc', email: 'ana@empresa.cl' });
    const leads = await readCollection('vn:leads');
    expect(leads[0]).toMatchObject({ email: 'ana@empresa.cl', source: 'calendar', eventId: 'evt123abc' });

    const fs = calls.filter((c) => c.url.startsWith('https://formsubmit.co/ajax/'));
    expect(fs).toHaveLength(1);
    expect(fs[0].body._subject).toContain('VN · agenda · Ana Legal');

    expect(EMAIL.send).toHaveBeenCalledTimes(1);
    expect(EMAIL.send.mock.calls[0][0].to).toBe('ana@empresa.cl');
  });

  it('el mismo eventId dos veces deduplica (deduped:true, un solo booking)', async () => {
    mockOutbound();
    const opts = {
      method: 'POST',
      body: BRIDGE,
      headers: { 'X-VN-BOOKING-KEY': KEY },
      envOverrides: { EMAIL, VN_BOOKING_WEBHOOK_KEY: KEY },
    };
    await call('/api/booking', opts);
    const res = await call('/api/booking', opts);
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ ok: true, deduped: true });
    expect(await readCollection('vn:bookings')).toHaveLength(1);
  });

  it('clave incorrecta → 401 sin KV ni correo', async () => {
    const { spy } = mockOutbound();
    const res = await call('/api/booking', {
      method: 'POST',
      body: BRIDGE,
      headers: { 'X-VN-BOOKING-KEY': 'wrong' },
      envOverrides: { EMAIL, VN_BOOKING_WEBHOOK_KEY: KEY },
    });
    expect(res.status).toBe(401);
    expect(await readCollection('vn:bookings')).toHaveLength(0);
    expect(EMAIL.send).not.toHaveBeenCalled();
    expect(spy).not.toHaveBeenCalled();
  });

  it('H1 · sin secreto configurado acepta eventId sin header (main; #301 lo cambia a 401)', async () => {
    mockOutbound();
    const res = await call('/api/booking', { method: 'POST', body: BRIDGE, envOverrides: { EMAIL } });
    expect(res.status).toBe(201);
  });

  it('H1 · click del front sin eventId confirma por correo al email del request (main; #301 lo elimina)', async () => {
    mockOutbound();
    const { eventId: _omit, ...click } = BRIDGE;
    const res = await call('/api/booking', { method: 'POST', body: click, envOverrides: { EMAIL } });
    expect(res.status).toBe(201);
    expect(EMAIL.send.mock.calls.some((c) => c[0].to === 'ana@empresa.cl')).toBe(true);
  });

  it('JSON inválido → 400', async () => {
    mockOutbound();
    const res = await call('/api/booking', { method: 'POST', body: '{', envOverrides: { EMAIL } });
    expect(res.status).toBe(400);
  });
});
