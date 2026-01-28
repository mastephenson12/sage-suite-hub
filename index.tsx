import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

// Note: In this specific environment, we don't always need to import CSS 
// if it's already linked in index.html, but it's good practice.

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
