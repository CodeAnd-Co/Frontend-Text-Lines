import Alerta from '@Moleculas/Alerta';
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
const LIMITE_NOMBRE_VISIBLE = 50;
const LIMITE_DESCRIPCION = 150;
const MENSAJE_LIMITE = 'Máximo caracteres';

const FormaCrearSetsProducto = ({
                                  nombreSetsProducto,
                                  setNombreSetsProducto,
                                  nombreVisible,
                                  setNombreVisible,
                                  descripcionSetsProducto,
                                  setDescripcionSetsProducto,
                                  productos,
                                  setProductos,
                                  erroresCampos,
                                  setErroresCampos,
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

  const handleClickFila = (evento) => {
    const productoSeleccionado = evento.row;

    const yaExiste = productos.some((producto) => producto.id === productoSeleccionado.id);
    if (!yaExiste) {
      setProductos((prev) => [...prev, productoSeleccionado]);
    } else {
      setProductos((prev) => prev.filter((producto) => producto.id !== productoSeleccionado.id));
    }

    if (erroresCampos?.productos) {
      setErroresCampos(prev => ({ ...prev, productos: false }));
    }
  };

  const handleFilaSeleccion = (itemSeleccion) => {
    const ids = Array.isArray(itemSeleccion) ? itemSeleccion : Array.from(itemSeleccion?.ids || []);

    const productosSeleccionados = ids
      .map((id) => rows.find((row) => row.id === id))
      .filter((fila) => fila);

    setProductos(productosSeleccionados);

    if (erroresCampos?.productos && productosSeleccionados.length > 0) {
      setErroresCampos(prev => ({ ...prev, productos: false }));
    }
  };

  const handleNombreChange = (evento) => {
    const value = evento.target.value;
    if (value.trim() !== '') {
      setNombreSetsProducto(value.slice(0, LIMITE_NOMBRE));
    } else if (nombreSetsProducto !== '') {
      setNombreSetsProducto('');
    }

    if (erroresCampos?.nombre && value.trim()) {
      setErroresCampos(prev => ({ ...prev, nombre: false }));
    }
  };

  const handleNombreVisibleChange = (evento) => {
    const value = evento.target.value;
    if (value.trim() !== '') {
      setNombreVisible(value.slice(0, LIMITE_NOMBRE_VISIBLE));
    } else if (nombreVisible !== '') {
      setNombreVisible('');
    }

    if (erroresCampos?.nombreVisible && value.trim()) {
      setErroresCampos(prev => ({ ...prev, nombreVisible: false }));
    }
  };

  const handleDescripcionChange = (evento) => {
    const value = evento.target.value;
    if (value.trim() !== '') {
      setDescripcionSetsProducto(value.slice(0, LIMITE_DESCRIPCION));
    } else if (descripcionSetsProducto !== '') {
      setDescripcionSetsProducto('');
    }

    if (erroresCampos?.descripcion && value.trim()) {
      setErroresCampos(prev => ({ ...prev, descripcion: false }));
    }
  };

  return (
    <>
      <CampoTexto
        label={'Nombre'}
        fullWidth
        type={'text'}
        value={nombreSetsProducto}
        onChange={handleNombreChange}
        inputProps={{ maxLength: LIMITE_NOMBRE }}
        helperText={`${nombreSetsProducto.length}/${LIMITE_NOMBRE} - ${MENSAJE_LIMITE}`}
        required
        error={erroresCampos?.nombre}
        sx={{
          mb: 2,
          '& .MuiOutlinedInput-root': {
            '&.Mui-error .MuiOutlinedInput-notchedOutline': {
              borderColor: '#f44336',
            },
          },
        }}
      />

      <CampoTexto
        label={'Nombre Visible'}
        fullWidth
        type={'text'}
        value={nombreVisible}
        onChange={handleNombreVisibleChange}
        inputProps={{ maxLength: LIMITE_NOMBRE_VISIBLE }}
        helperText={`${nombreVisible.length}/${LIMITE_NOMBRE_VISIBLE} - ${MENSAJE_LIMITE}`}
        required
        error={erroresCampos?.nombreVisible}
        sx={{
          mb: 2,
          '& .MuiOutlinedInput-root': {
            '&.Mui-error .MuiOutlinedInput-notchedOutline': {
              borderColor: '#f44336',
            },
          },
        }}
      />

      <ProductosModal
        elevacion={1}
        sx={{
          width: '100%',
          height: '350px',
          ...(erroresCampos?.productos && {
            border: '2px solid #f44336',
            borderRadius: '4px',
          })
        }}
        columnas={columns}
        filas={rows}
        paginacion={4}
        checkBox={true}
        onRowClick={handleClickFila}
        onRowSeleccion={(ids) => handleFilaSeleccion(ids)}
      />

      <CampoTexto
        label={'Descripción'}
        fullWidth
        type={'text'}
        value={descripcionSetsProducto}
        onChange={handleDescripcionChange}
        inputProps={{ maxLength: LIMITE_DESCRIPCION }}
        helperText={`${descripcionSetsProducto.length}/${LIMITE_DESCRIPCION} - ${MENSAJE_LIMITE}`}
        required
        error={erroresCampos?.descripcion}
        sx={{
          mt: 2,
          '& .MuiOutlinedInput-root': {
            '&.Mui-error .MuiOutlinedInput-notchedOutline': {
              borderColor: '#f44336',
            },
          },
        }}
        multiline
        rows={3}
      />
    </>
  );
};

export default FormaCrearSetsProducto;
