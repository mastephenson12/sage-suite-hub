import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');

if (container) {
  const root = ReactDOM.createRoot(container);
  
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  
  // Set initialization flag for the index.html loader script
  (window as any).APP_INITIALIZED = true;
  console.log("Sage Hub: Portal Core Online");
} else {
  console.error("Sage Hub: Critical Failure - Root container not found");
}
