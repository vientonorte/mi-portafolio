import { describe, expect, it } from 'vitest';
import { buildGa4MpPayload, ga4MpConfigured } from '../lib/ga4-mp.js';

describe('ga4-mp', () => {
  it('is off without secret', () => {
    expect(ga4MpConfigured({})).toBe(false);
    expect(ga4MpConfigured({ GA4_MP_API_SECRET: 'x' })).toBe(true);
  });

  it('builds a collect payload without empty params', () => {
    const payload = buildGa4MpPayload({
      clientId: 'cid.1',
      eventName: 'book_call',
      params: { origin: 'sticky-cta', package_id: 'radar', skip: '' },
    });
    expect(payload.client_id).toBe('cid.1');
    expect(payload.events[0].name).toBe('book_call');
    expect(payload.events[0].params.origin).toBe('sticky-cta');
    expect(payload.events[0].params.package_id).toBe('radar');
    expect(payload.events[0].params.skip).toBeUndefined();
    expect(payload.events[0].params.engagement_time_msec).toBe(1);
  });
});
