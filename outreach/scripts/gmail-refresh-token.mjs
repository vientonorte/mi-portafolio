#!/usr/bin/env node
// Local only. CI does not run this file.
// Obtains a refresh token for https://www.googleapis.com/auth/gmail.send and
// prints that token to this terminal. It does not write a file and it does
// not print the token on stderr.

import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import http from "node:http";

const SCOPE = "https://www.googleapis.com/auth/gmail.send";
const PORT = 8765;
const REDIRECT = `http://127.0.0.1:${PORT}/`;
const TIMEOUT_MS = 10 * 60 * 1000;

const clientId = process.env.GMAIL_CLIENT_ID?.trim();
const clientSecret = process.env.GMAIL_CLIENT_SECRET?.trim();

if (!clientId || !clientSecret || /[\r\n]/.test(clientId) || /[\r\n]/.test(clientSecret)) {
  console.error("Faltan GMAIL_CLIENT_ID y GMAIL_CLIENT_SECRET en el entorno.");
  console.error("Cargalos con read -rs, sin escribirlos en la línea de comandos:");
  console.error("read -rs GMAIL_CLIENT_ID && export GMAIL_CLIENT_ID");
  console.error("read -rs GMAIL_CLIENT_SECRET && export GMAIL_CLIENT_SECRET");
  console.error("node scripts/gmail-refresh-token.mjs");
  process.exit(1);
}

const state = randomBytes(32).toString("base64url");
const verifier = randomBytes(32).toString("base64url");
const challenge = createHash("sha256").update(verifier).digest("base64url");

const auth = new URL("https://accounts.google.com/o/oauth2/v2/auth");
auth.searchParams.set("client_id", clientId);
auth.searchParams.set("redirect_uri", REDIRECT);
auth.searchParams.set("response_type", "code");
auth.searchParams.set("scope", SCOPE);
auth.searchParams.set("access_type", "offline");
auth.searchParams.set("prompt", "consent");
auth.searchParams.set("include_granted_scopes", "false");
auth.searchParams.set("state", state);
auth.searchParams.set("code_challenge", challenge);
auth.searchParams.set("code_challenge_method", "S256");

console.error("Abrí esta URL con la cuenta Gmail dedicada de Viento Norte:");
console.error(auth.toString());
console.error(`Esperando el redirect en ${REDIRECT}`);
console.error("El refresh token va a salir en esta terminal. No lo pegues en un chat, un issue ni en la bandeja de prueba.");

const server = http.createServer(async (request, response) => {
  let url;
  try {
    url = new URL(request.url || "/", REDIRECT);
  } catch {
    response.writeHead(400, { "content-type": "text/plain; charset=utf-8" });
    response.end("Redirect inválido.\n");
    return;
  }

  if (url.pathname !== "/") {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("No encontrado.\n");
    return;
  }

  const oauthError = url.searchParams.get("error");
  const code = url.searchParams.get("code");
  const returnedState = url.searchParams.get("state");
  if (!sameState(returnedState, state)) {
    response.writeHead(400, { "content-type": "text/plain; charset=utf-8" });
    response.end("El state no coincide. Podés cerrar esta pestaña.\n");
    console.error("El state del redirect no coincide. No se imprime un token.");
    shutdown(1);
    return;
  }
  if (oauthError || !code) {
    response.writeHead(400, { "content-type": "text/plain; charset=utf-8" });
    response.end("No se recibió el código. Podés cerrar esta pestaña.\n");
    console.error(oauthError ? `OAuth devolvió un error: ${oauthError}` : "OAuth no devolvió código.");
    shutdown(1);
    return;
  }

  try {
    const exchanged = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: REDIRECT,
        grant_type: "authorization_code",
        code_verifier: verifier,
      }),
    });
    const data = await exchanged.json().catch(() => ({}));
    const scopes = typeof data.scope === "string"
      ? data.scope.split(/\s+/).filter(Boolean)
      : [];
    if (!exchanged.ok || typeof data.refresh_token !== "string" || data.refresh_token.length < 8 || scopes.length !== 1 || scopes[0] !== SCOPE) {
      response.writeHead(400, { "content-type": "text/plain; charset=utf-8" });
      response.end("No se imprime el token. Volvé a la terminal.\n");
      if (!exchanged.ok || typeof data.refresh_token !== "string") {
        console.error(`Google no entregó refresh_token. HTTP ${exchanged.status}.`);
        if (typeof data.error === "string") console.error(data.error);
      } else {
        console.error("El token no es exactamente gmail.send. No se imprime.");
      }
      shutdown(1);
      return;
    }
    process.stdout.write(`${data.refresh_token}\n`);
    console.error("Refresh token impreso arriba. Cargalo con wrangler secret put GMAIL_REFRESH_TOKEN.");
    response.writeHead(200, { "content-type": "text/plain; charset=utf-8" });
    response.end("Listo. Volvé a la terminal. No copies el token a un chat ni a un log.\n");
    shutdown(0);
  } catch {
    response.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
    response.end("Falló el canje. Volvé a la terminal.\n");
    console.error("Falló el canje del código.");
    shutdown(1);
  }
});

function sameState(left, right) {
  if (typeof left !== "string" || typeof right !== "string") return false;
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  if (a.length !== b.length || a.length === 0) return false;
  return timingSafeEqual(a, b);
}

function shutdown(code) {
  server.close();
  setTimeout(() => process.exit(code), 50);
}

server.listen(PORT, "127.0.0.1", () => {
  setTimeout(() => {
    console.error("Pasaron 10 minutos sin redirect. No se imprimió un token.");
    shutdown(1);
  }, TIMEOUT_MS).unref();
});
