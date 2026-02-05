import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

console.log("Sage Suite: Initializing Command Center...");

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  // Mark app as initialized for the index.html loader
  (window as any).APP_INITIALIZED = true;
  console.log("Sage Suite: Portal Online.");
} else {
  console.error("Sage Suite: Root container not found.");
}
