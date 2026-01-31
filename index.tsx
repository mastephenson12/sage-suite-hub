import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

console.log("Portal Scout: Satellite handshake initiated.");

const container = document.getElementById('root');

if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  
  // Signal to index.html that the app has successfully mounted
  (window as any).APP_INITIALIZED = true;
  console.log("Portal Scout: Handshake complete. Hub active.");
} else {
  console.error("Portal Scout: Critical failure - root container not found.");
}
