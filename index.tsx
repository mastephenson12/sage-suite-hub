import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  
  // Render and then signal success
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  // Set the initialization state to 'mounted' to clear the loader in index.html
  (window as any).APP_INITIALIZED = 'mounted';
}
