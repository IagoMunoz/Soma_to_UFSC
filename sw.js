if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js').then(function(registration) {
        console.log('Service Worker registrado com sucesso com escopo:', registration.scope);
      }, function(err) {
        console.log('Registro de Service Worker falhou:', err);
      });
    });
  }
  