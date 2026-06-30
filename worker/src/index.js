import { corsHeaders, isAllowedOrigin, json } from './lib/cors.js';
import { readSession, clearSessionCookie } from './lib/session.js';
import { handleContact } from './contact.js';
import { handleGithubAuth, handleGithubCallback } from './admin/github-auth.js';
import {
  handlePasskeyRegisterBegin,
  handlePasskeyRegisterFinish,
  handlePasskeyLoginBegin,
  handlePasskeyLoginFinish,
  hasPasskey,
} from './admin/passkey.js';
import {
  handlePublicManifest,
  handleListImages,
  handleUploadImage,
  handlePatchImage,
  handleDeleteImage,
} from './admin/images.js';

export default {
  async fetch(request, env) {
    const origin = isAllowedOrigin(request, env);
    if (!origin) return new Response('Forbidden', { status: 403 });

    const cors = corsHeaders(origin);
    const url = new URL(request.url);
    const path = url.pathname;

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors });
    }

    // ── Contact (existente) ──
    if (path === '/api/contact' && request.method === 'POST') {
      return handleContact(request, env, cors);
    }

    // ── Manifest público ──
    if (path === '/api/images/manifest' && request.method === 'GET') {
      return handlePublicManifest(env, cors);
    }

    // ── GitHub OAuth (@vientonorte) ──
    if (path === '/api/admin/auth/github' && request.method === 'GET') {
      return handleGithubAuth(request, env, cors, url);
    }
    if (path === '/api/admin/auth/github/callback' && request.method === 'GET') {
      return handleGithubCallback(request, env, cors, url);
    }

    // ── Passkey ──
    if (path === '/api/admin/auth/passkey/register/begin' && request.method === 'POST') {
      return handlePasskeyRegisterBegin(request, env, cors);
    }
    if (path === '/api/admin/auth/passkey/register/finish' && request.method === 'POST') {
      return handlePasskeyRegisterFinish(request, env, cors);
    }
    if (path === '/api/admin/auth/passkey/login/begin' && request.method === 'POST') {
      return handlePasskeyLoginBegin(request, env, cors);
    }
    if (path === '/api/admin/auth/passkey/login/finish' && request.method === 'POST') {
      return handlePasskeyLoginFinish(request, env, cors);
    }

    // ── Sesión ──
    if (path === '/api/admin/auth/session' && request.method === 'GET') {
      const user = await readSession(request, env);
      const passkey = await hasPasskey(env);
      if (!user) return json({ ok: false }, 200, cors);
      return json({ ok: true, user: user.login, passkeyRegistered: passkey }, 200, cors);
    }
    if (path === '/api/admin/auth/logout' && request.method === 'POST') {
      return json({ ok: true }, 200, { ...cors, 'Set-Cookie': clearSessionCookie() });
    }

    // ── Imágenes admin ──
    if (path === '/api/admin/images' && request.method === 'GET') {
      return handleListImages(request, env, cors);
    }

    const imageMatch = path.match(/^\/api\/admin\/images\/([^/]+)$/);
    if (imageMatch) {
      const imageId = decodeURIComponent(imageMatch[1]);
      if (request.method === 'POST') return handleUploadImage(request, env, cors, imageId);
      if (request.method === 'PATCH') return handlePatchImage(request, env, cors, imageId);
      if (request.method === 'DELETE') return handleDeleteImage(request, env, cors, imageId);
    }

    return json({ ok: false, error: 'Not found' }, 404, cors);
  },
};