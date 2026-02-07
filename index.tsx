// Mark app as initialized immediately to signal the bootloader to clear the splash screen
(window as any).APP_INITIALIZED = true;

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

/**
 * Entry point for Sage Suite.
 * This file is automatically transpiled and loaded by the environment.
 */

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
