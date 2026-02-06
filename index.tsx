import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

/**
 * Entry point for Sage Suite.
 * This script is imported by index.html as a module.
 */
const container = document.getElementById('root');

if (container) {
  // Flag immediately to signal the bootloader to clear the splash screen
  (window as any).APP_INITIALIZED = true;
  
  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("Sage Suite: Portal Online.");
  } catch (error) {
    console.error("Sage Suite: Initialization Error:", error);
  }
} else {
  console.error("Sage Suite: Critical Failure - Root container missing.");
}
