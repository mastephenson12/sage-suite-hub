import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

// Ensure standard global objects exist for dependencies that expect them
if (typeof (window as any).process === 'undefined') {
  (window as any).process = { env: {} };
}

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
