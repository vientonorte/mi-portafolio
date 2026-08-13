import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Database, KeyRound, LogOut, RefreshCw, ShieldCheck, Upload } from "lucide-react";
import { SEOHead } from "../components/atoms/SEOHead";
import { PageShell } from "../components/layout/PageShell";
import { useLanguage } from "../lib/LanguageContext";
import { useTranslation } from "../lib/i18n";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { ResponsiveImage } from "../components/atoms/ResponsiveImage";
import { IMAGE_CATEGORIES, IMAGE_REGISTRY } from "../data/image-registry";
import { IMAGE_WEB_ROLES, roleDef } from "../data/image-roles";
import { ADMIN_GITHUB_USER } from "../lib/admin-config";
import { ROUTES } from "../lib/routes";
import {
  adminLogout,
  getAdminSession,
  listAdminImages,
  passkeyLoginBegin,
  passkeyLoginFinish,
  passkeyRegisterBegin,
  passkeyRegisterFinish,
  revertAdminImage,
  startGithubLogin,
  publishAdminImage,
  createAdminImage,
  uploadAdminImage,
  updateAdminImageMeta,
  registryToAdminPreview,
  type AdminImageRecord,
} from "../lib/admin-api";
import { createPasskey, isPasskeySupported, loginWithPasskey } from "../lib/admin-passkey";

export default function AdminPhotos() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [session, setSession] = useState<{ ok: boolean; user?: string; passkeyRegistered?: boolean } | null>(null);
  const [images, setImages] = useState<AdminImageRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<string>("all");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState<string>("gallery");
  const [newFile, setNewFile] = useState<File | null>(null);

  const refreshSession = useCallback(async () => {
    try {
      const data = await getAdminSession();
      setSession(data);
      return data.ok;
    } catch {
      setSession({ ok: false });
      return false;
    }
  }, []);

  const refreshImages = useCallback(async (authenticated: boolean) => {
    if (!authenticated) {
      setImages(IMAGE_REGISTRY.map(registryToAdminPreview));
      return;
    }
    const data = await listAdminImages();
    setImages(data);
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const ok = await refreshSession();
        await refreshImages(ok);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error cargando admin");
        setImages(IMAGE_REGISTRY.map(registryToAdminPreview));
      } finally {
        setLoading(false);
      }
    })();
  }, [refreshImages, refreshSession]);

  const filtered = useMemo(() => {
    if (category === "all") return images;
    return images.filter((img) => img.category === category);
  }, [images, category]);

  const handleGithub = () => startGithubLogin("/admin/fotos");

  const handleRegisterPasskey = async () => {
    setError(null);
    try {
      const options = await passkeyRegisterBegin();
      const body = await createPasskey(options);
      await passkeyRegisterFinish(body);
      await refreshSession();
      alert("Passkey registrada. La próxima vez puedes entrar sin GitHub.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error registrando passkey");
    }
  };

  const handlePasskeyLogin = async () => {
    setError(null);
    try {
      const options = await passkeyLoginBegin();
      const body = await loginWithPasskey(options);
      await passkeyLoginFinish(body);
      await refreshSession();
      await refreshImages(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error con passkey");
    }
  };

  const handleLogout = async () => {
    await adminLogout();
    setSession({ ok: false });
    setImages(IMAGE_REGISTRY.map(registryToAdminPreview));
  };

  const handleCreate = async () => {
    if (!newFile || !newName.trim()) {
      setError("Nombre y archivo son obligatorios.");
      return;
    }
    setBusyId("create");
    setError(null);
    try {
      const result = await createAdminImage(newFile, {
        label: newName.trim(),
        role: newRole,
        alt: newName.trim(),
      });
      await refreshImages(true);
      setNewName("");
      setNewFile(null);
      setNewRole("gallery");
      if (result.publishError) {
        setError(`Subida OK. PR no abierto: ${result.publishError}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error subiendo imagen");
    } finally {
      setBusyId(null);
    }
  };

  const handleUpload = async (id: string, file: File) => {
    setBusyId(id);
    setError(null);
    try {
      const result = await uploadAdminImage(id, file);
      setImages((prev) => prev.map((img) => (img.id === id ? result.image : img)));
      if (result.publishError) {
        setError(`Subida OK. PR no abierto: ${result.publishError}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error subiendo imagen");
    } finally {
      setBusyId(null);
    }
  };

  const handleAltSave = async (id: string, alt: string) => {
    setBusyId(id);
    setError(null);
    try {
      const updated = await updateAdminImageMeta(id, alt);
      setImages((prev) => prev.map((img) => (img.id === id ? updated : img)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error guardando alt");
    } finally {
      setBusyId(null);
    }
  };

  const handleRevert = async (id: string) => {
    if (!confirm("¿Restaurar imagen estática del repositorio?")) return;
    setBusyId(id);
    try {
      await revertAdminImage(id);
      await refreshImages(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error revirtiendo");
    } finally {
      setBusyId(null);
    }
  };

  if (loading) {
    return (
      <PageShell crumbs={[{ label: t.breadcrumbs.admin, current: true }]}>
        <SEOHead {...t.seo.pages.admin} noIndex />
        <div className="container max-w-6xl mx-auto px-4 py-16 text-center text-muted-foreground">
          Cargando admin de fotos…
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell crumbs={[{ label: t.breadcrumbs.admin, current: true }]}>
      <SEOHead {...t.seo.pages.admin} noIndex />
      <div className="container max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-8">
        <header className="space-y-2">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">Admin privado</p>
          <h1 className="text-3xl font-bold">Fotos del sitio</h1>
          <p className="text-muted-foreground max-w-2xl">
            Subí una foto, dale un nombre y elegí si alimenta share, schema, favicon, logo o FAQ.
            Las de aplicación web abren PR a Pages (crawlers). Galería queda en R2.
          </p>
          <Button asChild variant="outline" className="min-h-[44px] w-fit">
            <Link to={ROUTES.admin}>
              <Database className="mr-2 h-4 w-4" aria-hidden />
              Ver leads y bases
            </Link>
          </Button>
        </header>

        {error && (
          <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        {!session?.ok ? (
          <Card>
            <CardHeader>
              <CardTitle>Acceso</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-3">
              <Button onClick={handleGithub} className="gap-2">
                <ShieldCheck className="h-4 w-4" />
                Entrar con GitHub (@{ADMIN_GITHUB_USER})
              </Button>
              {isPasskeySupported() && (
                <Button variant="outline" onClick={handlePasskeyLogin} className="gap-2">
                  <KeyRound className="h-4 w-4" />
                  Entrar con passkey
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="secondary">@{session.user}</Badge>
            {isPasskeySupported() && !session.passkeyRegistered && (
              <Button size="sm" variant="outline" onClick={handleRegisterPasskey} className="gap-2">
                <KeyRound className="h-4 w-4" />
                Registrar passkey
              </Button>
            )}
            <Button size="sm" variant="ghost" onClick={() => refreshImages(true)} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Actualizar
            </Button>
            <Button size="sm" variant="ghost" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Salir
            </Button>
          </div>
        )}

        {session?.ok ? (
          <Card>
            <CardHeader>
              <CardTitle>Subir foto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="foto-nombre">
                    Nombre
                  </label>
                  <Input
                    id="foto-nombre"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Ej. Card LinkedIn agosto"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="foto-rol">
                    Aplicación en la web
                  </label>
                  <select
                    id="foto-rol"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                  >
                    {IMAGE_WEB_ROLES.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-muted-foreground">{roleDef(newRole)?.hint}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-input px-3 py-2 text-sm">
                  <Upload className="h-4 w-4" />
                  {newFile ? newFile.name : "Elegir archivo"}
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(e) => setNewFile(e.target.files?.[0] ?? null)}
                  />
                </label>
                <Button
                  type="button"
                  disabled={busyId === "create" || !newFile || !newName.trim()}
                  onClick={handleCreate}
                >
                  Subir
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : null}

        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={category === "all" ? "default" : "outline"}
            onClick={() => setCategory("all")}
          >
            Todas ({images.length})
          </Button>
          {IMAGE_CATEGORIES.map((cat) => (
            <Button
              key={cat}
              size="sm"
              variant={category === cat ? "default" : "outline"}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((image) => (
            <Card key={image.id} className="overflow-hidden">
              <ResponsiveImage
                src={image.url}
                alt={image.alt}
                aspectRatio="16 / 10"
                fit="contain"
                className="bg-muted/30"
              />
              <CardContent className="space-y-3 p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-sm">{image.label}</p>
                    <p className="text-xs text-muted-foreground font-mono">{image.path}</p>
                    <p className="text-xs text-muted-foreground">
                      {roleDef(image.role)?.label || "Galería"}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {image.overridden && <Badge>Override</Badge>}
                    {image.prNumber && image.prUrl ? (
                      <a
                        className="text-xs text-primary underline-offset-2 hover:underline"
                        href={image.prUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        PR #{image.prNumber}
                      </a>
                    ) : null}
                  </div>
                </div>

                <Input
                  defaultValue={image.label}
                  disabled={!session?.ok || busyId === image.id}
                  onBlur={(e) => {
                    if (session?.ok && e.target.value !== image.label) {
                      void updateAdminImageMeta(image.id, { label: e.target.value }).then((updated) => {
                        setImages((prev) => prev.map((img) => (img.id === image.id ? updated : img)));
                      });
                    }
                  }}
                  aria-label={`Nombre ${image.label}`}
                />
                <select
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-xs"
                  disabled={!session?.ok || busyId === image.id}
                  defaultValue={image.role || "gallery"}
                  aria-label={`Aplicación ${image.label}`}
                  onChange={(e) => {
                    if (!session?.ok) return;
                    void updateAdminImageMeta(image.id, { role: e.target.value }).then((updated) => {
                      setImages((prev) => prev.map((img) => (img.id === image.id ? updated : img)));
                    });
                  }}
                >
                  {IMAGE_WEB_ROLES.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.label}
                    </option>
                  ))}
                </select>
                <Input
                  defaultValue={image.alt}
                  disabled={!session?.ok || busyId === image.id}
                  onBlur={(e) => {
                    if (session?.ok && e.target.value !== image.alt) {
                      handleAltSave(image.id, e.target.value);
                    }
                  }}
                  aria-label={`Alt text ${image.label}`}
                />

                {session?.ok && (
                  <div className="flex flex-wrap gap-2">
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground hover:bg-secondary/80">
                      <Upload className="h-4 w-4" />
                      Reemplazar
                      <input
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        disabled={busyId === image.id}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleUpload(image.id, file);
                          e.target.value = "";
                        }}
                      />
                    </label>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      disabled={busyId === image.id}
                      onClick={async () => {
                        setBusyId(image.id);
                        setError(null);
                        try {
                          const result = await publishAdminImage(image.id);
                          setImages((prev) =>
                            prev.map((img) => (img.id === image.id ? result.image : img))
                          );
                        } catch (err) {
                          setError(err instanceof Error ? err.message : "No se pudo abrir el PR");
                        } finally {
                          setBusyId(null);
                        }
                      }}
                    >
                      Publicar PR
                    </Button>
                    {image.overridden && (
                      <Button
                        size="sm"
                        variant="ghost"
                        disabled={busyId === image.id}
                        onClick={() => handleRevert(image.id)}
                      >
                        Restaurar
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageShell>
  );
}