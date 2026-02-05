import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

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
  console.log("Sage Suite: Portal Online.");
}
