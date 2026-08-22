import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';
import App from './App';
/* Self-hosted Chillax first — reliable on http://127.0.0.1 preview */
import './styles/chillax-local.css';
import './styles/globals.css';
import './styles/global.css';
import './styles/design-system.css';
import './styles/offer-tour.css';
import { ErrorBoundary } from './components/organisms/ErrorBoundary';
import { normalizeDoubleHashUrl } from './lib/normalize-hash-url';

function bootstrapTheme() {
  try {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = saved === 'dark' || (!saved && prefersDark);
    document.documentElement.classList.toggle('dark', isDark);
  } catch {
    /* localStorage blocked — default light */
  }
}

bootstrapTheme();
normalizeDoubleHashUrl();

try {
  sessionStorage.removeItem('rg-chunk-reload');
} catch {
  /* ignore */
}

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  const base = import.meta.env.BASE_URL;
  let reloadedForSw = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (reloadedForSw) return;
    reloadedForSw = true;
    window.location.reload();
  });

  navigator.serviceWorker
    .register(`${base}sw.js`, { scope: base })
    .then((registration) => {
      registration.addEventListener('updatefound', () => {
        const worker = registration.installing;
        worker?.addEventListener('statechange', () => {
          if (worker.state === 'activated') {
            worker.postMessage({ type: 'SKIP_WAITING' });
          }
        });
      });
    })
    .catch(() => {
      /* SW opcional — el sitio funciona sin él */
    });
}

function dismissLcpShell() {
  const shell = document.getElementById('lcp-shell');
  const root = document.getElementById('root');
  if (!shell || !root) return;
  const hide = () => {
    shell.setAttribute('hidden', '');
    shell.setAttribute('aria-hidden', 'true');
  };
  const ready = () => Boolean(root.querySelector('#inicio, #consultoria-hero-heading'));
  if (ready()) {
    hide();
    return;
  }
  const observer = new MutationObserver(() => {
    if (ready()) {
      observer.disconnect();
      hide();
    }
  });
  observer.observe(root, { childList: true, subtree: true });
}

const rootEl = document.getElementById('root');
if (!rootEl) {
  throw new Error('No se encontró #root en index.html');
}

dismissLcpShell();

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <App />
        <Toaster 
          position="top-right" 
          richColors 
          expand={false}
          duration={4000}
        />
      </HelmetProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
