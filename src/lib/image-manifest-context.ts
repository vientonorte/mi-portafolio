import { createContext, useContext } from "react";

export const ImageManifestContext = createContext(0);

export function useImageManifestVersion() {
  return useContext(ImageManifestContext);
}