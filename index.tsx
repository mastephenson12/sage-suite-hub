import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const container = document.getElementById('root');

if (container) {
  try {
    const root = ReactDOM.createRoot(container);
    
    // Resolve the App component (handling potential ESM wrapper)
    const RootComponent = (App as any).default || App;
    
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
