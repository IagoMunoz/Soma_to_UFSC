import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Qst_Ind';
import reportWebVitals from './reportWebVitals';

/*teste de sw funcionando
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
      navigator.serviceWorker.register('sw.js');
  });
}*/

//novo sw
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      console.log('Service Worker registered with scope:', registration.scope);

      // Check for updates to the service worker
      registration.onupdatefound = function() {
        const installingWorker = registration.installing;
        installingWorker.onstatechange = function() {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // New update available
              console.log('New or updated content is available.');
              // Optionally, you can prompt the user to refresh the page
              // or automatically reload the page
              window.location.reload();
            } else {
              // Content is cached for offline use
              console.log('Content is now available offline!');
            }
          }
        };
      };
    }).catch(function(error) {
      console.log('Service Worker registration failed:', error);
    });
  });
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
