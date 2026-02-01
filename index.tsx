import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');

if (container) {
  try {
    const root = ReactDOM.createRoot(container);
    
    // Safely resolve the component from the module
    const RootComponent = (App as any).default || App;
    
    if (!RootComponent) {
      throw new Error("Portal Scout: Could not resolve App component.");
    }

    root.render(
      <React.StrictMode>
        <RootComponent />
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

