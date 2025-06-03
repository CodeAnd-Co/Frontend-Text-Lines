import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormaCrearCuotaSet from '@Organismos/Formularios/FormaCrearCuotaSet';
import ModalFlotante from '@Organismos/ModalFlotante';
import { RUTAS } from '@Constantes/rutas';

//RF[31] Consulta crear set de cuota - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF31]

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
  const [errores, setErrores] = useState({});
  const [intentoEnviar, setIntentoEnviar] = useState(false);

  // Limpiar los campos cuando se cierra el modal
  useEffect(() => {
    if (!abierto) {
      setNombreCuotaSet('');
      setDescripcionCuotaSet('');
      setProductos([]);
      setMostrarAlerta(false);
      setErrores({});
      setIntentoEnviar(false);
    }
  }, [abierto]);

  const handleConfirmar = () => {
  setIntentoEnviar(true);
  const nuevosErrores = {};

  if (!nombreCuotaSet.trim()) {
    nuevosErrores.nombreCuotaSet = 'El nombre es obligatorio.';
  }

  if (!descripcionCuotaSet.trim()) {
    nuevosErrores.descripcionCuotaSet = 'La descripción es obligatoria.';
  }

  if (productos.length === 0) {
    setMostrarAlerta(true);
  }

  setErrores(nuevosErrores);

  if (Object.keys(nuevosErrores).length > 0 || productos.length === 0) {
    return;
  }

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
        errores={errores}
        intentoEnviar={intentoEnviar}
      />
    </ModalFlotante>
  );
};

export default ModalCrearCuotaSet;
