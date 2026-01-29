import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

console.log("Portal Scout: Mounting sequence initiated.");

const rootElement = document.getElementById('root');
if (rootElement) {
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
    rootElement.innerHTML = `<div style="padding: 40px; text-align: center; font-family: sans-serif;">
      <h1 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.2em; color: #ff0000;">Mounting Failed</h1>
      <p style="font-size: 12px; color: #666;">Check dev console for satellite error logs.</p>
    </div>`;
  }
} else {
  console.error("Scout critical failure: Root node missing in DOM.");
}
