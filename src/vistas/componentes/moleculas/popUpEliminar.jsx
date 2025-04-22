import React from 'react';
import { Dialog, DialogActions, DialogContent, Button } from '@mui/material';

/**
 * Componente de pop-up para confirmar la eliminacion de un elemento.
 *
 * @param {boolean} abrir - Estado que indica si el pop-up esta abierto.
 * @param {Function} cerrar - Funcion para cerrar el pop-up.
 * @param {Function} confirmar - Funcion para manejar la confirmacion de eliminacion.
 * @returns {JSX.Element} Componente de pop-up de eliminacion.
 */

const PopUpEliminar = ({ abrir, cerrar, confirmar }) => {
  return (
    <Dialog
      open={abrir}
      onClose={cerrar} // Funcion para cerrar el pop-up
      sx={{
        '& .MuiBackdrop-root': {
          backdropFilter: 'blur(5px)',
        },
      }}
    >
      <DialogContent>¿Estas seguro de que deseas eliminar a " " ?</DialogContent>
      <DialogActions>
        <Button onClick={cerrar}>Cancelar</Button>
        <Button onClick={confirmar}>Confirmar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopUpEliminar;
