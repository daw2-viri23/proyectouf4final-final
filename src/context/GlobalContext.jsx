import React, { createContext, useContext, useState, useEffect } from 'react';

// Creamos el contexto global
const GlobalContext = createContext();

// Creamos un proveedor para el contexto global
export const GlobalProvider = ({ children }) => {
  const [historias, setHistorias] = useState([]); // Estado para almacenar las historias
  const [dataHistoria, setDataHistoria] = useState(null); // Estado para la historia seleccionada

  // Cargar los datos desde el enlace proporcionado al montar el componente
  useEffect(() => {
    fetch('https://json-server-vercel-lemon-ten.vercel.app/historias')
      .then(response => response.json())
      .then(data => setHistorias(data))
      .catch(error => console.error('Error al cargar las historias:', error));
  }, []);

  const updateHistoria = (updatedHistoria) => {
    fetch(`https://json-server-vercel-lemon-ten.vercel.app/historias/${updatedHistoria.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedHistoria),
    })
      .then(response => response.json())
      .then(data => {
        setHistorias((prevHistorias) =>
          prevHistorias.map((historia) =>
            historia.id === data.id ? data : historia
          )
        );
      })
      .catch(error => console.error('Error al actualizar la historia:', error));
  };

  const addHistoria = (newHistoria) => {
    fetch('https://json-server-vercel-lemon-ten.vercel.app/historias', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newHistoria),
    })
      .then(response => response.json())
      .then(data => {
        setHistorias((prevHistorias) => [...prevHistorias, data]);
      })
      .catch(error => console.error('Error al agregar la historia:', error));
  };

  const deleteHistoria = (id) => {
    fetch(`https://json-server-vercel-lemon-ten.vercel.app/historias/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setHistorias((prevHistorias) =>
          prevHistorias.filter((historia) => historia.id !== id)
        );
      })
      .catch(error => console.error('Error al borrar la historia:', error));
  };

  return (
    <GlobalContext.Provider value={{ historias, dataHistoria, setDataHistoria, updateHistoria, addHistoria, deleteHistoria }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Hook personalizado para utilizar el contexto global
export const useGlobalContext = () => useContext(GlobalContext);
