import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

// SAFETY: Define process.env if it doesn't exist to prevent crash on API key access
if (typeof window !== 'undefined' && !window.process) {
  (window as any).process = { env: {} };
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("Critical Failure: Could not find root element to mount the Sage Hub.");
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
