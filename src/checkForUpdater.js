// src/checkForUpdates.js
export async function checkForUpdates() {
    try {
      const manifestResponse = await fetch('/manifest.json');
      const localManifest = await manifestResponse.json();
      const remoteResponse = await fetch(localManifest.updateUrl);
      const remoteManifest = await remoteResponse.json();
  
      if (localManifest.version !== remoteManifest.version) {
        // Notify the service worker to update
        if (navigator.serviceWorker && navigator.serviceWorker.controller) {
          navigator.serviceWorker.controller.postMessage({ type: 'UPDATE_AVAILABLE' });
        }
      }
    } catch (error) {
      console.error('Failed to check for updates:', error);
    }
  }
  