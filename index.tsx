import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');

if (container) {
  try {
    const root = ReactDOM.createRoot(container);
    
    // Use the component directly. 
    // Mismatched React symbols from the import map (18 vs 19) were causing the "Objects are not valid as a React child" error.
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    
    (window as any).APP_INITIALIZED = true;
    console.log("Portal Scout: Handshake Phase 2 - App Mounted Successfully");
  } catch (err) {
    console.error("Portal Scout: Mounting Failure", err);
    const loaderText = document.getElementById('loader-text');
    if (loaderText) {
      loaderText.innerText = "Critical Sync Error - Check Console";
      loaderText.style.color = "#ef4444";
    }
  }
}
