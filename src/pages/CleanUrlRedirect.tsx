import { useEffect } from "react";
import { withSiteBase } from "../data/casos";

export function CleanUrlRedirect({ path }: { path: string }) {
  const href = withSiteBase(path);
  useEffect(() => {
    const search = window.location.search || "";
    window.location.replace(`${href}${search}`);
  }, [href]);
  return (
    <main id="main" tabIndex={-1} className="px-4 py-16">
      <p role="status">
        Redirigiendo…{" "}
        <a href={href} className="underline underline-offset-4">
          Continuar
        </a>
      </p>
    </main>
  );
}
