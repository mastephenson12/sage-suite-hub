import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');

if (container) {
  try {
    const root = ReactDOM.createRoot(container);
    
    // Handle potential module default wrapping in ESM environments
    const RootComponent = (App as any).default || App;
    
    root.render(
      <React.StrictMode>
        <RootComponent />
      </React.StrictMode>
    );
    
    // Explicitly set initialized flag for the HTML watchdog
    (window as any).APP_INITIALIZED = true;
    console.log("Sage Hub: Portal Core Online");
  } catch (err) {
    console.error("Sage Hub: Mount Error", err);
  }
} else {
  console.error("Sage Hub: Critical Failure - Root container not found");
}
