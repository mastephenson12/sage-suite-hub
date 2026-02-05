import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

/**
 * Entry point for Sage Suite.
 * This file is automatically loaded by index.html in the host environment.
 */
const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  
  // Mark app as initialized for the index.html loader watchdog
  (window as any).APP_INITIALIZED = true;
  console.log("Sage Suite: Command Node Synchronized.");
} else {
  console.error("Sage Suite: Critical Failure - Root container missing.");
}
