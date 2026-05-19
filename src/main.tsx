import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';
import App from './App';
import './index.css';
import './styles/global.css';
import './styles/design-system.css';
import { ErrorBoundary } from './components/organisms/ErrorBoundary';

ReactDOM.createRoot(document.getElementById('root')).render(
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
