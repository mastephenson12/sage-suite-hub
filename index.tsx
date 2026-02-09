import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

// Signal to loader that app is starting
(window as any).APP_INITIALIZED = true;

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Failed to find root container");
}
