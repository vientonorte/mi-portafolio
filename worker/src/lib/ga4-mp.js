/**
 * GA4 Measurement Protocol (server). Secret: wrangler secret put GA4_MP_API_SECRET
 * Never log the secret. Skip if unset.
 */

const MP_URL = 'https://www.google-analytics.com/mp/collect';
const DEFAULT_MEASUREMENT_ID = 'G-G7JXJKGCDV';

export function ga4MpConfigured(env) {
  return Boolean(env?.GA4_MP_API_SECRET && (env.GA4_MEASUREMENT_ID || DEFAULT_MEASUREMENT_ID));
}

export function buildGa4MpPayload({
  clientId,
  eventName,
  params = {},
}) {
  const clean = {};
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === '') continue;
    clean[key] = value;
  }
  return {
    client_id: clientId || crypto.randomUUID(),
    events: [
      {
        name: eventName,
        params: {
          engagement_time_msec: 1,
          ...clean,
        },
      },
    ],
  };
}

export async function sendGa4MpEvent(env, { eventName, params, clientId }) {
  const secret = env?.GA4_MP_API_SECRET;
  const measurementId = env?.GA4_MEASUREMENT_ID || DEFAULT_MEASUREMENT_ID;
  if (!secret || !eventName) return { ok: false, skipped: true };

  const payload = buildGa4MpPayload({ clientId, eventName, params });
  const url = `${MP_URL}?measurement_id=${encodeURIComponent(measurementId)}&api_secret=${encodeURIComponent(secret)}`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return { ok: res.ok, status: res.status };
  } catch (err) {
    console.warn('[ga4-mp] send failed:', err?.message || err);
    return { ok: false, error: 'network' };
  }
}
