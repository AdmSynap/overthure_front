import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // O Webpack agora vai procurar App.tsx corretamente

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);