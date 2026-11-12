import { handleRequest } from "../src/index.js";
import { isLiveMode } from "../src/store.js";

export { OutreachCounter } from "../src/counter.js";

const ISSUER = "https://vn.cloudflareaccess.com";
const AUD = "aud-tag-0123456789";

function b64url(bytes) {
  let bin = "";
  for (const byte of bytes) bin += String.fromCharCode(byte);
  return btoa(bin).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

async function signToken(privateKey) {
  const header = b64url(new TextEncoder().encode(JSON.stringify({
    alg: "RS256",
    kid: "smoke-key",
    typ: "JWT",
  })));
  const now = Math.floor(Date.now() / 1000);
  const payload = b64url(new TextEncoder().encode(JSON.stringify({
    iss: ISSUER,
    aud: AUD,
    exp: now + 600,
    iat: now,
    type: "app",
  })));
  const input = `${header}.${payload}`;
  const signature = await crypto.subtle.sign(
    { name: "RSASSA-PKCS1-v1_5" },
    privateKey,
    new TextEncoder().encode(input),
  );
  return `${input}.${b64url(new Uint8Array(signature))}`;
}

function providerFetch(publicJwk) {
  const calls = [];
  const impl = async (input) => {
    const url = typeof input === "string" ? input : input.url;
    calls.push(url);
    if (url === `${ISSUER}/cdn-cgi/access/certs`) {
      return Response.json({ keys: [publicJwk] });
    }
    if (url === "https://oauth2.googleapis.com/token") {
      return Response.json({ access_token: "ya29.smoke-token", expires_in: 3600, token_type: "Bearer" });
    }
    if (url === "https://gmail.googleapis.com/gmail/v1/users/me/messages/send") {
      return Response.json({ id: "gmail_msg_smoke" });
    }
    return new Response("blocked", { status: 599 });
  };
  return {
    impl,
    gmail() {
      return calls.filter((url) => url === "https://gmail.googleapis.com/gmail/v1/users/me/messages/send").length;
    },
  };
}

function sendRequest(token) {
  return new Request("https://outreach.internal/send", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cf-access-jwt-assertion": token,
    },
    body: JSON.stringify({
      to: "prueba@example.com",
      subject: "Humo",
      fuente: "https://ejemplo.cl/equipo",
      base: "fuente_publica",
      fields: {
        empresa: "Optica Sur",
        hallazgo: "El boton de contacto tiene contraste bajo.",
        servicio_ancla: "revision-gratis",
      },
    }),
  });
}

export default {
  async fetch(request, env) {
    if (new URL(request.url).pathname !== "/__smoke") {
      return handleRequest(request, env);
    }

    const pair = await crypto.subtle.generateKey(
      {
        name: "RSASSA-PKCS1-v1_5",
        modulusLength: 2048,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: "SHA-256",
      },
      true,
      ["sign", "verify"],
    );
    const publicJwk = await crypto.subtle.exportKey("jwk", pair.publicKey);
    publicJwk.kid = "smoke-key";
    publicJwk.alg = "RS256";
    publicJwk.use = "sig";
    const token = await signToken(pair.privateKey);
    const net = providerFetch(publicJwk);
    const shared = {
      OUTREACH_KV: env.OUTREACH_KV,
      OUTREACH_MODE: "live",
      TEAM_DOMAIN: ISSUER,
      POLICY_AUD: AUD,
      GMAIL_CLIENT_ID: "test-client-id",
      GMAIL_CLIENT_SECRET: "test-client-secret",
      GMAIL_REFRESH_TOKEN: "test-refresh-token",
      SENDER_NAME: "Viento Norte",
      SENDER_EMAIL: "dedicated-vn@gmail.com",
      TEST_ALLOWLIST: "prueba@example.com",
    };
    const inWindow = new Date("2026-07-13T21:20:00.000Z");

    const gated = await handleRequest(
      sendRequest(token),
      shared,
      net.impl,
      inWindow,
    );
    const gatedBody = await gated.json();
    const gmailAfterGate = net.gmail();

    const opened = await handleRequest(
      sendRequest(token),
      { ...shared, OUTREACH_COUNTER: env.OUTREACH_COUNTER },
      net.impl,
      inWindow,
    );
    const openedBody = await opened.json();

    return Response.json({
      counter: typeof env.OUTREACH_COUNTER,
      live: isLiveMode({
        OUTREACH_MODE: "live",
        OUTREACH_COUNTER: env.OUTREACH_COUNTER,
      }),
      gate: {
        status: gated.status,
        error: gatedBody.error ?? null,
        gmail: gmailAfterGate,
      },
      open: {
        status: opened.status,
        error: openedBody.error ?? null,
        gmail: net.gmail() - gmailAfterGate,
      },
    });
  },
};
