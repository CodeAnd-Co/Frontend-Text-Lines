import CampoTexto from '@Atomos/CampoTexto';
import { useState, useEffect } from 'react';
import obtenerProductos from '@Servicios/obtenerProductos';
import ProductosModal from '@Organismos/ProductosModal';
import { useAuth } from '@Hooks/AuthProvider';

const columns = [
  { field: 'id', headerName: 'Id', width: 100 },
  { field: 'nombreProducto', headerName: 'Nombre', width: 220 },
  { field: 'tipo', headerName: 'Tipo', width: 100 },
];

const LIMITE_NOMBRE = 50;
const LIMITE_DESCRIPCION = 150;
const MENSAJE_LIMITE = 'Máximo caracteres';

const FormaCrearCuotaSet = ({
                              nombreCuotaSet,
                              setNombreCuotaSet,
                              descripcionCuotaSet,
                              setDescripcionCuotaSet,
                              productos,
                              setProductos,
                              errores,
                              intentoEnviar,
                            }) => {
  const [rows, setRows] = useState([]);
  const { usuario } = useAuth();
  const clienteSeleccionado = usuario.clienteSeleccionado;

  useEffect(() => {
    const obtenerDatosProductos = async (clienteSeleccionado) => {
      const productos = await obtenerProductos(clienteSeleccionado);
      setRows(productos);
    };

    obtenerDatosProductos(clienteSeleccionado);
  }, [clienteSeleccionado]);

  const handleFilaSeleccion = (itemSeleccion) => {
    const ids = Array.isArray(itemSeleccion) ? itemSeleccion : Array.from(itemSeleccion?.ids || []);

    const nuevasFilas = ids
      .map((id) => rows.find((row) => row.id === id))
      .filter((fila) => fila && !productos.some((producto) => producto.id === fila.id));

    if (nuevasFilas.length > 0) {
      setProductos((prev) => [...prev, ...nuevasFilas]);
    }
  };

  return (
    <>
      <CampoTexto
        label={'Nombre'}
        fullWidth
        type={'text'}
        value={nombreCuotaSet}
        onChange={(evento) => setNombreCuotaSet(evento.target.value.slice(0, LIMITE_NOMBRE))}
        inputProps={{ maxLength: LIMITE_NOMBRE }}
        helperText={
          errores?.nombreCuotaSet || `${nombreCuotaSet.length}/${LIMITE_NOMBRE} - ${MENSAJE_LIMITE}`
        }
        error={intentoEnviar && !!errores?.nombreCuotaSet}
        sx={{ mb: 2 }}
      />

      <ProductosModal
        elevacion={1}
        sx={{ width: '100%', height: '350px', my: 2 }}
        columnas={columns}
        filas={rows}
        paginacion={4}
        checkBox={true}
        onRowSeleccion={(ids) => handleFilaSeleccion(ids)}
      />

      <CampoTexto
        label={'Descripción'}
        fullWidth
        type={'text'}
        value={descripcionCuotaSet}
        onChange={(evento) =>
          setDescripcionCuotaSet(evento.target.value.slice(0, LIMITE_DESCRIPCION))
        }
        inputProps={{ maxLength: LIMITE_DESCRIPCION }}
        helperText={
          errores?.descripcionCuotaSet || `${descripcionCuotaSet.length}/${LIMITE_DESCRIPCION} - ${MENSAJE_LIMITE}`
        }
        error={intentoEnviar && !!errores?.descripcionCuotaSet}
        sx={{ mt: 2 }}
        multiline
        rows={3}
      />
    </>
  );
};

export default FormaCrearCuotaSet;