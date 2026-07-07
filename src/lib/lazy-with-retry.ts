import { lazy, type ComponentType, type LazyExoticComponent } from "react";

type ModuleDefault<T> = { default: T };

/**
 * lazy() con reintentos — mitiga «Importing a module script failed»
 * tras deploys (chunks renombrados / SW stale).
 */
export function lazyWithRetry<T extends ComponentType<unknown>>(
  importer: () => Promise<ModuleDefault<T>>,
  retries = 2,
  delayMs = 600
): LazyExoticComponent<T> {
  return lazy(async () => {
    let lastError: unknown;

    for (let attempt = 0; attempt <= retries; attempt += 1) {
      try {
        return await importer();
      } catch (error) {
        lastError = error;
        if (attempt < retries) {
          await new Promise((resolve) => window.setTimeout(resolve, delayMs * (attempt + 1)));
        }
      }
    }

    throw lastError;
  });
}

export function isChunkLoadError(error: Error): boolean {
  const message = error.message.toLowerCase();
  return (
    message.includes("importing a module script failed") ||
    message.includes("failed to fetch dynamically imported module") ||
    message.includes("loading chunk") ||
    error.name === "ChunkLoadError"
  );
}