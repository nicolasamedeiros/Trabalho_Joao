import React from 'react'; 
import ReactDOM from 'react-dom/client'; // Importa o módulo para renderização no DOM
import App from './App'; // Importa o componente principal do aplicativo

// Cria uma raiz para renderizar o componente App
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza o componente App dentro do modo estrito do React
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
