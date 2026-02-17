import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const mountApp = () => {
  const container = document.getElementById('root');
  if (!container) return;

  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    (window as any).APP_READY = true;
  } catch (error) {
    console.error("Mounting Failed:", error);
    container.innerHTML = `
      <div style="padding: 50px; text-align: center; font-family: sans-serif; background: #09090b; height: 100vh; color: white;">
        <h1 style="font-size: 24px; font-weight: 900; margin-bottom: 20px; color: #3b82f6;">SYSTEM FAULT</h1>
        <p style="font-size: 14px; opacity: 0.6;">The operations center failed to mount. Check console for version conflicts.</p>
        <div style="margin-top: 40px; text-align: left; background: #18181b; padding: 20px; border-radius: 12px; font-family: monospace; font-size: 11px; overflow: auto; max-width: 600px; margin-left: auto; margin-right: auto;">
          ${error}
        </div>
      </div>
    `;
  }
};

mountApp();
