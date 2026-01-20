
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const initializeApp = () => {
  const container = document.getElementById('root');

  if (!container) {
    console.error("SageSuite Bootstrap Error: #root element missing.");
    return;
  }

  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.debug("SageSuite: Scout Portal Online.");
  } catch (error) {
    console.error("SageSuite: Initialization failed:", error);
    container.innerHTML = `
      <div style="padding: 100px 20px; font-family: 'Inter', sans-serif; text-align: center; color: #0d47a1;">
        <h1 style="font-weight: 900; letter-spacing: -0.05em; margin-bottom: 10px;">PORTAL SYNC ERROR</h1>
        <p style="color: #666; font-size: 14px;">The Scout connection timed out. Please check your network and refresh.</p>
        <button onclick="window.location.reload()" style="margin-top: 20px; padding: 10px 20px; background: #0d47a1; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">Retry Connection</button>
      </div>
    `;
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
