import type { ImageRegistryEntry } from "../data/image-registry";
import { ADMIN_ROUTES } from "./admin-config";

export interface AdminImageRecord {
  id: string;
  url: string;
  alt: string;
  path: string;
  category: string;
  label: string;
  role?: string;
  custom?: boolean;
  overridden: boolean;
  updatedAt?: string;
  prUrl?: string;
  prNumber?: number;
}

export interface ImagePublishResult {
  image: AdminImageRecord;
  publish?: { number: number; html_url: string; path?: string };
  publishError?: string;
}

interface ApiOptions {
  credentials?: RequestCredentials;
}

async function adminFetch<T>(
  url: string,
  init?: RequestInit,
  options: ApiOptions = { credentials: "include" }
): Promise<T> {
  const res = await fetch(url, {
    ...init,
    credentials: options.credentials ?? "include",
    headers: {
      ...(init?.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
      ...init?.headers,
    },
  });
  const data = (await res.json().catch(() => ({}))) as T & { error?: string };
  if (!res.ok) {
    throw new Error((data as { error?: string }).error ?? `Error ${res.status}`);
  }
  return data;
}

export type AdminCollection = "leads" | "bookings" | "diagnosticos";

export interface AdminRecord {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  status?: string;
  name?: string | { es?: string; en?: string };
  title?: string | { es?: string; en?: string };
  email?: string;
  message?: string;
  intent?: string;
  source?: string;
  notes?: string;
  calendarUrl?: string;
  friction?: string;
  company?: string;
  url?: string;
  kind?: string;
  active?: boolean;
  published?: boolean;
  response?: { es?: string; en?: string };
  [key: string]: unknown;
}

export interface AdminOverview {
  today: { leads: number; bookings: number; diagnosticos: number };
  week: { leads: number; bookings: number; diagnosticos: number };
  totals: {
    leads: number;
    bookings: number;
    diagnosticos: number;
    services: number;
    cases: number;
  };
  recent: {
    leads: AdminRecord[];
    bookings: AdminRecord[];
    diagnosticos: AdminRecord[];
  };
}

export async function adminBootstrap(code: string): Promise<{ ok: boolean; user?: string }> {
  return adminFetch(ADMIN_ROUTES.bootstrap, {
    method: "POST",
    body: JSON.stringify({ code }),
  });
}

export function startGithubLogin(returnTo = "/admin") {
  const url = new URL(ADMIN_ROUTES.githubStart);
  url.searchParams.set("return_to", returnTo);
  window.location.href = url.toString();
}

export async function getAdminSession(): Promise<{ ok: boolean; user?: string }> {
  return adminFetch(ADMIN_ROUTES.session);
}

export async function adminLogout(): Promise<void> {
  await adminFetch(ADMIN_ROUTES.logout, { method: "POST" });
}

export async function listAdminImages(): Promise<AdminImageRecord[]> {
  const data = await adminFetch<{ images: AdminImageRecord[] }>(ADMIN_ROUTES.images);
  return data.images;
}

export async function createAdminImage(
  file: File,
  fields: { label: string; role: string; alt?: string }
): Promise<ImagePublishResult> {
  const form = new FormData();
  form.append("file", file);
  form.append("label", fields.label);
  form.append("role", fields.role);
  if (fields.alt) form.append("alt", fields.alt);
  return adminFetch<ImagePublishResult>(ADMIN_ROUTES.images, { method: "POST", body: form });
}

export async function uploadAdminImage(id: string, file: File, alt?: string): Promise<ImagePublishResult> {
  const form = new FormData();
  form.append("file", file);
  if (alt) form.append("alt", alt);
  const data = await adminFetch<ImagePublishResult>(
    `${ADMIN_ROUTES.images}/${encodeURIComponent(id)}`,
    { method: "POST", body: form }
  );
  return data;
}

export async function publishAdminImage(id: string): Promise<ImagePublishResult> {
  return adminFetch<ImagePublishResult>(
    `${ADMIN_ROUTES.images}/${encodeURIComponent(id)}/publish`,
    { method: "POST", body: "{}" }
  );
}

export async function updateAdminImageMeta(
  id: string,
  patch: string | { alt?: string; label?: string; role?: string }
): Promise<AdminImageRecord> {
  const body = typeof patch === "string" ? { alt: patch } : patch;
  const data = await adminFetch<{ image: AdminImageRecord }>(
    `${ADMIN_ROUTES.images}/${encodeURIComponent(id)}`,
    { method: "PATCH", body: JSON.stringify(body) }
  );
  return data.image;
}

export async function revertAdminImage(id: string): Promise<void> {
  await adminFetch(`${ADMIN_ROUTES.images}/${encodeURIComponent(id)}`, { method: "DELETE" });
}

export async function passkeyRegisterBegin(): Promise<PublicKeyCredentialCreationOptionsJSON> {
  const data = await adminFetch<{ options: PublicKeyCredentialCreationOptionsJSON }>(
    ADMIN_ROUTES.passkeyRegisterBegin,
    { method: "POST", body: "{}" }
  );
  return data.options;
}

export async function passkeyRegisterFinish(
  body: RegistrationResponseJSON
): Promise<{ ok: boolean }> {
  return adminFetch(ADMIN_ROUTES.passkeyRegisterFinish, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function passkeyLoginBegin(): Promise<PublicKeyCredentialRequestOptionsJSON> {
  const data = await adminFetch<{ options: PublicKeyCredentialRequestOptionsJSON }>(
    ADMIN_ROUTES.passkeyLoginBegin,
    { method: "POST", body: "{}" }
  );
  return data.options;
}

export async function passkeyLoginFinish(body: AuthenticationResponseJSON): Promise<{ ok: boolean }> {
  return adminFetch(ADMIN_ROUTES.passkeyLoginFinish, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function getAdminOverview(): Promise<AdminOverview> {
  const data = await adminFetch<{ overview: AdminOverview }>(ADMIN_ROUTES.overview);
  return data.overview;
}

export async function listAdminCollection(
  collection: AdminCollection,
  params: { q?: string; status?: string } = {}
): Promise<AdminRecord[]> {
  const url = new URL(ADMIN_ROUTES[collection]);
  if (params.q) url.searchParams.set("q", params.q);
  if (params.status) url.searchParams.set("status", params.status);
  const data = await adminFetch<{ items: AdminRecord[] }>(url.toString());
  return data.items;
}

export async function patchAdminRecord(
  collection: AdminCollection,
  id: string,
  patch: { status?: string; notes?: string }
): Promise<AdminRecord> {
  const data = await adminFetch<{ item: AdminRecord }>(
    `${ADMIN_ROUTES[collection]}/${encodeURIComponent(id)}`,
    { method: "PATCH", body: JSON.stringify(patch) }
  );
  return data.item;
}

export async function listAdminCatalog(kind: "services" | "cases"): Promise<AdminRecord[]> {
  const data = await adminFetch<{ items: AdminRecord[] }>(ADMIN_ROUTES[kind]);
  return data.items;
}

export function registryToAdminPreview(entry: ImageRegistryEntry): AdminImageRecord {
  return {
    id: entry.id,
    url: entry.defaultUrl,
    alt: entry.alt,
    path: entry.path,
    category: entry.category,
    label: entry.label,
    role: entry.role,
    overridden: false,
  };
}

export interface PublicKeyCredentialCreationOptionsJSON {
  rp: { name: string; id?: string };
  user: { id: string; name: string; displayName: string };
  challenge: string;
  pubKeyCredParams: Array<{ type: string; alg: number }>;
  timeout?: number;
  excludeCredentials?: Array<{ id: string; type: string }>;
  authenticatorSelection?: Record<string, unknown>;
  attestation?: string;
}

export interface PublicKeyCredentialRequestOptionsJSON {
  challenge: string;
  timeout?: number;
  rpId?: string;
  allowCredentials?: Array<{ id: string; type: string }>;
  userVerification?: string;
}

export interface RegistrationResponseJSON {
  id: string;
  rawId: string;
  type: string;
  response: {
    clientDataJSON: string;
    attestationObject: string;
  };
}

export interface AuthenticationResponseJSON {
  id: string;
  rawId: string;
  type: string;
  response: {
    clientDataJSON: string;
    authenticatorData: string;
    signature: string;
    userHandle?: string;
  };
}