import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

console.log("Portal Scout: Initializing mounting sequence...");

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log("Portal Scout: Application mounted to #root.");
} else {
  console.error("Scout critical failure: Root node missing in DOM.");
}
