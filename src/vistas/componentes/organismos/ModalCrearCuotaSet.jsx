import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Boton from '../atomos/Boton';
import FormaCrearCuotaSet from '../organismos/Formularios/FormaCrearCuotaSet';
import ModalFlotante from '../organismos/ModalFlotante';
import { RUTAS } from '../../../Utilidades/Constantes/rutas';

/**
 * Modal para crear un nuevo set de cuotas.
 *
 * @param {boolean} abierto - Controla si el modal está abierto o cerrado
 * @param {function} onCerrar - Función callback que se ejecuta al cerrar el modal
 * @param {function} onCreado - Función callback que se ejecuta cuando se crea exitosamente el set de cuotas
 */
const ModalCrearCuotaSet = ({ abierto = false, onCerrar, onCreado }) => {
  const navegar = useNavigate();
  const [nombreCuotaSet, setNombreCuotaSet] = useState('');
  const [descripcionCuotaSet, setDescripcionCuotaSet] = useState('');
  const [productos, setProductos] = useState([]);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  // Limpiar los campos cuando se cierra el modal
  useEffect(() => {
    if (!abierto) {
      setNombreCuotaSet('');
      setDescripcionCuotaSet('');
      setProductos([]);
      setMostrarAlerta(false);
    }
  }, [abierto]);

  const handleConfirmar = () => {
    // Validar que el nombre y descripción no estén vacíos después de eliminar espacios
    // y que haya al menos un producto seleccionado
    if (!nombreCuotaSet.trim() || !descripcionCuotaSet.trim() || productos.length === 0) {
      setMostrarAlerta(true);
      return;
    }

    // Navegar a la siguiente página con datos limpios (sin espacios innecesarios)
    navegar(
      `${RUTAS.SISTEMA_ADMINISTRATIVO.BASE_TABLERO}${RUTAS.SISTEMA_ADMINISTRATIVO.CUOTAS.EDITAR_CUOTAS}`,
      {
        state: {
          nombreCuotaSet: nombreCuotaSet.trim(),
          descripcion: descripcionCuotaSet.trim(),
          productos,
        },
      }
    );

    // Notificar que se ha creado exitosamente
    if (onCreado) {
      onCreado();
    }
  };

  // Manejar el cierre del modal
  const handleCerrar = () => {
    if (onCerrar) {
      onCerrar();
    }
  };

  // Si el componente se usa como modal controlado externamente
  return (
    <ModalFlotante
      open={abierto}
      onClose={handleCerrar}
      onConfirm={handleConfirmar}
      titulo='Agregar Set de Cuotas'
      cancelLabel='Cancelar'
      confirmLabel='Crear'
    >
      <FormaCrearCuotaSet
        nombreCuotaSet={nombreCuotaSet}
        setNombreCuotaSet={setNombreCuotaSet}
        descripcionCuotaSet={descripcionCuotaSet}
        setDescripcionCuotaSet={setDescripcionCuotaSet}
        productos={productos}
        setProductos={setProductos}
        mostrarAlerta={mostrarAlerta}
        setMostrarAlerta={setMostrarAlerta}
      />
    </ModalFlotante>
  );
};

export default ModalCrearCuotaSet;
