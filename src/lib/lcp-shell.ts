/**
 * Static LCP shell in index.html is for the home/consultoria first paint.
 * Inner HashRouter routes (e.g. /#/sobre-mi) never mount #inicio — the shell
 * must not wait for that node or a reload looks like a hung home overlay.
 */

export const LCP_HOME_PATHS = new Set(["/", "/consultoria"]);

export function pathFromHash(hash: string): string {
  const raw = (hash || "#/").replace(/^#/, "");
  const path = (raw.split("?")[0] || "/").trim() || "/";
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path.startsWith("/") ? path : `/${path}`;
}

export function shouldSkipLcpShell(hash: string): boolean {
  return !LCP_HOME_PATHS.has(pathFromHash(hash));
}

export function hideLcpShell(shell: Element | null): void {
  if (!shell) return;
  shell.setAttribute("hidden", "");
  shell.setAttribute("aria-hidden", "true");
}

export function attachLcpShell(options: {
  root: ParentNode | null;
  shell: Element | null;
  hash?: string;
  timeoutMs?: number;
}): () => void {
  const { root, shell, hash = "", timeoutMs = 1600 } = options;
  if (!shell) return () => undefined;

  if (shouldSkipLcpShell(hash)) {
    hideLcpShell(shell);
    return () => undefined;
  }

  const ready = () => Boolean(root?.querySelector("#main"));
  if (ready()) {
    hideLcpShell(shell);
    return () => undefined;
  }

  const hide = () => {
    observer.disconnect();
    window.clearTimeout(timer);
    hideLcpShell(shell);
  };

  const observer = new MutationObserver(() => {
    if (ready()) hide();
  });
  if (root) observer.observe(root, { childList: true, subtree: true });
  const timer = window.setTimeout(hide, timeoutMs);

  return hide;
}
