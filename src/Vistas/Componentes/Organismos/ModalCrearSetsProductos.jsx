import { useState, useEffect, useCallback, useRef } from 'react';
import ModalFlotante from '@Organismos/ModalFlotante.jsx';
import FormaCrearSetsProducto from '@Organismos/Formularios/FormaCrearSetsProducto.jsx';
import useCrearSetsProducto from '@Hooks/SetsProductos/useCrearSetsProducto';
import Alerta from '@Moleculas/Alerta';

const ModalCrearSetsProductos = ({ abierto = false, onCerrar, onCreado }) => {
  const [nombreSetsProducto, setNombreSetsProducto] = useState('');
  const [nombreVisible, setNombreVisible] = useState('');
  const [descripcionSetsProducto, setDescripcionSetsProducto] = useState('');
  const [productos, setProductos] = useState([]);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [mensajeAlerta, setMensajeAlerta] = useState('');
  const [erroresCampos, setErroresCampos] = useState({
    nombre: false,
    nombreVisible: false,
    descripcion: false,
    productos: false
  });

  const tieneReseteo = useRef(false);

  const { crearSetsProducto, cargando, exito, error, mensaje, setError, resetEstado }
    = useCrearSetsProducto();

  useEffect(() => {
    if (!abierto && !tieneReseteo.current) {
      tieneReseteo.current = true;
      resetEstado();
      setTimeout(() => {
        setNombreSetsProducto('');
        setNombreVisible('');
        setDescripcionSetsProducto('');
        setProductos([]);
        setMostrarAlerta(false);
        setErroresCampos({
          nombre: false,
          nombreVisible: false,
          descripcion: false,
          productos: false
        });
      }, 0);
    } else if (abierto) {
      tieneReseteo.current = false;
    }
  }, [abierto, resetEstado]);

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

  const validarCampos = () => {
    const errores = {
      nombre: !nombreSetsProducto.trim(),
      nombreVisible: !nombreVisible.trim(),
      descripcion: !descripcionSetsProducto.trim(),
      productos: productos.length === 0
    };

    setErroresCampos(errores);

    let mensaje = '';
    if (errores.productos) {
      mensaje = 'Debe seleccionar al menos un producto.';
    } else if (errores.nombre || errores.nombreVisible || errores.descripcion) {
      mensaje = 'Por favor complete todos los campos obligatorios.';
    }

    return { tieneErrores: Object.values(errores).some(error => error), mensaje };
  };

  const handleConfirmar = async () => {
    const { tieneErrores, mensaje } = validarCampos();

    if (tieneErrores) {
      setMostrarAlerta(true);
      setMensajeAlerta(mensaje);
      return;
    }

    setMostrarAlerta(false);
    setMensajeAlerta('');
    setErroresCampos({
      nombre: false,
      nombreVisible: false,
      descripcion: false,
      productos: false
    });

    await crearSetsProducto({
      nombre: nombreSetsProducto.trim(),
      nombreVisible: nombreVisible.trim(),
      descripcion: descripcionSetsProducto.trim(),
      productos,
    });
  };

  return (<>
      <ModalFlotante
        open={abierto}
        onClose={handleCerrar}
        onConfirm={handleConfirmar}
        titulo='Crear sets de productos'
        cancelLabel='Cancelar'
        confirmLabel={cargando ? 'Creando...' : 'Crear'}
        disabledConfirm={cargando}
      >
        <FormaCrearSetsProducto
          nombreSetsProducto={nombreSetsProducto}
          setNombreSetsProducto={setNombreSetsProducto}
          nombreVisible={nombreVisible}
          setNombreVisible={setNombreVisible}
          descripcionSetsProducto={descripcionSetsProducto}
          setDescripcionSetsProducto={setDescripcionSetsProducto}
          productos={productos}
          setProductos={setProductos}
          mostrarAlerta={mostrarAlerta}
          setMostrarAlerta={setMostrarAlerta}
          erroresCampos={erroresCampos}
          setErroresCampos={setErroresCampos}
        />
      </ModalFlotante>

      {mostrarAlerta && !exito && !error && (
        <Alerta
          tipo="warning"
          mensaje={mensajeAlerta}
          duracion={2500}
          sx={{ margin: 3 }}
          cerrable
          onClose={() => setMostrarAlerta(false)}
          centradoInferior
        />
      )}

      {(exito || error) && (
        <Alerta
          tipo={exito ? 'success' : 'error'}
          mensaje={mensaje}
          duracion={exito ? 2500 : 2500}
          sx={{ margin: 3 }}
          cerrable
          onClose={error ? () => setError(false) : undefined}
          centradoInferior
        />
      )}
    </>
  );
};

export default ModalCrearSetsProductos;