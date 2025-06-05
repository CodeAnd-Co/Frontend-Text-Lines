import { useState, useEffect, useCallback, useRef } from 'react';
import ModalFlotante from '@Organismos/ModalFlotante';
import FormaCrearCategorias from '@Organismos/Formularios/FormaCrearCategoria';
import useCrearCategoria from '@Hooks/Categorias/useCrearCategoria';

const ModalCrearCategoria = ({ abierto = false, onCerrar, onCreado, onError }) => {
  const [nombreCategoria, setNombreCategoria] = useState('');
  const [descripcionCategoria, setDescripcionCategoria] = useState('');
  const [productos, setProductos] = useState([]);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [errores, setErrores] = useState({});
  const [intentoEnviar, setIntentoEnviar] = useState(false);

  const tieneReseteo = useRef(false);

  const { crearCategoria, cargando, exito, error, mensaje, setError, resetEstado }
    = useCrearCategoria();

  useEffect(() => {
    if (!abierto && !tieneReseteo.current) {
      tieneReseteo.current = true;
      resetEstado();
      setTimeout(() => {
        setNombreCategoria('');
        setDescripcionCategoria('');
        setProductos([]);
        setMostrarAlerta(false);
        setErrores({});
        setIntentoEnviar(false);
      }, 0);
    } else if (abierto) {
      tieneReseteo.current = false;
    }
  }, [abierto, resetEstado]);

  useEffect(() => {
    if (exito) {
      // Close modal immediately and let parent handle success alert
      if (onCreado) {
        onCreado();
      } else {
        onCerrar();
      }
    }
  }, [exito, onCreado, onCerrar]);

  useEffect(() => {
    if (error && onError) {
      // Let parent handle error alert, but keep modal open
      onError(mensaje);
      // Reset the error state to prevent loop
      setError(false);
    }
  }, [error, mensaje, onError, setError]);

  const handleCerrar = useCallback(() => {
    onCerrar();
  }, [onCerrar]);

  const handleConfirmar = async () => {
    setIntentoEnviar(true);
    const nuevosErrores = {};

    if (!nombreCategoria.trim()) {
      nuevosErrores.nombreCategoria = 'El nombre es obligatorio.';
    }

    if (!descripcionCategoria.trim()) {
      nuevosErrores.descripcionCategoria = 'La descripción es obligatoria.';
    }

    if (productos.length === 0) {
      setMostrarAlerta(true);
      // Notify parent about validation error
      if (onError) {
        onError('Ingresa el nombre y selecciona al menos un producto.');
      }
    }

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0 || productos.length === 0) return;

    await crearCategoria({
      nombreCategoria: nombreCategoria.trim(),
      descripcion: descripcionCategoria.trim(),
      productos,
    });
  };

  return (
    <ModalFlotante
      open={abierto}
      onClose={handleCerrar}
      onConfirm={handleConfirmar}
      titulo='Agregar Categorías'
      cancelLabel='Cancelar'
      confirmLabel={cargando ? 'Creando...' : 'Crear'}
      disabledConfirm={cargando}
    >
      <FormaCrearCategorias
        nombreCategoria={nombreCategoria}
        setNombreCategoria={setNombreCategoria}
        descripcionCategoria={descripcionCategoria}
        setDescripcionCategoria={setDescripcionCategoria}
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

export default ModalCrearCategoria;