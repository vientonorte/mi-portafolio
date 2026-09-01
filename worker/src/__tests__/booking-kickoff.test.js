import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { handleCreateBooking } from '../api/public.js';

const CORS = { 'Access-Control-Allow-Origin': '*' };

function makeRequest(body, headers = {}) {
  return new Request('https://contact.vientonorte.io/api/booking', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(body),
  });
}

function makeEnv(overrides = {}) {
  return {
    EMAIL: { send: vi.fn().mockResolvedValue(undefined) },
    ...overrides,
  };
}

describe('handleCreateBooking · kickoff funnel (ads-a11y-landing)', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ success: 'false' }), { status: 200 })
      )
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('sends the kickoff template to the visitor when origin=ads-a11y-landing', async () => {
    const env = makeEnv();
    const request = makeRequest({
      name: 'Ana Legal',
      email: 'ana@empresa.cl',
      origin: 'ads-a11y-landing',
      intent: 'kickoff',
      startAt: '2026-09-08T15:00:00-04:00',
    });

    const res = await handleCreateBooking(request, env, CORS);
    expect(res.status).toBe(201);

    const visitorMail = env.EMAIL.send.mock.calls
      .map((call) => call[0])
      .find((mail) => mail.to === 'ana@empresa.cl');
    expect(visitorMail).toBeDefined();
    expect(visitorMail.subject).toMatch(/30 min/);
    expect(visitorMail.text).toMatch(/WCAG 2\.4\.7/);
    expect(visitorMail.text).toContain('$500.000 CLP');
  });

  it('keeps the generic confirmation for other origins', async () => {
    const env = makeEnv();
    const request = makeRequest({
      name: 'Cliente Cualquiera',
      email: 'cliente@empresa.cl',
      origin: 'sticky-cta',
      intent: 'consulting',
    });

    const res = await handleCreateBooking(request, env, CORS);
    expect(res.status).toBe(201);

    const visitorMail = env.EMAIL.send.mock.calls
      .map((call) => call[0])
      .find((mail) => mail.to === 'cliente@empresa.cl');
    expect(visitorMail).toBeDefined();
    expect(visitorMail.subject).toBe('Tu cita con Viento Norte está registrada');
    expect(visitorMail.text).not.toMatch(/WCAG 2\.4\.7/);
  });

  it('rejects a booking with eventId and a wrong X-VN-BOOKING-KEY when the secret is configured', async () => {
    const env = makeEnv({ VN_BOOKING_WEBHOOK_KEY: 'super-secret' });
    const request = makeRequest(
      {
        name: 'Ana Legal',
        email: 'ana@empresa.cl',
        origin: 'ads-a11y-landing',
        intent: 'kickoff',
        eventId: 'evt-123',
      },
      { 'X-VN-BOOKING-KEY': 'wrong' }
    );

    const res = await handleCreateBooking(request, env, CORS);
    expect(res.status).toBe(401);
    expect(env.EMAIL.send).not.toHaveBeenCalled();
  });

  it('accepts a booking with eventId and the correct X-VN-BOOKING-KEY', async () => {
    const env = makeEnv({ VN_BOOKING_WEBHOOK_KEY: 'super-secret' });
    const request = makeRequest(
      {
        name: 'Ana Legal',
        email: 'ana@empresa.cl',
        origin: 'ads-a11y-landing',
        intent: 'kickoff',
        eventId: 'evt-123',
        startAt: '2026-09-08T15:00:00-04:00',
      },
      { 'X-VN-BOOKING-KEY': 'super-secret' }
    );

    const res = await handleCreateBooking(request, env, CORS);
    expect(res.status).toBe(201);
    expect(
      env.EMAIL.send.mock.calls.some((call) => call[0].to === 'ana@empresa.cl')
    ).toBe(true);
  });

  it('still accepts requests with eventId but no header when no secret is configured', async () => {
    const env = makeEnv();
    const request = makeRequest({
      name: 'Ana Legal',
      email: 'ana@empresa.cl',
      origin: 'ads-a11y-landing',
      intent: 'kickoff',
      eventId: 'evt-456',
    });

    const res = await handleCreateBooking(request, env, CORS);
    expect(res.status).toBe(201);
  });
});
