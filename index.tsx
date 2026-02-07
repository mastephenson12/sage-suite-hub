import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

/**
 * Entry point for Sage Suite.
 * This file is automatically transpiled and loaded by the environment.
 */

// Mark as initialized so the watchdog in index.html hides the splash screen immediately
(window as any).APP_INITIALIZED = true;

const container = document.getElementById('root');

if (container) {
  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("Sage Suite: Command Node Online.");
  } catch (error) {
    console.error("Sage Suite: Initialization Error:", error);
  }
} else {
  console.error("Sage Suite: Critical Failure - Root container missing.");
}
