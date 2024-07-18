import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker'; // Corrigido o caminho

function isMobileDevice() {
  // Detecta dispositivos móveis pelo userAgent
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function showUpdateButton() {
  if (isMobileDevice()) {
    const updateButton = document.getElementById('updateButton');
    updateButton.style.display = 'block';
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register the service worker
serviceWorker.register({
  onUpdate: registration => {
    if (registration && registration.waiting) {
      showUpdateButton();
    }
  }
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
