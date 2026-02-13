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
  
  // Set a global flag to help index.html clear the loader
  (window as any).APP_READY = true;
} else {
  console.error("Critical Failure: Root container not found in DOM.");
}
