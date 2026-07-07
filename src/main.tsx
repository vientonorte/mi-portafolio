import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';
import App from './App';
import './styles/globals.css';
import './styles/global.css';
import './styles/design-system.css';
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

const rootEl = document.getElementById('root');
if (!rootEl) {
  throw new Error('No se encontró #root en index.html');
}

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
