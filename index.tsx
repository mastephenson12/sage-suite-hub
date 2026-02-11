import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

// Signal to hide the loader as soon as the JS bundle starts executing
(window as any).APP_INITIALIZED = 'mounted';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Critical Failure: Root container not found in DOM.");
}
