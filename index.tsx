import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  // Set timeout to ensure render loop has started before clearing loader
  setTimeout(() => {
    (window as any).APP_INITIALIZED = 'mounted';
  }, 0);
}
