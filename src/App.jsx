// App.jsx o el archivo principal de tu aplicación
import React from 'react';
import ReactDOM from 'react-dom';
import { GlobalProvider } from './context/GlobalContext';
import { Cards } from './componentes/Cards';
import { Header } from './vistas/Header';

const App = () => (
  <GlobalProvider>
    <Header></Header>
    <Cards />
  </GlobalProvider>
);

export default App