import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');

if (container) {
  try {
    const root = ReactDOM.createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    (window as any).APP_INITIALIZED = true;
    console.log("Portal Scout: Handshake Phase 2 - App Mounted");
  } catch (err) {
    console.error("Portal Scout: Mounting Failure", err);
    const loaderText = document.getElementById('loader-text');
    if (loaderText) loaderText.innerText = "Critical Sync Error - Check Console";
  }
}
