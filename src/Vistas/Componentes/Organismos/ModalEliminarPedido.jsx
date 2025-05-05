//RF[63] Elimina pedido - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF63]

import { useEffect, useState } from 'react';
import { useEliminarPedido } from '../../../hooks/Pedidos/useEliminarPedido';
import PopUpEliminar from '../moleculas/PopUpEliminar';

const ModalEliminarPedido = ({ open, onClose, idsPedido, setAlerta, refrescarPagina }) => {
  const [confirmado, setConfirmado] = useState(false);
  const { mensaje, error } = useEliminarPedido(confirmado ? idsPedido : []);

  const handleConfirm = () => {
    setConfirmado(true);
    onClose();
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
          mensaje: `Error al eliminar los pedidos: ${error}`,
          icono: true,
          cerrable: true,
          centradoInferior: true,
        });
      } else {
        setAlerta({
          tipo: 'success',
          mensaje: mensaje || 'Pedidos eliminados correctamente.',
          icono: true,
          cerrable: true,
          centradoInferior: true,
        });
        setTimeout(() => {
          refrescarPagina();
        }, 500);
      }
      setConfirmado(false);
    }
  }, [confirmado, mensaje, error, setAlerta, refrescarPagina]);

  return (
    <PopUpEliminar
      abrir={open}
      cerrar={handleCancelar}
      confirmar={handleConfirm}
      dialogo='¿Estás seguro de que deseas eliminar los pedidos seleccionados?'
      labelCancelar='Cancelar'
      labelConfirmar='Eliminar'
    />
  );
};

export default ModalEliminarPedido;
