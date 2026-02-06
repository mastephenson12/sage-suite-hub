import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

/**
 * Entry point for Sage Suite.
 */
const container = document.getElementById('root');

if (container) {
  // Mark app as initialized immediately to clear the loader
  (window as any).APP_INITIALIZED = true;
  
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  
  console.log("Sage Suite: Command Node Synchronized.");
} else {
  console.error("Sage Suite: Critical Failure - Root container missing.");
}
