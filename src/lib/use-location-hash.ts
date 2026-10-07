import { useEffect, useState } from "react";

/** Hash actual, sin #. Vacío en el prerender: el servidor no ve el ancla. */
export function useLocationHash(): string {
  const [hash, setHash] = useState("");
  useEffect(() => {
    const read = () => setHash(window.location.hash.replace(/^#/, ""));
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);
  return hash;
}
