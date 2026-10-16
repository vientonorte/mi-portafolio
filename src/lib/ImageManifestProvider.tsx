import { useEffect, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { ADMIN_ROUTES } from "./admin-config";
import { ImageManifestContext } from "./image-manifest-context";
import { fetchAndApplyManifest } from "./image-overrides";
import { isAdminPath } from "./routes";

/**
 * Manifest remoto también en rutas públicas: el Worker ya responde
 * Access-Control-Allow-Origin: https://vientonorte.io (verificado 13-oct-2026).
 * Se apaga con VITE_IMAGE_MANIFEST_PUBLIC=false.
 */
const PUBLIC_MANIFEST_ENABLED = import.meta.env.VITE_IMAGE_MANIFEST_PUBLIC !== "false";

export function ImageManifestProvider({ children }: { children: ReactNode }) {
  const [version, setVersion] = useState(0);
  const location = useLocation();
  const isAdminRoute = isAdminPath(location.pathname);
  const shouldFetch = isAdminRoute || PUBLIC_MANIFEST_ENABLED;

  useEffect(() => {
    if (!shouldFetch) return;

    let cancelled = false;
    fetchAndApplyManifest(ADMIN_ROUTES.manifest).then(() => {
      if (!cancelled) setVersion((v) => v + 1);
    });

    return () => {
      cancelled = true;
    };
  }, [shouldFetch]);

  return (
    <ImageManifestContext.Provider value={version}>
      {children}
    </ImageManifestContext.Provider>
  );
}