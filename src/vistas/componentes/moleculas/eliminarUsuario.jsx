import React, { useState } from 'react';
import Boton from '../atomos/Boton';
import PopUpEliminar from './PopUpEliminar';

/**
 * Componente que muestra un boton para eliminar un usuario.
 *
 * @param {Function} alEliminar - Funcion que se ejecuta al confirmar la eliminacion.
 * @returns {JSX.Element} Componente de eliminacion de usuario.
 */

const EliminarUsuario = ({ alEliminar }) => {
  const [abrir, setAbierto] = useState(false); // Estado para controlar la apertura del pop-up

  const manejarClick = () => {
    setAbierto(true);
  };

  const manejarCerrar = () => {
    setAbierto(false);
  };

  const manejarConfirmar = () => {
    if (alEliminar) {
      alEliminar(); // Llama a la funcion pasada como prop, si existe
    }
    console.log('Usuario eliminado');
    setAbierto(false);
  };

  return (
    <>
      <Boton onClick={manejarClick}>Eliminar</Boton>
      <PopUpEliminar abrir={abrir} cerrar={manejarCerrar} confirmar={manejarConfirmar} />
    </>
  );
};

export default EliminarUsuario;
