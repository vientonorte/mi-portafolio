import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { ADMIN_ROUTES } from "./admin-config";
import { fetchAndApplyManifest } from "./image-overrides";
import { ROUTES } from "./routes";

const ImageManifestContext = createContext(0);

/** Manifest remoto solo en admin (evita CORS en GitHub Pages hasta ACAO en el Worker). */
const PUBLIC_MANIFEST_ENABLED = import.meta.env.VITE_IMAGE_MANIFEST_PUBLIC === "true";

export function ImageManifestProvider({ children }: { children: ReactNode }) {
  const [version, setVersion] = useState(0);
  const location = useLocation();
  const isAdminRoute =
    (location.pathname.replace(/\/+$/, "") || "/") === ROUTES.adminPhotos;
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

export function useImageManifestVersion() {
  return useContext(ImageManifestContext);
}