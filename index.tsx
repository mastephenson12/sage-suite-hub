import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const initializeApp = () => {
  const container = document.getElementById('root');

  if (!container) {
    console.error("Critical Error: Root container not found in index.html");
    return;
  }

  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("Health & Travels Portal: System initialized.");
  } catch (error) {
    console.error("Critical Error during React hydration:", error);
    container.innerHTML = `
      <div style="padding: 40px; font-family: sans-serif; text-align: center; color: #0d47a1;">
        <h2 style="font-weight: 900; text-transform: uppercase; letter-spacing: -0.05em;">Portal Offline</h2>
        <p style="color: #666;">A synchronization error occurred. Please refresh the page.</p>
      </div>
    `;
  }
};

// Ensure DOM is ready before initialization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
