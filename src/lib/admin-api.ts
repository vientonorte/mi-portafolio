import type { ImageRegistryEntry } from "../data/image-registry";
import { ADMIN_ROUTES } from "./admin-config";

export interface AdminImageRecord {
  id: string;
  url: string;
  alt: string;
  path: string;
  category: string;
  label: string;
  overridden: boolean;
  updatedAt?: string;
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

export function startGithubLogin(returnTo = "/admin/fotos") {
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

export async function uploadAdminImage(id: string, file: File, alt?: string): Promise<AdminImageRecord> {
  const form = new FormData();
  form.append("file", file);
  if (alt) form.append("alt", alt);
  const data = await adminFetch<{ image: AdminImageRecord }>(
    `${ADMIN_ROUTES.images}/${encodeURIComponent(id)}`,
    { method: "POST", body: form }
  );
  return data.image;
}

export async function updateAdminImageMeta(id: string, alt: string): Promise<AdminImageRecord> {
  const data = await adminFetch<{ image: AdminImageRecord }>(
    `${ADMIN_ROUTES.images}/${encodeURIComponent(id)}`,
    { method: "PATCH", body: JSON.stringify({ alt }) }
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

export function registryToAdminPreview(entry: ImageRegistryEntry): AdminImageRecord {
  return {
    id: entry.id,
    url: entry.defaultUrl,
    alt: entry.alt,
    path: entry.path,
    category: entry.category,
    label: entry.label,
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