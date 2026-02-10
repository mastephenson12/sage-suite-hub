import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

// Signal to the HTML loader that the JS bundle has started executing
(window as any).APP_INITIALIZED = true;

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
