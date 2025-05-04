import { useState, useEffect, useCallback, useRef } from 'react';
import ModalFlotante from '../Organismos/ModalFlotante';
import FormaCrearCategorias from './Formularios/FormaCrearCategoria';
import useCrearCategoria from '../../../hooks/Categorias/useCrearCategoria';
import Alerta from '../Moleculas/Alerta';

const ModalCrearCategoria = ({ abierto = false, onCerrar, onCreado }) => {
  const [nombreCategoria, setNombreCategoria] = useState('');
  const [descripcionCategoria, setDescripcionCategoria] = useState('');
  const [productos, setProductos] = useState([]);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  // Track if the form has been reset to prevent multiple resets
  const hasReset = useRef(false);

  const { crearCategoria, cargando, exito, error, mensaje, setError, resetEstado }
    = useCrearCategoria();

  // Reset the form only once when the modal closes
  useEffect(() => {
    if (!abierto && !hasReset.current) {
      hasReset.current = true;
      resetEstado();
      // Delay state updates to prevent render loop
      setTimeout(() => {
        setNombreCategoria('');
        setDescripcionCategoria('');
        setProductos([]);
        setMostrarAlerta(false);
      }, 0);
    } else if (abierto) {
      // Reset the flag when modal opens
      hasReset.current = false;
    }
  }, [abierto, resetEstado]);

  // Handle successful creation
  useEffect(() => {
    let timeoutId;
    if (exito) {
      timeoutId = setTimeout(() => {
        if (onCreado) {
          onCreado();
        } else {
          onCerrar();
        }
      }, 2000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [exito, onCreado, onCerrar]);

  const handleCerrar = useCallback(() => {
    onCerrar();
  }, [onCerrar]);

  const handleConfirmar = async () => {
    // Validate that category name is not empty after removing spaces
    // and that there is at least one selected product
    if (!nombreCategoria.trim() || productos.length === 0) {
      setMostrarAlerta(true);
      return;
    }

    // Send data with clean names (without unnecessary spaces)
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
      titulo='Agregar Categorias'
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
      />
      {(exito || error) && (
        <Alerta
          tipo={exito ? 'success' : 'error'}
          mensaje={mensaje}
          duracion={exito ? 4000 : 6000}
          sx={{ margin: 3 }}
          cerrable
          onClose={error ? () => setError(false) : undefined}
        />
      )}
    </ModalFlotante>
  );
};

export default ModalCrearCategoria;
