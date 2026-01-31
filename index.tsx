import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

console.log("Portal Scout: Mounting sequence initiated.");

const init = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error("Scout critical failure: Root node missing.");
    return;
  }

  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    (window as any).APP_INITIALIZED = true;
    console.log("Portal Scout: Handshake successful. Dashboard operational.");
  } catch (err) {
    console.error("Portal Scout: Render crashed:", err);
    rootElement.innerHTML = `
      <div style="padding: 40px; text-align: center; font-family: sans-serif;">
        <h1 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.2em; color: #ef4444;">Mounting Failed</h1>
        <p style="font-size: 11px; color: #71717a; margin-top: 10px;">The satellite handshake encountered a fatal error during UI projection.</p>
      </div>
    `;
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
