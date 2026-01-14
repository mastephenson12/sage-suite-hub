import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');

if (container) {
  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("Health & Travels App: Bootstrapping complete.");
  } catch (error) {
    console.error("Critical Error during React hydration:", error);
    container.innerHTML = `
      <div style="padding: 20px; font-family: sans-serif; color: #721c24; background: #f8d7da; border: 1px solid #f5c6cb; border-radius: 4px; margin: 20px;">
        <h2 style="margin-top:0">Unable to load Portal</h2>
        <p>A technical error occurred during startup. Please check the browser console for details.</p>
      </div>
    `;
  }
} else {
  console.error("Critical Error: Root container not found in index.html");
}
