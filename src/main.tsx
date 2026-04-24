import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
// @vientonorte/tokens — fundación compartida del colectivo (Fase 1)
// Fase 2: reemplazar por `import '@vientonorte/tokens/css'` una vez publicado en GH Packages
import './styles/vn-tokens.css';
import './styles/global.css';
import './styles/design-system.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
