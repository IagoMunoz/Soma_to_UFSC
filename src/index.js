import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { registerServiceWorker, unregister } from './serviceWorker.js';
unregister();
registerServiceWorker();

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Função que você deseja rodar quando o app for reaberto
        console.log('App reaberto - rodando função de atualização');
        atualizarApp();
    }
});

function atualizarApp() {
    // Código para atualizar o aplicativo, como fazer uma nova requisição de dados, etc.
    fetch('/path/to/your/api/endpoint')
        .then(response => response.json())
        .then(data => {
            // Atualize sua aplicação com os novos dados
            console.log('Dados atualizados:', data);
        })
        .catch(error => console.error('Erro ao atualizar:', error));
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Se você estiver usando o serviceWorker para permitir o PWA, deixe-o registrado
registerServiceWorker();

reportWebVitals();