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
import { attachLcpShell } from './lib/lcp-shell';
import { initTracking } from './lib/track';

function applyTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark' || saved === 'light') {
    document.documentElement.classList.toggle('dark', saved === 'dark');
    return;
  }
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.classList.toggle('dark', prefersDark);
}

function bootstrapTheme() {
  try {
    applyTheme();
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      try {
        const saved = localStorage.getItem('theme');
        if (saved === 'dark' || saved === 'light') return;
        applyTheme();
      } catch {
        /* keep the class already applied */
      }
    });
  } catch {
    /* localStorage blocked — default light */
  }
}

bootstrapTheme();
normalizeDoubleHashUrl();
// Primer toque (UTM) siempre; Umami solo si hay VITE_UMAMI_WEBSITE_ID.
initTracking();

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  const base = import.meta.env.BASE_URL;
  const SW_RELOAD_KEY = 'vn-sw-controller-reload';
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    try {
      if (sessionStorage.getItem(SW_RELOAD_KEY)) return;
      sessionStorage.setItem(SW_RELOAD_KEY, '1');
    } catch {
      return;
    }
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

const rootEl = document.getElementById('root');
if (!rootEl) {
  throw new Error('No se encontró #root en index.html');
}

attachLcpShell({
  root: rootEl,
  shell: document.getElementById('lcp-shell'),
  hash: window.location.hash,
});

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
