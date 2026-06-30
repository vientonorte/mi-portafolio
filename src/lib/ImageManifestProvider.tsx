import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { ADMIN_ROUTES } from "./admin-config";
import { fetchAndApplyManifest } from "./image-overrides";

const ImageManifestContext = createContext(0);

export function ImageManifestProvider({ children }: { children: ReactNode }) {
  const [version, setVersion] = useState(0);

  useEffect(() => {
    fetchAndApplyManifest(ADMIN_ROUTES.manifest).then(() => {
      setVersion((v) => v + 1);
    });
  }, []);

  return (
    <ImageManifestContext.Provider value={version}>
      {children}
    </ImageManifestContext.Provider>
  );
}

export function useImageManifestVersion() {
  return useContext(ImageManifestContext);
}