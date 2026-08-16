import { corsHeaders, isAllowedOrigin, json } from './lib/cors.js';
import { readSession, clearSessionCookie } from './lib/session.js';
import { handleContact } from './contact.js';
import { handleGithubAuth, handleGithubCallback } from './admin/github-auth.js';
import { handleBootstrap, handleBootstrapForm, handleBootstrapPage } from './admin/bootstrap.js';
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
  handleCreateImage,
  handleUploadImage,
  handlePatchImage,
  handleDeleteImage,
  handlePublishImage,
} from './admin/images.js';
import {
  handleCreateBooking,
  handleCreateDiagnostico,
  handleCreateLead,
  handleGetCases,
  handleGetCompany,
  handleGetServices,
  handleHealth,
} from './api/public.js';
import {
  handleAdminCatalog,
  handleListCollection,
  handleOverview,
  handlePatchCollection,
} from './api/admin-data.js';
import { handleMcp } from './mcp/server.js';
import { handleShare } from './api/share.js';
import { handleDemoHeatIngest, handleDemoHeatRead } from './api/demo-heat.js';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === '/admin-gate' && request.method === 'GET') {
      return handleBootstrapPage();
    }
    if (path === '/api/admin/auth/bootstrap-form' && request.method === 'POST') {
      return handleBootstrapForm(request, env);
    }
    if (path === '/s' || path.startsWith('/s/')) {
      return handleShare(url);
    }

    const origin = isAllowedOrigin(request, env);
    if (!origin) return new Response('Forbidden', { status: 403 });

    const cors = corsHeaders(origin);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors });
    }

    // ── Health + catálogo público ──
    if (path === '/api/health' && request.method === 'GET') {
      return handleHealth(env, cors);
    }
    if (path === '/api/services' && request.method === 'GET') {
      return handleGetServices(cors);
    }
    if (path === '/api/cases' && request.method === 'GET') {
      return handleGetCases(cors);
    }
    if (path === '/api/company' && request.method === 'GET') {
      return handleGetCompany(cors);
    }

    // ── Escritura pública ──
    if (path === '/api/contact' && request.method === 'POST') {
      return handleContact(request, env, cors);
    }
    if (path === '/api/leads' && request.method === 'POST') {
      return handleCreateLead(request, env, cors);
    }
    if (path === '/api/booking' && request.method === 'POST') {
      return handleCreateBooking(request, env, cors);
    }
    if (path === '/api/diagnostico' && request.method === 'POST') {
      return handleCreateDiagnostico(request, env, cors);
    }
    if (path === '/api/demo/heat' && request.method === 'POST') {
      return handleDemoHeatIngest(request, env, cors);
    }

    // ── MCP (JSON-RPC) ──
    if (path === '/mcp' || path === '/api/mcp') {
      return handleMcp(request, env, cors);
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
    if (path === '/api/admin/auth/bootstrap' && request.method === 'POST') {
      return handleBootstrap(request, env, cors);
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

    // ── Admin data browser ──
    if (path === '/api/admin/overview' && request.method === 'GET') {
      return handleOverview(request, env, cors);
    }
    if (path === '/api/admin/demo/heat' && request.method === 'GET') {
      return handleDemoHeatRead(request, env, cors);
    }
    if (path === '/api/admin/services' && request.method === 'GET') {
      return handleAdminCatalog(request, env, cors, 'services');
    }
    if (path === '/api/admin/cases' && request.method === 'GET') {
      return handleAdminCatalog(request, env, cors, 'cases');
    }

    const collectionMatch = path.match(/^\/api\/admin\/(leads|bookings|diagnosticos)$/);
    if (collectionMatch && request.method === 'GET') {
      return handleListCollection(request, env, cors, collectionMatch[1]);
    }

    const collectionItemMatch = path.match(
      /^\/api\/admin\/(leads|bookings|diagnosticos)\/([^/]+)$/
    );
    if (collectionItemMatch && request.method === 'PATCH') {
      return handlePatchCollection(
        request,
        env,
        cors,
        collectionItemMatch[1],
        decodeURIComponent(collectionItemMatch[2])
      );
    }

    // ── Imágenes admin ──
    if (path === '/api/admin/images' && request.method === 'GET') {
      return handleListImages(request, env, cors);
    }
    if (path === '/api/admin/images' && request.method === 'POST') {
      return handleCreateImage(request, env, cors);
    }

    const publishMatch = path.match(/^\/api\/admin\/images\/([^/]+)\/publish$/);
    if (publishMatch && request.method === 'POST') {
      return handlePublishImage(request, env, cors, decodeURIComponent(publishMatch[1]));
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
