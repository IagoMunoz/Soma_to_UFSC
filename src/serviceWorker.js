export const registerServiceWorker = () => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js').then(function (registration) {
          // Registration was successful
          //console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }).catch(function (err) {
          // registration failed :(
          //console.log('ServiceWorker registration failed: ', err);
        });
      });
    }
  }

export const unregister = () => {
    // Verifica se o navegador suporta service workers
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(function(registrations) {
        for (let registration of registrations) {
          registration.unregister().then(function(boolean) {
            if (boolean) {
              console.log('Service worker desregistrado com sucesso.');
            } else {
              console.log('Falha ao desregistrar o service worker.');
            }
          });
        }
      }).catch(function(error) {
        console.error('Erro ao obter as registracoes de service workers:', error);
      });
    } else {
      console.log('Service workers não são suportados neste navegador.');
    }
  }
  
  // Chame a função para desregistrar os service workers