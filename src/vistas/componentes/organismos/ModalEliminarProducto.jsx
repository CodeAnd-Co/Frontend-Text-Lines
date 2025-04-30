// RF[30] - Elimina producto - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF30

import { useState, useEffect } from 'react';
import { useEliminarProductos } from '../../../hooks/Productos/useEliminarProductos';
import PopUpEliminar from '../../componentes/moleculas/PopUpEliminar';

const ModalEliminarProducto = ({ open, onClose, idsProducto, setAlerta, refrescarPagina }) => {
  const [confirmado, setConfirmado] = useState(false);
  const { mensaje, error } = useEliminarProductos(confirmado ? idsProducto : []);

  const handleConfirm = () => {
    setConfirmado(true);
    onClose();
    refrescarPagina();
  };

  const handleCancelar = () => {
    setConfirmado(false);
    onClose();
  };

  useEffect(() => {
    if (confirmado) {
      if (error) {
        setAlerta({
          tipo: 'error',
          mensaje: `Error al eliminar los productos: ${error}`,
          icono: true,
          cerrable: true,
          centradoInferior: true,
        });
      } else {
        setAlerta({
          tipo: 'success',
          mensaje: mensaje || 'Productos eliminados correctamente.',
          icono: true,
          cerrable: true,
          centradoInferior: true,
        });
      }
      setConfirmado(false);
    }
  }, [confirmado, mensaje, error, setAlerta]);

  return (
    <PopUpEliminar
      abrir={open}
      cerrar={handleCancelar}
      confirmar={handleConfirm}
      dialogo='¿Estás seguro de que deseas eliminar los productos seleccionadas?'
      labelCancelar='Cancelar'
      labelConfirmar='Eliminar'
    />
  );
};

export default ModalEliminarProducto;
