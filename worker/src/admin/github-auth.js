import { json } from '../lib/cors.js';
import { createSessionCookie } from '../lib/session.js';

const GITHUB_AUTH = 'https://github.com/login/oauth/authorize';
const GITHUB_TOKEN = 'https://github.com/login/oauth/access_token';
const GITHUB_USER = 'https://api.github.com/user';

export async function handleGithubAuth(request, env, cors, url) {
  const returnTo = url.searchParams.get('return_to') || '/admin/fotos';
  const clientId = env.GITHUB_CLIENT_ID;
  const redirectUri = `${url.origin}/api/admin/auth/github/callback`;

  if (!clientId) {
    return json({ ok: false, error: 'GITHUB_CLIENT_ID no configurado' }, 503, cors);
  }

  const state = crypto.randomUUID();
  await env.ADMIN_KV.put(`oauth_state:${state}`, returnTo, { expirationTtl: 600 });

  const authUrl = new URL(GITHUB_AUTH);
  authUrl.searchParams.set('client_id', clientId);
  authUrl.searchParams.set('redirect_uri', redirectUri);
  authUrl.searchParams.set('scope', 'read:user');
  authUrl.searchParams.set('state', state);

  return Response.redirect(authUrl.toString(), 302);
}

export async function handleGithubCallback(request, env, cors, url) {
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  if (!code || !state) {
    return json({ ok: false, error: 'Callback inválido' }, 400, cors);
  }

  const returnTo = await env.ADMIN_KV.get(`oauth_state:${state}`);
  await env.ADMIN_KV.delete(`oauth_state:${state}`);
  if (!returnTo) {
    return json({ ok: false, error: 'State expirado' }, 400, cors);
  }

  const clientId = env.GITHUB_CLIENT_ID;
  const clientSecret = env.GITHUB_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return json({ ok: false, error: 'OAuth GitHub no configurado' }, 503, cors);
  }

  const tokenRes = await fetch(GITHUB_TOKEN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: `${url.origin}/api/admin/auth/github/callback`,
    }),
  });

  const tokenData = await tokenRes.json();
  if (!tokenData.access_token) {
    return json({ ok: false, error: 'No se obtuvo token de GitHub' }, 401, cors);
  }

  const userRes = await fetch(GITHUB_USER, {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
      Accept: 'application/vnd.github+json',
      'User-Agent': 'mi-portafolio-admin',
    },
  });

  const user = await userRes.json();
  const allowed = (env.ADMIN_GITHUB_USER || 'vientonorte').toLowerCase();

  if (!user.login || user.login.toLowerCase() !== allowed) {
    return json(
      { ok: false, error: `Acceso restringido a @${allowed}` },
      403,
      cors
    );
  }

  const cookie = await createSessionCookie(
    { login: user.login, name: user.name || user.login, avatar: user.avatar_url },
    env
  );

  const siteOrigin = (env.ALLOWED_ORIGIN || '').split(',')[0].trim();
  const redirect = `${siteOrigin}/#${returnTo.startsWith('/') ? returnTo : `/${returnTo}`}`;

  return new Response(null, {
    status: 302,
    headers: {
      Location: redirect,
      'Set-Cookie': cookie,
      ...cors,
    },
  });
}