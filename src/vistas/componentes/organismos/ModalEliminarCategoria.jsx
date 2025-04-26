import { useState, useEffect } from 'react';
import { useEliminarCategorias } from '../../../hooks/Categorias/useEliminarCategorias';
import PopUpEliminar from '../../componentes/moleculas/PopUpEliminar';

const ModalEliminarCategoria = ({ open, onClose, idsCategoria, setAlerta, refrescarPagina }) => {
  const [confirmado, setConfirmado] = useState(false);
  const { mensaje, error } = useEliminarCategorias(confirmado ? idsCategoria : []);

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
          mensaje: 'Error al eliminar las categorías: ' + error,
          icono: true,
          cerrable: true,
          centradoInferior: true,
        });
      } else {
        setAlerta({
          tipo: 'success',
          mensaje: mensaje || 'Categorías eliminadas correctamente.',
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
      dialogo='¿Estás seguro de que deseas eliminar estas categorías?'
      labelCancelar='Cancelar'
      labelConfirmar='Eliminar'
    />
  );
};

export default ModalEliminarCategoria;
