import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormaCrearCuotaSet from '@Organismos/Formularios/FormaCrearCuotaSet';
import ModalFlotante from '@Organismos/ModalFlotante';
import { RUTAS } from '@Constantes/rutas';

const ModalCrearCuotaSet = ({ abierto = false, onCerrar, onCreado, onMostrarAlerta }) => {
  const navegar = useNavigate();
  const [nombreCuotaSet, setNombreCuotaSet] = useState('');
  const [descripcionCuotaSet, setDescripcionCuotaSet] = useState('');
  const [productos, setProductos] = useState([]);
  const [errores, setErrores] = useState({});
  const [intentoEnviar, setIntentoEnviar] = useState(false);

  useEffect(() => {
    if (!abierto) {
      setNombreCuotaSet('');
      setDescripcionCuotaSet('');
      setProductos([]);
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
      onMostrarAlerta?.({
        tipo: 'warning',
        mensaje: 'Completa todos los campos y selecciona al menos un producto.',
        icono: true,
        cerrable: true,
        centradoInferior: true,
      });
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

  const handleCerrar = () => {
    if (onCerrar) {
      onCerrar();
    }
  };

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
        errores={errores}
        intentoEnviar={intentoEnviar}
      />
    </ModalFlotante>
  );
};

export default ModalCrearCuotaSet;