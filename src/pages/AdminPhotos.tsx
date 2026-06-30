import { useCallback, useEffect, useMemo, useState } from "react";
import { Github, KeyRound, LogOut, RefreshCw, Upload } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { ResponsiveImage } from "../components/atoms/ResponsiveImage";
import { IMAGE_CATEGORIES, IMAGE_REGISTRY } from "../data/image-registry";
import { ADMIN_GITHUB_USER } from "../lib/admin-config";
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
  uploadAdminImage,
  updateAdminImageMeta,
  registryToAdminPreview,
  type AdminImageRecord,
} from "../lib/admin-api";
import { createPasskey, isPasskeySupported, loginWithPasskey } from "../lib/admin-passkey";

export default function AdminPhotos() {
  const [session, setSession] = useState<{ ok: boolean; user?: string; passkeyRegistered?: boolean } | null>(null);
  const [images, setImages] = useState<AdminImageRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<string>("all");
  const [busyId, setBusyId] = useState<string | null>(null);

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

  const handleUpload = async (id: string, file: File) => {
    setBusyId(id);
    setError(null);
    try {
      const updated = await uploadAdminImage(id, file);
      setImages((prev) => prev.map((img) => (img.id === id ? updated : img)));
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
      <div className="container max-w-6xl mx-auto px-4 py-24 text-center text-muted-foreground">
        Cargando admin de fotos…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container max-w-6xl mx-auto px-4 space-y-8">
        <header className="space-y-2">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">Admin privado</p>
          <h1 className="text-3xl font-bold">Fotos del portafolio</h1>
          <p className="text-muted-foreground max-w-2xl">
            Edita las imágenes contenidas en <code className="text-sm">public/images/</code> y{" "}
            <code className="text-sm">profile-photo.jpg</code>. Solo @{ADMIN_GITHUB_USER} en GitHub.
          </p>
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
                <Github className="h-4 w-4" />
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
                  </div>
                  {image.overridden && <Badge>Override</Badge>}
                </div>

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
    </div>
  );
}